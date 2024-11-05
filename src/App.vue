<template>
  <BaseLayout>
    <router-view />
  </BaseLayout>
</template>

<script>

import BaseLayout  from "./components/Layout.vue";
export default {
  name: "App",
  components: {
    BaseLayout,
  },
};
</script>
