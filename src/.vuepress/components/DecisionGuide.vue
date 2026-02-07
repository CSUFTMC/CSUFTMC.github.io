<template>
  <div class="dg-container" :style="containerStyles">
    <div 
      :class="['dg-trigger', `dg-trigger--${size}`]" 
      :style="customStyles"
      @click="openModal"
    >
      <div class="dg-trigger__icon-wrapper">
        <div class="dg-icon">{{ icon }}</div>
      </div>
      
      <div class="dg-trigger__content">
        <span class="dg-trigger__title">{{ title }}</span>
        
        <div v-if="size !== 'small' || isCustom" class="dg-trigger__subtitle">
          <div>{{ subtitle }}</div>
        </div>

        <div v-if="size === 'large' || (isCustom && showExtra)" class="dg-trigger__extra">
          <div class="dg-divider"></div>
          <div class="dg-status-row">
            <span class="dg-label">状态:</span>
            <span class="dg-value success">可用</span>
          </div>
        </div>
      </div>
    </div>

    <transition name="dg-fade">
      <div v-if="isVisible" class="dg-modal-overlay" @click.self="closeModal">
        <div class="dg-modal-card">
          <button class="dg-close-btn" @click="closeModal">×</button>
          
          <div class="dg-modal-header">
            <div class="dg-icon-large">{{ icon }}</div>
            <h3>{{ title }}</h3>
            <span class="dg-step-badge">{{ stepTitle }}</span>
          </div>
          
          <div class="dg-modal-body">
            <div v-if="!currentTree" class="dg-error-tip">
              ❌ 配置错误: 未找到 ID 为 "{{ treeId }}" 的决策树
            </div>

            <div v-else-if="!currentNode" class="dg-error-tip">
              ❌ 配置错误: 节点 "{{ currentNodeId || currentTree.startNode }}" 不存在
              <button class="dg-btn-reset" @click="reset">重置</button>
            </div>

            <template v-else>
              <div class="dg-status-bar" v-if="currentNode?.showIPv6 && ipv6Support !== null">
                <span v-if="ipv6Support" class="dg-tag success">✅ 当前网络支持 IPv6</span>
                <span v-else class="dg-tag warning">⚠️ 当前网络不支持 IPv6</span>
              </div>

              <div v-if="!isResult" class="dg-section-decision">
                <p class="dg-question">{{ currentNode?.question }}</p>
                <div class="dg-options-list">
                  <div 
                    v-for="(opt, index) in currentNode?.options" 
                    :key="index"
                    class="dg-option-item"
                    @click="handleSelect(opt.next)"
                  >
                    <span class="dg-option-label">{{ opt.label }}</span>
                    <span class="dg-option-arrow">→</span>
                  </div>
                </div>
              </div>

              <div v-else class="dg-section-result">
                <div class="dg-result-box">
                  <h3 class="dg-result-heading">建议选择</h3>
                  <div class="dg-result-card">
                    <div class="dg-result-title">{{ currentNode?.name }}</div>
                    <div class="dg-copy-wrapper">
                      <CopyText v-if="currentNode?.content" :text="currentNode.content" format="bold" />
                    </div>
                  </div>
                </div>
                <div v-if="currentNode?.desc" class="dg-description">
                  <p>{{ currentNode.desc }}</p>
                </div>
              </div>

              <div class="dg-actions">
                <button v-if="history.length > 0" class="dg-btn-back" @click="goBack">返回上一步</button>
                <button v-if="isResult" class="dg-btn-back" @click="reset">重新开始</button>
              </div>
            </template>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { guideData } from '../data/guideData.js';
import CopyText from './CopyText.vue';

export default {
  name: 'DecisionGuide',
  components: { CopyText },
  props: {
    treeId: { type: String, required: true },
    title: { type: String, default: '引导助手' },
    subtitle: { type: String, default: '点击开始引导' },
    icon: { type: String, default: '🧭' },
    size: { 
      type: String, 
      default: 'medium',
      validator: v => ['small', 'medium', 'large', 'custom'].includes(v)
    },
    // 自定义规格参数
    width: { type: String, default: 'auto' },
    gap: { type: String, default: '' },
    height: { type: String, default: 'auto' },
    padding: { type: String, default: '16px' },
    direction: { type: String, default: 'column' }, // row 或 column
    showExtra: { type: Boolean, default: false }
  },
  data() {
    return {
      isVisible: false,
      currentNodeId: '',
      history: [],
      ipv6Support: null 
    };
  },
  computed: {
    isCustom() {
      return this.size === 'custom';
    },
    // 控制外层容器的布局模式
    containerStyles() {
      const isFullWidth = this.isCustom && this.width === '100%';
      return {
        display: isFullWidth ? 'flex' : 'inline-block',
        width: isFullWidth ? '100%' : 'auto'
      };
    },
    // 控制触发器的内部布局
    customStyles() {
      if (!this.isCustom) return {};
      const layoutGap = this.gap || (this.direction === 'row' ? '15px' : '8px');
      return {
        width: this.width,
        height: this.height,
        padding: this.padding,
        flexDirection: this.direction,
        display: 'flex',
        alignItems: 'center',
        justifyContent: this.direction === 'row' ? 'flex-start' : 'center',
        gap: layoutGap
      };
    },
    currentTree() {
      if (!guideData || !this.treeId) return null;
      return guideData[this.treeId];
    },
    currentNode() {
      if (!this.currentTree) return null;
      const targetId = this.currentNodeId || this.currentTree.startNode;
      const node = this.currentTree.nodes[targetId];
      if (!node) return null; 
      return node;
    },
    isResult() { 
      return this.currentNode?.type === 'result'; 
    },
    stepTitle() { 
      return this.isResult ? '匹配完成' : `进度 (${this.history.length + 1})`; 
    }
  },
  methods: {
    async checkIPv6() {
      if (this.ipv6Support !== null) return;
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 2000);
        await fetch('https://6.ipw.cn', { mode: 'no-cors', signal: controller.signal });
        this.ipv6Support = true;
        clearTimeout(timeoutId);
      } catch (e) {
        this.ipv6Support = false;
      }
    },
    openModal() { 
      this.isVisible = true; 
      this.reset();
      this.$nextTick(() => this.checkIPv6());
    },
    closeModal() { this.isVisible = false; },
    handleSelect(nextNodeId) {
      if (!nextNodeId) return;
      this.history.push(this.currentNodeId || this.currentTree.startNode);
      this.currentNodeId = nextNodeId;
    },
    goBack() { this.currentNodeId = this.history.pop(); },
    reset() { this.currentNodeId = ''; this.history = []; }
  }
}
</script>

<style scoped>
/* 基础容器 */
.dg-container {
  vertical-align: middle;
}

/* 触发器基础样式 */
.dg-trigger {
  background: rgba(140, 140, 140, 0.1);
  border: 1px solid rgba(140, 140, 140, 0.25);
  backdrop-filter: blur(8px);
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  overflow: hidden;
  color: inherit;
  box-sizing: border-box; /* 核心：确保 width 100% 时包含 padding */
}

.dg-trigger:hover {
  transform: translateY(-2px);
  border-color: #3eaf7c;
  background: rgba(62, 175, 124, 0.05);
}

/* 规格定义 */
.dg-trigger--small {
  border-radius: 50px;
  padding: 8px 16px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
}
.dg-trigger--small .dg-icon { font-size: 1.1rem; }

.dg-trigger--medium {
  border-radius: 12px;
  width: 160px;
  padding: 20px 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}
.dg-trigger--medium .dg-icon { font-size: 2.2rem; margin-bottom: 8px; }

.dg-trigger--large {
  border-radius: 16px;
  width: 280px;
  padding: 30px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}
.dg-trigger--large .dg-icon { font-size: 3.2rem; margin-bottom: 12px; }

/* 自定义柔性布局样式 */
.dg-trigger--custom {
  border-radius: 12px;
}
.dg-trigger--custom .dg-trigger__content {
  flex: 1;
  display: flex;
  flex-direction: column;
  text-align: inherit;
}
.dg-trigger--custom .dg-icon {
  font-size: 1.8rem;
}

/* 内部文字样式 */
.dg-trigger__title { font-weight: bold; font-size: 1.1rem; line-height: 1.2; }
.dg-trigger__subtitle { opacity: 0.7; font-size: 0.8rem; margin-top: 4px; }
.dg-trigger__extra { width: 100%; margin-top: 5px; }
.dg-divider { height: 1px; background: rgba(255,255,255,0.1); width: 100%; margin: 10px 0; }
.dg-status-row { display: flex; align-items: center; font-size: 0.75rem; gap: 5px; }
.dg-value.success { color: #3eaf7c; font-weight: bold; }

/* 弹窗样式 */
.dg-modal-overlay {
  position: fixed; top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(6px);
  z-index: 9999;
  display: flex; align-items: center; justify-content: center;
}

.dg-modal-card {
  background: #1e1e22;
  color: #eee;
  width: 90%; max-width: 400px;
  border-radius: 16px;
  padding: 24px;
  position: relative;
  border: 1px solid rgba(255,255,255,0.1);
}

.dg-close-btn {
  position: absolute; top: 15px; right: 15px;
  background: none; border: none; font-size: 20px; color: #888; cursor: pointer;
}

.dg-modal-header { text-align: center; margin-bottom: 20px; }
.dg-icon-large { font-size: 2.8rem; margin-bottom: 10px; }
.dg-step-badge { background: #3eaf7c; color: #fff; font-size: 0.7rem; padding: 2px 8px; border-radius: 4px; }

.dg-status-bar { margin-bottom: 15px; text-align: center; }
.dg-tag { font-size: 0.75rem; padding: 4px 12px; border-radius: 20px; }
.dg-tag.success { background: rgba(62, 175, 124, 0.1); color: #3eaf7c; }
.dg-tag.warning { background: rgba(230, 126, 34, 0.1); color: #e67e22; }

.dg-question { font-size: 1.1rem; margin-bottom: 20px; color: #fff; }
.dg-options-list { display: flex; flex-direction: column; gap: 12px; }
.dg-option-item {
  background: rgba(255,255,255,0.05);
  padding: 15px; border-radius: 10px;
  display: flex; justify-content: space-between; cursor: pointer;
  transition: 0.2s;
}
.dg-option-item:hover { background: rgba(62, 175, 124, 0.15); transform: translateX(4px); }

.dg-result-card {
  background: rgba(62, 175, 124, 0.05);
  border: 1px solid rgba(62, 175, 124, 0.3);
  border-radius: 12px; padding: 20px; text-align: center;
}
.dg-result-title { color: #3eaf7c; font-size: 1.2rem; font-weight: bold; margin-bottom: 10px; }

.dg-description {
  margin-top: 15px; padding: 12px; font-size: 0.85rem;
  background: rgba(255,255,255,0.03); border-radius: 8px; color: #aaa;
}

.dg-actions { margin-top: 25px; display: flex; gap: 10px; justify-content: center; }
.dg-btn-back { background: #333; border: none; color: #ccc; padding: 8px 16px; border-radius: 6px; cursor: pointer; }

.dg-fade-enter-active, .dg-fade-leave-active { transition: opacity 0.3s, transform 0.3s; }
.dg-fade-enter-from, .dg-fade-leave-to { opacity: 0; transform: scale(0.95); }
</style>