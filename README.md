# node-and(roid)-backup

## 以复制手机上部分app的安装包、导出相册、文档、视频为主要功能的安卓备份项目

有个思路，pm path 是根据app包名打印某个对应的apk地址，似乎系统应用就放在/system/里，渲染相关就放在/vendor/里，这或许可以作为分类依据。

反思了一下，没必要分类，只考虑/data/app/里的东西就行。

感谢知乎大佬https://www.zhihu.com/people/ji-qing-yun-16-56 教我用Promise.all