<template>
    <div class="quizzes__container">
        <header class="header__container">
            <Header :headerDetail="pageDescription" @addQuizClicked="showAddQuizModal($event)"/>
        </header>
        <div class="quizzes__content">
            <div class="quizzes__quiz-container card card--small" v-for="quiz in quizzes" :key="quiz.id">
                <div class="quizzes__quiz">
                    <h2 class="quizzes__quiz-name">
                        {{quiz.name}}
                    </h2>

                    <div class="quizzes__button-group">
                        <button class="quizzes__quiz-button button button--medium" @click="continueToQuiz(quiz)">
                            Start Quiz
                        </button>
                        <button class="quizzes__quiz-button quizzes__quiz-button--edit button button--medium" v-if="accessLevel.accessLevelId === 1" @click="editQuiz(quiz)">
                            Edit Quiz
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="addQuizModal" class="add-quiz__modal-container">
            <h1 class="add-quiz__modal-title">Create Quiz</h1>
            <AddQuizModal @closeClicked="showAddQuizModal($event)"/>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Provide } from "vue-property-decorator";
import sessionState from "../store/SessionState";
import Header from "../components/AppHeader.vue"
import AddQuizModal from "../components/AddQuiz.vue";
import QuizService from "../services/QuizService";
import IQuiz from "../interfaces/IQuiz";
import IUserHasAccess from "../interfaces/IUserHasAccess";

    @Component({
        components: {
            Header,
            AddQuizModal
        },
    })
    export default class Quizzes extends Vue {

        private quizService = new QuizService();
        private accessLevel: IUserHasAccess = {};
        private editQuizClicked: boolean = false;
        
        public addQuizModal: boolean = false;
        public pageDescription: string = "Available Quizzes"

        private get quizzes() {
            return sessionState.state.Quizzes;
        }

        private get userHasAccess() {
            return sessionState.state.UserHasAccess;
        }

        private mounted() {
            console.log('Mounted in Quizzes')
            this.accessLevel = this.userHasAccess;
        }

        private async continueToQuiz(Quiz: IQuiz) {
            await this.quizService.setQuizData(Quiz)
            .then(() => {
                if (!sessionState.state.ErrorMessage) {
                    if (this.editQuizClicked) {
                        sessionState.commitSetEditingQuiz(true);
                    }

                    this.$router.push('/Quiz');
                }
                else this.$router.push('/ErrorPage');
            });
        }

        private async editQuiz(Quiz: IQuiz) {
            this.editQuizClicked = true;
            this.continueToQuiz(Quiz);
        }

        private async showAddQuizModal() {
            if (this.addQuizModal) {
                await this.quizService.getQuizzes()
                .then(() => {
                    this.addQuizModal = !this.addQuizModal;
                })
            } else {
                this.addQuizModal = !this.addQuizModal;
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>