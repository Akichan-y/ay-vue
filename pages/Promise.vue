<template>
<v-app>
  <v-container>
    <h1>非同期処理のお勉強</h1>
    <v-btn color="Primary" @click="TryPromise">TryPromise</v-btn>
    <v-btn color="secondary" @click="sleep(5000)">While</v-btn>
  </v-container>
</v-app>
</template>

<script>
export default {
  data () {
    return{

    }
  },
  methods:{
    TryPromise(){
      console.clear;
      console.log(1);
      setTimeout(() =>console.log(2),5000);
      console.log(3);
    },
    sleep(second){
      const startTime=new Date();
      while(new Date()-startTime<second);
      console.log("done sleep");
    },
  }
}
</script>