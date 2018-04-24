import Worker from 'worker-loader!./worker/index';
import { diff_match_patch, patch_obj } from 'diff-match-patch';

interface OUTPUT {
  type: string;
  resultString: string;
  diff?: patch_obj[];
  msg?: string;
}

class DiffOutput {
  initString: string;
  timeout: number;
  diffUtil: diff_match_patch;

  // 初始化
  constructor(initString: string, timeout: number = 3000) {
    this.initString = initString;
    this.timeout = timeout;
  }

  // 输出不同部分的数组，如果不同的内容太多，返回新字符串
  // TODO: 转换成node 再对比
  outputFrom(newString: string): Promise<OUTPUT> {
    return new Promise((resolve, reject) => {
      var worker = new Worker();
      worker.postMessage(
        {
          type: 'output',
          initString: this.initString,
          newString,
        }
      );
      worker.onmessage = function (message: any) {
        if (timer) clearTimeout(timer);
        var data: OUTPUT = message.data;
        resolve(data);
        worker.terminate();// 马上关掉会导致postMessage 没有回应
      };
      worker.onerror = function (error: any) {
        console.log(error.filename, error.lineno, error.message);
        reject(error);
      }

      const timer = setTimeout(() => {
        worker.terminate();
        const result: OUTPUT = { type: 'string', resultString: newString, msg: 'diff timeout' };
        resolve(result);
        if (timer) clearTimeout(timer);
      }, this.timeout);

    });
  }
  // 根据不同部分的数组和原始字符串，还原更新后的字符串
  recovery(diffResult: OUTPUT, initString: string) {
    try {
      if (diffResult.type === 'string') {
        return diffResult.resultString;
      } else if (diffResult.type === 'diff') {
        if (diffResult.diff.length === 0) {
          throw 'no diff patch list';
        }
        if (!this.diffUtil) {
          this.diffUtil = new diff_match_patch();
        }
        const recoveryResult = this.diffUtil.patch_apply(diffResult.diff, initString);
        if (true === recoveryResult[1][0]) {
          let resultString = recoveryResult[0];
          return resultString;
        } else {
          throw 'patch_apply fail';
        }
      }
    } catch (e) {
      console.log('e=', e);
      // throw 'recovery fail';
    }

  }
}

export default DiffOutput;

declare global {
  interface Window { DiffOutput: any; }
}

window.DiffOutput = DiffOutput || {};
