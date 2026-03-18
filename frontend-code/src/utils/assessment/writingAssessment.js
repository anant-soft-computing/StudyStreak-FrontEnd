export const writingAssessment = (assessment) => {
  const sections = {};
  const regex =
    /(?:Task Achievement:|Coherence and Cohesion:|Lexical Resource:|Grammatical Range and Accuracy:)/g;
  const matches = assessment?.split(regex);
  const titles = assessment?.match(regex);

  if (titles && matches) {
    titles?.forEach((title, index) => {
      sections[title.trim()] = matches[index + 1]?.trim() || "No data";
    });
  } else {
    sections[""] = assessment?.trim();
  }
  return sections;
};
