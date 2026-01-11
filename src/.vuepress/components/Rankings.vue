<template>
  <div class="rankings-wrapper">
    <div v-if="loading" class="loading-box">
      <div class="spinner"></div>
      <span>同步排行榜中...</span>
    </div>

    <div v-else>
      <div v-for="(boards, serverName) in filteredData" :key="serverName" class="server-group">
        <div class="server-header">
          <div class="dot"></div>
          <h2 class="server-title">{{ serverName }}</h2>
        </div>

        <div class="boards-container">
          <div v-for="board in boards" :key="board.name" class="rank-card">
            <h3 class="rank-category-title">{{ board.name }}</h3>
            <div class="player-list">
              <div 
                v-for="(player, index) in board.leaderboard.slice(0, limit || board.leaderboard.length)" 
                :key="index" 
                class="player-row clickable"
                @click="openPlayerProfile(player[1])"
              >
                <div class="player-main">
                  <span class="rank-index" :class="{ 'top-three': index < 3 }">{{ index + 1 }}</span>
                  <img :src="'https://nmsr.nickac.dev/face/' + player[0]" class="player-avatar" />
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

      <div class="update-footer">最后更新于: {{ lastUpdated }}</div>
    </div>

    <McProfile 
      ref="profileModal" 
      v-if="activePlayer"
      :username="activePlayer.username"
      :qq="activePlayer.qq"
      :role="activePlayer.role"
      :joinDate="activePlayer.joinDate"
      :customInfo="activePlayer.customInfo"
      style="display:none"
    >
      <div class="achievement-box" v-if="activeAchievements.length > 0">
        <div class="achieve-divider">服务器成就</div>
        <div v-for="serv in activeAchievements" :key="serv.server" class="serv-block">
          <div class="serv-label">{{ serv.server }}</div>
          <div class="achieve-items">
            <div v-for="a in serv.items" :key="a.name" class="a-item">
              <span class="a-name">{{ a.name }}</span>
              <span class="a-rank">#{{ a.rank }}</span>
            </div>
          </div>
        </div>
      </div>
    </McProfile>
  </div>
</template>

<script>
import { playerGroups } from '../data/players.js';
import McProfile from './McProfile.vue';

// 后期可在此配置希望在卡片中展示的项目
const ACHIEVEMENT_WHITELIST = ['总游戏时间', '死亡次数', '输出伤害'];

export default {
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
      activePlayer: null,        // 当前选中的玩家基础数据
      activeAchievements: []      // 当前选中的玩家上榜数据
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
    openPlayerProfile(username) {
      // 1. 检索玩家基础信息
      const allPlayers = Object.values(playerGroups).flat();
      const baseInfo = allPlayers.find(p => p.username === username) || { 
        username, 
        role: '玩家' 
      };

      // 2. 扫描成就 (横向扫描所有服务器)
      const achievements = [];
      Object.entries(this.rankData).forEach(([serverName, boards]) => {
        const items = [];
        boards.forEach(board => {
          if (ACHIEVEMENT_WHITELIST.includes(board.name)) {
            const index = board.leaderboard.findIndex(row => row[1] === username);
            if (index !== -1) {
              items.push({ name: board.name, rank: index + 1 });
            }
          }
        });
        if (items.length > 0) achievements.push({ server: serverName, items });
      });

      // 3. 赋值并打开弹窗
      this.activePlayer = baseInfo;
      this.activeAchievements = achievements;
      
      this.$nextTick(() => {
        this.$refs.profileModal.showDetails = true;
      });
    }
  },
  mounted() {
    fetch('/data/rank.json')
      .then(res => res.json())
      .then(json => {
        this.rankData = json.data;
        this.lastUpdated = json.last_updated;
        this.loading = false;
      });
  }
}
</script>

<style scoped>
/* --- 沿用之前的 Rankings 样式 --- */
.rankings-wrapper { margin: 2rem 0; color: var(--c-text); }
.server-group { margin-bottom: 3rem; }
.server-header { display: flex; align-items: center; margin-bottom: 1.5rem; }
.dot { width: 10px; height: 10px; background: #10b981; border-radius: 50%; margin-right: 12px; box-shadow: 0 0 10px #10b981; }
.server-title { margin: 0; border: none; font-size: 1.6rem; font-weight: 700; }
.boards-container { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 1.5rem; }
.rank-card { background: rgba(150, 150, 150, 0.1); backdrop-filter: blur(12px); border: 1px solid rgba(112, 112, 112, 0.2); border-radius: 12px; padding: 1.2rem; transition: all 0.3s ease; }
.rank-card:hover { transform: translateY(-4px); border-color: var(--c-brand); }
.rank-category-title { margin: 0 0 1rem 0; font-size: 1.1rem; border-bottom: 1px solid rgba(112, 112, 112, 0.1); }
.player-row { display: flex; justify-content: space-between; align-items: center; padding: 0.6rem 0.8rem; border-radius: 8px; cursor: pointer; }
.player-row:hover { background: rgba(62, 175, 124, 0.1); }
.player-main { display: flex; align-items: center; gap: 12px; }
.rank-index { font-family: monospace; opacity: 0.4; width: 1.2rem; }
.top-three { opacity: 1; color: var(--c-brand); }
.player-avatar { width: 24px; height: 24px; border-radius: 4px; }
.player-name { font-size: 0.95rem; font-weight: 500; }
.stat-value { font-family: monospace; font-weight: 600; color: var(--c-text-quote); }

/* --- 新增：成就弹窗内部样式 (Slot 区域) --- */
.achievement-box {
  margin-top: 15px;
  text-align: left;
}
.achieve-divider {
  font-size: 12px;
  opacity: 0.4;
  margin-bottom: 10px;
  border-top: 1px dashed rgba(255,255,255,0.1);
  padding-top: 10px;
  text-align: center;
}
.serv-block { margin-bottom: 12px; }
.serv-label {
  font-size: 10px;
  color: #3eaf7c;
  background: rgba(62, 175, 124, 0.15);
  display: inline-block;
  padding: 1px 6px;
  border-radius: 4px;
  margin-bottom: 6px;
}
.achieve-items {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.a-item {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.05);
  padding: 6px 10px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
}
.a-rank {
  color: #e67e22;
  font-weight: 800;
  font-family: monospace;
}
</style>