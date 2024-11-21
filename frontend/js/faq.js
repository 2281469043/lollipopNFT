import { Question } from "./question.js";

const questionAndAnswers = Array.from(document.querySelectorAll(".fnq-item"));

// Create a new Question object for each question and answer
questionAndAnswers.forEach((item, index) => {
  new Question(item.firstElementChild, item.lastElementChild, index === 0);
});
