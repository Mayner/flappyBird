define(function (require, exports, module) {

    function loadImages(imgUrls, callback) {
        // 加载的计数器
        // 设置它的值为图片的数量
        var count = imgUrls.length;
        // 创建一个对象，用于存储我们创建出来的图片标签
        var imgEls = {};
        for (var i = 0; i < imgUrls.length; i++) {
            // 创建图片标签
            var imgEl = new Image();
            // 设置图片的资源路径，让图片标签开始加载资源
            imgEl.src = imgUrls[i].path;
            // 图片的名字
            var name = imgUrls[i].name;
            imgEls[name] = imgEl;
            // 监听load事件
            imgEl.addEventListener('load', function () {
                // 每当当一张图片已经加载完毕，计数器就减一
                count--;
                // 当计数器为0时，说明所有图片已经加载完毕
                if (count == 0) {
                    // 我们图片加载完成之后要传出去，因为是异步的所以不能return，只好用callback传递数值
                    callback(imgEls);
                }
            });
        }
    }

    module.exports = loadImages;

});