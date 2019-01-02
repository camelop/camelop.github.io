/* jshint asi:true */
//先等图片都加载完成
//再执行布局函数

/**
 * 执行主函数
 * @param  {[type]} function( [description]
 * @return {[type]}           [description]
 */
(function() {

  /**
     * 内容JSON
     */
  var demoContent = [
    {
      demo_link: 'http://littleround.cn/QuPlayground/',
      img_link: 'http://littleround.cn/QuPlayground/thumbnails/bell.png',
      code_link: 'https://github.com/camelop/QuPlayground',
      title: 'QuPlayground\n量子电路模拟',
      core_tech: 'JavaScript',
      description: 'A new way to test your ideas about quantum circuit.'
    }, 
    {
      demo_link: 'http://ys.littleround.cn',
      img_link: 'http://ys.littleround.cn/static/uploads/snapshots/%E5%9B%B4%E6%A3%8B%E6%B0%94%E4%B8%8E%E7%9C%BC%E4%B8%89.jpg',
      code_link: '#',
      title: 'YuShui\nAid Education',
      core_tech: 'Django',
      description: '2018年7月，突发的泥石流导致成昆铁路中断，原计划于四川省凉山州昭觉中学展开的支教活动被迫取消。长三角荣誉学院联盟将支教活动调整为通过支教课程资料整理和支教团现状调研，搭建一款适合国内大学生支教团队参考的支教经验及课程内容分享平台，也为了明年更好地“再出发。 平台故取名为‘鱼水“，以此纪念这场中断了四校支教团队与昭觉中学学生的雨水，亦展现祖国众多支教学生和偏远地区参与支教活动学生的鱼水之情。'
    },
    {
      demo_link: 'https://github.com/camelop/UTJS/blob/master/README.md',
      img_link: 'https://github.com/Evensgn/UTJS/raw/master/manual_images/1.gif',
      code_link: 'https://github.com/camelop/UTJS',
      title: 'UTJS',
      core_tech: 'Qt',
      description: '通用火车旅行系统(Universal Train Journey System)是utjs小组提交的ACM班2017年数据结构课的大作业项目。 '
    }, 
    {
      demo_link: 'http://littleround.cn/Speechlab-Tone-Classification/',
      img_link: 'https://github.com/camelop/Speechlab-Tone-Classification/raw/master/README_pic/tone1234.png',
      code_link: 'https://github.com/camelop/Speechlab-Tone-Classification',
      title: 'Tone-Classification',
      core_tech: 'Python',
      description: 'Classify tones of single Chinese characters (different characters in different cases) by their f0/engy sequences.'
    }

  ];

  contentInit(demoContent) //内容初始化
  waitImgsLoad() //等待图片加载，并执行布局初始化
}());

/**
 * 内容初始化
 * @return {[type]} [description]
 */
function contentInit(content) {
  // var htmlArr = [];
  // for (var i = 0; i < content.length; i++) {
  //     htmlArr.push('<div class="grid-item">')
  //     htmlArr.push('<a class="a-img" href="'+content[i].demo_link+'">')
  //     htmlArr.push('<img src="'+content[i].img_link+'">')
  //     htmlArr.push('</a>')
  //     htmlArr.push('<h3 class="demo-title">')
  //     htmlArr.push('<a href="'+content[i].demo_link+'">'+content[i].title+'</a>')
  //     htmlArr.push('</h3>')
  //     htmlArr.push('<p>主要技术：'+content[i].core_tech+'</p>')
  //     htmlArr.push('<p>'+content[i].description)
  //     htmlArr.push('<a href="'+content[i].code_link+'">源代码 <i class="fa fa-code" aria-hidden="true"></i></a>')
  //     htmlArr.push('</p>')
  //     htmlArr.push('</div>')
  // }
  // var htmlStr = htmlArr.join('')
  var htmlStr = ''
  for (var i = 0; i < content.length; i++) {
    htmlStr += '<div class="grid-item">' + '<a class="a-img" href="' + content[i].demo_link + '">' + '<img src="' + content[i].img_link + '">' + ' </a>' + '   <h3 class="demo-title">' + '       <a href="' + content[i].demo_link + '">' + content[i].title + '</a>' + '   </h3>' + '   <p><br>主要技术：</br>' + content[i].core_tech + '</p>' + '   <p>        <a href="' + content[i].code_link + '">源代码 <i class="fa fa-code" aria-hidden="true"></i></a>' + '<br>'+content[i].description+'   </p>' + '</div>'
  }
  var grid = document.querySelector('.grid')
  grid.insertAdjacentHTML('afterbegin', htmlStr)
}

/**
 * 等待图片加载
 * @return {[type]} [description]
 */
function waitImgsLoad() {
  var imgs = document.querySelectorAll('.grid img')
  var totalImgs = imgs.length
  var count = 0
  //console.log(imgs)
  for (var i = 0; i < totalImgs; i++) {
    if (imgs[i].complete) {
      //console.log('complete');
      count++
    } else {
      imgs[i].onload = function() {
        // alert('onload')
        count++
        //console.log('onload' + count)
        if (count == totalImgs) {
          //console.log('onload---bbbbbbbb')
          initGrid()
        }
      }
    }
  }
  if (count == totalImgs) {
    //console.log('---bbbbbbbb')
    initGrid()
  }
}

/**
 * 初始化栅格布局
 * @return {[type]} [description]
 */
function initGrid() {
  var msnry = new Masonry('.grid', {
    // options
    itemSelector: '.grid-item',
    columnWidth: 250,
    isFitWidth: true,
    gutter: 20
  })
}
