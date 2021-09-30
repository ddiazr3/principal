<template>
  <v-list
    expand
    nav
    v-bind="$attrs"
    v-on="$listeners"
  >
    <template v-for="(item, i) in items">
      <default-list-group
        v-if="item.items"
        :key="`group-${i}`"
        :item="item"
      />

      <default-list-item
        v-else
        :key="`item-${i}`"
        :item="item"
      />
    </template>
  </v-list>
</template>

<script>
import DefaultListGroup from './DefaultListGroup.vue'
import DefaultListItem from './DefaultListItem.vue'
export default {

  components: {
    DefaultListGroup,
    DefaultListItem
  },

  props: {
    items: {
      type: Array,
      default: () => ([])
    }
  }
}
</script>
