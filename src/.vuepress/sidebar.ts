import { sidebar } from "vuepress-theme-hope";

export default sidebar({
  "/": [
    // "",
    "history",
    {
      text: "文档",
      icon: "laptop-code",
      prefix: "docs/",
      // link: "docs/",
      children: "structure",
    },
    // {
    //   text: "文档",
    //   icon: "book",
    //   prefix: "guide/",
    //   children: "structure",
    // },
    // {
    //   text: "幻灯片",
    //   icon: "person-chalkboard",
    //   link: "https://ecosystem.vuejs.press/zh/plugins/markdown/revealjs/demo.html",
    // },
  ],
});
