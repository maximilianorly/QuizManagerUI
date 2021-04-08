<template>
    <div class="component__container">
        <div class="quiz-question__question">
            {{ this.$props.quizQuestion.question }}
        </div>

        <div class="quiz-question__answer" v-for="answer in this.$props.quizQuestion.answerOptions" :key="answer.answerId">
            <button class="quiz-question__answer-button" @click="setAnswer(answer)">
                {{ answer.answerOption }}
            </button>
        </div>
    </div>
</template>

<script lang="ts">
    import { Vue, Component, Provide } from 'vue-property-decorator';
    import IUserAnswerChoice from '../interfaces/IUserAnswerChoice';
    import IAnswer from '../interfaces/IAnswer';
import sessionState from '../store/SessionState';

     @Component({
         props: ["quizQuestion"]
    })
    export default class QuizQuestion extends Vue {

        private setAnswer(Answer: IAnswer): void {
            let _chosenAnswer: IUserAnswerChoice = {
                    questionId: this.$props.quizQuestion.id,
                    answerId: Answer.answerId
                 };


            sessionState.commitSetCurrentUserChosenAnswer(_chosenAnswer);
        }
    }
</script>

<style lang="scss" scoped>

</style>