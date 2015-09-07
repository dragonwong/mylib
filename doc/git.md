gitk			可视化工具
【git+】

commit -a -m "comment"	可以省略add操作

mv file_from file_to	文件重命名

diff <file>		查看修改内容(add之后无效)
diff HEAD <file>	查看工作区文件和版本库的差异
diff --cached <file>	查看缓存区(git add后)文件与版本库的差异
diff <branch-name> <branch-name>	比较分支差异
diff <branch-name>..<branch-name> <file>	比较分支差异
diff <branch-name>...<branch-name>	比较后者在前者被创建后发生的差异

checkout -- <file>	版本库里的版本替换工作区的版本

场景1：当你改乱了工作区某个文件的内容，想直接丢弃并回到上一次提交点的时候，用命令git checkout -- <file>。

场景2：当你不但改乱了工作区某个文件的内容，还添加到了暂存区时，想丢弃修改，分两步，第一步用命令git reset HEAD <file>，就回到了场景1，第二步按场景1操作。

log			查看提交历史
reset --hard HEAD^	回退上一个版本
reset --hard <版本号>	回退某一个版本

reflog		查看命令历史
reset HEAD@{<num>}	回退到某一命令


clone git@github.com:dragonwong/hello-2.git			远程克隆

remote -v              	查看远程服务器地址和仓库名称
remote add origin git@github.com:dragonwong/hello-1.git		远程创建(key)
remote add origin https://github.com/username/Hello-World.git	远程创建(password)
remote rm <remote-name>	删除远程仓库

push -f							强制提交（忽略远程ahead）
push -u origin master 					提交到远程
push --set-upstream origin <brach-name>			向远程推送分支
pull <remote> <branch>		从远程更新到本地branch
pull				从远程更新（本地有修改）
fetch				从远程更新（本地无修改，不自动合并）

- `checkout -t origin/<branch-name>`
	
	克隆远程分支到本地（本地没有该分支）


checkout -b <branch-name>       创建分支
checkout -b <branch-name> <origin>/<branch-name>		根据远程创建分支
checkout --orphan <branch-name>	创建无父节点的分支
branch -m <oldname> <newname>	分支重命名
branch -m <newname>				当前分支重命名
branch -d <branch-name>			删除分支
branch				查看分支
branch -r           查看远程分支
branch -a			查看所有分支(包括远程)
checkout <branch-name>		切换分支
checkout <file>			签出文件（撤销更改）
clean -df 				删除所有untracked的文件
merge <branch-name>		合并指定分支到当前分支
merge --no-ff -m "merge with no-ff" <branch-name>	禁用“Fast forward”合并分支
log --graph			查看分支合并图


- `config --global user.name "robbin"`

- `config --global user.email "fankai@gmail.com"`

- `config --l`
	
	列举所有配置

- `git rm --cached xxx.xx`	

	delete the file from git without actually deleting it from the filesystem.
	
## submodule

* 子模块信息记载在以下文件中：`.gitmodules`，`.git/config`

资料：

* [Git - Submodules](https://git-scm.com/book/en/v2/Git-Tools-Submodules)
* [How do I remove a Git submodule?](http://stackoverflow.com/a/1260982/2388446)