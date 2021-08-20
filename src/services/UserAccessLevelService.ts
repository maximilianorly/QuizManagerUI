// import axios from 'axios';
// import IUser from '../interfaces/IUser';
// import IUserCredentials from '../interfaces/IUserCredentials';
// import IUserHasAccess from '../interfaces/IUserHasAccess';
// import UserAccessEnum from '../enums/UserAccessEnum';
// import sessionState from '../store/SessionState';
// import router from '../router';

// export default class UserAccessLevelService {
//     private readonly portApi: string = "https://localhost:5001";
//     private readonly controllerName: string = "UserAccess";
//     private readonly headers = {headers: { "Access-Control-Allow-Origin": "*" }, "Content-Type": "application/json"};

//     private setUserAccessMessage(AccessLevel: number) {
//         if (AccessLevel === UserAccessEnum.Admin) {
//             sessionState.commitSetAccessMessage('As Admin, you can take the quiz or edit content.');
//         }
//         else if (AccessLevel === UserAccessEnum.UserWithAnswerAccess) {
//             sessionState.commitSetAccessMessage('With your privilidged access,you can take the quiz or edit content.');
//         }
//         else if (AccessLevel === UserAccessEnum.Restricted) {
//             sessionState.commitSetAccessMessage('Time to enjoy the quiz!');
//         }
//         else {
//             sessionState.commitSetErrorMessage('Could not set user access level');
//         }
//     }

//     public async getUserAccessLevelByUserId(UserId: number): Promise<void> {
//         await axios
//         .get(`${this.portApi}/api/${this.controllerName}/${UserId}`, this.headers)
//         .then(response => {
//             let userHasAccess: IUserHasAccess;
//             if (response.status === 200) {

//                 if (response.data !== '') {
//                     userHasAccess = response.data as IUserHasAccess;

//                     sessionState.commitSetUserHasAccess(userHasAccess);
//                     if (userHasAccess.accessLevelId !== undefined) {
//                         this.setUserAccessMessage(userHasAccess.accessLevelId);
//                     }
//                 }
//             }
//         });
//     }
// }