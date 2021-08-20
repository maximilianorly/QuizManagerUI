import IQuestionAnswers from './IQuestionAnswers';

export default interface IQuestion {
    id?: number;
    question?: string;
    isActive?: boolean;
    created?: string;
    modified?: string;
}

export interface IQuestionWithAnswers extends IQuestion {
    answerOptions?: Array<IQuestionAnswers>;
}