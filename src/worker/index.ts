import { diff_match_patch, patch_obj } from 'diff-match-patch';

const ctx: Worker = self as any;

export interface OUTPUT {
  type: string;
  resultString: string;
  diff?: patch_obj[];
  msg?: string;
}

const diffUtil = new diff_match_patch();

ctx.addEventListener("message", (event) => {
  switch (event.data.type) {
    case 'output':
      const { initString, newString } = event.data;
      const result = output(initString, newString);
      ctx.postMessage(result);
      break;
    default:
      break;
  }
});

function output(initString: string, newString: string): OUTPUT {
  console.time('patch_make time');
  const diffResult = diffUtil.patch_make(initString, newString);
  const diffResultString = JSON.stringify(diffResult);
  const diffResultLength = diffResultString.length;
  console.log('diffResultLength=', diffResultLength);
  const newStringLength = newString.length;
  console.log('newStringLength=', newStringLength);
  const output: OUTPUT = { type: 'diff', diff: diffResult, resultString: diffResultString, msg: 'success' };

  // 修改内容太多，返回新string
  if (newStringLength <= diffResultLength) {
    output.type = 'string';
    output.resultString = newString;
    output.msg = 'too short for diff';
    // delete output.diff;
  }
  console.timeEnd('patch_make time');
  return output;
}
