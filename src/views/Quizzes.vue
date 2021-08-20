<template>
    <div class="component__container">
        <header class="header__container">
            <Header />
        </header>
        <div class="quizzes__content-container">
            <div class="quizzes__quiz" v-for="quiz in quizzes" :key="quiz.id">
                <div class="quizzes__quiz-name">{{quiz.name}}</div>

                <button class="welcome__button button button--medium" @click="continueToQuiz(quiz)">
                    Start Quiz
                </button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import { Vue, Component, Provide } from "vue-property-decorator";
    import sessionState from "../store/SessionState";
    import Header from "../components/AppHeader.vue"
    import QuizService from "../services/QuizService";
import IQuiz from "../interfaces/IQuiz";

    @Component({
        components: {
            Header,
        },
    })
    export default class Welcome extends Vue {

        private quizService = new QuizService();

        private get quizzes() {
            return sessionState.state.Quizzes;
        }

        private mounted() {
            console.log('Mounted in Quizzes')
            console.dir(this.quizzes);
        }

        private async continueToQuiz(Quiz: IQuiz) {
            await this.quizService.setQuizData(Quiz)
            .then(() => {
                if (!sessionState.state.ErrorMessage) {
                    this.$router.push('/Quiz');
                }
                else this.$router.push('/ErrorPage');
            });
        }
    }
</script>

<style lang="scss" scoped>

</style>