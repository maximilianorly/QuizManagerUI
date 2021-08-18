<template>
    <div class="component__container">
        <div class="welcome__content">
            <section class="welcome__headers">
                <h1 class="welcome__title">
                    WELCOME {{ this.currentUser.toUpperCase() }}
                </h1>
                <h6 class="welcome__direction">
                    {{ this.accessMessage }}
                </h6>
            </section>

            <section class="welcome__user-actions">
                <div class="welcome__user-actions-button-container">
                    <button class="welcome__button button button--medium" @click="nextRoute()">
                        Start Quiz
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

    @Component({})
    export default class Welcome extends Vue {
        private currentUser: string;
        //  = this.user.firstName;
        private userAccessLevel: number;
        //  = this.accessLevel.accessLevelId;
        private showEditQuizButton: boolean = false;
        private quizService = new QuizService();
        // private ready: boolean = false;
        // private checkReady;

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
            this.isEditQuizAvailable();
        }

        private destroyed() {
        }

        private isEditQuizAvailable() {
            if (this.userAccessLevel === UserAccessEnum.Admin) {
                this.showEditQuizButton = true;
            }
        }

        //calling on 'startQuizClick'
        // private async getQuizQuestions() {
        //     await this.quizService.getActiveQuestions()
        //     .then((response) => {
        //     })

        //     if (sessionState.state.InUseQuestions[0]) {
        //         console.log(sessionState.state.InUseQuestions[0]);
        //         this.nextRoute();
        //     }
        //     else {
        //         this.$router.push('/ErrorPage')
        //     }
        // }

        private nextRoute() {
            this.$router.push('/Quiz');
        }
        
    }
</script>

<style lang="scss" scoped>

</style>