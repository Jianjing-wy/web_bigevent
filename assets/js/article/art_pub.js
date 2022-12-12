$(function(){
const layer=layui.layer
const form=layui.form
//定义文章列表的函数
getArtList()
function getArtList(){
$.ajax({
method:'get',
url:'/my/article/cates',
success:function(res){
if(res.status!==0){
return layer.msg('获取文章列表失败')
}
// layer.msg('获取文章列表成功')
const htmlStr=template('tpl_select',res)
$('[name=cate_id]').html(htmlStr)
form.render()
}

})


}


//初始化富文本编辑器
initEditor()

// 1. 初始化图片裁剪器
var $image = $('#image')
  
// 2. 裁剪选项
var options = {
  aspectRatio: 400 / 280,
  preview: '.img-preview'
}

// 3. 初始化裁剪区域
$image.cropper(options)


// 为选择封面按钮绑定 点击事件
$('#btnChooseImage').on('click',function(){
$('#coverFile').click()

})

//为上传文件文本框绑定change事件
$('#coverFile').on('click',function(e){
//获取文件的列表数组
const files=e.target.files
//判断用户是否上传了文件
if(files.length===0){
return layer.msg('请选择图片')}

var newImgURL = URL.createObjectURL(file[0])
$image
   .cropper('destroy')      // 销毁旧的裁剪区域
   .attr('src', newImgURL)  // 重新设置图片路径
   .cropper(options)        // 重新初始化裁剪区域




})


//定义文章的状态
let art_state='已发布'
$('#btnSave').on('click',function(){
  art_state='草稿'

})


$('#form_pub').on('submit',function(e){
e.preventDefault()

//基于form表单 快速创建一个FormData对象
const fd=new FormData($(this)[0])
//将文章的发布状态存到fd里
fd.append('state',art_state)
//将裁剪后后的图片输出为一个文件对象

$image
  .cropper('getCroppedCanvas', { 
    // 创建一个 Canvas 画布
    width: 400,
    height: 280
  })
  .toBlob(function(blob) {
    // 将 Canvas 画布上的内容，转化为文件对象
    // 得到文件对象后，进行后续的操作
    fd.append('cover_img',blob)
    // 发起ajax请求
    publisherArt(fd)
  })
 
})

//定义发表文章的函数
function publisherArt(fd){
$.ajax({
method:'POST',
url:'/my/article/add',
data:fd,
//注意如果向服务器端 提交的数据 是FormData格式 需要添加
//以下两个配置项
contentType:false,
processData:false,
success:function(res){
if(res.status!==0){
return layer.msg('发布文章失败')}

//发布成功后跳转
location.href='/article/art_list.html'


}


})



}


})