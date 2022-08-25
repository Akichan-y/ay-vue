
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
<template>
  <div class="page">
    {{ posts }}
  </div>
</template>
 
<script>
import axios from 'axios'
 
export default {
  async asyncData () {
    return await axios.get('https://jsonplaceholder.typicode.com/posts')
      .then((response) => {
        return { posts: response.data}
        console.log(response.data)
      })
      .catch((error) => console.log(error))
  },
}
</script>