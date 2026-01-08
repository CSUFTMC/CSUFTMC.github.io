<template>
  <component 
    :is="tagType" 
    class="copy-wrapper" 
    :class="[format, { copied: copied }]"
    @click="copyText"
    :title="copied ? '复制成功' : '点击复制'"
  >
    
    <span class="text-content">
      <slot>{{ text }}</slot>
    </span>
    
    <button class="copy-btn">
      <svg v-if="!copied" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
      <svg v-else xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
    </button>
  </component>
</template>

<script>
export default {
  name: 'CopyText',
  props: {
    text: { type: String, required: true },
    format: { type: String, default: '' }
  },
  data() { return { copied: false } },
  computed: {
    tagType() {
      switch (this.format) {
        case 'code': return 'code';
        case 'del': return 's';
        case 'bold': return 'strong';
        default: return 'span';
      }
    }
  },
  methods: {
    async copyText() {
      if (!this.text) return;
      try {
        await navigator.clipboard.writeText(this.text);
        this.copied = true;
        setTimeout(() => { this.copied = false; }, 2000);
      } catch (err) { console.error('复制失败:', err); }
    }
  }
}
</script>

<style scoped>
.copy-wrapper {
  display: inline-flex;
  align-items: center;
  vertical-align: middle;
  max-width: 100%;
  border-radius: 4px;
  padding: 0 4px;
  transition: all 0.2s;
  

  cursor: pointer;
}

/* 样式变体 */
code.copy-wrapper.code {
  color: var(--c-text-accent, #c0c0c0);
  background-color: var(--c-bg-code, rgba(127, 127, 127, 0.15));
  font-family: monospace;
  font-size: 0.85em;
  padding: 2px 6px;
  border-radius: 4px;
  margin: 0 2px;
}

.copy-wrapper.del {
  text-decoration: line-through;
  opacity: 0.8;
}

.copy-wrapper.bold {
  font-weight: bold;
}

/* 悬停效果：整体背景变色，提示整体是一个按钮 */
.copy-wrapper:hover {
  background-color: rgba(128, 128, 128, 0.15);
}
code.copy-wrapper.code:hover {
  background-color: var(--c-bg-code-hover, rgba(127, 127, 127, 0.25));
}

/* 悬停时文字颜色也稍微高亮一点 */
.copy-wrapper:hover .text-content {
  color: var(--c-brand);
}

.text-content {
  margin-right: 4px;
  color: inherit;
  transition: color 0.2s;
}

.copy-btn {
  background: none;
  border: none;
  padding: 0;
  cursor: inherit; 
  color: currentColor; 
  opacity: 0.5;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  font-size: 1.1em;
  text-decoration: none;
  font-weight: normal;
}

/* 整体悬停时，按钮也高亮 */
.copy-wrapper:hover .copy-btn {
  opacity: 1;
  color: var(--c-brand, #3eaf7c);
  transform: scale(1.1);
}
</style>