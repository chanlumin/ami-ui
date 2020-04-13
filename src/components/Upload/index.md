## 上传

Demo:

```tsx
import React from 'react';
import { Upload } from 'ami';

const handleSuccess = (data, file) => {
  console.log('success', data, file);
};
const handleError = (err, file) => {
  console.error('error...', err, file);
};
const handleProgress = (percentage, file) => {
  console.log(`progress...%${percentage}`, file);
};

const checkSize = file => {
  if (file.size > 1024 * 1024 * 5) {
    alert('文件最大不能超过5M');
    return false;
  }
  return true;
};

/**
 * 修改文件名
 **/
const handleFilePromise = (file: File) => {
  const newFile = new File([file], 'new File.docx', { type: file.type });
  return Promise.resolve(newFile);
};

const handleChange = (file: File) => {
  console.log(file);
};

export default () => (
  <Upload
    action="/api/posts"
    beforeUpload={handleFilePromise}
    onSuccess={handleSuccess}
    onError={handleError}
    onProgress={handleProgress}
    onChange={handleChange}
  />
);
```
