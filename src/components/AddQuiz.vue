<template>
    <div class="add-quiz__modal">
        <div class="add-quiz__modal-header">
            {{ errorMessage }}
            <div class="add-quiz__modal-header--top">
                <div class="quiz-question__admin-buttons">
                    <button class="button button--extra-small quiz-question__admin-button" @click="confirmCreateQuiz">
                        Done
                        <img :src="require('@/assets/img/svg/confirm-icon.svg')" alt="confirm icon">
                    </button>
                    <button class="button button--extra-small quiz-question__admin-button" @click="closeModal">
                        Cancel
                        <img :src="require('@/assets/img/svg/cancel-icon.svg')" alt="cancel icon">
                    </button>
            </div>
            </div>
            <div class="add-quiz__modal-header--bottom">
                <input class="add-quiz__quiz-name-input" v-model="quizWithQuestionsAndAnswers.quizName" type="text" placeholder="Quiz Name...">
            </div>
        </div>
        <div class="add-quiz__content">
            <div class="add-quiz__question-and-answers" v-for="(question, index) in questionsWithAnswers" :key="index">
                <div class="add-quiz__question">
                    <input class="add-quiz__question-input" v-model="questionsWithAnswers[index].question" type="text" :placeholder="`Question ${index + 1}...`">
                </div>

                <div class="add-quiz__answers">
                    <div class="add-quiz__answer" v-for="(answer, answerIndex) in questionAnswersCount" :key="answerIndex">
                        <input class="add-quiz__answer-input" v-model="questionsWithAnswers[index].answerOptions[answerIndex].option" type="text" :placeholder="`Answer ${index + 1}...`">
                    </div>
                </div>

                <div class="add-quiz__radio-container">
                    Which option is the correct answer?
                    <div class="add-quiz__radio-group">
                        <input type="radio" id="1" :name="`answerOptions${[index]}`" v-model="selectedCorrectOptions[index]" value="1">
                        <label for="1">Answer 1</label>
                        <input type="radio" id="2" :name="`answerOptions${[index]}`" v-model="selectedCorrectOptions[index]" value="2">
                        <label for="2">Answer 2</label>
                        <input type="radio" id="3" :name="`answerOptions${[index]}`" v-model="selectedCorrectOptions[index]" value="3">
                        <label for="3">Answer 3</label>
                        <input type="radio" id="4" :name="`answerOptions${[index]}`" v-model="selectedCorrectOptions[index]" value="4">
                        <label for="4">Answer 4</label>
                    </div>

                </div>
                <button class="add-quiz__button button button--extra-extra-small" @click="AddToQuiz(index, selectedCorrectOptions[index])">
                    Add
                </button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Provide } from "vue-property-decorator";
import sessionState from "../store/SessionState";
import { IQuestionWithAnswers } from "../interfaces/IQuestion";
import IQuizWithQuestionsAndAnswers from "../interfaces/IQuiz";
import INewQuizWithQuestionsAndAnswers from "../interfaces/INewQuizWithQuestionsAndAnswers";
import INewQuestionWithAnswers from "../interfaces/INewQuestionWithAnswer";
import AnswersService from "../services/Quiz_AnswersService";
import QuizService from "../services/QuizService";


    @Component({
        components: {
        },
    })
    export default class AddQuiz extends Vue {
        private quizService: QuizService = new QuizService();
        private questionsCount: Array<number> = [1, 2, 3, 4];
        private questionAnswersCount: Array<number> = [1, 2, 3, 4];
        public questionsWithAnswers: Array<IQuestionWithAnswers> = [{ question: '', answerOptions: [{ option: '', isCorrectOption: 0 }, { option: '', isCorrectOption: 0 }, { option: '', isCorrectOption: 0 }, { option: '', isCorrectOption: 0 }] }, { question: '', answerOptions: [{ option: '', isCorrectOption: 0 }, { option: '', isCorrectOption: 0 }, { option: '', isCorrectOption: 0 }, { option: '', isCorrectOption: 0 }] }, { question: '', answerOptions: [{ option: '', isCorrectOption: 0 }, { option: '', isCorrectOption: 0 }, { option: '', isCorrectOption: 0 }, { option: '', isCorrectOption: 0 }] }, { question: '', answerOptions: [{ option: '', isCorrectOption: 0 }, { option: '', isCorrectOption: 0 }, { option: '', isCorrectOption: 0 }, { option: '', isCorrectOption: 0 }] }];
        public quizWithQuestionsAndAnswers: INewQuizWithQuestionsAndAnswers = { quizName: '', isActive: true, questionsWithAnswers: [{ question: '', answers: [] }, { question: '', answers: [] }, { question: '', answers: [] }, { question: '', answers: [] }] };
        public selectedCorrectOptions: Array<number> = [];
        public questionInput: string = '';
        public questionAnswers: Array<string> = [];

        private get errorMessage() {
            return sessionState.state.ErrorMessage;
        }

        private AddToQuiz(QuestionIndex: number, SelectedCorrectOptionIndex: number): void {
            console.log(this.questionsWithAnswers[QuestionIndex]);

            if (this.quizWithQuestionsAndAnswers.questionsWithAnswers !== undefined) {
                // this.quizWithQuestionsAndAnswers.questionsWithAnswers.push(this.questionsWithAnswers[QuestionIndex]);
                // MAP ANSWER OPTION TO ANSWER

                this.quizWithQuestionsAndAnswers.questionsWithAnswers[QuestionIndex].question = this.questionsWithAnswers[QuestionIndex].question;
                this.questionsWithAnswers[QuestionIndex].answerOptions.forEach((answer, index) => {
                    this.quizWithQuestionsAndAnswers.questionsWithAnswers[QuestionIndex].answers[index] = { answer: '', isCorrect: false }
                    this.quizWithQuestionsAndAnswers.questionsWithAnswers[QuestionIndex].answers[index].answer = answer.option;
                    this.quizWithQuestionsAndAnswers.questionsWithAnswers[QuestionIndex].answers[index].isCorrect = Boolean(answer.isCorrectOption);
                })
            }

            console.log(this.quizWithQuestionsAndAnswers);

            console.log(this.selectedCorrectOptions);
            console.log(SelectedCorrectOptionIndex)
            
        }

        public confirmCreateQuiz(): void {
            sessionState.commitSetErrorMessage('');
            if (this.quizWithQuestionsAndAnswers.quizName === '') {
                sessionState.commitSetErrorMessage('Quizzes must have a name');
            }

            this.quizWithQuestionsAndAnswers.questionsWithAnswers.forEach((question) => {
                if (!question.question) {
                    sessionState.commitSetErrorMessage('You must have 4 questions');
                }

                question.answers.forEach((answer) => {
                    if(!answer.answer) {
                        sessionState.commitSetErrorMessage('All 4 questions must have 4 answers and a chosen correct answer');
                    }
                })

                //add check for if correct answer has been selected or if all answers are false;
            })

            if (this.errorMessage === '') {
                this.createQuiz();
            }
        }

        private async createQuiz() {
            await this.quizService.createQuiz(this.quizWithQuestionsAndAnswers)
            .then(() => {
                this.closeModal();
            })
        }


        public closeModal(event?: any) {
            sessionState.commitSetErrorMessage('');
            this.$emit('closeClicked');
        }

    }
</script>

<style lang="scss" scoped>

</style>