import axios from 'axios';
import IUserCredentials from '../interfaces/IUserCredentials';
import sessionState from '../store/SessionState';
import QuestionsService from './Quiz_QuestionsService';
import AnswersService from './Quiz_AnswersService';
import IQuestion from '../interfaces/IQuestion';

export default class QuizService {
    private readonly portApi: string = "https://localhost:5001";
    private readonly controllerName: string = "User";
    private readonly headers = {headers: { "Access-Control-Allow-Origin": "*" }, "Content-Type": "application/json"};
    private QuestionsService = new QuestionsService();
    private AnswersService = new AnswersService();

    public async getActiveQuestions(): Promise<void> {
        console.log(2);
        await this.QuestionsService.getActiveQuestions()
        .then((response) => {
            const _activeQuestions: Array<IQuestion> = response;
            this.setQuestions(_activeQuestions);
        })
    }

    private setQuestions(ActiveQuestions: Array<IQuestion>) {
        let _questionsForQuiz: Array<IQuestion> = [];
        ActiveQuestions.forEach(question => {
            console.log(question);
            _questionsForQuiz.push(question);
            sessionState.commitSetInUseQuestions(_questionsForQuiz);
        });
    }
}