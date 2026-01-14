<template>
  <div class="dg-container">
    <div 
      :class="['dg-trigger', `dg-trigger--${size}`]" 
      @click="openModal"
    >
      <div class="dg-trigger__icon-wrapper">
        <div class="dg-icon">{{ icon }}</div>
      </div>
      
      <div class="dg-trigger__content">
        <span class="dg-trigger__title">{{ title }}</span>
        
        <div v-if="size !== 'small'" class="dg-trigger__subtitle">
          <div>{{ subtitle }}</div>
        </div>

        <div v-if="size === 'large'" class="dg-trigger__extra">
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
// 确保路径正确，如果不确定可以用 @/ 别名
import { guideData } from '../data/guideData.js';
// 确保 CopyText 组件确实存在
import CopyText from './CopyText.vue';

export default {
  name: 'DecisionGuide',
  components: {
    CopyText
  },
  props: {
    treeId: { type: String, required: true },
    title: { type: String, default: '引导助手' },
    subtitle: { type: String, default: '点击开始引导' },
    icon: { type: String, default: '🧭' },
    size: { 
      type: String, 
      default: 'medium',
      validator: v => ['small', 'medium', 'large'].includes(v)
    }
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
    currentTree() {
      if (!guideData || !this.treeId) return null;
      return guideData[this.treeId];
    },
    currentNode() {
      if (!this.currentTree) return null;
      const targetId = this.currentNodeId || this.currentTree.startNode;
      const node = this.currentTree.nodes[targetId];
      
      if (!node) {
        console.warn(`[DecisionGuide] 找不到节点 ID: ${targetId}，请检查 guideData.js`);
        return null; 
      }
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
        const timeoutId = setTimeout(() => controller.abort(), 2500);
        
        await fetch('https://6.ipw.cn', { 
          mode: 'no-cors', 
          signal: controller.signal 
        }).catch(() => { throw new Error('Network Error'); });

        this.ipv6Support = true;
        clearTimeout(timeoutId);
      } catch (e) {
        this.ipv6Support = false;
      }
    },
    openModal() { 
      this.isVisible = true; 
      this.reset();
      this.$nextTick(() => {
        this.checkIPv6(); 
      });
    },
    closeModal() { this.isVisible = false; },
    handleSelect(nextNodeId) {
      if (!nextNodeId) {
        console.error("未配置 next 属性");
        return;
      }
      this.history.push(this.currentNodeId || this.currentTree.startNode);
      this.currentNodeId = nextNodeId;
    },
    goBack() { this.currentNodeId = this.history.pop(); },
    reset() { this.currentNodeId = ''; this.history = []; }
  }
}
</script>

<style scoped>
/* =========================================
   1. 触发器样式 (Trigger Styles)
   ========================================= */
.dg-trigger {
  background: rgba(140, 140, 140, 0.1);
  border: 1px solid rgba(140, 140, 140, 0.25);
  backdrop-filter: blur(8px);
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  overflow: hidden;
  color: inherit;
  text-align: center;
}

.dg-trigger:hover {
  transform: translateY(-4px);
  border-color: rgba(62, 175, 124, 0.5);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

/* 尺寸变体 */
.dg-trigger--small {
  border-radius: 50px;
  padding: 8px 12px 8px 10px;
  display: inline-flex;
  align-items: center;
  gap: 10px;
}
.dg-trigger--small .dg-icon { font-size: 1.2rem; }

.dg-trigger--medium {
  border-radius: 12px;
  width: 150px;
  padding: 16px 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.dg-trigger--medium .dg-icon { font-size: 2.5rem; margin-bottom: 8px; }

.dg-trigger--large {
  border-radius: 16px;
  width: 260px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.dg-trigger--large .dg-icon { font-size: 3.5rem; margin-bottom: 16px; }

/* 触发器内部元素 */
.dg-trigger__content { display: flex; flex-direction: column; align-items: center; }
.dg-trigger__title { font-weight: bold; font-size: 1.2rem;}
.dg-trigger__subtitle { opacity: 0.8; font-size: 0.8rem; margin-top: 4px; }
.dg-trigger__extra { width: 100%; margin-top: 10px; }

.dg-divider { height: 1px; background: rgba(255,255,255,0.1); width: 100%; margin: 12px 0; }
.dg-status-row { display: flex; justify-content: center; align-items: center; font-size: 0.85rem; }
.dg-label { opacity: 0.6; margin-right: 6px; }
.dg-value.success { color: #3eaf7c; font-weight: 500; }

/* =========================================
   2. 弹窗样式 (Modal Styles)
   ========================================= */
.dg-modal-overlay {
  position: fixed; top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(10px);
  z-index: 2000;
  display: flex; align-items: center; justify-content: center;
}

.dg-modal-card {
  background: rgba(40, 40, 45, 0.98);
  color: #fff;
  width: 85%; max-width: 420px;
  border-radius: 16px;
  padding: 24px;
  position: relative;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
}

.dg-close-btn {
  position: absolute; top: 12px; right: 12px;
  background: none; border: none;
  font-size: 24px; color: rgba(255,255,255,0.6);
  cursor: pointer;
}
.dg-close-btn:hover { color: #fff; }

.dg-modal-header { text-align: center; margin-bottom: 20px; }
.dg-icon-large { font-size: 3rem; margin-bottom: 10px; }
.dg-modal-header h3 { margin: 0 0 8px 0; font-size: 1.5rem; }

.dg-step-badge {
  background: rgba(62, 175, 124, 0.9);
  color: white;
  font-size: 0.75rem;
  padding: 3px 10px;
  border-radius: 4px;
  font-weight: 600;
}

/* =========================================
   3. 内部组件与逻辑 (Internal Components)
   ========================================= */

/* 状态栏 */
.dg-status-bar { margin-bottom: 15px; display: flex; justify-content: center; }
.dg-tag { font-size: 0.8rem; padding: 4px 15px; border-radius: 15px; border: 1px solid transparent; }
.dg-tag.success { background: rgba(62, 175, 124, 0.15); color: #3eaf7c; border-color: rgba(62, 175, 124, 0.3); }
.dg-tag.warning { background: rgba(230, 126, 34, 0.1); color: #e67e22; border-color: rgba(230, 126, 34, 0.3); }

/* 错误提示 */
.dg-error-tip {
  color: #ff4e4e; text-align: center; padding: 20px;
  background: rgba(255, 78, 78, 0.1);
  border-radius: 8px; font-size: 0.9rem;
}
.dg-btn-reset { margin-top: 10px; padding: 5px 15px; cursor: pointer; }

/* 决策部分 */
.dg-question { font-size: 1.1rem; margin-bottom: 15px; line-height: 1.5; }
.dg-options-list { display: flex; flex-direction: column; gap: 10px; }

.dg-option-item {
  background: rgba(255, 255, 255, 0.08);
  padding: 14px 20px;
  border-radius: 10px;
  display: flex; justify-content: space-between; align-items: center;
  cursor: pointer;
  transition: all 0.2s ease;
  border-left: 3px solid transparent;
}
.dg-option-item:hover {
  background: rgba(62, 175, 124, 0.15);
  border-left-color: #3eaf7c;
  transform: translateX(5px);
}
.dg-option-label { font-weight: 500; }
.dg-option-arrow { opacity: 0.5; }

/* 结果部分 */
.dg-result-box h3.dg-result-heading {
  font-size: 1rem; opacity: 0.8; margin-bottom: 10px; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 5px;
}
.dg-result-card {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 20px;
  text-align: center;
  margin: 15px 0;
  border: 1px solid rgba(62, 175, 124, 0.2);
}
.dg-result-title { color: #3eaf7c; font-weight: bold; margin-bottom: 8px; font-size: 1.2rem; }
.dg-copy-wrapper { margin-top: 10px; display: flex; justify-content: center; }

.dg-description {
  margin-top: 15px; padding: 10px;
  background: rgba(62, 175, 124, 0.1);
  border-left: 3px solid #3eaf7c;
  border-radius: 8px;
  font-style: italic; font-size: 0.9rem;
}
.dg-description p { margin: 0; line-height: 1.5; }

/* 底部按钮 */
.dg-actions {
  border-top: 1px dashed rgba(255, 255, 255, 0.2);
  margin-top: 20px; padding-top: 15px;
  display: flex; gap: 10px; justify-content: center;
}
.dg-btn-back {
  background: rgba(255,255,255,0.1);
  border: none; color: #fff;
  padding: 8px 16px; border-radius: 6px;
  cursor: pointer; font-size: 0.85rem;
  transition: background 0.2s;
}
.dg-btn-back:hover { background: rgba(255,255,255,0.2); }

/* 动画 */
.dg-fade-enter-active, .dg-fade-leave-active { transition: all 0.25s ease; }
.dg-fade-enter-from, .dg-fade-leave-to { opacity: 0; transform: scale(0.95); }
</style>