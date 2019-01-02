---
layout: post
title:  "Jekyll-Tutorial中文搬运"
categories: 技巧
tags:  jekyll
author: littleRound
comment: true
excerpt: 这篇博客主要是搬运 https://jekyllrb.com/docs/ ，搞个中文精简版，如果有任何写的不清楚的地方欢迎指出，也推荐参考英文原文。
---

* content
{:toc}

{% raw %}

# Jekyll-Tutorial中文搬运

## 前言

岁月不居，时节如流，转眼间2019年已到。受到马达学长的启发以及实验室trac数据丢失的影响，我也决定自己搭个博客，一来能避免多年以后忘记这时候我在干啥；二来也能假装自己在做事让自己安心一些。

这篇博客主要是搬运 [Jekyll-tutorial](https://jekyllrb.com/docs/) ，搞个中文精简版，如果有任何写的不清楚的地方欢迎指出，也推荐参考英文原文。

## 环境准备

我是在ubuntu上安装的相关环境，首先创建一个脚本文件，起个名字```install_jekyllrb.sh```，写入下面内容之后```./install_jekyllrb.sh```运行它

```shell
#!/bin/bash
# dependencies
sudo apt-get install ruby-full build-essential zlib1g-dev
# add environment variables
echo '# Install Ruby Gems to ~/gems' >> ~/.bashrc
echo 'export GEM_HOME="$HOME/gems"' >> ~/.bashrc
echo 'export PATH="$HOME/gems/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc
# install Jekyll
gem install jekyll bundler
```

在目录运行```jekyll new test_site&& cd test_site && bundle exec jekyll serve```无报错说明安装成功，可以在 [http://localhost:4000](http://localhost:4000) 查看结果

## 基本命令

首先需要创建一个项目目录并初始化为git目录([git init](https://guides.github.com/introduction/git-handbook/))，在目录中你可以使用

- ```jekyll build```来编译静态页面
- ```jekyll serve```在本地http://localhost:4000提供web服务且**每次更改文件后自动重新编译**

## Liquid

- Objects ```{{object name}}```
  - 一些常用的object
    - ```{{content}}```表示引用者的内容（更多请参考layout章节）
    - ```{{page.url}}```表示当前url（从第一个'/'开始算，含这个'/'）

- Tags ```{%logic and control flow%}```
  - 关于可用的[Tags](https://jekyllrb.com/docs/liquid/tags/)
  - 常用的```if, for, assign```

- Filters ```{{input | filter}}```
  - 关于[可用的Filters](https://jekyllrb.com/docs/liquid/filters/)

## Front Matter

一些数据，使用YAML格式，写在文件的最上方，由三横杠"---"开始并由三横杠结束，例如

```
---
my_number: 5
---
```

使用时就可以用```{{page.my_number}}```来表示

## Markdown

一种非常方便的标记语言，可参考[教程](https://daringfireball.net/projects/markdown/syntax)

## Layout

一种代码重用的机制，通过在```_layouts```文件夹中添加模板文件，如```_layouts/default.html```

```html
<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <title>{{ page.title }}</title>
  </head>
  <body>
    {{ content }}
  </body>
</html>
```

可以在其他页中指定使用该模板，并把内容带入```{{content}}```，如

```html
---
layout: default
title: Home
---
<h1>{{ "Hello World!" | downcase }}</h1>
```

同样可以让markdown文件使用模板，如

```
---
layout: default
title: About
---
# About page

This page tells you a little bit about me.
```

## Include

又一种代码重用机制，通过在```_includes```文件夹内添加“组件”来作为重用网页的一部分（如导航栏），如```_includes/navigation.html```

```html
<nav>
  <a href="/">Home</a>
  <a href="/about.html">About</a>
</nav>
```

使用时可直接

```html
<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <title>{{ page.title }}</title>
  </head>
  <body>
    {% include navigation.html %}
    {{ content }}
  </body>
</html>
```

但导航栏通常会显示当前页，为了完成这一层逻辑，我们可以将上面的```_includes/navigation.html```改为

```html
<nav>
  <a href="/" {% if page.url == "/" %}style="color: red;"{% endif %}>
    Home
  </a>
  <a href="/about.html" {% if page.url == "/about.html" %}style="color: red;"{% endif %}>
    About
  </a>
</nav>
```

这里用到了```{{page.url}}```这一Object

## Data Files

在```_data```目录下，可以使用YAML, JSON 或CSV存放数据，并在其他文本中使用objects作引用，例如假设我们有```_data/navigation.yml```

```yaml
- name: Home
  link: /
- name: About
  link: /about.html
```

那么我们就可以使用```site.data.navigation```来更好的整理导航

```html
<nav>
  {% for item in site.data.navigation %}
    <a href="{{ item.link }}" {% if page.url == item.link %}style="color: red;"{% endif %}>
      {{ item.name }}
    </a>
  {% endfor %}
</nav>
```

## Assets

可以把css、 images、 js等资源都放进assets里，相当于作为静态文件使用

如果有兴趣可以阅读[Sass]([Sass](https://sass-lang.com/))，听说可以用来整理CSS文件

## Posts

在```_posts```目录下，我们可以创建形如```_posts/2018-08-20-bananas.md```的文件，其中前面内容是日期（注意补0），后面是title（可以通过```{{page.title}}```访问）

下面给出一个使用post相关objects来展示全部博文的例子

```html
---
layout: default
title: Blog
---
<h1>Latest Posts</h1>

<ul>
  {% for post in site.posts %}
    <li>
      <h2><a href="{{ post.url }}">{{ post.title }}</a></h2>
      <p>{{ post.excerpt }}</p>
    </li>
  {% endfor %}
</ul>
```

其中```post.url```是自动生成的博文的链接，```post.excerpt```是引言（默认设置是内容第一段）

## Collections

增加一个collections项可创建其它内容类别，以“作者”为例。我们可以创建一个新的collection来代表作者，这样我们就可以让博文按作者排序，或者给每个作者一个主页。

我个人的理解是collection给了jekyll一个抽象的机制，让编写时能够更为优雅。

创建collection的步骤如下

- 创建（或修改）```_config.yml```文件（记得该文件修改后需要重启jekyll）

  ```yml
  collections:
    authors:
  ```

- 创建```_*collection_name*```的文件夹（这里我们用```_authors```）

- 在文件夹里为每一个该collection的实例创建md文档（注意，在使用```collection_instance.content```方法时，如果内容为markdown需要添加markdownify的Filter）

  ```html
  ---
  layout: default
  title: Staff
  ---
  <h1>Staff</h1>
  
  <ul>
    {% for author in site.authors %}
      <li>
        <h2>{{ author.name }}</h2>
        <h3>{{ author.position }}</h3>
        <p>{{ author.content | markdownify }}</p>
      </li>
    {% endfor %}
  </ul>
  ```

## Config

另一件需要知道的关于```_config.yml```的事是， 可以通过它为不同文件夹下的内容设置一些默认Front matter，如

```yaml
collections:
  authors:
    output: true

defaults:
  - scope:
      path: ""
      type: "authors"
    values:
      layout: "author"
  - scope:
      path: ""
      type: "posts"
    values:
      layout: "post"
  - scope:
      path: ""
    values:
      layout: "default"
```

## Gemfile

一些环境版本相关的琐碎事项，详细了解可以去官网。

操作方法为创建```Gemfile```文件

```shell
source 'https://rubygems.org'

gem 'jekyll'

group :jekyll_plugins do
  gem 'jekyll-sitemap'
  gem 'jekyll-feed'
  gem 'jekyll-seo-tag'
end
```

并运行```bundle install```, ```bundle update```,并在之后运行时使用```bundle exec jekyll ***```来确保使用稳定版本。

## 在此之后

去[http://jekyllthemes.org](http://jekyllthemes.org)找一个自己看着顺眼的主题，在其github主页的readme里看下怎么配置即可。

{% endraw %}