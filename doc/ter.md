cd -            返回进入此目录之前所在目录

touch <file>        创建文件
rm <file>       删除文件
rm -rf <dir>        删除目录
    -r  向下递归，一并删除
    -f  强行删除，不做提示
cat <file>      一次显示整个文件
find . -name "test" -maxdepth 1 从当前目录（不包括子目录）中寻找名为“test”的文件或文件夹


open .          打开当前目录

sudo shutdown -h <time> 一定时间关机，time为now立即关机

sudo -u yayu.wang cat /home/yayu.wang/.bash_history 已该用户权限查看用户操作记录