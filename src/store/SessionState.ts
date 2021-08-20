import IUser from '../interfaces/IUser';
import IUserHasAccess from '../interfaces/IUserHasAccess';
import IQuiz, { IQuizWithQuestionsAndAnswers } from '../interfaces/IQuiz';
import IQuestion, { IQuestionWithAnswers } from '../interfaces/IQuestion';
import IQuestionAnswers from '../interfaces/IQuestionAnswers';
import IUserAnswerChoice from '../interfaces/IUserAnswerChoice';
import { IRootState } from '../store/index';
import { getStoreBuilder, BareActionContext } from 'vuex-typex';

export interface ISessionState {
    User: IUser,
    UserHasAccess: IUserHasAccess,
    AccessMessage: string,
    ErrorMessage: string,
    Quizzes: Array<IQuiz>,
    SelectedQuiz: IQuizWithQuestionsAndAnswers,
    InUseQuestions: Array<IQuestion>,
    QuestionAnswers: Array<IQuestionAnswers>,
    InUseQuestionsWithAnswers: Array<IQuestionWithAnswers>,
    CurrentUserChosenAnswer: IUserAnswerChoice,
    UserAnswersForQuiz: Array<IUserAnswerChoice>,
}

const initialSessionState: ISessionState = {
    User: { id: 0, firstName: '', lastName: '', username: '', password: ''},
    UserHasAccess: { id: 0, accessLevelId: 0, userId: 0 },
    AccessMessage: '',
    ErrorMessage: '',
    Quizzes: [],
    SelectedQuiz: { id: 0, isActive: false, name: '', questions: [], answers: [] },
    InUseQuestions: [],
    QuestionAnswers: [],
    InUseQuestionsWithAnswers: [],
    CurrentUserChosenAnswer: { questionId: 0, answerId: 0 },
    UserAnswersForQuiz: [],
}

const a = getStoreBuilder<IRootState>().module('sessionState', initialSessionState)

// getters
const initialSessionStateGetter = a.read(initialSessionState => initialSessionState, 'initialSessionState');
const userGetter = a.read(state => state.User, 'User');
const userHasAccessGetter = a.read(state => state.UserHasAccess, 'UserHasAccess');
const accessMessageGetter = a.read(state => state.AccessMessage, 'AccessMessage');
const errorMessageGetter = a.read(state => state.ErrorMessage, 'ErrorMessage');
const quizzesGetter = a.read(state => state.Quizzes, 'Quizzes');
const selectedQuizGetter = a.read(state => state.SelectedQuiz, 'SelectedQuiz');
const inUseQuestionsGetter = a.read(state => state.InUseQuestions, 'InUseQuestions');
const questionAnswersGetter = a.read(state => state.QuestionAnswers, 'QuestionAnswers');
const inUseQuestionsWithAnswersGetter = a.read(state => state.InUseQuestionsWithAnswers, 'InUseQuestionsWithAnswers');
const currentUserChosenAnswerGetter = a.read(state => state.CurrentUserChosenAnswer, 'CurrentUserChosenAnswer');
const userAnswersForQuizGetter = a.read(state => state.UserAnswersForQuiz, 'UserAnswersForQuiz');

// mutations
function setSessionState(state: ISessionState, sessionState: ISessionState): void {
    state = sessionState;
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

function setQuizzes(state: ISessionState, quizzes: Array<IQuiz>): void {
    state.Quizzes = quizzes;
}

function setSelectedQuiz(state: ISessionState, SelectedQuiz: IQuizWithQuestionsAndAnswers): void {
    state.SelectedQuiz = SelectedQuiz;
}

function setInUseQuestions(state: ISessionState, inUseQuestions: Array<IQuestion>): void {
    state.InUseQuestions = inUseQuestions;
}

function setQuestionAnswers(state: ISessionState, questionAnswers: Array<IQuestionAnswers>): void {
    state.QuestionAnswers = questionAnswers;
}

function setInUseQuestionsWithAnswers(state: ISessionState, inUseQuestionsWithAnswers: Array<IQuestionWithAnswers>): void {
    state.InUseQuestionsWithAnswers = inUseQuestionsWithAnswers;
}

function setCurrentUserChosenAnswer(state: ISessionState, currentUserChosenAnswer: IUserAnswerChoice): void {
    state.CurrentUserChosenAnswer = currentUserChosenAnswer;
}

function setUserAnswersForQuiz(state: ISessionState, userAnswersForQuiz: Array<IUserAnswerChoice>): void {
    state.UserAnswersForQuiz = userAnswersForQuiz;
}

// action
async function initialiseSession(context: BareActionContext<ISessionState, IRootState>) {
    sessionState.commitSetUser(initialSessionState.User);
    sessionState.commitSetUserHasAccess(initialSessionState.UserHasAccess);
    sessionState.commitSetAccessMessage(initialSessionState.AccessMessage);
    sessionState.commitSetErrorMessage(initialSessionState.ErrorMessage);
    sessionState.commitSetQuizzes(initialSessionState.Quizzes);
    sessionState.commitSetSelectedQuiz(initialSessionState.SelectedQuiz);
    sessionState.commitSetInUseQuestions(initialSessionState.InUseQuestions);
    sessionState.commitSetQuestionAnswers(initialSessionState.QuestionAnswers);
    sessionState.commitSetInUseQuestionsWithAnswers(initialSessionState.InUseQuestionsWithAnswers);
    sessionState.commitSetCurrentUserChosenAnswer(initialSessionState.CurrentUserChosenAnswer);
    sessionState.commitSetUserAnswersForQuiz(initialSessionState.UserAnswersForQuiz);
    
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

    get quizzes(): Array<IQuiz> {
        return quizzesGetter();
    },

    get selectedQuiz(): IQuizWithQuestionsAndAnswers{
        return selectedQuizGetter();
    },

    get inUseQuestions(): Array<IQuestion> {
        return inUseQuestionsGetter();
    },

    get questionAnswers(): Array<IQuestionAnswers> {
        return questionAnswersGetter();
    },
    
    get inUseQuestionsWithAnswers(): Array<IQuestionWithAnswers> {
        return inUseQuestionsWithAnswersGetter();
    },
    
    get currentUserChosenAnswer(): IUserAnswerChoice {
        return currentUserChosenAnswerGetter();
    },

    get userAnswersForQuiz(): Array<IUserAnswerChoice> {
        return userAnswersForQuizGetter();
    },

    // mutations
    commitSetSessionState: a.commit(setSessionState),
    commitSetUser: a.commit(setUser),
    commitSetUserHasAccess: a.commit(setUserHasAccess),
    commitSetAccessMessage: a.commit(setAccessMessage),
    commitSetErrorMessage: a.commit(setErrorMessage),
    commitSetQuizzes: a.commit(setQuizzes),
    commitSetSelectedQuiz: a.commit(setSelectedQuiz),
    commitSetInUseQuestions: a.commit(setInUseQuestions),
    commitSetQuestionAnswers: a.commit(setQuestionAnswers),
    commitSetInUseQuestionsWithAnswers: a.commit(setInUseQuestionsWithAnswers),
    commitSetCurrentUserChosenAnswer: a.commit(setCurrentUserChosenAnswer),
    commitSetUserAnswersForQuiz: a.commit(setUserAnswersForQuiz),

};

export default sessionState;
