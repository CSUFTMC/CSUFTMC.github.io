---
title: 服务器列表
icon: server
footer: false
sidebar: false
comment: false
photoSwipe: false
---

## **🎮 服务器列表概览**

以下是当前开放的 CSUFTMC 服务器信息。

---

### **🌲 CSUFTMC 主服务器**

支持Java和基岩全部版本。CSUFTMC主服务器，支持多世界，无限拓展性，支持离线登录，提供长期支持。

**生存服已于2025年12月18日迁移到此服**

**连接地址 (CSUFTMC)** 



| #    | 描述                   | 地址(建议依次尝试选最优线路)                             |
| ---- | :--------------------- | :------------------------------------------------------- |
| 1    | **自动选择(首选推荐)** | <CopyText text="csuftmc.dpdns.org" format="bold" />      |
| 2    | 移动ipv6(直连推荐)     | <CopyText text="ipv6.csuftmc.dpdns.org" format="bold" /> |
| 3    | 湖北三网               | <CopyText text="frp-tag.com:59465" format="bold" />      |
| 4    | 宁波三网               | <CopyText text="frp-sun.com:23145" format="bold" />      |
| 5    | 山东三网               | <CopyText text="frp-ten.com:46032" format="bold" />      |
| 6    | 宁波三网               | <CopyText text="frp-oak.com:55907" format="bold" />      |
| 7    | 枣庄三网               | <CopyText text="frp-art.com:40054" format="bold" />      |

  <DecisionGuide 
  size="small"
  treeId="serverSelection" 
  title="节点选择助手" 
  subtitle="为你分配最快的服务器" 
  icon="🚀" 
/>

<div style="display: flex; flex-wrap: wrap;  gap: 10px;">
  <!-- <ServerStatus host="frp-art.com:40054" inline /> -->
  <ServerQuery defaultHost="csuftmc.dpdns.org" align="left"
  :presets="[
    { name: '自动选择', host: 'csuftmc.dpdns.org' },
    { name: '湖北三网', host: 'frp-tag.com:59465' },
    { name: '宁波三网', host: 'frp-sun.com:23145' },
    { name: '山东三网', host: 'frp-ten.com:46032' },
    { name: '宁波三网(备用)', host: 'frp-oak.com:55907' },
    { name: '山东三网(备用)', host: 'frp-art.com:40054' }
  ]" />
</div>

---


<div style="display: flex; flex-wrap: wrap; gap: 0px 10px;">


[<img src="https://img.shields.io/badge/点此查看-文档-blue?style=for-the-badge" style="zoom:180%;" />](./docs/)


[<img src="https://img.shields.io/badge/点此查看-排行榜-purple?style=for-the-badge" style="zoom:180%;" />](./Rankings.md)

[<img src="https://img.shields.io/badge/点此查看-捐赠倡议-darkgreen?style=for-the-badge" style="zoom:180%;" />](./docs/Donation.md)

[<img src="https://img.shields.io/badge/点此查看-已关闭的服务器-red?style=for-the-badge" style="zoom:180%;" />](./old_servers.md)
</div>


:::tip
请在确保连接顺畅的前提下按以下顺序优先使用：1、移动ipv6直连 2、湖北三网 3、宁波三网

相关名词解释
1. IPv6 (直连)
通过第六代协议实现端到端直接通信，路径最简且延迟最低，但要求用户网络环境支持并开启 IPv6。
2. 三网 (通用)
利用 BGP 协议同时接入三大运营商（电信、移动、联通）骨干网，自动调度最优路径，解决跨网互联拥塞，确保不同宽带用户均能稳定连接。
:::

---

### 👥近期主要玩家
<PlayerList />



<script setup>
import PlayerList from "@source/.vuepress/components/PlayerList.vue";
import ServerStatus from "@source/.vuepress/components/ServerStatus.vue";
import CopyText from "@source/.vuepress/components/CopyText.vue";
import ServerQuery from "@source/.vuepress/components/ServerQuery.vue";
import McProfile from "@source/.vuepress/components/McProfile.vue";
import Rankings from "@source/.vuepress/components/Rankings.vue";
import DecisionGuide from "@source/.vuepress/components/DecisionGuide.vue";
</script>