export const speakingAssessment = (assessment) => {
  const sections = {};
  const regex =
    /(?:Fluency and Coherence:|Lexical Resource:|Grammatical Range and Accuracy:|Pronunciation:)/g;
  const matches = assessment?.split(regex);
  const titles = assessment?.match(regex);

  if (titles && matches) {
    titles?.forEach((title, index) => {
      sections[title.trim()] = matches[index + 1]?.trim() || "No data";
    });
  }
  return sections;
};
