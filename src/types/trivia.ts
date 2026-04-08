export type Difficulty = 'easy' | 'medium' | 'hard';
export type QuestionType = 'multiple' | 'boolean';

export interface Category {
  id: number;
  name: string;
}

export interface TriviaCategoriesResponse {
  trivia_categories: Category[];
}

export interface TriviaApiQuestion {
  category: string;
  type: QuestionType;
  difficulty: Difficulty;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

export interface TriviaApiResponse {
  response_code: number;
  results: TriviaApiQuestion[];
}

export interface TriviaQuestion {
  id: string;
  category: string;
  type: QuestionType;
  difficulty: Difficulty;
  question: string;
  correctAnswer: string;
  answers: string[];
}

export interface FetchQuestionsParams {
  amount?: number;
  categoryId?: number | null;
  difficulty?: Difficulty | 'any';
  type?: QuestionType | 'any';
}