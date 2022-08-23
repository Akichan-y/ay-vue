<template>
  <v-carousel cycle height="250" hide-delimiter-background show-arrows-on-hover>
    <v-carousel-item v-for="(slide, i) in slides" :key="i">
      <v-sheet
        class="pa-10"
        :color="colors[i]"
        height="100%"
        elevation="22"
        rounded
      >
        <v-row class="text-h5 mt-5 mb-0" align="center" justify="center">
          <!-- <div class="text-h4" style="word-wrap: break-word; white-space: pre-wrap;"> -->
          <div class="ma-0">
            {{ slide.substr(0, 27) }}
          </div>
          <!-- <p v-text="htmlText(slide)"></p> -->
          <!-- </div> -->
        </v-row>
        <v-row class="text-h4 mt-5" align="center" justify="center">
          <!-- <div class="text-h4" style="word-wrap: break-word; white-space: pre-wrap;"> -->
          {{ slide.substr(27) }}
          <!-- <p v-text="htmlText(slide)"></p> -->
          <!-- </div> -->
        </v-row>
      </v-sheet>
    </v-carousel-item>
  </v-carousel>
</template>

<script>
export default {
  data() {
    return {
      colors: [
        "red lighten-5",
        "indigo lighten-5",
        "orange lighten-5",
        "green lighten-5",
        "red lighten-5",
        "purple lighten-5",
        "pink lighten-5",
        "green lighten-5",
        "yellow lighten-2",
      ],

      slides: [],
      // slides: [
      //   '「己を愛し、家庭を愛し、会社を愛す」',
      //   `２０２１年度スローガン\n
      //    「やると決めたら、すぐやる、必ずやる、出来るまでやる」`,
      //   'Challenge＆Creative',
      //   '２月の強化項目 \n「仕事しやすい職場環境作り」',
      //   'より良い職場にする呪文「PQCDSMEI」',
      //   '安全衛生委員会　二月の重点項目\n「非定形作業でKYK！」',
      //   '西尾工場コンセプト「Communication->X：標準作業管理票☓IoT☓５Sハウス理論」',
      // ],
    };
  },
  mounted() {
    this.$fire.firestore
      .collection("Messages")
      // this.$fire.firestore.collection('Messages').doc(this.MyID)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // console.log(doc.id);
          // console.log(doc.data().msg);
          let g = doc.data().group + "　".repeat(9);
          let n = doc.data().name + "　".repeat(8);
          let m = doc.data().msg;
          let d = "'" + doc.data().date.substring(0, 8);

          let s = `${g.substring(0, 12)}${n.substring(0, 5)}　${d}${m}`;

          this.slides.push(s);
        });
        // console.log(`${doc.id} =>
        // console.log(querySnapshot.data().msg);
        // this.MyMsg=querySnapshot.data().msg;
      });
  },
  methods: {
    htmlText(msg) {
      if (!!msg) {
        return msg.replace(/\r?\n/g, "<br>");
      }
    },
  },
};
</script>
