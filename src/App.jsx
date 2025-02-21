import React, { useState, useRef } from 'react';
import './App.css';

function App() {
    const [fileContent, setFileContent] = useState('');
    const [result, setResult] = useState('');
    const [length, setLength] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [fileName, setFileName] = useState('');
    const [fragmentCount, setFragmentCount] = useState(0);
    const [chainLength, setChainLength] = useState(0);
    const [message, setMessage] = useState('');
    const [inputKey, setInputKey] = useState(Date.now());

    const fileInputRef = useRef(null);

    const readFragmentsFromFile = (fileContent) => {
        return fileContent.split('\n').map((line) => line.trim()).filter((line) => !isNaN(line) && line !== '');
    };

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

    const solvePuzzle = () => {
        if (!fileContent) {
            setMessage('Please upload a file!');
            return;
        }

        setIsLoading(true);
        setMessage('');
        try {
            const fragments = readFragmentsFromFile(fileContent);
            setMessage(`Found ${fragments.length} fragments`);

            const chain = findLongestChain(fragments);
            setChainLength(chain.length);

            const merged = mergeFragments(chain);
            setResult(merged);
            setLength(merged.length);
            setMessage(`Solution found. Total length of the result: ${merged.length}`);
        } catch (error) {
            setMessage(` Error in solving: ${error.message}`);
        } finally {
            setIsLoading(false);
        }

    };

    const findLongestChain = (fragments) => {
        function findPath(fragment) {
            const visited = new Set();
            const stack = [fragment];
            const path = [fragment];

            while (stack.length > 0) {
                const currentFragment = stack.pop();
                visited.add(currentFragment);
                const lastTwo = currentFragment.slice(-2);
                const nextFragments = fragments.filter(fragment =>
                    fragment !== currentFragment && fragment.startsWith(lastTwo)
                );

                for (const nextFragment of nextFragments) {
                    if (!visited.has(nextFragment)) {
                        stack.push(nextFragment);
                        path.push(nextFragment);
                    }
                }
            }
            return path;
        }

        let longestOverall = [];
        const totalFragments = fragments.length;

        for (const startFragment of fragments) {
            const path = findPath(startFragment);
            if (path.length > longestOverall.length) {
                longestOverall = path;}
        }

        return longestOverall;
    };

    const mergeFragments = (chain) => {
        if (!chain.length) return '';

        let result = chain[0];

        for (let i = 1; i < chain.length; i++) {
            const current = chain[i];
            const previousEnd = result.slice(-2);

            if (current.startsWith(previousEnd)) {
                result += current.slice(2);
            }
        }

        return result;
    };

    const reset = () => {
        setFileName('');
        setFileContent('');
        setFragmentCount(0);
        setMessage('');
        setChainLength(0);
        setResult('');
        setLength(0);
        setIsLoading(false);
        setInputKey(Date.now());
        fileInputRef.current.value = '';
    };


    return (
        <div className="bg-gray-800 text-white min-h-screen flex justify-center items-center p-6">
            <div className="container mx-auto p-5 bg-gray-700 shadow-lg rounded-lg max-w-3xl border-2 border-gray-600">
                <h1 className="text-3xl font-bold text-center text-blue-400 mb-6">Digital Puzzle</h1>

                <div className="mb-5">
                    <div className="flex flex-col gap-4 items-center md:flex-row md:justify-between">
                        <label
                            className="w-full md:w-auto flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded cursor-pointer hover:bg-blue-600 transition">
                            <span>Select File</span>
                            <input
                                key={inputKey}
                                type="file"
                                className="hidden"
                                onChange={handleFileUpload}
                                accept=".txt"
                                ref={fileInputRef}
                            />
                        </label>
                        <span className={`text-gray-300 ${fileName ? '' : 'opacity-50'}`}>
                        {fileName || 'No file selected'}
                    </span>
                    </div>

                    {fragmentCount > 0 && (
                        <div className="mt-2 text-green-400">
                            Завантажено {fragmentCount} фрагментів
                        </div>
                    )}
                </div>

                <button
                    onClick={solvePuzzle}
                    disabled={!fileContent || isLoading}
                    className={`w-full py-3 rounded text-lg font-semibold transition
                    ${isLoading
                        ? 'bg-gray-500 cursor-not-allowed'
                        : 'bg-blue-600 hover:bg-blue-700'}`}
                >
                    {isLoading ? 'Solving...' : 'Solve Puzzle'}
                </button>

                {isLoading && (
                    <div className="mt-5 flex justify-center">
                        <div
                            className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                )}

                {result && !isLoading && (
                    <div className="mt-6 bg-gray-800 p-6 rounded-lg border border-gray-600">
                        <h2 className="text-xl font-semibold text-green-400 mb-3">Result:</h2>

                        <div className="mb-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <div className="bg-gray-700 p-2 rounded">
                                    <span className="text-gray-400">Fragment Count:</span>
                                    <div className="text-xl font-bold">{fragmentCount}</div>
                                </div>
                                <div className="bg-gray-700 p-2 rounded">
                                    <span className="text-gray-400">Chain Length:</span>
                                    <div className="text-xl font-bold">{chainLength}</div>
                                </div>
                                <div className="bg-gray-700 p-2 rounded">
                                    <span className="text-gray-400">Total Digits:</span>
                                    <div className="text-xl font-bold">{length}</div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6">
                            <h3 className="text-blue-300 mb-2">Full Result:</h3>
                            <div className="bg-black p-4 rounded overflow-x-auto">
                            <pre className="text-green-400 font-mono break-all whitespace-pre-wrap">
                                {result}
                            </pre>
                            </div>
                        </div>

                    </div>
                )}
                <button
                    onClick={reset}
                    className={`w-full mt-6 py-3 rounded text-lg font-semibold transition
        ${isLoading
                        ? 'bg-gray-500 cursor-not-allowed'
                        : 'bg-blue-600 hover:bg-blue-700'}`}
                >
                    Reset
                </button>
            </div>
        </div>
    );

}

export default App;
