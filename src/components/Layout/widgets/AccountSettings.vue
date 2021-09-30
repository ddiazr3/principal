<template>
  <default-list
    :items="items"
    class="mb-n2"
  />
</template>

<script>
import DefaultList from '../DefaultList.vue'
export default {

  components: {
    DefaultList
  },

  data: () => ({
    items: [
      {
        title: 'John Leider',
        icon: 'mdi-vuetify',
        items: [
          {
            title: 'My Profile'
          },
          {
            title: 'Edit Profile'
          },
          {
            title: 'Settings'
          }
        ]
      }
    ]
  })
}
</script>
