// components/AnswerComponent.tsx
'use client';

import { useInputData } from '@/context/InputDataContext';
import SummaryBox from '@/components/summarybox';
import Link from 'next/link'; 
import { useState, useEffect } from 'react';
import { fetchResponse } from '@/actions/fetchresponse';
import Questions from '@/components/questions';
import Loading from '@/components/loadingpage';

export default function AnswerComponent() {
  const { inputData } = useInputData();
  const [response, setResponse] = useState("");
  const [hasFetched, setHasFetched] = useState(false);

  useEffect(() => {
    async function getSummary() {
      const result: any = await fetchResponse(inputData);
      setResponse(result);
      setHasFetched(true);  // Mark as fetched
    }
    
    if (!hasFetched) {  // Only fetch if not already fetched
      getSummary();
    }
  }, [inputData, hasFetched]);  // Add hasFetched to dependency array

  return (
    <div>
      {response ? (
        <>
          <SummaryBox summary={response} />
          <div className="flex justify-center items-center my-3">
            <Link href="/" className="text-white border border-black rounded bg-b items-center px-2 py-1">Back</Link>
          </div>
          <Questions inp={inputData} />
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
}
