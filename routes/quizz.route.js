import express from 'express';
import QuizzController from '../quizz/quizz.controller.js';

const router = express.Router();
const quizzController = new QuizzController();

router.post('/', (req, res, next) => quizzController.createQuizz(req, res, next));           
router.get('/find', (req, res, next) => quizzController.findAllQuizzes(req, res, next));         
router.get('/:id', (req, res, next)=> quizzController.findQuizz(req, res, next));           
router.delete("/:id", (req, res, next) => quizzController.deleteQuizz(req, res, next));
export default router;
