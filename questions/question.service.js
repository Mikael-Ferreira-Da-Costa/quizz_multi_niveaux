import QuestionRepository from "./question.repository";

class QuestionService {
  questionRepository = new QuestionRepository();

  parseQuestion({ type, subject, answer }) {
    if (!type || !subject || !answer) {
      const err = new Error("Missing required argument in querry");

      err.name = "ArgumentRequired";
      throw err;
    }
    switch (type) {
      case "Checkbox":
        if (typeof answer !== Number) {
          const err = new Error(
            "Answer must be of type Number for checkbox question"
          );

          err.name = "IncorrectData";
          throw err;
        }
        break;
      case "Input":
        if (typeof answer !== String) {
          const err = new Error(
            "Answer must be of type String for input question"
          );

          err.name = "IncorrectData";
          throw err;
        }
        break;
      case "Inputs":
        if (typeof answer !== Array) {
          const err = new Error(
            "Answer must be of type Array for inputs question"
          );

          err.name = "IncorrectData";
          throw err;
        } else if (typeof answer[0] !== String) {
          const err = new Error(
            "Answer's Array must contain Strings for inputs question"
          );

          err.name = "IncorrectData";
          throw err;
        }
    }
  }

  async createQuestion({ type, subject, answer }) {
    this.parseQuestion({ type, subject, answer });
    await this.questionRepository.saveQuestion({ type, subject, answer });
  }
}

export default QuestionService;
