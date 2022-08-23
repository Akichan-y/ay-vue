<template>
 <v-app>
   <!-- <spam>{{NowEnvTime}}時点</spam>
   <spam class="pink--text text-h6 text--lighten-2">気温{{NowTmp}}℃</spam>
   <spam class="indigo--text text-h6 text--lighten-2">湿度{{NowHum}}％</spam>
   <spam class="green--text text-h6 text--lighten-2">気圧{{NowPre}}</spam> -->
   <v-row>
     <v-col   cols="12" sm="12" md="6" lg="4" xl="3" class="mt-4 ml-2">

          <span class="indigo--text  text-h4 text--lighten-1 ml-2 mt-5 pa-2">{{getGenzaiJikan}}</span>
          <!-- <span class="indigo--text text-h6 text--lighten-2 ml-2">{{mydate}}</span> -->
              <!-- 日付変更機能は、いまいちうまく動かないので、一旦コメントアウト -->
            <!-- <v-dialog
              v-model="dialog"
              width="500"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="blue lighten-2"
                  dark
                  v-bind="attrs"
                  v-on="on"
                >
                  日付変更
                </v-btn>
              </template>

              <v-card>
                  <v-date-picker
                    v-model="mydate"
                    full-width
                    year-icon="mdi-calendar-blank"
                    prev-icon="mdi-skip-previous"
                    next-icon="mdi-skip-next"
                  ></v-date-picker>
                <v-divider></v-divider>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="primary"
                    text
                    @click="ReFire()"
                  >
                    変更
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog> -->
      <!-- <h2>{{message}}</h2> -->
      <h2>{{getTest}}</h2>
      <h2>{{getKeikaJikan}}</h2>

     </v-col>
    <v-col  cols="12" sm="1" md="1" lg="1" xl="1">
        <v-checkbox
          v-model="Nishio"
          label="西尾"
        ></v-checkbox>
     </v-col>
      <v-col  cols="12" sm="1" md="1" lg="1" xl="1">
        <v-checkbox
          v-model="NishioAP"
          label="AP"
        ></v-checkbox>
     </v-col>
     <v-col  cols="12" sm="1" md="1" lg="1" xl="1">
        <v-checkbox
          v-model="NishioHP"
          label="HP"
        ></v-checkbox>
     </v-col>
     <!-- <v-col>
        <div  width="50px" height="50px" v-if="Nishio == true">
          <img src="~/assets/factory/Nishio.png" width="100%" height="100%">
        </div>
     </v-col> -->
     <v-col  cols="12" sm="1" md="1" lg="1" xl="1">
        <v-checkbox
          v-model="Fukushima"
          label="福島"
        ></v-checkbox>
     </v-col>
     <v-col  cols="12" sm="1" md="1" lg="1" xl="1">
        <v-checkbox
          v-model="SHF"
          label="SHF"
        ></v-checkbox>
     </v-col>
     <v-col  cols="12" sm="1" md="1" lg="1" xl="1">
        <v-checkbox
          v-model="Recurrent"
          label="Try"
        ></v-checkbox>
     </v-col>
     <v-col  cols="12" sm="1" md="1" lg="1" xl="1">
        <v-checkbox
          v-model="Weather"
          label="週間天気予報"
        ></v-checkbox>
     </v-col>
     <v-col  cols="12" sm="1" md="1" lg="1" xl="1">
       <dialog_comp class="mt-4"></dialog_comp>
     </v-col>
   </v-row>

   <v-row v-if="Weather == true">
     <v-col  cols="12" sm="12" md="12" lg="6" xl="6" class="ml-10 mt-0">
       <weather_comp></weather_comp>
    </v-col>
     <v-col  cols="12" sm="12" md="12" lg="6" xl="5" class="ml-10 mt-0">
       <compCarousel></compCarousel>
    </v-col>
   </v-row>
<v-container fluid>

<v-row mb="1" pb="1"> 
    
    <!-- <v-col cols="12" sm="6" md="4" lg="3" xl="2" v-show="NishioHP == true"> -->

    <v-col cols="12" sm="6" md="4" lg="3" xl="2"   v-if="Nishio == true">
      <compMachineHP name="MC024"/>
    </v-col>
    <v-col cols="12" sm="6" md="4" lg="3" xl="2"   v-if="Nishio == true">
      <compMachineHP name="MC026"/>
    </v-col>
    <v-col cols="12" sm="6" md="4" lg="3" xl="2"   v-if="Nishio == true">
      <compMachineHP name="MC027"/>
    </v-col>
    <v-col cols="12" sm="6" md="4" lg="3" xl="2"   v-if="Nishio == true">
      <compMachineHP name="MC028"/>
    </v-col>
    
    <v-col cols="12" sm="6" md="4" lg="3" xl="2"   v-if="Nishio == true">
      <compMachineHP name="LN043"/>
    </v-col>
    <v-col cols="12" sm="6" md="4" lg="3" xl="2"  v-if="NishioHP == true">
      <compMachineHP name="MC031"/>
    </v-col>
    <v-col cols="12" sm="6" md="4" lg="3" xl="2"   v-if="NishioHP == true">
      <compMachineHP name="MC037"/>
    </v-col>
    <v-col cols="12" sm="6" md="4" lg="3" xl="2"   v-if="NishioHP == true">
      <compMachineHP name="EX124"/>
    </v-col>
    <v-col cols="12" sm="6" md="4" lg="3" xl="2"   v-if="NishioHP == true">
      <compMachineHP name="LN034"/>
    </v-col>

     <v-col cols="12" sm="6" md="4" lg="3" xl="2" v-if="Fukushima == true">
      <compMachineHP name="MC009"/>
    </v-col>
    <v-col cols="12" sm="6" md="4" lg="3" xl="2" v-if="Fukushima == true">
      <compMachineHP name="MC010"/>
    </v-col>
    <v-col class=" text-center red" color="" cols="12" sm="6" md="4" lg="3" xl="2" v-if="Fukushima == true">
      <span class="white--text text-h5  text--darken-2 ml-2" v-if="Fukushima == true">SW005</span>
      <compMachineHP name="MC011"/>
      <!-- <compMachineHP name="SW005"/> -->
    </v-col>
    <v-col class=" text-center blue" cols="12" sm="6" md="4" lg="3" xl="2" v-if="Fukushima == true">
      <span class="white--text text-h5  text--darken-2 ml-2" v-if="Fukushima == true">SW006</span>
      <!-- <compMachineHP name="SW006"/> -->
      <compMachineHP name="MC013"/>
    </v-col>
    <v-col cols="12" sm="6" md="4" lg="3" xl="2" v-if="SHF == true">
      <compMachineHP name="RW050"/>
    </v-col>
    <v-col cols="12" sm="6" md="4" lg="3" xl="2" v-if="SHF == true">
      <compMachineHP name="RW052"/>
    </v-col>
    <v-col cols="12" sm="6" md="4" lg="3" xl="2" v-if="SHF == true">
      <compMachineHP name="RW046"/>
      <!-- <compMachineFSys name="RW046"/> -->
    </v-col>
    <v-col cols="12" sm="6" md="4" lg="3" xl="2" v-if="SHF == true">
      <compMachineHP name="FSLS1"/>
    </v-col>
    <v-col cols="12" sm="6" md="4" lg="3" xl="2" v-if="NishioAP == true">
      <compMachineHP name="HPT_P"/>
    </v-col>
    <v-col cols="12" sm="6" md="4" lg="3" xl="2" v-if="NishioAP == true">
      <compMachineHP name="HPT_F"/>

    </v-col>
        <v-col cols="12" sm="6" md="4" lg="3" xl="2" v-if="NishioAP == true">
      <img src="~/assets/key_pd.png" width="300px" class="ml-1"></img>
    </v-col>
    <v-col cols="12" sm="6" md="4" lg="3" xl="2" v-if="NishioAP == true">
      <compMachineHP name="AP_MX"/>
    </v-col>

    <v-col cols="12" sm="6" md="4" lg="3" xl="2" v-if="Recurrent == true">
      <compMachineHP name="GT999"/>
    </v-col>
    
    <!-- <v-col cols="12" sm="6" md="4" lg="3" xl="2" v-if="Fukushima == true">
      <compMachineHP name="GT999"/>
    </v-col> -->
</v-row>
</v-container>
 </v-app>
</template>

<style>
  
</style>

<script src="./main.js">

</script>