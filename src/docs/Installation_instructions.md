---
title: 安装教程
icon: download
order: 3
---

# 🛠️ 游玩准备与安装

在加入 CSUFTMC 之前，您需要准备好 Java 运行环境、游戏启动器以及了解服务器的登录验证方式。

---

## 1. 安装运行环境 (Java)

游玩 Minecraft Java 版必须安装对应版本的 Java 环境。

::: tip 版本对应建议
* **1.20.x 及以上**：推荐安装 [Java 21](https://www.oracle.com/cn/java/technologies/downloads/#java21)
* **1.17 - 1.19.x**：推荐安装 [Java 17](https://www.oracle.com/cn/java/technologies/downloads/#java17)
* **1.16.5 及以下**：必须安装 [Java 8](https://www.oracle.com/cn/java/technologies/downloads/#java8)
:::

**备用下载源：**
若官方下载缓慢，可使用 [星光镜像站](https://www.starlight.cool/download/jdk/)。

::: warning 自动安装提示
如果您使用 PCL2 或 HMCL 启动器，它们通常能够**自动检测并下载**缺失的 Java 版本，您也可以在启动器设置中手动指定 Java 路径。
:::

---

## 2. 选择启动器

为了获得最佳的模组安装与线路测试体验，我们**强烈建议使用第三方启动器**。

| 启动器 | 支持平台 | 特点 | 下载链接 |
| :--- | :--- | :--- | :--- |
| **PCL2** | Windows | **首选推荐**，界面精美，自带节点测速 | [官方下载](https://ifdian.net/p/0164034c016c11ebafcb52540025c377) |
| **HMCL** | 全平台 | 经典稳定，支持所有主流系统 | [官方下载](https://hmcl.huangyuhui.net/download/) |
| **XMCL** | 全平台 | 现代化界面，优秀的模组包管理 | [官方下载](https://xmcl.app/zh/) |
| **FCL** | Android | 手机端游玩 Java 版的推荐选择 | [GitHub Release](https://github.com/FCL-Team/FoldCraftLauncher/releases) |

---

## 3. 账户登录与验证

### 🔐 账户类型
Minecraft 登录分为以下三种模式：
1. **正版登录**：使用微软账号登录。我们强烈建议您[购买正版](https://www.xbox.com/zh-CN/games/store/minecraft-java-bedrock-edition-for-pc/9NXP44L49SHJ/0010)以支持开发者。
2. **离线登录**：无需购买，在启动器中自定义名字即可游玩。
3. **第三方登录**：使用皮肤站（如 LittleSkin）账号验证。

---

### 📢 服务器登录验证 (AuthMe)

**目前 CSUFTMC 采用“离线登录 + AuthMe 插件验证”模式。** 无论您是正版还是离线玩家，进入服务器后均需执行以下操作进行身份核验：

::: danger 账户安全
请务必牢记您的注册密码，这是保护您服务器财产（背包、领地）的唯一凭证。
:::

#### **指令操作指南：**

* **首次进入服务器 (注册)**：
  在聊天框输入：`/register <密码> <重复密码>`
  *例如：`/register 123456 123456`*

* **后续进入服务器 (登录)**：
  在聊天框输入：`/login <密码>`
  *例如：`/login 123456`*

::: details 💡 为什么需要 AuthMe 验证？
由于服务器允许离线登录，任何人都可以使用任何 ID 进入游戏。AuthMe 确保了只有知道密码的人才能控制对应的角色，有效防止账号被他人冒充。
:::