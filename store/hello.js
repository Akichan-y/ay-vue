// import {firebase,storage} from '~/plugins/firebase'
// let db = this.$fire.firebase.database();
// let db = this.$fire.database;
// let db = firebase.database();
// const firestorage = this.$fire.storage;
// const firestorage = this.$fire.storage();
// const storageRef = firestorage.ref();

// let esp = db.ref('setTest/');




export const state = () => ({
  forMax:0,
  message: 'Hello Vuex もうわかったろう！',
  message2: [],
  message3: 'abcdefghijklm',
  message4: {
    ab001: "https://firebasestorage.googleapis.com/v0/b/akilog.appspot.com/o/imagesX%2Fadam-borkowski-QaGAOGtPPKQ-unsplash.jpg?alt=media&token=073b9884-ce32-4edd-880d-04b226bbf6c3", ab002: "https://firebasestorage.googleapis.com/v0/b/akilog.appspot.com/o/imagesX%2Fsobhan-joodi-PrXsOoAYqgg-unsplash.jpg?alt=media&token=46d490ed-bdcb-44a1-beb1-27a26077ce62",
    ab003: "https://firebasestorage.googleapis.com/v0/b/akilog.appspot.com/o/imagesX%2Falexander-naglestad-oCimapsHqYU-unsplash.jpg?alt=media&token=2278a7fa-b55e-44d7-9f25-2382087c28e4",
    ab004: "https://firebasestorage.googleapis.com/v0/b/akilog.appspot.com/o/imagesX%2Fvalerie-elash-XUT7V_md7sc-unsplash.jpg?alt=media&token=712f24d5-32bb-43d5-80c7-483fade9b129", ab005: "https://firebasestorage.googleapis.com/v0/b/akilog.appspot.com/o/imagesX%2Ffile.png?alt=media&token=1f30380a-fd99-409d-b66b-3ec7329f0836",
    
  },
  message5:{},
  imageURL:'えっ？ダメなのか？？？',
  page: 1234,
  FBdata:[{name:'ay'},{age:48}],
})

export const getters = {
    getURL: (state) => (n) => {
      console.log("❐❐❐"+state.message5[n])
    try {
      return (state.message5[n])
      
    } catch (e) {
      console.log(e);
    }
  },
  getForMax: (state) => {
    return state.forMax;
  }
}

import Vue from 'vue';

export const mutations = {
  // changeMessage:function(state,payload){
  //   state.message = payload;
  // },
  // fireUpdate:function(state,fdata){
  //   state.page = 555 ;
  //   console.log('ミューテーション')
  //   state.FBdata = fdata
  // },
  imageURLwrite:function(state,payload){
    state.message2.push(payload);
    // consolo.log("今ロース！");
    // console.log(state.message2);
  },
  imageURLcopy: function (state, payload) {
    console.log(state.message2[payload]);
    state.message3=state.message2[payload]
  },

  // imageArrayTest: function (state, { machineName, myURL }) {
  // imageArrayTest(state, { machineName, myURL }) {
  imageArrayTest(state, { n, u }) {
    // console.log("Don!=="+machineName+"【"+myURL+"】");

    state.forMax++;
    console.log("forMaxは、、、"+state.forMax);
    // state.message3 = "abcde";
    // console.log("aaaa" + fo);
    console.log("Don!=="+n+"【"+u+"】");
    // state.message5[n] = u;
    Vue.set(state.message5,n,u);
    // state.message5[machineName] = myURL;
    console.log(state.message5);
    // console.log(state.message5.file);
  }

}


export const actions = {
  // changemessageAction:function(context,payload){
  //   context.commit('changeMessage',payload);
  // },
  // firebaseLitsn:function(context){
  //   console.log('action入った')
  //   esp.on('value',(snapshot)=>{
  //     let data=snapshot.val();

  //     console.log('アクション！');
  //     this.atai='一番！'
  //     // $store.commit('firebaseOn/fireUpdate')
  //     console.log(data);
  
  //   context.commit('fireUpdate',data);
  //   })
  // },
  // fireSet:function(context){
  //   let name = 'aaaaaaaa';
  //   let email = 'babb';
  //   let imageUrl = 'url_a';
  //   console.log('actionはいった Set');
  //   esp.set({
  //     username:name,
  //     email: email,
  //     profile_picture : imageUrl
  //   })
  // },
  imageDeleate: function (context) {
    let storage = this.$fire.storage
    var pathReference = storage.ref('imagesX/file.png');
    // var pathReference = storage.ref('imagesX/image.jpg');
    pathReference.delete().then(() => {
    // File deleted successfully
      console.log("○")
    }).catch((error) => {
      console.log("✗")
      // Uh-oh, an error occurred!
    });
  },
  fireStorageList:function(context){
    // let listRef = storageRef.child('files/');
    let storage = this.$fire.storage
  //   var pathReference = storage.ref('imagesX/image.jpg');
  //   pathReference.getDownloadURL()
  //     .then((url) => {
  //       console.log("★★"+url);
  // // storageRef.child('images/stars.jpg').getDownloadURL()
  // // .then((url) => {
  //   // `url` is the download URL for 'images/stars.jpg'

  //   // This can be downloaded directly:
  //   var xhr = new XMLHttpRequest();
  //   xhr.responseType = 'blob';
  //   xhr.onload = (event) => {
  //     var blob = xhr.response;
  //   };
  //   xhr.open('GET', url);
  //   xhr.send();

  //   // Or inserted into an <img> element
  //   // var img = document.getElementById('myimg');
  //   // img.setAttribute('src', url);
  // })
  // .catch((error) => {
  //   // Handle any errors
  // });
    // console.log("どうやろ？");
    // let storageRef = storage.child('files/');
    state.message2 = [];
    console.log(state.message2);

    state.message5 = {};
    let listRef = storage.ref('imagesX/');
    // let listRef = storage.child('imagesX/');
    let temp = [];
    // console.log("どうやろ2？");
    listRef.listAll()
    .then(function (result) {
          // console.log("どうやろ3？"+result);
          
          result.items.forEach(function(ref) {
            // firestorage.ref(ref.fullPath).getDownloadURL()
            storage.ref(ref.fullPath).getDownloadURL()
            .then(function(url) {
              // console.log("どうやろ4？");
              console.log(url)
              temp.push(url) ;
              context.commit('imageURLwrite', url)
              let nowName = ref.name.slice(0, -4);
              console.log(ref.fullPath);
              console.log(nowName);
              state.forMax = 0;
              console.log("ここのforMaxは、どうですか？"+state.forMax)
              context.commit('imageArrayTest', {n:nowName,u:url})
              // this.images.push(url);
              
            }).catch(function (error) {
              // console.log("いまいち");
              console.log(error);
            });
            console.log("どうやろ5!!!!!");
            console.log(state.message5);
            
        });
        // console.log(this.images);
        // document.getElementById("table").appendChild(table);
      }).catch(function (error) {
        // console.log("どうやろう６");  
        console.log(error);
      })
      // console.log("完了しまし!!た")

  }
}
