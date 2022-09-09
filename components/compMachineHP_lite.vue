<template>
    <v-app  height="270px">
      <v-card
        class="mt-1 mb-1 py-0 mx-auto"
        width="170px"
        height="270px"
        elevation="20"
        mb="1"
      >
        <v-container class="my-0 py-0 grey lighten-5">
          <!-- <v-row justify="left" class="mt-0"> -->
            <div
              class="mt-0 green-circle MyLamp"
              v-if="getStatusData == 1"
              @click="redirect"
            >
              {{ name }} 運転中
            </div>
            <div
              class="mt-0 red-circle MyLamp"
              v-else-if="getStatusData == 2"
              @click="redirect"
            >
              {{ name }} 異常発生中
            </div>
            <div
              class="mt-0 yellow-circle MyLamp"
              v-else-if="getStatusData == 3"
              @click="redirect"
            >
              {{ name }} 段取中
            </div>
            <div
              class="mt-0 pink-circle MyLamp"
              v-else-if="getStatusData == 4"
              @click="redirect"
            >
              {{ name }} 計画停止中
            </div>
            <div class="mt-0 black-circle MyLamp" v-else @click="redirect">
              {{ name }} 停止中
            </div>
          <!-- </v-row> -->

  
          <!-- <div class="Owaku my-0 py-0"> -->


          
            <div class="my-0 pa-0">
              <img
                :src="getURL"
                onerror="this.onerror=null;this.src='~/assets/img/photo.png'"
                class="Shain_image_lite"
              />
            </div>
          <!-- </div> -->
  
       
  
                <p
                  class="mt-0 mb-3 mr-5 text-center text--lighten-1 font-weight-bold headline ObjStyleA"
                  v-bind:style="Beki"
                >
                  可動率 {{ calc_BekiDouRitsu }}%({{
                    calc_ShinChokuKaisu(false)
                  }})
                </p>
  
           
          
        </v-container>
      </v-card>
    </v-app>
  </template>
  
  <style>

  .NowCheckBox {
    position: absolute;
    top: 210px;
    left: 1px;
  }

  
  .DaisuKeikaku{
    position: absolute;
    font-size: 35px;
    font-weight: bold;
    color: blue;
    top:30px;
    left:10px;
  }
  
  .DaisuJisseki{
    position: absolute;
    font-size: 35px;
    font-weight: bold;
    color: red;
    top:30px;
    right:120px;
  }
  
  .TonyuKosu{
    position: absolute;
    font-size: 20px;
    font-weight: bold;
    color: blue;
    bottom:0px;
    left:10px;
  }
  


  .Shain_image_lite {
    position: absolute;
    top: 120px;
    left: 10px;
    margin-top: 0px;
    padding-top: 0px;
    width: 150px;
    border: solid blue;
    border-radius: 10px;
  }
  
  


  .ObjStyleA {
    outline: 1px solid grey;
    border-radius: 15px; /* まるみ */
    height: 70px; /* 高さ */
    width: 150px; /* 幅 */

  }
  
 

  
  
  .MyLamp {
    cursor: pointer;
    top:30px;
    left: 30px;
    display: inline-block; /* センター寄せ用 */
    border-radius: 10px; /* まるみ */
    height: 40px; /* 円の大きさ */
    width: 150px; /* 円の大きさ */
    margin-right: 10px;
    margin-bottom: 5px;
    margin-top: 20px;
    text-align: center;
    line-height: 40px;
    user-select: none;
  }
  .btnLamp:active {
    margin-top: 25px;
    margin-bottom: 0px;
  }
  
  .btnLamp:hover {
    opacity: 0.8;
  }

  
  .redCollor {
    color: red;
    background: #7fff00;
  }
  .green-circle {
    background-color: rgb(0, 255, 0); /* ベースカラー */
    box-shadow: 0 0 3px 3px rgb(37, 112, 4),
      3px 3px 5px 3px rgb(200, 255, 0) inset; /* 外側のカラー・左上のカラー */
  
    /* 以下はそろえるだけの為のmargin */
    border-color: red;
  }
  .red-circle {
    /* display: inline-block; */
    color: white;
  
    background-color: rgb(255, 0, 0);
    box-shadow: 0 0 3px 3px rgb(78, 3, 3),
      3px 3px 5px 3px rgb(238, 161, 147) inset;
  }
  .yellow-circle {
    /* display: inline-block; */
    color: black;
    background-color: rgb(255, 255, 0);
    box-shadow: 0 0 3px 3px rgb(136, 80, 7),
      3px 3px 5px 3px rgb(247, 238, 161) inset;
  }
  .pink-circle {
    /* display: inline-block; */
    color: black;
    background-color: rgb(247, 174, 234);
    box-shadow: 0 0 3px 3px rgb(122, 56, 106),
      3px 3px 5px 3px rgb(243, 146, 240) inset;
  }
  .black-circle {
    /* display: inline-block; */
    color: black;
    background-color: silver;
    box-shadow: 0 0 3px 3px rgb(54, 53, 53),
      3px 3px 5px 3px rgba(172, 169, 169, 0.5) inset;
  }
  </style>
  
  <script>
  import Vue from "vue";
  import Vuex from "vuex";
  
  // const gradients = [
  //   ["#222"],
  //   ["#42b3f4"],
  //   ["red", "orange", "yellow"],
  //   ["purple", "violet"],
  //   ["#00c6ff", "#F0F", "#FF0"],
  //   ["#f72047", "#ffd200", "#1feaea"]
  // ];
  export default {
    props: ["name"],
    data() {
      return {
        ShinchokuDai: 0,
        ShinchokuDai2:0,
        nowTT:"@分@@秒",
        checkBox: false,
        selectStanderdSpecial: "standerd",
        NowTantousha: "",
        NowBikou: "",
        KeikakuDai: 0,
        ZangyouJikan: 0,
        A_Data: 0,
        myWidth: 10,
        myStrokeDashOffset: 30,
        // ObjStyleBool:[true,false,false,false,false,false,false],
        isRed: true,
        isBlue: false,
        MachineHour: "",
        DacchakuJikan: "",
        DandoriJikan: "",
        ar: [],
        styleObject: {
          color: "gray",
          background: "white",
        },
  
        isTgt: false,
        nameAB: this.name, //propsからdataに移すことで、
        //変数として利用できるようになる。
        // imgSrcString:require('~/assets/img/MC031.jpg'),
        chokuzenSW: "aaa",
        // labels: [
        //   "8am",
        //   "9am",
        //   "10am",
        //   "11am",
        //   "1pm",
        //   "2pm",
        //   "3pm",
        //   "4pm",
        //   "5pm",
        //   "6pm"
        // ],
        width: 2,
        radius: 10,
        padding: 8,
        lineCap: "round",
        // gradient: gradients[5],
        defferenceTime: 0,
        KeikaJikanTime: "00:00:00",
  
        // gradientDirection: "top",
        // gradients,
        fill: false,
        type: "trend",
        autoLineWidth: false,
  
        //**********************************
        // データ詳細
        //**********************************
        //=********************************************************************
      };
    },
    computed: {
      getURL() {
        // return this.
        return this.$store.getters["hello2/getURL"](this.nameAB);
        // return this.$store.getters["hello/getURL"]("file4");
      },
      // getCycleCount2(){
      //   return this.$store.getters["timeBank/getcycleCountMaijiArray"](this.nameAB);
  
      // },
      getcycleTimeDeffArray() {
        try {
          let nowArray = this.$store.getters["timeBank/getcycleTimeDeffArray"](
            this.nameAB
          );
          // return nowArray;
  
          try {
            if (nowArray != undefined) {
              // console.log(nowArray);
              // return nowArray.slice(0,7);
  
              // ↓スプレッド演算子でコピーをつくる、
              // なる処理を行うとエラーが回避できる！
              // https://noah.plus/blog/007/
              return [...nowArray].reverse().slice(0, 5);
            }
          } catch (e) {
            console.log(nowArray);
            console.log("ここが怪しい" + e);
          }
  
          // return nowArray.slice(0,10);
          // return nowArray.slice(0,10).reverse();
        } catch (e) {
          console.log(e);
        }
      },
      getCycleCount: function () {
        return function (isV) {
          try {
            if (
              this.$store.getters["timeBank/getcycleCountMaijiArray"](
                this.nameAB
              )[isV] == 0
            ) {
              return "";
            } else {
              return String(
                this.$store.getters["timeBank/getcycleCountMaijiArray"](
                  this.nameAB
                )[isV]
              ).padStart(2, "_");
              // return "\u0020" + String(this.$store.getters["timeBank/getcycleCountMaijiArray"](this.nameAB)[isV]);
              // return "A" + String(this.$store.getters["timeBank/getcycleCountMaijiArray"](this.nameAB)[isV]);
            }
          } catch (e) {
            // console.log(e);
          }
        };
      },
      // calc_ShinChokuKaisu2:function(){
      //   //普通computedに引数を渡すことはできませんが、返り値を関数にして、そこに引数を書けば渡すことができます。
      //   return function(isV){
      //     let calc_result = Math.round((this.getCountData - this.calc_BekiKaisu));
  
      //     if(isV){
      //       //Valur数値の場合
      //       return calc_result;
      //     }else{
      //       //文字列の場合
      //       if(calc_result<0){
      //           return `▲${Math.abs(calc_result)}`;
      //       }else if(calc_result==0){
      //           return `±${Math.abs(calc_result)}`;
      //         }else{
      //           return `+${calc_result}`;
      //       };
      //     }
  
      //   }
  
      // },
  
      getGuntArryWait() {
        return this.$store.getters["timeBank/getGuntArryWait"](this.nameAB);
      },
      getGuntArryRUN() {
        return this.$store.getters["timeBank/getGuntArryRUN"](this.nameAB);
      },
      getGuntArryDDR() {
        return this.$store.getters["timeBank/getGuntArryDDR"](this.nameAB);
      },
      getGuntArryERR() {
        return this.$store.getters["timeBank/getGuntArryERR"](this.nameAB);
      },
      getGuntArryKKT() {
        return this.$store.getters["timeBank/getGuntArryKKT"](this.nameAB);
      },
      getStopWatchArray() {
        if (this.getCountData == 0) {
          return "0分00秒";
        } else {
          return this.$store.getters["timeBank/getStopWatchArray"](this.nameAB);
        }
      },
      getStopWatchSecondsArryJust() {
        try {
          return this.$store.getters["timeBank/getStopWatchSecondsArryJust"](
            this.nameAB
          );
        } catch (e) {
          // console.log(e)
        }
      },
      CycleJustHunByou() {
        return this.JikanHenkan(this.getStopWatchSecondsArryJust);
  
        //サイクルタイムからのカウントダウンでは以下となる
        // return this.JikanHenkan(this.getCycleTimeByouArry-this.getStopWatchSecondsArryJust);
      },
      getJustSensingTime() {
        return this.$store.getters["timeBank/getJustSensingTime"](this.nameAB);
      },
      get_sensingTimeArryJust() {
        return this.$store.getters["timeBank/get_sensingTimeArryJust"](
          this.nameAB
        );
      },
      getmachineHourCut() {
        return this.$store.getters["timeBank/getmachineHourCutArry"](this.nameAB);
      },
      myStrokeDashOffset2() {
        let CycleTime = this.getCycleTimeByouArry;
        let JustCycleTime = this.getStopWatchSecondsArryJust;
        let NowCycleNokori =
          100 - ((CycleTime - JustCycleTime) / CycleTime) * 100;
        // console.log(NowCycleNokori);
        return NowCycleNokori;
      },
      myWidth2() {
        this.A_Data = this.$store.getters["timeBank/getmachineHourCutArry"](
          this.nameAB
        );
        if (this.A_Data == undefined) {
        } else {
          // console.log(this.nameAB+"の　A_Dataは、" + this.A_Data);
          // console.log("Cutの値は、" + this.nameAB + "で、" +this.$store.getters["timeBank/getmachineHourCutArry"](this.nameAB));
          let Max_Value = 0;
          try {
            //例外が発生する可能性のある処理
            Max_Value = this.$store.getters["timeBank/getmachineHourArryTgt"](
              this.nameAB
            )[0];
          } catch (e) {
            //例外が発生した場合の処理
            // console.log(e);
            // Max_Value= this.$store.getters["timeBank/getmachineHourArryTgt"](this.nameAB);
            Max_Value = 1;
          }
          let xxx = 255 / Max_Value;
  
          if (this.A_Data <= 0) {
            this.A_Data = 1;
          }
          this.myWidth = this.A_Data * xxx;
          return this.myWidth;
        }
      },
      myColor() {
        if (this.$store.getters["timeBank/getStatus"](this.nameAB) == 1) {
          return "rgb(0,255,9)";
        } else {
          return "lightgray";
        }
      },
      myColor3() {
        if (this.$store.getters["timeBank/getStatus"](this.nameAB) == 1) {
          switch (true) {
            case this.A_Data < 5:
              return "deeppink";
              break;
            case this.A_Data < 15:
              // return 'darkorange';
              return "pink";
              break;
            case this.A_Data < 30:
              return "rgba(255, 215, 0,0.9)";
              break;
            default:
              return "lightgray";
          }
        } else {
          return "lightgray";
        }
      },
      myColorCircle() {
        let NowData = this.myStrokeDashOffset2;
        switch (true) {
          case NowData >= 75 && NowData < 85:
            return "yellow";
            break;
          case NowData >= 85 && NowData < 95:
            return "pink";
            break;
          case NowData >= 95:
            return "deeppink";
            break;
          default:
            return "gray";
        }
      },
      myColorCircle2() {
        let NowData2 = this.myStrokeDashOffset2;
        switch (true) {
          case NowData2 < 100:
            return "rgb(0,255,0)";
            break;
          case NowData2 >= 100:
            return "black";
            break;
          default:
            return "lightgray";
        }
      },
  
      Beki() {
        console.log("入りましたよ");
        let NowChinchoku = Math.round(this.getCountData - this.calc_BekiKaisu);
        //  let NowChinchoku = this.ShinchokuDai2;
        switch (true) {
          case NowChinchoku < -20:
            return {
              color: "red",
              background: "black",
            };
            break;
          case NowChinchoku >= -20 && NowChinchoku < -5:
            return {
              color: "white",
              background: "red",
            };
            break;
          case NowChinchoku >= -5 && NowChinchoku < -3:
            return {
              color: "black",
              background: "yellow",
            };
            break;
          case NowChinchoku >= -3 && NowChinchoku < 0:
            return {
              color: "pink",
              background: "white",
            };
            break;
          case NowChinchoku >= 0 && NowChinchoku < 1:
            return {
              color: "gray",
              background: "white",
            };
            break;
          case NowChinchoku >= 1 && NowChinchoku < 3:
            return {
              color: "blue",
              background: "white",
            };
            break;
          case NowChinchoku >= 3 && NowChinchoku < 7:
            return {
              color: "gray",
              background: "aqua",
            };
            break;
          case NowChinchoku >= 7 && NowChinchoku < 20:
            return {
              color: "white",
              background: "blue",
            };
            break;
          case NowChinchoku >= 21:
            return {
              color: "#ff1493",
              background: "blue",
            };
            break;
          default:
          //=============================
          //======================================
        }
      },
      Beki2() {
        let Shinchoku =
          this.getCycleTimeByouArry - this.getStopWatchSecondsArryJust;
  
        switch (true) {
          case Shinchoku < -0:
            return {
              color: "white",
              background: "red",
              // fontSize: "30px",
            };
            break;
          // case Shinchoku >= -20 && Shinchoku < -5:
          //     return{
          //       color:"white",
          //       background:"red"
          //     }
          //     break;
          // case Shinchoku >= -5 && Shinchoku < -3:
          //     return{
          //       color:"black",
          //       background:"yellow"
          //     }
          //     break;
          // case Shinchoku >= -3 && Shinchoku < 0 :
          //     return{
          //       color:"pink",
          //       background:"white"
          //     }
          //     break;
          // case Shinchoku >= 0 && Shinchoku < 1 :
          //     return{
          //       color:"blue",
          //       background:"white"
          //     }
          //     break;
          // case Shinchoku >= 1 && Shinchoku < 3 :
          //     return{
          //       color:"gray",
          //       background:"white"
          //     }
          //     break;
          // case Shinchoku >= 3 && Shinchoku < 7 :
          //     return{
          //       color:"gray",
          //       background:"aqua"
          //     }
          //     break;
          // case Shinchoku >= 7 && Shinchoku < 20 :
          //     return{
          //       color:"white",
          //       background:"blue"
          //     }
          //     break;
          // case Shinchoku >= 21:
          //     return{
          //       color:"#ff1493",
          //       background:"blue"
          //     }
          //     break;
          default:
            //=============================
            return {
              color: "blue",
              background: "white",
              // fontSize: "30px",
            };
            break;
          //======================================
        }
      },
      nowBeki3() {
        let NowChinchoku = this.ShinchokuDai2;
  
        switch (true) {
          case NowChinchoku < -20:
            return {
              color: "red",
              background: "black",
            };
            break;
          case NowChinchoku >= -20 && NowChinchoku < -5:
            return {
              color: "white",
              background: "red",
            };
            break;
          case NowChinchoku >= -5 && NowChinchoku < -3:
            return {
              color: "black",
              background: "yellow",
            };
            break;
          case NowChinchoku >= -3 && NowChinchoku < 0:
            return {
              color: "pink",
              background: "white",
            };
            break;
          case NowChinchoku >= 0 && NowChinchoku < 1:
            return {
              color: "gray",
              background: "white",
            };
            break;
          case NowChinchoku >= 1 && NowChinchoku < 3:
            return {
              color: "blue",
              background: "white",
            };
            break;
          case NowChinchoku >= 3 && NowChinchoku < 7:
            return {
              color: "gray",
              background: "aqua",
            };
            break;
          case NowChinchoku >= 7 && NowChinchoku < 20:
            return {
              color: "white",
              background: "blue",
            };
            break;
          case NowChinchoku >= 21:
            return {
              color: "#ff1493",
              background: "blue",
            };
            break;
          default:
          //=============================
          //======================================
        }
      },
      CycleTimeNokori() {
        // return this.$store.getters["timeBank/getStopWatchArraySinceStart"](this.nameAB)[1];
        return this.$store.getters["timeBank/getStopWatchArraySinceStart"](
          this.nameAB
        );
        // a = this.$store.getters["timeBank/getCycleTimeByouArry"](this.nameAB);
        // b = this.$store.getters["timeBank/getStopWatchSecondsArry"](this.nameAB);
        // b = this.$store.getters["timeBank/getSensingTimeStart"](this.nameAB);
        // return a-b;
      },
      // getSensingTimeStart(){
      //   return this.$store.getters['timeBank/getSensingTime'](this.nameAB)
      // },
      image_src() {
        try {
          return require("~/assets/img/" + this.nameAB + ".jpg");
        } catch {
          // return ""
        }
      },
      getCycleTimeByouArry: function () {
        return this.$store.getters["timeBank/getCycleTimeByouArry"](this.nameAB);
      },
      // getcycleTimeDoughnut:function(){
  
      //   return this.$store.getters["timeBank/getcycleTimeDoughnut"](this.nameAB);
      // },
      getCycleTimeByouArryString: function () {
        //下記4行を追加。こんなところに入れるのはおかしい気もするが、許して！！2022/2/11 AY
        this.NowTantousha = this.$store.getters["timeBank/getTantoushaArry"](
          this.nameAB
        );
        this.NowBikou = this.$store.getters["timeBank/getBikouArry"](this.nameAB);
  
        this.KeikakuDai = this.$store.getters["timeBank/getKeikakuDaiArry"](
          this.nameAB
        );
        if (Number(this.KeikakuDai) > 0) {
          this.checkBox = true;
        }
        this.ZangyouJikan = this.$store.getters["timeBank/getZangyouJikanArry"](
          this.nameAB
        );
  
        let m = Math.floor(
          this.$store.getters["timeBank/getCycleTimeByouArry"](this.nameAB) / 60
        );
        let s =
          this.$store.getters["timeBank/getCycleTimeByouArry"](this.nameAB) % 60;
        let s_String = s.toString().padStart(2, "0");
        return `${m}分${s_String}秒`;
        // S.toString().padStart(2, "0") + "秒"
        // return this.$store.getters["timeBank/getCycleTimeByouArry"](this.nameAB);
      },
      calc_BekiKaisu: function () {
        return (
          Math.round(
            (this.getProgressSeconds / this.getCycleTimeByouArry) * 100
          ) / 100
        );
      },
      calc_ShinChokuKaisu2: function () {
        //普通computedに引数を渡すことはできませんが、返り値を関数にして、そこに引数を書けば渡すことができます。
        return function (isV) {
          let TounyuKousu = 470 * 60 + this.ZangyouJikan * 3600; //投入工数秒
          // console.log("@@@@"+TounyuKousu);
          let BekiKousuByou =  Math.floor(TounyuKousu / Number(this.KeikakuDai));
          //ここで、秒を分秒に変換する(main.jsから移植)
          // JikanHenkan:function(NowSeconds){
            let m = Math.floor(BekiKousuByou / 60);
            let s = "00" + String(BekiKousuByou % 60);
            
            this.nowTT =  `${m}分${s.slice(-2)}秒`
          // },
  
          // console.log(BekiKousuByou);
          let GenzaiBekiDai = Math.round(this.getProgressSeconds / BekiKousuByou);
          let ShinchokuDai = this.getCountData - GenzaiBekiDai;
          console.log(this.nameAB+"現在のべき台数は、"+GenzaiBekiDai+"ShinchokuDaiは"+ShinchokuDai);
          this.ShinchokuDai2 = this.getCountData - GenzaiBekiDai;
          console.log(this.nameAB+"No2.現在のべき台数は、"+GenzaiBekiDai+"ShinchokuDaiは"+this.ShinchokuDai2);
          // let calc_result = Math.round(this.getCountData - this.KeikakuDai);
  
          if (isV) {
            console.log("前半、this.ShinchokuDai2->"+this.ShinchokuDai2)
            //Valur数値の場合
            return ShinchokuDai;
          } else {
             console.log("!!!後半、this.ShinchokuDai2->"+this.ShinchokuDai2)
            //文字列の場合
            if (ShinchokuDai < 0) {
              return `▲${Math.abs(ShinchokuDai)}`;
            } else if (ShinchokuDai == 0) {
              return `±${Math.abs(ShinchokuDai)}`;
            } else {
              return `+${ShinchokuDai}`;
            }
          }
        };
      },
      calc_ShinChokuKaisu: function () {
        //普通computedに引数を渡すことはできませんが、返り値を関数にして、そこに引数を書けば渡すことができます。
        return function (isV) {
          let calc_result = Math.round(this.getCountData - this.calc_BekiKaisu);
  
          if (isV) {
            //Valur数値の場合
            return calc_result;
          } else {
            //文字列の場合
            if (calc_result < 0) {
              return `▲${Math.abs(calc_result)}`;
            } else if (calc_result == 0) {
              return `±${Math.abs(calc_result)}`;
            } else {
              return `+${calc_result}`;
            }
          }
        };
      },
      calc_BekiDouRitsu: function () {
        let calc_result = Math.round(
          (this.getCountData / this.calc_BekiKaisu) * 100
        );
  
        return calc_result;
      },
  
      getCurrentTarget: function () {
        return this.$store.getters["timeBank/getCurrentTarget"](this.nameAB);
      },
      getCycleArray: function () {
        return this.$store.getters["timeBank/ getCycleArray"](this.nameAB);
      },
      getProgressSeconds: function () {
        return this.$store.getters["timeBank/getProgressSeconds"];
      },
      getSensingStTime() {
        return this.$store.getters["timeBank/getSensingStTime"](this.nameAB);
      },
  
      getStopWatchSecondsArray() {
        return this.$store.getters["timeBank/getStopWatchSecondsArray"](
          this.nameAB
        );
      },
  
      getStatusData() {
        return this.$store.getters["timeBank/getStatus"](this.nameAB);
      },
  
      //機械の稼働時間秒数
      //運転中は時間が加算されるようにして、稼働率を正確に把握する
      //マシンアワーの長いものでは特に有効となる
      getTimeData() {
        let RunningTime = 0;
        if (this.$store.getters["timeBank/getStatus"](this.nameAB) == 1) {
          RunningTime = this.$store.getters["timeBank/getStopWatchSecondsArray"](
            this.nameAB
          );
        } else {
          RunningTime = 0;
        }
        let CycleTimeTotal = this.$store.getters["timeBank/getCycleArray"](
          this.nameAB
        );
        return CycleTimeTotal + RunningTime;
      },
  
      getTimeDataMS() {
        let M = Math.floor(this.getTimeData / 60);
        let S = this.getTimeData % 60;
  
        return M + "分" + S.toString().padStart(2, "0") + "秒";
      },
  
      calcMachineRate() {
        //機械の現在稼働率
        let UntenSeconds = this.getTimeData;
        let KadouSeconds = this.$store.getters["timeBank/getProgressSeconds"];
  
        return (((UntenSeconds / KadouSeconds) * 10000) / 100).toFixed(1);
      },
      calcMachineRateDDR() {
        //段取り時間の率
        let DandoriSeconds = this.$store.getters["timeBank/getCycleArrayDDR"](
          this.nameAB
        );
        let KadouSeconds = this.$store.getters["timeBank/getProgressSeconds"];
        // return (Math.round((UntenSeconds/KadouSeconds)*100000))/10000
        return (((DandoriSeconds / KadouSeconds) * 10000) / 100).toFixed(1);
      },
  
      getTimeDataErr_generateMS() {
        //機械のエラー時間秒数
        let M = Math.floor(
          this.$store.getters["timeBank/getCycleArrayErr"](this.nameAB) / 60
        );
        let S =
          this.$store.getters["timeBank/getCycleArrayErr"](this.nameAB) % 60;
  
        return M + "分" + S.toString().padStart(2, "0") + "秒";
      },
      getTimeDataDDR_generateMS() {
        //機械の段取り時間秒数
        let M = Math.floor(
          this.$store.getters["timeBank/getCycleArrayDDR"](this.nameAB) / 60
        );
        let S =
          this.$store.getters["timeBank/getCycleArrayDDR"](this.nameAB) % 60;
  
        return M + "分" + S.toString().padStart(2, "0") + "秒";
      },
  
      getCountData() {
        return this.$store.getters["timeBank/getCycleCounterData"](this.nameAB);
      },
  
      aaa() {
        return (
          Math.round(this.getCountData * (3600 / this.getProgressSeconds) * 10) /
          10
        );
      },
  
      getCountErrData() {
        return this.$store.getters["timeBank/getCycleCounterDataErr"](
          this.nameAB
        );
      },
      getCycleCounterDataDDR() {
        return this.$store.getters["timeBank/getCycleCounterDataDDR"](
          this.nameAB
        );
      },
  
      getNowMachineHour() {
        return this.$store.getters["timeBank/getNowMachineHour"](this.nameAB);
      },
      getNowDacchaku() {
        return this.$store.getters["timeBank/getNowDacchaku"](this.nameAB);
      },
      getNowDandori() {
        return this.$store.getters["timeBank/getNowDandori"](this.nameAB);
      },
    },
  
    methods: {
      btn: function () {
        alert(this.getStopWatchSecondsArryJust);
      },
      JikanHenkan: function (NowSeconds) {
        let m = 0;
        let s = 0;
        if (NowSeconds > 0) {
          //処理のタイミングにより数秒マイナスになってしまうときの表示の適切化 2021/8/25
          m = Math.floor(NowSeconds / 60);
          s = "00" + String(NowSeconds % 60);
          return `${m}分${s.slice(-2)}秒`;
        } else {
          m = Math.abs(Math.ceil(NowSeconds / 60));
          s = "00" + String(Math.abs(NowSeconds) % 60);
          return `▲${m}分${s.slice(-2)}秒`;
        }
      },
  
      redirect: function () {
        this.$router.push("/next?pageName=" + this.name);
      },
    },
  };
  </script>
  