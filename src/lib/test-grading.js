export function gradeTest(test, answers) {
  if (!answers || typeof answers !== "object" || Array.isArray(answers) ||
      Object.keys(answers).length !== test.questions.length ||
      test.questions.some(question => !Object.hasOwn(answers, question.id) ||
        !Number.isInteger(answers[question.id]) || answers[question.id] < 0 ||
        answers[question.id] >= question.options.length)) {
    throw new Error("Answer every question before submitting.");
  }
  const review = test.questions.map(question => ({
    id: question.id, prompt: question.prompt, options: question.options,
    selected: answers[question.id], correct: question.correct,
    explanation: question.explanation,
  }));
  const score = review.filter(question => question.selected === question.correct).length;
  return { score, total: review.length, percent: Math.round(score / review.length * 100), review };
}

export function publicTest(test) {
  return {
    id: test.id, title: test.title, sample: test.sample,
    questions: test.questions.map(({ id, prompt, options }) => ({ id, prompt, options })),
  };
}
