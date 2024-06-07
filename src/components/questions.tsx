'use client';
import { useState, useRef, ChangeEvent, useEffect } from 'react';
import { fetchAnswer } from '@/actions/fetchresponse'; 
import Loading from '@/components/loadinganswer';

interface props {
    inp: string
}

export default function Questions({inp}: props) {
    const textbox = useRef<HTMLTextAreaElement>(null);
    const [questionAnswer, setQuestionAnswer] = useState("");
    const [question, setQuestion] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (textbox.current) {
            textbox.current.value = questionAnswer;
        }
    }, [questionAnswer]);

    function adjustHeight() {
        if (textbox.current) {
          textbox.current.style.height = "inherit";
          textbox.current.style.height = `${Math.min(textbox.current.scrollHeight, 350)}px`;
        }
      }

    function handleKeyDown(e: ChangeEvent<HTMLTextAreaElement>) {
        adjustHeight();
        setQuestion(e.target.value);
    }

    async function handleClick() {
        setLoading(true);
        const answer: any = await fetchAnswer(inp, question);
        setLoading(false);
        setQuestionAnswer(answer);
    }

    return (
        <div>
            <h1 className="mx-6 my-4 text-3xl">Still confused?</h1>
            <div className="flex items-center justify-center mx-6 my-3">
                <div className="w-full">
                    <div className="flex flex-col gap-4">
                        {loading ? (
                            <Loading />
                        ) : (
                            <>
                                <textarea
                                    ref={textbox}
                                    onChange={handleKeyDown}
                                    className="text-black w-full border rounded p-2 bg-gray-300 h-48"
                                    id="exampleFormControlTextarea1"
                                    placeholder="Ask all your burning questions here..."
                                ></textarea>
                                <div className="flex items-center justify-center">
                                    <div className="bg-b border-1 rounded px-2 py-1 items-center justify-center flex">
                                        <button onClick={handleClick}>Ask away</button>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}