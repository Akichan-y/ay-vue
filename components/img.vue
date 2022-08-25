<template>
  <div>
    <v-hover
        v-slot:default="{ hover }"
        close-delay="200"
        >
          <v-card
          :elevation="hover ? 16 : 2"
          width="100px"
          @click="$store.commit('hello/imageURLcopy',num)"
          >
            <img :src="$store.state.hello.message2[num]" width="100%">
          </v-card>

      </v-hover>
    
  </div>
</template>

<script>
export default {
  props:['num'],
  methods:{
    consoleLog:function(){
      console.log('とりあえずコンソール');
      
    }
  }
}
</script>