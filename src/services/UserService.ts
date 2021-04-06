import axios from 'axios';
import IUser from '../interfaces/IUser';
import IUserCredentials from '../interfaces/IUserCredentials';
import sessionState from '../store/SessionState';

export default class UserService {
    private readonly portApi: string = "https://localhost:5001";
    private readonly controllerName: string = "User";

    private get user() {
        return sessionState.state.User;
    }
    private setAuthenticatedUserAsLoggedInUser(LoggedInUser: IUser) {
        console.dir(LoggedInUser);
        sessionState.commitSetUser(LoggedInUser);
    }

    // Promise<void>
    public async verifyCredentials(Credentials: IUserCredentials): Promise<void> {
        let authenticationSuccessful: boolean = false;

        await axios
        .post(`${this.portApi}/api/${this.controllerName}`, Credentials, {headers: { "Access-Control-Allow-Origin": "*" }})
        .then(response => {
            if (response.status === 200) {
                const parsedRes = JSON.parse(JSON.stringify(response.data));
                authenticationSuccessful = response.data as boolean;

                if (authenticationSuccessful && response.data !== '') {
                    const user = parsedRes as IUser;
                    console.dir(`USER: ${user}`);
                    // console.dir(user);

                    this.setAuthenticatedUserAsLoggedInUser(user);
                }
                else {
                    sessionState.commitSetErrorMessage('Could not retreive user.')
                }
                // authenticationSuccessful = response.data as boolean;
            }
        });
    }
}