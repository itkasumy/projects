<template>
  <div class="reduction-list" v-if="visible">
    <div class="panel">
      <div class="list">
        <label @change="chooseReduction">
          <span>不使用优惠</span>
          <div class="point" :class="{active: reduction === null}"></div>
          <input type="radio" v-model="picked" :value="null">
        </label>
        <label v-for="(item, index) in reductionList" :key="index" @change="chooseReduction">
          <span>{{item | titleTran}}</span>
          <div class="point" :class="{active: reduction && item.id === reduction.id}"></div>
          <input type="radio" v-model="picked" :value="item">
        </label>
      </div>
      <div class="bottom" @click="close">取消</div>
    </div>
  </div>
</template>

<script>
  import {mapState, mapMutations} from 'vuex'

  export default {
    name: "reduction-list",
    props: [],
    components: {},
    data() {
      return {
        visible: false,
        picked: null
      }
    },
    computed: {
      ...mapState('order', ['reductionList', 'reduction']),
    },
    filters: {
      titleTran(item) {
        let title = ''
        if (item.control_type === 2) {
          title = `支付满减：满${item.limitcontent}减${item.discount_amount}`
        } else {
          title = `支付折扣：${item.pay_discount / 10}折，最多减${item.maximum_discount}`
        }
        return title
      }
    },
    methods: {
      ...mapMutations('order', ['setReduction']),
      show() {
        this.visible = true
      },
      close() {
        this.visible = false
      },
      chooseReduction() {
        this.setReduction(this.picked)
        setTimeout(() => {
          this.close()
        }, 100)
      },
    }
  }
</script>

<style scoped lang="scss">
  .reduction-list {
    @include mask;
    .panel {
      position: fixed;
      bottom: 0;
      width: 100%;
      background: #fff;
      label {
        display: block;
        background: #fff;
        height: 2.2rem;
        line-height: 2.2rem;
        font-size: 15px;
        box-sizing: border-box;
        padding: 0 1em;
        position: relative;
        @include border-bottom(#ddd);
        &:active {
          background: #f0f0f0;
        }
        input {
          display: none;
        }
        .point {
          position: absolute;
          right: 1rem;
          top: 0.8rem;
          width: 0.6rem;
          height: 0.6rem;
          border: 1px solid #ddd;
          border-radius: 50%;
          &.active {
            background: $primary;
            border-color: $primary;
          }
        }
      }
      .bottom {
        text-align: center;
        color: $primary;
        font-size: 18px;
        padding: .3rem 0;
        &:active {
          background: #f0f0f0;
        }
      }
    }
  }
</style>
