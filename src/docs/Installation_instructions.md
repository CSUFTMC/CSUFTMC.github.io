---
title: 安装教程
icon: object-group
order: 2

---

## 1、安装环境（Java的安装）

**游玩Minecraft Java版需要先安装Java** 您可以通过以下方式安装Java：

Java下载官方网站：

[Java8](https://www.oracle.com/cn/java/technologies/downloads/#java8)（适用于Minecraft Java版1.16.5及以下版本，下载需登录）

[Java17](https://www.oracle.com/cn/java/technologies/downloads/#java17)（适用于Minecraft Java版1.17及以上版本）

[Java21](https://www.oracle.com/cn/java/technologies/downloads/#java21)（适用于Minecraft Java版1.20及以上版本）

第三方下载站：https://www.starlight.cool/download/jdk/

请根据您的系统和游戏版本，选择下载并安装对应的exe或dmg安装文件。安装过程中一般只需要不断点击下一步即可。

**如果您使用官方启动器/第三方HMCL启动器，它们在电脑中没有合适的Java的情况下，可能会自动下载合适的Java版本，但也可以事先安装Java后，由启动器自动检测Java目录并启动。**

## 2、启动器的选择

在2016年前后，国内的Hello! Minecraft Launcher（简称HMCL）与Plain Craft Launcher（简称PCL）两款第三方启动器相继问世，因其启动速度快、登录便捷、支持第三方登录、可以直接下载mod、整合包与模组等特点，很快成为国内启动器使用的主流。一般情况下我们不推荐您使用官方启动器。

**PCL2和HMCL下载的方式如下：**

PCL2：[官方下载](https://ifdian.net/p/0164034c016c11ebafcb52540025c377)（仅支持Windows）

HMCL：[官方下载](https://hmcl.huangyuhui.net/download/)

XMCL：[官方下载](https://xmcl.app/zh/)

FoldCraftLauncher：[官方下载](https://github.com/FCL-Team/FoldCraftLauncher/releases)（安卓手机Java启动器）

相较于其他启动器，官方启动器能够更换玩家正版披风、了解游戏最新消息、参与Mojang发起的年度生物投票等活动。官方启动器的缺点在于：由于国内网络的限制，官方启动器连接不稳定、加载速度慢，同时加载第三方模组较为不便。如果您想要下载官方启动器，并且已经有了Minecraft正版账号，您可以通过Minecraft官网[下载官方启动器](https://www.minecraft.net/zh-hans/download)。

## 3、使用账户登录

Minecraft登陆账户一般分为三种：**离线登录、正版登录、第三方登录**。

### 正版登录（需要付费购买游戏）

您需要购买Minecraft国际版正版才能使用正版登录。要购买正版，请打开[购买地址](https://www.xbox.com/zh-CN/games/store/minecraft-java-bedrock-edition-for-pc/9NXP44L49SHJ/0010)，点击右上角“登录”，登录您的微软账号。

登录后，点击“购买 ￥89”，添加支付方式，你可以选择银行卡支付，也可以选择eWallet（支付宝）付款。付款结束后，恭喜你，你拥有了自己的Minecraft正版账户。

支付结束后，打开[编辑档案页面](https://www.minecraft.net/zh-hans/msaprofile/mygames/editprofile)，使用微软账户登录后，便可以设置你的游戏ID。如果点击完成后界面没有任何反应，表明这个游戏ID已被使用，请换一个ID，直到界面跳转，则ID设置完毕。

### 离线登录

离线登录，指不购买正版账户，通过第三方启动器的离线登录模式进入游戏。该模式与正版登录的区别在于，玩家无需登录账户即可游玩Minecraft，但与此同时，离线登录的用户是无法进入绝大多数多人游戏服务器的，同时在多人游戏模式中，您的皮肤、披风很可能无法被其他玩家查看。

### 第三方登录

第三方登录是使用非微软账号的**第三方皮肤站账号**，进行Minecraft服务器的身份验证。

**目前CSUFTMC服务器使用离线+AuthMe验证登录** (我们**强烈提倡**您购买并使用**Minecraft正版账户**，以支持游戏开发者，并获得更安全、更完整的游戏体验。但为了让尽可能多的爱好者加入游戏，我们选择了离线登录。)

###  📢 AuthMe验证方式

- **首次进入：** 需要使用 `/register <密码> <重复密码>` 命令**注册**账号。
- **后续进入：** 需要使用 `/login <密码>` 命令**登录**。