# Minecraft 社区组件使用指南

### 1. PlayerList (玩家列表容器)

用于方便的批量（一个或多个）展示玩家名片，支持按分组、角色或特定名单过滤。

| **需求场景**         | **Markdown 调用代码**                       |
| -------------------- | ------------------------------------------- |
| **全员展示 (默认)**  | `<PlayerList />`                            |
| **紧凑标签云**       | `<PlayerList size="small" />`               |
| **仅显示管理团队**   | `<PlayerList type="management" />`          |
| **混合显示多个组**   | `<PlayerList type="management,members" />`  |
| **跨组寻找特定职业** | `<PlayerList role="建筑师" size="large" />` |
| **精准点名显示**     | `<PlayerList username="Steve,Alex" />`      |

------

### 2. McProfile (个人名片)

用于展示单个玩家的详细画像，点击可查看其基本信息和在各服务器的排行榜荣誉。

:::tip

这是基础控件**（只在临时调用个人名片或不方便写入玩家信息时使用）**，引用个人名片**推荐使用PlayerList**，并把玩家信息写入到*src\\.vuepress\data\players.js*，以更好地维护。

:::

| **需求场景**        | **Markdown 调用代码**                                |
| ------------------- | ---------------------------------------------------- |
| **文章插入 (小)**   | `<McProfile username="Steve" size="small" />`        |
| **成员墙展示 (中)** | `<McProfile username="Steve" size="medium" />`       |
| **详细介绍 (大)**   | `<McProfile username="Steve" size="large" />`        |
| **手动弹出详情页**  | `<McProfile username="Steve" :showDetails="true" />` |

------

### 3. ServerStatus (服务器状态卡片)

实时监测指定服务器在线人数、版本、MOTD 及延迟。

| **需求场景**        | **Markdown 调用代码**                                    |
| ------------------- | -------------------------------------------------------- |
| **标准状态面板**    | `<ServerStatus host="play.example.com" />`               |
| **行内紧凑显示**    | `<ServerStatus host="play.example.com" inline />`        |
| **对齐侧边栏 (右)** | `<ServerStatus host="play.example.com" align="right" />` |

------

### 4. ServerQuery (查询工具)

提供给玩家自主查询服务器状态的交互式面板。和ServerStatus区别在于：**可以自行输入或从多个中选择。**

| **需求场景**         | **Markdown 调用代码**                                       |
| -------------------- | ----------------------------------------------------------- |
| **基础查询框**       | `<ServerQuery />`                                           |
| **带快捷服务器列表** | `<ServerQuery :presets="[{name:'一区', host:'s1.com'}]" />` |
| **设定初始查询地址** | `<ServerQuery defaultHost="play.example.com" />`            |

------

### 5. Rankings (数据排行榜)

从 `rank.json` 自动提取并展示全服排名，支持自动横向滚动。

| **需求场景**         | **Markdown 调用代码**                  |
| -------------------- | -------------------------------------- |
| **全服全类目排行**   | `<Rankings />`                         |
| **仅显示特定服榜单** | `<Rankings :servers="['生存服']" />`   |
| **仅显示特定类目**   | `<Rankings :items="['总游戏时间']" />` |
| **精简展示 (前3名)** | `<Rankings :limit="3" />`              |

------

### 6. CopyText (点击复制)

包裹任意文本，点击后自动复制并显示成功反馈。

| **需求场景**       | **Markdown 调用代码**                             |
| ------------------ | ------------------------------------------------- |
| **指令代码块样式** | `<CopyText text="/list" format="code" />`         |
| **加粗强调样式**   | `<CopyText text="12345678" format="bold" />`      |
| **失效内容样式**   | `<CopyText text="old.server.com" format="del" />` |
| **自定义文本显示** | `<CopyText text="val">点击复制 IP</CopyText>`     |

------

