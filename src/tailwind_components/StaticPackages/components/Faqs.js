import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqs = [
  {
    question: "How do I access the study materials after purchase?",
    answer:
      "After completing your payment, you'll receive login credentials via email within 10 minutes. Simply log in to StudyStreak.in with these credentials to access all your study materials instantly.",
  },
  {
    question: "Is there a time limit for accessing the course?",
    answer:
      "Yes, you'll have full access to all study materials, practice tests, and resources for 6 months from the date of purchase. This gives you ample time to prepare thoroughly at your own pace.",
  },
  {
    question: "How do the doubt-clearing sessions work?",
    answer:
      "You can schedule your two doubt-clearing sessions anytime during your 6-month access period. Each session is 30 minutes long and conducted via Zoom with an IELTS expert who will address your specific questions and concerns.",
  },
  {
    question: "Can I access the materials on my mobile phone?",
    answer:
      "Absolutely! Our platform is fully responsive and works on smartphones, tablets, laptops, and desktop computers. You can study on any device with an internet connection.",
  },
  {
    question: "Do you offer a refund if I'm not satisfied?",
    answer:
      "We offer a 7-day money-back guarantee if you're not satisfied with the course materials. Simply email us at support@studystreak.in within 7 days of purchase, and we'll process your refund with no questions asked.",
  },
  {
    question: "Who are these video lessons meant for?",
    answer:
      "These lessons are specially designed for IELTS aspirants preparing for both the Academic and General Training modules. Whether you're a beginner or looking to sharpen your strategies, our content is tailored to boost your band score.",
  },
  {
    question: "What do the video lessons cover?",
    answer:
      "Our library includes 50+ recorded video lectures covering all four IELTS sections—Listening, Reading, Writing, and Speaking—with a focus on exam strategies, scoring techniques, time management, and common pitfalls to avoid.",
  },
  {
    question: "Are the videos live or recorded?",
    answer:
      "All lessons are pre-recorded, allowing you to learn at your own pace. Each video is followed by descriptions, examples, and practice assignments to help reinforce your understanding.",
  },
  {
    question: "How much does it cost?",
    answer:
      "You get full access to 50+ video lessons and assignments for just ₹99—no hidden fees or recurring charges.",
  },
  {
    question: "How long will I have access after purchasing?",
    answer:
      "Once you purchase, you get lifetime access to all the content. Revisit the lessons as many times as you like.",
  },
  {
    question: "Can I access the lessons on mobile?",
    answer:
      "Yes! You can access StudyStreak on mobiles, tablets, laptops, and desktops. No app download is required—just log in from any device.",
  },
  {
    question: "Do I need to create an account?",
    answer:
      "Yes, a quick sign-up is required to track your progress and unlock all the video lessons and assignments.",
  },
  {
    question: "Are there any practice materials included?",
    answer:
      "Absolutely. Alongside each video, you'll find assignments and examples to practice what you’ve learned. These help you apply strategies effectively in a real-test context.",
  },
  {
    question: "What makes StudyStreak different from other IELTS platforms?",
    answer:
      "StudyStreak focuses on practical exam strategies, not just theory. Our bite-sized lessons are designed for clarity, focus, and easy retention—ideal for busy learners aiming for high scores.",
  },
  {
    question: "Who created the lessons?",
    answer:
      "The video content is curated and delivered by experienced IELTS educators with proven track records of helping students achieve band 7+ scores.",
  },
];

const FaqItem = ({ faq, isOpen, onClick, index }) => {
  return (
    <div className="border-b border-neutral-200 last:border-b-0">
      <button
        onClick={onClick}
        className="flex justify-between items-center w-full p-6 hover:bg-primary-50 transition-colors duration-300 text-left"
        aria-expanded={isOpen}
      >
        <div className="flex items-center">
          <div
            className={`w-8 h-8 rounded-lg mr-4 flex items-center justify-center ${
              isOpen
                ? "bg-primary-100 text-primary-600"
                : "bg-neutral-100 text-neutral-600"
            }`}
          >
            {index + 1}
          </div>
          <span className="font-medium text-neutral-800">{faq.question}</span>
        </div>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-primary-600" />
        ) : (
          <ChevronDown className="w-5 h-5 text-neutral-400" />
        )}
      </button>
      {isOpen && (
        <div className="bg-neutral-50 px-6 pb-6 pt-2 border-t border-neutral-200">
          <div className="pl-12 text-neutral-600">{faq.answer}</div>
        </div>
      )}
    </div>
  );
};

const Faqs = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const handleClick = (index) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div className="bg-white rounded-2xl shadow-md border border-neutral-200 overflow-hidden">
      {faqs.map((faq, index) => (
        <FaqItem
          key={index}
          faq={faq}
          index={index}
          isOpen={openIndex === index}
          onClick={() => handleClick(index)}
        />
      ))}
    </div>
  );
};

export default Faqs;
