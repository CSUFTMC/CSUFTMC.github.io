<template>
  <div class="rankings-wrapper">
    <div v-if="loading" class="loading-box">
      <div class="spinner"></div>
      <span>同步排行榜中...</span>
    </div>

    <div v-else>
      <div v-for="(boards, serverName) in filteredData" :key="serverName" class="server-group">
        <div class="server-header">
          <div class="header-left">
            <div class="dot"></div>
            <h2 class="server-title">{{ serverName }}</h2>
          </div>
          <button 
            class="scroll-toggle-btn" 
            :class="{ 'is-active': isAutoScrolling }" 
            @click="toggleAutoScroll"
            :title="isAutoScrolling ? '停止自动滚动' : '开始自动滚动'"
          >
            <span class="scroll-icon">{{ isAutoScrolling ? 'Ⅱ' : '▶' }}</span>
            <span class="scroll-text">{{ isAutoScrolling ? '正在滚动' : '开始滚动' }}</span>
          </button>
        </div>

        <div 
          class="boards-container" 
          ref="scrollContainer"
          @wheel="handleWheel"
          @mouseenter="isHovering = true"
          @mouseleave="isHovering = false"
        >
          <div 
            v-for="board in boards" 
            :key="board.name" 
            class="rank-card"
            @click.capture="scrollToCenter" 
          >
            <h3 class="rank-category-title">{{ board.name }}</h3>
            <div class="player-list">
              <div 
                v-for="(player, index) in board.leaderboard.slice(0, limit || board.leaderboard.length)" 
                :key="index" 
                class="player-row clickable"
                @click="handleClickPlayer(player[1])"
              >
                <div class="player-main">
                  <span class="rank-index" :class="{ 'top-three': index < 3 }">{{ index + 1 }}</span>
                  <img :src="'https://nmsr.nickac.dev/face/' + player[1]" class="player-avatar" />
                  <span class="player-name">{{ player[1] }}</span>
                </div>
                <div class="player-stats">
                  <span class="stat-value">{{ player[2] }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="update-footer">(每小时更新一次) 最后更新于: {{ lastUpdated }}</div>
    </div>

    <McProfile
      :show-details="showProfileModal"
      @update:showDetails="showProfileModal = $event"
      :player-profile="selectedPlayer"
    />
  </div>
</template>

<script>
import McProfile from './McProfile.vue';

export default {
  name: 'Rankings',
  components: { McProfile },
  props: {
    servers: { type: Array, default: () => [] },
    items: { type: Array, default: () => [] },
    limit: { type: Number, default: null }
  },
  data() {
    return {
      rankData: {},
      lastUpdated: '',
      loading: true,
      selectedPlayer: null,      
      showProfileModal: false,
      // 滚动逻辑相关
      isAutoScrolling: false, //默认关闭
      // isAutoScrolling: true,
      isHovering: false,
      scrollTimer: null
    }
  },
  computed: {
    filteredData() {
      let result = {};
      const targetServers = this.servers.length > 0 
        ? Object.keys(this.rankData).filter(s => this.servers.includes(s))
        : Object.keys(this.rankData);

      targetServers.forEach(server => {
        let boards = this.rankData[server];
        if (this.items.length > 0) boards = boards.filter(b => this.items.includes(b.name));
        if (boards.length > 0) result[server] = boards;
      });
      return result;
    }
  },
  methods: {
    // 开启自动滚动逻辑
    startAutoScroll() {
      if (this.scrollTimer) return;
      this.scrollTimer = setInterval(() => {
        // 只有在开启状态且鼠标未悬停时才滚动
        if (this.isAutoScrolling && !this.isHovering && this.$refs.scrollContainer) {
          const containers = Array.isArray(this.$refs.scrollContainer) 
            ? this.$refs.scrollContainer 
            : [this.$refs.scrollContainer];

          containers.forEach(el => {
            const maxScroll = el.scrollWidth - el.clientWidth;
            if (el.scrollLeft >= maxScroll - 1) {
              el.scrollTo({ left: 0, behavior: 'smooth' }); // 回到开头
            } else {
              el.scrollBy({ left: 200, behavior: 'smooth' }); // 每次滚动 200px
            }
          });
        }
      }, 3000); // 间隔 3 秒移动一次
    },
    toggleAutoScroll() {
      this.isAutoScrolling = !this.isAutoScrolling;
    },
    scrollToCenter(event) {
      event.currentTarget.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center'
      });
    },
    handleWheel(event) {
      if (event.deltaY !== 0) {
        event.preventDefault();
        const speedFactor = 5;  //鼠标灵敏度
        event.currentTarget.scrollLeft += event.deltaY * speedFactor;
      }
    },
    handleClickPlayer(username) {
      this.selectedPlayer = { username: username };
      this.showProfileModal = true;
    }
  },
  mounted() {
    fetch('/data/rank.json')
      .then(res => res.json())
      .then(json => {
        this.rankData = json.data;
        this.lastUpdated = json.last_updated;
        this.loading = false;
        // 初始化完成后开始滚动
        this.$nextTick(() => {
          this.startAutoScroll();
        });
      });
  },
  beforeUnmount() {
    // 销毁组件时清除定时器
    if (this.scrollTimer) clearInterval(this.scrollTimer);
  }
}
</script>

<style scoped>
.rankings-wrapper { margin: 2rem 0; color: var(--c-text); }
.loading-box { display: flex; align-items: center; gap: 10px; padding: 20px; }
.server-group { margin-bottom: 3rem; }

/* 标题栏布局 */
.server-header { 
  display: flex; 
  align-items: center; 
  justify-content: space-between; 
  margin-bottom: 1.5rem; 
}
.header-left { display: flex; align-items: center; }

.dot { width: 10px; height: 10px; background: #10b981; border-radius: 50%; margin-right: 12px; box-shadow: 0 0 10px #10b981; }
.server-title { margin: 0; border: none; font-size: 1.6rem; font-weight: 700; }

/* 滚动按钮样式 */
.scroll-toggle-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 12px;
  background: rgba(112, 112, 112, 0.1);
  border: 1px solid rgba(112, 112, 112, 0.2);
  border-radius: 20px;
  color: var(--c-text);
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.3s ease;
}
.scroll-toggle-btn.is-active {
  background: rgba(16, 185, 129, 0.15);
  border-color: #10b981;
  color: #10b981;
}
.scroll-toggle-btn:hover { background: rgba(112, 112, 112, 0.2); }
.scroll-icon { font-size: 0.7rem; font-weight: bold; }

.boards-container {
  display: flex;
  gap: 1.5rem;
  overflow-x: auto;
  padding: 10px 5px 20px 5px;
  scroll-behavior: smooth;
  scrollbar-width: none;
  -ms-overflow-style: none;
}
.boards-container::-webkit-scrollbar { display: none; }

.rank-card {
  background: rgba(150, 150, 150, 0.1);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(112, 112, 112, 0.2);
  border-radius: 12px;
  padding: 1.2rem;
  transition: all 0.3s ease;
  width: 300px;
  flex-shrink: 0;
}
.rank-card:hover { transform: translateY(-4px); border-color: var(--c-brand); }
.rank-category-title { margin: 0 0 1rem 0; font-size: 1.1rem; border-bottom: 1px solid rgba(112, 112, 112, 0.1); }

.player-row { display: flex; justify-content: space-between; align-items: flex-start; padding: 0.6rem 0.8rem; border-radius: 8px; cursor: pointer; }
.player-row:hover { background: rgba(62, 175, 124, 0.1); }

.player-main { display: flex; align-items: flex-start; gap: 12px; flex: 1; }
.player-name { 
  font-size: 0.95rem; font-weight: 500; word-break: break-all;
  display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; line-height: 1.2;
}

.rank-index { font-family: monospace; opacity: 0.4; width: 1.2rem; flex-shrink: 0; }
.top-three { opacity: 1; color: var(--c-brand); }
.player-avatar { width: 24px; height: 24px; border-radius: 4px; flex-shrink: 0; }
.player-stats { margin-left: 10px; flex-shrink: 0; padding-top: 2px; }
.stat-value { font-family: monospace; font-weight: 600; color: var(--c-text-quote); }

.update-footer { margin-top: -40px; font-size: 1rem; opacity: 0.5; text-align: right; }

:deep(.mc-card-trigger) { display: none !important; }
</style>