define(function (require, exports, module) {
    //  管子的构造函数
    function Pipe(ctx, x, upImg, downImg, speed) {
        this.ctx = ctx;
        this.x = x;
        this.upImg = upImg;
        this.downImg = downImg;
        this.speed = speed;
        this.upH = Math.random() * 200 + 100;    //上面管子露出的高度是一个 100-300 的随机数
    }

    Pipe.prototype.setGapAndCount = function (gap, count) {
        Pipe.gap = gap;
        Pipe.count = count;
    };
    Pipe.prototype.draw = function () {
        this.ctx.drawImage(this.upImg, this.x, this.upH - 420);
        this.ctx.drawImage(this.downImg, this.x, this.upH + 150);
    };
    Pipe.prototype.update = function (dt) {
        this.x = this.x + this.speed * dt;
        if (this.x < -52) {
            this.x = this.x + Pipe.gap * Pipe.count;
            this.upH = Math.random() * 200 + 100;
        }
    };
    Pipe.prototype.isHit = function (x, y) {
        return (x > this.x && x < this.x + 52)
            && (!(y > this.upH && y < this.upH + 150));
    };

    module.exports = Pipe;
});