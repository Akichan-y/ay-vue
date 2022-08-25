<template>
  <section class="container">
    <h2>axiosのお勉強</h2>
    <h1>{{title}}</h1>
    <p>{{message}}</p>
    <pre>{{html_data}}</pre>
  </section>
</template>

<script>
const axios = require('axios');

let url = "/README.md";


export default {
  data : function(){
    return{
      title:"axios",
      message:"axios.sample"

      };
  },
  asyncData:async function() {
      let result = await $axios.$get(url);
      // let result = await axios.get(url);
      // return {html_data:result.data};
  },

  }

</script>
<style>
.container{
  padding:5px 10px 10px;
}

h1{
  font-size:60pt;
  color:#345980
}

div{
  font-size:14pt
}

pre{
  padding:10px;
  font-size:18px;
  background-color: #efefef;
  white-space: pre-wrap;
}

</style>