<template>
    <div class="component__container">
        <header class="header__container">
            <Header />
        </header>
        <div class="quiz__content">
            <div v-if="quiz" class="quiz__questions">
                {{quiz.name}}
                <button class="button question__button" v-for="(question, index) in quiz.questions" :key="question.id" @click="showQuestionModal(question)">
                    Question {{ index + 1 }}
                </button>
            </div>
            <div class="quiz__finish">
                <button class="button button--medium" @click="returnToQuizzes">
                    Finish
                </button>
            </div>

            <div v-if="questionModal">
                <QuizQuestion :quizQuestion="selectedQuestionData" @closeClicked="closeModalQuestionModal($event)"/>
            </div>
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
        private quiz: IQuizWithQuestions = {};
        public questionsWithAnswers: Array<IQuestionWithAnswers> = [];
        public selectedQuestionData: IQuestionWithAnswers = {};
        public questionModal: boolean = false;

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

        private mounted() {
            console.log('quiz mounted')
            this.quiz = this.selectedQuiz;
            console.log('set quiz')
            
            this.questionsWithAnswers = this.InUseQuestionsWithAnswers;
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