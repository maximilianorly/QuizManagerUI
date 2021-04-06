<template>
    <div>

    </div>
</template>

<script lang="ts">
    import { Vue, Component, Provide } from "vue-property-decorator";
    import sessionState from "../store/SessionState";
    import QuizService from '../services/QuizService';
    import IQuestion from "../interfaces/IQuestion";

    @Component({
        components: {

        },
    })
    export default class Question extends Vue {
        private questions: Array<IQuestion> = this.inUseQuestions;

        private get inUseQuestions() {
            return sessionState.state.InUseQuestions;
        }

        private mounted() {
            console.log(`In Use Qs: ${this.questions}`);
        }
    }
</script>

<style lang="scss" scoped>

</style>