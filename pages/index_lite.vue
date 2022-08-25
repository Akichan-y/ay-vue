<template>
 <v-app>
   <!-- <spam>{{NowEnvTime}}時点</spam>
   <spam class="pink--text text-h6 text--lighten-2">気温{{NowTmp}}℃</spam>
   <spam class="indigo--text text-h6 text--lighten-2">湿度{{NowHum}}％</spam>
   <spam class="green--text text-h6 text--lighten-2">気圧{{NowPre}}</spam> -->
   <v-row>
     <v-col   cols="12" sm="12" md="6" lg="4" xl="3" class="mt-4 ml-2">

          <span class="indigo--text  text-h4 text--lighten-1 ml-2 mt-5 pa-2">{{getGenzaiJikan}}</span>
         
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
          v-model="NishioHP"
          label="HP"
        ></v-checkbox>
     </v-col>

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

   </v-row>
<v-container fluid>

<v-row mb="1" pb="1"> 

    
    <!-- <v-col cols="12" sm="6" md="4" lg="3" xl="2" v-show="NishioHP == true"> -->

    <v-col cols="12" sm="6" md="4" lg="3" xl="2"   v-if="Nishio == true">
      <compMachineHP_lite name="MC024"/>
    </v-col>
    <v-col cols="12" sm="6" md="4" lg="3" xl="2"   v-if="Nishio == true">
      <compMachineHP_lite name="MC026"/>
    </v-col>
    <v-col cols="12" sm="6" md="4" lg="3" xl="2"   v-if="Nishio == true">
      <compMachineHP_lite name="MC027"/>
    </v-col>
    <v-col cols="12" sm="6" md="4" lg="3" xl="2"   v-if="Nishio == true">
      <compMachineHP_lite name="MC028"/>
    </v-col>
    
    <v-col cols="12" sm="6" md="4" lg="3" xl="2"   v-if="Nishio == true">
      <compMachineHP_lite name="LN043"/>
    </v-col>
    <v-col cols="12" sm="6" md="4" lg="3" xl="2"  v-if="NishioHP == true">
      <compMachineHP_lite name="MC031"/>
    </v-col>
</v-row>
<v-row mb="1" pb="1"> 
    <v-col cols="12" sm="6" md="4" lg="3" xl="2"   v-if="NishioHP == true">
      <compMachineHP_lite name="MC037"/>
    </v-col>
    <v-col cols="12" sm="6" md="4" lg="3" xl="2"   v-if="NishioHP == true">
      <compMachineHP_lite name="EX124"/>
    </v-col>
    <v-col cols="12" sm="6" md="4" lg="3" xl="2"   v-if="NishioHP == true">
      <compMachineHP_lite name="LN034"/>
    </v-col>

     <v-col cols="12" sm="6" md="4" lg="3" xl="2" v-if="Fukushima == true">
      <compMachineHP_lite name="MC009"/>
    </v-col>
    <v-col cols="12" sm="6" md="4" lg="3" xl="2" v-if="Fukushima == true">
      <compMachineHP_lite name="MC010"/>
    </v-col>
    <v-col class=" text-center red" color="" cols="12" sm="6" md="4" lg="3" xl="2" v-if="Fukushima == true">
      <span class="white--text text-h5  text--darken-2 ml-2" v-if="Fukushima == true">SW005</span>
      <compMachineHP_lite name="MC011"/>
      <!-- <compMachineHP_lite name="SW005"/> -->
    </v-col>
</v-row>
<v-row mb="1" pb="1"> 
    <v-col class=" text-center blue" cols="12" sm="6" md="4" lg="3" xl="2" v-if="Fukushima == true">
      <span class="white--text text-h5  text--darken-2 ml-2" v-if="Fukushima == true">SW006</span>
      <!-- <compMachineHP_lite name="SW006"/> -->
      <compMachineHP_lite name="MC013"/>
    </v-col>
    <v-col cols="12" sm="6" md="4" lg="3" xl="2" v-if="SHF == true">
      <compMachineHP_lite name="RW050"/>
    </v-col>
    <v-col cols="12" sm="6" md="4" lg="3" xl="2" v-if="SHF == true">
      <compMachineHP_lite name="RW052"/>
    </v-col>
    <v-col cols="12" sm="6" md="4" lg="3" xl="2" v-if="SHF == true">
      <compMachineHP_lite name="RW046"/>
      <!-- <compMachineFSys name="RW046"/> -->
    </v-col>
    <v-col cols="12" sm="6" md="4" lg="3" xl="2" v-if="Recurrent == true">
      <compMachineHP_lite name="GT999"/>
    </v-col>
    
    <!-- <v-col cols="12" sm="6" md="4" lg="3" xl="2" v-if="Fukushima == true">
      <compMachineHP_lite name="GT999"/>
    </v-col> -->
</v-row>
</v-container>
 </v-app>
</template>

<style>
  
</style>

<script src="./main_lite.js">

</script>