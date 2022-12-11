$.ajaxPrefilter(function(options){
//在这个函数中 我们可以拿到 我们提供的ajax配置对象
options.url='http://api-breakingnews-web.itheima.net'+options.url

//统一为有权限的接口设置请求头
if(options.url.indexOf('/my/')!==-1){
  options.headers={Authorization:localStorage.getItem('token') || ''}}
//http://www.liulongbin.top:3007
//http://api-breakingnews-web.itheima.net


//全局统一挂载complete函数
options.complete=function(res){
  //无论ajax请求失败还是成功都会调用complete函数
// 在complete回调函数中 可以使用responseJSON拿到服务器相应回来的数据
if(res.responseJSON.status===1&&res.responseJSON.message==='身份认证失败！'){
  //强制清空token
  localStorage.removeItem('token')
  //强制跳转到登陆页面
  location.href='/login.html'
  }


}

})