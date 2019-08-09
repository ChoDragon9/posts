<template>
  <div>
    <my-title title="space-zero" />
    <h2 class="subtitle">
      My posh Nuxt.js project
    </h2>
    <div class="links">
      <nuxt-link :to="'/users'" class="button--green">
        Users
      </nuxt-link>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import MyTitle from '~/components/MyTitle.vue'

@Component({
  components: {
    MyTitle
  }
})
class Page extends Vue {}

export default Page
</script>

<style>
.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
