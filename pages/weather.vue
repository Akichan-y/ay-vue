<template>
  <span>

    <p>
    ▼<span id="areaName">{{area}}</span>、<a href="https://www.jma.go.jp/" target="_blank" rel="noopener"><span id="publishingOffice">{{getOffice}}</span></a>より「<span id="reportDatetime"></span>」発表
    </p>
    <div style="width:100%;">


    <div style="float: left;width:12.5%;text-align:center;"><div><span id="weather-date-0">--/--<br/>
      (--)</span></div>
      <div><img id="weather-image-0" height="60"></div>
      <div><span id="weather-telop-0">--<br/>--℃</span>
      </div></div>


    <div style="float: left;width:12.5%;text-align:center;"><div><span id="weather-date-1">--/--<br/>(--)</span></div><div><img id="weather-image-1" height="60"></div><div><span id="weather-telop-1">--<br/>--℃</span></div></div>
    <div style="float: left;width:12.5%;text-align:center;"><div><span id="weather-date-2">--/--<br/>(--)</span></div><div><img id="weather-image-2" height="60"></div><div><span id="weather-telop-2">--<br/>--℃</span></div></div>
    <div style="float: left;width:12.5%;text-align:center;"><div><span id="weather-date-3">--/--<br/>(--)</span></div><div><img id="weather-image-3" height="60"></div><div><span id="weather-telop-3">--<br/>--℃</span></div></div>
    <div style="float: left;width:12.5%;text-align:center;"><div><span id="weather-date-4">--/--<br/>(--)</span></div><div><img id="weather-image-4" height="60"></div><div><span id="weather-telop-4">--<br/>--℃</span></div></div>
    <div style="float: left;width:12.5%;text-align:center;"><div><span id="weather-date-5">--/--<br/>(--)</span></div><div><img id="weather-image-5" height="60"></div><div><span id="weather-telop-5">--<br/>--℃</span></div></div>
    <div style="float: left;width:12.5%;text-align:center;"><div><span id="weather-date-6">--/--<br/>(--)</span></div><div><img id="weather-image-6" height="60"></div><div><span id="weather-telop-6">--<br/>--℃</span></div></div>
    <div style="float: left;width:12.5%;text-align:center;"><div><span id="weather-date-7">--/--<br/>(--)</span></div><div><img id="weather-image-7" height="60"></div><div><span id="weather-telop-7">--<br/>--℃</span></div></div>
    </div>
    <div style="clear: both;"></div>


  </span>

</template>

<script>

import Vue from 'vue'
import Vuex from 'vuex'

// Vuexの使用を宣言
Vue.use(Vuex);

// テロップ設定
!function(R){
	"use strict";
	var E={TELOPS:{
		100:["100.svg","500.svg","100","晴","CLEAR"],
		101:["101.svg","501.svg","100","晴時々曇","PARTLY CLOUDY"],
		102:["102.svg","502.svg","300","晴一時雨","CLEAR, OCCASIONAL SCATTERED SHOWERS"],
		103:["102.svg","502.svg","300","晴時々雨","CLEAR, FREQUENT SCATTERED SHOWERS"],
		104:["104.svg","504.svg","400","晴一時雪","CLEAR, SNOW FLURRIES"],
		105:["104.svg","504.svg","400","晴時々雪","CLEAR, FREQUENT SNOW FLURRIES"],
		106:["102.svg","502.svg","300","晴一時雨か雪","CLEAR, OCCASIONAL SCATTERED SHOWERS OR SNOW FLURRIES"],
		107:["102.svg","502.svg","300","晴時々雨か雪","CLEAR, FREQUENT SCATTERED SHOWERS OR SNOW FLURRIES"],
		108:["102.svg","502.svg","300","晴一時雨か雷雨","CLEAR, OCCASIONAL SCATTERED SHOWERS AND/OR THUNDER"],
		110:["110.svg","510.svg","100","晴後時々曇","CLEAR, PARTLY CLOUDY LATER"],
		111:["110.svg","510.svg","100","晴後曇","CLEAR, CLOUDY LATER"],
		112:["112.svg","512.svg","300","晴後一時雨","CLEAR, OCCASIONAL SCATTERED SHOWERS LATER"],
		113:["112.svg","512.svg","300","晴後時々雨","CLEAR, FREQUENT SCATTERED SHOWERS LATER"],
		114:["112.svg","512.svg","300","晴後雨","CLEAR,RAIN LATER"],
		115:["115.svg","515.svg","400","晴後一時雪","CLEAR, OCCASIONAL SNOW FLURRIES LATER"],
		116:["115.svg","515.svg","400","晴後時々雪","CLEAR, FREQUENT SNOW FLURRIES LATER"],
		117:["115.svg","515.svg","400","晴後雪","CLEAR,SNOW LATER"],
		118:["112.svg","512.svg","300","晴後雨か雪","CLEAR, RAIN OR SNOW LATER"],
		119:["112.svg","512.svg","300","晴後雨か雷雨","CLEAR, RAIN AND/OR THUNDER LATER"],
		120:["102.svg","502.svg","300","晴朝夕一時雨","OCCASIONAL SCATTERED SHOWERS IN THE MORNING AND EVENING, CLEAR DURING THE DAY"],
		121:["102.svg","502.svg","300","晴朝の内一時雨","OCCASIONAL SCATTERED SHOWERS IN THE MORNING, CLEAR DURING THE DAY"],
		122:["112.svg","512.svg","300","晴夕方一時雨","CLEAR, OCCASIONAL SCATTERED SHOWERS IN THE EVENING"],
		123:["100.svg","500.svg","100","晴山沿い雷雨","CLEAR IN THE PLAINS, RAIN AND THUNDER NEAR MOUTAINOUS AREAS"],124:["100.svg","500.svg","100","晴山沿い雪","CLEAR IN THE PLAINS, SNOW NEAR MOUTAINOUS AREAS"],125:["112.svg","512.svg","300","晴午後は雷雨","CLEAR, RAIN AND THUNDER IN THE AFTERNOON"],126:["112.svg","512.svg","300","晴昼頃から雨","CLEAR, RAIN IN THE AFTERNOON"],127:["112.svg","512.svg","300","晴夕方から雨","CLEAR, RAIN IN THE EVENING"],128:["112.svg","512.svg","300","晴夜は雨","CLEAR, RAIN IN THE NIGHT"],130:["100.svg","500.svg","100","朝の内霧後晴","FOG IN THE MORNING, CLEAR LATER"],131:["100.svg","500.svg","100","晴明け方霧","FOG AROUND DAWN, CLEAR LATER"],132:["101.svg","501.svg","100","晴朝夕曇","CLOUDY IN THE MORNING AND EVENING, CLEAR DURING THE DAY"],140:["102.svg","502.svg","300","晴時々雨で雷を伴う","CLEAR, FREQUENT SCATTERED SHOWERS AND THUNDER"],160:["104.svg","504.svg","400","晴一時雪か雨","CLEAR, SNOW FLURRIES OR OCCASIONAL SCATTERED SHOWERS"],170:["104.svg","504.svg","400","晴時々雪か雨","CLEAR, FREQUENT SNOW FLURRIES OR SCATTERED SHOWERS"],181:["115.svg","515.svg","400","晴後雪か雨","CLEAR, SNOW OR RAIN LATER"],200:["200.svg","200.svg","200","曇","CLOUDY"],201:["201.svg","601.svg","200","曇時々晴","MOSTLY CLOUDY"],202:["202.svg","202.svg","300","曇一時雨","CLOUDY, OCCASIONAL SCATTERED SHOWERS"],203:["202.svg","202.svg","300","曇時々雨","CLOUDY, FREQUENT SCATTERED SHOWERS"],204:["204.svg","204.svg","400","曇一時雪","CLOUDY, OCCASIONAL SNOW FLURRIES"],205:["204.svg","204.svg","400","曇時々雪","CLOUDY FREQUENT SNOW FLURRIES"],206:["202.svg","202.svg","300","曇一時雨か雪","CLOUDY, OCCASIONAL SCATTERED SHOWERS OR SNOW FLURRIES"],207:["202.svg","202.svg","300","曇時々雨か雪","CLOUDY, FREQUENT SCCATERED SHOWERS OR SNOW FLURRIES"],208:["202.svg","202.svg","300","曇一時雨か雷雨","CLOUDY, OCCASIONAL SCATTERED SHOWERS AND/OR THUNDER"],209:["200.svg","200.svg","200","霧","FOG"],210:["210.svg","610.svg","200","曇後時々晴","CLOUDY, PARTLY CLOUDY LATER"],211:["210.svg","610.svg","200","曇後晴","CLOUDY, CLEAR LATER"],212:["212.svg","212.svg","300","曇後一時雨","CLOUDY, OCCASIONAL SCATTERED SHOWERS LATER"],213:["212.svg","212.svg","300","曇後時々雨","CLOUDY, FREQUENT SCATTERED SHOWERS LATER"],214:["212.svg","212.svg","300","曇後雨","CLOUDY, RAIN LATER"],215:["215.svg","215.svg","400","曇後一時雪","CLOUDY, SNOW FLURRIES LATER"],216:["215.svg","215.svg","400","曇後時々雪","CLOUDY, FREQUENT SNOW FLURRIES LATER"],217:["215.svg","215.svg","400","曇後雪","CLOUDY, SNOW LATER"],218:["212.svg","212.svg","300","曇後雨か雪","CLOUDY, RAIN OR SNOW LATER"],219:["212.svg","212.svg","300","曇後雨か雷雨","CLOUDY, RAIN AND/OR THUNDER LATER"],220:["202.svg","202.svg","300","曇朝夕一時雨","OCCASIONAL SCCATERED SHOWERS IN THE MORNING AND EVENING, CLOUDY DURING THE DAY"],221:["202.svg","202.svg","300","曇朝の内一時雨","CLOUDY OCCASIONAL SCCATERED SHOWERS IN THE MORNING"],222:["212.svg","212.svg","300","曇夕方一時雨","CLOUDY, OCCASIONAL SCCATERED SHOWERS IN THE EVENING"],223:["201.svg","601.svg","200","曇日中時々晴","CLOUDY IN THE MORNING AND EVENING, PARTLY CLOUDY DURING THE DAY,"],224:["212.svg","212.svg","300","曇昼頃から雨","CLOUDY, RAIN IN THE AFTERNOON"],225:["212.svg","212.svg","300","曇夕方から雨","CLOUDY, RAIN IN THE EVENING"],226:["212.svg","212.svg","300","曇夜は雨","CLOUDY, RAIN IN THE NIGHT"],228:["215.svg","215.svg","400","曇昼頃から雪","CLOUDY, SNOW IN THE AFTERNOON"],229:["215.svg","215.svg","400","曇夕方から雪","CLOUDY, SNOW IN THE EVENING"],230:["215.svg","215.svg","400","曇夜は雪","CLOUDY, SNOW IN THE NIGHT"],231:["200.svg","200.svg","200","曇海上海岸は霧か霧雨","CLOUDY, FOG OR DRIZZLING ON THE SEA AND NEAR SEASHORE"],240:["202.svg","202.svg","300","曇時々雨で雷を伴う","CLOUDY, FREQUENT SCCATERED SHOWERS AND THUNDER"],250:["204.svg","204.svg","400","曇時々雪で雷を伴う","CLOUDY, FREQUENT SNOW AND THUNDER"],260:["204.svg","204.svg","400","曇一時雪か雨","CLOUDY, SNOW FLURRIES OR OCCASIONAL SCATTERED SHOWERS"],270:["204.svg","204.svg","400","曇時々雪か雨","CLOUDY, FREQUENT SNOW FLURRIES OR SCATTERED SHOWERS"],281:["215.svg","215.svg","400","曇後雪か雨","CLOUDY, SNOW OR RAIN LATER"],300:["300.svg","300.svg","300","雨","RAIN"],301:["301.svg","701.svg","300","雨時々晴","RAIN, PARTLY CLOUDY"],302:["302.svg","302.svg","300","雨時々止む","SHOWERS THROUGHOUT THE DAY"],303:["303.svg","303.svg","400","雨時々雪","RAIN,FREQUENT SNOW FLURRIES"],304:["300.svg","300.svg","300","雨か雪","RAINORSNOW"],306:["300.svg","300.svg","300","大雨","HEAVYRAIN"],308:["308.svg","308.svg","300","雨で暴風を伴う","RAINSTORM"],309:["303.svg","303.svg","400","雨一時雪","RAIN,OCCASIONAL SNOW"],311:["311.svg","711.svg","300","雨後晴","RAIN,CLEAR LATER"],313:["313.svg","313.svg","300","雨後曇","RAIN,CLOUDY LATER"],314:["314.svg","314.svg","400","雨後時々雪","RAIN, FREQUENT SNOW FLURRIES LATER"],315:["314.svg","314.svg","400","雨後雪","RAIN,SNOW LATER"],316:["311.svg","711.svg","300","雨か雪後晴","RAIN OR SNOW, CLEAR LATER"],317:["313.svg","313.svg","300","雨か雪後曇","RAIN OR SNOW, CLOUDY LATER"],320:["311.svg","711.svg","300","朝の内雨後晴","RAIN IN THE MORNING, CLEAR LATER"],321:["313.svg","313.svg","300","朝の内雨後曇","RAIN IN THE MORNING, CLOUDY LATER"],322:["303.svg","303.svg","400","雨朝晩一時雪","OCCASIONAL SNOW IN THE MORNING AND EVENING, RAIN DURING THE DAY"],323:["311.svg","711.svg","300","雨昼頃から晴","RAIN, CLEAR IN THE AFTERNOON"],324:["311.svg","711.svg","300","雨夕方から晴","RAIN, CLEAR IN THE EVENING"],325:["311.svg","711.svg","300","雨夜は晴","RAIN, CLEAR IN THE NIGHT"],326:["314.svg","314.svg","400","雨夕方から雪","RAIN, SNOW IN THE EVENING"],327:["314.svg","314.svg","400","雨夜は雪","RAIN,SNOW IN THE NIGHT"],328:["300.svg","300.svg","300","雨一時強く降る","RAIN, EXPECT OCCASIONAL HEAVY RAINFALL"],329:["300.svg","300.svg","300","雨一時みぞれ","RAIN, OCCASIONAL SLEET"],340:["400.svg","400.svg","400","雪か雨","SNOWORRAIN"],350:["300.svg","300.svg","300","雨で雷を伴う","RAIN AND THUNDER"],361:["411.svg","811.svg","400","雪か雨後晴","SNOW OR RAIN, CLEAR LATER"],371:["413.svg","413.svg","400","雪か雨後曇","SNOW OR RAIN, CLOUDY LATER"],400:["400.svg","400.svg","400","雪","SNOW"],401:["401.svg","801.svg","400","雪時々晴","SNOW, FREQUENT CLEAR"],402:["402.svg","402.svg","400","雪時々止む","SNOWTHROUGHOUT THE DAY"],403:["403.svg","403.svg","400","雪時々雨","SNOW,FREQUENT SCCATERED SHOWERS"],405:["400.svg","400.svg","400","大雪","HEAVYSNOW"],406:["406.svg","406.svg","400","風雪強い","SNOWSTORM"],407:["406.svg","406.svg","400","暴風雪","HEAVYSNOWSTORM"],409:["403.svg","403.svg","400","雪一時雨","SNOW, OCCASIONAL SCCATERED SHOWERS"],411:["411.svg","811.svg","400","雪後晴","SNOW,CLEAR LATER"],413:["413.svg","413.svg","400","雪後曇","SNOW,CLOUDY LATER"],414:["414.svg","414.svg","400","雪後雨","SNOW,RAIN LATER"],420:["411.svg","811.svg","400","朝の内雪後晴","SNOW IN THE MORNING, CLEAR LATER"],421:["413.svg","413.svg","400","朝の内雪後曇","SNOW IN THE MORNING, CLOUDY LATER"],422:["414.svg","414.svg","400","雪昼頃から雨","SNOW, RAIN IN THE AFTERNOON"],423:["414.svg","414.svg","400","雪夕方から雨","SNOW, RAIN IN THE EVENING"],
		425:["400.svg","400.svg","400","雪一時強く降る","SNOW, EXPECT OCCASIONAL HEAVY SNOWFALL"],
		426:["400.svg","400.svg","400","雪後みぞれ","SNOW, SLEET LATER"],
		427:["400.svg","400.svg","400","雪一時みぞれ","SNOW, OCCASIONAL SLEET"],
		450:["400.svg","400.svg","400","雪で雷を伴う","SNOW AND THUNDER"]},
		AREA_FUKEN:[{center:"016000",offices:["016000","011000","013000","014030","014100","015000","012000","017000"]},{center:"040000",offices:["040000","060000","070000","020000","050000","030000"]},{center:"130000",offices:["130000","120000","140000","190000","090000","100000","110000","080000","200000"]},{center:"150000",offices:["150000","170000","180000","160000"]},{center:"230000",offices:["230000","240000","220000","210000"]},{center:"270000",offices:["270000","300000","260000","250000","280000","290000"]},{center:"340000",offices:["340000","310000","330000","320000"]},{center:"370000",offices:["370000","380000","360000","390000"]},{center:"400000",offices:["400000","440000","410000","430000","420000","350000"]},{center:"460100",offices:["460100","450000","460040"]},{center:"471000",offices:["471000","473000","474000","472000"]}],WEEK_AREAS:{"011000":"Soya Region","012000":"Kamikawa Rumoi Region","013000":"Abashiri Kitami Mombetsu Region","014000":"Kushiro Nemuro Tokachi Region","014030":"Tokachi Region","014100":"Kushiro Nemuro Region","015000":"Iburi Hidaka Region","016000":"Ishikari Sorachi Shiribeshi Region","017000":"Oshima Hiyama Region","020000":"Aomori Prefecture","020010":"Tsugaru","020030":"Sanpachi Kamikita","020100":"Tsugaru Shimokita","020200":"Shimokita Sanpachi Kamikita","030000":"Iwate Prefecture","030010":"Inland","030100":"Coast","040000":"Miyagi Prefecture","040010":"Eastern Region","040020":"Western Region","050000":"Akita Prefecture","060000":"Yamagata Prefecture","070000":"Fukushima Prefecture","070030":"Aizu","070100":"Nakadori Hamadori","080000":"Ibaraki Prefecture","090000":"Tochigi Prefecture",1e5:"Gunma Prefecture",100010:"Southern Region",100020:"Northern Region",11e4:"Saitama Prefecture",12e4:"Chiba Prefecture",130010:"Tokyo Region",130020:"Northern Izu Islands",130030:"Southern Izu Islands",130040:"Ogasawara Islands",130100:"Izu Islands",14e4:"Kanagawa Prefecture",15e4:"Niigata Prefecture",16e4:"Toyama Prefecture",17e4:"Ishikawa Prefecture",18e4:"Fukui Prefecture",19e4:"Yamanashi Prefecture",2e5:"Nagano Prefecture",200010:"Northern Region",200100:"Central Region Southern Region",21e4:"Gifu Prefecture",210010:"Mino Region",210020:"Hida Region",22e4:"Shizuoka Prefecture",23e4:"Aichi Prefecture",24e4:"Mie Prefecture",25e4:"Shiga Prefecture",250010:"Southern Region",250020:"Northern Region",26e4:"Kyoto Prefecture",260010:"Southern Region",260020:"Northern Region",27e4:"Osaka Prefecture",28e4:"Hyogo Prefecture",280010:"Southern Region",280020:"Northern Region",29e4:"Nara Prefecture",3e5:"Wakayama Prefecture",31e4:"Tottori Prefecture",32e4:"Shimane Prefecture",33e4:"Okayama Prefecture",330010:"Southern Region",330020:"Northern Region",34e4:"Hiroshima Prefecture",340010:"Southern Region",340020:"Northern Region",35e4:"Yamaguchi Prefecture",36e4:"Tokushima Prefecture",37e4:"Kagawa Prefecture",38e4:"Ehime Prefecture",39e4:"Kochi Prefecture",4e5:"Fukuoka Prefecture",41e4:"Saga Prefecture",42e4:"Nagasaki Prefecture",420030:"Iki Tsushima",420100:"Southern Region Northern Region Goto",43e4:"Kumamoto Prefecture",44e4:"Oita Prefecture",45e4:"Miyazaki Prefecture",460040:"Amami Region",460100:"Kagoshima Prefecture",471e3:"Okinawa Main Island Region",
		472e3:"Daitojima Region",473e3:"Miyakojima Region",474e3:"Yaeyama Region"}};
		R.Forecast=R.Forecast||{},R.Forecast.Const=E}("object"==typeof window?window:"object"==typeof global?global:this);


export default {
  data() {
    return {

    }
  },
  computed: {
    getOffice(){
      return this.$store.getters["hello/getOffice"];
    }
  },
  async fetch() {

  },
  mounted() {
    // 週間の曜日
    let WeekChars = [ "日", "月", "火", "水", "木", "金", "土" ];

    // 東京(130000)の予報を取得
    let url = "https://www.jma.go.jp/bosai/forecast/data/forecast/230000.json";

    let off = "";

    // 最大日数
    let p = 8;
   console.log("hello");
    // JSON取得
    fetch(url)
      .then(function(response) {
        return response.json();
      })
      .then(function(weather) {
          // 取得した週間の最初の日付が基準となる日付と同日、もしくは翌日なのかを確認
          let c = new Date( weather[0].reportDatetime );
          let u = new Date( weather[1].timeSeries[0].timeDefines[0] );
          let a = c.getFullYear() + '/' + ('0' + (c.getMonth() + 1)).slice(-2) + '/' + ('0' + c.getDate()).slice(-2);
          let b = u.getFullYear() + '/' + ('0' + (u.getMonth() + 1)).slice(-2) + '/' + ('0' + u.getDate()).slice(-2);
          var s = 0;
          if ( a === b )
          {
            // 以下のループでiを0からではなく1からはじめる
            s = 1;
          }

          // 見出しの要素を取得
          let office = document.getElementById('publishingOffice');
          let area = document.getElementById('areaName');
          let report = document.getElementById('reportDatetime');


          // 地域と発表日時の表示
          office.innerText = weather[0].publishingOffice;
          area.innerText = weather[0].timeSeries[0].areas[0].area.name;
          report.innerText = weather[0].reportDatetime.replace( '+09:00', '' ).replace( 'T', ' ' ).replaceAll( '-', '/' ).replace( /\:00$/, '' );

          // 週間予報
          var dates = weather[1].timeSeries[0].timeDefines;
          var codes = weather[1].timeSeries[0].areas[0].weatherCodes;
          var temps = weather[1].timeSeries[1].areas[0].tempsMax;

          var j = 0;
          for ( var i = s; i < (p - 1); i++ ) {

            let d = dates[i].replace( /\T\d{2}\:00\:00\+09:00/, '' ).replaceAll( '-', '/' ).replace( /\d{4}\//, '' );
            let c = codes[i];
            let t = Forecast.Const.TELOPS[c][3];
            let m = temps[i];
            let icon = Forecast.Const.TELOPS[c][0];

            let date = document.getElementById('weather-date-' + (j + 1));
            let img = document.getElementById('weather-image-' + (j + 1));
            let telop = document.getElementById('weather-telop-' + (j + 1));

            var obj = new Date( dates[i] );
            var w = obj.getDay();
            if ( w === 0 ) date.style.color = "red";
            if ( w === 6 ) date.style.color = "blue";
            date.innerHTML = d + '<br/>(' + WeekChars[w] + ')';
            img.src = 'https://www.jma.go.jp/bosai/forecast/img/' + icon;
            img.height = '60';
            telop.innerHTML = t + '<br />' + m + '℃';

            j++;
          }

          // きょうあす
          var dates = weather[0].timeSeries[0].timeDefines;
          var codes = weather[0].timeSeries[0].areas[0].weatherCodes;
          if ( weather[0].timeSeries[2].areas[0].temps.length === 4 ) {
            var temps = [
            weather[0].timeSeries[2].areas[0].temps[1]
            ,weather[0].timeSeries[2].areas[0].temps[3]
            ];
          }
          if ( weather[0].timeSeries[2].areas[0].temps.length === 2 ) {
            var temps = [
              '--'
            ,weather[0].timeSeries[2].areas[0].temps[1]
            ];
          }

          for ( var i = 0; i < 2; i++ ) {
            
            let d = dates[i].replace( /\T\d{2}\:00\:00\+09:00/, '' ).replaceAll( '-', '/' ).replace( /\d{4}\//, '' );
            let c = codes[i];
            let t = Forecast.Const.TELOPS[c][3];
            let m = temps[i];
            let icon = Forecast.Const.TELOPS[c][0];

            let date = document.getElementById('weather-date-' + (i));
            let img = document.getElementById('weather-image-' + (i));
            let telop = document.getElementById('weather-telop-' + (i));

            var obj = new Date( dates[i] );
            var w = obj.getDay();
            if ( w === 0 ) date.style.color = "red";
            if ( w === 6 ) date.style.color = "blue";
            date.innerHTML = d + '<br/>(' + WeekChars[w] + ')';
            img.src = 'https://www.jma.go.jp/bosai/forecast/img/' + icon;
            img.height = '60';
            telop.innerHTML = t + '<br />' + m + '℃';

          }	

      });
  }
  
}
</script>


<style>

</style>