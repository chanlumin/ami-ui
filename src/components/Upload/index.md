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

export default () => (
  <Upload
    action="/api/posts"
    onSuccess={handleSuccess}
    onError={handleError}
    onProgress={handleProgress}
  />
);
```
