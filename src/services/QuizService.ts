import axios from 'axios';
import IUserCredentials from '../interfaces/IUserCredentials';
import sessionState from '../store/SessionState';
import QuestionsService from './Quiz_QuestionsService';
import AnswersService from './Quiz_AnswersService';
import IQuestion, { IQuestionWithAnswers } from '../interfaces/IQuestion';
import IQuestionAnswers from '../interfaces/IQuestionAnswers';

export default class QuizService {
    private readonly portApi: string = "https://localhost:5001";
    private readonly controllerName: string = "User";
    private readonly headers = {headers: { "Access-Control-Allow-Origin": "*" }, "Content-Type": "application/json"};
    private QuestionsService = new QuestionsService();
    private AnswersService = new AnswersService();

    public async getActiveQuestions(): Promise<void> {
        await this.QuestionsService.getActiveQuestions()
        .then(async (response) => {
            const _activeQuestions: Array<IQuestion> = response;
            await this.setQuestions(_activeQuestions);

            console.log('questions set');
            _activeQuestions.forEach(async question => {
                await this.getAnswersForQuestionId(question.id)
                .then((response) => {
                    const _questionAnswers: Array<IQuestionAnswers> = response;
                    // console.log(response)
                    this.setAnswersForQuestion(_questionAnswers);
                })
            });
        });

        // sessionState.state.InUseQuestions.forEach(async question => {
        //     await this.getAnswersForQuestionId(question.id);
        // });

    }

    private setQuestions(ActiveQuestions: Array<IQuestion>) {
        let _questionsForQuiz: Array<IQuestion> = [];
        ActiveQuestions.forEach(question => {
            _questionsForQuiz.push(question);
            sessionState.commitSetInUseQuestions(_questionsForQuiz);
        });
    }

    private async getAnswersForQuestionId(QuestionId: number): Promise<Array<IQuestionAnswers>> {
        let _answersForQuestion: Array<IQuestionAnswers> = [];
        await this.AnswersService.getAnswersForQuestionId(QuestionId)
        .then(async (response) => {
            _answersForQuestion = response;
        })
        return _answersForQuestion;
    }

    private setAnswersForQuestion(Answers: Array<IQuestionAnswers>) {
        let _questionAnswers: Array<IQuestionAnswers> = sessionState.state.QuestionAnswers;
        Answers.forEach(answer => {
            _questionAnswers.push(answer);
            // console.log(_questionAnswers)
            sessionState.commitSetQuestionAnswers(_questionAnswers);
        });
        console.log(sessionState.state.QuestionAnswers)
    }

    private mapAnswersToQuestions(Questions: Array<IQuestion>, Answers: Array<IQuestionAnswers>) {
        let _answersHaveQuestion: Array<IQuestionWithAnswers> = [];

    }
}