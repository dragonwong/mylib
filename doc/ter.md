# ter

关于命令行的笔记

## 自定义别名

```bash
# sudo qmb
sqmb
# sudo npm -r ...
qnpm
```

## 其他

```bash
# 文件重命名
mv file_from file_to
    
# 上一条命令 
!!

# 上一条命令的最后一个参数
!$

# 查看文件大小
du -sh

# 查询端口占用
lsof -i :80

# 从当前目录（不包括子目录）中寻找名为 `"test"` 的文件或文件夹
find . -name "test" -maxdepth 1

# 一定时间关机，<time> 为 'now' 立即关机
sudo shutdown -h <time>

# 已该用户权限查看用户操作记录
sudo -u yayu.wang cat /home/yayu.wang/.bash_history

# 改变 <dir> 文件夹的所有权，-R 递归，-v 显示详细信息
sudo chown -R -v <dir> test-floder
```


