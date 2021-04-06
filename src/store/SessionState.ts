import IUser from '../interfaces/IUser';
import IUserHasAccess from '../interfaces/IUserHasAccess';
import IQuestion from '../interfaces/IQuestion';
import { IRootState } from '../store/index';
import { getStoreBuilder, BareActionContext } from 'vuex-typex';

export interface ISessionState {
    User: IUser,
    UserHasAccess: IUserHasAccess,
    AccessMessage: string,
    ErrorMessage: string,
    InUseQuestions: Array<IQuestion>,
}

const initialSessionState: ISessionState = {
    User: { id: 0, firstName: '', lastName: '', username: '', password: ''},
    UserHasAccess: { id: 0, accessLevelId: 0, userId: 0 },
    AccessMessage: '',
    ErrorMessage: '',
    InUseQuestions: [],
}

const a = getStoreBuilder<IRootState>().module('sessionState', initialSessionState)

// getters
const initialSessionStateGetter = a.read(initialSessionState => initialSessionState, 'initialSessionState');
const userGetter = a.read(state => state.User, 'User');
const userHasAccessGetter = a.read(state => state.UserHasAccess, 'UserHasAccess');
const accessMessageGetter = a.read(state => state.AccessMessage, 'AccessMessage');
const errorMessageGetter = a.read(state => state.ErrorMessage, 'ErrorMessage');
const inUseQuestionsGetter = a.read(state => state.InUseQuestions, 'InUseQuestions');

// mutations
function setSessionState(state: ISessionState, sessionState: ISessionState): void {
    state = initialSessionState;
}

function setUser(state: ISessionState, user: IUser): void {
    state.User = user;
}

function setUserHasAccess(state: ISessionState, userHasAccess: IUserHasAccess): void {
    state.UserHasAccess = userHasAccess;
}

function setAccessMessage(state: ISessionState, accessMessage: string): void {
    state.AccessMessage = accessMessage;
}

function setErrorMessage(state: ISessionState, errorMessage: string): void {
    state.ErrorMessage = errorMessage;
}

function setInUseQuestions(state: ISessionState, inUseQuestions: Array<IQuestion>): void {
    state.InUseQuestions = inUseQuestions;
}
// action
async function initialiseSession(context: BareActionContext<ISessionState, IRootState>) {
    sessionState.commitSetUser(initialSessionState.User);
    sessionState.commitSetUserHasAccess(initialSessionState.UserHasAccess);
    sessionState.commitSetAccessMessage(initialSessionState.AccessMessage);
    sessionState.commitSetErrorMessage(initialSessionState.ErrorMessage);
    sessionState.commitSetInUseQuestions(initialSessionState.InUseQuestions);
}

// state
const stateGetter = a.state();

const sessionState = {
    // object getters
    get state(): ISessionState {
        return initialSessionStateGetter();
    },

    get user(): IUser {
        return userGetter();
    },
    
    get UserHasAccess(): IUserHasAccess {
        return userHasAccessGetter();
    },
    
    get accessMessage(): string {
        return accessMessageGetter();
    },

    get errorMessage(): string {
        return errorMessageGetter();
    },

    get inUseQuestions(): Array<IQuestion> {
        return inUseQuestionsGetter();
    },
    // mutations
    commitSetSessionState: a.commit(setSessionState),
    commitSetUser: a.commit(setUser),
    commitSetUserHasAccess: a.commit(setUserHasAccess),
    commitSetAccessMessage: a.commit(setAccessMessage),
    commitSetErrorMessage: a.commit(setErrorMessage),
    commitSetInUseQuestions: a.commit(setInUseQuestions),

};

export default sessionState;
