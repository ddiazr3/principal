<template>
  <v-footer
    id="default-footer"
    color="transparent"
    absolute
    app
    inset
    style="left:0px !important"
  >
    <Link />
  </v-footer>
</template>

<script>
// Components
import Link from '../view/Link.vue'

export default {
  name: 'DefaultFooter',

  components: { Link }
}
</script>
