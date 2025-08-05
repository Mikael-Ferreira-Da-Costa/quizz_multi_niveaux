import mongoose, { Schema } from 'mongoose';

const quizzSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },  
});

const Quizz = mongoose.model('Quizz', quizzSchema);

export default Quizz;
