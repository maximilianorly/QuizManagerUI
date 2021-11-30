import axios from 'axios';
import IUser, { IUserAccess } from '../interfaces/IUser';
import IUserCredentials from '../interfaces/IUserCredentials';
import sessionState from '../store/SessionState';
import IUserHasAccess from '@/interfaces/IUserHasAccess';
import UserAccessEnum from '../enums/UserAccessEnum';

export default class UserService {
    private readonly portApi: string = "https://localhost:5001";
    private readonly controllerName: string = "User";
    private readonly headers = {headers: { "Access-Control-Allow-Origin": "POST, PUT, GET, OPTIONS" }, "Content-Type": "application/json"};

    private get user() {
        return sessionState.state.User;
    }
    private setAuthenticatedUserAsLoggedInUser(LoggedInUser: IUser) {
        sessionState.commitSetUser(LoggedInUser);
    }

    private async getUserByUserId(UserId: number) {
        await axios
        .get(`${this.portApi}/api/${this.controllerName}/${UserId}`, this.headers)
        .then(response => {
            if (response.status === 200) {
                const parsedRes = JSON.parse(JSON.stringify(response.data));

                if (parsedRes !== '') {
                    const user = { id: parsedRes.id, firstName: parsedRes.firstName, lastName: parsedRes.lastName, username: parsedRes.userName} as IUser;
                    sessionState.commitSetUser(user);
                }
                else {
                    sessionState.commitSetErrorMessage('Could not logout user.')
                }
            }
        });
    }

    private setUserAccess(userAccess: IUserHasAccess) {
        sessionState.commitSetUserHasAccess(userAccess);

        if (userAccess.accessLevelId === UserAccessEnum.Admin) {
            sessionState.commitSetAccessMessage('As Admin, you have access to all quiz content and edit rights.');
        }
        else if (userAccess.accessLevelId === UserAccessEnum.UserWithAnswerAccess) {
            sessionState.commitSetAccessMessage('With your privilidged access,you can view all quiz content.');
        }
        else if (userAccess.accessLevelId === UserAccessEnum.Restricted) {
            sessionState.commitSetAccessMessage('With restricted access you can only view questions in each quiz.');
        }
        else {
            sessionState.commitSetErrorMessage('Could not set user access level');
        }
    }

    public async verifyCredentials(Credentials: IUserCredentials): Promise<void> {
        let authenticationSuccessful: boolean = false;

        await axios
        .post(`${this.portApi}/api/${this.controllerName}/Login`, Credentials, this.headers)
        .then(async response => {
            if (response.status === 200) {
                const parsedRes = JSON.parse(JSON.stringify(response.data));
                authenticationSuccessful = response.data as boolean;

                if (authenticationSuccessful && response.data !== '') {
                    const userAccess = parsedRes as IUserHasAccess;

                    if (userAccess && userAccess.userId) {
                        this.setUserAccess(userAccess);
                        await this.getUserByUserId(userAccess.userId);
                    }
                }
                else {
                    sessionState.commitSetErrorMessage('Could not retreive user.')
                }
            }
        });
    }

    public async changeLogInState(Credentials?: IUserCredentials) {
        if (Credentials) {
            await this.verifyCredentials(Credentials);
        }
        else if (sessionState.state.UserHasAccess.userId){
            await this.logoutUser(sessionState.state.UserHasAccess.userId);
        }
        else {
            sessionState.commitSetErrorMessage("Something went wrong. If logging in then credentials must be supplied.");
        }
    }

    public async logoutUser(UserId: Number) {
        await axios
        .put(`${this.portApi}/api/${this.controllerName}/Logout/${UserId}`, this.headers)
        .then(response => {
            if (response.status === 200) {
                const parsedRes = JSON.parse(JSON.stringify(response.data));
                
                if (parsedRes === '') {
                    
                    sessionState.commitSetErrorMessage('Could not logout user.')
                }
            }
        });
    }
}