class Question {
  /**
   *
   * @param {HTMLElement} qs: question element
   * @param {HTMLElement} answer: answer element
   * @param {boolean} showAnswer: show answer or not
   */
  constructor(qs, answer, showAnswer) {
    this.showAnswer = showAnswer;
    this.qs = qs;
    this.answer = answer;
    this.toggleAnswer = this.toggleAnswer.bind(this);
    qs.addEventListener("click", this.toggleAnswer);
    this.styled();
  }

  styled() {
    this.answer.hidden = !this.showAnswer;
  }

  toggleAnswer() {
    this.answer.hidden = this.showAnswer;
    this.showAnswer = !this.showAnswer;
  }
}

export { Question };
