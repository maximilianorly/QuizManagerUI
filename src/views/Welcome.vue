<template>
    <div class="component__container">
        <div class="welcome__content">
            <section class="welcome__headers">
                <h1 class="welcome__title">
                    Welcome {{ this.currentUser.firstName }}
                </h1>
                <h6 class="welcome__direction">
                    {{ this.accessMessage }}
                </h6>
            </section>

            <section class="welcome__user-actions">
                <div class="welcome__user-actions-button-container">
                    <button class="welcome__button button button--medium" @click="getQuizzes()">
                        Continue
                    </button>
                </div>
                <div v-if="showEditQuizButton" class="welcome__user-actions-button-container">
                    <button class="welcome__button button button--medium">
                        Edit Quiz
                    </button>
                </div>
            </section>
        </div>
    </div>
</template>

<script lang="ts">
    import { Vue, Component, Provide } from "vue-property-decorator";
    import sessionState from "../store/SessionState";
    import IUser from '../interfaces/IUser';
    import UserAccessEnum from '../enums/UserAccessEnum';
    import QuizService from '../services/QuizService';
    import UserService from '../services/UserService';

    @Component({})
    export default class Welcome extends Vue {
        private currentUser: IUser = {};
        private userAccessLevel: number = 0;
        private showEditQuizButton: boolean = false;
        private quizService = new QuizService();
        private userService: UserService = new UserService();

        private get user() {
            return sessionState.state.User;
        }

        private get accessMessage() {
            return sessionState.state.AccessMessage;
        }

        private get accessLevel() {
            return sessionState.state.UserHasAccess;
        }

        private mounted() {
            console.log('mounted in welcome')
            this.currentUser = this.user;
            // this.isEditQuizAvailable();
        }

        private destroyed() {
        }

        private isEditQuizAvailable() {
            if (this.userAccessLevel === UserAccessEnum.Admin) {
                this.showEditQuizButton = true;
            }
        }

        public async LogoutClicked() {
            await this.userService.changeLogInState()
            .then(() => {
                if (!sessionState.state.ErrorMessage) {
                    this.$router.push('/');
                }
                else {
                    this.$router.push('/ErrorPage');
                }
            });
        }

        private async getQuizzes() {
            await this.quizService.getQuizzes()
            .then(() => {
                if (!sessionState.state.ErrorMessage) {
                    this.nextRoute();
                }
                else this.$router.push('/ErrorPage');
            });
        }

        private nextRoute() {
            this.$router.push('/Quizzes');
        }
        
    }
</script>

<style lang="scss" scoped>

</style>