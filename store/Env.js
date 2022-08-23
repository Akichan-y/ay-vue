export const state = () => ({
  EnvArry:{Tem:123456,Pre:234,Hum:567,EnvTime:""}

})

import Vue from 'vue';

export const mutations = {
    EnvSet(state,{TgtEnv,TgtVal}){
      Vue.set(state.EnvArry,TgtEnv,TgtVal)
    },
}

export const getters = {
  getEnvData: (state) => (tgtEnv) => {
    return (state.EnvArry[tgtEnv]);
    // return "あってるか？"
  }
}