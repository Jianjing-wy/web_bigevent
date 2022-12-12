$(function(){
const layer=layui.layer
const form=layui.form
const laypage=layui.laypage

//定义美化时间的过滤器
template.defaults.imports.dateFormat=function(date){
const dt=new Date(date)
const y=dt.getFullYear()
const m=padZero(dt.getMonth()+1)
const d=padZero(dt.getDate())

const hh=padZero(dt.getHours())
const mm=padZero(dt.getMinutes())
const ss=padZero(dt.getSeconds())

return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
}

//定义补零函数
function padZero(n){
return n>9?n:'0'+n

}

//定义一个查询参数对象data，请求数据的时候 把data提交到服务器
let q={
  pagenum:1,//页码值
  pagesize:2,//每页显示几条数据
  cate_id:'',
  state:''
}
initTable()
getCateList()

//获取文章列表数据
function initTable(){
$.ajax({
method:'GET',
url:'/my/article/list',
data:q,
success:function(res){

if(res.status!==0){
return layer.msg('获取文章列表失败'+res.message)}
const htmlStr=template('tpl_table',res)
$('tbody').html(htmlStr)

//表格渲染完成后 调用渲染分页的函数
renderPage(res.total)
}

})

}
//获取所有分类下拉框
function getCateList (){
$.ajax({
method:'GET',
url:'/my/article/cates',
success:function(res){
if(res.status!==0){
return layer.msg('获取文章列表失败')}
const htmlStr=template('tpl_cate',res)
$('[name=cate_id]').html(htmlStr)
//通知layui重新渲染表单
form.render()
}

})

}

//为筛选表单绑定submit事件
$('#form_search').on('submit',function(e){
e.preventDefault()
const cate_id=$('[name=cate_id]').val()
const state=$('[name=state]').val()
q.cate_id=cate_id
q.state=state

//根据筛选条件 重新渲染表格的数据
initTable()

})

//渲染分页的函数
function renderPage(total){
//调用 laypage.render()方法 来渲染分页结构
laypage.render({
elem:'pageBox',
count:total,
limit:q.pagesize,
curr:q.pagenum,
layout:['count','limit','prev','page','next','skip'],
limits:[2,3,5,10],
// 1.分页发生切换时 触发jump
// 2.只要调用laypage.render（）函数就会触发jump
// 通过first的值 来判断 是通过哪种方式触发的 ture 第二种
jump:function(obj,first){

// console.log(obj.curr); //得到最新的页码值
//把最新页码值 赋值到查询参数对象中
q.pagenum=obj.curr
//把最新条目数 赋值到 q这个查询参数对象的pagesize属性上
q.pagesize=obj.limit
//根据最新的q获取数据列表 并渲染表格 直接调用会死循环
if(!first){
initTable()
}



}
})



}

//删除文章

$('tbody').on('click','#btn_del',function(e){
  //获取删除按钮的个数
  let len=$('#btn_del').length
  const id=$(this).attr('data-id')
  layer.confirm('确认删除?', {icon: 3, title:'提示'}, function(index){
    //do something
    $.ajax({
    method:'GET',
    url:'/my/article/deletecate/'+id,
    success:function(res){
    if(res.status!==0){
    return layer.msg('删除文章失败')
    }
    layer.msg('删除文章成功')

    //判断页面是否还有剩余数据 没有数据就让页面-1
    // 页码值最小是1
    if(len===1){
    q.pagenum=q.pagenum===1? 1:q.pagenum-1
    }
    initTable()
    }
    
    
    })
    
    layer.close(index);
  });

})













})