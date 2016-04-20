/**
 * Created by diogoxiang on  2016年4月20日13:44:08
 */
define(['text!module2/tpl.html'], function (tpl) {

    var controller = function (name) {
        appView.html(_.template(tpl, {name: name?name:'vivi'}));

        $('button').on('click', function clickHandler() {
            alert('hello');
        });

        controller.onRouteChange = function () {
            console.log('change');      //可以做一些销毁工作，例如取消事件绑定
            $('button').off('click');   //解除所有click事件监听
        };
    };

    return controller;
});