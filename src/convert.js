// @ts-check

const { writeFileSync } = require("fs");
const kinks = require("../public/kinks.json");

const result = {
  sections: Object.keys(kinks).map((sectionName) => {
    return {
      id: sectionName
        .replace(/[\,\.\[\]\/\(\)]/g, "")
        .replace(/\s+/g, "-")
        .toLowerCase(),
      label: sectionName,
      questions: Object.keys(kinks[sectionName]).map((questionName) => {
        return {
          id: questionName
            .replace(/[\,\.\[\]\/\(\)]/g, "")
            .replace(/\s+/g, "-")
            .toLowerCase(),
          label: questionName,
          subquestions: Object.keys(kinks[sectionName][questionName]).map(
            (subquestionName) => {
              return {
                id: subquestionName
                  .replace(/[\,\.\[\]\/\(\)]/g, "")
                  .replace(/\s+/g, "-")
                  .toLowerCase(),
                label: subquestionName,
              };
            }
          ),
        };
      }),
    };
  }),
};

writeFileSync("./src/public/kinks-new.json", JSON.stringify(result, null, 2), {
  encoding: "utf-8",
});
