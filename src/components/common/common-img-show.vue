<template>
  <div class="img__view__container" v-if="visible">
    <div class="pswp" tabindex="-1" role="dialog" aria-hidden="true">
      <div class="pswp__bg"></div>
      <div class="pswp__scroll-wrap">
        <div class="pswp__container">
          <div class="pswp__item"></div>
          <div class="pswp__item"></div>
          <div class="pswp__item"></div>
        </div>
        <div class="pswp__ui pswp__ui--hidden">
          <div class="pswp__top-bar">
            <div class="pswp__counter"></div>
            <button class="pswp__button pswp__button--close"></button>
            <button class="pswp__button pswp__button--fs"></button>
            <button class="pswp__button pswp__button--zoom"></button>
            <div class="pswp__preloader">
              <div class="pswp__preloader__icn">
                <div class="pswp__preloader__cut">
                  <div class="pswp__preloader__donut"></div>
                </div>
              </div>
            </div>
          </div>
          <button class="pswp__button pswp__button--arrow--left">
          </button>
          <button class="pswp__button pswp__button--arrow--right">
          </button>
          <div class="pswp__caption">
            <div class="pswp__caption__center"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import $ from 'jquery'
export default {
  components: {},
  data() {
    return {
      visible: true,
      para: {
        list: null,
        index: 0
      },
      imgList: []
    }
  },
  computed: {
    bodyObj() {
      let bodyObj = document.querySelector("body");
      return bodyObj;
    }
  },
  mounted() {
    let self = this;
    if (self.bodyObj.scrollHeight > self.bodyObj.clientHeight) {
      self.bodyObj.setAttribute("style", "padding-right:17px;overflow: hidden;");
    }
    $(function() {
      self.formatImgList();
    });
  },
  methods: {
    initSwiper() {
      let self = this;
      let pswpElement = document.querySelectorAll('.pswp')[0];
      let options = {
        history: false,
        focus: false,
        showAnimationDuration: 0,
        hideAnimationDuration: 0,
        closeOnScroll: false,
        index: self.para.index
      };
      let gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, self.imgList, options);
      gallery.listen('close', function() {
        self.close();
      });
      gallery.init();
    },
    formatImgList() {
      let self = this;
      let length = self.para.list.length;
      let w = 0;
      let h = 0;
      for (let i = 0; i < length; i++) {
        let img = new Image();
        img.src = self.para.list[i];
        img.onload = function() {
          w = img.width;
          h = img.height;
          self.imgList.push({
            src: self.para.list[i],
            w: w,
            h: h
          });
          if (self.imgList.length === length) {
            self.initSwiper();
          }
        }

      }
    },
    close() {
      let self = this;
      if (self.bodyObj.scrollHeight > self.bodyObj.clientHeight) {
        self.bodyObj.removeAttribute("style");
      }
      self.visible = false;
    }
  }
}

</script>
<style scoped lang="scss">
.img__view__container {
  .pswp__ui {
    position: unset;
  }
}

</style>
