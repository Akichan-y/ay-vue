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
    

   </v-row>
<v-container fluid>

<v-row mt="2" mb="4" pb="1"> 

    

    <v-col class="d-flex align-center">
      <compMachineHP_lite name="MC024"/>
    </v-col>
    <v-col class="d-flex align-center">
      <compMachineHP_lite name="MC026"/>
    </v-col>
    <v-col class="d-flex align-center">
      <compMachineHP_lite name="MC027"/>
    </v-col>
    <v-col class="d-flex align-center">
      <compMachineHP_lite name="MC028"/>
    </v-col>
    
    <v-col class="d-flex align-center">
      <compMachineHP_lite name="LN043"/>
    </v-col>
    <v-col  class="d-flex align-center">
      <compMachineHP_lite name="MC031"/>
    </v-col>
    <v-col class="d-flex align-center">
      <compMachineHP_lite name="MC037"/>
    </v-col>
    <v-col class="d-flex align-center">
      <compMachineHP_lite name="EX124"/>
    </v-col>
    <v-col class="d-flex align-center">
      <compMachineHP_lite name="LN034"/>
    </v-col>

    <v-col  class="d-flex align-left">
      <compMachineHP_lite name="RW046"/>
    </v-col>

    <v-col  class="d-flex align-center">
      <compMachineHP_lite name="RW050"/>
    </v-col>    
    <v-col  class="d-flex align-center">
      <compMachineHP_lite name="RW052"/>
    </v-col>
    <v-col  class="d-flex align-center">
      <compMachineHP_lite name="FSLS1"/>
    </v-col>
    <v-col  class="d-flex align-center">
      <compMachineHP_lite name="HPT_P"/>
    </v-col>
    <v-col  class="d-flex align-center">
      <compMachineHP_lite name="HPT_F"/>
    </v-col>
    <v-col  class="d-flex align-center">
      <compMachineHP_lite name="AP_MX"/>
    </v-col>
  
    <v-col  class="d-flex align-center">
      <compMachineHP_lite name="GT999"/>
    </v-col>
</v-row>

</v-container>
 </v-app>
</template>

<style>
  
</style>

<script src="./main_lite.js">

</script>