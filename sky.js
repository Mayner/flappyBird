define(function (require, exports, module) {
    //  天空的构造函数
    function Sky(ctx, x, img, speed) {
        this.ctx = ctx;
        this.x = x;
        this.img = img;
        this.speed = speed;
    }
//  天空图片的数量
    Sky.prototype.setCount = function (count) {
        Sky.count = count;
    };
//  天空绘制
    Sky.prototype.draw = function () {
        this.ctx.drawImage(this.img, this.x, 0);
    };
//  天空更新
    Sky.prototype.update = function (dt) {
        this.x = this.x + this.speed * dt;
        if (this.x < -800) {
            this.x = this.x + 800 * Sky.count;
        }
    };

    module.exports = Sky;
});