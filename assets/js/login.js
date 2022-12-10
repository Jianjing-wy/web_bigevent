$(function () {
  //点击"去注册账号"的链接
  $('#link_reg').on('click', function () {
    $('.login_box').hide()
    $('.reg_box').show()
  })
  //点击"去登录"的链接

  $('#link_log').on('click', function () {
    $('.login_box').show()
    $('.reg_box').hide()
  })


  //自定义密码验证
  //从layui中获取form对象
  const form = layui.form
  const layer = layui.layer
  //通过form.verify()函数自定义规则
  form.verify({
    pwd: [
      /^[\S]{6,12}$/
      , '密码必须6到12位,且不能出现空格^_^'
    ],
    //校验确认密码的规则
    //确认密码框 用了repwd验证规则后 行参value得到的就是 确认密码框的值

    repwd: function (value) {
      const content = $('#pwd').val()
      if (value !== content) return '两次输入的密码不一致'

    }

  })

  //监听注册表单的提交事件
  $('#form_reg').on('submit', function (e) {
    e.preventDefault()

    //发起ajax的post请求
    const data = { username: $('#form_reg [name=username]').val(), password: $('#form_reg [name=password]').val() }
    $.post(
      '/api/reguser',
      data,
      function (res) {
        if (res.status !== 0) {
        return layer.msg(res.message)
        }
        layer.msg('终于注册成功了 么么哒')

      }

    )

  })

  //监听登录表单的提交事件
  $('#form_login').on('submit',function(e){
  e.preventDefault()
  //发起ajax请求
  $.ajax({
  url:'/api/login',
  method:'post',
  //快速获取表单中的数据
  data:$(this).serialize(),
  success:function(res){
  if(res.status!==0){
  return layer.msg('登陆失败')}
  layer.msg('恭喜登陆成功')

  //把登录成功的token值存储到本地存储
  localStorage.setItem('token',res.token)
  location.href='/index.html'

  }

  })

  })



})