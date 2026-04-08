import { Difficulty, QuestionType } from './trivia';

export interface AnswerRecord {
  questionId: string;
  question: string;
  selectedAnswer: string | null;
  correctAnswer: string;
  isCorrect: boolean;
  type: QuestionType;
  timeSpent: number;
}

export interface QuizResult {
  id?: number;
  username: string;
  score: number;
  percentage: number;
  completedAt: string;
  durationSeconds: number;
  totalQuestions: number;
  correctAnswers: number;
  wrongAnswers: number;
  category: string;
  difficulty: Difficulty | 'any';
  answersJson: string;
}