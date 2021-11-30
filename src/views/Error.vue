<template>
    <div class="component__container">
        {{ this.e }}
    </div>
</template>

<script lang="ts">
    import { Vue, Component, Provide } from 'vue-property-decorator';
    import IUser from '../interfaces/IUser';
    import IUserCredentials from '../interfaces/IUserCredentials';
    import UserService from '../services/UserService';
    import sessionState from '../store/SessionState';

    @Component({
        components: {

        },
    })
    export default class ErrorPage extends Vue {
        private e: string = this.errorMessage;

        private get errorMessage() {
            return sessionState.state.ErrorMessage;
        }
    }
</script>

<style lang="scss" scoped>

</style>