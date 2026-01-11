<template>
  <div class="rankings-wrapper">
    <div v-if="loading" class="loading-box">
      <div class="spinner"></div>
      <span>同步云端数据...</span>
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
              <div v-for="(player, index) in board.leaderboard.slice(0, limit || board.leaderboard.length)" 
                   :key="index" class="player-row">
                <div class="player-main">
                  <span class="rank-index" :class="{ 'top-three': index < 3 }">{{ index + 1 }}</span>
                  <img :src="'https://nmsr.nickac.dev/face/' + player[1]" class="player-avatar" />
                  <span class="player-name">{{ player[1] }}</span>
                </div>
                <div class="player-stats">
                  <span class="stat-value">{{ player[2] }}</span>
                </div>
              </div>

              <div v-if="board.leaderboard.length === 0" class="no-data">暂无记录</div>
            </div>
          </div>
        </div>
      </div>

      <div class="update-footer">最后更新于: {{ lastUpdated }}</div>
    </div>
  </div>
</template>

<script>
export default {
  // 定义可接收的变量
  props: {
    // 筛选服务器，传入数组，如：['起源服']
    servers: { type: Array, default: () => [] },
    // 筛选具体榜单，传入数组，如：['总游戏时间', '死亡次数']
    items: { type: Array, default: () => [] },
    // 控制每个榜单显示的玩家数量
    limit: { type: Number, default: null }
  },
  data() {
    return {
      rankData: {},
      lastUpdated: '',
      loading: true
    }
  },
  computed: {
    // 核心筛选逻辑
    filteredData() {
      let result = {};
      
      // 1. 筛选服务器
      const targetServers = this.servers.length > 0 
        ? Object.keys(this.rankData).filter(s => this.servers.includes(s))
        : Object.keys(this.rankData);

      targetServers.forEach(server => {
        let boards = this.rankData[server];
        
        // 2. 筛选榜单项目
        if (this.items.length > 0) {
          boards = boards.filter(b => this.items.includes(b.name));
        }
        
        // 只有当服务器下有匹配的榜单时才显示
        if (boards.length > 0) {
          result[server] = boards;
        }
      });
      
      return result;
    }
  },
  mounted() {
    fetch('/data/rank.json')
      .then(res => res.json())
      .then(json => {
        this.rankData = json.data;
        this.lastUpdated = json.last_updated;
        this.loading = false;
      })
      .catch(err => {
        console.error('Fetch error:', err);
        this.loading = false;
      });
  }
}
</script>

<style scoped>
/* 保持之前的毛玻璃样式代码不变... */
.rankings-wrapper { margin: 2rem 0; color: var(--c-text); }
.server-group { margin-bottom: 3rem; }
.server-header { display: flex; align-items: center; margin-bottom: 1.5rem; }
.dot { width: 10px; height: 10px; background: #10b981; border-radius: 50%; margin-right: 12px; box-shadow: 0 0 10px #10b981; }
.server-title { margin: 0; border: none; font-size: 1.6rem; font-weight: 700; }
.boards-container { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 1.5rem; }
.rank-card { background: rgba(150, 150, 150, 0.1); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); border: 1px solid rgba(112, 112, 112, 0.2); border-radius: 12px; padding: 1.2rem; box-shadow: 0 4px 12px -2px rgba(0, 0, 0, 0.1); transition: all 0.3s ease; }
html.dark .rank-card { background: rgba(255, 255, 255, 0.05); border-color: rgba(255, 255, 255, 0.1); }
.rank-card:hover { transform: translateY(-4px); border-color: var(--c-brand); }
.rank-category-title { margin: 0 0 1rem 0; padding-bottom: 0.5rem; font-size: 1.1rem; font-weight: 600; border-bottom: 1px solid rgba(112, 112, 112, 0.1); }
.player-list { display: flex; flex-direction: column; gap: 0.4rem; }
.player-row { display: flex; justify-content: space-between; align-items: center; padding: 0.6rem 0.8rem; border-radius: 8px; transition: background 0.2s; }
.player-row:hover { background: rgba(62, 175, 124, 0.1); }
.player-main { display: flex; align-items: center; gap: 12px; }
.rank-index { font-family: monospace; font-weight: bold; font-size: 0.9rem; opacity: 0.4; width: 1.2rem; }
.top-three { opacity: 1; color: var(--c-brand); }
.player-avatar { width: 24px; height: 24px; border-radius: 4px; }
.player-name { font-size: 0.95rem; font-weight: 500; }
.stat-value { font-family: monospace; font-weight: 600; font-size: 0.9rem; color: var(--c-text-quote); }
.update-footer { margin-top: 2rem; text-align: right; font-size: 0.8rem; opacity: 0.5; }
.loading-box { text-align: center; padding: 4rem 0; }
.spinner { width: 24px; height: 24px; border: 2px solid var(--c-brand); border-top-color: transparent; border-radius: 50%; margin: 0 auto 1rem; animation: spin 0.8s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }
.no-data { padding: 1rem; text-align: center; opacity: 0.3; font-size: 0.9rem; }
</style>