`cd -`

返回进入此目录之前所在目录

`find . -name "test" -maxdepth 1`

从当前目录（不包括子目录）中寻找名为 `"test"` 的文件或文件夹

`sudo shutdown -h <time>`

一定时间关机，`<time>` 为 `now` 立即关机

`sudo -u yayu.wang cat /home/yayu.wang/.bash_history`

已该用户权限查看用户操作记录

`!$`

上一次命令的参数

`sudo chown -R -v <dir> test-floder`

改变 `<dir>` 文件夹的所有权，`-R` 递归，`-v` 显示详细信息