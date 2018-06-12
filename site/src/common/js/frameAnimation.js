(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        //AMD
        define(factory);
    } else if (typeof exports === 'object') {
        //Node, CommonJS之类的
        module.exports = factory();
    } else {
        //浏览器全局变量(root 即 window)
        window.frame_ani = factory(root);
    }
}(this, function () {
    var isFunc = function (f) {
        return typeof f === 'function';
    }
    /* 从此处开始主要逻辑 */
    //构造器函数
    function frame_ani(config) {
        this.option = {
            canvasTargetId: null, // 目标画布对象ID（必须）
            framesUrl: [], // 每一帧的url（必须）
            audioObject: null, // 音频的对象（优先级高于ION）：未做
            audioIonName: null, // ION音频的名字（优先级高于路径） ：未做
            audioUrl: "", // 音频路径（优先级最低）：未做
            onStart: null, // 加载开始回调函数，传入参数total
            onComplete: null, // 播放完毕回调
            loop: false, // 是否循环
            frequency: 25, // 每秒帧数
            isPlay: false
        }
        // 覆盖默认配置
        if (config) {
            this.option = config;
            this.option.isPlay = false;
        }
        else {
            console.error('参数错误！');
            return;
        }
        this.status = 0; // 状态，0：未启动   1：正在加载   2：播放中（没写）
        this.total = this.option.framesUrl.length || 0; //资源总数
        this.ctx = document.getElementById(this.option.canvasTargetId).getContext('2d'); // 画布上下文

        var that = this;
        if (this.option.audioObject != null) {
            this.bgm = this.option.audioObject;
        } else if (this.option.audioIonName != null) {
            this.bgm_ion_name = this.option.audioIonName;
        } else {
            this.bgm = new Audio(); // 背景音乐！
            this.bgm.onerror = function () { that.bgm = undefined; }
            this.bgm.src = this.option.audioUrl;
        }
    };

    // 预加载
    frame_ani.prototype.initialize = function (callback) {
        this.initialize_cb = callback;
        // 启动加载，图片按顺序存起来，加载完毕后开始播放
        this.status = 1;
        var that = this;

        this.frames = []; // 存帧对象的
        this.currentIndex = 0; //当前正在加载的资源索引

        for (var i = 0, l = this.option.framesUrl.length; i < l; i++) {
            var url = this.option.framesUrl[i];
            var image = new Image();
            image.onload = function () { that.loaded(); };
            image.onerror = function () {
                console.log('preload error.');
                that.loaded();
            };
            image.src = url;
            this.frames.push(image);
            
        }
        // 回调一下启动函数
        if (isFunc(this.option.onStart)) {
            this.option.onStart(this.total);
        }
    }

    //更新图片数目，用于后续不断新增的图片（项目中用于优化图片路径请求数量过大的问题）
    frame_ani.prototype.updateImgs = function (newImgs) {
        this.option.framesUrl = this.option.framesUrl.concat(newImgs);
        this.maxFramesTimes = this.option.framesUrl.length; // 总帧数
        this.total = this.option.framesUrl.length;
        this.initialize();
    }

    // 设置封面
    frame_ani.prototype.setPoster = function () {
        this.calculate();
        this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasWidth);
        try{
            this.ctx.drawImage(this.frames[0],
                0, 0, this.canvasWidth, this.canvasHeight
            );
        }catch(err){
            console.log(err)
        }
        // console.log("画好封面了");
        if (isFunc(this.initialize_cb)) {
            this.initialize_cb();
        }
    }

    // 计算一下宽高和显示位置，默认居中靠底部显示（background-position: center bottom）
    // 非默认的没写
    frame_ani.prototype.calculate = function () {
        this.canvasWidth = $("#" + this.option.canvasTargetId).width();
        this.canvasHeight = $("#" + this.option.canvasTargetId).height();
        // var canvasR = 1.0 * this.canvasWidth / this.canvasHeight; // 窗口的宽高比
        // var imageR = 1.0 * this.option.width / this.option.height;

        // // 用来计算裁剪的宽高
        // if(imageR < canvasR) {
        //     // 宽度相同，高度要裁剪
        //     this.width = this.canvasWidth;
        //     this.height = this.canvasWidth / imageR;

        //     this.sourceWidth = this.option.width;
        //     this.sourceHeight = this.option.width / canvasR;
        //     this.showX = 0;
        //     this.showY = this.option.height - this.sourceHeight;
        // } else {
        //     // 高度相同，宽度要裁剪
        //     this.width = this.canvasHeight * imageR;
        //     this.height = this.canvasHeight;

        //     this.sourceWidth = this.option.height * canvasR;
        //     this.sourceHeight = this.option.height;

        //     this.showX = (this.option.width - this.sourceWidth) / 2;
        //     this.showY = 0;
        // }

        // // 裁剪的起始位置
        // this.showX = (this.option.width - this.canvasWidth) / 2;
        // this.showY = this.option.height - this.canvasHeight;


        //console.log(this.showX, this.showY, this.canvasWidth, this.canvasHeight);
    }

    frame_ani.prototype.destroy = function (){
        this.status = 3;
        this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasWidth);
        this.canvasTargetId = null; 
    }

    // 播放视频
    frame_ani.prototype.play = function () {
        // 设置当前播放帧
        this.currentTimes = this.currentTimes || 0;
        this.maxFramesTimes = this.option.framesUrl.length; // 总帧数
        this.lastTimestamp = undefined;
        // 开始播放
        this.status = 2;
        window.requestAnimationFrame(this.nextFrame.bind(this));
    }

    // 暂停
    frame_ani.prototype.pause = function () {
        this.status = 3;
        // bgm 也停一下
        if (this.bgm != undefined) {
            this.bgm.pause();
        }
        if (this.bgm_ion_name) {
            ion.sound.pause(this.bgm_ion_name);
        }
    }

    // 重置播放序列和音频
    frame_ani.prototype.reset = function () {
        this.currentTimes = 0;
        if (this.bgm) {
            this.bgm.currentTime = 0;
        }
        if (this.bgm_ion_name) {
            ion.sound.stop(this.bgm_ion_name);
        }
    }

    // 绘制下一帧，
    frame_ani.prototype.nextFrame = function (timestamp) {
        if (this.status === 3) {
            // 提前结束了
            if (isFunc(this.option.onComplete)) {
                this.option.onComplete();
            }
            // 双重保障
            if (this.bgm != undefined) {
                this.bgm.pause();
            }
            if (this.bgm_ion_name) {
                ion.sound.stop(this.bgm_ion_name);
            }
            return false;
        }
        var needRedraw = false; // 需要重绘
        if (this.lastTimestamp === undefined) {
            this.lastTimestamp = timestamp;
            this.carryTime = 0; // 上次的余数
            var jumpFrames = 0;
            needRedraw = true;
        } else {
            var jumpFrames = parseInt((timestamp - this.lastTimestamp + this.carryTime) / (1000 / this.option.frequency));
            if (jumpFrames > 0) {
                this.currentTimes += jumpFrames;
                needRedraw = true;
                this.carryTime = (timestamp - this.lastTimestamp + this.carryTime) % (1000 / this.option.frequency);
                this.lastTimestamp = timestamp;
            }
        }
      
        // 重绘
        if (needRedraw && this.currentTimes < this.maxFramesTimes) {
                // 疯狂更新来监听窗口大小变化
                // this.calculate();
                this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
                // console.log(this.canvasWidth, this.canvasHeight);
                // console.log('frame',this.frames[this.currentTimes]);
                try{
                    this.ctx.drawImage(this.frames[this.currentTimes],
                        0, 0, this.canvasWidth, this.canvasHeight
                    );
                }catch(err){
                    console.log(err)
                }
           
            
            
        }

        // 是否继续
        if (this.currentTimes < this.maxFramesTimes) {
            // console.log("下一帧");
            if(this.currentTimes <= this.currentIndex -  Math.max(15,this.option.frequency) || this.currentIndex == this.maxFramesTimes){
                window.requestAnimationFrame(this.nextFrame.bind(this));
            }else{
                let var_this = this;
                this.pause();
                // setTimeout(() => {
                //     var_this.play();
                //     console.log(var_this.currentTimes,var_this.currentIndex)
                // }, 1000);
                var interval = setInterval(function () {
                    
                    if(var_this.currentTimes < var_this.currentIndex){
                        clearInterval(interval);
                        var_this.play();
                    }
                },1000)
            }
            
        } else if (isFunc(this.option.onComplete)) {
            // console.log("没有下一帧");
            this.option.onComplete();
            if (this.option.loop === true) {
                // 需要循环播放
                this.currentTimes = 0;
                this.lastTimestamp = undefined;

                window.requestAnimationFrame(this.nextFrame.bind(this));
            } else {
                // 结束了
                this.status = 3;
                if (this.bgm != undefined) {
                    this.bgm.pause();
                }

            }
        }
        // this.currentTimes++;
    }

    // 计数函数
    frame_ani.prototype.loaded = function () {
        this.currentIndex++;
        // console.log(this.currentIndex)
        // this.currentIndex < 30 && console.log('load'+this.currentIndex);
        if(this.currentIndex > Math.max(15,this.option.frequency) && this.option.isPlay == false){
            this.calculate();
            if (isFunc(this.initialize_cb)) {
                this.initialize_cb();
            }
            this.option.isPlay = true;
        }
        if (this.currentIndex === this.total && this.option.isPlay == false) {
            // 加载完毕，设置一下封面
            this.setPoster();
        }
    }

    //暴露出去
    return frame_ani;
}));