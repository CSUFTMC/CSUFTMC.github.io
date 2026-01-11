<template>
  <div :class="['player-list-wrapper', `list-size-${size}`]">
    <McProfile 
      v-for="p in filteredList" 
      :key="p.username"
      :username="p.username"
      :size="size" 
    />
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { playerGroups } from '../data/players.js';
import McProfile from "./McProfile.vue";

const props = defineProps({
  username: { type: String, default: '' },
  type: { type: String, default: '' },
  role: { type: String, default: '' },
  size: { type: String, default: 'medium' }
});

const filteredList = computed(() => {
  // 提取所有玩家并去重
  const allGroups = Object.values(playerGroups).flat();
  const uniqueMap = new Map();
  allGroups.forEach(p => { if (p.username) uniqueMap.set(p.username, p); });
  const allUniquePlayers = Array.from(uniqueMap.values());

  // 1. 按用户名筛选
  if (props.username) {
    const targets = props.username.split(',').map(s => s.trim());
    return targets.map(name => allUniquePlayers.find(p => p.username === name)).filter(p => p);
  }

  // 2. 按分组类型筛选
  if (props.type && props.type !== 'all') {
    const targets = props.type.split(',').map(s => s.trim());
    const result = [];
    targets.forEach(t => { if (playerGroups[t]) result.push(...playerGroups[t]); });
    // 去重，防止一个玩家在多个组中重复显示
    return result.filter((v, i, a) => a.findIndex(t => t.username === v.username) === i);
  }

  // 3. 按角色筛选
  if (props.role && props.role !== 'all') {
    const targets = props.role.split(',').map(s => s.trim());
    return allUniquePlayers.filter(p => p.role && targets.includes(p.role));
  }

  return allUniquePlayers;
});
</script>

<style scoped>
.player-list-wrapper { 
  display: flex; 
  flex-wrap: wrap; 
  gap: 12px; 
  align-items: center; 
  margin: 10px 0;
}
.list-size-small { gap: 8px; }
</style>