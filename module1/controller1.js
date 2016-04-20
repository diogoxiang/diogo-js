/**
 * Created by diogoxiang on  2016年4月20日13:44:08
 */
define(['text!module1/tpl.html'], function (tpl) {

    var controller = function () {
        appView.html(_.template(tpl, {name: 'kenko'}));
    };
    return controller;
});