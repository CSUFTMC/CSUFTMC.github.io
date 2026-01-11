<template>
  <div class="mc-profile-outer">
    <div 
      v-if="!isExternalMode"
      :class="['mc-card-trigger', `size-${size}`]" 
      @click="innerShow = true"
    >
      <div class="avatar-wrapper">
        <img :src="avatarUrl" alt="Avatar" class="mc-avatar" no-view>
      </div>
      
      <div class="mc-content">
        <span class="mc-username">{{ profile.username }}</span>
        
        <div v-if="size !== 'small'" class="mc-meta">
          <div v-if="profile.qq" class="meta-row">
            <span class="meta-icon">🐧</span> {{ profile.qq }}
          </div>
          <div v-if="profile.joinDate" class="meta-row">
            <span class="meta-icon">📅</span> {{ profile.joinDate }}
          </div>
        </div>

        <div v-if="size === 'large' && profile.customInfo && profile.customInfo.length > 0" class="mc-custom-preview">
          <div class="divider"></div>
          <div class="custom-row" v-for="(item, index) in profile.customInfo.slice(0, 2)" :key="index">
            <span class="c-label">{{ item.label }}:</span>
            <span class="c-value" v-html="parseLink(item.value)"></span>
          </div>
        </div>
      </div>
    </div>

    <transition name="fade-pop">
      <div v-if="isVisible" class="mc-modal-overlay" @click.self="closeModal">
        <div class="mc-modal-card">
          <button class="close-btn" @click="closeModal">×</button>
          
          <div class="modal-header">
            <img :src="avatarUrl" class="modal-avatar" no-view>
            <h3>{{ profile.username }}</h3>
            <span class="role-badge" :style="roleBadgeStyle">{{ profile.role || 'Player' }}</span>
          </div>
          
          <div class="modal-body">
            <div class="info-grid">
              <div class="grid-item" v-if="profile.qq">
                <small>QQ</small> <span>{{ profile.qq }}</span>
              </div>
              <div class="grid-item" v-if="profile.joinDate">
                <small>加入时间</small> <span>{{ profile.joinDate }}</span>
              </div>
              <div class="grid-item" v-for="(item, i) in profile.customInfo" :key="i">
                <small>{{ item.label }}</small> 
                <span v-html="parseLink(item.value)"></span>
              </div>
            </div>

            <div v-if="profile.desc" class="desc-section">
               <p class="desc-text">{{ profile.desc }}</p>
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
import players from '../data/players.js';

export default {
  name: 'McProfile',
  props: {
    username: { type: String, default: '' },
    playerProfile: { type: Object, default: null }, // 排行榜模式传参
    showDetails: { type: Boolean, default: false }, // 排行榜模式控制
    size: { 
      type: String, 
      default: 'medium',
      validator: v => ['small', 'medium', 'large'].includes(v)
    }
  },
  data() {
    return { innerShow: false };
  },
  computed: {
    // 判断是否为排行榜这种“外部控制”模式
    isExternalMode() {
      return !!this.playerProfile;
    },
    isVisible() {
      return this.isExternalMode ? this.showDetails : this.innerShow;
    },
    profile() {
      const name = this.isExternalMode ? this.playerProfile.username : this.username;
      const staticData = players[name] || {};
      return {
        username: name,
        role: '玩家',
        ...staticData,
        ...(this.playerProfile || {})
      };
    },
    avatarUrl() {
      return this.profile.username ? `https://nmsr.nickac.dev/face/${this.profile.username}` : '';
    },
    roleBadgeStyle() {
      const r = (this.profile.role || '').toLowerCase();
      if (['admin', 'owner', 'op', '管理员', '腐竹'].includes(r)) return { background: 'rgba(220, 38, 38, 0.9)' };
      if (['player', 'user', '玩家', '成员'].includes(r)) return { background: 'rgba(62, 175, 124, 0.9)' };
      return { background: 'rgba(14, 165, 233, 0.9)' };
    }
  },
  methods: {
    closeModal() {
      this.innerShow = false;
      this.$emit('update:showDetails', false);
    },
    parseLink(text) {
      if (typeof text !== 'string') return text;
      const mdLinkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
      return text.replace(mdLinkRegex, '<a href="$2" target="_blank" rel="noopener noreferrer" class="mc-link">$1</a>');
    }
  }
}
</script>

<style scoped>
/* 包含您提供的所有原始样式 */
.mc-profile-outer { display: inline-block; vertical-align: top; }

/* --- 卡片样式 --- */
.mc-card-trigger {
  background: rgba(140, 140, 140, 0.1);
  border: 1px solid rgba(140, 140, 140, 0.25);
  backdrop-filter: blur(8px);
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  overflow: hidden;
  color: inherit;
}
.mc-card-trigger:hover { transform: translateY(-4px); border-color: rgba(62, 175, 124, 0.5); }

.size-small { border-radius: 50px; padding: 4px 14px 4px 10px; display: inline-flex; align-items: center; gap: 10px; }
.size-small .mc-avatar { width: 28px; height: 28px; border-radius: 50%; }

.size-medium { border-radius: 12px; width: 150px; padding: 16px 10px; display: flex; flex-direction: column; align-items: center; text-align: center; }
.size-medium .mc-avatar { width: 56px; height: 56px; border-radius: 10px; margin-bottom: 10px; }

.size-large { border-radius: 16px; width: 260px; padding: 24px; display: flex; flex-direction: column; align-items: center; }
.size-large .mc-avatar { width: 72px; height: 72px; border-radius: 14px; margin-bottom: 16px; }

/* --- 弹窗样式 --- */
.mc-modal-overlay {
  position: fixed; top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0, 0, 0, 0.6); backdrop-filter: blur(5px);
  z-index: 2000; display: flex; align-items: center; justify-content: center;
}
.mc-modal-card {
  background: rgba(40, 40, 45, 0.98); color: #fff;
  width: 90%; max-width: 360px; border-radius: 16px; padding: 24px; position: relative;
}
.close-btn { position: absolute; top: 12px; right: 12px; background: none; border: none; font-size: 20px; color: #fff; cursor: pointer; }

.modal-header { text-align: center; margin-bottom: 20px; }
.modal-avatar { width: 80px; height: 80px; border-radius: 16px; }
.role-badge { color: white; font-size: 0.75rem; padding: 3px 10px; border-radius: 4px; font-weight: 600; display: inline-block; margin-top: 10px; }

.info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.grid-item { background: rgba(255, 255, 255, 0.08); padding: 10px; border-radius: 8px; display: flex; flex-direction: column; }
.grid-item small { opacity: 0.6; font-size: 0.75rem; }

.desc-section { margin-top: 15px; padding-left: 10px; border-left: 3px solid #3eaf7c; font-style: italic; opacity: 0.9; }
.slot-area { border-top: 1px dashed rgba(255, 255, 255, 0.2); margin-top: 15px; padding-top: 15px; }

/* 动画 */
.fade-pop-enter-active, .fade-pop-leave-active { transition: all 0.2s ease; }
.fade-pop-enter-from, .fade-pop-leave-to { opacity: 0; transform: scale(0.95); }

/* 链接样式穿透 */
:deep(.mc-link) { color: #3eaf7c; text-decoration: none; }
:deep(.mc-link:hover) { text-decoration: underline; }
</style>