$.ajaxPrefilter(function(options){
//在这个函数中 我们可以拿到 我们提供的ajax配置对象
options.url='http://api-breakingnews-web.itheima.net'+options.url

console.log(options.url);

})