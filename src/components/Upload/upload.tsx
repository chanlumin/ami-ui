import React, { useRef, MouseEvent, ChangeEvent } from 'react';
import axios from 'axios';

interface UPloadProps {
  action: string;
  onSuccess?: (data: any, file: File) => void;
  onError?: (error: any, file: File) => void;
  onProgress?: (percentage: number, file: File) => void;
}

const Upload: React.FC<UPloadProps> = props => {
  const inputFileRef = useRef<HTMLInputElement>(null);

  const { action, onSuccess, onError, onProgress } = props;

  /**
   *
   */
  const handleUploadClick = () => {
    if (inputFileRef.current) {
      inputFileRef.current.click();
    }
  };

  /**
   * 处理文件上传
   * @param e input触发时间
   */
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log('value', e.target.value, e.target.files);
    let files = e.target.files;
    if (!files) return;
    handleUploadFile(files);
    // console.log(inputFileRef.current.value) fakeLocation
  };

  /**
   * 处理文件上传流程
   * @param files 上传文件类数组
   */
  const handleUploadFile = (files: FileList) => {
    const fileList = Array.from(files);
    const formData = new FormData();
    fileList.forEach(file => {
      formData.append(file.name, file);
      axios
        .post(action, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          // axios的上传过程钩子
          onUploadProgress: (evt: ProgressEvent) => {
            const percentage = Math.round((evt.loaded * 100) / evt.total) || 0;
            if (percentage < 100) {
              if (onProgress) {
                onProgress(percentage, file);
              }
            }
          },
        })
        .then(resp => {
          console.log('resp..... : ', resp);
          if (onSuccess) {
            onSuccess(resp.data, file);
          }
        })
        .catch(error => {
          if (onError) {
            onError(error, file);
          }
        });
    });
  };

  return (
    <div>
      <button onClick={handleUploadClick}>上传</button>
      <input
        ref={inputFileRef}
        type="file"
        style={{ display: 'none' }}
        onChange={handleFileChange}
      ></input>
    </div>
  );
};

export default Upload;
