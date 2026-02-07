---
title: 排行榜
icon: trophy
photoSwipe: false
order: 200
home: true
heroText: false
tagline: false

---

<ClientOnly>
  <Rankings />
</ClientOnly>

<script setup>
import Rankings from "@source/.vuepress/components/Rankings.vue";
</script>