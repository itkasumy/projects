<template>
    <div class="nav-menu">
			<el-scrollbar ref="navScrollbar">
        <!-- 侧边栏 -->
        <el-aside id="aside">
					<!-- <el-menu :default-openeds="['1' ,'2','3','4']" :router=true :default-active="$route.path"> -->
						<el-menu :default-openeds="defaultOpen" :router=true :default-active="path" ref="menuRef">
								<!-- 首页 -->
								<el-menu-item index="/home/homePage">
										<i></i>
										<span slot="title" id="home_page">
												首页
										</span>
								</el-menu-item>
								<!-- 系统设置 -->
								<el-submenu index='2'>
										<span slot="title">
												系统设置</span>
										<el-menu-item-group>
												<el-menu-item index="/system/userManage"><i></i>用户管理</el-menu-item>
												<el-menu-item index="/system/areaDivide"><i></i>区域划分</el-menu-item>
												<el-menu-item index="/system/areaAuthority"><i></i>区域权限</el-menu-item>
												<el-menu-item index="/system/organManage"><i></i>机构管理</el-menu-item>
												<el-menu-item index="/system/roleManage"><i></i>角色管理</el-menu-item>
												<el-menu-item index="/system/controlLevel"><i></i>布控等级</el-menu-item>
												<el-menu-item index="/system/warningManage"><i></i>预警设置</el-menu-item>
												<el-menu-item index="/system/policeManage"><i></i>警员管理</el-menu-item>
												<el-menu-item index="/system/logManage"><i></i>日志管理</el-menu-item>
										</el-menu-item-group>
								</el-submenu>
								<!-- 智能设备 -->
								<el-submenu index='3'>
										<span slot="title">
												智能设备</span>
										<el-menu-item-group>
												<el-menu-item index="/intelligence/deviceManage"><i class="box"></i>设备管理</el-menu-item>
                        <el-menu-item index="/intelligence/mapSpread"><i class="box"></i>地图分布</el-menu-item>
                        <el-menu-item index="/intelligence/deviceType"><i class="box"></i>设备类型</el-menu-item>
                        <el-menu-item index="/intelligence/deviceMonitor"><i class="box"></i>视频监控</el-menu-item>
										</el-menu-item-group>
								</el-submenu>
								<!-- 人员管理 -->
								<el-submenu index='4'>
										<span slot="title">
												人员管理</span>
										<el-menu-item-group>
												<el-menu-item index="/personManage/keyPerson"><i class="box2"></i>重点人员</el-menu-item>
												<el-menu-item index="/personManage/personControl"><i class="box2"></i>布控人员</el-menu-item>
												<el-menu-item index="/personManage/passerManage"><i class="box2"></i>行人管理</el-menu-item>
												<el-menu-item index="/personManage/policeDuty"><i class="box2"></i>警员执勤</el-menu-item>
												<el-menu-item index="/personManage/personTrack"><i class="box2"></i>人员轨迹</el-menu-item>
												<el-menu-item index="/personManage/warningOntime"><i class="box2"></i>实时预警</el-menu-item>
										</el-menu-item-group>
								</el-submenu>
								<!-- 车辆管理 -->
								<el-submenu index='5'>
										<span slot="title">
												车辆管理</span>
										<el-menu-item-group>
												<!-- <span slot="title">分组一</span> -->
												<el-menu-item index="/cartManage/cartDataManage"><i class="box3"></i>车辆数据管理</el-menu-item>
												<el-menu-item index="/cartManage/cartControl"><i class="box3"></i>布控车辆</el-menu-item>
												<el-menu-item index="/cartManage/cartTrack"><i class="box3"></i>车辆轨迹</el-menu-item>
												<el-menu-item index="/cartManage/cartWarning"><i class="box3"></i>实时预警</el-menu-item>
										</el-menu-item-group>
								</el-submenu>
								<!-- 防拥挤踩踏 -->
								<el-submenu  index='6'>
										<span slot="title">
												防拥挤踩踏</span>
										<el-menu-item-group>
												<!-- <span slot="title">分组一</span> -->
												<el-menu-item index="/preventCrowd/areaCapacity"><i class="box4"></i>预警设置</el-menu-item>
												<el-menu-item index="/preventCrowd/personCount"><i class="box4"></i>人数统计</el-menu-item>
												<el-menu-item index="/preventCrowd/personSpreadPng"><i class="box4"></i>人员分布</el-menu-item>
										</el-menu-item-group>
								</el-submenu>
						</el-menu>
        </el-aside>
			</el-scrollbar>
        <!-- #aside .el-menu .el-submenu .el-menu  -->
    </div>
</template>

<style lang="scss">
// 可能会导致bug样式错乱
.nav-menu {
	position: absolute;
	background: url("../../assets/images/menu_bg.png");
	background-size: 100% 100%;
	top: 60px;
	width: 200px;
	bottom: 0px;
	overflow: scroll;
	.el-scrollbar {
		height: 100%;
		.el-scrollbar__thumb {
			background-color: rgba(24, 113, 148, .7);
		}
	}
}

/* 侧边栏 */
#aside {

	width: 200px !important;
	.el-menu {
		padding-right: none;
		border-right: none;
	}
	.el-submenu__title {
		padding-left: 0px !important;
	}
	.el-menu-item {
		padding-left: 21px !important;
	}
}
// 可能会造成地图页面样式错乱
@media screen and (max-width: 1920px) and (min-width: 1366px){
	.nav-menu {
		width: 216px;
	}
	#aside {
		width: 216px !important;
	}
}
#aside ul {
	background: rgba(0, 0, 0, 0);
}
.page {
  height: 100%;
}
.nav-menu .el-aside {
  height: 100%;
}
#aside .el-menu-item {
  height: 34px;
	line-height: 34px;
	margin: 3px 0;
}
#aside .el-submenu__title {
  height: 50px;
}
#aside .el-menu-item-group__title {
  padding: 0;
}
// 替换选中时候的图标
// 系统设置
@for $i from 1 through 9 {
	#aside> ul >li>ul>li>ul>li:nth-child(#{$i}).is-active i{
		@if (2 * $i + 4) < 10 {
			background: url('../../assets/images/left_menu_icon/leftmenu_ico_focus_0#{2 * $i + 4}.png');
		} @else {
			background: url('../../assets/images/left_menu_icon/leftmenu_ico_focus_#{2 * $i + 4}.png');
		}
	}
}
// 智能设备
@for $i from 1 through 3 {
	#aside> ul >li>ul>li>ul>li:nth-child(#{$i}).is-active>.box{
		background: url('../../assets/images/left_menu_icon/leftmenu_ico_focus_#{2 * $i + 22}.png');
	}
}
// 人员管理
@for $i from 1 through 5 {
	#aside> ul >li>ul>li>ul>li:nth-child(#{$i}).is-active>.box2{
		@if $i <= 2 {
			background: url('../../assets/images/left_menu_icon/leftmenu_ico_focus_#{2 * $i + 28}.png');
		} @else if $i > 3 {
			background: url('../../assets/images/left_menu_icon/leftmenu_ico_focus_#{2 * $i + 26}.png');
		}
	}
}
#aside> ul >li>ul>li>ul>li:nth-child(3).is-active>.box2{
    background: url('../../assets/images/left_menu_icon/leftmenu_ico_focus_48.png');
}
// 车辆管理
@for $i from 1 through 3 {
	#aside> ul >li>ul>li>ul>li:nth-child(#{$i}).is-active>.box3{
		background: url('../../assets/images/left_menu_icon/leftmenu_ico_focus_#{2 * $i + 36}.png');
	}
}
#aside> ul >li>ul>li>ul>li:nth-child(4).is-active>.box3{
    background: url('../../assets/images/left_menu_icon/leftmenu_ico_focus_43.png');
}
// 防拥挤踩踏
@for $i from 1 through 2 {
	#aside> ul >li>ul>li>ul>li:nth-child(#{$i}).is-active>.box4{
		background: url('../../assets/images/left_menu_icon/leftmenu_ico_focus_#{2 * $i + 42}.png');
	}
}


</style>
<script >
import bus from '../../common/js/common'
import { ISLOGIN } from '../../common/js/common'
export default {
  data() {
    return {
				lalal:'',
				defaultOpen: ['3', '4', '5', '6'],
				resizeScrollBar: () => { try { this.$refs.navScrollbar.update() } catch(e) {} }
    };
  },
  computed: {
		path(){
			let reg = /^(\/\w+\/\w+)/
			let res = this.$route.path.match(reg)
			return this.$route.meta.oldPath || res && res[0]
		}
	},
	mounted() {
    window.addEventListener('resize', this.resizeScrollBar)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resizeScrollBar)
  },
};
</script>
