import {
  Category,
  FetchQuestionsParams,
  TriviaApiQuestion,
  TriviaApiResponse,
  TriviaCategoriesResponse,
  TriviaQuestion,
} from '../types/trivia';
import { decodeHtml } from '../utils/decodeHtml';
import { shuffleAnswers } from '../utils/shuffleAnswers';

const API_BASE_URL = 'https://opentdb.com';

const getErrorMessageByResponseCode = (code: number): string => {
  switch (code) {
    case 1:
      return 'Не удалось получить вопросы. Попробуй изменить параметры викторины.';
    case 2:
      return 'Некорректные параметры запроса.';
    case 3:
      return 'Проблема с session token.';
    case 4:
      return 'Все доступные вопросы уже были использованы.';
    case 5:
      return 'Слишком много запросов. Подожди немного и попробуй снова.';
    default:
      return 'Произошла ошибка при загрузке вопросов.';
  }
};

const normalizeQuestion = (
  item: TriviaApiQuestion,
  index: number,
): TriviaQuestion => {
  const correctAnswer = decodeHtml(item.correct_answer);
  const incorrectAnswers = item.incorrect_answers.map(answer => decodeHtml(answer));
  const answers = shuffleAnswers([correctAnswer, ...incorrectAnswers]);

  return {
    id: `${index}-${item.question}`,
    category: decodeHtml(item.category),
    type: item.type,
    difficulty: item.difficulty,
    question: decodeHtml(item.question),
    correctAnswer,
    answers,
  };
};

export const fetchCategories = async (): Promise<Category[]> => {
  const response = await fetch(`${API_BASE_URL}/api_category.php`);

  if (!response.ok) {
    throw new Error('Ошибка сети при загрузке категорий.');
  }

  const data: TriviaCategoriesResponse = await response.json();
  return data.trivia_categories ?? [];
};

export const fetchQuestions = async ({
  amount = 10,
  categoryId = null,
  difficulty = 'any',
  type = 'any',
}: FetchQuestionsParams): Promise<TriviaQuestion[]> => {
  const params = new URLSearchParams();
  params.append('amount', String(amount));

  if (categoryId) {
    params.append('category', String(categoryId));
  }

  if (difficulty !== 'any') {
    params.append('difficulty', difficulty);
  }

  if (type !== 'any') {
    params.append('type', type);
  }

  const url = `${API_BASE_URL}/api.php?${params.toString()}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Ошибка сети при загрузке вопросов.');
  }

  const data: TriviaApiResponse = await response.json();

  if (data.response_code !== 0) {
    throw new Error(getErrorMessageByResponseCode(data.response_code));
  }

  return data.results.map(normalizeQuestion);
};