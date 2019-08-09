<template>
  <div>
    <my-title title="User" />
    <nuxt-link :to="'/'">Go Home</nuxt-link>
  </div>
</template>

<script>
import MyTitle from '~/components/MyTitle.vue'

export default {
  components: {
    MyTitle
  }
}
</script>
