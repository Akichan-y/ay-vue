<template>
  <div>
    <h1>{{message}}</h1>
  </div>
</template>

<script>
export default {
  name: 'SVGDemo',
  data () {
    return {
      width: 500,
      height: 500,
      message:"I Want to study async!!"
    }
  },
  mounted(){
    // this.test_loop();
    this.test_setTimeout();
  },
  methods: {
    test_loop(){
      let oldDate = new Date();

      //更新後、即表示
      console.log("a");

      //2秒間すぎるまで無限ループ
      while((new Date() - oldDate) < 2000);
      oldDate = new Date();

      console.log("b");

      //1秒間すぎるまで無限ループ
      while((new Date() - oldDate) < 1000);
      oldDate = new Date();

      console.log("c")  ;
    },
    test_setTimeout(){
      //更新後、即表示
      console.log("a");

      setTimeout(function(){
          // 2秒後に呼ばれる
          console.log("b");
            setTimeout(function(){
                // 1秒後に呼ばれる
                console.log("c");
            }, 1000); // 1000ms(=1秒)後に呼ぶ関数を登録する
      }, 2000); // 2000ms(=2秒)後に呼ぶ関数を登録する
    }
  }
}
</script>