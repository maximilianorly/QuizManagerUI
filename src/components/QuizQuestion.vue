<template>
    <div class="quiz-question__modal">  
        <div class="quiz-question__modal-header">
            <div class="quiz-question__admin-buttons" v-if="editingQuiz">
                <button class="button button--extra-small quiz-question__admin-button" @click="confirmEdit">
                    Done
                    <img :src="require('@/assets/img/svg/confirm-icon.svg')" alt="confirm icon">
                </button>
                <button class="button button--extra-small quiz-question__admin-button" @click="closeModal">
                    Cancel
                    <img :src="require('@/assets/img/svg/cancel-icon.svg')" alt="cancel icon">
                </button>
            </div>
            <button class="button__close" @click="closeModal" v-else>
                <img :src="require('@/assets/img/svg/close-icon.svg')" alt="close icon">
            </button>
        </div>

        <div class="quiz-question__content">
            <div class="quiz-question__modal--top">
                <div class="quiz-question__question">
                    <input v-if="editingQuiz" class="quiz-question__admin-edit-input--question" type="text" :placeholder="`Edit Question: ${quizQuestion.question}...`">
                    <h1 v-else>
                        {{quizQuestion.question}}
                    </h1>
                </div>
            </div>
            <div class="quiz-question__modal--bottom">
                <div class="quiz-question__answers">
                    <button class="quiz-question__answer button button--extra-large" v-for="answer in QuizQuestionWithAnswers.answerOptions" :key="answer.id" @click="setUserChosenAnswer(answer)">
                        {{ answer.option }}
                    </button>
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
import IQuestionAnswers from '../interfaces/IQuestionAnswers';
import QuizService from '../services/QuizService';

     @Component({
         props: ["quizQuestion"]
    })
    export default class QuizQuestion extends Vue {
        private quizService: QuizService = new QuizService();
        private QuizQuestionWithAnswers: IQuestionWithAnswers = {};
        public chosenAnswer: IUserAnswerChoice = {};

        private get userAnswersForQuiz() {
            return sessionState.state.UserAnswersForQuiz;
        }

        private get editingQuiz() {
            return sessionState.state.EditingQuiz;
        }

        private mounted() {
            this.QuizQuestionWithAnswers = this.$props.quizQuestion;
        }

        private setUserChosenAnswer(Answer: IQuestionAnswers): void {
            console.log(Answer)
            this.chosenAnswer.questionId = Answer.questionId;
            this.chosenAnswer.answerId = Answer.id;

            console.log(this.chosenAnswer);

            sessionState.commitSetCurrentUserChosenAnswer(this.chosenAnswer);
            console.log(sessionState.state.CurrentUserChosenAnswer);
        }

        private confirmUserAnswerToStore(): void {
            let _storedChosenAnswers = this.userAnswersForQuiz;

            // remove answer for current question before adding re-chosen answer
            _storedChosenAnswers = _storedChosenAnswers.filter(answer => {
                answer.questionId != this.QuizQuestionWithAnswers.id;
            });

            _storedChosenAnswers.push(this.chosenAnswer);
            sessionState.commitSetUserAnswersForQuiz(_storedChosenAnswers);
        }

        public closeModal(event: any) {
            this.confirmUserAnswerToStore();
            this.$emit('closeClicked');
        }

        public async confirmEdit(event: any) {
            this.$emit('closeClicked');
        }
    }
</script>

<style lang="scss" scoped>

</style>