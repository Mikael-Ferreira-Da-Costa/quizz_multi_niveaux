import express from 'express';
import QuizzController from '../quizz/quizz.controller.js';

const router = express.Router();
const quizzController = new QuizzController();

router.post('/', quizzController.createQuizz);           
router.get('/find', quizzController.findAllQuizzes);         
router.get('/:id', quizzController.findQuizz);           

export default router;
