import Quizz from './quizz.model.js';

class QuizzRepository {
    async create(quizzData) {
        const newQuizz = new Quizz(quizzData);
        return await newQuizz.save();
    }
    async findById(id) {
        return await Quizz.findById(id).populate('questions');
    }
    async findAll() {
        return await Quizz.find().populate('questions');
    }
    async addQuestionToQuizz(quizzId, questionId){
        return await Quizz.findByIdAndUpdate(
            quizzId, 
            { $push: { questions: questionId } }, 
            { new: true }
        ).populate('questions');
    }
}

export default new QuizzRepository();