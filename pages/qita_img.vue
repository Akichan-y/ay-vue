<template>
  <v-row justify="center">
    <v-col sm="12" md="11" lg="9" xl="6">
      <v-sheet class="pa-3">
        <h1>アップロードプレビューデモ</h1>
        <v-form ref="form">
          <video v-if="uploadVideoUrl" controls>
            <source :src="uploadVideoUrl" />
            このブラウザではビデオ表示がサポートされていません
          </video>
          <v-file-input
            v-model="input_video"
            accept="video/*"
            show-size
            label="動画ファイルをアップロードしてください"
            prepend-icon="mdi-video"
            @change="onVideoPicked"
          ></v-file-input>
          <img v-if="uploadImageUrl" :src="uploadImageUrl" />
          <v-file-input
            v-model="input_image"
            accept="image/*"
            show-size
            label="画像ファイルをアップロードしてください"
            prepend-icon="mdi-image"
            @change="onImagePicked"
          ></v-file-input>
        </v-form>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      input_video: null,
      input_image: null,
      uploadVideoUrl: '',
      uploadImageUrl: ''
    }
  },
  methods: {
    onVideoPicked(file) {
      if (file !== undefined && file !== null) {
        if (file.name.lastIndexOf('.') <= 0) {
          return
        }
        const fr = new FileReader()
        fr.readAsDataURL(file)
        fr.addEventListener('load', () => {
          this.uploadVideoUrl = fr.result
        })
      } else {
        this.uploadVideoUrl = ''
      }
    },
    onImagePicked(file) {
      if (file !== undefined && file !== null) {
        if (file.name.lastIndexOf('.') <= 0) {
          return
        }
        const fr = new FileReader()
        fr.readAsDataURL(file)
        fr.addEventListener('load', () => {
          this.uploadImageUrl = fr.result
        })
      } else {
        this.uploadImageUrl = ''
      }
    }
  }
}
</script>