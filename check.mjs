import * as fs from "node:fs";

/**
 * Copy files to the destination but apply any replacements to the file.
 * Replacements are set by @see this.setReplacements.
 * @param {*} sourceFilePath - path of source file
 * @param {string} targetFilePath - path of target file to write to.
 * @param {BufferTransform} transform - object that implements the
 *  BufferTransformer interface.
 * @returns {Promise} Fulfills with target path on success.
 */
function copyFile(sourceFilePath, targetFilePath, bufferTransformer) {
  const targetDir = nodePath.dirname(targetFilePath);
  return fsPromises
    .mkdir(targetDir, { recursive: true })
    .then(() => fsPromises.readFile(sourceFilePath))
    .then((buffer) => {
      if (bufferTransformer) {
        buffer = bufferTransformer.transform(
          buffer,
          FileManager.getFileType(sourceFilePath)
        );
      }
      return fsPromises.writeFile(targetFilePath, buffer);
    })
    .then(() => {
      return targetFilePath;
    });
}

/**
 * Simple validation. This just tests that the file paths are correct.
 */
console.log(
  "Checking that file names in the library are resolvable to catch any typos."
);
let data = fs.readFileSync("docs/library-en.json", { encoding: "utf-8" });
const library = JSON.parse(data);
for (const book of library) {
  console.log(`Book ${book.title}`);
  for (const chapter of book.chapters) {
    console.log(`Chapter ${chapter.title}`);
    for (const lesson of chapter.lessons) {
      console.log(`Lesson ${lesson.title}`);
      let lessonPath = book.location + lesson.file;
      lessonPath = lessonPath.replace(
        "https://henspace.github.io/text2lesson-library",
        "docs"
      );

      const source = fs.readFileSync(lessonPath, { encoding: "utf-8" });
      console.log(source);
    }
  }
}
