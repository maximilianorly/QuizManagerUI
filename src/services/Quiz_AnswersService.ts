import axios from 'axios';
import IUserCredentials from '../interfaces/IUserCredentials';
import sessionState from '../store/SessionState';
import IQuestionAnswers from '../interfaces/IQuestionAnswers';

export default class AnswersService {
    private readonly portApi: string = "https://localhost:5001";
    private readonly controllerName: string = "Answers";
    private readonly headers = {headers: { "Access-Control-Allow-Origin": "*" }, "Content-Type": "application/json"};

    public async getAnswersForQuestionId(QuestionId: number): Promise<Array<IQuestionAnswers>> {
        let _answersForActiveQuestions: Array<IQuestionAnswers> = [];

        const accessLevel = sessionState.state.UserHasAccess;
        await axios
        .post(`${this.portApi}/api/${this.controllerName}/GetAllAnswerOptionsForQuestion/${QuestionId}`, accessLevel, this.headers)
        .then(response => {
            if (response.status === 200) {
                if (response.data !== '') {
                    const _parsedRes = JSON.parse(JSON.stringify(response.data));
                    _answersForActiveQuestions = _parsedRes;
                }
            }
        });

        return _answersForActiveQuestions;
    }
}