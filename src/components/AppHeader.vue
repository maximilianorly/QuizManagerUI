<template>
    <div class="header">
        <div class="header__content">
            <div class="header__left">
                <img class="company-logo" src="../assets/img/svg/WebbiSkools.svg" alt="Company Logo"> 
            </div>
            <div class="header__center">
                <h1 class="header__title">
                    {{ pageTitle }}
                </h1>
            </div>
            <div class="header__right">
                <div class="header__button-group">
                    <button class="header__button button button--extra-small" v-if="routeName === 'Quizzes' && userAccess === 1" @click="AddQuiz">
                        Add Quiz
                    </button>
                    <button class="header__button button button--extra-small" @click="LogoutClicked">
                        Logout
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Provide } from 'vue-property-decorator';
import IUser from '../interfaces/IUser';
import UserService from '../services/UserService';
import sessionState from "../store/SessionState";
import QuizService from '../services/QuizService';
    
    @Component({
        props: ["headerDetail"]
    })
    export default class Header extends Vue {

        private userService = new UserService();
        private quizService = new QuizService();

        public pageTitle: string = ""
        
        private get routeName() {
            return this.$route.name;
        }

        private get userAccess() {
            return sessionState.state.UserHasAccess.accessLevelId;
        }

        private mounted() {
            this.pageTitle = this.$props.headerDetail;
        }


        public AddQuiz(event: any): void {
            console.log('clicked');
            this.$emit('addQuizClicked');
        }

        public async LogoutClicked() {
            await this.userService.changeLogInState()
            .then(() => {
                if (!sessionState.state.ErrorMessage) {
                    this.$router.push('/');
                }
                else this.$router.push('/ErrorPage');
            });
        }
    }
</script>

<style lang="scss" scoped>

</style>