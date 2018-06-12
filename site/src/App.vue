<template>
 <div>
	<!-- 路由占位符 -->
	<router-view ></router-view>
 </div>
</template>
<style lang="scss">
body, html {
	height: 100%;
	>div:first-child {
		height: 100%;
		>div {
			height: 100%;
			>.el-container {
				height: calc(100% - 60px);
			}
		}
	}
}
</style>



