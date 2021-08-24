<template>
    <div class="log-in__container card">
        <div v-if="!createUser" class="log-in__content card__content">
            <section class="log-in__headers card__headers">
                <h1 class="log-in__title">
                    QUIZTIME
                </h1>
                
                <div class="log-in__company-logo">
                    <img class="company-logo" src="../assets/img/svg/WebbiSkools.svg" alt="Company Logo">
                </div>
            </section>

            <section class="log-in__user-data-fields">
                <h3 class="log-in__direction">
                    Please enter Log In details to access.
                </h3>
                <h3 class="log-in__errorMessage" v-if="errorMessage !== ''">
                    {{ errorMessage }}
                </h3>
                <div class="log-in__user-data-input-container">
                    <input type="text" placeholder="Username" v-model="userCredentials.Username" class="log-in__user-data-input input">
                </div>

                <div class="log-in__user-data-input-container">
                    <input type="password" placeholder="Password" v-model="userCredentials.Password" class="log-in__user-data-input input">
                </div>

                <div class="log-in__button-container">
                    <button class="log-in__log-in-button button button--small" @click="logInWithSuppliedCredentials(userCredentials)">
                        Log In
                    </button>
                </div>
            </section>
        </div>
    </div>
</template>

<script lang="ts">
    import { Vue, Component, Provide } from 'vue-property-decorator';
    import IUser from '../interfaces/IUser';
    import IUserCredentials from '../interfaces/IUserCredentials';
    import UserService from '../services/UserService';
    import sessionState from '../store/SessionState';
    import QuizService from '../services/QuizService';

    @Component({
        components: {

        },
    })
    export default class LogIn extends Vue {
        private currentUser: IUser = {};
        private userCredentials: IUserCredentials = { Username: "", Password: ""};
        private userService: UserService = new UserService();
        private quizService: QuizService = new QuizService();
        private errorMessage: string = '';
        private createUser: boolean = false;

        private get user() {
            return sessionState.state.User;
        }

        private mounted() {
            // routing to "/" resets entire session state.
            sessionState.commitSetSessionState(sessionState.state);
        }

        private async logInWithSuppliedCredentials(Credentials: IUserCredentials) {
            await this.userService.changeLogInState(Credentials)
            .then(() => {
                if (sessionState.state.UserHasAccess.userId) {
                    this.errorMessage = '';
                    this.nextRoute();
                }
                else {
                    this.errorMessage = 'User with these credentials does not exist.'
                }
            });
        }

        private async getQuizQuestions() {
            await this.quizService.getActiveQuestions()
            .then((response) => {
            })
        }

        private setErrorMessage() {

        }

        private nextRoute() {
            this.$router.push('/Welcome')
        }

        private createNewUserClick() {
            this.createUser = !this.createUser;
        }
    };
</script>

<style lang="scss" scoped>

</style>