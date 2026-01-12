<template>
  <div class="mc-profile-outer">
    <div 
      v-if="!isExternalMode"
      :class="['mc-card-trigger', `size-${size}`]" 
      @click="openModal"
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

            <div class="achievement-box">
              <h3>上榜成就一览 ({{ achievements.length }})</h3>
              <div v-if="loadingRank" class="loading-rank">正在同步数据...</div>
              <ul class="achievement-list" v-else-if="achievements.length > 0">
                <li v-for="item in achievements" :key="item.serverName + item.boardName">
                  在 <span class="serv-name">{{ item.serverName }}</span> 的 
                  <span class="board-name">{{ item.boardName }}</span> 中排名 
                  <span class="a-rank">#{{ item.rank }}</span>，总计
                  <span class="a-value">{{ item.value }}</span>
                </li>
              </ul>
              <p v-else class="no-achieve-tip">该玩家暂无上榜记录。</p>
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

const SCAN_WHITELIST = ['总游戏时间', '死亡次数', '输出伤害', '承受伤害', '杀死僵尸的数量', '杀死小白的数量'];

export default {
  name: 'McProfile',
  props: {
    username: { type: String, default: '' },
    playerProfile: { type: Object, default: null },
    showDetails: { type: Boolean, default: false },
    size: { 
      type: String, 
      default: 'medium',
      validator: v => ['small', 'medium', 'large'].includes(v)
    }
  },
  data() {
    return { 
      innerShow: false,
      achievements: [],
      loadingRank: false,
      rankData: null
    };
  },
  computed: {
    isExternalMode() { return !!this.playerProfile; },
    isVisible() { return this.isExternalMode ? this.showDetails : this.innerShow; },
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
  watch: {
    isVisible(val) {
      if (val) this.fetchAndScanRank();
    }
  },
  methods: {
    async fetchAndScanRank() {
      if (!this.profile.username) return;
      this.loadingRank = true;
      try {
        if (!this.rankData) {
          const res = await fetch('/data/rank.json');
          const json = await res.json();
          this.rankData = json.data;
        }
        
        const results = [];
        Object.entries(this.rankData).forEach(([server, boards]) => {
          boards.forEach(board => {
            if (SCAN_WHITELIST.includes(board.name)) {
              const rankIndex = board.leaderboard.findIndex(row => row[1] === this.profile.username);
              if (rankIndex !== -1) {
                results.push({
                  serverName: server,
                  boardName: board.name,
                  rank: rankIndex + 1,
                  value: board.leaderboard[rankIndex][2]
                });
              }
            }
          });
        });
        this.achievements = results;
      } catch (e) {
        console.error("Rank scanning failed:", e);
      } finally {
        this.loadingRank = false;
      }
    },
    openModal() { this.innerShow = true; },
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
/* --- 样式部分保持不变 --- */
.mc-card-trigger {
  background: rgba(140, 140, 140, 0.1);
  border: 1px solid rgba(140, 140, 140, 0.25);
  backdrop-filter: blur(8px);
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  overflow: hidden;
  color: inherit;
}
.mc-card-trigger:hover { transform: translateY(-4px); border-color: rgba(62, 175, 124, 0.5); box-shadow: 0 8px 20px rgba(0,0,0,0.15); }

.size-small { border-radius: 50px; padding: 4px 14px 4px 10px; display: inline-flex; align-items: center; gap: 10px; }
.size-small .mc-avatar { width: 28px; height: 28px; border-radius: 50%; }

.size-medium { border-radius: 12px; width: 150px; padding: 16px 10px; display: flex; flex-direction: column; align-items: center; text-align: center; }
.size-medium .mc-avatar { width: 56px; height: 56px; border-radius: 10px; margin-bottom: 10px; }

.size-large { border-radius: 16px; width: 260px; padding: 24px; display: flex; flex-direction: column; align-items: center; }
.size-large .mc-avatar { width: 72px; height: 72px; border-radius: 14px; margin-bottom: 16px; }

.mc-modal-overlay {
  position: fixed; top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0, 0, 0, 0); backdrop-filter: blur(10px);
  z-index: 2000; display: flex; align-items: center; justify-content: center;
}
.mc-modal-card {
  background: rgba(40, 40, 45, 0.98); color: #fff;
  width: 80%; max-width: 450px; border-radius: 16px; padding: 24px; position: relative;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
}
.close-btn { position: absolute; top: 12px; right: 12px; background: none; border: none; font-size: 24px; color: rgba(255,255,255,0.6); cursor: pointer; }
.close-btn:hover { color: #fff; }

.modal-header { text-align: center; margin-bottom: 20px; }
.modal-avatar { width: 80px; height: 80px; }
.role-badge { color: white; font-size: 0.75rem; padding: 3px 10px; border-radius: 4px; font-weight: 600; display: inline-block; }

.info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.grid-item { background: rgba(255, 255, 255, 0.08); padding: 10px; border-radius: 8px; display: flex; flex-direction: column; }
.grid-item small { opacity: 0.6; font-size: 0.75rem; margin-bottom: 2px; }

.desc-section { margin-top: 15px; padding: 10px; background: rgba(62, 175, 124, 0.1); border-left: 3px solid #3eaf7c; border-radius: 10px; font-style: italic; }

.achievement-box { margin-top: 20px; }
.achievement-box h3 { font-size: 1rem; margin-bottom: 10px; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 5px; }

.achievement-list { 
  list-style: none; padding: 0; margin: 0; 
  max-height: 220px;
  overflow-y: auto;
  padding-right: 5px;
}
.achievement-list::-webkit-scrollbar { width: 5px; }
.achievement-list::-webkit-scrollbar-thumb { background: rgba(62, 175, 124, 0.5); border-radius: 10px; }

.achievement-list li { 
  background: rgba(255,255,255,0.05); margin-bottom: 8px; padding: 10px 12px; 
  border-radius: 6px; font-size: 0.88rem; line-height: 1.5;
  border-left: 3px solid #3eaf7c;
}

.serv-name { color: #3eaf7c; font-weight: bold; }
.board-name { color: #5fb1fe; font-weight: 500; }
.a-rank { color: #e67e22; font-weight: bold; font-family: monospace; }
.a-value { font-weight: bold; color: #fff; margin-left: 4px; }

.no-achieve-tip { opacity: 0.5; font-size: 0.85rem; text-align: center; padding: 10px; }
.loading-rank { text-align: center; padding: 20px; font-size: 0.9rem; opacity: 0.7; }

.slot-area { border-top: 1px dashed rgba(255, 255, 255, 0.2); margin-top: 15px; padding-top: 15px; }

.fade-pop-enter-active, .fade-pop-leave-active { transition: all 0.25s ease; }
.fade-pop-enter-from, .fade-pop-leave-to { opacity: 0; transform: scale(0.9); }

:deep(.mc-link) { color: #3eaf7c; text-decoration: none; font-weight: 500; }
:deep(.mc-link:hover) { text-decoration: underline; }
.desc-section p {
  margin-top: 2px !important;
  margin-bottom: 2px !important;
}
.modal-header h3 { margin-top: 3px; margin-bottom: 8px; color: white;}

@media (max-width: 410px) {
  .mc-profile-outer {
    display: block;
    width: 100%;
    margin-bottom: 15px; 
  }

  /* 2. 针对 medium 和 large 尺寸应用自动边距
     display: flex 的元素本身是块级容器，配合固定宽度 + margin: auto 现居中
  */
  .size-medium, 
  .size-large {
    margin-left: auto;
    margin-right: auto;
  }
}
</style>
