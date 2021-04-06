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
                    <button class="welcome__button button button--medium" @click="getQuizQuestions()">
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

    @Component({
        components: {

        },
    })
    export default class Welcome extends Vue {
        private currentUser: string = this.user.firstName;
        private userAccessLevel: number = this.accessLevel.accessLevelId;
        private showEditQuizButton: boolean = false;
        private quizService = new QuizService();

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

        private isEditQuizAvailable() {
            if (this.userAccessLevel === UserAccessEnum.Admin) {
                this.showEditQuizButton = true;
            }
        }

        private getQuizQuestions() {
            console.log(1);
            this.quizService.getActiveQuestions()
            .then(() => {

                if (sessionState.state.InUseQuestions[0]) {
                    this.nextRoute();
                }
                else {
                    this.$router.push('/ErrorPage')
                }
            })
        }

        private nextRoute() {
            this.$router.push('/Question');
        }
        
    }
</script>

<style lang="scss" scoped>

</style>