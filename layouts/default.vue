<template>
   <v-app>
     <header>

       
      <v-app-bar :color="WBGT_Color" app>
      <!-- <v-app-bar :style="WBGT_Color" app> -->
        <!-- アプリケーションバー -->
        <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
         <v-toolbar-title v-text="title" />
          <v-spacer />
          <span :class="WBGT_Class">{{getEnvTem}}℃　</span>
          <!-- <span :class="WBGT_Class">{{index_Tem}}℃　</span> -->
          <span :class="WBGT_Class">{{getEnvHum}}%　</span>
          <!-- <span :class="WBGT_Class">【{{index_hum}}】　</span> -->
          <span  :class="WBGT_Class">{{getEnvPre}}hPa　</span>
          <!-- <span class="red--text text-h6 text--lighten-2">{{WBGT[index_Tem][index_hum]}}</span> -->
          <span :class="WBGT_Class">WBGT≒{{WBGT[index_Tem][index_hum]}}℃　</span>
          <span :class="WBGT_Class">{{WBGT_Message}}　</span>
          <!-- <span>at NishioFa_AP {{getEnvTime}}　</span> -->
          <span>at Nishio SHFLine {{EnvTimeYYMMDDhhmmss}}　</span>
          <img src="~/assets/bishamon.png" width="15%">

      </v-app-bar>
      </header>
      
    <v-navigation-drawer
     temporary
     app 
     v-model="drawer">
      <v-list-item>
        <v-list-item-title class="title">
          Bishamon IoT
        </v-list-item-title>
        <v-btn icon @click="drawerFalse">
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
      </v-list-item>
      <v-divider />
      <v-list nav>
        <v-list-item v-for="(item,i) in items" :key="i" :to="item.to">
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>



    <v-main>
      <router-view />
    </v-main>

    <v-footer app>
      <!-- フッター -->
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      WBGT_Message:"",
      WBGT_Class:"",
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'ホーム',
          to: '/'
        },
        {
          icon: 'mdi-chart-bubble',
          title: '一覧表示',
          to: '/index_lite'
        },
        {
          icon: 'mdi-qrcode-scan',
          title: 'QR読取り',
          to: '/QRcode'
        },
        {
          icon: 'mdi-camera',
          title: 'Gallery',
          to: '/Gallery'
        },
        {
          icon: 'mdi-file-powerpoint-box',
          title: 'HPライン',
          to: '/next_HP'
        },
        {
          icon: 'mdi-panda',
          title: '機械登録データ編集',
          to: '/CRUD'
        },
        {
          icon: 'mdi-youtube',
          title: 'YouTube',
          to: '/youtube'
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: "リアルタイム改善（IoT×標準作業管理票×5Sハウス理論）",

      //WBGT　https://symamone-tec.com/measuring_wbgt_m5stick-c/から引用

      // https://www.mhlw.go.jp/houdou/2009/06/dl/h0616-1b.pdf  環境省　熱中症を防ごうの参考データ
      WBGT:[[15,15,16,16,17,17,18,19,19,20,20,21,21,22,23,23,24],
                          [15,16,17,17,18,18,19,19,20,21,21,22,22,23,24,24,25],
                          [16,17,17,18,19,19,20,20,21,22,22,23,23,24,25,25,26],
                          [17,18,18,19,19,20,21,21,22,22,23,24,24,25,26,26,27],
                          [18,18,19,20,20,21,22,22,23,23,24,25,25,26,27,27,28],
                          [18,19,20,20,21,22,22,23,24,24,25,26,26,27,28,28,29],
                          [19,20,21,21,22,23,23,24,25,25,26,27,27,28,29,29,30],
                          [20,21,21,22,23,23,24,25,25,26,27,28,28,29,30,30,31],
                          [21,21,22,23,24,24,25,26,26,27,28,29,29,30,31,31,32],
                          [21,22,23,24,24,25,26,27,27,28,29,29,30,31,32,32,33],
                          [22,23,24,24,25,26,27,27,28,29,30,30,31,32,33,33,34],
                          [23,24,25,25,26,27,28,28,29,30,31,31,32,33,34,34,35],
                          [24,25,25,26,27,28,28,29,30,31,32,32,33,34,35,35,36],
                          [25,25,26,27,28,29,29,30,31,32,33,33,34,35,36,37,37],
                          [25,26,27,28,29,29,30,31,32,33,33,34,35,36,37,38,38],
                          [26,27,28,29,29,30,31,32,33,34,34,35,36,37,38,39,39],
                          [27,28,29,29,30,31,32,33,34,35,35,36,37,38,39,40,41],
                          [28,28,29,30,31,32,33,34,35,35,36,37,38,39,40,41,42],
                          [28,29,30,31,32,33,34,35,35,36,37,38,39,40,41,42,43],
                          [29,30,31,32,33,34,35,35,36,37,38,39,40,41,42,43,44]],
 
    }
  },
  computed:{
    getEnvTem(){
      return this.$store.getters["Env/getEnvData"]("Tem");
    },
    getEnvHum(){
      return this.$store.getters["Env/getEnvData"]("Hum");
    },
    getEnvPre(){
      return this.$store.getters["Env/getEnvData"]("Pre");
    },
    getEnvTime(){
      
      return this.$store.getters["Env/getEnvData"]("EnvTime");
      
      },
    EnvTimeYYMMDDhhmmss(){
      let d = new Date(this.getEnvTime);
      let YY = d.getFullYear();
      let MM = d.getMonth()+1;
      let DD = d.getDate();
      let h =d.getHours();
      let m = d.getMinutes();
      let s = d.getSeconds();

      return `${YY}/${MM}/${DD}　${h}:${m}:${s}時点`
      return d;
    },
    index_hum(){
      if(this.getEnvHum<20){
        return 0;
      }else{
        return Math.floor(this.getEnvHum / 5 - 3);
      };
    },
    index_Tem(){
      if(this.getEnvTem<21 || this.getEnvTem>40){
        return  0;
      }else{
        return  Math.ceil(this.getEnvTem)-21;

      }
      // if(this.getEnvTem<21 || this.getEnvTem>40){
      //   return  0;
      // }else{
      //   return  Math.ceil(this.getEnvTem)-21;

      // }

    },

  WBGT_Color(){
       switch (true){
              case this.WBGT[this.index_Tem][this.index_hum]>=0 && this.WBGT[this.index_Tem][this.index_hum]<=20:
                this.WBGT_Class="indigo--text text-h6 text--darken-1";
                this.WBGT_Message=""
                return 'lightgray';
                    // return {color:"black"};
                    break;
             case this.WBGT[this.index_Tem][this.index_hum]>=0 && this.WBGT[this.index_Tem][this.index_hum]<=24:
                this.WBGT_Class="indigo--text text-h6 text--darken-1";
                this.WBGT_Message="注意（２１℃〜２５℃）"
                return 'lime';
                    // return {color:"black"};
                    break;
              case this.WBGT[this.index_Tem][this.index_hum]>24 && this.WBGT[this.index_Tem][this.index_hum]<=27:
                this.WBGT_Class="black--text text-h6 text--darken-1";
                    this.WBGT_Message="警戒（２５℃〜２８℃）"
                    // return 'darkorange';
                    return 'yellow';
                    break;
              case this.WBGT[this.index_Tem][this.index_hum]>27 && this.WBGT[this.index_Tem][this.index_hum]<=30:
                    this.WBGT_Class="indigo--text text-h6 text--darken-1";
                    this.WBGT_Message="厳重警戒（２８℃〜３１℃）"
                    // return {color:"black"};
                    return 'orange';
                    break;
              case this.WBGT[this.index_Tem][this.index_hum]>30 && this.WBGT[this.index_Tem][this.index_hum]<=33:
                    this.WBGT_Message="危険（３１℃以上）"
                    this.WBGT_Class="white--text text-h6 text--darken-1";
                    return 'red';
                    break;
              case this.WBGT[this.index_Tem][this.index_hum] > 33 && this.WBGT[this.index_Tem][this.index_hum] <= 44:
                //本来、これ以上は全て危険とされているが、３４℃以上を、独自に管理していく
                    this.WBGT_Message="超ヤベー（３５℃以上）"
                    this.WBGT_Class="red--text text-h6";
                    return 'black';
                    break;
              default: 
                return 'gray'
      
      };
    },

  },
  methods: {
    drawerFalse:function(){
      this.drawer = false;
    }
  }
  
}
</script>
