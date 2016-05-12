/**
 * Created by diogoxiang on 2016/5/10.
 */


var expect = chai.expect;
var assert = chai.assert;

var v =  new Validator();

describe("validators", function() {

    it("isEmail() 邮箱验证", function() {
        // 断言
        expect( v.isEmail('d.s.s.d@qq.com.cn') ).to.be.true;
        expect( v.isEmail('d.s-s.d@qq.com.cn') ).to.be.true;
        expect( v.isEmail('wowo.o@qq.com') ).to.be.true;
        expect( v.isEmail('wowo@123.sd') ).to.be.true;
        expect( v.isEmail('wowo@123.23') ).to.be.true;
        expect( v.isEmail('wowo.oqqcom') ).to.be.false;
        expect( v.isEmail('wowo@123') ).to.be.false;
        expect( v.isEmail('wowo@asdf.中国') ).to.be.false;
        expect( v.isEmail('wowo@中国.com') ).to.be.false;
        expect( v.isEmail('中@qq.com') ).to.be.false;

    });

    it("isIp() IP验证", function() {
        expect( v.isIp('01.01.01.0') ).to.be.true;
        expect( v.isIp('192.168.1.1') ).to.be.true;
        expect( v.isIp('192.168.23.3') ).to.be.true;
        expect( v.isIp('192.168.23.3.32.1') ).to.be.true;
        expect( v.isIp('192') ).to.be.false;
        expect( v.isIp('192.168.1.1233') ).to.be.false;
        expect( v.isIp('192.168.1324.123') ).to.be.false;
    });

    it("isPhone() 手机号码验证", function() {
        expect( v.isPhone('13611779473') ).to.be.true;
        expect( v.isPhone('+8613611779473') ).to.be.true;
        expect( v.isPhone('+23613611779473') ).to.be.true;
        expect( v.isPhone('+18874505982') ).to.be.false;
    });

});