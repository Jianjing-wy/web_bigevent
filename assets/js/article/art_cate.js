$(function () {
  const layer = layui.layer
  const form=layui.form
  initArtCateList()
  //获取文章列表函数

  function initArtCateList() {
    $.ajax({
      method: 'GET',
      url: '/my/article/cates',
      success: function (res) {
        const htmlStr = template('tpl-art', res)
        $('tbody').html(htmlStr)
      }
    })
  }
  //为添加类别按钮 添加点击事件
  let indexAdd=null
  $('#btn-addCte').on('click', function () {
   indexAdd= layer.open({
      type:1,
      area: ['500px', '250px'],
      title: '添加文章分类',
      content: $('#dialog-add').html()
    });
  })
//事件委托为dialogForm表单 添加 监听表单提交事件
$('body').on('submit','#dialogForm',function(e){

e.preventDefault()
$.ajax({
method:'POST',
url:'/my/article/addcates',
data:$(this).serialize(),
success:function(res){
if(res.status!==0){
return layer.msg('添加文章失败')}

initArtCateList()
layer.msg('添加文章成功')
layer.close(indexAdd)
}
})

})

//为编辑按钮绑定点击事件
let indexEdit=null
$('tbody').on('click','#btn_edit',function(){
  indexEdit= layer.open({
    type:1,
    area: ['500px', '250px'],
    title: '修改文章分类',
    content: $('#dialog-edit').html()
  });
const id=$(this).attr('data-id')
//发起请求 获取对应的数据
$.ajax({
method:'GET',
url:'/my/article/cates/'+id,
success:function(res){
// console.log(res);
//form.val()快速为表单赋值
form.val('editForm',res.data)


}
})

})


//事件委托 为修改分类的表单添加submit事件
$('body').on('submit','#editForm',function(e){
e.preventDefault()

$.ajax({
method:'POST',
url:'/my/article/updatecate',
data:$(this).serialize(),
success:function(res){
if(res.status!==0){
return layer.msg('更新文章数据失败')}
layer.msg('更新文章数据成功')
initArtCateList()
layer.close(indexEdit)

}

})



})

//事件委托 为删除按钮绑定事件
$('tbody').on('click','#btn_delete',function(){
//询问 框 是否要删除
const id=$(this).attr('data-id')
layer.confirm('确认删除?', {icon: 3, title:'提示'}, function(index){
  $.ajax({
  method:'GET',
  url:'/my/article/deletecate/'+id,
  success:function(res){
  if(res.status!==0){
  return layer.msg('删除文章失败')
  }
  layer.msg('删除文章成功')
initArtCateList()

  //关闭弹出层
  layer.close(index);
  }  
  })
  
  
});


})

})