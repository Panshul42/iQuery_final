/* eslint-enable react/no-unescaped-entities */

import InputBox from '@/components/inputbox';

export default function Home() {
  return (
    <div className="centered-container">
      <div className="center-content editmaxwidth">
        <div className="border rounded border-white p-5 mx-9 my-6">
          <p className="text-xl light-blue tracking-wider leading-relaxed editfs">
            Got a research paper you don't want to read? Missed out on assigned reading material from class? Look no further - we've got just the thing for you. Simply paste your reading material below to get started.
          </p>
        </div>
        <InputBox />
      </div>
    </div>
  );
}

/* eslint-disable react/no-unescaped-entities */