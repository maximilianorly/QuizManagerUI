<template>
    <div class="component__container">
        <div class="quiz__content">
            <QuizQuestion :quizQuestion="questionWithAnswers" />
            <button @click="progress()">
                {{ progessButtonText }}
            </button>
        </div>
    </div>
</template>

<script lang="ts">
    import { Vue, Component, Provide } from 'vue-property-decorator';
    import sessionState from "../store/SessionState";
    import IQuestion, { IQuestionWithAnswers } from '../interfaces/IQuestion';
    import QuizQuestion from '../components/QuizQuestion.vue';
import IUserAnswerChoice from '../interfaces/IUserAnswerChoice';
import IUser from '../interfaces/IUser';

    @Component({
        components: {
            QuizQuestion,
        }
    })
    export default class Quiz extends Vue {
        private quizQuestions: IQuestionWithAnswers[] = this.inUseQuestions;
        private questionWithAnswers: IQuestionWithAnswers = {};
        private progessButtonText: string = 'Next question';
        private quizIndex: number = 0;
        public userAnswersForQuiz: IUserAnswerChoice[] = [];

        private get user() {
            return sessionState.state.User;
        }

        private get inUseQuestions() {
            return sessionState.state.InUseQuestions;
        }

        private get CurrentUserChosenAnswer() {
            return sessionState.state.CurrentUserChosenAnswer;
        }

        private mounted() {
            this.setQuestion();
        }

        private setQuestion() {
            if (this.quizQuestions !== undefined) {
                this.questionWithAnswers = this.quizQuestions[this.quizIndex];
            }
        }

        private progress() {
            const _answer: IUserAnswerChoice = { 
                    questionId: sessionState.state.CurrentUserChosenAnswer.questionId,
                    answerId: sessionState.state.CurrentUserChosenAnswer.answerId 
                }
            
            this.userAnswersForQuiz.push(_answer);
            this.quizIndex++;

            if (this.quizIndex === (this.quizQuestions.length - 1)) {
                this.progessButtonText = 'Finish quiz'
                this.setQuestion();
            }
            else if (this.quizIndex < (this.quizQuestions.length)) {
                this.setQuestion();
            }
            else if (this.quizIndex === this.quizQuestions.length) {
                sessionState.commitSetUserAnswersForQuiz(this.userAnswersForQuiz);
                this.nextRoute();
            }
        }

        private nextRoute() {
            this.$router.push('/Finished');
        }
        
    }
</script>

<style lang="scss" scoped>

</style>