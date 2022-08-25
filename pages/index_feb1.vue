<template>
  <div class="page">
    <form
      class="form"
      @submit.prevent="submitImg()"
    >
      <input
        type="file"
        accept="img/*"
        @change="changeImg"
      >
      <button
        type="submit"
        class="button"
      >
        click
      </button>
   </form>
    <div>
      <p>{{ thumbnail }}</p>
      <p>{{ postData.thumbnail }}</p>
      <img :src="postData.thumbnail" alt="">
    </div>
    <v-btn @click="submit2">submit2</v-btn>

    <!-- <v-flex xs4 class="pr-5"> -->
         <!-- <v-layout column justify-space-between class="purple" fill-height> -->
         <v-layout column="2" justify-center class="pl-4 grey lighten-3 " height='300px'>
         <!-- <v-layout column="" justify-space-between class="purple" fill-height> -->

            <!-- <v-card class="green">
               First Card
            </v-card> -->
            <!-- <span v-for="n in 10"> -->
              <!-- <span v-for="n in 10">{{ n }} </span>
              
                <!-- <Img v-for="n in 10" num=Number(n)>{{Number(n)*10}} </Img> -->
            <!-- </span> -->

          <v-row>
            <span v-for="n in getForMax">
              {{ n*10 }} 
              <Img :num=n-1></Img>
              </span>

          </v-row>
      

        </v-layout>
            <v-text-field
              v-model="first"
              
              color="purple darken-2"
              label="First name"
              required
            ></v-text-field>
      <v-flex xs8 class="pr-5">
         <v-card class="pink lighten-4" height="400px">

          <img 
          :src=getURL 
          width="50%"
          >
         </v-card>

      </v-flex>
      <!-- <v-flex xs8 class="pr-5">
         <v-card class="pink lighten-4" height="600px">

          <img 
          :src=urlTest
          width="100%"
          >
         </v-card>
      </v-flex> -->
      <!-- </v-flex> -->
    <v-btn @click="$store.dispatch('hello/fireStorageList')">fireStorageList</v-btn>
    <v-btn @click="$store.dispatch('hello/imageDeleate')">fireStorageDeleate</v-btn>
  <weatherC></weatherC>
  </div>
</template>

<script>


// import firebase from '@/plugins/firebase'
import Img from      '~/components/img.vue'
import weatherC from '~/components/weather_comp.vue'

export default {
  components: {
    // Logo,
    // VuetifyLogo,
    // HC,
    Img,
    weatherC
  },
  data () {
    return {
      f:5,
      first:"",
      testName:"raamin-ka-uR51HXLO7G0-unsplash.jpg",
      testURL1:"https://firebasestorage.googleapis.com/v0/b/akilog.appspot.com/o/imagesX%2F",
      testURL2:"?alt=media&token=1f30380a-fd99-409d-b66b-3ec7329f0836",
      urlTest:"https://firebasestorage.googleapis.com/v0/b/akilog.appspot.com/o/imagesX%2Ffile.png?alt=media&token=1f30380a-fd99-409d-b66b-3ec7329f0836",
      // urlTest:"https://firebasestorage.googleapis.com/v0/b/akilog.appspot.com/o/imagesX%2Ffile.png?alt=media&token=1f30380a-fd99-409d-b66b-3ec7329f0836",
      text:"aaa",
      thumbnail: '',
      thumbnailName:'',
      postData: {
        thumbnail: '',
        thumbnailName:'',
      },
    }
  },
  computed:{
    getcycleCountMaijiArray() {
      return this.$store.getters["timeBank/getcycleCountMaijiArray"](this.nameAB);
    },
    getURL(){
      // return this.
      return this.$store.getters["hello/getURL"](this.first);
      // return this.$store.getters["hello/getURL"]("file4");
    },
    getForMax(){
      return this.$store.getters["hello/getForMax"]
    }
  },
  methods: {
    changeImg (e) {
      console.log(e.target.files[0].size);
      if(e.target.files[0].size>1000000){
        console.log("やばいよ。やばいよ")
      }else{
        console.log("オッケーだよ")
      };
      this.thumbnail = e.target.files[0]
      this.thumbnailName = e.target.files[0].name;
      if (this.thumbnail) {
        const reader = new FileReader()
        reader.onload = () => {
          this.postData.thumbnail = reader.result + ''
        }
        reader.readAsDataURL(this.thumbnail)
        console.log('選択完了')
        this.submitImg(this.thumbnail)
      }
    },
    submitImg (thumbnail) {

      let storage = this.$fire.storage
      // // let storage = firebase.storage()
      let nowChild = "imagesX/" + this.thumbnailName
      let storageRef = storage.ref().child(nowChild);
      // let storageRef = storage.ref().child('imagesX/filec.png')
      storageRef.put(thumbnail)
        .then(res => console.log(res))
        .catch(error => console.log(error))

      //==============================================
      //これは、FSの実験、問題なく動作する
      // try {
      //   this.$fire.firestore.collection('sample3')
      //     .add({
      //       text: this.text
      //     })
      //     .then((ref) => {
      //       console.log('Add ID: ', ref.id)
      //     })
      // } catch (e) {
      //   console.log(e)
      // }
      //==============================================



    },
    async submit2() {
      try {
        this.$fire.firestore.collection('sample3')
          .add({
            text: this.text
          })
          .then((ref) => {
            console.log('Add ID: ', ref.id)
          })
      } catch (e) {
        console.log(e)
      }
    }
  },
}
</script>

<style lang="scss" scoped>
</style>