import axios from 'axios';
import IUser from '../interfaces/IUser';
import IUserCredentials from '../interfaces/IUserCredentials';
import sessionState from '../store/SessionState';

export default class UserService {
    private readonly portApi: string = "https://localhost:5001";
    private readonly controllerName: string = "User";
    private readonly headers = {headers: { "Access-Control-Allow-Origin": "*" }, "Content-Type": "application/json"};

    private get user() {
        return sessionState.state.User;
    }
    private setAuthenticatedUserAsLoggedInUser(LoggedInUser: IUser) {
        sessionState.commitSetUser(LoggedInUser);
    }

    public async verifyCredentials(Credentials: IUserCredentials): Promise<void> {
        let authenticationSuccessful: boolean = false;

        await axios
        .post(`${this.portApi}/api/${this.controllerName}`, Credentials, this.headers)
        .then(response => {
            if (response.status === 200) {
                const parsedRes = JSON.parse(JSON.stringify(response.data));
                authenticationSuccessful = response.data as boolean;

                if (authenticationSuccessful && response.data !== '') {
                    const user = parsedRes as IUser;

                    this.setAuthenticatedUserAsLoggedInUser(user);
                }
                else {
                    sessionState.commitSetErrorMessage('Could not retreive user.')
                }
            }
        });
    }
}