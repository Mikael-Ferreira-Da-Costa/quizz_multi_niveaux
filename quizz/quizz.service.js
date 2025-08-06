import quizzRepository from './quizz.repository.js';

export const createQuizz = async (quizzData) => {

    if (!quizzData.title) {
        throw new Error('Title is required');
    } else if (!quizzData.description) {
        throw new Error('Description is required');
    }

    if (!quizzData.tags) {
        throw new Error('Tags are required');
    }
    if (!quizzData.difficulty) {
        throw new Error('Difficulty is required');
    }
    
    return await quizzRepository.create(quizzData);
};
