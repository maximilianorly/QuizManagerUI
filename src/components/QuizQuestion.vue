<template>
    <div class="quiz-question__modal">  
        <div class="quiz-question__modal-header">
            <button @click="closeModal">
                Close
            </button>
        </div>

        <div class="quiz-question__modal--top">
            <div class="quiz-question__question">
                {{quizQuestion.question}}
            </div>
        </div>
        <div class="quiz-question__modal--bottom">
            <div class="quiz-question__answers">
                <div class="quiz-question__answer" v-for="answer in QuizQuestionWithAnswers.answerOptions" :key="answer.id">
                    {{ answer.option }}
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import { Vue, Component, Provide } from 'vue-property-decorator';
    import IUserAnswerChoice from '../interfaces/IUserAnswerChoice';
    import IAnswer from '../interfaces/IAnswer';
    import sessionState from '../store/SessionState';
    import { IQuestionWithAnswers } from '../interfaces/IQuestion';

     @Component({
         props: ["quizQuestion"]
    })
    export default class QuizQuestion extends Vue {
        private QuizQuestionWithAnswers: IQuestionWithAnswers = {};

        private mounted() {
            this.QuizQuestionWithAnswers = this.$props.quizQuestion;
        }

        private setAnswer(Answer: IAnswer): void {
            let _chosenAnswer: IUserAnswerChoice = {
                    questionId: this.$props.quizQuestion.id,
                    answerId: Answer.answerId
                 };


            sessionState.commitSetCurrentUserChosenAnswer(_chosenAnswer);
        }

        public closeModal(event: any) {
            this.$emit('closeClicked');
        }
    }
</script>

<style lang="scss" scoped>

</style>