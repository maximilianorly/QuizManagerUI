import INewAnswer from '../interfaces/InewAnswer';
export default interface INewQuestionWithAnswers {
    questionId?: number;
    question?: string;
    answers?: Array<INewAnswer>;
}