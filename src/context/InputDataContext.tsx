'use client';
// context/InputDataContext.tsx
import { createContext, useContext, useState, ReactNode } from 'react';

interface InputDataContextProps {
  inputData: string;
  setInputData: (data: string) => void;
}

const InputDataContext = createContext<InputDataContextProps | undefined>(undefined);

export const InputDataProvider = ({ children }: { children: ReactNode }) => {
  const [inputData, setInputData] = useState("");

  return (
    <InputDataContext.Provider value={{ inputData, setInputData }}>
      {children}
    </InputDataContext.Provider>
  );
};

export const useInputData = () => {
  const context = useContext(InputDataContext);
  if (context === undefined) {
    throw new Error('useInputData must be used within an InputDataProvider');
  }
  return context;
};
