# diffOutput  

easy wrapper for diff-match-patch, out put diff string in big text for uploading to server to save byte and time. eg. modifing the rich text.

### install (not upload to npmjs.com yet, sad :P) 

```javascript
  npm i -S diffOutput
```

### usage  
```javascript


  async function test(){

    const text1 = 'adfasdfasfdasdfasdf';
    const text2 = 'asdffadfdaaddafdsfadsf';
    const text3 = 'asdffadfda13241234afdsfadsf';
    const timeout = 6000;
  
    const diffOutput = new window.DiffOutput(text1, timeout);// init
    const diffResult12 = await diffOutput.outputFrom(text2);// diff from text1 to text2, work in webworker, return promise
    console.log('diffResult12 result=', diffResult12);
    const diffResult23 = await diffOutput.outputFrom(text3);// diff from text1 to text3, work in webworker, return promise
    console.log('diffResult23 result=', diffResult23);
  }
  test();

```

### dev  

```javascript
  npm run test
```
### build  

```javascript
  npm run build
```
### common
- if JSON.stringify(diffResult12.diff).length > text2, diffResult12.resultString = text2;

### ref
- [google diff match patch](https://github.com/google/diff-match-patch)
