import React, { useRef, MouseEvent, ChangeEvent } from 'react';
import axios from 'axios';

interface UPloadProps {
  beforeUpload?: (file: File) => boolean | Promise<File>;
  action: string;
  onSuccess?: (data: any, file: File) => void;
  onError?: (error: any, file: File) => void;
  onProgress?: (percentage: number, file: File) => void;
  onChange?: (file: File) => void;
}

const Upload: React.FC<UPloadProps> = props => {
  const inputFileRef = useRef<HTMLInputElement>(null);

  const {
    action,
    onSuccess,
    onError,
    onProgress,
    beforeUpload,
    onChange,
  } = props;

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
   * 多文件上传遍历文件分次上传
   * @param files 上传文件类数组
   */
  const handleUploadFile = (files: FileList) => {
    const fileList = Array.from(files);
    fileList.forEach(file => {
      if (!beforeUpload) {
        request(file);
      } else {
        const result = beforeUpload(file);
        // promise方式处理文件
        if (result && result instanceof Promise) {
          result.then(processedFile => {
            request(processedFile);
          });
          // 规定处理为文件未true的时候才会继续进行后续的文件发送
        } else if (result !== false) {
          // 正常方式处理文件
          request(file);
        }
      }
    });
  };

  const request = (file: File) => {
    const formData = new FormData();
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

        // onChange钩子
        if (onChange) {
          onChange(file);
        }
      })
      .catch(error => {
        if (onError) {
          onError(error, file);
        }

        if (onChange) {
          onChange(file);
        }
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
