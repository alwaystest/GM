#贴吧消息提醒，修改自NOE132

##感谢原作者的辛勤劳动。

**火狐22一下可能不能正常工作**
***

看到大家有增加桌面提示窗口的需求，顺便自己练手，修改了一下Noe132同学的脚本。供大家参考。

如有侵权，请联系我进行修改。造成不便，还望海涵。

我也是新手，脚本写的不好，嗯，比noe同学差，肯定有bug，大家看看就行。

现有BUG：
有时候打开新标签页的时候会同时出现好几个提示框。
贴吧消息可能几句话重复几次出现。
打开的页面较多的时候提示频繁。

建议：
有新消息尽早处理。
挂机的时候只开一个页面

使用方法：
GM安装，或者根据我写的修改到没有BUG。大家共享一下^_^''
第一次有消息的时候需要手动点击授权页面弹出提醒。这里好像是火狐机制的问题，我暂时没有更好的办法。只能手动授权。坑爹的是只有有消息的时候才提醒授权。授权后重启浏览器还得再次授权。


实际上我写出来是想起到抛砖引玉的效果。毕竟我技术不匝地。

另一个思路是使用UserChrome脚本监测页面是否有提醒，有则弹出notification。因为UC的脚本弹出notification没有坑爹的授权。

我刚开始是想抠uautopagerize2.uc.js里和addMenuPlus的提示。结果第一次试的脚本直接把电脑玩死机了。
然后就没试UC.js

参考页面：

https://developer.mozilla.org/zh-TW/docs/WebAPI/Using_Web_Notifications

http://www.quora.com/When-will-firefox-support-Desktop-Notifications-like-Chrome


