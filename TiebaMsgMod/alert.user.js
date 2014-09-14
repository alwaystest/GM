// ==UserScript==
// @name		贴吧回复提醒mod
// @description	提供贴吧新消息提醒
// @namespace	noe132 mod
// @version		1.6.5
// @include		http://*
// @include		https://*
// @include		ftp://*
// @icon		http://tb.himg.baidu.com/sys/portrait/item/d4346e6f65313332ac06
// @supportURL	http://tieba.baidu.com/f?kw=firefox
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_xmlhttpRequest
// @grant       GM_addStyle
// @grant       GM_registerMenuCommand
// @contributionURL	nnnnoe132@gmail.com|alipay.com
// ==/UserScript==

GM_registerMenuCommand("打开设置窗口（贴吧回复提醒）", openSetting);
GM_addStyle("#msg_reminder{position:fixed;bottom:40px;right:-135px;z-index:10000000000000000000000000000000;border:1px solid gray;padding:0;/*background:-moz-linear-gradient(rgba(234,236,239,0.93), rgba(226,229,233,0.93));background:-webkit-linear-gradient(rgba(234,236,239,0.93), rgba(226,229,233,0.93));*/background:rgba(235,235,235,0.8);box-shadow:0 0 3px #999;width:auto;min-width:160px;-moz-transition:0.4s ease box-shadow,0.4s ease right 0.4s,0.4s ease opacity 0.4s;opacity:0.3;overflow:hidden;}#msg_reminder:hover{opacity:1;right:0;box-shadow:0 0 3px 0px #333;-moz-transition:0.4s ease box-shadow,ease right 0.4s,0.3s ease opacity 0.1s;}#msg_reminder_innerbox{line-height:30px;padding:0px;}#msg_reminder_closebtn{cursor:pointer;position:absolute;top:9px;right:7px;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAQAAAD8fJRsAAAACXBIWXMAAAsTAAALEwEAmpwYAAADGWlDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjaY2BgnuDo4uTKJMDAUFBUUuQe5BgZERmlwH6egY2BmYGBgYGBITG5uMAxIMCHgYGBIS8/L5UBA3y7xsDIwMDAcFnX0cXJlYE0wJpcUFTCwMBwgIGBwSgltTiZgYHhCwMDQ3p5SUEJAwNjDAMDg0hSdkEJAwNjAQMDg0h2SJAzAwNjCwMDE09JakUJAwMDg3N+QWVRZnpGiYKhpaWlgmNKflKqQnBlcUlqbrGCZ15yflFBflFiSWoKAwMD1A4GBgYGXpf8EgX3xMw8BUNTVQYqg4jIKAX08EGIIUByaVEZhMXIwMDAIMCgxeDHUMmwiuEBozRjFOM8xqdMhkwNTJeYNZgbme+y2LDMY2VmzWa9yubEtoldhX0mhwBHJycrZzMXM1cbNzf3RB4pnqW8xryH+IL5nvFXCwgJrBZ0E3wk1CisKHxYJF2UV3SrWJw4p/hWiRRJYcmjUhXSutJPZObIhsoJyp2V71HwUeRVvKA0RTlKRUnltepWtUZ1Pw1Zjbea+7QmaqfqWOsK6b7SO6I/36DGMMrI0ljS+LfJPdPDZivM+y0qLBOtfKwtbFRtRexY7L7aP3e47XjB6ZjzXpetruvdVrov9VjkudBrgfdCn8W+y/xW+a8P2Bq4N+hY8PmQW6HPwr5EMEUKRilFG8e4xUbF5cW3JMxO3Jx0Nvl5KlOaXLpNRlRmVdas7D059/KY8tULfAqLi2YXHy55WyZR7lJRWDmv6mz131q9uvj6SQ3HGn83G7Skt85ru94h2Ond1d59uJehz76/bsK+if8nO05pnXpiOu+M4JmzZj2aozW3ZN6+BVwLwxYtXvxxqcOyCcsfrjRe1br65lrddU3rb2402NSx+cFWq21Tt3/Y6btr1R6Oven7jh9QP9h56PURv6Obj4ufqD355LT3mS3nZM+3X/h0Ke7yqasW15bdEL3ZeuvrnfS7N+/7PDjwyPTx6qeKz2a+EHzZ9Zr5Td3bn+9LP3z6VPD53de8b+9+5P/88Lv4z7d/Vf//AwAqvx2K829RWwAAOhJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+Cjx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4KICAgPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICAgICAgPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIKICAgICAgICAgICAgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIgogICAgICAgICAgICB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIKICAgICAgICAgICAgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIKICAgICAgICAgICAgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIgogICAgICAgICAgICB4bWxuczpwaG90b3Nob3A9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOnRpZmY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vdGlmZi8xLjAvIgogICAgICAgICAgICB4bWxuczpleGlmPSJodHRwOi8vbnMuYWRvYmUuY29tL2V4aWYvMS4wLyI+CiAgICAgICAgIDx4bXA6Q3JlYXRvclRvb2w+QWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKTwveG1wOkNyZWF0b3JUb29sPgogICAgICAgICA8eG1wOkNyZWF0ZURhdGU+MjAxNC0wOS0xMFQyMDo0MjoxNyswODowMDwveG1wOkNyZWF0ZURhdGU+CiAgICAgICAgIDx4bXA6TWV0YWRhdGFEYXRlPjIwMTQtMDktMTBUMjA6NDI6MTcrMDg6MDA8L3htcDpNZXRhZGF0YURhdGU+CiAgICAgICAgIDx4bXA6TW9kaWZ5RGF0ZT4yMDE0LTA5LTEwVDIwOjQyOjE3KzA4OjAwPC94bXA6TW9kaWZ5RGF0ZT4KICAgICAgICAgPHhtcE1NOkluc3RhbmNlSUQ+eG1wLmlpZDpiNTYzNTMxYS04ZTM0LTllNDItYmRiYy1hN2I5YzNmYTJmYTM8L3htcE1NOkluc3RhbmNlSUQ+CiAgICAgICAgIDx4bXBNTTpEb2N1bWVudElEPnhtcC5kaWQ6N2FiYjI3ZjItMDc1YS1mZTQxLWE3YzUtNDAxNTlhNmVhNDQyPC94bXBNTTpEb2N1bWVudElEPgogICAgICAgICA8eG1wTU06T3JpZ2luYWxEb2N1bWVudElEPnhtcC5kaWQ6N2FiYjI3ZjItMDc1YS1mZTQxLWE3YzUtNDAxNTlhNmVhNDQyPC94bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ+CiAgICAgICAgIDx4bXBNTTpIaXN0b3J5PgogICAgICAgICAgICA8cmRmOlNlcT4KICAgICAgICAgICAgICAgPHJkZjpsaSByZGY6cGFyc2VUeXBlPSJSZXNvdXJjZSI+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDphY3Rpb24+Y3JlYXRlZDwvc3RFdnQ6YWN0aW9uPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6aW5zdGFuY2VJRD54bXAuaWlkOjdhYmIyN2YyLTA3NWEtZmU0MS1hN2M1LTQwMTU5YTZlYTQ0Mjwvc3RFdnQ6aW5zdGFuY2VJRD4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OndoZW4+MjAxNC0wOS0xMFQyMDo0MjoxNyswODowMDwvc3RFdnQ6d2hlbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OnNvZnR3YXJlQWdlbnQ+QWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKTwvc3RFdnQ6c29mdHdhcmVBZ2VudD4KICAgICAgICAgICAgICAgPC9yZGY6bGk+CiAgICAgICAgICAgICAgIDxyZGY6bGkgcmRmOnBhcnNlVHlwZT0iUmVzb3VyY2UiPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6YWN0aW9uPnNhdmVkPC9zdEV2dDphY3Rpb24+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDppbnN0YW5jZUlEPnhtcC5paWQ6YjU2MzUzMWEtOGUzNC05ZTQyLWJkYmMtYTdiOWMzZmEyZmEzPC9zdEV2dDppbnN0YW5jZUlEPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6d2hlbj4yMDE0LTA5LTEwVDIwOjQyOjE3KzA4OjAwPC9zdEV2dDp3aGVuPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6c29mdHdhcmVBZ2VudD5BZG9iZSBQaG90b3Nob3AgQ0MgKFdpbmRvd3MpPC9zdEV2dDpzb2Z0d2FyZUFnZW50PgogICAgICAgICAgICAgICAgICA8c3RFdnQ6Y2hhbmdlZD4vPC9zdEV2dDpjaGFuZ2VkPgogICAgICAgICAgICAgICA8L3JkZjpsaT4KICAgICAgICAgICAgPC9yZGY6U2VxPgogICAgICAgICA8L3htcE1NOkhpc3Rvcnk+CiAgICAgICAgIDxkYzpmb3JtYXQ+aW1hZ2UvcG5nPC9kYzpmb3JtYXQ+CiAgICAgICAgIDxwaG90b3Nob3A6Q29sb3JNb2RlPjE8L3Bob3Rvc2hvcDpDb2xvck1vZGU+CiAgICAgICAgIDxwaG90b3Nob3A6SUNDUHJvZmlsZT5Eb3QgR2FpbiAxNSU8L3Bob3Rvc2hvcDpJQ0NQcm9maWxlPgogICAgICAgICA8dGlmZjpPcmllbnRhdGlvbj4xPC90aWZmOk9yaWVudGF0aW9uPgogICAgICAgICA8dGlmZjpYUmVzb2x1dGlvbj43MjAwOTAvMTAwMDA8L3RpZmY6WFJlc29sdXRpb24+CiAgICAgICAgIDx0aWZmOllSZXNvbHV0aW9uPjcyMDA5MC8xMDAwMDwvdGlmZjpZUmVzb2x1dGlvbj4KICAgICAgICAgPHRpZmY6UmVzb2x1dGlvblVuaXQ+MjwvdGlmZjpSZXNvbHV0aW9uVW5pdD4KICAgICAgICAgPGV4aWY6Q29sb3JTcGFjZT42NTUzNTwvZXhpZjpDb2xvclNwYWNlPgogICAgICAgICA8ZXhpZjpQaXhlbFhEaW1lbnNpb24+MTI8L2V4aWY6UGl4ZWxYRGltZW5zaW9uPgogICAgICAgICA8ZXhpZjpQaXhlbFlEaW1lbnNpb24+MTI8L2V4aWY6UGl4ZWxZRGltZW5zaW9uPgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAKPD94cGFja2V0IGVuZD0idyI/PkgvM38AAAAgY0hSTQAAeiUAAICDAAD5/wAAgOkAAHUwAADqYAAAOpgAABdvkl/FRgAAAFlJREFUeNp00MERwCAIAMEzrQGtanEUQR4EJQ99ObeOMo7gsgIm+kvCDAgwvJHgWEInxTEoyKCVOyR9GYKnT0E7VzvBsfNWXbXvLko4eY+RsFpOWsG4fck7AMngLWSmfEcqAAAAAElFTkSuQmCC);height:12px;width:12px;}#msg_reminder_innerbox > div{-moz-transition:all ease 0.75s;overflow:hidden;height:30px;line-height:30px;padding:0 8px;border-bottom:1px solid gray;}#msg_reminder_innerbox > div:last-child{border:none !important;}#msg_reminder_innerbox > div > a{cursor:pointer;}#msg_reminder_innerbox > div > a,#msg_reminder_innerbox > div > a > span{margin:0;padding:0;background:none;border:none;font-size:14px;color:#111;height:30px;line-height:30px;float:left;text-decoration:none;font-weight:normal;}#warning_dialog{position:fixed; padding:10px; bottom:80px; left:-moz-calc(50% - 200px); width:400px; height:100px; background:#DDD; color:#222; font-size:14px;}");
/*
 * 度娘脚本 处理地址 http://tieba.baidu.com/tb/static-common/component/commonLogic/common/user_message/UserMessage.js?v=18.46
 * 2014/9/10 version get from firebug
 * 
 *
 */
// 全局变量
var time;
var workOnTieba;
var added_count = 0;
var info = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];//存放贴吧消息数目信息
var info_or = "0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0";
var info_cached;
var uid = "";
var msg="";
//var notification; 
var TbMsgOnshow=0;

// 加载设置
if(GM_getValue("TbMsgOnshow") == undefined||GM_getValue("TbMsgOnshow") == 1){
	GM_setValue("TbMsgOnshow",0);
}else{
	TbMsgOnshow=GM_getValue("TbMsgOnshow");
}

if(GM_getValue("time") == undefined){
	time = 20000;
	GM_setValue("time",20000);
}else{
	time = parseInt(GM_getValue("time"));
}

if(GM_getValue("workOnTieba") == undefined){
	workOnTieba = 1;
	GM_setValue("workOnTieba",1);
}else{
	workOnTieba = parseInt(GM_getValue("workOnTieba"));
}

if(window.location.href.indexOf("http://tieba.baidu.com") == 0){
	GM_setValue("cookie",document.cookie);
}


// 获取uid
function getUid(){
	GM_xmlhttpRequest({
		method: "GET",
		url: "http://tieba.baidu.com/f/user/json_userinfo",
		headers: {
			"User-Agent": "Mozilla/5.0",    // If not specified, navigator.userAgent will be used.
			"Accept": "text/xml"            // If not specified, browser defaults will be used.
		},
		onload: function(response) {
			uid = JSON.parse(response.responseText)["data"]["user_portrait"];
			if(response.readyState == 4){
				getInfo();
			}
		}
	});
	setTimeout(function(){
		setInterval(function(){
			checkDeleted();
		},500);
	},1000);
}

// 获取消息
function getInfo () {
	GM_xmlhttpRequest({
		method: "GET",
		url: "http://message.tieba.baidu.com/i/msg/get_data/",
		headers: {
			"User-Agent": "Mozilla/5.0",    // If not specified, navigator.userAgent will be used.
			"Accept": "text/xml"            // If not specified, browser defaults will be used.
		},
		onload: function(response) {
			var _info = response.responseText;
			_info = _info.replace(/initItiebaMessage\(\[/,"");
			_info = _info.replace(/\]\);/g,"");
			_info = _info.split(",");
			_info[1] = _info[2] = _info[5] = _info[6] = _info[7] = _info[10] = _info[11] = _info[12] = 0;//去除无用信息
			_info[13] = _info[14] = _info[15] = _info[16] = _info[17] = _info[18] = _info[19] = _info[20] = 0;
			if(response.readyState == 4){
				if(_info.length > 30){
					return; //兼容drcom
				}
				if(info.toString() != _info.toString()){
					info = _info;
					setInfo();
				}
			}
		}
	});
	//循环调用
	setTimeout(getInfo,time);
}


// 设置消息（添加到网页中）
function setInfo(){
	// 清除以前的
	var _a = document.getElementById("msg_reminder");
	if (_a != null){
		_a.parentNode.removeChild(_a);
	}
	// 外层框架
	var maindiv = document.createElement("div");
	maindiv.id = "msg_reminder";
	
	// 设置暂时弹出
	setTimeout(function(){
		maindiv.setAttribute("style","right:0;opacity:1;");
	},400);
	setTimeout(function(){
		maindiv.setAttribute("style","right:0;opacity:1;box-shadow:0 0 6px 0px #D24;");
	},1200);
	setTimeout(function(){
		maindiv.setAttribute("style","right:0;opacity:1;box-shadow:0 0 3px 0px #777;");
	},1600);
	setTimeout(function(){
		maindiv.setAttribute("style","right:0;opacity:1;box-shadow:0 0 6px 0px #D24;");
	},2000);
	setTimeout(function(){
		maindiv.setAttribute("style","right:0;opacity:1;box-shadow:0 0 3px 0px #777;");
	},2400);
	
	// 内部框架
	var innerdiv = document.createElement("div");
	innerdiv.id = "msg_reminder_innerbox";
	
	// 关闭按钮
	var closebtn = document.createElement("div");
	closebtn.id = "msg_reminder_closebtn";
	closebtn.addEventListener("click", clearAll, false);
	
	document.body.appendChild(maindiv);
	maindiv.appendChild(innerdiv);
	maindiv.appendChild(closebtn);
	
	// 检测是否有动作，没有则删除
	added_count = 0;
	for(i=0;i<info.length;i++){
		if(info[i] != 0){
			addLine(info[i],i);
		}
	}
	
	if(added_count == 0){
		var _tmp = document.getElementById("msg_reminder");
		_tmp.parentNode.removeChild(_tmp);
		return;
	}
	
	info_cached = info;
	GM_setValue("info_cached",info.toString());
	
	// 延迟缩回
	setTimeout(function(){
		maindiv.setAttribute("style","");
	},2800);
	TbMsgOnshow=GM_getValue("TbMsgOnshow");
	if(!TbMsgOnshow){//检测是否已有窗口，防止重复窗口过多
		showNotification("msg",msg);
		msg="";//由于是全局变量，所以输出一遍之后需要清空，防止不断复制
	}else{
		//console.log("already have a window");
	}
}

function addLine(num,_type){
	var link = "";
	var type = "";
	
	/*
	switch(_type){
		case 0:
			type = "个新粉丝";
			link = "http://tieba.baidu.com/i/sys/jump?u=" + uid + "&type=fans";
			break;
		case 1:
			info[_type] = 0;
			return;
			break;
		case 2:
			type = "个赠送10T豆信息";
			link = "http://tieba.baidu.com/tbmall/getTdou";
			break;
		case 3:
			type = "个新回复";
			link = "http://tieba.baidu.com/i/sys/jump?u=" + uid + "&type=replyme";
			break;
		case 4:
			type = "个新精品";
			link = "http://tieba.baidu.com/i/sys/jump?u=" + uid + "&type=feature";
			break;
		case 5:
			type = "个竞猜结果";
			link = "http://tieba.baidu.com/i/app/guess?uc=" + uid + "&type=main";
			break;
		case 6:
			info[_type] = 0;
			return;
			break;
		case 7:
			info[_type] = 0;
			return;
			break;
		case 8:
			type = "个@提到我";
			link = "http://tieba.baidu.com/i/sys/jump?u=" + uid + "&type=atme";
			break;
		case 9:
			type = "个回收站提醒";
			link = "http://tieba.baidu.com/pmc/recycle";
			break;
		case 10:
			type = "个粉丝福利卡";
			link = "http://tieba.baidu.com/f/i/invite";
			break;
		case 11:
			type = "个T豆商城信息";
			link = "http://tieba.baidu.com/tbmall/message";
			break;
		case 12:
			info[_type] = 0;
			return;
			break;
		case 13:
			info[_type] = 0;
			return;
			break;
		case 14:
			num = "";
			type = "妹纸，Mvp升级了！";
			link = "http://tieba.baidu.com/encourage/get/meizhi/jump?type=meizhiLevelUp";
			break;
		case 15:
			type = "个贴条道具信息";
			link = "http://tieba.baidu.com/tb/zt/tietiao/index.html";
			break;
		case 16:
			type = "个游戏开服通知";
			link = "http://tieba.baidu.com/game/index";
			break;
		case 17:
			type = "彩票开奖提醒";
			link = "http://tieba.baidu.com/f?kw=%B2%CA%C6%B1&tab=lc_mylottery#/user/order";
			break;
		case 18:
			type = "彩票中奖提醒";
			link = "http://tieba.baidu.com/f?kw=%B2%CA%C6%B1&tab=lc_mylottery#/user/account";
			break;
		case 19:
			info[_type] = 0;
			return;
			break;
		case 20:
			info[_type] = 0;
			return;
			break;
		case 21:
			type = "新的好友申请";
			link = "http://tieba.baidu.com/i/sys/jump?u=" + uid + "&type=friendapply";
			break;
		default:
			break;
	}
	*/


	switch(_type){
		case 0:
			type = "个新粉丝";
			link = "http://tieba.baidu.com/i/sys/jump?u=" + uid + "&type=fans";
			break;
		case 1:
		case 2:
			info[_type] = 0;
			return;
			break;
		case 3:
			type = "个新回复";
			link = "http://tieba.baidu.com/i/sys/jump?u=" + uid + "&type=replyme";
			break;
		case 4:
			type = "个新精品";
			link = "http://tieba.baidu.com/i/sys/jump?u=" + uid + "&type=feature";
			break;
		case 5:
		case 6:
		case 7:
			info[_type] = 0;
			return;
			break;
		case 8:
			type = "个@提到我";
			link = "http://tieba.baidu.com/i/sys/jump?u=" + uid + "&type=atme";
			break;
		case 9:
			type = "个回收站提醒";
			link = "http://tieba.baidu.com/pmc/recycle";
			break;
		case 10:
		case 11:
		case 12:
		case 13:
		case 14:
		case 15:
		case 16:
		case 17:
		case 18:
		case 19:
		case 20:
		case 21:
			info[_type] = 0;
			return;
			break;
		default:
			break;
	}
	var newLine = document.createElement("div");
	newLine.setAttribute("type",_type);
	var href = document.createElement("a");
	href.href = link;
	href.setAttribute("target","_blank");
	href.setAttribute("type",_type);
	href.innerHTML = "<span>" + num + type + "</span>";
	href.addEventListener("mouseup",href_clear,false);
	newLine.appendChild(href);
	document.getElementById("msg_reminder_innerbox").appendChild(newLine);
	info[_type] = num;
	added_count++;
	href.innerHTML = num + type ;//不改变一下会在提示窗口输出span tag
	msg+=href.innerHTML+" ";
//	GM_setValue("tbmsg",msg);
//	var test=document.getElementById("msg_reminder_innerbox");//这里弹窗会导致弹窗过快无法显示，加延时会使脚本不能正常继续往下运行，放弃
//	test.addEventListener('click', showNotification, true);
//	href.innerHTML = num + type ;
//	console.log(GM_getValue("TbMsgOnshow"));
/*	if(!(GM_getValue("TbMsgOnshow"))){
		showNotification("message", href.innerHTML);
		//setTimeout(showNotification("message", href.innerHTML),2);
		//showNotification("message", href.innerHTML);
	}else{
		console.log("already have a window");
	}
*/
}

function showNotification(title,msg) {//弹窗函数定义
	Notification.requestPermission(function(perm) {//notify前需要用户手动选择允许弹出提示，不知道怎么去除，只能先将就用了
    	var notification = new Notification(title, {
        dir: "auto",
        lang: "",
        body: msg,
        tag: "sometag",
    });
	TbMsgOnshow=1;
	GM_setValue("TbMsgOnshow",1);//所有标签页都能获取到已有提示窗口
	
	notification.onclose = function () {
		GM_setValue("TbMsgOnshow",0);//窗口关闭时取消占用
		TbMsgOnshow=0;
		//console.log("notification closed");
		//GM_setValue("tbmsg","");
		msg="";//确保
	}
    // notification.onshow = …
    // notification.onerror = …
});
}

function href_clear(e){
	if((e.button == 1 || e.button == 0)){ //0左键   1中键
		//清除记录
		url = "http://message.tieba.baidu.com/i/msg/clear_data?type=" + (1+parseInt(e.target.parentNode.getAttribute("type"))) + "&user=" + uid + "&stamp=" + (new Date()).getTime();
		GM_xmlhttpRequest({
			method: "GET",
			url: url,
		});

		var _tmp = document.getElementById("msg_reminder");
		
		info[parseInt(e.target.parentNode.getAttribute("type"))] = 0;
		
		if(info.toString() == info_or){ //最后一个
			_tmp.setAttribute("style","right:-140px !important;opacity:0 !important;-moz-transition:all ease 0.75s !important;");
			setTimeout(function(){
				_tmp.parentNode.removeChild(_tmp);
			},750);
		}else{
			e.target.parentNode.parentNode.setAttribute("style","height:0;opacity:0.2");
			setTimeout(function(){
				e.target.parentNode.parentNode.parentNode.removeChild(e.target.parentNode.parentNode);
			},740);
		}
		GM_setValue("info_cached",info.toString());
		info_cached = info;
	}else{
		return;
	}
}

function clearAll(){
	var _tmp = document.getElementById("msg_reminder");
	GM_setValue("info_cached",info_or);
	info_cached = info = info_or.split(",");
	_tmp.setAttribute("style","right:-140px !important;opacity:0 !important;-moz-transition:all ease 0.75s !important;");
	setTimeout(function(){
		_tmp.parentNode.removeChild(_tmp);
	},750);
	for(i=1;i<=22;i++){
		GM_xmlhttpRequest({
			method: "GET",
			url: "http://message.tieba.baidu.com/i/msg/clear_data?type=" + i + "&user=" + uid + "&stamp=" + (new Date()).getTime(),
		});
	}
}


function checkDeleted(){
	info_cached = GM_getValue("info_cached").split(",");
	var list = document.querySelectorAll("#msg_reminder_innerbox > div");
	for(i = 0;i < info_cached.length;i++){
		if(info_cached[i] == 0 && info[i] != 0){
			for(j = 0;j < list.length;j++){
				if(list[j].getAttribute("type") == i){
					var _tmp = document.getElementById("msg_reminder");
					info[i] = 0;
					if(info.toString() == info_or){ //最后一个
							_tmp.parentNode.removeChild(_tmp);
					}else{
						list[j].parentNode.removeChild(list[j]);
					}
				}
			}
		}
	}
}


function openSetting(){
	var _time = prompt("输入刷新时间间隔，单位(秒)",parseInt(GM_getValue("time"))/1000);
	while(isNaN(parseInt(_time)) && _time != null){
		var _time = prompt("输入有误！输入刷新时间间隔，单位(秒)","");
	}
	if(_time != null){
		time = parseInt(_time)*1000;
		GM_setValue("time",time);
	}
	
	var _workOnTieba = prompt("是否作用于贴吧页面（http://tieba.baidu.com/*），1为所有网页生效，0为除贴吧外页面生效",GM_getValue("workOnTieba"));
	while(_workOnTieba != 1 && _workOnTieba != 0 && _workOnTieba != null){
		var _workOnTieba = prompt("输入有误！是否作用于贴吧页面（http://tieba.baidu.com/*），1为所有网页生效，0为除贴吧外页面生效","");
	}
	if(_workOnTieba != null){
		workOnTieba = parseInt(_workOnTieba);
		GM_setValue("workOnTieba",workOnTieba);
	}
	alert("若设置改变，刷新页面以生效！");
}

// 检测是否在iframe里

if(window.frameElement != null){
}else{
	if(window.location.href.indexOf("http://tieba.baidu.com") == 0){
		if(workOnTieba){
			GM_addStyle("#com_userbar_message{display:none !important;}");
			//有BUG，暂时屏蔽
			//document.getElementById("local_flash_cnt").parentNode.removeChild(document.getElementById("local_flash_cnt"));
			getUid();
		}
	}else{
		getUid();
	}
}
