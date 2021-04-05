import IUser from "../interfaces/IUser";
import { IRootState } from "../store/index";
import { getStoreBuilder, BareActionContext } from "vuex-typex";

export interface ISessionState {
    User: IUser
}

const initialSessionState: ISessionState = {
    User: { Id: 0, FirstName: "", LastName: "", Username: "", Password: ""}
}

const a = getStoreBuilder<IRootState>().module("sessionState", initialSessionState)

// getters
const initialSessionStateGetter = a.read(initialSessionState => initialSessionState, "initialSessionState");
const userGetter = a.read(state => state.User, "User");

// mutations
function setSessionState(state: ISessionState, sessionState: ISessionState): void {
    state = sessionState;
}

function setUser(state: ISessionState, user: IUser): void {
    state.User = user;
}

// action
async function initialiseSession(context: BareActionContext<ISessionState, IRootState>) {
    sessionState.commitSetUser(initialSessionState.User);
}

// state
const stateGetter = a.state();

const sessionState = {
    // object getters
    get state(): ISessionState {
        return stateGetter();
    },

    get user(): IUser {
        return userGetter();
    },


    // mutations
    commitSetSessionState: a.commit(setSessionState),
    commitSetUser: a.commit(setUser),
};

export default sessionState;
