<template>
	<div class="setting">
    <v-header title="设置" class="u-fixed-header"/>
    <div class="u-main-content fixed ">
      <div class="todo__wrapper">
        <div class="todo__list">
          <ul>
            <li>
              <router-link to="/">
              <div class="item-content u-link-bg">
                <div class="item-inner">
                  <span>关于Loong delivery</span>
                  <div class="right__icon">
                   <i class="iconfont icon-enter"></i>
                  </div>
                </div>
              </div>
              </router-link>
            </li>
            <li>
              <router-link to="/">
                <div class="item-content u-link-bg">
                  <div class="item-inner">
                    <span>协议及说明</span>
                    <div class="right__icon">
                      <i class="iconfont icon-enter"></i>
                    </div>
                  </div>
                </div>
              </router-link>
            </li>
          </ul>
        </div>
      </div>
      <v-button type="primary" @click="logout" v-if="ifLogin">账号登出</v-button>
    </div>
	</div>
</template>

<script>
	export default {
		name: "setting",
		props: [],
		components: {},
		data() {
			return {}
		},
		computed: {
		  ifLogin(){
		    if(localStorage.getItem('auth')){
		      return true;
        }else{
		      return false;
        }
      }
    },
		mounted() {
		},
		methods: {
      logout(){
        localStorage.removeItem('auth');
        this.$router.push('/user/login');
      }
    }
	}
</script>

<style scoped lang="scss">
	.setting {
    .todo__wrapper {
      margin-bottom: 1.5rem;
      .todo__list {
        .list__title{
          padding: .75rem;
          font-size: 16px;
          color: #666666;
        }
        ul {
          background: #fff;
          li {
            &:last-child {
              .item-content {
                .item-inner {
                  border: 0;
                }
              }
            }
            .item-title {
              line-height: 2.5rem;
              margin-left: .75rem;
              border-bottom: 1px solid $grey-ddd;
              span {
                font-size: 16px;
              }
            }
            .item-content {
              line-height: 2.5rem;
              .item-inner {
                margin-left: .75rem;
                font-size: 14px;
                color: $font-primary;
                border-bottom: 1px solid $grey-ddd;
                clear: both;
                .right__icon {
                  float: right;
                  margin-right: .75rem;
                  font-size: 15px;
                  .icon-enter{
                    color: $grey-ddd;
                    margin-left: .625rem;
                  }
                  .head__img{
                    width: 2rem;
                    height: 2rem;
                    vertical-align: middle;
                  }
                }
              }
            }
          }
        }
      }
    }
	}
</style>
