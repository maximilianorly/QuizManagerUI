import axios, { AxiosResponse } from 'axios';
import sessionState from '../store/SessionState';
import QuestionsService from './Quiz_QuestionsService';
import AnswersService from './Quiz_AnswersService';
import IQuiz, { IQuizWithQuestionsAndAnswers } from '../interfaces/IQuiz';
import IQuestion, { IQuestionWithAnswers } from '../interfaces/IQuestion';
import IQuestionAnswers from '../interfaces/IQuestionAnswers';
import IAnswer from '../interfaces/IAnswer';
import INewQuizWithQuestionsAndAnswers from '../interfaces/INewQuizWithQuestionsAndAnswers';
import INewQuestionWithAnswers from '@/interfaces/INewQuestionWithAnswer';

export default class QuizService {
    private readonly portApi: string = "https://localhost:5001";
    private readonly controllerName: string = "Quiz";
    private readonly headers = {headers: { "Access-Control-Allow-Origin": "*" }, "Content-Type": "application/json"};
    private QuestionsService = new QuestionsService();
    private AnswersService = new AnswersService();

    private get userAccess() {
        return sessionState.state.UserHasAccess;
    }

    public async getQuizzes(): Promise<Array<IQuiz>> {
        let _quizzes: Array<IQuiz> = [];
        let _queryString: string = `${this.portApi}/api/${this.controllerName}/Active`
        
        if (this.userAccess.accessLevelId === 1) {
            _queryString = `${this.portApi}/api/${this.controllerName}`   
        }

        await axios
            .get(_queryString, this.headers)
            .then(response => {
                if (response.status === 200) {
                    if (response.data !== '') {
                        const _parsedRes = JSON.parse(JSON.stringify(response.data));
                        _quizzes = _parsedRes as Array<IQuiz>;
                    }
                }
            });

        sessionState.commitSetQuizzes(_quizzes);

        return _quizzes;
    }

    public async setQuizData(Quiz: IQuiz): Promise<IQuizWithQuestionsAndAnswers> {
        const QuizWithData = { id: Quiz.id, isActive: Quiz.isActive, name: Quiz.name } as IQuizWithQuestionsAndAnswers;
        

        if (QuizWithData.id) {
            if (!QuizWithData.questions) {
                await this.getQuestionsByQuizId(QuizWithData.id)
                .then(async questions => {
                        QuizWithData.questions = questions;
                })
            }
        }

        sessionState.commitSetSelectedQuiz(QuizWithData);
        return QuizWithData;
    }

    public async getQuestionsByQuizId(QuizId: number): Promise<Array<IQuestion>> {
        let questions: Array<IQuestion> = [];

        await axios
        .get(`${this.portApi}/api/${this.controllerName}/${QuizId}`, this.headers)
        .then(response => {
            if (response.status === 200) {
                if (response.data !== '') {
                    const _parsedRes = JSON.parse(JSON.stringify(response.data));
                    questions = _parsedRes;
                }
            }
        });

        return questions;
    }

    public async getActiveQuestions(): Promise<Array<IQuestionWithAnswers>> {
        await this.QuestionsService.getActiveQuestions()
        .then(async (response) => {
            const _activeQuestions: Array<IQuestion> = response;
            await this.setQuestions(_activeQuestions);

            _activeQuestions.forEach(async question => {
                if (question.id) {
                    await this.getAnswersForQuestionId(question.id)
                    .then((response) => {
                        const _questionAnswers: Array<IQuestionAnswers> = response;
                        this.setAnswersForQuestion(_questionAnswers);
                    })
                }
            });
        });

        return sessionState.state.InUseQuestionsWithAnswers;
    }

    private setQuestions(ActiveQuestions: Array<IQuestion>) {
        let _questionsForQuiz: Array<IQuestion> = [];
        ActiveQuestions.forEach(question => {
            _questionsForQuiz.push(question);
            sessionState.commitSetInUseQuestions(_questionsForQuiz);
        });
    }

    public async getAnswersForQuestionId(QuestionId: number): Promise<Array<IQuestionAnswers>> {
        let _answersForQuestion: Array<IQuestionAnswers> = [];
        await this.AnswersService.getAnswersForQuestionId(QuestionId)
        .then(async (response) => {
            _answersForQuestion = response;
        })
        return _answersForQuestion;
    }

    private setAnswersForQuestion(Answers: Array<IQuestionAnswers>) {
        let _questionAnswers: Array<IQuestionAnswers> = sessionState.state.QuestionAnswers;
        Answers.forEach(answer => {
            _questionAnswers.push(answer);
            sessionState.commitSetQuestionAnswers(_questionAnswers);
        });

        // this.mapAnswersToQuestion(sessionState.inUseQuestions, sessionState.questionAnswers);
    }

    // private async mapAnswersToQuestion(Questions: Array<IQuestion>, Answers: Array<IQuestionAnswers>) {
    //     let _questionsHaveAnswers: Array<IQuestionWithAnswers> = [];
    //     let _questionWantsAnswers: IQuestionWithAnswers = {};

    //     await Questions.forEach(question => {
    //         let _questionWantsAnswers: IQuestionWithAnswers = question;
    //         _questionWantsAnswers.answerOptions = [];

    //         for (let answerIndex = 0; answerIndex < Answers.length; answerIndex++) {
    //             let _answer = Answers[answerIndex];
    //             // console.log('asdf')
    //             // console.dir(_answer);
    //             if (_answer.option) {
    //                 if (_answer.questionId === question.id) {
    //                     const _condensedAnswer: IAnswer = { answerId: _answer.id, answerOption: _answer.option };

    //                     _questionWantsAnswers.answerOptions.push(_condensedAnswer);
    //                 }
    //             }
    //         }

    //         _questionsHaveAnswers.push(_questionWantsAnswers);
    //         // console.log(_questionsHaveAnswers);
    //     });
    // }

    // CREATE QUIZ

    public async createQuiz(NewQuiz: INewQuizWithQuestionsAndAnswers): Promise<IQuiz> {
        let _newQuiz: IQuizWithQuestionsAndAnswers = { isActive: false, name: NewQuiz.quizName };

        await axios
        .post(`${this.portApi}/api/${this.controllerName}`, NewQuiz, this.headers)
        .then(response => {
            if (response.status === 200) {
                if (response.data !== '') {
                    const _parsedRes = JSON.parse(JSON.stringify(response.data));
                    _newQuiz = _parsedRes as IQuizWithQuestionsAndAnswers;
                }
            }
        });

        return _newQuiz;
    }

    // EDIT QUIZ

    public async updateActiveState(Quiz: IQuiz): Promise<IQuiz> {
        let _quiz: IQuiz = Quiz;

        await axios
        .put(`${this.portApi}/api/${this.controllerName}/${Quiz.id}/${Quiz.isActive}`, this.headers)
        .then(response => {
            if (response.status === 200) {
                if (response.data !== '') {
                    const _parsedRes = JSON.parse(JSON.stringify(response.data));

                    _quiz = _parsedRes as IQuiz;
                }
            }
        });

        return _quiz;
    }

    public async updateQuizQuestion(QuizId: number, QuestionWithAnswers: INewQuestionWithAnswers): Promise<Array<IQuestion>> {
        let _quizQuestions: Array<IQuestion> = [];

        await axios
        .put(`${this.portApi}/api/${this.controllerName}/${QuizId}`, QuestionWithAnswers, this.headers)
        .then(response => {
            if (response.status === 200) {
                if (response.data !== '') {
                    const _parsedRes = JSON.parse(JSON.stringify(response.data));

                    _quizQuestions = _parsedRes;
                }
            }
        });

        return _quizQuestions;
    }
}