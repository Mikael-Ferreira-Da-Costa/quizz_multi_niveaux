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
    const hasDuplicates = quizzData.tags.some((tag, index) => 
    quizzData.tags.indexOf(tag) !== index
    );
    if(hasDuplicates){
        throw new Error("Duplicates tags are not allowed")
    }
        
    
    return await quizzRepository.create(quizzData);
};
