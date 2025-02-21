export function ResultDisplay({
  result,
  length,
  chainLength,
  fragmentCount,
  isLoading,
  reset,
}) {
  return (
    <div>
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
                    ${
                      isLoading
                        ? "bg-gray-500 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-700"
                    }`}
      >
        Reset
      </button>
    </div>
  );
}
