'use client';
import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import { useState } from 'react';
import { useInputData } from '@/context/InputDataContext';

export default function FileUpload() {
  const { setInputData } = useInputData();

  const handleProcessFile = (error: any, file: any) => {
    if (error) {
      console.error('File processing error:', error);
      return;
    }
    const response = JSON.parse(file.serverId);
    console.log(response.parsedText);
    setInputData(response.parsedText);
  };

  return (
    <div className = "w-3/12"> 
      <FilePond
      server={{
        process: {
          url: '/api/upload',
          onload: (response) => {
            return response;
          }
        },
        fetch: null,
        revert: null,
      }}
      onprocessfile={handleProcessFile}
    />
    </div>
  );
}
