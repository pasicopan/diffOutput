# diffOutput  

out put diff string in big text for uploading to server to save btye and time.

### usage  

```javascript
  async function test(){

    const text1 = 'adfasdfasfdasdfasdf';
    const text2 = 'asdffadfdaaddafdsfadsf';
    const text3 = 'asdffadfda13241234afdsfadsf';
    const timeout = 6000;
  
    const diffOutput = new window.DiffOutput(text1, timeout);// init
    console.log('diffResult1 result=', diffResult1);
    const diffResult1 = await diffOutput.outputFrom(text2);// diff from text1 to text2, return promise
    const diffResult2 = await diffOutput.outputFrom(text3);// diff from text1 to text3, return promise
    console.log('diffResult2 result=', diffResult2);
  }
  test();

```

### common
- if JSON.stringify(diffResult1).length > text2, diffResult1.resultString = text2;

### ref
- [google diff match patch](https://github.com/google/diff-match-patch)
