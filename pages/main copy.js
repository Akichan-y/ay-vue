import Vue from 'vue'
import Vuex from 'vuex'
import compMachineHP from '~/components/compMachineHP.vue';

// Vuexの使用を宣言
Vue.use(Vuex);


// import firebase from 'firebase';
// const db = this.$fire.firestore();

export default {
  data(){
    return{
      mydate: new Date().toISOString().substr(0, 10),
      secondsValue:0,
      secondsValueStart:0,  
      message:"CoM_Method",

      Nishio:true,
      NishioHP:true,
      Fukushima:false,


      TimeIncrease:[0,0],
      machinesRensou: {},
      excludeSetTime : [],
    }
  },
  components:{
    compMachineHP,
  },
  mounted(){
    //UTC時間との差分を算出する関数を使って、環境に依存することなく日本時間をセットする。
    let mydate_init = new Date(Date.now() + ((new Date().getTimezoneOffset() + (9 * 60)) * 60 * 1000));
    this.mydate = `${mydate_init.getFullYear()}-${mydate_init.getMonth()+1}-${mydate_init.getDate()}`;
    // this.initData();
    this.FireStoreGet(); //FireStoreにある、機械ごとのイニシャルデータ
    this.excludeSet(); //休憩時間等の節目時間をセットする
    this.fillData();
  },
  computed: {
    getTest(){
      // return console.log(this.$store.getters['timeBank/getmachineHourCutArry']("MC031"))
      // return console.log(this.$store.getters['timeBank/getmachineHourCutArry'](tgtMachine))
    },
    getStatusData() {
      return this.$store.getters["timeBank/getStatus"](this.nameAB);
    },
    // getKeikaJikanByou:function(){
    getProgressSeconds:function(){
      // return this.$store.getters['timeBank/getKeikaJikan'];
      return this.$store.getters["timeBank/getProgressSeconds"]
      // return "1023"
    },
    // getSpark(){
      //   return this.$store.getters['timeBank/getSpark']
      // },
      getNow:function(){
        // let nowVthis = nowV.getUTCHours()+':'+nowV.getUTCMinutes()+':' + nowV.getUTCSeconds()
        // return 
  
        let Tgt = new Date();
        Tgt = this.$store.getters['getNow'];
        // let Tgt1 = Tgt.getUTCHours()+':'+Tgt.getUTCMinutes()+':' + Tgt.getUTCSeconds();
      
        return Tgt
      },
    getGenzaiJikan(){
      //現在までの経過時間（投入工数）
      return this.$store.getters["timeBank/getKeikaJikanByou"]
    },

    getCA(){
      return this.$store.getters['timeBank/getCycleArray2']
    },
    getCA2(){
      return this.$store.getters['timeBank/getCycleArray']
    },
    reverseItems() {
        // return this.items.slice().reverse();
        return this.data_Teishi_Title.slice().reverse().splice(0,7); 逆順にして最後の7つを表示させる
    },
    RDS(){
      return this.data_sample;
    },
    GetD(){
      return this.$store.getters['counter/counter']
      // return this.$store.getters['timeBank/getD']
      // return this.$store.getters['timeBank/getTest']
    },
    getKadouJikanVuex(){
      return this.$store.getters['getKadouJikan']
    },
    getKeikaJikan(){
      return this.$store.getters['timeBank/getKeikaJikan']
    },
    getmachineHourCut(){
      return this.$store.getters['timeBank/getmachineHourCutArry']
    },
    Kadouritst(){
      return `【マシン稼働率${Math.round(this.$store.getters['getKadouJikan'] / this.$store.getters['timeBank/getKeikaJikanByou'] * 1000)/10}％】`
    }
  },
  methods:{
    cycleTimeArrayUD(){
      this.$store.commit('timeBank/cycleTimeArrayUD',{machineCode:"LN034",timeDeff:345})
    },
    cyclesArrayUD(){
      this.$store.commit('timeBank/cyclesArrayUD',"LN034")
    },
    statusArryUD(){
      this.$store.commit('timeBank/statusArryUD',"LN034")
    },
    cycleCounterUD(){
      this.$store.commit('timeBank/cycleCounterUD',"MC027")
    },


    fillData(){

        this.fire();

    },
    getRandomInt () {
      return Math.floor(Math.random() * (50 - 5 + 1)) + 5
    },
    fireStoreAdd:function(TgtDEnd,TgtMachine,TimeDeff,Tantou){
      //FireStoreの接続テストー＞成功
      // const fireStoreDB = this.$fire.firestore();
      // const fireStoreDB = firebase.firestore();
      this.$fire.firestore.collection("SeisanNippou").add({
        Date:TgtDEnd,
        Machine: TgtMachine,
        Time:TimeDeff,
        tantou:Tantou
      })
      .then((docRef) => {
          console.log("Document written with ID: ", docRef.id);
      })
      .catch((error) => {
          console.error("Error adding document: ", error);
      });
    },
    fire:function(){
      // console.clear;
      // console.log('fire!');
      // console.log('fire!2');
      //====================================================================
      //昨日（2020/11/26）のIoT研究会にて小田中くんからリソース節約のアドバイス!!
      //データ参照範囲をクエリーっぽく指定しないと、アクセス量が増大！
      //データ件数や参照する端末（ユーザー）が増えてくると、要注意！！

      //new Date()が冗長で、変数名が乱暴な記述ではあるが、、、下記の通り、
      //スタート時間でソートを掛けた上で、本日の0時0分0秒から、23時59分59秒を対象とする。
      // let d2 = new Date();
      // let d2 = new Date(2021,4,19);
      let d2 = new Date(this.mydate);
      // console.log("現在の日時は❐❐❐❐❐❐❐❐❐❐❐❐❐❐❐❐❐❐❐❐❐❐❐❐❐❐");
      // console.clear(d2);
      // let d2 = new Date(this.mydate);
      // let d2 = new Date(2021,2,24);
      let y2 = d2.getFullYear();
      let m2 = d2.getMonth();
      let d3 = d2.getDate();
      let startD = new Date(y2,m2,d3,7,0,0);
      let endD = new Date(y2,m2,d3,23,59,59);
      let startTimestamp = String(Date.parse(startD));
      let endTimestamp = String(Date.parse(endD));
      // console.log("日付セットスタート" + endTimestamp);
      // console.log("日付セットスタート" + startD);
      // console.log("日付セットスタート" + endD);

      // const database = firebase.database();
      // const fireStoreDB = firebase.firestore();

      const CrtTgt = this.$fire.database.ref('CurrentTarget/') //現在加工中の部品を定義している

      CrtTgt.on('value',(snapshot)=>{
        // this.$fire.database.on('value',(snapshot)=>{
        let CrtTgt_data = snapshot.val(); 
        for(let i in CrtTgt_data){
          let TgtData = CrtTgt_data[i];
          let KishuHinmeiKijunsu = TgtData.zuban1 + TgtData.hinmei +"  "+ String(TgtData.kijunsu)+"ｹ";
          this.$store.commit('timeBank/CurrentTargetUD',{TgtMachine:TgtData.machine,TgtValue:KishuHinmeiKijunsu});
        }
      });

      //startTime は初期値９９９を代入していたので、初回が反応していなかったというミス endTimeにしたことで解決。
      
      // const esp = database.ref('NishioMachineCT/')
      const esp = this.$fire.database.ref('NishioMachineCT/')
                  .orderByChild('endTime').startAt(startTimestamp).endAt(endTimestamp); 
      //====================================================================
      esp.on('value',(snapshot)=>{

            this.initData();  //--->Vuex timeBankのデータを初期化
            // this.FireStoreSet();
            //============================================================
            let data = snapshot.val();  
            for(let i in data){
            
              let person = data[i];
              // console.log(person);
              
              let TgtDEnd=new Date(Number(person.endTime)); // センシング終了時刻
              
              
              let TgtDStart=new Date(Number(person.startTime)); // センシング開始時刻
              
              if(TgtDStart<new Date(2020,12,31)){
                TgtDStart = TgtDEnd
              };


              //共通のセンシング時間・・・次回以降は、この時間以降をon する 21/6/8追加
            
              let TgtYYYY=String(TgtDEnd.getFullYear());
              let TgtMM=String(TgtDEnd.getMonth()+1);
              let TgtDD=String(TgtDEnd.getDate());
              let TgtH=String(TgtDEnd.getHours());
              let TgtM=String(TgtDEnd.getMinutes());
              let TgtS=String(TgtDEnd.getSeconds());
              // let TgtYYYYMMDD_Org = TgtYYYY + TgtMM + TgtDD ;
              // let TgtYYYYMMDD_Org_HMS = 
              //                           `${TgtMM} 月 
              //                           ${this.zeroPadding(TgtDD,2)}日 
              //                           ${this.zeroPadding(TgtH,2)}時 
              //                           ${this.zeroPadding(TgtM,2)}分 
              //                           ${this.zeroPadding(TgtS,2)}秒 `;
              let Tgt_HMS = 
                                        `${this.zeroPadding(TgtH,2)}: 
                                        ${this.zeroPadding(TgtM,2)}: 
                                        ${this.zeroPadding(TgtS,2)} `;
              // let Org_HMS = 
              //               `${this.zeroPadding(TgtH,2)}時${this.zeroPadding(TgtM,2)}分${this.zeroPadding(TgtS,2)}秒 `;
              // if(nowYYYYMMDD == TgtYYYYMMDD_Org){   
                let TgtYYYYstart=String(TgtDStart.getFullYear());
                let TgtMMstart=String(TgtDStart.getMonth()+1);
                let TgtDDStart=String(TgtDStart.getDate());
                let TgtHStart=String(TgtDStart.getHours());
                let TgtMStart=String(TgtDStart.getMinutes());
                let TgtSStart=String(TgtDStart.getSeconds());
                let Tgt_HMS_Start = `(Start=)${TgtYYYYstart}年${TgtMMstart}月${TgtDDStart}日${TgtHStart}時${TgtMStart}分${TgtSStart}秒`
                //StarとEndの差分 ミリSEcondsを除外した時間
                let TimeDeff = (Number(person.endTime) - Number(person.startTime))/1000
                
                //スタートが1970になってしまっている場合の回避
                //メチャクチャな稼働率になるよりはマシ。
                //次回作では、原因を追求すべし！
                if(TimeDeff>30000){  
                  TimeDeff=0;
                }


               

                let timeElapsed = new Date(TgtDEnd-TgtDStart);
                // let hour = this.zeroPadding(timeElapsed.getUTCHours(),2);
                // let min = this.zeroPadding(timeElapsed.getUTCMinutes(),2);
                // let sec = timeElapsed.getUTCSeconds();
                // let ms = this.zeroPadding(timeElapsed.getUTCMilliseconds(),3);


                const TgtMachine=person.machine;

                  this.TimeIncrease[Number(person.Status)-1] += TimeDeff;

                  //   //センサーの状況を読み取るDoswitch================================

                  this.DoSwitch(person.status,TgtMachine,TimeDeff,TgtHStart,TgtH,TgtDStart,TgtDEnd,Tgt_HMS);

                  // if(TgtMachine=="MC031"){
                  //   console.log(TgtMachine + "ステータスは"+person.status+"--------------"+TgtDStart);
                  // }
              
                  //==============================================================
                  //store.timeBankのセンシング時間・・・本プログラムの反応時刻数値
                  this.$store.commit('timeBank/sensingTimeArryUD',{machineCode:TgtMachine,sensingStartTime:TgtDStart,sensingEndTime:TgtDEnd,JustSensingTime:Date.now()}); 

                  //store.timeBankのセンシング時間・テキスト形式
                  this.$store.commit('timeBank/sensingTimeStArryUD',{machineCode:TgtMachine,sensingTime:Tgt_HMS}); 
    
                let TgtYYYYMMDD= TgtYYYY+TgtMM+TgtDD+'  '+ TgtH+'時'+TgtM+'分'+TgtS+'秒';       
                // let nowStatus =  person.SP_Line_Status
                let nowStatus =  person.status
                
                this.lastS = nowStatus;
                this.lastD = TgtYYYYMMDD;
              }; //forループの終わり
              
          this.timeBegan = new Date();
          this.started = setInterval(this.keikaJikan, 1000);
      });

      //2021夏　実験中・・・setで取得した現在のステータスを取得する============================================
      // const PresentData = this.$fire.database.ref('PresentData/');
      
      // PresentData.on('value',(snapshot)=>{
      //   let P_Data = snapshot.val();
      //   console.log(P_Data);
      //   for(let i in P_Data){
      //     let JustNowData = P_Data[i];
      //     console.log(i);
      //     console.log(JustNowData);
      //   }
      // });
      //===========================================
    

    },
    FireStoreGet(){
      this.machines=[];
      let machines2=[];
      this.$fire.firestore.collection("machines")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            // console.log(`${doc.id} => ${doc.data().CTs}`);
            // この記述がわからずに、なかなか苦労した。以下を参考に解決
            // https://nekorokkekun.hatenablog.com/entry/2019/09/25/114448
            // console.log(doc.id);
            // console.log(doc.id.machine);
            this.machinesRensou[doc.id]=[doc.data()];
            // console.log(this.machinesRensou[doc.id])
            this.machines.push(
              Object.assign({
                machine:doc.id,
              },doc.data())
            );
            // this.$store.commit('crud/addUser', payload)
            let ctByou = Number(doc.data().CTm)*60 + Number(doc.data().CTs);
            this.$store.commit('timeBank/CycleTimeByouArrySet',{TgtMachine:doc.id,CycleTimeByou:ctByou}); 

        });
        // console.log(this.machines);
        // console.log(this.machines);
        // console.log(this.machinesRensou);
        // console.log(this.machinesRensou["LN034"][0]["bikou"]);
      });
    
    },
  //リセット部分を移動==========================================
  initData:function(){
    
      //Vuexのデータをリセットする=================================
        //考え方は、毎回リセットをかけて１から全計算する。
        // console.log("initialize!");
        for (let machine of Object.keys(this.$store.getters['timeBank/getStatusFull'])) {
          // for (let machine of Object.keys(this.$store.getters['timeBank/getStopWatchArrayPrimitive'])) {
            this.$store.commit('timeBank/cycleTimeArrayUD',machine);
            this.$store.commit('timeBank/cycleCounterRst',machine);
            this.$store.commit('timeBank/cycleCounterErrRst',machine);
            this.$store.commit('timeBank/cycleCounterDDRRst',machine);
            this.$store.commit('timeBank/cycleTimeArrayRst',machine);
            this.$store.commit('timeBank/cycleTimeArrayErrRst',machine);
            this.$store.commit('timeBank/cycleTimeArrayDDRRst',machine);
            this.$store.commit('timeBank/cycleTimeArrayKKTRst',machine);
            this.$store.commit('timeBank/cycleTimeArrayMaijiRst',machine);
          }
          //============================================================
          this.standArry = this.$store.getters["timeBank/getStatusFull"];
    
          // Object.keys(this.standArry).forEach(key => 
            
          //   // this.$store.commit("timeBank/machineHourArryUD",{machineCode:key,machineHour:0}), 
          //   this.$store.commit("timeBank/machineHourArryUD",{current_state:0,machineCode:key,machineHour:0}), 
          // );
          Object.keys(this.standArry).forEach(key => 
            this.$store.commit("timeBank/StopWatchSinceStartRST",{machineCode:key,machineHour:0}), 
          );
          Object.keys(this.standArry).forEach(key => 
            this.$store.commit("timeBank/machineHourCutArryUD",{machineCode:key,machineHour:0}), 
          );
          Object.keys(this.standArry).forEach(key => 
            this.$store.commit("timeBank/cycleCounterUD",{machineCode:key,first:true}), //trueの場合は、
          );
          Object.keys(this.standArry).forEach(key => 
            this.$store.commit("timeBank/cycleCounterErrUD",{machineCode:key,first:true}), //trueの場合は、
          );
          Object.keys(this.standArry).forEach(key => 
            this.$store.commit("timeBank/cycleCounterDDRUD",{machineCode:key,first:true}), //trueの場合は、
          );
          Object.keys(this.standArry).forEach(key => 
            this.$store.commit("timeBank/cycleTimeArrayRst",{machineCode:key}), //trueの場合は、
          );
          Object.keys(this.standArry).forEach(key => 
            this.$store.commit("timeBank/cycleTimeArrayErrRst",{machineCode:key}), //trueの場合は、
          );
          Object.keys(this.standArry).forEach(key => 
            this.$store.commit("timeBank/cycleTimeArrayDDRRst",{machineCode:key}), //trueの場合は、
          );
          Object.keys(this.standArry).forEach(key => 
            this.$store.commit("timeBank/cycleTimeArrayKKTRst",{machineCode:key}), //trueの場合は、
          );


          this.lastD=0;
          this.count = 0;
          this.dataCount = 0;
          //============================================================

          
  },
  DoSwitch:function(nowStatus,TgtMachine,TimeDeff,TgtHStart,TgtH,TgtDStart,TgtDEnd,Tgt_HMS){
      //センサーの状況を読み取るswitch================================
      switch(nowStatus){
        case 'RUN1'://正常運転のスタート

            // console.log("RUN1RUN1RUN1");
            if(TimeDeff > 2 ){ //2秒以下のチャタリングのようなデータを排除する
              this.dataCount++;
              //store.timeBankのステータス状況をセットする（１は運転中）
              this.$store.commit('timeBank/statusArryUD',{machineCode:TgtMachine,statusBool:1});
              
              //store.timeBankのカウンター連想配列をアップ
              this.$store.commit('timeBank/cycleCounterUD',{machineCode:TgtMachine,first:false});

              //連想配列の配列に変更 0=マシンアワー、1=脱着時間、2=段取り時間
              this.$store.commit('timeBank/machineHourArryUD',{current_state:1,machineCode:TgtMachine,machineHour:TimeDeff});
              
              this.MaijiArrayVuexSet(TgtHStart,TgtH,TgtDStart,TgtDEnd,TgtMachine,TimeDeff,4,'timeBank/cycleTimeArrayMaijiUD');

              this.$store.commit('timeBank/sensingTimeArryJustOnlyUD',{machineCode:TgtMachine,JustSensingTime:new Date()})
            };

            break;
        case 'RUN2': //正常運転の停止
            //store.timeBankのステータス状況をセットする(0は停止)

            //予め現在のステータスが運転中であることを確認する。チャタリング防止策からの重複になることを避ける為
            if(this.$store.getters['timeBank/getStatus'](TgtMachine)==1){

              this.$store.commit('timeBank/statusArryUD',{machineCode:TgtMachine,statusBool:0});
              //store.timeBankのサイクルタイム運転時間を合計していく (UD:trueは、書き換えアップデート)
              this.$store.commit('timeBank/cycleTimeArrayUD',{machineCode:TgtMachine,timeDeff:TimeDeff,UD:true});
              //機械ごとの毎時時間を算出するモジュール
              //7番目の0が運転中の時間時間（1が段取り、2が）
              this.MaijiArrayVuexSet(TgtHStart,TgtH,TgtDStart,TgtDEnd,TgtMachine,TimeDeff,0,'timeBank/cycleTimeArrayMaijiUD');
              

              //store.timeBankの直前のマシンアワーを格納する '21/3/234
              //連想配列の配列に変更 0=マシンアワー、1=脱着時間、2=段取り時間
              this.$store.commit('timeBank/machineHourArryUD',{current_state:0,machineCode:TgtMachine,machineHour:TimeDeff});
              // this.$store.commit('timeBank/machineHourArryUD',{current_state:0,machineCode:TgtMachine,machineHour:this.JikanHenkan(TimeDeff)});
              //インジケーター用マシンアワー初期値をセット '21/6/4
              this.$store.commit("timeBank/machineHourCutArryUD",{machineCode:TgtMachine,machineHour:TimeDeff});
              // console.log("初期セット値は、"+TgtMachine + "の、"+TimeDeff)


              //store.timeBankのセンシング時間・・・本プログラムの反応時刻数値
              // this.$store.commit('timeBank/sensingTimeArryUD',{machineCode:TgtMachine,sensingTime:TgtDEnd});

              this.$store.commit('timeBank/sensingTimeArryUD',{machineCode:TgtMachine,sensingStartTime:TgtDStart,sensingTime:TgtDEnd}); 
              
              //store.timeBankのセンシング時間・テキスト形式
              this.$store.commit('timeBank/sensingTimeStArryUD',{machineCode:TgtMachine,sensingTime:Tgt_HMS});
              

            };
            break;

          case 'DDR1': //段取りの開始(2は異常停止赤ランプ)
            //store.timeBankのステータス状況をセットする（１は運転中）

            if(TimeDeff > 2){ //2秒以下のチャタリングのようなデータを排除する
              this.$store.commit('timeBank/statusArryUD',{machineCode:TgtMachine,statusBool:3});          
              //段取り回数配列をカウントアップ
              this.$store.commit('timeBank/cycleCounterDDRUD',{machineCode:TgtMachine,first:false});
              this.MaijiArrayVuexSet(TgtHStart,TgtH,TgtDStart,TgtDEnd,TgtMachine,TimeDeff,4,'timeBank/cycleTimeArrayMaijiUD');

            };
            break;

          case 'DDR2': //段取りの終了
              //予め現在のステータスが段取り中であることを確認する。チャタリング防止策からの重複になることを避ける為
              if(this.$store.getters['timeBank/getStatus'](TgtMachine)==3){

                //store.timeBankのステータス状況をセットする（0は停止）
                this.$store.commit('timeBank/statusArryUD',{machineCode:TgtMachine,statusBool:0}); 
                
                //store.timeBankのサイクルタイム運転時間を合計していく
                this.$store.commit('timeBank/cycleTimeArrayDDRUD',{machineCode:TgtMachine,timeDeff:TimeDeff});
                if(TgtMachine=="GT999"){
                  console.log("チェック中" + TgtMachine + "は、" +TimeDeff)
                };
                //機械ごとの毎時時間を算出ｓモジュール
                //7番目の0が運転中の時間時間（1が段取り、2が）
                this.MaijiArrayVuexSet(TgtHStart,TgtH,TgtDStart,TgtDEnd,TgtMachine,TimeDeff,1,'timeBank/cycleTimeArrayMaijiUD');

              //連想配列の配列に変更 0=マシンアワー、1=脱着時間、2=段取り時間
              this.$store.commit('timeBank/machineHourArryUD',{current_state:2,machineCode:TgtMachine,machineHour:TimeDeff});
              // this.$store.commit('timeBank/machineHourArryUD',{current_state:2,machineCode:TgtMachine,machineHour:this.JikanHenkan(TimeDeff)});
              };
              break;
          case 'KKT1': //段取りの開始(2は異常停止赤ランプ)
            //store.timeBankのステータス状況をセットする（１は運転中）

            if(TimeDeff > 2){ //2秒以下のチャタリングのようなデータを排除する
              this.$store.commit('timeBank/statusArryUD',{machineCode:TgtMachine,statusBool:4});          
              //store.timeBankのカウンター連想配列をアップ=>計画停止ではとりあえず除外
              // this.$store.commit('timeBank/cycleCounterKKTUD',TgtMachine);

              this.MaijiArrayVuexSet(TgtHStart,TgtH,TgtDStart,TgtDEnd,TgtMachine,TimeDeff,4,'timeBank/cycleTimeArrayMaijiUD');
            };
            break;

          case 'KKT2': //段取りの終了
              //予め現在のステータスが段取り中であることを確認する。チャタリング防止策からの重複になることを避ける為
              if(this.$store.getters['timeBank/getStatus'](TgtMachine)==4){

                //store.timeBankのステータス状況をセットする（0は停止）
                this.$store.commit('timeBank/statusArryUD',{machineCode:TgtMachine,statusBool:0}); 
                
                // store.timeBankの計画停止サイクルタイム時間を合計していく
                this.$store.commit('timeBank/cycleTimeArrayKKTUD',{machineCode:TgtMachine,timeDeff:TimeDeff});

                //機械ごとの毎時時間を算出ｓモジュール
                //7番目の0が運転中の時間（1が段取り、2がエラー？、3が計画停止）
                this.MaijiArrayVuexSet(TgtHStart,TgtH,TgtDStart,TgtDEnd,TgtMachine,TimeDeff,3,'timeBank/cycleTimeArrayMaijiUD');
              };
              break;

          case 'ERR1': //異常停止の開始(2は異常停止赤ランプ)
            // if(TimeDeff > 2){ //2秒以下のチャタリングのようなデータを排除する
              //store.timeBankのステータス状況をセットする（１は運転中）
              this.$store.commit('timeBank/statusArryUD',{machineCode:TgtMachine,statusBool:2});
              
              // エラー発生回数をカウントアップ
              this.$store.commit('timeBank/cycleCounterErrUD',{machineCode:TgtMachine,first:false});
              this.MaijiArrayVuexSet(TgtHStart,TgtH,TgtDStart,TgtDEnd,TgtMachine,TimeDeff,4,'timeBank/cycleTimeArrayMaijiUD');
              break;
            // };
          case 'ERR2': //異常停止の終了
              //予め現在のステータスが異常停止中であることを確認する。チャタリング防止策からの重複になることを避ける為
              if(this.$store.getters['timeBank/getStatus'](TgtMachine)==2){
                //store.timeBankのステータス状況をセットする（0は停止）
                this.$store.commit('timeBank/statusArryUD',{machineCode:TgtMachine,statusBool:0}); 
                              
                //store.timeBankのサイクルタイム運転時間を合計していく
                this.$store.commit('timeBank/cycleTimeArrayErrUD',{machineCode:TgtMachine,timeDeff:TimeDeff});
                
                this.MaijiArrayVuexSet(TgtHStart,TgtH,TgtDStart,TgtDEnd,TgtMachine,TimeDeff,2,'timeBank/cycleTimeArrayMaijiUD');
                //機械ごとの毎時時間を算出するモジュール
                //7番目の0が運転中の時間時間（1が段取り、2が）
                // this.MaijiArrayVuexSet(TgtHStart,TgtH,TgtDStart,TgtDEnd,TgtMachine,TimeDeff,2,'timeBank/cycleTimeArrayMaijiUD');
              };  
              break;

          
          default:
              console.log("switch,一致しない");
            break;
        }
  },
  //===========================================================

MaijiArrayVuexSet:function(TgtHStart,TgtH,TgtDStart,TgtDEnd,TgtMachine,TimeDeff,nowTgtState,TgtCommit){
    //時間ごとの帯グラフ的なものをイメージしてつくったモジュールであるが、
    //グラフでの色分けがうまく出来ずに断念した。
    //2021/8/末 真杉さんよりSVGを教えてもらい、PATH で実装することに成功した！

    //機械ごと時間あたり運転時間のサイクルタイムを分解・生成する 最長１０時間まで対応===========================
    let elapsed_XX=[0,0,0,0,0,0,0,0,0,0,0]
    //機械ごと時間あたり段取り時間のサイクルタイムを分解・生成する 最長１０時間まで対応===========================
    // let elapsed_XD=[0,0,0,0,0,0,0,0,0,0,0]
    //機械ごと時間あたり異常時間のサイクルタイムを分解・生成する 最長１０時間まで対応===========================
    // let elapsed_XE=[0,0,0,0,0,0,0,0,0,0,0]

    // if(TgtMachine=="MC031"){
    //   console.log("❐ " + nowTgtState + "【"+TgtMachine+"】Startは、"+TgtDStart+"--->エンドは"+TgtDEnd);
    // }
    
    const SVG_Size = 240

    let SetGuntStart =  TgtDStart.getMinutes()*60 + TgtDStart.getSeconds();

    // if(TgtMachine=="MC031"){
    //   console.log("★★★★"+TgtMachine + "--"+TgtHStart+"--"+TgtH+"★★★★★");
    // }


    if(TgtHStart==TgtH){
        //StartとEndの時刻の時が同じ場合
        elapsed_XX[Number(TgtHStart)-7] =TimeDeff   //午前７時を配列ゼロからとする補正
                                                    //MC031などは、暖機運転が必要であり、７時代も動いている。
                                                    //正直に行こう！
        //ガントチャート
        this.$store.commit('timeBank/GuntArryPush',{GuntStart:SetGuntStart,GuntHorizon:TimeDeff,y:(TgtHStart-4)*15,NowState:nowTgtState,machine:TgtMachine});



        
    }else{
      
      let nowTgtDEndZero= new Date(TgtDEnd);             //１時間をまたいだ終了時の時刻連番を基準時刻にセット
      nowTgtDEndZero.setHours(Number(TgtHStart)+1);    //基準時刻の時を＋１の時刻にセット
      nowTgtDEndZero.setMinutes(0);            //基準時刻の分をゼロにセット
      nowTgtDEndZero.setSeconds(0);            //基準時刻の分をゼロにセット
      
      let nowDeff = new Date(nowTgtDEndZero-TgtDStart);
      let ByouHenkanMin = nowDeff.getMinutes()*60;
      let ByouHenkanSec = nowDeff.getSeconds();
      let ByouHenkan =  ByouHenkanMin + ByouHenkanSec;

      elapsed_XX[TgtHStart-8]= ByouHenkan; //第一領域(Startから次時の00分)の時間
      let finalH=Number(TgtH)-Number(TgtHStart);

      this.$store.commit('timeBank/GuntArryPush',{GuntStart:SetGuntStart,GuntHorizon:ByouHenkan,y:(TgtHStart-4)*15,NowState:nowTgtState,machine:TgtMachine});

      //第二領域(二時間以上乖離している場合の中間)の時間
      for (let i = 1; i < finalH; i++) {
        elapsed_XX[i+(Number(TgtHStart)-8)]=3600;
        this.$store.commit('timeBank/GuntArryPush',{GuntStart:0,GuntHorizon:3600,y:(i+Number(TgtHStart-4))*15,NowState:nowTgtState,machine:TgtMachine});

      }
      nowTgtDEndZero.setHours(Number(TgtH));
      //第三領域時＋１の時間を計算する
      let nowDeff3rd = new Date(TgtDEnd-nowTgtDEndZero);
      // console.log(nowDeff3rd);
      let ByouHenkanMin3rd = nowDeff3rd.getUTCMinutes()*60;
      let ByouHenkanSec3rd = nowDeff3rd.getUTCSeconds();
      let ByouHenkanSec3rd_Total = ByouHenkanMin3rd + ByouHenkanSec3rd;
      elapsed_XX[Number(TgtHStart)-8+finalH] =ByouHenkanMin3rd+ByouHenkanSec3rd; 

      this.$store.commit('timeBank/GuntArryPush',{GuntStart:0,GuntHorizon:ByouHenkanSec3rd_Total,y:(TgtH-4)*15,NowState:nowTgtState,machine:TgtMachine});
    };


    // this.$store.commit('timeBank/cycleTimeArrayMaijiUD',{
    this.$store.commit(TgtCommit,{
      machineCode:TgtMachine,
      start:TgtHStart,//スタート時間の時
      end:TgtH,       //エンド時間の時
      elapsed:elapsed_XX,
      timeDeff:TimeDeff,
      nowTgt:nowTgtState
    });
    //===================================================================================================
},
excludeSet:function(){
  for(let i =0;i < 14;i++) {   //除外時間の時間設定（休憩時間等）
    this.excludeSetTime[i] = new Date() ;
  };
  
  this.excludeSetTime[0].setHours(8,0,0);
  this.excludeSetTime[1].setHours(9,0,0);
  this.excludeSetTime[2].setHours(10,0,0);
  this.excludeSetTime[3].setHours(10,10,0);
  this.excludeSetTime[4].setHours(11,0,0);
  this.excludeSetTime[5].setHours(12,0,0);
  this.excludeSetTime[6].setHours(12,50,0);
  this.excludeSetTime[7].setHours(14,0,0);
  this.excludeSetTime[8].setHours(15,0,0);
  this.excludeSetTime[9].setHours(15,10,0);
  this.excludeSetTime[10].setHours(16,0,0);
  this.excludeSetTime[11].setHours(17,0,0);
  this.excludeSetTime[12].setHours(18,0,0);
  this.excludeSetTime[13].setHours(19,0,0);
},

keikaJikan:function(){
      // console.log(this.getSensingTimeStart);
      
      const ddd= new Date();
      const ddd2 = new Date();
      ddd2.setHours(8,0,0);

      
      switch(true){
          //現在時間によって、休憩など除外時間を計算＆セット

          //合わせて、時間あたりの稼働時間を算出する。時間をまたぐケースもあり、下記３パターンの若干複雑なロジック
          //時が同じ場合
          //時が＋１だけまたいでいる場合
          //時が＋２以上またいでいる場合
          case (ddd<this.excludeSetTime[2]): //10:より以前
            this.excludedTime = [0,0,0];
            break;
          case (ddd<this.excludeSetTime[3])://10:10より以前
            this.excludedTime = [new Date(ddd-this.excludeSetTime[2]).getMinutes(),0,0];
            break;
          case (ddd<this.excludeSetTime[5])://12:00
            // console.log("");
            this.excludedTime = [10,0,0];
            // console.log(this.excludedTime);
            break;
          case (ddd<this.excludeSetTime[6])://12:50
            this.excludedTime =[10,new Date(ddd-this.excludeSetTime[3]).getMinutes(),0]
            break;
          case (ddd<this.excludeSetTime[8])://15:00
            this.excludedTime=[10,50,0];
            break;
          case (ddd<this.excludeSetTime[9])://15:10
            this.excludedTime=[10,50,new Date(ddd-this.excludeSetTime[5]).getMinutes()];
            break;
          case (ddd<this.excludeSetTime[13])://19:00
            this.excludedTime = [10,50,10];
            break;
          case (ddd>this.excludeSetTime[13])://19:00
            this.excludedTime = [10,50,10];
            break;
          default:
            break;
          };
          //休憩時間などの除外時間を合計
          let excludedTime_Total=this.excludedTime[0]+this.excludedTime[1]+this.excludedTime[2];
          // console.log(excludedTime_Total);

      //午前８時を起点として休憩等の除外時間を覗いた正味の稼働時間（時刻連番データ）
      let shomiTime_tmp = new Date(ddd-ddd2);
      //午前８時を起点として休憩等の除外時間を覗いた正味の稼働時間（時刻連番データ）から除外時間を引いた時間
      shomiTime_tmp.setMinutes(shomiTime_tmp.getMinutes()-excludedTime_Total);
      //正味稼働時間（生データ）をtimeBankに送信する（稼働率算出の分母となる）
      this.$store.commit('timeBank/TB_Kadoujikan',shomiTime_tmp);

      let shomiTime_H2= shomiTime_tmp.getUTCHours();
      let shomiTime_M2 = shomiTime_tmp.getUTCMinutes();
      let shomiTime_S2 = shomiTime_tmp.getUTCSeconds();

      let tmp_Byou = shomiTime_H2 *3600 +shomiTime_M2 * 60 + shomiTime_S2  //秒に変換
      
      // this.KadouJikan_Byou_Test=tmp_Byou;
      //正味稼働時間（秒）をtimeBankに送信する（稼働率算出の分母となる）
      this.$store.commit("timeBank/ProgressSecondsUD",tmp_Byou);

      let shomiTimeTotal = shomiTime_H2*60 + shomiTime_M2 + (shomiTime_S2/60);

      //正味稼働時間
      this.KadouJikan = `${shomiTime_H2}:${String(shomiTime_M2).padStart(2,'0')}:${String(shomiTime_S2).padStart(2,'0')}`;

      //現在時刻のテキストデータを生成
      const dayname = ['日','月','火','水','木','金','土'];
      this.GenzaiJikan = 
      `${String(ddd.getMonth()+1)}月
      ${String(ddd.getDate())}日（
      ${String(dayname[ddd.getDay()])}）
      ${String(ddd.getHours()).padStart(2,'0')}:
       ${String(ddd.getMinutes()).padStart(2,'0')}:
       ${String(ddd.getSeconds()).padStart(2,'0')}`;

      //現在時刻のテキストデータをVuexに送信
      this.$store.commit("timeBank/genzaiJikanUD",this.GenzaiJikan);
      // console.log("▲▲▲"+this.$store.getters['timeBank/getStopWatchArrayPrimitive']);
      //forで回して、機械ごとのストップウォッチ時刻を更新する================================
      for (let machine of Object.keys(this.$store.getters['timeBank/getStopWatchArrayPrimitive'])) {
        const tgtMachine = machine;
        const tmp=this.$store.getters['timeBank/getSensingTime'](tgtMachine);
        const tmp2 = this.$store.getters['timeBank/getSensingTimeStart'](tgtMachine);
        
        //機械の起動時の時刻・・・サイクルタイム判定の基点時刻
        const tmp3=this.$store.getters['timeBank/get_sensingTimeArryJust'](tgtMachine);

        const d= new Date(Date.now()-tmp);
        const dStart = new Date(Date.now()-tmp2);
        const dJust = new Date(Date.now()-tmp3);

        //純粋な引き算のストップウォッチなので、UTC時間（世界標準で時差考慮せず）を使用する
        const h1 = d.getUTCHours();
        const m1 = d.getUTCMinutes();
        const m1x = d.getUTCHours()*60 + m1;
        const s1= d.getUTCSeconds();

        
        const h1Start = dStart.getUTCHours();
        const m1Start = dStart.getUTCMinutes();
        const m1xStart = dStart.getUTCHours()*60+ m1;
        const s1Start= dStart.getUTCSeconds();
        
        const h1Just = dJust.getUTCHours();
        const m1Just = dJust.getUTCMinutes();
        const m1xJust = dJust.getUTCHours()*60 + m1Just;
        const s1Just = dJust.getUTCSeconds();
        
        const h2 = String(h1).padStart(2,'0');
        const m2 = String(m1).padStart(2,'0');
        const m2x = String(m1x);

        const s2 = String(s1).padStart(2,'0');

        const hms = `${h2}:${m2}:${s2}`;
        const ms2 =`${m2x}分${s2}秒`; //時分秒よりも、分秒の方がわかりやすいので変更 '21/3/3
        this.secondsValue = h1*3600 + m1 * 60 + s1; //経過時間を秒で表す
        this.secondsValueStart =h1Start*3600 + m1xStart + s1Start; //経過時間を秒で表す
        this.secondsValueJust =h1Just*3600 + m1xJust*60 + s1Just; //経過時間を秒で表す
        // console.log(tgtMachine+'〇〇○〇〇○'+this.secondsValueStart);
        this.$store.commit("timeBank/StopWatchArryUD",{
          machineCode:tgtMachine,
          StopWatchTime:ms2,
          StopWatchSecondsTime:this.secondsValue,
          StopWatchSecondsTimeStart:this.secondsValueStart,
          StopWatchSecondsTimeJust:this.secondsValueJust,

        });
        
        // console.log("●●●●●●"+this.$store.getters["timeBank/getSensingTimeStart"](tgtMachine));

        
        // マシンアワー残りインジケーターの表示グラフ生成モジュール 21/4/14
      if(this.$store.getters["timeBank/getStatus"](tgtMachine)==1){

        // インジケーターの初期値として、前回のマシンアワーそのものをイニシャルセット
        // console.log("これならどうだ！"+this.$store.getters["timeBank/getmachineHourArryTgt"]);
        let LastMachineHourCut = this.$store.getters["timeBank/getmachineHourArryTgt"](tgtMachine)[0];
        // console.log(tgtMachine +"で、★★★ラスト★★★は"  + LastMachineHourCut);
        //❏❏❏❏❏❏❏❏❏❏❏❏❏❏❏❏❏❏❏❏❏❏❏❏❏❏❏❏❏❏
        let before_d = this.$store.getters["timeBank/getSensingTime"](tgtMachine);
        if(LastMachineHourCut>0){
          let Now_d = new Date();
          // Now_d.setHours()
          // Now_d.setSeconds(secondsValue)
          // Now_d.setSeconds(secondsValue)
          let elepsedTime = Now_d.getTime() - before_d.getTime();
          let mins = elepsedTime / (1000 *60);
          elepsedTime = elepsedTime % (1000*60);
          let secs = elepsedTime / 1000;
          // console.log(tgtMachine  +"の分は" + Math.floor(mins));
          // console.log(tgtMachine  +"の秒は" + Math.floor(secs));

          let sec_total = Math.floor(mins) *60 + Math.floor(secs);

          // let SecondsDeff_Total = SecondsDeff_HS + SecondsDeff_MS + SecondsDeff_S;

          // console.log("差は、" + SecondsDeff_Total + "秒");
          //イニシャルセットしてあLastMachineHourCut から経過時間を引き算していく
          let LastMachineHourCut2 = LastMachineHourCut-sec_total;
          // console.log("cutが、"+tgtMachine+"-----"+LastMachineHourCut2);
          this.$store.commit("timeBank/machineHourCutArryUD",{machineCode:tgtMachine,machineHour:LastMachineHourCut2});
          // console.log(this.$store.getters['timeBank/getmachineHourCutArry'](tgtMachine))
        }
      }
      };

    },
    JikanHenkan:function(NowSeconds){
      let m = Math.floor(NowSeconds / 60);
      let s = "00" + String(NowSeconds % 60);
      
      return `${m}'${s.slice(-2)}`
    },
    zeroPrefix:function(){
      var zero = '';
      for(var i = 0; i < digit; i++) {
        zero += '0';
      }
      return (zero + num).slice(-digit);
    },
    zeroPadding:function(num,length){
      return ('00000000' + String(num)).slice(-length);
    },

  }


}