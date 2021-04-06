export default interface IQuestion {
    id?: number;
    question?: string;
    isActive?: boolean;
    created?: string;
    modified?: string;
}

export interface IQuestionWithAnswers extends IQuestion {
    answerId: number;
    questionId: number;
    isCorrectOption: number;
    option: string;
    created: string;
    modified: string;
}