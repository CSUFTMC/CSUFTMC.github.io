---
title: 服务器列表
icon: server
footer: false
sidebar: false
comment: false
photoSwipe: false
---

# 🎮 服务器列表概览

以下是当前开放的 **CSUFTMC** 服务器信息。

点击下方对应的快速跳转链接：

👉 [主服务器-Java](#CSUFTserver-Java)  |  [主服务器-基岩](#CSUFTserver-Be)<!-- bot-skip -->

---

## 🌲 CSUFTMC 主服务器
> **多世界·无限拓展·双端互通 · 离线登录支持 · 长期开放**
<!-- bot-block-start -->
<div style="display: flex; flex-wrap: wrap; gap: 0px 10px;">

[<img src="https://img.shields.io/badge/点此查看-主服务器网页地图-darkgreen?style=for-the-badge" style="zoom:150%;" />](http://frp-add.com:60388/)

[<img src="https://img.shields.io/badge/点此查看-机器、建筑一览表-darkgreen?style=for-the-badge" style="zoom:150%;" />](https://docs.qq.com/sheet/DZUJPU3FWcHBwemxx?tab=BB08J2)

</div>


<DecisionGuide 
  treeId="serverSelection"
  size="custom"
  width="100%"
  height="80px"
  direction="row"
  padding="0 24px"
  gap="35px"
  icon="🚀" 
  title="自动选择服务器地址助手"
  subtitle="根据您的运营商和地理位置，智能匹配最佳的连接线路"
/>
<!-- bot-block-end -->




### 💻 Java 版连接 (PC) {#CSUFTserver-Java}
<!-- bot-block-start -->
> [<img src="https://img.shields.io/badge/点此查看-Java版进入服务器教程-blue?style=for-the-badge" style="zoom:120%;" />](./docs/join.md#java-guide)
<!-- bot-block-end -->
| 线路类型 | 连接地址 | 建议 |
| :--- | :--- | :--- |
| **🚀 智能分配** | <CopyText text="csuftmc.dpdns.org" format="bold" /> | `全网首选` |
| **🌐 移动 IPv6** | <CopyText text="ipv6.csuftmc.dpdns.org" format="bold" /> | `移动直连` |
| **⚡ 湖北三网** | <CopyText text="frp-tag.com:59465" format="bold" /> | `华中/南方` |
| **⚓ 宁波三网** | <CopyText text="frp-sun.com:23145" /> | `华东、东部沿海` |
| **🏔️ 山东三网** | <CopyText text="frp-ten.com:46032" /> | `北方首选` |
| **☁️ 宁波备用** | <CopyText text="frp-oak.com:55907" /> | `华东备用` |
<!-- | **⚙️ 山东备用** | <CopyText text="frp-art.com:40054" /> | `北方备用` | -->



---

### 📱 基岩版连接 (手机/Win) {#CSUFTserver-Be}
<!-- bot-block-start -->
> [<img src="https://img.shields.io/badge/点此查看-基岩版进入服务器教程-blue?style=for-the-badge" style="zoom:120%;" />](./docs/join.md#bedrock-guide)
<!-- bot-block-end -->
| 线路名称 | 服务器地址 | 端口 | 建议 |
| :--- | :--- | :--- | :--- |
| **🚀 IPv6 直连** | <CopyText text="ipv6.csuftmc.dpdns.org" format="bold" /> | <CopyText text="19132" format="bold" /> | `流量用户推荐` |
| **⚡ 湖北三网** | <CopyText text="frp-tag.com" format="bold" /> | <CopyText text="26789" format="bold" /> | `通用稳定线路` |




---




<!-- bot-block-start -->
<details open>
  <summary style="cursor: pointer; font-weight: bold;">🛰️ 服务器地址实时状态查询</summary>

  <div style="display: flex; flex-wrap: wrap; gap: 10px; margin-top: 10px;">
    <ServerQuery defaultHost="frp-oak.com:55907" align="left"
      :presets="[
        { name: '智能分配', host: 'csuftmc.dpdns.org' },
        { name: '湖北三网', host: 'frp-tag.com:59465' },
        { name: '宁波三网', host: 'frp-sun.com:23145' },
        { name: '山东三网', host: 'frp-ten.com:46032' },
        { name: '模组服-湖北', host: 'frp-tag.com:50556' },
        { name: '模组服-宁波', host: 'frp-oak.com:11280' }
      ]" />
  </div>
</details>
<!-- bot-block-end -->

::: details 📘 点击查看：名词解释与连接建议
##### 📚 相关名词解释
* **IPv6 (直连)**: 路径最简且延迟最低，要求用户网络环境支持 IPv6。
* **三网 (通用)**: 接入三大运营商骨干网，自动调度最优路径，解决跨网拥塞。

##### 💡 优先顺序建议
1. **移动 IPv6 直连**：低延迟首选。
2. **智能分配/湖北三网**：跨网首选，适配大部分环境。
3. **分地区备用**：北方玩家首选 **山东** 节点，南方玩家首选 **宁波** 节点。
:::

<!-- bot-block-start -->
## 🔗 快捷链接

<div style="display: flex; flex-wrap: wrap; gap: 0px 10px;">


[<img src="https://img.shields.io/badge/点此查看-文档-blue?style=for-the-badge" style="zoom:160%;" />](./docs/)


[<img src="https://img.shields.io/badge/点此查看-排行榜-purple?style=for-the-badge" style="zoom:160%;" />](./ranks.md)

[<img src="https://img.shields.io/badge/点此查看-捐赠倡议-darkgreen?style=for-the-badge" style="zoom:160%;" />](./docs/donate.md)

[<img src="https://img.shields.io/badge/点此查看-已关闭的服务器-red?style=for-the-badge" style="zoom:160%;" />](./history.md)
</div>
<!-- bot-block-end -->

---

<!-- bot-block-start -->
## 👥 近期活跃玩家
<PlayerList />
<!-- bot-block-end -->

<!-- bot-block-start -->
<style>
.server-container {
  background: var(--c-bg-light);
  padding: 1.5rem;
  border-radius: 12px;
  margin: 1rem 0;
  border: 1px solid var(--c-border);
}

.server-container h3 {
  margin-top: 0;
  border-bottom: 2px solid var(--c-brand);
  display: inline-block;
  padding-bottom: 4px;
  color: var(--c-text-accent);
}

/* 优化折叠框内的表格边距与风格 */
details {
  background: rgba(128, 128, 128, 0.05);
  padding: 0.5rem 1rem;
  border-radius: 8px;
  margin: 1rem 0;
}

details summary {
  cursor: pointer;
  font-weight: bold;
  color: var(--c-brand);
}

details table {
  width: 100%;
  margin: 0.5rem 0;
}

/* 移动端表格优化 */
@media (max-width: 719px) {
  .server-container {
    padding: 1rem;
  }
}
</style>
<!-- bot-block-end -->

<!-- bot-block-start -->
<script setup>
import PlayerList from "@source/.vuepress/components/PlayerList.vue";
import ServerStatus from "@source/.vuepress/components/ServerStatus.vue";
import CopyText from "@source/.vuepress/components/CopyText.vue";
import ServerQuery from "@source/.vuepress/components/ServerQuery.vue";
import McProfile from "@source/.vuepress/components/McProfile.vue";
import DecisionGuide from "@source/.vuepress/components/DecisionGuide.vue";
</script>
<!-- bot-block-end -->
