import { useState, useEffect } from "react";
import { readFragmentsFromFile } from "../utils/readFragmentsFromFile.js";

export function FileUpload({
  setFileContent,
  fileName,
  setFileName,
  setFragmentCount,
  fileInputRef,
}) {
  const [chooseFileMessage, setChooseFileMessage] = useState(
    "Please choose a file"
  );

  useEffect(() => {
    if (!fileName) {
      setChooseFileMessage("Please choose a file");
    } else {
      setChooseFileMessage(fileName);
    }
  }, [fileName]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target.result;
      setFileContent(content);
      const fragments = readFragmentsFromFile(content);
      setFragmentCount(fragments.length);
    };
    reader.readAsText(file);
  };

  return (
    <div className="mb-5">
      <div className="flex flex-col gap-4 items-center md:flex-row md:justify-between">
        <label className="w-full md:w-auto flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded cursor-pointer hover:bg-blue-600 transition">
          <span>Select File</span>
          <input
            type="file"
            className="hidden"
            onChange={handleFileUpload}
            accept=".txt"
            ref={fileInputRef}
          />
        </label>
        <span className={`text-gray-300 ${fileName ? "" : "opacity-50"}`}>
          {fileName || "No file selected"}
        </span>
      </div>
    </div>
  );
}
