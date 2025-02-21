export const readFragmentsFromFile = (fileContent) => {
  return fileContent
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => !isNaN(line) && line !== "");
};
