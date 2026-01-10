<template>
  <span :class="['player-list-wrapper', `list-size-${size}`]">
    <McProfile 
      v-for="p in filteredList" 
      :key="p.username"
      v-bind="p"
      :size="size" 
    >
      <p v-if="p.desc">{{ p.desc }}</p>
    </McProfile>
  </span>
</template>

<script setup>
import { computed } from 'vue';
import { playerGroups } from '../data/players.js';
import McProfile from "./McProfile.vue";

const props = defineProps({
  username: { type: String, default: '' },
  type: { type: String, default: '' },
  role: { type: String, default: '' },
  size: { 
    type: String, 
    default: 'medium',
    validator: v => ['small', 'medium', 'large'].includes(v)
  }
});

const filteredList = computed(() => {
  // 基础池与全局去重
  const allGroups = Object.values(playerGroups).flat();
  const uniqueMap = new Map();
  allGroups.forEach(p => { if (p.username) uniqueMap.set(p.username, p); });
  const allUniquePlayers = Array.from(uniqueMap.values());

  // 1. 按用户名筛选
  if (props.username) {
    const targetNames = props.username.split(',').map(s => s.trim());
    return targetNames.map(name => allUniquePlayers.find(p => p.username === name)).filter(p => p);
  }

  // 2. 按 Type 筛选
  if (props.type && props.type !== 'all') {
    const targetTypes = props.type.split(',').map(s => s.trim());
    const result = [];
    targetTypes.forEach(t => { if (playerGroups[t]) result.push(...playerGroups[t]); });
    const typeMap = new Map();
    result.forEach(p => typeMap.set(p.username, p));
    return Array.from(typeMap.values());
  }

  // 3. 按 Role 筛选
  if (props.role && props.role !== 'all') {
    const targetRoles = props.role.split(',').map(s => s.trim());
    return allUniquePlayers.filter(p => p.role && targetRoles.includes(p.role));
  }

  return allUniquePlayers;
});
</script>

<style scoped>
.player-list-wrapper {
  display: inline-flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
  vertical-align: middle;
}

/* Small 尺寸：极致紧凑优化 */
.list-size-small {
  gap: 4px 6px;
  margin: 0 2px;
}

/* 强制抹除 McProfile 原有的外边距 */
.player-list-wrapper :deep(.mc-profile-wrapper) {
  margin: 0 !important;
  display: inline-block;
  vertical-align: middle;
  line-height: 1;
}

/* Medium 和 Large 保持块级感 */
.list-size-medium, .list-size-large {
  display: flex;
  margin: 10px 0;
  gap: 16px;
}
</style>