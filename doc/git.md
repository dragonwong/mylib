# git

## commit

提交

```bash
# 省略 add 操作
commit -a -m "xxx"
# 修改最近一次提交的提交信息
commit --amend -m "xxx"
# 合并最近的两次提交
git rebase -i HEAD~2
# 合并至某一次提交
git rebase -i <commitHash> # 然后在编辑页面将要合并的提交 pick -> squash
```

## diff

对比

``` bash
# 查看修改内容(add之后无效)
diff <file>
#  查看工作区文件和版本库的差异
diff HEAD <file>
# 查看缓存区(git add后)文件与版本库的差异
diff --cached <file>
# 比较分支差异
diff <branch-name> <branch-name>	
# 比较分支差异
diff <branch-name>..<branch-name> <file>
# 比较后者在前者被创建后发生的差异
diff <branch-name>...<branch-name>
# 只显示文件名
diff --stat
```
## reset

重置

```bash
# 版本库里的版本替换工作区的版本
checkout -- <file>	

# 场景1：当你改乱了工作区某个文件的内容，想直接丢弃并回到上一次提交点的时候：
git checkout -- <file>

# 场景2：当你不但改乱了工作区某个文件的内容，还添加到了暂存区时，想丢弃修改，先：
git reset HEAD <file>
# 就回到了场景1，然后按场景1操作

# 场景3：当拉代码自动合并时有文件冲突了，提示 'error: path <file> is unmerged'，想丢弃修改，先：
git reset <file>
# 就回到了场景1，然后按场景1操作

# 删除所有untracked的文件
clean -df

# 回退上一个版本
reset --hard HEAD^
# 回退某一个版本
reset --hard <版本号>

# 回退到某一命令
reset HEAD@{<num>}
```

## checkout

创建分支

```bash
# 克隆远程分支到本地
checkout -t origin/<branch-name>
# 根据远程创建分支
checkout -b <branch-name> <origin>/<branch-name>
# 创建无父节点的分支
checkout --orphan <branch-name>	
```

## log

历史

```bash
# 查看分支合并图
log --graph
# 查看命令历史
reflog
```

## submodule

子模块信息记载在以下文件中：`.gitmodules`，`.git/config`

新 clone 的项目需要手动下载子模块：

```bash
git submodule update --init --recursive
```

## 未整理

gitk			可视化工具
【git+】

remote add origin git@github.com:dragonwong/hello-1.git		远程创建(key)
remote add origin https://github.com/username/Hello-World.git	远程创建(password)
remote rm <remote-name>	删除远程仓库

push -f							强制提交（忽略远程ahead）
push -u origin master 					提交到远程

> 向远程推送分支

`push --set-upstream origin <brach-name>`

pull <remote> <branch>		从远程更新到本地branch
pull				从远程更新（本地有修改）
fetch				从远程更新（本地无修改，不自动合并）

branch -m <oldname> <newname>	分支重命名
branch -m <newname>				当前分支重命名
branch -d <branch-name>			删除分支
branch				查看分支
branch -r           查看远程分支
branch -a			查看所有分支(包括远程)

merge <branch-name>		合并指定分支到当前分支
merge --no-ff -m "merge with no-ff" <branch-name>	禁用“Fast forward”合并分支


	
- `config --global user.name "robbin"`

- `config --global user.email "fankai@gmail.com"`

- `config --l`
	
	列举所有配置

- `git rm --cached xxx.xx`	

	delete the file from git without actually deleting it from the filesystem.


### 更新

* `git submodule -q foreach git pull -q origin master`
* `git submodule update --init --recursive`
* `git submodule update --rebase --remote`

资料：

* [Git - Submodules](https://git-scm.com/book/en/v2/Git-Tools-Submodules)
* [How do I remove a Git submodule?](http://stackoverflow.com/a/1260982/2388446)
* [git submodule update](http://stackoverflow.com/a/9103113/2388446)

