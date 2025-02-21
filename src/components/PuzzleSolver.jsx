import React from "react";
import { readFragmentsFromFile } from "../utils/readFragmentsFromFile.js";
import { findLongestChain } from "../utils/findLongestChain";
import { mergeFragments } from "../utils/mergeFragments";

export function PuzzleSolver({
  fileContent,
  isLoading,
  setIsLoading,
  setResult,
  setLength,
  setChainLength,
  setMessage,
}) {
  const solvePuzzle = () => {
    if (!fileContent) {
      setMessage("Please upload a file!");
      return;
    }

    setIsLoading(true);
    setMessage("");
    try {
      const fragments = readFragmentsFromFile(fileContent);
      setMessage(`Found ${fragments.length} fragments`);

      const chain = findLongestChain(fragments);
      setChainLength(chain.length);

      const merged = mergeFragments(chain);
      setResult(merged);
      setLength(merged.length);
      setMessage(
        `Solution found. Total length of the result: ${merged.length}`
      );
    } catch (error) {
      setMessage(` Error in solving: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={solvePuzzle}
        disabled={!fileContent || isLoading}
        className={`w-full py-3 rounded text-lg font-semibold transition
                    ${
                      isLoading
                        ? "bg-gray-500 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-700"
                    }`}
      >
        {isLoading ? "Solving..." : "Solve Puzzle"}
      </button>
      {isLoading && (
        <div className="mt-5 flex justify-center">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
}
