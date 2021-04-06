import axios from 'axios';
import IUserCredentials from '../interfaces/IUserCredentials';
import sessionState from '../store/SessionState';

export default class AnswersService {
    private readonly portApi: string = "https://localhost:5001";
    private readonly controllerName: string = "Answers";
    private readonly headers = {headers: { "Access-Control-Allow-Origin": "*" }, "Content-Type": "application/json"};

    // Promise<void>
    public async getAnswersForQuestionId(QuestionId: number): Promise<void> {
        let authenticationSuccessful: boolean = false;

        await axios
        .get(`${this.portApi}/api/${this.controllerName}/${QuestionId}`, this.headers)
        .then(response => {
            if (response.status === 200) {
                const parsedRes = JSON.parse(JSON.stringify(response.data));
                authenticationSuccessful = response.data as boolean;

                if (response.data !== '') {
                    
                }
                else {

                }
            }
        });
    }
}