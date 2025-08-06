import express from 'express';
import QuizzController from '../quizz/quizz.controller.js';

const router = express.Router();
const quizzController = new QuizzController();

router.post('/createQuizz', quizzController.createQuizz);           
router.get('/', quizzController.findAllQuizzes);         
router.get('/:id', quizzController.findQuizz);           

export default router;
