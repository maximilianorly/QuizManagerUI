<template>
    <div class="header">
        <div class="header__left"></div>
        <div class="header__center"></div>
        <div class="header__right">
            <button class="welcome__button button button--medium" @click="LogoutClicked()">
                Logout
            </button>
        </div>
    </div>
</template>

<script lang="ts">
    import { Vue, Component, Provide } from 'vue-property-decorator';
    import IUser from '../interfaces/IUser';
    import UserService from '../services/UserService';
    import sessionState from "../store/SessionState";
    
    @Component({})
    export default class Header extends Vue {

        private userService = new UserService();
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