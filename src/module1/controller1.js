/**
 * Created by diogoxiang on  2016年4月20日13:44:08
 */
define(['text!module1/tpl.html'], function (tpl) {

    var controller = function () {
        appView.html(_.template(tpl, {name: 'kenko'}));
    };


    function dovalidate(value)
    {
        vkeywords=/^[^`~!@#$%^&*()+=|\\\][\]\{\}:;'\,.<>/?]{1}[^`~!@$%^&()+=|\\\][\]\{\}:;'\,.<>?]{0,19}$/;
        if(value==null || value=="")
        {
            console.log("请输入正确的查询参数");
            return false
        }
        if(!vkeywords.test(value))
        {
            console.log("查询参数不正确,请重新输入!");
            return false;
        }
        return true;
    }

    return  controller
});