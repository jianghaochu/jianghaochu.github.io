Title: 在Windows10中使用Pelican和GitHub Pages建立Blog
Date: 2020-02-15
Category: Python
Tags: Python, Pelican, Git, GitHub Pages

本文主要介绍如何在Windows10中使用Python的Pelican包建立静态站点，并使用Git发布至GitHub Pages上。

之前找工作的时候使用GitHub
 Pages
建立了一个个人主页，找到工作之后就荒废掉了。一直希望可以重新利用GitHub Pages这项免费的服务。现在准备将Github Pages升级成个人的blog，发一点工作学习中碰到的有意思的东西。第一篇blog就介绍一下使用GitHub Pages建立blog的经过。

首先介绍一下接下来将要用到的两个工具：Github Pages和pelican。GitHub Pages是GitHub在2008
年推出的一项静态站点托管服务。它直接从GitHub上的仓库获取HTML、CSS和JavaScript文件，（可选）通过构建过程运行文件，然后发布网站。Pelican是python中用来生成静态站点的package。虽然GitHub建议使用Jekyll作为静态站点生成器，而且Jekyll内置GitHub Pages支持和简化的构建流程，但是Jekyll需要安装Ruby，作为从来没有使用过Ruby的人来说稍显复杂，并且我现在主要的工作设备是公司提供的笔记本电脑，不想安装太多和工作无关的程序。最近公司在推广python，我开始工作的第一个项目也是用python编写的，于是希望能更多的使用python，也算是为以后的工作做准备。废话少说，接下来我们就来介绍一下如何使用pelican来制作个人blog然后发布到Github Pages上。

### 创建GitHub账户
要使用GitHub Pages首先需要一个可用的GitHub账户。由于我之前使用过GitHub Pages
，所以我这里直接使用我之前注册的账户。没有GitHub账户的朋友可以到Github首页按流程免费注册。注册完成后，要使用GitHub
 Pages，我们只需要在自己的GitHub账户下建立一个名为username.github.io的repository
 。username就是你想要使用的GitHub账号的用户名。接下来我们只需要把我们做好的站点文件上传到username.github
 .io这个repository的master branch下，我们的网站就在username.github.io
 这个域名上发布了。互联网上的所有人都可以通过在浏览器地址栏输入username.github.io
 访问到我们发布的内容。更多关于GitHub Pages的介绍和使用说明可以在[GitHub Pages主页](https
 ://pages.github.com/)和[GitHub Pages帮助文档](https://help.github.com/cn/github/working-with-github-pages)中找到，这里就不再赘述。若有什么问题也可以留言给我，我将尽力回答。（留言功能我将会尽快设置，设置好之后我会再写一篇文章介绍具体的设置方法。）

接下来我们着重介绍一下如何使用pelican建立静态站点以及如何将建立的静态站点方便快捷的发布到GitHub Pages上。

### 使用pelican-quickstart创建静态站点
首先使用terminal安装pelican和markdown：
```text
pip install pelican markdown
```
然后使用terminal运行`pelican-quickstart`命令：
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
一个名为content的文件夹用来保存页面内容。 然后在content文件夹下创建新的内容页面，以md作为文件拓展名，如my-first-blog.md。
在my-first-blog.md文件中输入：
```markdown
Title: My First Blog
Date: 2020-03-22
Category: Blog

This is the first blog of my site.
```
在terminal中输入
```text
pelican content
pelican --listen
```
然后在浏览器地址栏输入localhost:8000便可以在本地电脑中看到做出的blog的效果。

### 发布至GitHub Pages
```text
git add .
git commit -a -m %1
git push -u origin pelican
pelican content -o output -s pelicanconf.py
ghp-import output -r origin -b master
git push origin master
git checkout pelican
```