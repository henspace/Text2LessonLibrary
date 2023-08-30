import * as fs from "node:fs";

/**
 * Simple validation. This just tests that the file paths are correc.
 */
 */
console.log("Checking that file names in the library are resolvable to catch any typos.");
const data = fs.readFileSync("docs/library-en.json", { encoding: "utf-8" });
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
