'use client';
import { useState, useRef, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useInputData } from '@/context/InputDataContext';
import axios from 'axios';
import FileUpload from '@/components/file-upload';

export default function InputBox() {
  const { inputData, setInputData } = useInputData();
  const [inputText, setInputText] = useState("");
  const [pdfText, setPdfText] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const textbox = useRef<HTMLTextAreaElement>(null);
  const router = useRouter();

  function adjustHeight() {
    if (textbox.current) {
      textbox.current.style.height = "inherit";
      textbox.current.style.height = `${Math.min(textbox.current.scrollHeight, 350)}px`;
    }
  }

  function handleKeyDown(e: ChangeEvent<HTMLTextAreaElement>) {
    if (!pdfText) {
      adjustHeight();
      setInputText(e.target.value);
    }
  }

  async function handleClick() {
    if (inputText && inputText.length >= 200) {
      setInputData(inputText);
    }
    if (inputData.length < 200) {
      alert("Your input is too short!");
      return;
    }
    router.push('/answer');
  }

  return (
    <div className="flex items-center justify-center mx-9 editpt1 editmaxwidth">
      <div className="w-full">
        <div className="flex flex-col gap-4">
          <textarea
            ref={textbox}
            onChange={handleKeyDown}
            className="form-control-lg text-black w-full border rounded p-2 bg-gray-800 text-white placeholder-gray-500"
            id="exampleFormControlTextarea1"
            placeholder="Paste your reading material here..."
          ></textarea>
          <div className="flex gap-4 items-center justify-center my-3">
            <h2 className="text-white">Or upload a PDF</h2>
            <FileUpload />
          </div>
          <div className="flex items-center justify-center">
            <div className="twitter-blue border-1 rounded p-2 items-center justify-center flex">
              <button className = "text-white px-4 py-2" onClick={handleClick}>Let's Go</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
