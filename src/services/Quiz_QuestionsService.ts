import axios from 'axios';
import IUserCredentials from '../interfaces/IUserCredentials';
import sessionState from '../store/SessionState';
import IQuestion from '../interfaces/IQuestion';

export default class QuestionsService {
    private readonly portApi: string = "https://localhost:5001";
    private readonly controllerName: string = "Questions";
    private readonly headers = {headers: { "Access-Control-Allow-Origin": "*" }, "Content-Type": "application/json"};

    // Promise<void>
    public async getActiveQuestions(): Promise<Array<IQuestion>> {
        console.log(3);
        let _activeQuestions;
        
        await axios
        .get(`${this.portApi}/api/${this.controllerName}/GetAllActiveQuestions`, this.headers)
        .then(response => {
            if (response.status === 200) {
                if (response.data !== '') {
                    const _parsedRes = JSON.parse(JSON.stringify(response.data));
                    _activeQuestions = _parsedRes;
                }
            }
        });

        return _activeQuestions;
    }
}