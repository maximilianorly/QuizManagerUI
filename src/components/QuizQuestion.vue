<template>
    <div class="component__container">
        <div class="quiz-question__question">
            {{ this.$props.quizQuestion.question }}
        </div>

        <div class="quiz-question__answer" v-for="answer in this.$props.quizQuestion.answerOptions" :key="answer">
            <button class="quiz-question__answer-button" @click="setAnswer(answer)">
                {{answer}}
            </button>
        </div>
    </div>
</template>

<script lang="ts">
    import { Vue, Component, Provide } from 'vue-property-decorator';

     @Component({
         props: ["quizQuestion"]
    })
    export default class QuizQuestion extends Vue {

        private setAnswer(Answer: string): void {
            // store selection in session state
        }
    }
</script>

<style lang="scss" scoped>

</style>