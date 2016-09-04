define(function (require, exports, module) {

    //  大地的构造函数
    function Land(ctx, x, img, speed) {
        this.ctx = ctx;
        this.x = x;
        this.img = img;
        this.speed = speed;
    }
//  大地图片的数量
    Land.prototype.setCount = function (count) {
        Land.count = count;
    };
//  大地绘制
    Land.prototype.draw = function () {
        this.ctx.drawImage(this.img, this.x, 488);
    };
//  大地更新
    Land.prototype.update = function (dt) {
        this.x = this.x + this.speed * dt;
        if (this.x < -336) {
            this.x = this.x + 336 * Land.count;
        }
    };

    module.exports = Land;
});