/**
 * Created by diogoxiang on 16/5/20.
 */
(function (win) {

    console.log(win);
    var tool={

        /**
         * 获取URL上面的 参数
         * @param name
         * @returns {null}
         */
        getQueryString:function(name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
            var r = decodeURIComponent(window.location.search.substr(1)).match(reg);
            if (r != null) return unescape(r[2]); return null;
        },
        /**
         * 本地ajax 拦截请求
         * @param url
         * @param callback
         */
        ajax:function(url,callback){
            var xhr;
            try {xhr = new ActiveXObject('Msxml2.XMLHTTP');   }
            catch (e){
                try {
                    xhr = new ActiveXObject('Microsoft.XMLHTTP');
                }catch (e2){
                    try {  xhr = new XMLHttpRequest();     }
                    catch (e3) {  xhr = false;   }
                }
            }
            xhr.onreadystatechange  = function(){
                if(xhr.readyState  == 4 && xhr.status  == 200){

                    callback&&(callback(JSON.parse(xhr.responseText),xhr))
                }
            };
            xhr.open('GET', url,  true);
            xhr.send(null);
        }


    }


    tool.ajax('data/data.json',function(dt){

        var html=template('rankList',dt);
        
        document.getElementById('list').innerHTML = html;
        
        console.log(dt.rankList.length)

    })


})(window);