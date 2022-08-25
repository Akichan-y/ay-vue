<template>
  <div>
    <!-- 送信用 -->
    <div>
      <input v-model="resources" type="text">
      <button @click="submit">
        送信
      </button>
    </div>
    <!-- 表示用 -->
    <div>
      <ul>
        <li v-for="(result, index) in results" :key="index">
          {{ result }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      resources: '',
      results: []
    }
  },
  methods: {
    async submit() {
      const resources = this.resources.split(',')
      const promises = resources.map((resource) => {
        return this.dummyFetch(resource)
      })
      const responses = await Promise.all(promises)
      return responses.map((response) => {
        this.results.push(response.body)
      })
    },
    dummyFetch(resource) {
      return new Promise((resolve) => {
        setTimeout(() => {
          if (resource.startsWith('hoge')) {
            resolve({ body: resource })
          } else {
            resolve({ body: 'fuga' })
          }
        }, 1000 * Math.random())
      })
    }
  }
}
</script>