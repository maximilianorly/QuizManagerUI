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
                    <button class="welcome__button button button--medium">
                        Start Quiz
                    </button>
                </div>
                <div v-if="userAccessLevel === 1" class="welcome__user-actions-button-container">
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

    @Component({
        components: {

        },
    })
    export default class Welcome extends Vue {
        private currentUser: string = this.user.firstName;

        // create Enum for access levels.
        private userAccessLevel = 1;

        private get user() {
            return sessionState.state.User;
        }

        private get accessMessage() {
            return sessionState.state.AccessMessage;
        }

        private mounted() {
        }
        
    }
</script>

<style lang="scss" scoped>

</style>