<template>
<div>
  <h1>記事一覧</h1>
  <ul>
    <li v-for="post in posts" :key=post.id>
      {{post}}
        <dir>{{ post.title }}</dir>
        <dir>{{ post.publishingOffice }}</dir>
        <dir>{{ post.reportDatetime }}</dir>
        <dir>【★★★★】{{ post.timeSeries[1].areas[0].tempsMax }}</dir> 
        <!-- <dir>【TS0】{{ post.timeSeries[0].timeDefines}}</dir>
        <dir>【TS0areas】{{ post.timeSeries[0].areas}}</dir>
        <dir>【TS0area】{{ post.timeSeries[0].areas[0].area}}</dir>
        <dir>【TS0areaName】{{ post.timeSeries[0].areas[0].area.name}}</dir>
        <dir>【TS0areas.waves】{{ post.timeSeries[0].areas[0].waves}}</dir>
        <dir>【●●●TS0area】{{ post.timeSeries[0].areas[0].area.name}}</dir>
        <dir>【TS0】{{ post.timeSeries[0]}}</dir>
        <dir>【TS1】{{ post.timeSeries[1][0]}}</dir> -->
        <!-- <dir>【TS2】{{ post.timeSeries[2].areas}}</dir> -->
        <!-- <dir>【TS2】{{ post.timeSeries[2]}}</dir> -->
        <hr>
        <!-- <dir>{{ post.timeSeries}}</dir> -->
        <!-- <dir>{{ post.reportDatetime }}</dir> -->
        <!-- <dir>{{ post.timeSeries[0].areas[0].area.name }}</dir>
        <dir>{{ post.timeSeries[0].areas[0].area }}</dir>
        <dir>{{ post.timeSeries[0].areas[0].weatherCodes }}</dir> -->

        <!-- <dir>【★TS2】{{ post.timeSeries[2].areas[0].name}}</dir> -->
        <!-- <dir>【★TS2】{{ post.timeSeries[1].timeDefines}}</dir>
        <!-- <dir>【★TS2】{{ post.timeSeries[1].timeDefines[2]}}</dir>
        <dir>【★★TS2】{{ post.timeSeries[1].areas[0].area}}</dir>
        <dir>【★★★TS2】{{ post.timeSeries[1].areas[0].pops}}</dir>
        <dir>【★★★★TS2】{{ post.timeSeries[1].areas[0].pops}}</dir> -->
        <!-- <dir>【❐❐❐】{{tests}}</dir> -->
        <!-- <dir>【❐❐❐❐】{{tests [2]}}</dir> -->
        <!-- <dir>【★TS2▲】{{ post.timeSeries[2].timeDefines}}</dir> -->
        <!-- <dir>【TS2▲】{{ post.timeSeries[2].timeSeries[1]}}</dir>
    -->
    </li>
  </ul>
</div>
</template>



<script>
import axios from 'axios';

export default {
  data(){
    return {
      posts: [],
      // tests:["100","200","300","400"]
      temps:[]
    }
  },
  mounted(){
    // axios.get('https://jsonplaceholder.typicode.com/posts')
    axios.get('https://www.jma.go.jp/bosai/forecast/data/forecast/230000.json')
          .then(response => this.posts = response.data);
    // console.log(this.posts);
    // console.log(this.posts.timeSeries[1].areas[0].tempsMax);
    //  this.temps = this.posts.timeSeries[1].areas[0].tempsMax ;
    //  console.log("最高気温は、" + this.temps);
  }
}


// https://jour-1.com/気象庁天気予報のapiを使ってみた/
// https://www.jma.go.jp/bosai/forecast/data/forecast/230000.json
</script>