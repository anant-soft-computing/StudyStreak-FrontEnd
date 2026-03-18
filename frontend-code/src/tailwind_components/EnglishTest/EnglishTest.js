import React, { useState } from "react";
import { Link } from "react-router-dom";

const EnglishTest = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);

  const questions = [
    {
      id: 1,
      type: "grammar",
      question: "Choose the correct conditional form:",
      text: "If I _____ enough money, I would buy a new car.",
      options: ["have", "had", "having", "has"],
      correct: 1,
      explanation: "Use 'had' in conditional type 2 sentences.",
      category: "Conditionals",
    },
    {
      id: 2,
      type: "grammar",
      question: "Select the correct tense:",
      text: "By next month, I _____ in this company for five years.",
      options: ["will work", "will have worked", "have worked", "had worked"],
      correct: 1,
      explanation:
        "Future perfect tense is used for actions that will be completed by a specific time in the future.",
      category: "Tenses",
    },
    {
      id: 3,
      type: "vocabulary",
      question: "Choose the most appropriate synonym for 'Ubiquitous':",
      options: ["Omnipresent", "Rare", "Unique", "Limited"],
      correct: 0,
      explanation: "'Ubiquitous' means present everywhere; omnipresent.",
      category: "Academic Vocabulary",
    },
    {
      id: 4,
      type: "vocabulary",
      question: "Select the correct collocation:",
      options: [
        "Make a decision",
        "Do a decision",
        "Take a decision",
        "Have a decision",
      ],
      correct: 0,
      explanation: "'Make a decision' is the correct collocation in English.",
      category: "Collocations",
    },
    {
      id: 5,
      type: "reading",
      text: `Artificial Intelligence (AI) has revolutionized various industries, from healthcare to transportation. 
          While AI offers numerous benefits, including increased efficiency and automation, it also raises ethical 
          concerns regarding privacy, job displacement, and decision-making autonomy.`,
      question: "What is the main purpose of this passage?",
      options: [
        "To criticize AI development",
        "To present balanced views on AI",
        "To promote AI technology",
        "To discuss AI in healthcare only",
      ],
      correct: 1,
      explanation:
        "The passage presents both benefits and concerns about AI, showing a balanced perspective.",
      category: "Main Idea",
    },
    {
      id: 6,
      type: "listening",
      question: "Identify the correct word stress pattern:",
      options: ["PHO-to-graph", "pho-TO-graph", "pho-to-GRAPH", "PHO-TO-graph"],
      correct: 1,
      explanation: "In 'photograph', the stress is on the second syllable.",
      category: "Word Stress",
    },

    // Writing Assessment
    {
      id: 7,
      type: "writing",
      question:
        "Choose the most appropriate topic sentence for a paragraph about climate change:",
      options: [
        "Climate change is happening everywhere.",
        "Global warming is causing many problems in the world today.",
        "Climate change represents one of the most significant environmental challenges of our time.",
        "The weather is changing a lot these days.",
      ],
      correct: 2,
      explanation:
        "A good topic sentence should be specific, clear, and academic in tone.",
      category: "Academic Writing",
    },

    // Error Correction
    {
      id: 8,
      type: "grammar",
      question:
        "Identify the error in this sentence: 'Neither the students or the teacher was present.'",
      options: [
        "Use of 'was'",
        "Use of 'or' instead of 'nor'",
        "Use of 'the' before students",
        "No error",
      ],
      correct: 1,
      explanation: "With 'neither', use 'nor' instead of 'or'.",
      category: "Error Correction",
    },

    // Prepositions
    {
      id: 9,
      type: "grammar",
      question:
        "Choose the correct preposition: 'She is committed _____ achieving her goals.'",
      options: ["to", "for", "in", "with"],
      correct: 0,
      explanation: "'Committed to' is the correct prepositional phrase.",
      category: "Prepositions",
    },

    // Academic Vocabulary
    {
      id: 10,
      type: "vocabulary",
      question:
        "Which word best completes this academic sentence: 'The research findings _____ previous studies on this topic.'",
      options: ["corroborate", "agree with", "say the same as", "match"],
      correct: 0,
      explanation:
        "'Corroborate' is the most academic choice to express agreement with previous research.",
      category: "Academic Language",
    },

    // Additional Questions

    // Articles
    {
      id: 11,
      type: "grammar",
      question:
        "Choose the correct article to complete the sentence: 'She is _____ honest person.'",
      options: ["a", "an", "the", "no article"],
      correct: 1,
      explanation:
        "Use 'an' before words that start with a vowel sound. 'Honest' starts with a vowel sound.",
      category: "Articles",
    },

    // Antonyms
    {
      id: 12,
      type: "vocabulary",
      question: "Choose the word that is opposite in meaning to 'Abundant':",
      options: ["Plentiful", "Scarce", "Ample", "Copious"],
      correct: 1,
      explanation: "'Scarce' is the antonym of 'Abundant'.",
      category: "Antonyms",
    },

    // Reading Comprehension - Detail
    {
      id: 13,
      type: "reading",
      text: `A solar eclipse occurs when the moon passes between the Earth and the sun, temporarily blocking the sun's light. 
          This rare event can only be seen from specific locations on Earth.`,
      question: "What causes a solar eclipse?",
      options: [
        "The Earth passing between the moon and the sun",
        "The moon passing between the Earth and the sun",
        "The sun moving closer to the Earth",
        "The moon blocking the Earth's light",
      ],
      correct: 1,
      explanation:
        "A solar eclipse occurs when the moon passes between the Earth and the sun.",
      category: "Detail",
    },

    // Modal Verbs
    {
      id: 14,
      type: "grammar",
      question:
        "Choose the correct modal verb: 'You _____ wear a seatbelt while driving.'",
      options: ["must", "should", "could", "might"],
      correct: 0,
      explanation: "'Must' expresses obligation or necessity.",
      category: "Modal Verbs",
    },

    // Idioms
    {
      id: 15,
      type: "vocabulary",
      question: "What does the idiom 'break the ice' mean?",
      options: [
        "To break something made of ice",
        "To make people feel more comfortable",
        "To cause trouble",
        "To start a fight",
      ],
      correct: 1,
      explanation:
        "'Break the ice' means to make people feel more comfortable in a social setting.",
      category: "Idioms",
    },

    // Passive Voice
    {
      id: 16,
      type: "grammar",
      question:
        "Change the sentence to passive voice: 'The chef cooks the meal.'",
      options: [
        "The meal is cooked by the chef.",
        "The meal was cooked by the chef.",
        "The chef is cooking the meal.",
        "The meal cooked the chef.",
      ],
      correct: 0,
      explanation:
        "In passive voice, the object becomes the subject: 'The meal is cooked by the chef.'",
      category: "Passive Voice",
    },

    // Phrasal Verbs
    {
      id: 17,
      type: "vocabulary",
      question: "Choose the correct meaning of the phrasal verb 'look into':",
      options: [
        "To admire someone",
        "To investigate",
        "To stare at something",
        "To anticipate",
      ],
      correct: 1,
      explanation: "'Look into' means to investigate or examine.",
      category: "Phrasal Verbs",
    },

    // Writing Assessment - Thesis Statement
    {
      id: 18,
      type: "writing",
      question:
        "Which of the following is the best thesis statement for an essay on renewable energy?",
      options: [
        "Renewable energy is important.",
        "This essay will discuss renewable energy.",
        "Renewable energy sources, such as solar and wind power, are essential for sustainable development and reducing environmental impact.",
        "Renewable energy is better than non-renewable energy.",
      ],
      correct: 2,
      explanation:
        "A good thesis statement is specific and outlines the main points.",
      category: "Thesis Statement",
    },

    // Pronunciation
    {
      id: 19,
      type: "listening",
      question: "Identify the word with a silent 'k' sound:",
      options: ["Know", "Kite", "Keep", "Kangaroo"],
      correct: 0,
      explanation: "'Know' is pronounced without the 'k' sound.",
      category: "Pronunciation",
    },

    // Conditionals
    {
      id: 20,
      type: "grammar",
      question:
        "Choose the correct conditional form: 'If it rains tomorrow, we _____ cancel the picnic.'",
      options: ["would", "will", "had", "have"],
      correct: 1,
      explanation:
        "First conditional uses 'will' to express future possibility.",
      category: "Conditionals",
    },

    // Collocations
    {
      id: 21,
      type: "vocabulary",
      question:
        "Select the correct collocation: 'She _____ a degree in engineering.'",
      options: ["took", "made", "got", "did"],
      correct: 2,
      explanation: "'Get a degree' is the correct collocation.",
      category: "Collocations",
    },

    // Reading Comprehension - Inference
    {
      id: 22,
      type: "reading",
      text: `John left his umbrella at home and got soaked on his way to work.`,
      question: "What can be inferred from this sentence?",
      options: [
        "It was raining when John went to work.",
        "John likes rain.",
        "John intentionally got wet.",
        "John doesn't own an umbrella.",
      ],
      correct: 0,
      explanation:
        "Since he got soaked and left his umbrella, we can infer it was raining.",
      category: "Inference",
    },

    // Tenses
    {
      id: 23,
      type: "grammar",
      question:
        "Choose the correct tense: 'I _____ my homework before dinner last night.'",
      options: ["finish", "finished", "have finished", "had finished"],
      correct: 1,
      explanation:
        "Simple past tense is used for completed actions in the past.",
      category: "Tenses",
    },

    // Synonyms
    {
      id: 24,
      type: "vocabulary",
      question: "Choose the most appropriate synonym for 'Inevitable':",
      options: ["Unavoidable", "Avoidable", "Optional", "Preventable"],
      correct: 0,
      explanation: "'Inevitable' means something that cannot be avoided.",
      category: "Synonyms",
    },

    // Prepositions
    {
      id: 25,
      type: "grammar",
      question:
        "Choose the correct preposition: 'He is interested _____ learning Spanish.'",
      options: ["on", "in", "at", "for"],
      correct: 1,
      explanation: "'Interested in' is the correct prepositional phrase.",
      category: "Prepositions",
    },

    // Word Stress
    {
      id: 26,
      type: "listening",
      question:
        "Identify the correct stress pattern for the word 'development':",
      options: [
        "de-VE-lop-ment",
        "de-ve-LOP-ment",
        "de-ve-lop-MENT",
        "DE-ve-lop-ment",
      ],
      correct: 0,
      explanation: "In 'development', the stress is on the second syllable.",
      category: "Word Stress",
    },

    // Writing Assessment - Conclusion Sentences
    {
      id: 27,
      type: "writing",
      question:
        "Which sentence is most appropriate for concluding a paragraph on the benefits of exercise?",
      options: [
        "Exercise is good.",
        "In conclusion, exercise has many benefits for both physical and mental health.",
        "Many people don't exercise enough.",
        "This paragraph talked about exercise.",
      ],
      correct: 1,
      explanation:
        "A good conclusion summarizes the main points and reinforces the topic.",
      category: "Conclusion Sentences",
    },

    // Reported Speech
    {
      id: 28,
      type: "grammar",
      question:
        "Choose the correct reported speech: 'She said, \"I am studying.\"'",
      options: [
        "She said that she is studying.",
        "She said that she was studying.",
        "She said that I was studying.",
        "She says that she was studying.",
      ],
      correct: 1,
      explanation:
        "In reported speech, present continuous becomes past continuous.",
      category: "Reported Speech",
    },

    // Academic Vocabulary
    {
      id: 29,
      type: "vocabulary",
      question:
        "Which word best completes this sentence: 'The data _____ that there is a correlation between diet and health.'",
      options: ["shows", "indicates", "says", "tells"],
      correct: 1,
      explanation:
        "'Indicates' is an appropriate academic verb in this context.",
      category: "Academic Vocabulary",
    },

    // Error Correction
    {
      id: 30,
      type: "grammar",
      question:
        "Identify the error in this sentence: 'Each of the students have finished their homework.'",
      options: [
        "Use of 'have'",
        "Use of 'their'",
        "Use of 'students'",
        "No error",
      ],
      correct: 0,
      explanation:
        "'Each' is singular, so it should be 'has' instead of 'have'.",
      category: "Error Correction",
    },
  ];

  const handleAnswer = (answerIndex) => {
    setAnswers({
      ...answers,
      [currentQuestion]: answerIndex,
    });
  };

  const calculateScore = () => {
    let correct = 0;
    Object.entries(answers).forEach(([questionIndex, answer]) => {
      if (questions[parseInt(questionIndex)].correct === answer) {
        correct++;
      }
    });
    return (correct / questions.length) * 100;
  };

  const getRecommendation = (score) => {
    if (score >= 80)
      return "You have a strong foundation in English! Consider our Advanced IELTS course.";
    if (score >= 60)
      return "You're on the right track! Our Intermediate IELTS course would be perfect for you.";
    return "We recommend starting with our Foundation IELTS course to build your skills.";
  };

  // Check if the current question has been answered
  const isCurrentQuestionAnswered = () => {
    return answers[currentQuestion] !== undefined;
  };

  return (
    <section className="py-16 bg-neutral-100">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-neutral-800 mb-4">
              Test Your English Level
            </h2>
            <p className="text-neutral-600 max-w-2xl mx-auto">
              Take our quick assessment to understand your current English
              proficiency and get personalized course recommendations
            </p>
          </div>
          <div className="bg-white rounded-2xl shadow-card p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-neutral-800 mb-2">
                Quick English Proficiency Test
              </h2>
              <p className="text-neutral-600">
                Take this 5-minute test to assess your English level
              </p>
            </div>

            {!showResult ? (
              <>
                <div className="mb-8">
                  <div className="h-2 bg-neutral-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary-600 rounded-full transition-all duration-300"
                      style={{
                        width: `${
                          ((currentQuestion + 1) / questions.length) * 100
                        }%`,
                      }}
                    />
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-sm text-neutral-600">
                      Question {currentQuestion + 1} of {questions.length}
                    </span>
                    <span className="text-sm font-medium text-primary-600">
                      {questions[currentQuestion].type.toUpperCase()}
                    </span>
                  </div>
                </div>

                <div className="mb-8">
                  {questions[currentQuestion].text && (
                    <div className="bg-neutral-50 p-4 rounded-xl mb-4 text-neutral-700">
                      {questions[currentQuestion].text}
                    </div>
                  )}
                  <p className="text-lg font-medium text-neutral-800 mb-6">
                    {questions[currentQuestion].question}
                  </p>

                  <div className="space-y-3">
                    {questions[currentQuestion].options.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => handleAnswer(index)}
                        className={`w-full p-4 text-left rounded-xl transition-all duration-300 
                          ${
                            answers[currentQuestion] === index
                              ? "bg-primary-50 text-primary-700 border-2 border-primary-500"
                              : "bg-white border border-neutral-200 text-neutral-700 hover:bg-neutral-50"
                          }`}
                      >
                        <span className="inline-block w-6 h-6 rounded-full bg-white border-2 border-neutral-300 mr-3 text-center text-sm leading-5 font-medium">
                          {String.fromCharCode(65 + index)}
                        </span>
                        {option}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-neutral-200">
                  <button
                    onClick={() =>
                      setCurrentQuestion((prev) => Math.max(0, prev - 1))
                    }
                    disabled={currentQuestion === 0}
                    className="px-6 py-2.5 rounded-xl text-primary-600 hover:bg-primary-50 
                      disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                  >
                    Previous
                  </button>
                  {currentQuestion === questions.length - 1 ? (
                    <button
                      onClick={() => setShowResult(true)}
                      disabled={!isCurrentQuestionAnswered()}
                      className="px-8 py-2.5 rounded-xl bg-primary-600 text-white 
                        hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed 
                        transition-all duration-300"
                    >
                      Finish Test
                    </button>
                  ) : (
                    <button
                      onClick={() =>
                        setCurrentQuestion((prev) =>
                          Math.min(questions.length - 1, prev + 1)
                        )
                      }
                      disabled={!isCurrentQuestionAnswered()}
                      className="px-8 py-2.5 rounded-xl bg-primary-600 text-white 
                        hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed 
                        transition-all duration-300"
                    >
                      Next
                    </button>
                  )}
                </div>
              </>
            ) : (
              <div className="text-center">
                <div className="w-40 h-40 mx-auto mb-6 rounded-full bg-primary-50 flex items-center justify-center border-8 border-primary-100">
                  <div>
                    <span className="block text-4xl font-bold text-primary-600">
                      {Math.round(calculateScore())}%
                    </span>
                    <span className="text-sm text-primary-600">Score</span>
                  </div>
                </div>

                <div className="max-w-md mx-auto">
                  <h3 className="text-xl font-bold text-neutral-800 mb-4">
                    Test Complete!
                  </h3>
                  <p className="text-neutral-600 mb-8">
                    {getRecommendation(calculateScore())}
                  </p>

                  <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <button
                      onClick={() => {
                        setCurrentQuestion(0);
                        setAnswers({});
                        setShowResult(false);
                      }}
                      className="px-6 py-2.5 rounded-xl text-primary-600 border border-primary-200
                        hover:bg-primary-50 transition-all duration-300"
                    >
                      Try Again
                    </button>
                    <Link
                      to="/courses/ielts"
                      className="px-6 py-2.5 rounded-xl bg-primary-600 text-white 
                        hover:bg-primary-700 transition-all duration-300"
                    >
                      Explore IELTS Courses
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EnglishTest;
