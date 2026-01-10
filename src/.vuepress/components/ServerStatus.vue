<template>
  <div class="widget-wrapper" :class="{ 'inline-mode': inline }" :style="wrapperStyle">
    <div class="server-card">
      <div class="header">
        <div class="status-badge">
          <span class="dot" :class="{ online: isOnline }"></span>
          
          <span class="host-text" @click="copyHost" title="点击复制地址">{{ host || '未配置服务器地址' }}</span>
          
          <button class="icon-btn" @click.stop="copyHost" :title="copied ? '已复制' : '复制服务器地址'">
            <svg v-if="!copied" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
          </button>
        </div>
      </div>

      <div class="info">
        <div class="motd">{{ serverData.pureMotd || (isOnline ? 'No Description' : statusText) }}</div>
        <div class="sub-info">{{ serverData.version }}</div>
      </div>

      <div class="player-section" v-if="playerList.length > 0">
        <span class="player-label">在线玩家 ({{ serverData.players?.online || 0 }}):</span>
        <div class="avatar-list">
          <div v-for="name in playerList" :key="name" class="player-chip">
            <img :src="`https://nmsr.nickac.dev/head/${name}`" :alt="name" @error="handleImgError" no-view>
            <span>{{ name }}</span>
          </div>
        </div>
      </div>

      <div class="stats">
        <div class="stat-item left">
          <span>👥</span>
          <span>{{ (isOnline && !forceRefreshing) ? `${serverData.players?.online}/${serverData.players?.max}` : '--/--' }}</span>
        </div>

        <div class="stat-item center">
          <span class="signal-icon" :style="{ color: signalColor }">📶</span>
          <span>{{ (isOnline && !forceRefreshing && serverData.delay !== undefined) ? `${serverData.delay} ms` : '-- ms' }}</span>
        </div>

        <div class="stat-item right">
          <span class="refresh-time">{{ lastUpdated }}</span>
          <button class="icon-btn refresh-btn" @click="fetchData" :disabled="loading" title="刷新状态">
            <svg :class="{ spinning: loading }" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M23 4v6h-6"></path><path d="M1 20v-6h6"></path><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path></svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ServerStatus',
  props: {
    host: { type: String, required: true },
    // 新增 inline 属性，开启后组件变紧凑，不再强制占满一行
    inline: { type: Boolean, default: false },
    align: {
      type: String,
      default: 'center',
      validator: (value) => ['left', 'center', 'right'].includes(value)
    }
  },
  data() {
    return {
      serverData: {},
      isOnline: false,
      playerList: [],
      statusText: '获取中...',
      copied: false,
      loading: false,
      forceRefreshing: false,
      lastUpdated: '--:--:--'
    }
  },
  computed: {
    wrapperStyle() {
      // 如果是 inline 模式，对齐由父元素控制，这里不再设置 justifyContent
      if (this.inline) return {};
      const map = { left: 'flex-start', right: 'flex-end', center: 'center' };
      return { justifyContent: map[this.align] || 'center' };
    },
    signalColor() {
      if (!this.isOnline || this.forceRefreshing || this.serverData.delay === undefined) return 'currentColor';
      const ms = this.serverData.delay;
      if (ms < 100) return '#10b981';
      if (ms < 150) return '#f59e0b';
      return '#ef4444';
    }
  },
  mounted() {
    if (this.host) {
      this.fetchData();
    } else {
      this.statusText = '请传入 host 参数';
    }
  },
  methods: {
    async fetchData() {
      if (this.loading) return;
      this.loading = true;
      this.forceRefreshing = true;

      try {
        await new Promise(resolve => setTimeout(resolve, 400));
        const timestamp = new Date().getTime();
        const res = await fetch(`https://motd.minebbs.com/api/status?host=${this.host}&_t=${timestamp}`, {
            method: 'GET',
            cache: 'no-store',
            headers: { 'Pragma': 'no-cache', 'Cache-Control': 'no-cache, no-store, must-revalidate' }
        });
        const data = await res.json();
        this.serverData = data;
        
        if (data.status === 'online') {
          this.isOnline = true;
          this.parsePlayers(data.players?.sample);
        } else {
          this.isOnline = false;
          this.statusText = "服务器超时或离线，请刷新重试";
        }
        
        const now = new Date();
        this.lastUpdated = `${now.getHours().toString().padStart(2,'0')}:${now.getMinutes().toString().padStart(2,'0')}:${now.getSeconds().toString().padStart(2,'0')}`;
      } catch (e) {
        this.statusText = "API 请求失败";
      } finally {
        this.loading = false;
        this.forceRefreshing = false;
      }
    },
    parsePlayers(sampleString) {
      if (!sampleString) {
        this.playerList = [];
        return;
      }
      this.playerList = sampleString.split(',').map(s => s.trim()).filter(s => s.length > 0);
    },
    handleImgError(e) { e.target.style.display = 'none'; },
    async copyHost() {
      if (!this.host) return;
      try {
        await navigator.clipboard.writeText(this.host);
        this.copied = true;
        setTimeout(() => { this.copied = false; }, 2000);
      } catch (err) { console.error('复制失败:', err); }
    }
  }
}
</script>

<style scoped>
.widget-wrapper {
  display: flex;
  width: 100%;
  padding: 20px 0;
  transition: all 0.3s ease;
}

/* --- 新增：Inline 模式样式 --- */
.widget-wrapper.inline-mode {
  width: auto;      /* 不再强制 100% 宽 */
  padding: 10px 0;  /* 减小垂直内边距 */
  flex-shrink: 0;   /* 防止被挤压 */
}

.server-card {
  background: var(--c-bg-arrow);
  border: 2px solid #707070;
  padding: 20px;
  border-radius: 12px;
  
  /* --- 修改：宽度响应式 --- */
  width: 100%;         /* 默认占满父容器 */
  max-width: 340px;    /* 最大不超过 340px */
  min-width: 300px;    /* 最小宽度，防止内容挤烂 */
  
  box-shadow: 0 4px 12px -2px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  position: relative;
  display: flex;
  flex-direction: column;
}

html.dark .server-card {
  border-color: rgba(255, 255, 255, 0.25);
  box-shadow: 0 4px 12px -2px rgba(0, 0, 0, 0.5);
}

.server-card:hover {
  /* border-color: var(--c-brand);  */
  transform: translateY(-2px);
}

.header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }
.status-badge { display: flex; align-items: center; font-size: 14px; font-weight: 700; width: 100%; }
.host-text { word-break: break-all; cursor: pointer; transition: opacity 0.2s; margin-right: auto; }
.host-text:hover { opacity: 0.7; }

.icon-btn { background: none; border: none; padding: 4px; cursor: pointer; color: var(--c-text-quote); display: flex; align-items: center; justify-content: center; border-radius: 4px; transition: all 0.2s; }
.icon-btn:hover:not(:disabled) { background-color: var(--c-badge-bg); color: var(--c-brand); }
.icon-btn:disabled { opacity: 0.5; cursor: not-allowed; }

.dot { width: 10px; height: 10px; border-radius: 50%; margin-right: 10px; background-color: #ef4444; border: 2px solid rgba(255,255,255,0.1); flex-shrink: 0; }
.dot.online { background-color: #10b981; }

.motd { font-size: 15px; margin-bottom: 4px; font-weight: 600; line-height: 1.5; }
.sub-info { opacity: 0.7; font-size: 12px; font-family: monospace; }
.player-section { margin-top: 16px; }
.player-label { font-size: 12px; opacity: 0.8; display: block; margin-bottom: 8px; font-weight: 600;}
.avatar-list { display: flex; flex-wrap: wrap; gap: 8px; }
.player-chip { display: flex; align-items: center; background: var(--c-badge-bg); padding: 4px 10px 4px 4px; border-radius: 20px; border: 1px solid transparent; transition: all 0.2s; }
.player-chip:hover { border-color: var(--c-brand); background: var(--c-bg); }
.player-chip img { width: 20px; height: 20px; border-radius: 50%; margin-right: 6px; }
.player-chip span { font-size: 12px; font-weight: 500; }

.stats { display: flex; justify-content: space-between; align-items: center; margin-top: 16px; font-size: 13px; opacity: 0.8; font-weight: 500; }
.stat-item { display: flex; align-items: center; }
.stat-item.right { gap: 8px; }
.refresh-time { font-size: 12px; font-family: monospace; opacity: 0.8; }
.signal-icon { font-size: 14px; margin-right: 4px; }
.spinning { animation: spin 1s linear infinite; }
@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
</style>