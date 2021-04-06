<template>
    <div class="component__container">
        <div class="log-in__content">
            <section class="log-in__headers">
                <h1 class="log-in__title">
                    QUIZTIME
                </h1>
                <h6 class="log-in__direction">
                    Please enter Log In details to access.
                </h6>
            </section>

            <section class="log-in__user-data-fields">
                <h6 class="log-in__errorMessage" v-if="errorMessage !== ''">
                    {{ errorMessage }}
                </h6>
                <div class="log-in__user-data-input-container">
                    <input type="text" placeholder="Username" v-model="userCredentials.Username" class="log-in__user-data-input">
                </div>

                <div class="log-in__user-data-input-container">
                    <input type="text" placeholder="Password" v-model="userCredentials.Password" class="log-in__user-data-input">
                </div>

                <div class="log-in__button-container">
                    <button class="log-in__button button button--small" @click="logInWithSuppliedCredentials(userCredentials)">
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
    import userAccessLevelService from '../services/UserAccessLevelService'
    import sessionState from '../store/SessionState';

    @Component({
        components: {

        },
    })
    export default class LogIn extends Vue {
        private currentUser: IUser = {};
        private userCredentials: IUserCredentials = { Username: "", Password: ""};
        private userService: UserService = new UserService();
        private userAccessService: userAccessLevelService = new userAccessLevelService()
        private errorMessage: string = '';

        private get user() {
            return sessionState.state.User;
        }

        private mounted() {
            sessionState.commitSetSessionState(sessionState.state)
        }

        // Promise<boolean>
        private logInWithSuppliedCredentials(Credentials: IUserCredentials) {
            this.userService.verifyCredentials(Credentials)
            .then(() => {
                if (sessionState.user.id) {
                    this.errorMessage = '';
                    this.getUserAccessLevel(this.user.id);
                }
            });
        }

        private getUserAccessLevel(UserId: number) {
            this.userAccessService.getUserAccessLevelByUserId(UserId)
            .then(() => {
                if (sessionState.state.UserHasAccess.accessLevelId) {
                    this.nextRoute();
                }
                else {
                    // this.setErrorMessage();
                    this.$router.push('/ErrorPage')
                }
            });
        }

        private setErrorMessage() {

        }

        private nextRoute() {
            this.$router.push('/Welcome')
        }
    };
</script>

<style lang="scss" scoped>

</style>