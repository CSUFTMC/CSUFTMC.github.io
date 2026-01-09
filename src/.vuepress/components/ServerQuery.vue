<template>
  <div class="query-wrapper" :style="wrapperStyle">
    
    <div class="query-card search-panel">
      <div class="query-header">
        <span class="query-title">🔍 服务器状态查询</span>
        <button class="paste-btn" @click="handlePaste" :disabled="pasteLoading" title="从剪贴板粘贴并查询">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg>
          <span>{{ pasteText }}</span>
        </button>
      </div>
      
      <div class="input-group">
        <div class="input-wrapper">
          <input 
            type="text" 
            v-model="inputHost" 
            placeholder="输入地址 (如 frp-oak.com:55907)" 
            @keyup.enter="handleQuery"
            @input="clearError"
            :class="{ 'has-value': inputHost, 'error': errorMsg }"
            ref="hostInput"
          />
          
          <button v-show="inputHost" class="clear-btn" @click="clearInput" title="清除内容">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>

        <button class="query-btn" @click="handleQuery" :disabled="!inputHost">
          <svg v-if="!loading" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          <span v-else class="spinning">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 1 1-6.219-8.56"></path></svg>
          </span>
        </button>
      </div>

      <div class="error-tip" v-if="errorMsg">
        ⚠️ {{ errorMsg }}
      </div>

      <div class="quick-actions" v-if="presets && presets.length > 0">
        <span class="quick-label">快速查询:</span>
        <button 
          v-for="(item, index) in presets" 
          :key="index"
          class="preset-tag" 
          @click="applyPreset(item.host)"
          :title="`查询: ${item.host}`"
        >
          {{ item.name }}
        </button>
      </div>

    </div>

    <div class="result-container" v-if="targetHost">
      <ServerStatus 
        :host="targetHost" 
        :key="targetHost" 
        :align="align"
        inline
      />
    </div>

  </div>
</template>

<script>
import ServerStatus from './ServerStatus.vue';

const MAX_LENGTH = 50;

export default {
  name: 'ServerQuery',
  components: { ServerStatus },
  props: {
    align: {
      type: String,
      default: 'center',
      validator: (value) => ['left', 'center', 'right'].includes(value)
    },
    defaultHost: {
      type: String,
      default: ''
    },
    presets: {
      type: Array,
      default: () => [] 
    }
  },
  data() {
    return {
      inputHost: '',
      targetHost: '',
      loading: false,
      pasteLoading: false,
      pasteText: '粘贴',
      errorMsg: ''
    }
  },
  computed: {
    wrapperStyle() {
      const map = { left: 'flex-start', right: 'flex-end', center: 'center' };
      return { justifyContent: map[this.align] || 'center' };
    }
  },
  mounted() {
    if (this.defaultHost) {
      this.inputHost = this.defaultHost;
      this.handleQuery();
    }
  },
  methods: {
    handleQuery() {
      if (!this.inputHost) return;
      
      if (this.inputHost.length > MAX_LENGTH) {
        this.errorMsg = `地址过长 (不能超过 ${MAX_LENGTH} 个字符)`;
        return;
      }

      this.loading = true;
      this.errorMsg = '';

      setTimeout(() => {
        this.targetHost = this.inputHost.trim();
        this.loading = false;
      }, 300);
    },
    clearInput() {
      this.inputHost = '';
      this.errorMsg = '';
      this.$nextTick(() => {
        this.$refs.hostInput.focus();
      });
    },
    clearError() {
      if (this.errorMsg) {
        this.errorMsg = '';
      }
    },
    applyPreset(host) {
      this.inputHost = host;
      this.clearError();
      this.$nextTick(() => {
        this.handleQuery();
      });
    },
    async handlePaste() {
      if (!navigator.clipboard) {
        this.showPasteTip('不支持', true);
        return;
      }
      this.pasteLoading = true;
      try {
        const text = await navigator.clipboard.readText();
        if (text) {
          this.inputHost = text.trim();
          this.showPasteTip('已粘贴');
          this.clearError();
          this.$nextTick(() => {
            this.handleQuery();
          });
        } else {
          this.showPasteTip('空内容', true);
        }
      } catch (err) {
        console.error('粘贴失败:', err);
        this.showPasteTip('需授权', true);
      } finally {
        this.pasteLoading = false;
      }
    },
    showPasteTip(text, isError = false) {
      this.pasteText = text;
      setTimeout(() => {
        this.pasteText = '粘贴';
      }, 2000);
    }
  }
}
</script>

<style scoped>
.query-wrapper {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 20px;
  margin: 20px 0;
  width: 100%;
  align-items: flex-start;
  transition: all 0.3s ease;
}

.search-panel,
.result-container {
  width: 100%;         
  max-width: 340px;    
  min-width: 300px;
  flex: 1 1 300px;
}

.result-container:empty {
  display: none;
}

.query-card {
  background: var(--c-bg-arrow);
  border: 2px solid #707070; 
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 12px -2px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  position: relative;
}

html.dark .query-card {
  border-color: rgba(255, 255, 255, 0.25);
  box-shadow: 0 4px 12px -2px rgba(0, 0, 0, 0.5);
}

.query-card:hover {
  transform: translateY(-2px);
}

.query-header {
  margin-bottom: 12px;
  font-weight: 700;
  font-size: 14px;
  color: var(--c-text);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

/* --- 快捷按钮区域 --- */
.quick-actions {
  margin-top: 16px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
}

.quick-label {
  font-size: 12px;
  color: var(--c-text-quote);
  margin-right: 4px;
}

/* --- 修改：快捷按钮样式 --- */
.preset-tag {
  font-size: 12px;
  padding: 5px 12px;
  
  /* 改动：边框颜色与外框(#707070)保持一致 */
  border: 1px solid #707070; 
  
  border-radius: 20px;
  background: var(--c-bg);       
  color: var(--c-text);
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 5px rgba(0,0,0,0.05);
}

/* 改动：暗色模式下，按钮边框也适配为半透明白 */
html.dark .preset-tag {
  border-color: rgba(255, 255, 255, 0.25);
}

.preset-tag:hover {
  color: var(--c-brand);
  /* 悬停时边框高亮为主题色 */
  border-color: var(--c-brand); 
  background: var(--c-bg); 
  transform: translateY(-2px);
  box-shadow: 0 4px 10px rgba(0,0,0,0.12);
}

/* 错误提示 */
.error-tip {
  color: #ef4444; 
  font-size: 12px;
  margin-top: 8px;
  padding-left: 2px;
  animation: shake 0.3s ease-in-out;
}
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-4px); }
  75% { transform: translateX(4px); }
}

.paste-btn {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  font-size: 12px;
  color: var(--c-text-quote);
  background-color: var(--c-bg);
  border: 1px solid var(--c-border);
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
}
.paste-btn:hover:not(:disabled) {
  color: var(--c-brand);
  border-color: var(--c-brand);
  background-color: var(--c-bg-arrow);
}
.paste-btn:disabled { opacity: 0.6; cursor: not-allowed; }

.input-group { display: flex; gap: 8px; }
.input-wrapper { position: relative; flex: 1; display: flex; align-items: center; }

input {
  width: 100%;
  padding: 8px 12px;
  padding-right: 30px;
  border: 2px solid var(--c-border);
  background-color: var(--c-bg);
  color: var(--c-text);
  border-radius: 8px;
  outline: none;
  font-size: 14px;
  transition: all 0.2s;
  min-width: 0; 
}
input:focus { border-color: var(--c-brand); background-color: var(--c-bg-arrow); }
input.error { border-color: #ef4444 !important; color: #ef4444; background-color: rgba(239, 68, 68, 0.05); }
input.error:focus { box-shadow: 0 0 0 2px rgba(239, 68, 68, 0.2); }

.clear-btn {
  position: absolute;
  right: 6px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  padding: 4px;
  cursor: pointer;
  color: var(--c-text-quote);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.2s;
  opacity: 0.6;
}
.clear-btn:hover { opacity: 1; background-color: rgba(128, 128, 128, 0.1); color: var(--c-brand); }

.query-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 16px;
  background-color: var(--c-brand);
  border: none;
  border-radius: 8px;
  color: #fff;
  cursor: pointer;
  transition: all 0.2s;
  min-width: 44px;
}
.query-btn:hover:not(:disabled) { opacity: 0.9; transform: scale(1.05); box-shadow: 0 2px 8px rgba(0,0,0,0.2); }
.query-btn:disabled { background-color: var(--c-border); cursor: not-allowed; color: var(--c-text-quote); }

.spinning { animation: spin 1s linear infinite; display: flex; }
@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
.result-container { animation: fadeIn 0.5s ease; }
@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
</style>