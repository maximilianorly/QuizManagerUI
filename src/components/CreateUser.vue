<template>
    <div class="component__container">
        <div class="create-user__content">
            <section class="log-in__header">
                <h1 class="log-in__title">
                    QUIZTIME
                </h1>
            </section>

            <section class="log-in__user-data-fields">
                <div class="log-in__user-data-input-container">
                    <input type="text" placeholder="First name" v-model="userCredentials.firstName" class="log-in__user-data-input">
                </div>

                <div class="log-in__user-data-input-container">
                    <input type="text" placeholder="Last name" v-model="userCredentials.lastName" class="log-in__user-data-input">
                </div>

                <div class="log-in__user-data-input-container">
                    <input type="text" placeholder="Username" v-model="userCredentials.Username" class="log-in__user-data-input">
                </div>

                <div class="log-in__user-data-input-container">
                    <input type="text" placeholder="Password" v-model="userCredentials.password" class="log-in__user-data-input">
                </div>
            </section>
        </div>
    </div>
</template>

<script lang="ts">
    import { Vue, Component, Provide } from 'vue-property-decorator';
    import IUser from '../interfaces/IUser';

    export default class CreateUser extends Vue {
        private newUser: IUser = { firstName: '', lastName: '', username: '', password: ''};
        
    }
</script>

<style lang="scss" scoped>

</style>