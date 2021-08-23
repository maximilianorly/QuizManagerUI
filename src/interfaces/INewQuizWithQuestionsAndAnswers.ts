import IQuestionWithAnswers from '../interfaces/IQuestion'
import INewQuestionWithAnswers from './INewQuestionWithAnswer';
export default interface INewQuizWithQuestionsAndAnswers {
    quizName: string;
    isActive?: boolean;
    questionsWithAnswers?: Array<INewQuestionWithAnswers>;
}