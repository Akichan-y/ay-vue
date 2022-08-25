<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      persistent
      max-width="600px"
      class="mt-20"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="primary"
          dark
          v-bind="attrs"
          v-on="on"
        >
          メッセージ編集
        </v-btn>

      </template>
      <v-card>
        <v-card-title>
          <span class="text-h5">メッセージ編集</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            
            <v-row>
              <v-col cols="12" sm="6" md="4" lg="4">
                <v-text-field v-model=MyID label="ここにIDを入力" style="ime-mode: inactive">
                  
                </v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4" lg="4">
                <v-btn @click="fs_get">呼び出し</v-btn>
              </v-col>
            </v-row>
            <v-row>
              <v-col
                cols="6"
                sm="6"
                md="6"
              >
                <v-text-field
                  v-model=MyGroup
                  :label=labels2
                  required
                  style="ime-mode: active"
                ></v-text-field>
              </v-col>
              <v-col
                cols="6"
                sm="6"
                md="6"
              >
                <v-text-field
                  v-model=MyName
                  :label=labels3
                  required
                  style="ime-mode: active"
                ></v-text-field>
              </v-col>

            </v-row>
            <v-row>
              <v-col
                cols="12"
                sm="12"
                md="12"
              >
                <v-text-field
                  v-model=MyMsg
                  :label=labels
                  required
                  style="ime-mode: active"
                ></v-text-field>
              </v-col>

            </v-row>

          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="cancelDayo"
          >
            Cancel
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="fs_set"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
  export default {
    data: () => ({
      dialog: false,
      MyID:"",
      MyMsg:"",
      MyGroup:"",
      MyName:"",

      MyMsg_log:"",
      MyGroup_log:"",
      MyName_log:"",
      MyDate_log:"",

      labels:"メッセージ内容",
      labels2:"グループ",
      labels3:"お名前",
    }),
    methods: {
      fs_get(){
        this.$fire.firestore.collection('Messages').doc(this.MyID)
          .get()
          .then((querySnapshot) => {
                this.MyMsg=querySnapshot.data().msg;
                this.MyGroup=querySnapshot.data().group;
                this.MyName=querySnapshot.data().name;

                this.MyMsg_log=querySnapshot.data().msg;
                this.MyGroup_log=querySnapshot.data().group;
                this.MyName_log=querySnapshot.data().name;
                this.MyDate_log=querySnapshot.data().date;
        })
      },
      fs_set(){
        console.log("こんにちはー")
            this.$fire.firestore.collection('Messages_log')
              .add({
                msgID:this.MyID,
                msg:this.MyMsg_log,
                group:this.MyGroup_log,
                name:this.MyName_log,
                date_log:this.MyDate_log,
                date: this.JikanHenkan_YYMMDDHMS()
              });
        this.$fire.firestore.collection('Messages').doc(this.MyID)
          .set({
            msg:this.MyMsg,
            group:this.MyGroup,
            name:this.MyName,
            date: this.JikanHenkan_YYMMDDHMS()
          });
            console.log("こんにちはー２")
        this.cancelDayo();
          // .then((querySnapshot) => {
                // console.log(querySnapshot.id);
                // console.log(querySnapshot.data().msg);
        // })
      },
      cancelDayo(){
          this.MyID="";
          this.MyMsg="";
          this.MyGroup="",
          this.MyName=""
 
          this.MyMsg_log="";
          this.MyGroup_log="",
          this.MyName_log=""

          this.dialog = false;
      },
      JikanHenkan_YYMMDDHMS: function () {
        let d = new Date;
        let yy = "0" + d.getFullYear();
        let mm ="0" + Number(d.getMonth()+1);
        let dd ="0" + d.getDate();
        let h = "0" + d.getHours();
        let m = "0" + d.getMinutes();
        let s = "0" + d.getSeconds();
        console.log(d);
        return `${yy.slice(-2)}/${mm.slice(-2)}/${dd.slice(-2)}-${h.slice(-2)}:${m.slice(-2)}`
    },
    }
  } 
</script>