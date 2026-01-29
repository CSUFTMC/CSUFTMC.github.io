---
home: true
containerClass: homepage-only
icon: house
title: 主页
heroFullScreen: true
bgImage: /assets/image/home.webp
bgImageDark: /assets/image/home-dark.webp
bgImageStyle:
  background-attachment: fixed
heroText: 🌲 CSUFTMC
tagline: 这里是中南林业科技大学MineCraft爱好者社区，我们用方块构建无限可能的世界。欢迎加入我们，探索技术与乐趣！

actions:
  - text: 立即加入
    icon: user-plus
    link: "#join-us"
    type: primary
  - text: 服务器
    link: ./servers.md
    icon: server
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
      link: "https://www.csuftmc.dpdns.org/servers.html"


    - type: medium
      title: "资源大陆"
      desc: "感官震撼与财富挖掘的终极猎场。 这里是超越常规的奇幻疆域，汇集了各种罕见的新型地貌与壮丽奇观，矿产储量更是普通世界的 3 倍。为了让每一场冒险都保持极致的新鲜感，世界生态会不定期重置刷新。(请勿在此世界兴建建筑)"
      chip: "世界"
      chipClass: "blue"

    - type: medium
      title: "绿洲世界"
      desc: "在极简的沙漠地貌中挑战生存极限。我们针对 0-255 高度区间进行了深度性能优化，确保超轻量级的渲染与加载。无论是低配移动端还是办公笔记本，都能在这里流畅开启一场远离尘嚣的隐居之旅，感受大漠孤烟的独特美学。"
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
    title: "基石阶段：社区创立与初探"
    items:
    - "CSUFTMC 社区成立"
    - "主服务器成功上线，确立生存、建筑、红石多维玩法。"
    - "初步建立 QQ 社区，达成首批核心玩家入驻。"
  - date: "2026 Q1"
    title: "当前重点：体验优化与社区扩张"
    current: true
    items:
      - "开启多平台招新计划，吸纳更多热爱建筑与技术的伙伴。"
      - "完善新手入服引导，降低上手门槛。"
  - date: "2026 Q2"
    title: "计划：架构细化与功能互通"
    items:
      - "细化社区职能部门（管理、技术、建筑、宣发），各司其职。"

  # 4. 常见问题 (FAQ)
  faq:
    - q: "如何加入服务器？"
      a: "只需简单三步：<br>1. 前往<a href='https://www.csuftmc.dpdns.org/servers.html' target='_blank'  rel='noopener noreferrer'>服务器列表</a>复制服务器地址；<br>2. 在 Minecraft 客户端点击「多人游戏」-「添加服务器」；<br>3. 填入地址并保存，点击进入即可开启旅程。初次进入请记得查看群公告完成绑定。"
      open: true
    - q: "对客户端版本有要求吗？"
      a: "原生支持 Java 1.21.10，同时兼容Java 1.18-1.21.10。"
    - q: "需要购买正版账户吗？"
      a: "不需要。但我们强烈提倡您购买并使用<a href='https://www.minecraft.net/'  target='_blank'  rel='noopener noreferrer'>Minecraft 正版</a>，以支持游戏开发者，并获得更安全、更完整的游戏体验。但为了让尽可能多的爱好者加入游戏，我们选择了离线登录。"
    - q: "我必须是社区成员或本校学生吗？"
      a: "完全不必。我们欢迎任何同好加入我们。是否加入社区取决于你的选择。但无论如何我们都欢迎你随时一起玩。" 
    - q: "我可以为社区工作做贡献吗？"
      a: "当然。我们非常期待有才华、有热情的伙伴加入建设。无论是技术支持、建筑创作还是资金赞助，我们都由衷感谢。请 <a href='https://www.csuftmc.dpdns.org/docs/Overview.html'  target='_blank'  rel='noopener noreferrer'>点击此处查看负责人</a>或<a href='https://www.csuftmc.dpdns.org/docs/Donation.html'  target='_blank'  rel='noopener noreferrer'>点击此处查看贡献指南</a>。"            
  
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
    about: "中南林 Minecraft 爱好者社区。不删档、不换周目，不肝不氪的纯生存养老服务器，支持离线登录。"
    links:
      - text: "服务器列表"
        url: "https://www.csuftmc.dpdns.org/servers.html"
      - text: "安装教程"
        url: "https://www.csuftmc.dpdns.org/docs/Installation_instructions.html"
      - text: "捐赠方式"
        url: "https://www.csuftmc.dpdns.org/docs/Donation.html"
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
      <a v-if="item.link" :href="item.link" :class="['bento-item', 'bento-' + item.type]" target="_blank"  rel="noopener noreferrer">
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
      <a 
        href="https://qun.qq.com/universal-share/share?ac=1&authKey=yVPMC4Gm%2BCkgx%2BUhudMJ1AA/xL9aEuulnPURbd4dxLoQH3nZKgVglRqJ1UHt08e/&busi_data=eyJncm91cENvZGUiOiI5OTYwNzI3MTIiLCJ0b2tlbiI6ImVlT25iaGR4MFlLMTd6S3BQZ1BFRFRldlYzVFIwcXRoNFR2dkVaeU83NW5TenFqSURuK2N3NWcyaEt1MGd2WkkiLCJ1aW4iOiIzOTgyOTQ4NDcxIn0=&data=VG6c1ZLBB15XLTc24BsY1a3W3-Xn2T3uVTuLVPwSxZwPLaeTBU968bP7HjlXcP9cR97oOOczfp4bi-v590f5YWR6NpvX9qycwEDDagbdlSo&svctype=5&tempid=h5_group_info" 
        class="g-btn-primary"
        target="_blank" 
        rel="noopener noreferrer"
      >
        立即加入 QQ 群 (996072712)
      </a>
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
      <a v-for="link in $frontmatter.config.footer.links" :href="link.url" target="_blank"  rel="noopener noreferrer">{{ link.text }}</a>
    </div>
    <div class="footer-col">
      <h3>联系我们</h3>
      <p>📍 {{ $frontmatter.config.footer.contact.addr }}</p>
      <p>📺 抖音: {{ $frontmatter.config.footer.contact.douyin }}</p>
    </div>
  </div>
  <div class="footer-bottom">
    除另有声明本站内容遵循 CC BY-NC-SA 4.0 许可协议 | Copyright © 2025-2026 CSUFTMC
    <a href="https://tally.so/r/MeEbNA" target="_blank" class="feedback-btn">反馈与建议</a>
  </div>
</footer>




<script setup>
import PlayerList from "@source/.vuepress/components/PlayerList.vue";
import McProfile from "@source/.vuepress/components/McProfile.vue";
</script>