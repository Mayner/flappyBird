define(function (require, exports, module) {
    var loadImages = require('./loadImages');
    var Bird = require('./bird');
    var Sky = require('./sky');
    var Land = require('./land');
    var Pipe = require('./pipe');

    var cvs = document.getElementById('cvs');
    var ctx = cvs.getContext('2d');

    var imgUrls = [
        {name: 'birds', path: './res/birds.png'},
        {name: 'land', path: './res/land.png'},
        {name: 'pipe1', path: './res/pipe1.png'},
        {name: 'pipe2', path: './res/pipe2.png'},
        {name: 'sky', path: './res/sky.png'}
    ];

    var callback = function (imgEls) {
        // 主逻辑：分为两部分
        //      1. 创建对象
        // TODO: 创建小鸟的对象
        var bird = new Bird(ctx, 150, 50, imgEls['birds'], 0, 0.0005);

        // TODO: 创建天空的对象
        var sky1 = new Sky(ctx, 0, imgEls['sky'], -0.1);
        var sky2 = new Sky(ctx, 800, imgEls['sky'], -0.1);

        // TODO: 传入两张sky图片
        sky1.setCount(2);

        // TODO: 创建大地的对象
        var land1 = new Land(ctx, 0, imgEls['land'], -0.2);
        var land2 = new Land(ctx, 336, imgEls['land'], -0.2);
        var land3 = new Land(ctx, 336 * 2, imgEls['land'], -0.2);
        var land4 = new Land(ctx, 336 * 3, imgEls['land'], -0.2);

        // TODO: 传入四张land图片
        land1.setCount(4);

        // TODO: 创建管子的对象
        var pipe1 = new Pipe(ctx, 500, imgEls['pipe2'], imgEls['pipe1'], -0.2);
        var pipe2 = new Pipe(ctx, 700, imgEls['pipe2'], imgEls['pipe1'], -0.2);
        var pipe3 = new Pipe(ctx, 900, imgEls['pipe2'], imgEls['pipe1'], -0.2);
        var pipe4 = new Pipe(ctx, 1100, imgEls['pipe2'], imgEls['pipe1'], -0.2);
        var pipe5 = new Pipe(ctx, 1300, imgEls['pipe2'], imgEls['pipe1'], -0.2);
        pipe1.setGapAndCount(200, 5);

        // TODO: 点击画布，改变小鸟的速度和方向
        cvs.addEventListener('click', function () {
            bird.speed = - 0.25;
        });

        // TODO: 添加游戏分数
        var gameScore = 0;

        // ---------------------------------------------
        //      2. 主循环
        // 取间隔时间
        var lastTime = Date.now();
        // 同样是延迟执行，但是延迟的时间由浏览器来决定：浏览器会尽量让这个延迟时间符合流畅的动画的标准
        var looper = function () {
            var now = Date.now();
            var dt = now - lastTime; // 间隔时间
            lastTime = now;
            ctx.clearRect(0, 0, 800, 600); // 每帧开始都要把上一帧的图像擦除
            // TODO: 天空的更新和绘制
            sky1.update(dt);
            sky1.draw();
            sky2.update(dt);
            sky2.draw();

            // TODO: 管子的更新和绘制
            pipe1.update(dt);
            pipe1.draw();
            pipe2.update(dt);
            pipe2.draw();
            pipe3.update(dt);
            pipe3.draw();
            pipe4.update(dt);
            pipe4.draw();
            pipe5.update(dt);
            pipe5.draw();

            // TODO: 大地的更新和绘制
            land1.update(dt);
            land2.update(dt);
            land3.update(dt);
            land4.update(dt);
            land1.draw();
            land2.draw();
            land3.draw();
            land4.draw();
            // TODO：调用小鸟的update和draw函数，让小鸟动起来
            bird.update(dt);
            bird.draw();

            // TODO：游戏分数的绘制
            ctx.font = '20px 微软雅黑';
            ctx.fillStyle = '#fff';
            gameScore ++;
            ctx.fillText('分数为：' + gameScore, 50, 30);

            // ---------------------------------------------
            // TODO: 设置游戏结束的条件
            var gameOver = false;
            if (bird.y < 10  || bird.y > 488 - 20) {
                gameOver = true;

            }
            gameOver = gameOver || pipe1.isHit(bird.x, bird.y);
            gameOver = gameOver || pipe2.isHit(bird.x, bird.y);
            gameOver = gameOver || pipe3.isHit(bird.x, bird.y);
            gameOver = gameOver || pipe4.isHit(bird.x, bird.y);
            gameOver = gameOver || pipe5.isHit(bird.x, bird.y);
            if (!gameOver) {
                // 我们需要这个函数被反复的执行
                requestAnimationFrame(looper); // 这个函数执行到最后：会再次延迟执行自身
            }
        };
        requestAnimationFrame(looper);
    };
    // 调用图片加载函数
    loadImages(imgUrls, callback);

    // 点击按钮重新开始加载游戏
    document.getElementById('btn').addEventListener('click', function () {
        loadImages(imgUrls, callback);
    });
});