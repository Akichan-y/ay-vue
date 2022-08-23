<template>
  <v-app fluid>
    <!-- <v-main>
     <v-container> -->

    <v-card
      class="mt-1 mb-1 py-0 mx-auto"
      width="380px"
      height="680px"
      elevation="20"
      mb="1"
    >
      <v-container class="my-0 py-0 grey lighten-5">
        <!-- <p class="my-0 text-right" > -->
        <!-- {{CycleJustHunByou}} -->
        <!-- {{ getStopWatchSecondsArryJust }}=={{getCycleTimeByouArry}}=={{getCycleTimeByouArry-getStopWatchSecondsArryJust}}==
            {{get_sensingTimeArryJust}}---{{ getSensingStTime }}〜 -->
        <!-- {{getJustSensingTime}}--- -->
        <span class="my-0 py-0">
          <v-row class="my-0 py-0">
            <!-- <span class="mx-0 px-0 yellow--text text-h6 text--darken-3">{{getCycleCount}}</span> -->
            <v-col cols="6" class="my-0 py-0">
              <span
                class="my-0 py-0 text-left indigo--text text-h7 text--lighten-2"
                >{{ getSensingStTime }}~</span
              >
            </v-col>
            <v-col cols="6" class="my-0 py-0 text-right">
              <span class="mx-0 px-0 pink--text text-h7 text--lighten-2"
                >{{ aaa.toFixed(1) }}/h</span
              >
              <span class="mx-0 px-0 indigo--text text--lighten-2 text-h7 ml-2"
                >{{ Math.round(aaa * 7.83) }}/D</span
              >
            </v-col>
          </v-row>
        </span>
        <!-- </p> -->
        <v-row justify="center" class="mt-0">
          <!-- 円グラフ -->
          <div
            class="mt-0 green-circle btnLamp"
            v-if="getStatusData == 1"
            @click="redirect"
          >
            {{ name }} 運転中【CT {{ getCycleTimeByouArryString }}】
            <!-- {{ name }} 運転中 {{ getSensingStTime }}〜 -->
          </div>
          <div
            class="mt-0 red-circle btnLamp"
            v-else-if="getStatusData == 2"
            @click="redirect"
          >
            {{ name }} 異常発生中 【CT {{ getCycleTimeByouArryString }}】
          </div>
          <div
            class="mt-0 yellow-circle btnLamp"
            v-else-if="getStatusData == 3"
            @click="redirect"
          >
            {{ name }} 段取中 【CT {{ getCycleTimeByouArryString }}】
          </div>
          <div
            class="mt-0 pink-circle btnLamp"
            v-else-if="getStatusData == 4"
            @click="redirect"
          >
            {{ name }} 計画停止中 【CT {{ getCycleTimeByouArryString }}】
          </div>
          <div class="mt-0 black-circle btnLamp" v-else @click="redirect">
            {{ name }} 停止中【CT {{ getCycleTimeByouArryString }}】
          </div>
        </v-row>
        <!-- <v-row> -->
        <p
          display="block"
          width="250px"
          class="HunByou mt-4 mb-0 ml-1 pt-0 pb-1"
          line-height="20px"
          :style="Beki2"
        >
          {{ CycleJustHunByou }}
        </p>

        <div class="Owaku my-0 py-0">
          <v-checkbox
            class="NowCheckBox"
            v-model="checkBox"
            label="台Mode"
          ></v-checkbox>

          <!-- <v-row> -->
          <!-- 円グラフ -->
          <!-- <v-row class="my-0 py-0"> -->
          <!-- <v-col class="my-0 py-0"> -->
          <div class="svgPie my-0 pa-0">
            <svg
              width="100"
              height="120"
              class="my-0 pa-0 pi_graph"
              viewBox="0 0 50 50"
            >
              <circle
                cx="46%"
                cy="46%"
                r="15.9154"
                stroke="white"
                stroke-dashoffset="0"
                my-0
                fill="none"
                stroke-width="17"
                stroke-dasharray="100"
              />

              <circle
                class="enko"
                cx="46%"
                cy="46%"
                r="15.9154"
                :stroke="myColorCircle"
                stroke-dashoffset="0"
                my-0
              />

              <circle
                class="enko"
                cx="46%"
                cy="46%"
                r="15.9154"
                :stroke="myColorCircle2"
                :stroke-dashoffset="myStrokeDashOffset2"
                my-0
              />

              <circle
                cx="46%"
                cy="46%"
                r="22.5"
                stroke="blue"
                stroke-dashoffset="0"
                my-0
                fill="none"
                stroke-width="1"
                stroke-dasharray="141.3"
              />

              <circle
                cx="46%"
                cy="46%"
                r="9"
                stroke="blue"
                stroke-dashoffset="0"
                my-0
                fill="none"
                stroke-width="1"
                stroke-dasharray="141.3"
              />

              <text
                x="8"
                y="41.5"
                stroke="white"
                stroke-width="4"
                font-weight="bold"
                fill="black"
                transform="rotate(90 20,40)"
                font-size="13"
                text-anchor="middle"
              >
                {{ 100 - Math.round(myStrokeDashOffset2) }}%
              </text>
              <text
                x="8"
                y="41.5"
                stroke="none"
                fill="black"
                transform="rotate(90 20,40)"
                font-size="13"
                text-anchor="middle"
              >
                {{ 100 - Math.round(myStrokeDashOffset2) }}%
              </text>
            </svg>
          </div>
          <span class="my-0 py-0 text-center" id="lapTimeCss"
            >- Lap ±5%★ -</span
          >
          <div
            v-for="(item, index) in getcycleTimeDeffArray"
            :key="index"
            id="lapTimeCss"
            left="1"
          >
            {{ item }}
            <!-- {{(index+1)}}{{item}} -->
          </div>
          <div class="my-0 pa-0">
            <div class="NowTantousha py-0 px-0">{{ NowTantousha }}です！</div>
            <img
              :src="getURL"
              onerror="this.onerror=null;this.src='~/assets/img/photo.png'"
              class="Shain_image"
            />
          </div>
          <div class="NowBikou mt-0 pt-1 pl-2">{{ NowBikou }}</div>
        </div>

        <!-- {{DacchakuJikan}} -->

        <div class="Owaku2 mt-1 ml-0 pl-0" v-if="checkBox == true">
          <v-row>
            <v-col>
              　計画
              <p
                class="DaisuKeikaku"
              >
                {{ KeikakuDai}}
              </p>
              <p class="TonyuKosu mb-0 pb-0">{{470 + (60*ZangyouJikan)}}分（T.T={{nowTT}}）</p>
            </v-col>
            <v-col>
              実績
              <p
                class="DaisuJisseki"
              >
                {{ getCountData }}
              </p>


            </v-col>
            <v-col>
              進度
              <p
                class="mt-0 mb-3 mr-5 text-center ObjStyleA DaisuShindo"
                v-bind:style="nowBeki3"
              >
                {{ calc_ShinChokuKaisu2(false) }}
                <!-- {{ calc_ShinChokuKaisu(false) }} -->
              </p>
            </v-col>
          </v-row>
        </div>

        <span width="200px" height="500px" v-if="checkBox != true">
          <v-row class="mt-3 ml-2 pa-0">
            <v-col class="mt-1 mb-2 ml-2 pa-0">
              <p
                class="mt-0 mb-3 mr-5 text-center text--lighten-1 font-weight-bold headline ObjStyleA"
                v-bind:style="Beki"
              >
                可動率 {{ calc_BekiDouRitsu }}%({{
                  calc_ShinChokuKaisu(false)
                }})
              </p>
            </v-col>
          </v-row>

          <v-row class="mt-0 pa-0">
            <v-col class="my-1 ml-5 pa-0 text-center">
              <!-- {{MachineHour}}
            {{JikanHenkan(getNowMachineHour)}} -->
            </v-col>
            <v-col class="my-1 pa-0 text-center">
              <!-- {{JikanHenkan(getNowDacchaku)}} -->
              <!-- {{DacchakuJikan}} -->
              <!-- {{current_MH}} -->
            </v-col>
            <v-col class="my-1 pa-0 text-center">
              <!-- {{JikanHenkan(getNowDandori)}} -->
              <!-- {{DandoriJikan}} -->
              <!-- {{current_MH}} -->
            </v-col>
          </v-row>
          <!-- {{getM}} -->
          <v-row class="mt-0 mb-0 pa-0">
            <v-col cols="3" class="my-0 pa-0">
              <p
                class="orange--text my-0 mr-1 text-right text--lighten-1 font-weight-bold headline"
              >
                {{ getCycleCounterDataDDR }}回
              </p>
            </v-col>

            <v-col cols="3" class="my-0 pa-0">
              <p
                class="orange--text my-0 mr-1 text-right text--lighten-1 font-weight-bold headline"
              >
                {{ calcMachineRateDDR }}%
              </p>
            </v-col>

            <v-col cols="3" class="my-0 pa-0">
              <p
                class="green--text my-0 mr-1 text-right text--lighten-1 font-weight-bold headline"
              >
                {{ getCountData }}台
              </p>
            </v-col>

            <v-col cols="3" class="my-0 pa-0">
              <p
                class="green--text my-0 mr-1 text-right text--lighten-1 font-weight-bold headline"
              >
                {{ calcMachineRate }}%
              </p>
            </v-col>
          </v-row>

          <v-row class="mt-0">
            <svg width="500" height="50" class="mt-0">
              <rect
                x="25"
                y="9"
                width="255"
                height="33"
                :fill="myColor3"
                stroke="blue"
                stroke-width="2"
              />

              <rect
                x="25"
                y="9"
                :width="myWidth2"
                height="33"
                :fill="myColor"
                stroke="blue"
                stroke-width="2"
              />

              <text
                x="145"
                y="33"
                font-size="20"
                fill="rgva(0,255,0,0.5)"
                stroke="black"
                text-anchor="middle"
                stroke-width="0.1"
              >
                {{ JikanHenkan(getNowMachineHour) }}（{{
                  JikanHenkan(getmachineHourCut)
                }}）
              </text>
            </svg>
          </v-row>
        </span>
        <span class="GuntChart ml=1">
          <v-row my-0>
            <svg width="320" height="240" viewBox="0 0 300 240" mt-0>
              <rect
                x="10"
                y="0"
                width="290"
                height="230"
                fill="#EEEEEE"
                stroke="blue"
                stroke-width="1"
              />
              <!-- <text x="0" y="0" font-family="Verdana" font-size="12" fill="gray">基準</text> -->

              <line
                x1="50"
                y1="28"
                x2="50"
                y2="220"
                stroke="hotpink"
                stroke-width="2"
              />
              <line x1="69" y1="28" x2="69" y2="220" stroke="darkgray" />
              <line x1="88" y1="28" x2="88" y2="220" stroke="darkgray" />
              <line
                x1="107.5"
                y1="28"
                x2="107.5"
                y2="220"
                stroke="darkgray"
                stroke-width="2"
              />
              <line x1="126.5" y1="28" x2="126.5" y2="220" stroke="darkgray" />
              <line x1="145.5" y1="28" x2="145.5" y2="220" stroke="darkgray" />
              <line
                x1="165"
                y1="28"
                x2="165"
                y2="220"
                stroke="hotpink"
                stroke-width="2"
              />
              <line x1="184" y1="28" x2="184" y2="220" stroke="darkgray" />
              <line x1="203" y1="28" x2="203" y2="220" stroke="darkgray" />
              <line
                x1="222.5"
                y1="28"
                x2="222.5"
                y2="220"
                stroke="darkgray"
                stroke-width="2"
              />
              <line x1="241.5" y1="28" x2="241.5" y2="220" stroke="darkgray" />
              <line x1="260.5" y1="28" x2="260.5" y2="220" stroke="darkgray" />
              <line
                x1="279.5"
                y1="28"
                x2="279.5"
                y2="220"
                stroke="hotpink"
                stroke-width="2"
              />

              <text
                x="46"
                y="20"
                font-family="Verdana"
                font-size="12"
                fill="gray"
              >
                0
              </text>
              <text
                x="100"
                y="20"
                font-family="Verdana"
                font-size="12"
                fill="gray"
              >
                15
              </text>
              <text
                x="157.5"
                y="20"
                font-family="Verdana"
                font-size="12"
                fill="gray"
              >
                30
              </text>
              <text
                x="215"
                y="20"
                font-family="Verdana"
                font-size="12"
                fill="gray"
              >
                45
              </text>
              <text
                x="272.5"
                y="20"
                font-family="Verdana"
                font-size="12"
                fill="gray"
              >
                60
              </text>

              <!-- 時間あたり台数 -->
              <text
                x="282"
                y="50"
                font-family="Verdana"
                font-size="12"
                fill="indigo"
              >
                {{ getCycleCount(0) }}
              </text>
              <text
                x="282"
                y="64"
                font-family="Verdana"
                font-size="12"
                fill="indigo"
              >
                {{ getCycleCount(1) }}
              </text>
              <text
                x="282"
                y="79"
                font-family="Verdana"
                font-size="12"
                fill="indigo"
              >
                {{ getCycleCount(2) }}
              </text>
              <text
                x="282"
                y="95"
                font-family="Verdana"
                font-size="12"
                fill="indigo"
              >
                {{ getCycleCount(3) }}
              </text>
              <text
                x="282"
                y="110"
                font-family="Verdana"
                font-size="12"
                fill="indigo"
              >
                {{ getCycleCount(4) }}
              </text>
              <text
                x="282"
                y="125"
                font-family="Verdana"
                font-size="12"
                fill="indigo"
              >
                {{ getCycleCount(5) }}
              </text>
              <text
                x="282"
                y="140"
                font-family="Verdana"
                font-size="12"
                fill="indigo"
              >
                {{ getCycleCount(6) }}
              </text>
              <text
                x="282"
                y="155"
                font-family="Verdana"
                font-size="12"
                fill="indigo"
              >
                {{ getCycleCount(7) }}
              </text>
              <text
                x="282"
                y="170"
                font-family="Verdana"
                font-size="12"
                fill="indigo"
              >
                {{ getCycleCount(8) }}
              </text>
              <text
                x="282"
                y="185"
                font-family="Verdana"
                font-size="12"
                fill="indigo"
              >
                {{ getCycleCount(9) }}
              </text>
              <text
                x="282"
                y="200"
                font-family="Verdana"
                font-size="12"
                fill="indigo"
              >
                {{ getCycleCount(10) }}
              </text>
              <text
                x="282"
                y="216"
                font-family="Verdana"
                font-size="12"
                fill="indigo"
              >
                {{ getCycleCount(11) }}
              </text>

              <text
                x="15"
                y="50"
                font-family="Verdana"
                font-size="12"
                fill="gray"
              >
                AM 7
              </text>
              <text
                x="38"
                y="64"
                font-family="Verdana"
                font-size="12"
                fill="gray"
              >
                8
              </text>
              <text
                x="38"
                y="79"
                font-family="Verdana"
                font-size="12"
                fill="gray"
              >
                9
              </text>
              <text
                x="32"
                y="95"
                font-family="Verdana"
                font-size="12"
                fill="gray"
              >
                10
              </text>
              <text
                x="32"
                y="110"
                font-family="Verdana"
                font-size="12"
                fill="gray"
              >
                11
              </text>
              <text
                x="15"
                y="125"
                font-family="Verdana"
                font-size="12"
                fill="gray"
              >
                PM12
              </text>
              <text
                x="38"
                y="140"
                font-family="Verdana"
                font-size="12"
                fill="gray"
              >
                1
              </text>
              <text
                x="38"
                y="155"
                font-family="Verdana"
                font-size="12"
                fill="gray"
              >
                2
              </text>
              <text
                x="38"
                y="170"
                font-family="Verdana"
                font-size="12"
                fill="gray"
              >
                3
              </text>
              <text
                x="38"
                y="185"
                font-family="Verdana"
                font-size="12"
                fill="gray"
              >
                4
              </text>
              <text
                x="38"
                y="200"
                font-family="Verdana"
                font-size="12"
                fill="gray"
              >
                5
              </text>
              <text
                x="38"
                y="216"
                font-family="Verdana"
                font-size="12"
                fill="gray"
              >
                6
              </text>

              <!-- https://www.it-mure.jp.net/ja/vuejs2/vue警告：重複キーが検出されました：x%E3%80%82これにより、更新エラーが発生する場合があります/806372717/ ❐❐❐❐重要！これでようやくエラー回避できた-->
              <path
                :d="path"
                fill="none"
                stroke="gray"
                stroke-width="9"
                v-for="(path, idx) of getGuntArryWait"
                :key="idx"
              />
              <path
                :d="path2"
                fill="none"
                stroke="rgb(0,255,0)"
                stroke-width="9"
                v-for="(path2, idx) of getGuntArryRUN"
                :key="'A' + idx"
              />
              <path
                :d="path3"
                fill="none"
                stroke="yellow"
                stroke-width="9"
                v-for="(path3, idx) of getGuntArryDDR"
                :key="'B' + idx"
              />
              <path
                :d="path4"
                fill="red"
                stroke="pink"
                stroke-width="9"
                v-for="(path4, idx) of getGuntArryKKT"
                :key="'C' + idx"
              />
              <path
                :d="path5"
                fill="red"
                stroke="red"
                stroke-width="9"
                v-for="(path5, idx) of getGuntArryERR"
                :key="'D' + idx"
              />

              <line
                x1="12"
                y1="38"
                x2="297"
                y2="38"
                stroke="hotpink"
                stroke-width="2"
              />
              <line
                x1="12"
                y1="53"
                x2="297"
                y2="53"
                stroke="black"
                stroke-width="1"
              />
              <line x1="10" y1="68" x2="297" y2="68" stroke="darkgray" />
              <line
                x1="10"
                y1="83"
                x2="297"
                y2="83"
                stroke="black"
                stroke-width="1"
              />
              <line x1="10" y1="98" x2="297" y2="98" stroke="darkgray" />
              <line
                x1="10"
                y1="113"
                x2="297"
                y2="113"
                stroke="hotpink"
                stroke-width="2"
              />
              <line x1="10" y1="128" x2="297" y2="128" stroke="darkgray" />
              <line
                x1="10"
                y1="143"
                x2="297"
                y2="143"
                stroke="black"
                stroke-width="1"
              />
              <line x1="10" y1="158" x2="297" y2="158" stroke="darkgray" />
              <line
                x1="10"
                y1="173"
                x2="297"
                y2="173"
                stroke="black"
                stroke-width="1"
              />
              <line x1="10" y1="188" x2="297" y2="188" stroke="darkgray" />
              <line
                x1="10"
                y1="203"
                x2="297"
                y2="203"
                stroke="hotpink"
                stroke-width="2"
              />
            </svg>
          </v-row>
        </span>
        <div
          class="mt-3 ml=2 text-left caption font-size=12px"
          :class="{ contentTgt: isTgt }"
        >
          {{ getCurrentTarget }}
        </div>
        <p
          class="grey--text mt-1 mb-0 ml-3 text-center text--darken-1 font-weight-bold subtitle2"
        >
          <!-- {{current_MH}} -->

          <!-- {{ chokuzenSW }} -->
        </p>
        <p></p>
      </v-container>
    </v-card>
    <!-- </v-container>
</v-main> -->
  </v-app>
</template>

<style>
.GuntChart {
  position: absolute;
  top: 510px;
  left: 1px;
}

.Owaku {
  position: relative;
  height: 240px;
  width: 200px;
  background-color: silber;
}
.HunByou {
  /* position: absolute; */
  outline: 2px solid silver;
  border-radius: 10px;
  height: 45px;
  width: 220px;
  /* margin-top:17px; */
  /* margin-bottom:5px; */
  /* margin-left:20px; */
  padding-top: 0px;
  font-size: 36px;
  font-weight: bold;
  text-align: center;
}

.NowCheckBox {
  position: absolute;
  top: 210px;
  left: 1px;
}

.Owaku2 {
  /* width:300px;
  height:200px;
  color:red; */

  /* position: absolute; */
  position: relative;
  color: blue;
  background-color: #ffff99;
  border: solid blue;
  border-radius: 10px;
  font-weight: bold;
  top: 10px;
  left: 1px;

  width: 278px;
  height: 120px;
  font-size: 20px;
  /* line-height:22px; */
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

.Shain_image {
  position: absolute;
  top: 30px;
  left: 95px;
  margin-top: 0px;
  padding-top: 0px;
  width: 185px;
  border: solid blue;
  border-radius: 10px;
}

.NowTantousha {
  /* position: relative; */
  position: absolute;
  /* background-color: #efefef; */
  color: blue;
  font-weight: bold;
  font-size: 20px;
  top: 5px;
  left: 100px;
  width: 175px;
  /* border: solid blue; */
  /* background-color:red; */
  border-radius: 10px;
  text-align: right;
}
.NowBikou {
  /* position: relative; */
  position: absolute;
  color: blue;
  background-color: #ffff99;
  border: solid blue;
  border-radius: 10px;
  font-weight: bold;
  top: 190px;
  left: 95px;
  width: 185px;
  height: 59px;
  font-size: 20px;
  line-height: 22px;
}

.parent {
  /* position: relative; */
}

.svgPie {
  position: relative;
  /* position: absolute; */
  top: 0px;
  left: 0px;
  margin-top: 0px;
}
/* ================================================
意味の無い空白が出来て困っていたのを、google検証と以下の知見で解決
https://stackoverflow.com/questions/68039544/vuetify-changing-min-height-of-v-application-wrap
================================================ */
.v-application--wrap {
  /* min-height: unset; */
  min-height: 58vh;
}

.pi_graph {
  transform-origin: center;
  transform: rotate(-90deg);
  margin: 0;
}

.enko {
  fill: none;
  stroke-width: 14;
  stroke-dasharray: 100;
}

#lapTimeCss {
  position: relative;
  font-size: 14px;
  color: black;
  font-weight: bold;
  line-height: 110%;
}

.ObjStyleA {
  outline: 1px solid grey;
  border-radius: 15px; /* まるみ */
}

.DaisuShindo {
  position: absolute;
  font-size: 35px;
  font-weight: bold;
  top:30px;
  left:160px;
  width:105px;
  height:50px;
  text-align:  center;        /* 文字を中央揃えに */
}

.contentTgt {
  /* animation: flash 1s linear infinite; */
  animation: flash 1s linear;
  animation-fill-mode: backwards;
  width: 220px;
  /* height:30px; */
  /* background:#0091EA; */
  background: white;
  margin: 5px;
}

@keyframes flash {
  0%,
  35%,
  60%,
  100% {
    opacity: 0;
  }

  25% {
    opacity: 1;
    background: #7fff00;
  }

  50% {
    opacity: 1;
    background: #0091ea;
  }

  75% {
    opacity: 1;
    background: #ff1493;
  }
}

.cont {
  color: blue;
  font-size: 2em;
  text-align: center;
}

.btnLamp {
  cursor: pointer;

  display: inline-block; /* センター寄せ用 */
  border-radius: 10px; /* まるみ */
  height: 40px; /* 円の大きさ */
  width: 240px; /* 円の大きさ */
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
