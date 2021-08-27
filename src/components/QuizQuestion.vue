<template>
    <div class="quiz-question__modal">
        <div class="quiz-question__modal-header">
            <div v-if="editingQuiz && isUnderConstruction" class="quiz-question__under-construction-text">
                Sorry! This functionality is currently under construction.    
            </div>  
            <div class="quiz-question__admin-buttons" v-if="editingQuiz">
                <button v-if="!isUnderConstruction" class="button button--extra-small quiz-question__admin-button" @click="confirmEdit">
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
        <div v-if="editingQuiz && isUnderConstruction" class="quiz-question__under-construction">
        </div>  
        <div class="quiz-question__content">
            <div class="quiz-question__modal--top">
                <div class="quiz-question__question">
                    <input v-if="editingQuiz" v-model="questionInput" class="quiz-question__admin-edit-input--question" type="text" :placeholder="`Edit Question: ${QuizQuestionWithAnswers.question}...`">
                    <h1 v-else>
                        {{QuizQuestionWithAnswers.question}}
                    </h1>
                </div>
            </div>
            <div class="quiz-question__modal--bottom">
                <div class="quiz-question__answers">
                    <div class="quiz-question__answer-container" v-for="(answer, index) in QuizQuestionWithAnswers.answerOptions" :key="answer.id">
                        <div v-if="editingQuiz" class="quiz-question__edit-answer-container">
                            <input type="radio" :id="`answerInput${[index]}__true`" :name="`answerInput${[index]}`" v-model="answerInputs[index].isCorrect" :value="true">
                            <label :for="`answerInput${[index]}__true`">True</label>
                            <input type="radio" :id="`answerInput${[index]}__false`" :name="`answerInput${[index]}`" v-model="answerInputs[index].isCorrect" :value="false">
                            <label :for="`answerInput${[index]}__false`">False</label>
                            <input v-model="answerInputs[index].answer" class="quiz-quesrion__admin-edit-input--answer" type="text" :placeholder="`Edit Answer: ${index + 1}...`">
                        </div>
                        <button v-else class="quiz-question__answer button button--extra-large" @click="setUserChosenAnswer(answer)">
                            {{ answer.option }}
                        </button>
                    </div>
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
import INewQuestionWithAnswers from '../interfaces/INewQuestionWithAnswer';
import INewAnswer from '../interfaces/InewAnswer';

     @Component({
         props: ["quizQuestion"]
    })
    export default class QuizQuestion extends Vue {
        private quizService: QuizService = new QuizService();
        private QuizQuestionWithAnswers: IQuestionWithAnswers = {};
        private isUnderConstruction: boolean = false;

        public chosenAnswer: IUserAnswerChoice = {};
        public questionInput: string = '';
        public answerInputs: Array<INewAnswer> = [{ answer: '', isCorrect: false }, { answer: '', isCorrect: false }, { answer: '', isCorrect: false }, { answer: '', isCorrect: false }];

        private get userAnswersForQuiz() {
            return sessionState.state.UserAnswersForQuiz;
        }

        private get editingQuiz() {
            return sessionState.state.EditingQuiz;
        }

        private get selectedQuiz() {
            return sessionState.state.SelectedQuiz;
        }

        private mounted() {
            this.QuizQuestionWithAnswers = this.$props.quizQuestion;
        }

        private setUserChosenAnswer(Answer: IQuestionAnswers): void {
            this.chosenAnswer.questionId = Answer.questionId;
            this.chosenAnswer.answerId = Answer.id;

            sessionState.commitSetCurrentUserChosenAnswer(this.chosenAnswer);
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
            if (this.questionInput === '') {
                this.questionInput = this.QuizQuestionWithAnswers.question;
            }

            const _questionWithAnswers: INewQuestionWithAnswers = {
                questionId: this.QuizQuestionWithAnswers.id,
                question: this.questionInput,
                answers: this.answerInputs
            };
            
            this.quizService.updateQuizQuestion(this.selectedQuiz.id, _questionWithAnswers)
            .then(() => {
                this.$emit('closeClicked');
            });
        }
    }
</script>

<style lang="scss" scoped>

</style>