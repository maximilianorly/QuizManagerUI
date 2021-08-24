<template>
    <div class="quiz__container">
        <header class="header__container">
            <Header :headerDetail="pageDescription" />
        </header>
        <div class="quiz__content">
            <div class="card  quiz__card">
                <div class="card__admin-set-active" v-if="userAccess.accessLevelId === 1">
                    <button class="quiz__active-state-button button" @click="setActiveState">
                        Set {{quizActiveStateString}}
                    </button>
                </div>
                <div class="card__content quiz__card-content">
                    <div class="quiz__questions-container">
                        <div v-if="quiz" class="quiz__questions">
                            <button class="button button--large quiz__question-button" v-for="(question, index) in quiz.questions" :key="question.id" @click="showQuestionModal(question)">
                                <div v-if="editingQuiz">
                                    Edit Question {{ index + 1 }}
                                </div>
                                <div v-else>
                                    Question {{ index + 1 }}
                                </div>

                                <img src="../assets/img/svg/down-chevron.svg" alt="down chevron">
                            </button>
                        </div>
                    </div>
                    <div class="quiz__finish">
                        <button class="button button--medium quiz__finish-button" @click="returnToQuizzes">
                            Finish
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div class="quiz-question__modal-container" v-if="questionModal">
            <QuizQuestion :quizQuestion="selectedQuestionData" @closeClicked="closeModalQuestionModal($event)"/>
        </div>
    </div>
</template>

<script lang="ts">
    import { Vue, Component, Provide } from 'vue-property-decorator';
    import Header from '../components/AppHeader.vue';
    import sessionState from "../store/SessionState";
    import IQuestion, { IQuestionWithAnswers } from '../interfaces/IQuestion';
    import QuizQuestion from '../components/QuizQuestion.vue';
    import IUserAnswerChoice from '../interfaces/IUserAnswerChoice';
    import IUser from '../interfaces/IUser';
    import { IQuizWithQuestionsAndAnswers, IQuizWithQuestions } from '../interfaces/IQuiz';
    import QuizService from '../services/QuizService';
    import UserAccessEnum from '../enums/UserAccessEnum';

    @Component({
        components: {
            QuizQuestion,
            Header
        }
    })
    export default class Quiz extends Vue {
        private quizService = new QuizService();
        private quiz: IQuizWithQuestions = { id: 0, isActive: false, name: '' };
        public selectedQuestionData: IQuestionWithAnswers = {};
        public questionModal: boolean = false;
        public pageDescription: string = this.selectedQuiz.name;
        public quizActiveStateString: string = '';

        private get user() {
            return sessionState.state.User;
        }

        private get userAccess() {
            return sessionState.state.UserHasAccess;
        }

        private get selectedQuiz() {
            return sessionState.state.SelectedQuiz;
        }

        private get inUseQuestions() {
            return sessionState.state.InUseQuestions;
        }

        private get InUseQuestionsWithAnswers() {
            return sessionState.state.InUseQuestionsWithAnswers;
        }

        private get CurrentUserChosenAnswer() {
            return sessionState.state.CurrentUserChosenAnswer;
        }

        private get editingQuiz() {
            return sessionState.state.EditingQuiz;
        }

        private mounted() {
            this.quiz = this.selectedQuiz;
            this.setQuizActiveStateString();
        }

        private destroyed() {
            sessionState.commitSetEditingQuiz(false);
        }

        private async showQuestionModal(Question: IQuestionWithAnswers) {
            if (Question.id) {
                this.selectedQuestionData.question = Question.question;

                if (this.userAccess.accessLevelId !== UserAccessEnum.Restricted) {
                    await this.quizService.getAnswersForQuestionId(Question.id)
                    .then(answers => {
                            this.selectedQuestionData.answerOptions = answers;
                            this.questionModal = true;
                    })
                } else {
                    this.questionModal = true;
                }
            }
        }

        public closeModalQuestionModal() {
            this.selectedQuestionData = {};
            this.questionModal = false;
        }

        public setQuizActiveStateString(): void {
            this.quiz.isActive ? this.quizActiveStateString = 'Inactive' : this.quizActiveStateString = 'Active';
        }

        public async setActiveState() {
            await this.quizService.updateActiveState(this.quiz)
            .then((res) => {
                sessionState.commitSetSelectedQuiz(res);
                this.quiz = this.selectedQuiz;
                
                this.setQuizActiveStateString();
            })
        }

        private returnToQuizzes(): void {
            this.$router.push('/Quizzes');
        }

        private nextRoute() {
            this.$router.push('/Finished');
        }
        
    }
</script>

<style lang="scss" scoped>

</style>