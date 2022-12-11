$(function(){

getUser()
const layer=layui.layer
$('#logout').on('click',function(){
//提示用户是否退出
layer.confirm('确认退出登录吗?', {icon: 3, title:'提示'}, function(index){
  //do something
  //清楚本地存储的token
localStorage.removeItem('token')
  //跳转到登录页
  location.href='/login.html'
  //关闭询问框
  layer.close(index);
});
})

})

//获取用户信息
function getUser(){
$.ajax({
method:'GET',
url:'/my/userinfo',
// headers就是请求头配置对象
// headers:{Authorization:localStorage.getItem('token') || ''},
success:function(res){
if(res.status!==0){
return layui.layer.msg('获取用户信息失败')}
//渲染用户头像的函数
renderAvatar(res.data)
},

})

}

//渲染用户头头像
function renderAvatar(user){
const name=user.nickname||user.username
$('#wel').html(`欢迎 ${name}`)

//头像
if(user.user_pic!==null){
//渲染图片头像
$('.layui-nav-img').attr('src',user.user_pic).sjow()
$('.text-avatar').hide()
}else{
//渲染文本头像
$('.layui-nav-img').hide()
const first=name[0].toUpperCase()
$('.text-avatar').html(first).show()

}
}