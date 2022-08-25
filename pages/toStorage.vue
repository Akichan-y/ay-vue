<template>
  <v-row>
    <v-col>
      <v-file-input
        label="テキストファイルを選択"
        @change="getFileContent"
      />
      {{ content }}
    </v-col>
  </v-row>
</template>
<script>
export default {
  data () {
    return {
       content: ''
    }
  },
  methods: {
    async getFileContent (file) {
      try {
        const content = await this.readFileAsync(file)
        this.content = content
      } catch (e) {
        console.log(e)
      }
    },
    readFileAsync (file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = () => {
          resolve(reader.result)
        }
        reader.onerror = reject
        reader.readAsText(file)
      })
    }
  }
}
</script>