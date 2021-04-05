import Vue from 'vue';
import Vuex, { Store } from 'vuex';
import "./SessionState";
import { ISessionState } from "./SessionState";
import { getStoreBuilder } from "vuex-typex";

Vue.use(Vuex);

export interface IRootState {
  sessionState: ISessionState;
}

Vue.use(Vuex);

const store: Store<IRootState> = getStoreBuilder<IRootState>().vuexStore();

export default store;