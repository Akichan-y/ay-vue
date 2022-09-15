import Vue from 'vue'
import Vuex from 'vuex'


export default function (context) {
  
    
  console.log('ミドルウェア');
  let machinesRensou= {};
  let machines=[];
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

        
        machinesRensou[doc.id]=[doc.data()];
        // this.machinesRensou[doc.id]=[doc.data()];
        
        // console.log(this.machinesRensou[doc.id])
        this.machines.push(
          Object.assign({
            machine:doc.id,
          },doc.data())
        );
        // this.$store.commit('crud/addUser', payload)
        let ctByou = Number(doc.data().CTm)*60 + Number(doc.data().CTs);
        this.$store.commit('timeBank/CycleTimeByouArrySet',{TgtMachine:doc.id,CycleTimeByou:ctByou,Bikou:doc.data().bikou,Tantousha:doc.data().tantousha,KeikakuDai:doc.data().KeikakuDai,ZangyouJikan:doc.data().ZangyouJikan}); 

    });
    // console.log(this.machines);
    // console.log(this.machines);
    // console.log(this.machinesRensou);
    // console.log(this.machinesRensou["LN034"][0]["bikou"]);
  });


}
      // const CrtTgt = this.$fire.database.ref('CurrentTarget/') //現在加工中の部品を定義している
      // const THR_Value = this.$fire.database.ref('tmp_hum_pre') //温度、湿度、気圧の各データ

   
   
      // THR_Value.on('value', (snapshot) => {
      //   let THR_Value_Data = snapshot.val();
      //   this.NowHum = (Math.round(THR_Value_Data.hum));
      //   this.NowPre = (Math.round(THR_Value_Data.pre));
      //   this.NowTmp = (Math.round(THR_Value_Data.tmp*10)/10);
      //   this.NowEnvTime = new Date(Number(THR_Value_Data.recordTime));

      //   this.$store.commit('Env/EnvSet',{TgtEnv:"Tem",TgtVal:Math.round(THR_Value_Data.tmp*10)/10})
      //   this.$store.commit('Env/EnvSet',{TgtEnv:"Hum",TgtVal:Math.round(THR_Value_Data.hum)})
      //   this.$store.commit('Env/EnvSet', { TgtEnv: "Pre", TgtVal: Math.round(THR_Value_Data.pre) })
        


      //   this.$store.commit('Env/EnvSet',
      //     { TgtEnv: "EnvTime", TgtVal: new Date(Number(THR_Value_Data.recordTime))})
      // });

      //       CrtTgt.on('value',(snapshot)=>{
      //   let CrtTgt_data = snapshot.val(); 
      //   for(let i in CrtTgt_data){
      //     let TgtData = CrtTgt_data[i];
      //     let KishuHinmeiKijunsu = TgtData.zuban1 + TgtData.hinmei +"  "+ String(TgtData.kijunsu)+"ｹ";
      //     this.$store.commit('timeBank/CurrentTargetUD',{TgtMachine:TgtData.machine,TgtValue:KishuHinmeiKijunsu});
      //   }
      // });