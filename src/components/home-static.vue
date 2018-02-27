<template>
  <div class="home-static">
    <!--delicious-->
    <div class="static-content">
      <div class="img-delicious">
        <img src="/loong/static/img/pic_delicious.png" width="380" height="480">
      </div>
      <div class="float-delicious">
        <p>HIGH QUALITY, FAST DELIVERY</p>
      </div>
      <div class="text-delicious">
        <h4># LOONG-DELIVERY</h4>
        <h2>DELICIOUS<span>ONLINE</span></h2>
        <p>
          We are committed to solve for catering business partners "efficient, timely and clean, fresh" four big
          problems, make delicious food after data processing functions, implementation speed to solve the
          problem of the first class the user to eat.
        </p>
        <ul>
          <li>
            <h6>30</h6>
            <span>Covered cities</span>
          </li>
          <li>
            <h6>10K</h6>
            <span>Cooperative restaurant</span>
          </li>
          <li>
            <h6>1M</h6>
            <span>Order pay day</span>
          </li>
          <li>
            <h6>100K</h6>
            <span>Passenger flow</span>
          </li>
        </ul>
      </div>
    </div>
    <!--efficiency-->
    <div class="static-content">
      <div class="text-efficiency">
        <div class="inner-content">
          <h4># LOONG-DELIVERY</h4>
          <h2>EFFICIENCY <span>FIRST</span></h2>
          <p class="first">
            Efficiency is the winning factor of the enterprise, we are processed
            by big data, and the distribution business is packaged as the
            optimal solution of the process.
          </p>
          <p class="last">
            Replace the human brain with machine <br>
            replace blindly with norms <br>
            let the distribution machine run in order
          </p>
          <img src="/loong/static/img/pic_efficiency_2.png" class="background">
          <img src="../assets/icon/icon_efficiency.png" class="float-icon">
        </div>
      </div>
      <div class="img-efficiency">
        <div class="inner-content">
          <img src="/loong/static/img/pic_delicious_2.png">
          <img src="/loong/static/img/pic_efficiency_1.png">
          <img src="/loong/static/img/pic_efficiency.png">
        </div>
      </div>
    </div>
    <!--app-->
    <div class="static-content">
      <div class="background-app">
        <h4>OUR <span>APPLICATION</span></h4>
        <div class="text">DOWNLOAD</div>
      </div>
    </div>
    <div class="background-img-app"></div>
    <div class="static-content">
      <div class="img-app">
        <img src="/loong/static/img/pic_app.png">
      </div>
      <div class="text-app">
        <div class="app">
          <img src="/loong/static/img/pic_app_1.png">
          <div class="text">
            <p>DOWNLOAD THE APP</p>
            <p>AND ENJOY IT</p>
          </div>
        </div>
        <div class="download">
          <img src="/loong/static/img/pic_app_2.png">
          <img src="/loong/static/img/pic_app_3.png">
        </div>
      </div>
    </div>
    <!--waiting-->
    <div class="static-content">
      <div class="text-waiting">
        <h4># LOONG-DELIVERY</h4>
        <h2>
          WAITING FOR YOU <br>
          <span>TO JOIN</span>
        </h2>
        <p>
          We are an organization that provides meals and distribution
          services for southeast Asia, and aims to promote the sharing
          and distribution of services between restaurants. While helping
          users save money, they also split the cost of distribution for
          restaurants. Operation based on an automated information
          scheduling system. By organizing and dispatching many
          distributors, users can enjoy the convenience of takeout
          and the benefits of take-out.
        </p>
      </div>
      <div class="img-waiting">
        <div class="inner-content">
          <img src="/loong/static/img/pic_waiting.png">
          <img src="/loong/static/img/pic_waiting_1.png" class="float">
          <div class="left-line">FOR A BETTER TOMORROW</div>
          <div class="right-dot">HIGH QUALITY, FAST DELIVERY</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "home-static",
  }
</script>

<style scoped lang="scss">
  .home-static {
    width: 100%;
    height: 2300px;
    .static-content {
      @include container;
      /*border: none;*/
    }
    .inner-content {
      position: relative;
    }
    .img-delicious {
      position: absolute;
      top: 60px;
      left: 0;
    }
    .float-delicious {
      position: absolute;
      top: 83px;
      right: 60px;
      p {
        font-size: 10px;
        color: #999999;
        position: relative;
        &:before {
          content: '';
          width: 10px;
          height: 10px;
          background: $color-primary;
          position: absolute;
          left: 0;
          top: 3px;
          margin-left: -20px;
        }
        &:after {
          content: '';
          width: 50px;
          height: 88px;
          position: absolute;
          right: 0;
          top: 0;
          margin-right: -60px;
          margin-top: -82px;
          border-right: 4px solid #ddd;
          border-bottom: 4px solid #ddd;
        }
      }
    }
    .text-delicious {
      position: absolute;
      top: 154px;
      left: 500px;
      width: 675px;
      h4 {
        font-size: 24px;
        color: #665C5C;
        font-weight: 400;
      }
      h2 {
        margin-top: 10px;
        font-size: 48px;
        font-weight: 400;
        span {
          font-weight: bold;
          color: $color-primary;
          margin-left: 20px;
        }
      }
      p {
        margin-top: 29px;
        font-size: 14px;
        color: #999999;
      }
      ul {
        margin-top: 29px;
        overflow: hidden;
        li {
          float: left;
          text-align: center;
          margin-left: 90px;
          &:first-child {
            margin-left: 0;
          }
          h6 {
            font-size: 36px;
            font-weight: bold;
            color: #332E2E;
          }
          span {
            margin-top: 19px;
            font-size: 12px;
            color: #999999;
          }
        }
      }
    }
    .text-efficiency {
      position: absolute;
      top: 640px;
      left: 0;
      width: 448px;
      h4 {
        color: #665C5C;
        font-size: 20px;
        font-weight: 400;
      }
      h2 {
        font-size: 36px;
        font-weight: 400;
        span {
          color: $color-primary;
          font-weight: bold;
        }
      }
      p.first {
        margin-top: 31px;
        font-size: 14px;
        color: #999999;
        position: relative;
        &:after {
          content: '';
          width: 50px;
          height: 3px;
          background: #332E2E;
          position: absolute;
          left: 0;
          bottom: 0;
          margin-bottom: -40px;
        }
      }
      p.last {
        margin-top: 118px;
        text-align: right;
        font-size: 14px;
        color: #332E2E;
      }
      img.background {
        position: absolute;
        top: 20px;
        left: 0;
        margin-left: -253px;
      }
      img.float-icon {
        position: absolute;
        bottom: 0;
        left: 0;
      }
    }
    .img-efficiency {
      position: absolute;
      top: 450px;
      left: 478px;
      img {
        position: absolute;
        left: 0;
        &:nth-child(2) {
          top: 139px;
        }
        &:last-child {
          top: 84px;
          left: 49px;
        }
      }
    }
    .background-app {
      position: absolute;
      top: 1072px;
      width: 100%;
      h4 {
        float: right;
        font-size: 30px;
        position: relative;
        font-weight: 400;
        margin-right: 146px;
        span {
          font-weight: bold;
        }
        &:after {
          content: '';
          width: 130px;
          height: 2px;
          background: #332E2E;
          position: absolute;
          right: 0;
          top: 19px;
          margin-right: -146px;
        }
      }
      .text {
        clear: both;
        font-size: 100px;
        font-weight: bold;
        color: #f3f3f3;
        width: 100%;
        padding-left: 420px;
        box-sizing: border-box;
      }
    }
    .background-img-app {
      position: absolute;
      top: 1205px;
      left: 0;
      width: 100%;
      height: 360px;
      background: url("/loong/static/img/pic_app_4.png");
    }
    .img-app {
      position: absolute;
      top: 1040px;
    }
    .text-app {
      position: absolute;
      top: 1300px;
      left: 570px;
      .app {
        overflow: hidden;
        img {
          float: left;
        }
        .text {
          float: left;
          margin-left: 20px;
          p:first-child {
            height: 40px;
            line-height: 40px;
            font-size: 30px;
            font-weight: bold;
          }
          p:last-child {
            height: 30px;
            font-size: 24px;
          }
        }
      }
      .download {
        margin-top: 40px;
        img {
          margin-right: 20px;
        }
      }
    }
    .text-waiting {
      position: absolute;
      top: 1800px;
      width: 427px;
      h4 {
        color: #665C5C;
        font-size: 20px;
        font-weight: 400;
      }
      h2 {
        font-size: 36px;
        font-weight: bold;
        span {
          font-weight: 300;
        }
      }
      p {
        margin-top: 36px;
        color: #999999;
      }
    }
    .img-waiting {
      position: absolute;
      top: 1700px;
      left: 497px;
      img {
        display: inline-block;
        position: absolute;
        left: 0;
        top: 0;
        &.float {
          left: 400px;
          top: 219px;
        }
      }
      .left-line {
        width: 300px;
        color: #332E2E;
        border-bottom: 1px solid #332E2E;
        font-size: 9px;
        font-weight: bold;
        margin-left: -250px;
        padding: 20px 0 10px;
      }
      .right-dot {
        margin-top: 60px;
        margin-left: 580px;
        white-space: nowrap;
        font-size: 10px;
        font-weight: bold;
        color: #999999;
        transform: rotate(90deg);
        &:before {
          content: '';
          width: 10px;
          height: 10px;
          background: $color-primary;
          position: absolute;
          left: 0;
          top: 3px;
          margin-left: -20px;
        }
      }
    }
  }
</style>
