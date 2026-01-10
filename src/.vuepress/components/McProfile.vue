<template>
  <div class="mc-profile-wrapper">
    <div 
      :class="['mc-card-trigger', `size-${size}`]" 
      @click="showDetails = true"
    >
      <div class="avatar-wrapper">
        <img :src="avatarUrl" alt="Avatar" class="mc-avatar">
      </div>
      
      <div class="mc-content">
        <span class="mc-username">{{ username }}</span>
        
        <div v-if="size !== 'small'" class="mc-meta">
          <div v-if="qq" class="meta-row">
            <span class="meta-icon">🐧</span> {{ qq }}
          </div>
          <div v-if="joinDate" class="meta-row">
            <span class="meta-icon">📅</span> {{ joinDate }}
          </div>
        </div>

        <div v-if="size === 'large' && customInfo.length > 0" class="mc-custom-preview">
          <div class="divider"></div>
          <div class="custom-row" v-for="(item, index) in customInfo" :key="index">
            <span class="c-label">{{ item.label }}:</span>
            <span class="c-value" v-html="parseLink(item.value)"></span>
          </div>
        </div>
      </div>
    </div>

    <transition name="fade-pop">
      <div v-if="showDetails" class="mc-modal-overlay" @click.self="showDetails = false">
        <div class="mc-modal-card">
          <button class="close-btn" @click="showDetails = false">×</button>
          
          <div class="modal-header">
            <img :src="avatarUrl" class="modal-avatar">
            <h3>{{ username }}</h3>
            <span class="role-badge" :style="roleBadgeStyle">{{ role }}</span>
          </div>
          
          <div class="modal-body">
            <div class="info-grid">
              <div class="grid-item" v-if="qq">
                <small>QQ</small> <span>{{ qq }}</span>
              </div>
              <div class="grid-item" v-if="joinDate">
                <small>加入时间</small> <span>{{ joinDate }}</span>
              </div>
              
              <div class="grid-item" v-for="(item, i) in customInfo" :key="i">
                <small>{{ item.label }}</small> 
                <span v-html="parseLink(item.value)"></span>
              </div>
            </div>
            
            <div class="slot-area" v-if="$slots.default">
              <slot></slot>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'McProfile',
  props: {
    username: { type: String, required: true },
    qq: { type: [String, Number], default: '' },
    joinDate: { type: String, default: '' },
    customInfo: { type: Array, default: () => [] },
    size: { 
      type: String, 
      default: 'medium',
      validator: v => ['small', 'medium', 'large'].includes(v)
    },
    // 身份字段，默认显示 Player
    role: { 
      type: String, 
      default: 'Player' 
    }
  },
  data() {
    return { showDetails: false }
  },
  computed: {
    avatarUrl() {
      // 使用 2D 面部 API
      return `https://nmsr.nickac.dev/face/${this.username}`;
    },
    // 根据 role 的值返回不同的背景色
    roleBadgeStyle() {
      const r = this.role.toLowerCase();
      
      if (['admin', 'owner', 'op', '管理员', '腐竹'].includes(r)) {
        // 管理员颜色：红色
        return { background: 'rgba(220, 38, 38, 0.9)' };
      } 
      else if (['player', 'user', '玩家', '成员'].includes(r)) {
        // 玩家颜色：Vue 绿
        return { background: 'rgba(62, 175, 124, 0.9)' };
      } 
      else {
        // 其他自定义身份（如 VIP, Builder）：蓝色
        return { background: 'rgba(14, 165, 233, 0.9)' };
      }
    }
  },
  methods: {
    // 解析 Markdown 链接格式 [文字](链接)
    parseLink(text) {
      if (typeof text !== 'string') return text;
      const mdLinkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
      return text.replace(mdLinkRegex, '<a href="$2" target="_blank" rel="noopener noreferrer" class="mc-link">$1</a>');
    }
  }
}
</script>

<style scoped>
/* --- 全局容器 --- */
.mc-profile-wrapper {
  display: inline-block;
  margin: 10px;
  vertical-align: top;
  font-family: inherit;
  line-height: 1.5;
}

/* --- 卡片通用样式 (Glassmorphism) --- */
.mc-card-trigger {
  /* 基础背景：灰色半透明，适配亮/暗模式 */
  background: rgba(140, 140, 140, 0.1);
  border: 1px solid rgba(140, 140, 140, 0.25);
  backdrop-filter: blur(8px); 
  -webkit-backdrop-filter: blur(8px);
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  overflow: hidden;
  position: relative;
  box-sizing: border-box;
  color: inherit; /* 继承父级文字颜色 */
}

.mc-card-trigger:hover {
  transform: translateY(-4px);
  background: rgba(140, 140, 140, 0.18);
  border-color: rgba(62, 175, 124, 0.5); /* 悬浮微微泛绿 */
  box-shadow: 0 8px 20px rgba(0,0,0,0.15);
}

/* --- 规格: Small --- */
.size-small {
  border-radius: 50px;
  padding: 4px 14px 4px 4px;
  display: inline-flex;
  align-items: center;
  gap: 10px;
}
.size-small .mc-avatar {
  width: 28px; height: 28px;
  border-radius: 50%;
  border: 1px solid rgba(140, 140, 140, 0.3);
}
.size-small .mc-username {
  font-weight: 600;
  font-size: 0.9rem;
}

/* --- 规格: Medium --- */
.size-medium {
  border-radius: 12px;
  width: 150px;
  padding: 16px 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}
.size-medium .mc-avatar {
  width: 56px; height: 56px;
  border-radius: 10px;
  margin-bottom: 10px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}
.size-medium .mc-username {
  font-size: 1rem;
  font-weight: bold;
  margin-bottom: 6px;
  display: block;
}

/* --- 规格: Large --- */
.size-large {
  border-radius: 16px;
  width: 260px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}
.size-large .mc-avatar {
  width: 72px; height: 72px;
  border-radius: 14px;
  margin-bottom: 16px;
  box-shadow: 0 6px 12px rgba(0,0,0,0.15);
}
.size-large .mc-username {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 12px;
}
.size-large .divider {
  width: 100%;
  height: 1px;
  background: rgba(140, 140, 140, 0.2);
  margin: 12px 0;
}

/* --- 信息文字通用 --- */
.mc-meta, .c-label, small {
  opacity: 0.75; 
  font-size: 0.85rem;
}
.meta-row, .custom-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
  width: 100%;
}
.size-medium .meta-row { justify-content: center; gap: 6px; }

/* --- 弹窗 (Modal) --- */
.mc-modal-overlay {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(5px);
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.mc-modal-card {
  background: rgba(40, 40, 45, 0.98);
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.1);
  width: 80%;
  max-width: 360px;
  border-radius: 16px;
  padding: 24px;
  position: relative;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
}

.close-btn {
  position: absolute; top: 12px; right: 12px;
  background: none; border: none;
  font-size: 20px; color: rgba(255, 255, 255, 0.6);
  cursor: pointer;
}
.close-btn:hover { color: #fff; }

.modal-header { text-align: center; margin-bottom: 20px; }
.modal-avatar { width: 80px; height: 80px; border-radius: 16px; margin-bottom: 10px; }
.modal-header h3 { margin-top: 3px; margin-bottom: 8px; color: white;}

/* 身份标签样式 */
.role-badge { 
  /* 背景色由 :style 控制 */
  color: white; 
  font-size: 0.75rem; 
  padding: 3px 10px; 
  border-radius: 4px; 
  text-transform: uppercase;
  font-weight: 600;
  letter-spacing: 0.5px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
  display: inline-block;
}

.info-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-bottom: 16px;
}
.grid-item {
  display: flex;
  flex-direction: column;
  background: rgba(255, 255, 255, 0.08);
  padding: 10px;
  border-radius: 8px;
}
.grid-item small { color: rgba(255, 255, 255, 0.6); margin-bottom: 2px;}
.grid-item span { font-weight: 500; color: #fff; word-break: break-all; }

.slot-area {
  border-top: 1px dashed rgba(255, 255, 255, 0.2);
  padding-top: 15px;
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.9rem;
  line-height: 1.5;
}

/* --- 链接样式 --- */
/* 使用 :deep() 穿透 v-html 内容 */
.mc-profile-wrapper :deep(a) {
  color: #3eaf7c;
  text-decoration: none;
  transition: opacity 0.2s;
}
.mc-profile-wrapper :deep(a:hover) {
  opacity: 0.8;
  text-decoration: underline;
}

/* --- 动画 --- */
.fade-pop-enter-active, .fade-pop-leave-active {
  transition: all 0.2s ease;
}
.fade-pop-enter-from, .fade-pop-leave-to {
  opacity: 0;
  transform: scale(0.95) translateY(10px);
}
</style>