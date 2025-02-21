import { useState, useRef } from "react";
import { FileUpload } from "./components/FileUpload.jsx";
import { PuzzleSolver } from "./components/PuzzleSolver.jsx";
import { ResultDisplay } from "./components/ResultDisplay.jsx";

function App() {
  const [fileContent, setFileContent] = useState("");
  const [fileName, setFileName] = useState("");
  const [fragmentCount, setFragmentCount] = useState(0);
  const [result, setResult] = useState("");
  const [length, setLength] = useState(0);
  const [chainLength, setChainLength] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const fileInputRef = useRef(null);

  const reset = () => {
    setFileContent("");
    setFileName("");
    setFragmentCount(0);
    setMessage("");
    setChainLength(0);
    setResult("");
    setLength(0);
    setIsLoading(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="bg-gray-800 text-white min-h-screen flex justify-center items-center p-6">
      <div className="container mx-auto p-5 bg-gray-700 shadow-lg rounded-lg max-w-3xl border-2 border-gray-600">
        <h1 className="text-3xl font-bold text-center text-blue-400 mb-6">
          Digital Puzzle
        </h1>

        <FileUpload
          fileName={fileName}
          setFileContent={setFileContent}
          setFileName={setFileName}
          setFragmentCount={setFragmentCount}
          fileInputRef={fileInputRef}
        />

        <PuzzleSolver
          fileContent={fileContent}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          setResult={setResult}
          setLength={setLength}
          setChainLength={setChainLength}
          setMessage={setMessage}
        />

        <ResultDisplay
          result={result}
          length={length}
          chainLength={chainLength}
          fragmentCount={fragmentCount}
          message={message}
          isLoading={isLoading}
          reset={reset}
        />
      </div>
    </div>
  );
}

export default App;
