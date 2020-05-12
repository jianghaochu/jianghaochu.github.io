Title: 在Windows10中使用Pelican和GitHub Pages建立Blog
Date: 2020-02-15
Category: Python
Tags: Python, Pelican, Git, GitHub Pages
Summary: 本文主要介绍如何在Windows10中使用Python的Pelican包建立静态站点，并使用Git发布至GitHub Pages。

本文主要介绍如何在Windows10中使用Python的Pelican包建立静态站点，并使用Git发布至GitHub Pages。
之前找工作的时候将个人主页发布在了GitHub Pages上，感觉非常好用。
找完工作后一直希望可以重新利用GitHub Pages这项免费的服务。
现在准备使用Github Pages发布一个blog，发一点工作学习中有意思的事情。第一篇blog就介绍
一下使用GitHub Pages建立blog的方法。

首先介绍一下接下来将要用到的两个工具：Github Pages和pelican。GitHub Pages是GitHub在2008
年推出的一项静态站点托管服务。它直接从GitHub上的仓库获取HTML、CSS和JavaScript文件，（可选）通过构建过程运行文件，然后发布网站。
Pelican是Python中用来生成静态站点的package。虽然GitHub建议使用Jekyll作为静态站点生成器，而且Jekyll内置GitHub Pages支持和简化的构建流程，
但是Jekyll需要安装Ruby，作为从来没有使用过Ruby的人来说稍显复杂。而且我现在主要使用的是公司提供的笔记本电脑，
不想安装太多和工作无关的程序。现在正在进行的项目是用Python编写的，于是希望能更多的使用Python，也算是为以后的工作做准备。
废话少说，接下来我们就来介绍一下如何使用pelican制作个人blog，然后发布至Github Pages。

### 创建GitHub账户
要使用GitHub Pages首先需要一个可用的GitHub账户。由于我之前使用过GitHub Pages
，所以我这里直接使用我之前注册的账户。没有GitHub账户的朋友可以到Github首页按流程免费注册。注册完成后，要使用GitHub
 Pages，我们只需要在自己的GitHub账户下建立一个名为username.github.io的repository
 。username就是你想要使用的GitHub账号的用户名。接下来我们只需要把我们做好的站点文件上传到username.github
 .io这个repository的master branch下，我们的网站就在username.github.io
 这个域名上发布了。互联网上的所有人都可以通过在浏览器地址栏输入username.github.io
 访问到我们发布的内容。更多关于GitHub Pages的介绍和使用说明可以在[GitHub Pages主页](https
 ://pages.github.com/)和[GitHub Pages帮助文档](https://help.github.com/cn/github/working-with-github-pages)中找到，这里就不再赘述。若有什么问题也可以留言给我，我将尽力回答。（留言功能我将会尽快设置，设置好之后我会再写一篇文章介绍具体的设置方法。）

创建好GitHub repository之后， 在本地电脑新建一个文件夹用来存放所有和站点有关的文件。然后进入文件夹，使用Git
将GitHub云端的的repository克隆到本地。
```text
git clone https://github.com/username/username.github.io.git
```

这样我们就将GitHub云端的repository和本地的文件联系在了一起。接下来我们着重介绍一下如何使用pelican建立静态站点以及如何将建立的静态站点方便快捷的发布到GitHub Pages上。

### 使用pelican-quickstart创建静态站点
首先使用命令行安装pelican和markdown：
```text
pip install pelican markdown
```
然后使用命令行运行`pelican-quickstart`命令：
```text
pelican-quickstart
```
根据需要回答问题。以下是我的回答：
```text
> Where do you want to create your new web site? [.]
> What will be the title of this web site? My Blog
> Who will be the author of this web site? Me
> What will be the default language of this web site? [English] en
> Do you want to specify a URL prefix? e.g., https://example.com   (Y/n) n
> Do you want to enable article pagination? (Y/n) n
> What is your time zone? [Europe/Paris]
> Do you want to generate a tasks.py/Makefile to automate generation and publishing? (Y/n) n
```
需要注意的是若在Windows中使用pelican，最后一个问题推荐选No。因为Windows默认未安装Make命令，若选择是需要单独安装Make功能，而且过程并不简单。

### 添加内容页面
站点已经建立好了，接下来为站点添加内容。首先在站点目录下（若是使用我的回答，就是terminal的当前目录）新建
一个名为content的文件夹用来保存内容页面。 然后在content文件夹下创建新的内容页面，以md作为文件拓展名，如my-first-blog.md。
在my-first-blog.md文件中输入：
```markdown
Title: My First Blog
Date: 2020-03-22
Category: Blog

This is the first blog of my site.
```
在命令行中输入：
```text
pelican content
pelican --listen
```
然后在浏览器地址栏输入localhost:8000便可以在本地电脑中看到做出的blog的效果。

### 发布至GitHub Pages
接下来需要将做好的静态展点发布至GitHub Pages。由于之前在创建GitHub账号的时候我们已经将云端repository和本地文件建立了联系，现在我们可以直接使用一下命令将本地文件上传至云端。
```text
git add .  # 将修改过的本地文件添加到Git目录中
git commit -a -m "my first post"  # Commit我们所做的修改
git push -u origin pelican  # 将站点的源文件上传至GitHub repository的pelican branch中
pelican content -o output -s pelicanconf.py  # 使用pelican建立站点，并将编译好的站点文件存在output文件夹中
ghp-import output -r origin -b master  # 将output文件夹中的文件复制到master branch
git push origin master  # 将master branch上传至云端
git checkout pelican  # 返回pelican branch
```
以后每次对网站做出修改之后只需要重新执行上述命令就可以在网站上看到所做的修改。注意这里我们在GitHub上建立了两个branch，master branch用来存放编译好的站点文件，浏览器在访问我们的网站的时候也会从master branch里寻找相应的文件。pelican branch用来编译网站的源文件，pelican的设置文件、每一篇blog的Markdown文件等不需要浏览器看到的文件都存在这个branch上。

稍微等上几分钟，然后在浏览器中输入我们网站的地址，就可以看到刚刚发布的网站了。
