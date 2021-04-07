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

        private get user() {
            return sessionState.state.User;
        }

        private get inUseQuestions() {
            return sessionState.state.InUseQuestions;
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
            if (this.quizIndex < (this.quizQuestions.length - 2)) {
                this.quizIndex++;
                this.setQuestion();
            } 
            else if (this.quizIndex < (this.quizQuestions.length - 1)) {
                this.quizIndex++;
                this.progessButtonText = 'Finish Quiz'
            }
            else {
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