---
home: true
icon: house
title: 主页
heroFullScreen: true
heroImage: /assets/logo/csuftmc_logo.png
bgImage: /assets/image/home.webp
bgImageDark: /assets/image/home-dark.webp
bgImageStyle:
  background-attachment: fixed
heroText: 🌲 CSUFTMC
tagline: 我们用方块构建无限可能的世界。欢迎加入我们，探索技术与乐趣！

actions:
  - text: 立即加入
    icon: user-plus
    link: "#join-us"
    type: primary
  - text: 文档
    link: ./docs/
    icon: book
    type: primary

# ================= 配置开始 =================
config:
  # 1. 核心版块 (Bento Grid)
  bento:
    - type: hero
      title: "主服务器"
      desc: "纯粹原版体验，拥有完善的经济系统与自由贸易。支持多世界，无限拓展性，支持离线登录。长期不删档，让每一块方块都有意义。"
      chip: "服务器"
      chipClass: "green"
      img: "/assets/image/a01.webp"
      link: "./servers.md"

    - type: medium
      title: "绿洲世界"
      desc: "在极简的沙漠地貌中挑战生存极限。我们针对 0-255 高度区间进行了深度性能优化，确保超轻量级的渲染与加载。无论是低配移动端还是办公笔记本，都能在这里流畅开启一场远离尘嚣的隐居之旅，感受大漠孤烟的独特美学。"
      chip: "世界"
      chipClass: "blue"

    - type: medium
      title: "街区世界"
      desc: "专为建筑师打造的灵感殿堂。这里彻底移除了怪物干扰，并开放了时间与天气的完全自定义权限。支持超大面积地皮自由合并，无论你是想复刻宏伟的古建，还是构建未来主义都市，这里都能为你提供最纯净、最自由的艺术创作空间。"
      chip: "世界"
      chipClass: "blue"

    - type: wide
      title: "红石试验"
      desc: "专门为红石开发者与生电大佬准备。支持创造模式测试、投影同步，让每一颗红石都能发挥最大效能。"
      chip: "世界"
      chipClass: "blue"


    - type: feature
      icon: "⚖️"
      title: "公平公正"
      desc: "严禁任何作弊行为。管理透明，拥有完善的日志审计系统，全力守护每一位玩家的劳动成果。"
    - type: feature
      icon: "📅"
      title: "长期支持"
      desc: "不轻易分周目，致力于打造长久居所。多重冷热备份机制，你的每一块建筑都将永久留存。"
    - type: feature
      icon: "🎮"
      title: "多种玩法"
      desc: "涵盖生存、建筑、红石技术等领域。支持多世界探索与自由贸易，满足不同风格的玩家需求。"
    - type: feature
      icon: "🤝"
      title: "完善社区"
      desc: "跨服聊天互通，活跃的 QQ 交流群。我们不仅是服务器，更是一个温暖、互助的技术爱好者社区。"          
    - type: wide
      title: "玩家驱动的经济系统"
      desc: "完全由玩家主导的市场生态。通过全球贸易与箱子商店，你可以自由定价、交换物资。繁荣的社会秩序由你亲手构建。"
      chip: "玩法"
      chipClass: "yellow"
    - type: wide
      title: "世界之间自由穿梭"
      desc: "你的装备、成就与等级将在各个世界间实时同步。无论是在生存区积累物资，还是在建筑区挥洒灵感，一切皆可无缝衔接。"
      chip: "玩法"
      chipClass: "yellow"       

  # 2. 玩家作品 (Gallery)
  gallery:
    - title: "服主基地"
      img: "/assets/image/b01.webp"
      # class: "large"
    - title: "滕王阁"
      img: "/assets/image/b02.webp"
    - title: "多核刷铁机"
      img: "/assets/image/b05.webp"
    - title: "大厅建筑群"
      img: "/assets/image/b03.webp"
      class: "large"
    - title: "CHYALING的街区"
      img: "/assets/image/b04.webp"
      class: "tall"


  # 3. 发展路线 (Roadmap)
  roadmap:
  - date: "2025 往昔"
    title: "基石阶段：社团创立与初探"
    items:
    - "CSUFTMC 组织成立"
    - "主服务器成功上线，确立生存、建筑、红石多维玩法。"
    - "初步建立 QQ 社区，达成首批核心玩家入驻。"
  - date: "2026 Q1"
    title: "当前重点：体验优化与社团扩张"
    current: true
    items:
      - "开启多平台招新计划，吸纳更多热爱建筑与技术的伙伴。"
      - "完善新手入服引导，降低上手门槛。"
  - date: "2026 Q2"
    title: "计划：架构细化与功能互通"
    items:
      - "细化社团职能部门（管理、技术、建筑、宣发），各司其职。"

  # 4. 常见问题 (FAQ)
  faq:
    - q: "如何加入服务器？"
      a: "只需简单三步：<br>1. 前往<a href='./servers.md'>服务器列表</a>复制服务器地址；<br>2. 在 Minecraft 客户端点击「多人游戏」-「添加服务器」；<br>3. 填入地址并保存，点击进入即可开启旅程。初次进入请记得查看群公告完成绑定。"
      open: true
    - q: "对客户端版本有要求吗？"
      a: "原生支持 Java 1.21.10，同时兼容Java 1.18-1.21.10。"
    - q: "需要购买正版账户吗？"
      a: "不需要。但我们强烈提倡您购买并使用<a href='https://www.minecraft.net/'>Minecraft 正版</a>，以支持游戏开发者，并获得更安全、更完整的游戏体验。但为了让尽可能多的爱好者加入游戏，我们选择了离线登录。"
    - q: "我必须是社团成员或本校学生吗？"
      a: "完全不必。我们欢迎任何同好加入我们。是否加入社团取决于你的选择。但无论如何我们都欢迎你随时一起玩。" 
    - q: "我可以为社团工作做贡献吗？"
      a: "当然。我们非常期待有才华、有热情的伙伴加入建设。无论是技术支持、建筑创作还是资金赞助，我们都由衷感谢。请 <a href='./docs/Overview.md'>点击此处查看负责人</a>或<a href='./docs/Donation.md'>点击此处查看贡献指南</a>。"            
  
  # 5. 贡献者 (Contributors) - 修改为简单的用户名列表
  # 直接在这里添加名字，下方的 PlayerList 组件会自动读取并展示
  contributors:
    - Ceceport
    - Declan
    - Aragron_
    - CHYALING
    - ovo_Chen

  # 6. 页脚 (Footer)
  footer:
    about: "中南林 Minecraft 爱好者组织。不删档、不换周目，不肝不氪的纯生存养老服务器，支持离线登录。"
    links:
      - text: "服务器列表"
        url: "./servers.md"
      - text: "安装教程"
        url: "./docs/Installation_instructions.md"
      - text: "捐赠方式"
        url: "./docs/Donation.md"
    contact:
      addr: "csuftmc.dpdns.org"
      douyin: "CSUFTMC"

copyright: false
footer: false
---

<div class="g-section">
  <h2 class="g-title">🧭 探索与发现</h2>
  <div class="bento-grid">
    <template v-for="item in $frontmatter.config.bento">
      <a v-if="item.link" :href="item.link" :class="['bento-item', 'bento-' + item.type]">
        <div class="bento-content">
          <span v-if="item.chip" :class="['chip', item.chipClass]">{{ item.chip }}</span>
          <h3>{{ item.title }}</h3>
          <p>{{ item.desc }}</p>
        </div>
        <div v-if="item.img" class="bento-img-wrapper">
          <img :src="item.img" :alt="item.title" />
        </div>
      </a>
      <div v-else :class="['bento-item', 'bento-' + item.type]">
        <div v-if="item.icon" class="bento-icon">{{ item.icon }}</div>
        <div class="bento-content">
          <span v-if="item.chip" :class="['chip', item.chipClass]">{{ item.chip }}</span>
          <h4 v-if="item.type === 'feature'">{{ item.title }}</h4>
          <h3 v-else>{{ item.title }}</h3>
          <p>{{ item.desc }}</p>
        </div>
      </div>
    </template>
  </div>
</div>

<div class="g-section g-bg-soft">
  <h2 class="g-title">🖼️ 玩家作品展示</h2>
  <div class="gallery-bento">
    <div v-for="pic in $frontmatter.config.gallery" :class="['gallery-item', pic.class]">
      <img :src="pic.img" loading="lazy" />
      <span>{{ pic.title }}</span>
    </div>
  </div>
</div>

<div class="g-section">
  <h2 class="g-title">🛠️ 我们在做什么？</h2>
  <div class="roadmap-container">
    <div v-for="step in $frontmatter.config.roadmap" :class="['roadmap-item', { current: step.current }]">
      <div class="roadmap-date">{{ step.date }}</div>
      <div class="roadmap-content">
        <h4>{{ step.title }}</h4>
        <ul>
          <li v-for="li in step.items">{{ li }}</li>
        </ul>
      </div>
    </div>
  </div>
</div>

<div class="g-section g-bg-soft">
  <h2 class="g-title">❓ 大家都在问</h2>
  <div class="g-faq">
    <details v-for="item in $frontmatter.config.faq" :open="item.open">
      <summary>{{ item.q }}</summary>
      <div class="details-content" v-html="item.a"></div>
    </details>
  </div>
</div>

<div class="g-section">
  <h2 class="g-title">💎 开发者与贡献者</h2>
  <div class="player-list-wrapper">
    <PlayerList :username="$frontmatter.config.contributors.join(',')" />
  </div>
</div>

<div id="join-us" class="join-section">
  <div class="join-container">
    <h2 class="g-title">🚀 开启你的旅程</h2>
    <p>准备好进入无限可能的世界了吗？</p>
    <div class="join-actions">
      <a href="https://qun.qq.com/universal-share/share?ac=1&authKey=yVPMC4Gm%2BCkgx%2BUhudMJ1AA/xL9aEuulnPURbd4dxLoQH3nZKgVglRqJ1UHt08e/&busi_data=eyJncm91cENvZGUiOiI5OTYwNzI3MTIiLCJ0b2tlbiI6ImVlT25iaGR4MFlLMTd6S3BQZ1BFRFRldlYzVFIwcXRoNFR2dkVaeU83NW5TenFqSURuK2N3NWcyaEt1MGd2WkkiLCJ1aW4iOiIzOTgyOTQ4NDcxIn0=&data=VG6c1ZLBB15XLTc24BsY1a3W3-Xn2T3uVTuLVPwSxZwPLaeTBU968bP7HjlXcP9cR97oOOczfp4bi-v590f5YWR6NpvX9qycwEDDagbdlSo&svctype=5&tempid=h5_group_info" class="g-btn-primary">立即加入 QQ 群 (996072712)</a>
    </div>
  </div>
</div>

<footer class="g-footer">
  <div class="footer-grid">
    <div class="footer-col">
      <h3>关于 CSUFTMC</h3>
      <p>{{ $frontmatter.config.footer.about }}</p>
    </div>
    <div class="footer-col">
      <h3>快速链接</h3>
      <a v-for="link in $frontmatter.config.footer.links" :href="link.url">{{ link.text }}</a>
    </div>
    <div class="footer-col">
      <h3>联系我们</h3>
      <p>📍 {{ $frontmatter.config.footer.contact.addr }}</p>
      <p>📺 抖音: {{ $frontmatter.config.footer.contact.douyin }}</p>
    </div>
  </div>
  <div class="footer-bottom">
    除另有声明本站内容遵循 CC BY-NC-SA 4.0 许可协议 | Copyright © 2025-2026 CSUFTMC
  </div>
</footer>

<style>
:root {
  --g-blue: #4285f4;
  --g-red: #ea4335;
  --g-yellow: #fbbc05;
  --g-green: #34a853;
  --g-shadow: 0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06);
  --g-radius: 28px;
  --g-radius-inner: 18px;
}
.g-section { padding: 5rem 1.5rem; max-width: 1200px; margin: 0 auto; }
.g-bg-soft { background: var(--bg-color-soft); max-width: 100%; }
.g-title { text-align: center; font-size: 2.2rem; margin-bottom: 3.5rem; border: none; font-weight: 600; }
.bento-grid { display: grid; grid-template-columns: repeat(4, 1fr); grid-auto-rows: 160px; gap: 0.8rem; }
.bento-item { background: var(--bg-color); border-radius: var(--g-radius); padding: 0.9rem; box-shadow: var(--g-shadow); text-decoration: none !important; color: var(--text-color) !important; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); overflow: hidden; display: flex; flex-direction: column; border: 1px solid var(--border-color); }
.bento-item:hover { transform: scale(1.01); box-shadow: 0 12px 30px rgba(0,0,0,0.08); z-index: 2; }
.bento-hero { grid-column: span 2; grid-row: span 3; }
.bento-hero .bento-img-wrapper { margin-top: auto; border-radius: var(--g-radius-inner); overflow: hidden; height: 250px; }
.bento-hero img { width: 100%; height: 100%; object-fit: cover; }
.bento-feature { grid-column: span 1; grid-row: span 1; justify-content: center; align-items: center; text-align: center; }
.bento-feature .bento-icon { font-size: 1.8rem; margin-bottom: 0.5rem; }
.bento-feature h4 { margin: 0; font-size: 1rem; }
.bento-feature p { font-size: 0.8rem; opacity: 0.7; margin: 4px 0 0; }
.bento-medium { grid-column: span 1; grid-row: span 2; }
.bento-wide { grid-column: span 2; grid-row: span 1; justify-content: center; }
.chip { font-size: 0.7rem; font-weight: 700; padding: 3px 10px; border-radius: 12px; width: fit-content; margin-bottom: 0.8rem; }
.chip.blue { background: #e8f0fe; color: var(--g-blue); }
.chip.green { background: #e6f4ea; color: var(--g-green); }
.chip.yellow { background: #fef7e0; color: #b06000; }
.chip.red { background: #fce8e6; color: var(--g-red); }
.gallery-bento { display: grid; grid-template-columns: repeat(3, 1fr); grid-auto-rows: 200px; gap: 1rem; }
.gallery-item { position: relative; border-radius: var(--g-radius-inner); overflow: hidden; }
.gallery-item img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s ease; }
.gallery-item:hover img { transform: scale(1.1); }
.gallery-item span { position: absolute; bottom: 0; left: 0; right: 0; padding: 1rem; background: linear-gradient(transparent, rgba(0,0,0,0.7)); color: white; font-size: 0.9rem; opacity: 0; transition: opacity 0.3s; }
.gallery-item:hover span { opacity: 1; }
.gallery-item.large { grid-column: span 2; grid-row: span 2;}
.gallery-item.wide { grid-column: span 2; }
.gallery-item.tall { grid-row: span 2; }
.roadmap-container { max-width: 800px; margin: 0 auto; }
.roadmap-item { display: flex; gap: 2rem; margin-bottom: 2.5rem; }
.roadmap-date { font-weight: bold; color: var(--g-blue); min-width: 70px; }
.roadmap-content { background: var(--bg-color); padding: 0.6rem; border-radius: var(--g-radius-inner); box-shadow: var(--g-shadow); flex: 1; border: 1px solid var(--border-color); }
.g-faq { max-width: 800px; margin: 0 auto; }
.g-faq details { background: var(--bg-color); border-radius: 18px; margin-bottom: 0.8rem; box-shadow: var(--g-shadow); border: 1px solid var(--border-color); }
.g-faq summary { padding: 1.25rem; cursor: pointer; font-weight: 500; list-style: none; position: relative; }
.g-faq summary::after { content: '↓'; position: absolute; right: 1.5rem; opacity: 0.3; }
.details-content { padding: 0 1.25rem 1.25rem; color: var(--text-color-light); }
/* 已删除 .contributor-wall 和 .contributor-card 相关样式 */
.join-section { text-align: center; padding: 3rem 1rem; }
.g-btn-primary { background-color: var(--g-blue) !important; color: white !important; padding: 0.8rem 2.5rem !important; border-radius: 50px !important; text-decoration: none !important; display: inline-block; }
#join-us { scroll-margin-top: 80px; }
.g-footer { background: var(--bg-color-soft); padding: 4rem 2rem 2rem; border-top: 1px solid var(--border-color); }
.footer-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 2rem; max-width: 1000px; margin: 0 auto; }
.footer-col h3 { color: var(--g-blue); font-size: 0.9rem; margin-bottom: 1rem; }
.footer-col a { display: block; margin-bottom: 0.5rem;  color: var(--text-color-light); font-size: 0.95rem; text-decoration: none !important;}
.footer-bottom { text-align: center; margin-top: 3rem; font-size: 0.75rem; opacity: 0.5; }

@media (max-width: 959px) {
  .bento-grid { grid-template-columns: repeat(2, 1fr); }
  .gallery-bento { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 719px) {
  .bento-grid { grid-template-columns: 1fr; grid-auto-rows: auto; }
  .bento-hero, .bento-medium, .bento-wide { grid-column: span 1; grid-row: span 1; }
  .bento-item { min-height: 160px; }
  .gallery-bento { grid-template-columns: 1fr; grid-auto-rows: auto; }
  .gallery-item.large { grid-column: span 1; }
}
[data-theme="dark"] .chip { background: rgba(255,255,255,0.1); color: #fff; }
[data-theme="dark"] .bento-item, [data-theme="dark"] .roadmap-content, [data-theme="dark"] .g-faq details { background: #1e1e1e; border-color: rgba(255,255,255,0.1); }

/* 原有的 <style> 标签内增强样式 */
#main-title, 
#main-description {
    /* 1. 强制覆盖透明效果 */
    -webkit-text-fill-color: #fff !important; 
    color: #fff !important;

    /* 2. 彻底禁用可能存在的背景裁剪渐变 */
    background-clip: border-box !important;
    -webkit-background-clip: border-box !important;
    background-image: none !important;

    /* 3. 增强对比度的阴影 */
    text-shadow: 0 0 20px rgba(0, 0, 0, 0.9), 2px 2px 10px rgba(0, 0, 0, 0.7);
    
    /* 4. 动画平滑 */
    transition: transform 0.25s ease-in-out 0.04s, opacity 0.25s ease-in-out 0.04s;
}

.vp-hero-action.primary {
    color: #fff;
}

.roadmap-content h4 {
    margin: 10px;
}

.player-list-wrapper {
  display: flex;
  justify-content: center; 
  align-items: center;     
  width: 100%;
  margin: 0 auto;
}

.footer-col:nth-child(2) {
  padding-left: 15%; 
}

.footer-col a::before {
  content: "▹"; 
  margin-right: 8px;
  transition: all 0.3s; 
}


.footer-col a:hover::before {
  content: "▶"; 
  color: var(--g-blue);
  padding-right: 4px; 
}

@media (max-width: 959px) {
    [vp-content]:not(.custom) {
        padding: 2px;
    }
}

.bento-content h3 {
  margin-top: 8px;
  margin-bottom: 0px; 
}
.bento-content p {
  margin-top: 8px;
  margin-bottom: 4px; 
}
</style>


<script setup>
import PlayerList from "@source/.vuepress/components/PlayerList.vue";
import McProfile from "@source/.vuepress/components/McProfile.vue";
</script>