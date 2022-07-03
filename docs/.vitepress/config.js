export default {
  base: '/bat-script-doc/',
  title: "my bat script document",
  description: "bat 脚本文档收集",
  themeConfig: {
    siteTitle: "bat script document",
    nav: [
      { text: "Docs", link: "/bat/chapter1.1", activeMatch: "/bat/" },
      { text: "Asserts", link: "/asserts/index", activeMatch: "/asserts/" },
    ],
    sidebar: {
      "/bat/": sidebarBat(),
    },
  },
};

function sidebarBat() {
  return [
    {
      text: "章节正文",
      items: [
        { text: "1.1 常用批处理内部命令简介", link: "/bat/chapter1.1" },
        { text: "1.2 常用特殊符号", link: "/bat/chapter1.2" },
        { text: "2 DOS 循环：for 命令详解", link: "/bat/chapter2" },
        { text: "3 FOR 命令中的变量", link: "/bat/chapter3" },
        { text: "4 批处理中的变量", link: "/bat/chapter4" },
        { text: "5 set 命令详解", link: "/bat/chapter5" },
        { text: "6 if 命令讲解", link: "/bat/chapter6" },
        { text: "7 DOS 编程高级技巧", link: "/bat/chapter7" },
      ],
    },
    {
      text: "附件",
      items: [
        { text: "附件", link: "/asserts/index" },
      ],
    },
  ];
}
