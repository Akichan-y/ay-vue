<!-- FireStoreを使った、CRUD処理を実装 2021/4/12-->

<template>
  <dir>

  <v-app>

    <!-- <form
      class="form"
      @submit.prevent="submitImg()"
    >
      <input
        type="file"
        accept="img/*"
        @change="changeImg"
      >

   </form> -->


      <!-- <p>{{ thumbnail }}</p>
      <p>{{ postData.thumbnail }}</p> -->


      <!-- <dir  width="50px">
        <img :src="postData.thumbnail" alt="" width="500px">
      </dir> -->

    <v-container>


  <v-data-table
    :headers="headers"
    :items="machines"
    :search="search"
    sort-by="calories"
    class="elevation-5"
    
  >


    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title>機械の編集</v-toolbar-title>

      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="検索"
        single-line
        hide-details
      ></v-text-field>

        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-dialog
          v-model="dialog"
          max-width="500px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              dark
              class="mb-2"
              v-bind="attrs"
              v-on="on"
            >
              追加
            </v-btn>
          </template>

          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
                <img src="~/assets/bishamon.png" width="15%">
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.machine"
                      label="機械番号"
                    ></v-text-field>
                    <v-text-field
                      v-model="editedItem.KeikakuDai"
                      label="計画台数"
                    ></v-text-field>
                    <v-text-field
                      v-model="editedItem.ZangyouJikan"
                      label="残業（時間）"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.tantousha"
                      label="担当者"
                    ></v-text-field>
                  </v-col>
              </v-row>
              <v-row>
                  <v-col
                    cols="12"

                  >
                    <v-text-field
                      v-model="editedItem.bikou"
                      label="備考"
                    ></v-text-field>
                  </v-col>
              </v-row>
              <v-row>
                  <v-col
                    cols="6"
                    sm="4"
                    md="2"
                  >
                    <v-text-field
                      v-model="editedItem.CTm"
                      label="CycleTime分"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.CTs"
                      label="CycleTime秒"
                    ></v-text-field>

                  </v-col>
              </v-row>

    <form
      class="form"
      @submit.prevent="submitImg()"
    >
      <input
        type="file"
        accept="img/*"
        @change="changeImg"
      >
      <!-- <button
        type="submit"
        class="button"
      >
        click
      </button> -->
   </form>
      <!-- <p>{{ thumbnail }}</p>
      <p>{{ postData.thumbnail }}</p> -->
      <dir  width="50px">
        <img :src="postData.thumbnail" alt="" width="100%">
      </dir>


          <!-- <v-file-input
            v-model="input_image"
            accept="image/*"
            show-size
            label="画像ファイルをアップロードしてください"
            prepend-icon="mdi-image"
            @change="onImagePicked"
          ></v-file-input>
          <img width="100%" v-if="uploadImageUrl" :src="uploadImageUrl" /> -->

              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                text
                @click="close"
              >
                キャンセル
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="save"
              >
                 保存
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="headline">Are you sure you want to delete this item?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>

    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn
        color="primary"
        @click="initialize"
      >
        Reset
      </v-btn>
    </template>
  </v-data-table> 

  </v-container>
  <v-container>
    <v-btn color="pink" @click="FireStoreSet">DB更新</v-btn>
  </v-container>
  
  </v-app>

  
  </dir>
</template>

<script>
// import firebase from 'firebase'

// const db = firebase.firestore();

  export default {
    data: () => ({
      input_video: null,
      input_image: null,
      uploadVideoUrl: '',
      uploadImageUrl: '',


      TgtFile:null,
      search: '',
      dialog: false,
      dialogDelete: false,
      headers: [
        {
          text: '機械番号',
          align: 'start',
          sortable: false,
          value: 'machine',
          width:"7%"
        },
        { text: '計画台数', value: 'KeikakuDai', width: "6%" },
        { text: '残業（時）', value: 'ZangyouJikan' ,width:"5%"},
        { text: '担当者', value: 'tantousha' ,width:"10%"},
        { text: 'CycleTime（分）', value: 'CTm' ,width:"7%"},
        { text: 'CycleTime（秒）', value: 'CTs',width:"7%" },
        { text: '備考', value: 'bikou' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      machines: [],
      machinesRensou: {},
      editedIndex: -1,
      editedItem: {
        machine: '',
        tantousha: "",
        CTm: 0,
        CTs: 0,
        bikou: "",
        KeikakuDai: 0,
        ZangyouJikan:0
      },
      defaultItem: {
        machine: '',
        tantousha: "",
        CTm: 0,
        CTs: 0,
        bikou: "",
      },
      postData: {
        thumbnail: '',
        thumbnailName:'',
      },
      thumbnail:"",
      thumbnailName:""
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? '新規登録' : '登録内容編集　'
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },

    created () {
      // this.initialize()
      this.FireStoreGet()
    },

    methods: {
        changeImg (e) {
          
          // console.log(e.target.files[0].size);
          try{

            if(e.target.files[0].size>1000000){
              console.log("やばいよ。やばいよ")
            }else{
              console.log("オッケーだよ")
            };
            this.thumbnail = e.target.files[0]
            this.thumbnailName = e.target.files[0].name;
            console.log(this.thumbnai);
            console.log(this.thumbnailName);
            if (this.thumbnail) {
              const reader = new FileReader()
              reader.onload = () => {
                this.postData.thumbnail = reader.result + ''
              }
              reader.readAsDataURL(this.thumbnail)
              console.log('選択完了')
              // this.submitImg(this.thumbnail)
            }
          }catch(e){
            console.log(e);
          }
        },
        onImagePicked(file) {
              // this.thumbnail = file.target.files[0];
              // this.thumbnailName = file.target.files[0].name;
    
            if (file !== undefined && file !== null) {
              if (file.name.lastIndexOf('.') <= 0) {
                return
              }
              const fr = new FileReader()
              this.thumbnailName=fr.name;
              console.log("名前は"+fr.name);
              // console.log(this.thumbnailName);
              fr.readAsDataURL(file)
              fr.addEventListener('load', () => {
                this.uploadImageUrl = fr.result
                console.log(this.uploadImageUrl);
                // this.$store.commit('hello2/imageArrayTest',{n:this.editedItem.machine,u:this.editedItem.tantousha})
              })
            } else {
              this.uploadImageUrl = ''
            }
          },
      // storagePush(){
      submitImg (thumbnail) {

        let storage = this.$fire.storage
        // // let storage = firebase.storage()
        // let nowChild = "imagesX/" + this.thumbnailName
        let nowChild = "imagesX/" + this.editedItem.machine + ".jpg";
        let storageRef = storage.ref().child(nowChild);
        // let storageRef = storage.ref().child('imagesX/filec.png')
        storageRef.put(thumbnail)
          .then(res => console.log(res))
          .catch(error => console.log(error))





      
      },
      initialize () {

      //   this.machines = [
      //     {
      //       machine: 'MC028',
      //       CTm: 4,
      //       CTs: 32,
      //       tantousha: "0489山崎",
      //       bikou: "ミスの無いよう頑張ります！",
      //     },
      //     {
      //       machine: 'MC031',
      //       CTm: 4,
      //       CTs: 22,
      //       tantousha: "0489山崎",
      //       bikou: "限界サイクルタイムで稼働中",
      //     },
      //     {
      //       machine: 'LN034',
      //       CTm: 2,
      //       CTs: 12,
      //       tantousha: "0489山崎",
      //       bikou: "プレッシャープレート",
      //     },
      //   ]
      },
      FireStoreGet(){
        this.machines=[];
        let machines2=[];
        this.$fire.firestore.collection("machines")
        // db.collection("machines")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
              // console.log(`${doc.id} => ${doc.data().CTs}`);
              // この記述がわからずに、なかなか苦労した。以下を参考に解決
              // https://nekorokkekun.hatenablog.com/entry/2019/09/25/114448
              // console.log(doc.id);
              // console.log(doc.id.machine);
              this.machinesRensou[doc.id]=[doc.data()];
              this.machines.push(
                Object.assign({
                  machine:doc.id,
                },doc.data())
              );
              // this.$store.commit('crud/addUser', payload)

          });
          // console.log(this.machines);
          // console.log(this.machinesRensou);
          // console.log(this.machinesRensou["LN034"][0]["bikou"]);
        });
      
      },
      FireStoreSet(){
        let machineRef=this.$fire.firestore.collection("machines");

        for(const elem of this.machines){
          // console.log(elem);
          for(let key in elem){
            // console.log('key:' + key + ' value:' + elem[key])
            // console.log(elem['machine']);
            // console.log(elem['machine'] + "-" + elem['KeikakuDai']);
            // console.log(elem['KeikakuDai'])
            let NowKeikakuDai = 0;    //エラー回避のために、一時的に格納する
            if(elem['KeikakuDai']!=undefined){
              // console.log("ok!!!!!")
              NowKeikakuDai = elem['KeikakuDai']
            }else{
              // console.log("❒❒❒❒ NG ❒❒❒❒")
            }

            let NowZangyouJikan = 0;    //エラー回避のために、一時的に格納する
            if(elem['ZangyouJikan']!=undefined){
              // console.log("ok!!!!!")
              NowZangyouJikan = elem['ZangyouJikan']
            }else{
              // console.log("❒❒❒❒ NG ❒❒❒❒")
            }
            machineRef.doc(elem['machine']).set({
              tantousha:elem['tantousha'],
              CTm:elem['CTm'],
              CTs:elem['CTs'],
              bikou: elem['bikou'],
              KeikakuDai: NowKeikakuDai,
              ZangyouJikan:NowZangyouJikan

            })
            let TgtM = elem['machine'];
            let ctByou = Number(elem['CTm'])*60 + Number(elem['CTs']);
            this.$store.commit('timeBank/CycleTimeByouArrySet',{TgtMachine:TgtM,CycleTimeByou:ctByou}); 

          }
        }
      },
      editItem(item) {
        this.thumbnail = "";
        this.thumbnailName = "";
        this.editedIndex = this.machines.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        this.editedIndex = this.machines.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

      deleteItemConfirm () {
        this.machines.splice(this.editedIndex, 1)
        this.closeDelete()
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.machines[this.editedIndex], this.editedItem)
        } else {
          this.machines.push(this.editedItem)
        }
        // console.log("サムネールは" + this.thumbnail);
        // console.log("サムネールNameは" + this.thumbnailName);
        if (this.thumbnail == "") {
          console.log("サムネールは空だよ");
        } else {
          this.submitImg(this.thumbnail);
          this.changeImg();
          this.thumbnail = "";
          this.thumbnailName = "";
        }
        this.close();
      },
    },
  }
</script>