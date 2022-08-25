
<template>
  <div class="container">
    <div class="setting-box">
      <!-- 色を変えるとこ -->
      <p>色</p>
      <input type="color" v-model="strokeFill" />
      <!-- 線の太さとか -->
      <p>線の太さ</p>
      <input type="range" v-model="strokeWidth" />
    </div>
    <!-- SVG定義 -->
    <svg :width="width" :height="height" :viewBox="viewport" @wheel="zoompan" @mousedown="lineNode($event, idx)"> 
      <!-- 線を引いた後 -->
      <path :d="path"
            fill="none"
            :stroke="strokeFill"
            :opacity="strokeOpacity"
            :stroke-width="strokeWidth"
            stroke-linecap="round"
            v-for="(path, idx) in pathList" :key="idx"
            v-if="pathList.length > 0"/>
      <!-- 線を引いている最中 -->
      <path :d="pathTemp"
            fill="none"
            :stroke="strokeFill"
            :opacity="strokeOpacity"
            :stroke-width="strokeWidth"
            stroke-linecap="round"
            v-if="isLineNode"/>
    </svg>
  </div>
</template>



<script>
export default {
  name: 'SVGDemo',
  data () {
    return {
      width: 500,
      height: 500,
      ratio: 1,
      dx: 0,
      dy: 0,
      viewport: '0 0 500 500',
      isLineNode: false,
      beforeMouseX: null,
      beforeMouseY: null,
      selectIdx: 0,
      pathList: [],
      pathTemp: '',
      strokeFill: '#525',
      strokeOpacity: 1,
      strokeWidth: '5',
      moveLineX: 0,
      moveLineY: 0,
      startLineX: 0,
      startLineY: 0,
    } 
  },
  // マウス操作関連
  mounted () {
    console.log('MOUNT LISTENER ON')
    document.addEventListener('mouseup', this.mouseUp)
    document.addEventListener('mousemove', this.mouseMakeLine)
  },
  beforeDestroy () {
    console.log('MOUNT LISTENER OFF')
    document.removeEventListener('mouseup', this.mouseUp)
    document.removeEventListener('mousemove', this.mouseMakeLine)
  },
  methods: {
    zoompan (e) {
      var [x, y, w, h] = this.viewport.split(' ').map(v => parseFloat(v))
      if (e.ctrlKey) {
        // 拡大（Y軸が上がる場合） 縮小（Y軸が下がる場合）
        if (e.deltaY > 0) {
           w = w * 1.01
           h = h * 1.01
        } else {
          w = w * 0.99
          h = h * 0.99
        }
        this.makeViewBox(x, y, w, h)
        this.ratio = w / this.width
        e.preventDefault()
      } else {
        // 移動
        if ((this.dx + e.deltaX > -this.width && this.dy + e.deltaY > -this.width) &&
            (this.dx + e.deltaX < this.width * 2 && this.dy + e.deltaY < this.width * 2)) {
          this.makeViewBox(x + e.deltaX, y + e.deltaY, w, h)
          this.dx += e.deltaX
          this.dy += e.deltaY
        }
      }
    },
    // viewboxを作成
    makeViewBox (x, y, w, h) {
      this.viewport = [x, y, w, h].join(' ')
    },
    // マウスのクリックが終わった段階で初期化
    mouseUp (e) {
      this.isLineNode = false
      this.beforeMouseX = null
      this.beforeMouseY = null
      this.pathList.push(this.pathTemp)
      console.log(this.pathList);
      this.pathTemp = null
      e.preventDefault()
    },
    // move中は前回まで動かした差分を取りながら座標を変化させていく
    mouseMove (e) {
      if (!this.isMove) return
      var mouseX = e.offsetX * this.ratio + this.dx
      var mouseY = e.offsetY * this.ratio + this.dy
      var dx = 0
      var dy = 0
      if (this.beforeMouseX && this.beforeMouseY) {
          dx = mouseX - this.beforeMouseX
          dy = mouseY - this.beforeMouseY
      }
      this.beforeMouseX = mouseX
      this.beforeMouseY = mouseY
      var tempX = dx + Number(this.rects[this.selectIdx].x)
      var tempY = dy + Number(this.rects[this.selectIdx].y)
      if (tempX > 0) this.rects[this.selectIdx].x = tempX
      if (tempY > 0) this.rects[this.selectIdx].y = tempY
      e.preventDefault()
    },
    lineNode (e, i) {
      this.startLineX = e.offsetX * this.ratio + this.dx
      this.startLineY = e.offsetY * this.ratio + this.dy
      this.moveLineX  = e.offsetX * this.ratio + this.dx
      this.moveLineY  = e.offsetY * this.ratio + this.dy
      this.isLineNode = true
      e.preventDefault()
    },
    mouseMakeLine (e) {
      if (!this.isLineNode) return
      var mouseX = e.offsetX * this.ratio + this.dx
      var mouseY = e.offsetY * this.ratio + this.dy
      var dx = 0
      var dy = 0
      if (this.beforeMouseX && this.beforeMouseY) {
          dx = mouseX - this.beforeMouseX
          dy = mouseY - this.beforeMouseY
      }
      this.beforeMouseX = mouseX
      this.beforeMouseY = mouseY
      var tempX = this.moveLineX
      var tempY = this.moveLineY
      tempX += dx
      tempY += dy
      if (tempX > 0) this.moveLineX = tempX
      if (tempY > 0) this.moveLineY = tempY
      this.pathTemp = 'M' + this.startLineX + ',' + this.startLineY + ' L' + this.moveLineX + ',' + this.moveLineY
    }
  }
}
</script>
