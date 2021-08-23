import INewAnswer from '../interfaces/InewAnswer';
export default interface INewQuestionWithAnswers {
    question?: string;
    answers?: Array<INewAnswer>;
}