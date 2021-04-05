import axios from "axios";
import IUser from "../interfaces/IUser";
import IUserCredentials from "../interfaces/IUserCredentials";
import sessionState from "../store/SessionState";

export default class UserService {
    private readonly portApi: string = "https://localhost:5001";
    private readonly controllerName: string = "User";

    // Promise<void>
    public async verifyCredentials(Credentials: IUserCredentials): Promise<any> {
        let authenticationSuccessful: boolean = false;

        await axios
        .post(`${this.portApi}/api/${this.controllerName}`, Credentials, {headers: { "Access-Control-Allow-Origin": "*" }})
        .then(response => {
            if (response.status === 200) {
                authenticationSuccessful = response.data as boolean;

                if (authenticationSuccessful && response.data !== "") {
                    const user = response.data as IUser;

                    this.setAuthenticatedUserAsLoggedInUser(user);
                }
            }
        });

        return authenticationSuccessful;
    }

    private get user() {
        return sessionState.state.User;
    }
    private setAuthenticatedUserAsLoggedInUser(LoggedInUser: IUser) {
        sessionState.commitSetUser(LoggedInUser);
    }
}