import IAnswer from './IAnswer';
import IQuestion from './IQuestion';
import IQuestionAnswers from './IQuestionAnswers';

export default interface IQuiz {
    id: number;
    isActive: boolean;
    name: string;
}

export interface IQuizWithQuestions extends IQuiz {
    questions?: Array<IQuestion>;
}

export interface IQuizWithQuestionsAndAnswers extends IQuizWithQuestions {
    answers?: Array<IQuestionAnswers>;
}