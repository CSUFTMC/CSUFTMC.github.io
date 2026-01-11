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

      <div class="update-footer">最后更新于: {{ lastUpdated }}</div>
    </div>

    <McProfile
      :show-details="showProfileModal"
      @update:showDetails="showProfileModal = $event"
      :player-profile="selectedPlayer"
    >
      <div class="achievement-box">
        <h3>上榜成就一览 ({{ playerAchievements.length }} 项)</h3>
        <ul class="achievement-list" v-if="playerAchievements.length > 0">
          <li v-for="item in playerAchievements" :key="item.serverName + item.boardName">
            在 <span class="serv-name">{{ item.serverName }}</span> 的 <span class="board-name">{{ item.boardName }}</span> 榜单中，排名第 <span class="a-rank">#{{ item.rank }}</span>，数值 <span class="a-value">{{ item.value }} {{ item.unit }}</span>
          </li>
        </ul>
        <p v-else class="no-achieve-tip">该玩家暂无上榜记录。</p>
      </div>
    </McProfile>
  </div>
</template>

<script>
import players from '../data/players.js'; // 使用默认导出的扁平化玩家对象
import McProfile from './McProfile.vue';

// 后期可在此配置希望在卡片中展示的项目
const ACHIEVEMENT_WHITELIST = ['总游戏时间', '死亡次数', '输出伤害','承受伤害','杀死僵尸的数量','杀死小白的数量'];

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
      selectedPlayer: {},        // 当前选中的玩家基础数据 (传递给 McProfile)
      playerAchievements: [],    // 当前选中的玩家上榜数据 (通过 slot 传递)
      showProfileModal: false    // 控制 McProfile Modal 状态
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
    handleClickPlayer(username) {
      // 1. 身份匹配：检索玩家基础信息
      // 优先从 players.js 获取，否则创建默认档案
      const baseInfo = players[username] || {
        username: username,
        role: '玩家',
        joinDate: '未知',
        qq: '未登记'
      };

      // 2. 成就扫描 (横向扫描所有服务器)
      const achievements = [];
      Object.entries(this.rankData).forEach(([serverName, boards]) => {
        boards.forEach(board => {
          // 仅抓取白名单项目
          if (ACHIEVEMENT_WHITELIST.includes(board.name)) {
            // 查找玩家是否上榜
            const rankEntry = board.leaderboard.find(row => row[1] === username); // row[1] 是 username

            if (rankEntry) {
              const rank = board.leaderboard.findIndex(row => row[1] === username) + 1;
              const value = rankEntry[2]; // rankEntry[2] 是值
              
              // 假设 board 对象上包含 unit 字段，若无则默认为 '次' 或 '个'
              const unit = board.unit || (board.name === '总游戏时间' ? '小时' : '次/个');

              achievements.push({
                serverName: serverName,
                boardName: board.name,
                rank: rank,
                value: value,
                unit: unit
              });
            }
          }
        });
      });

      // 3. 赋值并打开弹窗
      this.selectedPlayer = baseInfo;
      this.playerAchievements = achievements;
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
.boards-container {
  display: flex; /* 改为 flex 布局实现水平滑动 */
  gap: 1.5rem;
  overflow-x: auto; /* 核心：启用水平滑动条 */
  padding-bottom: 10px; /* 为滑动条留出空间 */
}
.rank-card {
  background: rgba(150, 150, 150, 0.1);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(112, 112, 112, 0.2);
  border-radius: 12px;
  padding: 1.2rem;
  transition: all 0.3s ease;
  min-width: 320px; /* 确保卡片在滑动时保持最小宽度 */
}
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

/* --- 新增：成就弹窗内部样式 --- */
.achievement-box {
  margin-top: 15px;
  text-align: left;
}
.achievement-box h3 {
  font-size: 1.1rem;
  margin-bottom: 15px;
  border-bottom: 1px dashed rgba(255,255,255,0.2);
  padding-bottom: 5px;
}
.achievement-list {
  list-style: none;
  padding: 0;
  margin: 0;
  max-height: 180px; /* 限制高度，大约 3-4 个 li 元素的高度 */
  overflow-y: auto; /* 启用垂直滚动条 */
}
.achievement-list li {
  background: rgba(255, 255, 255, 0.05);
  border-left: 3px solid var(--c-brand);
  padding: 8px 12px;
  margin-bottom: 8px;
  border-radius: 4px;
  font-size: 0.9em;
}
.serv-name, .board-name {
  font-weight: 600;
  color: #3eaf7c; /* 使用 VuePress 默认品牌色 */
}
.a-rank {
  color: #e67e22;
  font-weight: 800;
  font-family: monospace;
}
.a-value {
  font-family: monospace;
  font-weight: 700;
}
.no-achieve-tip {
  opacity: 0.6;
  font-style: italic;
  text-align: center;
}
</style>