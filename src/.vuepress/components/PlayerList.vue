<template>
  <div :class="['player-list-wrapper', `list-size-${size}`]">
    <McProfile 
      v-for="p in filteredList" 
      :key="p.username"
      v-bind="p"
      :size="size" 
    >
      <p v-if="p.desc">{{ p.desc }}</p>
    </McProfile>
  </div>
</template>

<script setup>
import { computed } from 'vue';
// 导入数据和基础组件
import { playerGroups } from '../data/players.js';
import McProfile from "./McProfile.vue";

const props = defineProps({
  // 筛选方式 1：指定 js 中的列表名 (如 "management,members")
  type: {
    type: String,
    default: ''
  },
  // 筛选方式 2：跨列表指定角色 (如 "Admin,建筑师")
  role: {
    type: String,
    default: ''
  },
  // 尺寸选择：small, medium, large
  size: {
    type: String,
    default: 'medium',
    validator: v => ['small', 'medium', 'large'].includes(v)
  }
});

const filteredList = computed(() => {
  // --- 1. 基础准备：获取所有列表中的玩家并按 username 全局去重 ---
  const allGroups = Object.values(playerGroups).flat();
  const uniqueMap = new Map();
  allGroups.forEach(p => {
    if (p.username) uniqueMap.set(p.username, p);
  });
  const allUniquePlayers = Array.from(uniqueMap.values());

  // --- 2. 处理 Type 筛选 (支持逗号分隔或 'all') ---
  if (props.type && props.type !== 'all') {
    const targetTypes = props.type.split(',').map(s => s.trim());
    const result = [];
    targetTypes.forEach(t => {
      if (playerGroups[t]) result.push(...playerGroups[t]);
    });
    // 选定组内去重
    const typeMap = new Map();
    result.forEach(p => typeMap.set(p.username, p));
    return Array.from(typeMap.values());
  }

  // --- 3. 处理 Role 筛选 (支持逗号分隔或 'all') ---
  if (props.role && props.role !== 'all') {
    const targetRoles = props.role.split(',').map(s => s.trim());
    return allUniquePlayers.filter(p => p.role && targetRoles.includes(p.role));
  }

  // --- 4. 默认逻辑：无参数或参数为 'all' 时，返回去重后的全员 ---
  return allUniquePlayers;
});
</script>

<style scoped>
/* 列表容器：使用 Flex 布局 */
.player-list-wrapper {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  /* Medium 和 Large 模式下的标准间距 */
  gap: 16px; 
  margin: 10px 0;
}

/* --- Small 模式下的特殊间距优化 --- */
.list-size-small {
  /* 极致紧凑：上下 4px，左右 6px */
  gap: 8px 10px; 
}

/* 使用 :deep 穿透覆盖 McProfile 内部自带的 10px margin。
   这样可以完全由父容器的 gap 属性控制间距。
*/
.list-size-small :deep(.mc-profile-wrapper) {
  margin: 0 !important;
}

/* Medium 模式微调 */
.list-size-medium :deep(.mc-profile-wrapper) {
  margin: 0 !important;
}

/* Large 模式微调 */
.list-size-large :deep(.mc-profile-wrapper) {
  margin: 0 !important;
}
</style>