import axios from 'axios'
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter) //Vue.property.$route  Vue.property.$router

//不是基于Vue的插件，如果想绑定到Vue上面
Vue.prototype.$axios = axios
// axios.defaults.baseURL = "http://10.10.18.46:8084"
// axios.defaults.baseURL = "http://10.10.18.42:8082"
// axios.defaults.baseURL = "http://10.10.5.1:10859"
// axios.defaults.baseURL = "http://10.10.5.46:20131"
//  axios.defaults.baseURL = "http://10.12.26.183:8082"
//  axios.defaults.baseURL = "http://10.12.26.3:20039"
axios.defaults.headers['Content-Type'] = "application/json"
// axios.defaults.timeout = 2000
//在跨域的时候，允许访问服务器带上cookies
axios.defaults.withCredentials = true


// 导入组件
const home = () => import('../view/home.vue')//home.vue
// 用户模块
const login = () => import('../view/user/login.vue')//登录页面
const logout = () => import('../view/user/logout.vue')//退出页面
const changePassword = () => import('../view/user/changePassword.vue')//修改密码
// 首页
const homePage = ()=> import('../view/personManage/personSpread.vue')//首页
// 系统设置
const userManage = () => import('../view/system/userManage.vue')//用户管理页面
const userAdd = () => import('../view/system/userAdd.vue')//用户管理页面新增用户页面
const userEdit = () => import('../view/system/userEdit.vue')//用户管理页面编辑用户页面
const areaDivide = resolve => import('../view/system/areaDivide.vue').then(module => resolve(module))//区域划分页面
const areaAuthority = resolve => import('../view/system/areaAuthority.vue').then(module => resolve(module))//区域权限页面
const areaAuthorityAdd = resolve => import('../view/system/areaAuthorityAdd.vue').then(module => resolve(module))//区域权限页面
const areaAuthorityEdit = resolve => import('../view/system/areaAuthorityEdit.vue').then(module => resolve(module))//区域权限页面
const organManage = resolve => import('../view/system/organManage.vue').then(module => resolve(module))//机构管理页面
const organEdit = () => import('../view/system/organEdit.vue')//机构新增页面
const roleManage = () => import('../view/system/roleManage.vue')//角色管理页面
const controlLevel = () => import('../view/system/controlLevel.vue')//布控等级页面
const logManage = () => import('../view/system/logManage.vue')//日志管理页面
const warningManage = () => import('../view/system/warningManage.vue')//预警管理页面
const warningSetting = () => import('../view/system/warningSetting.vue')// 预警设置页面
const policeManage = () => import('../view/system/policeManage.vue')//警员管理页面
// 智能设备
const deviceManage = () => import('../view/intelligence/deviceManage.vue')//设备管理页面
const deviceEdit = () => import('../view/intelligence/deviceEdit.vue')//设备管理页面
const deviceType = () => import('../view/intelligence/deviceType.vue')//设备类型页面
const deviceTypeEdit = () => import('../view/intelligence/deviceTypeEdit.vue')//设备类型页面
const mapSpread = () => import('../view/intelligence/mapSpread.vue')//地图分布页面
const deviceMonitor = () => import('../view/intelligence/deviceMonitor.vue')//视频监控页面
// 人员管理
const keyPerson = () => import('../view/personManage/keyPerson.vue')//重点人员页面
const personAdd = () => import('../view/personManage/personAdd.vue')//重点人员新增页面
const personEdit = () => import('../view/personManage/personEdit.vue')//重点人员编辑页面
const personControl = () => import('../view/personManage/personControl.vue')//人员布控页面
const personTrack = () => import('../view/personManage/personTrack.vue')//人员轨迹页面
const warningOntime = () => import('../view/personManage/warningOntime.vue')//实时预警页面
const personWarningEchart = () => import('../view/personManage/personWarningEchart.vue')//实施预警统计报表页面
const policeDuty = () => import('../view/personManage/policeOnDuty.vue')//警员执勤页面
const passerManage = () => import('../view/personManage/passerManage.vue')//行人管理页面
// 车辆管理
const cartDataManage = () => import('../view/cartManage/cartDataManage.vue')//车辆数据管理页面
const cartControl = () => import('../view/cartManage/cartControl.vue')//布控车辆页面
const cartTrack = () => import('../view/cartManage/cartTrack.vue')//车辆轨迹页面
const cartWarning = () => import('../view/cartManage/cartWarning.vue')//实时预警页面
const cartWarningEchart = () => import('../view/cartManage/cartWarningEchart.vue')//echart 报表页面
// 防拥挤踩踏
const areaCapacity = resolve => import('../view/preventCrowd/areaCapacity.vue').then(module => resolve(module))
const equipCapacity = resolve => import('../view/preventCrowd/equipCapacity.vue').then(module => resolve(module))
const dealInfo = resolve => import('../view/preventCrowd/dealInfo.vue').then(module => resolve(module))
const personCount = resolve => import('../view/preventCrowd/personCount.vue').then(module => resolve(module))
const personSpreadPng = resolve => import('../view/personManage/personSpreadPng.vue').then(module => resolve(module))
// const statePredict = resolve => import('../view/preventCrowd/statePredict.vue').then(module => resolve(module))
// 矢量图
const personTrackVector = resolve => import('@/view/vectorIllustration/personTrackVector.vue').then(module => resolve(module))


//----------------------------------wifi------------
const trackRepaint = resolve => import('@/view/wifi/trackRepaint').then(module => resolve(module))
const wifiTrack = resolve => import('@/view/wifi/wifiTrack').then(module => resolve(module))
const wifiAnalysis = resolve => import('@/view/wifi/wifiAnalysis').then(module => resolve(module))




const routes = [
    {path: '/', redirect: '/home/homePage'},
    // 用户登录 , 登出
    {path: '/user/login', component: login, name: "login", meta: {title: '登录'}},
    {path: '/user/logout', component: logout, name: "logout", meta: {title: '退出'}},
    {path: '/user', component: home, name: "home" , meta: {title: '首页'}, children: [
        {path: 'changePassword', component: changePassword, name: "changePassword", meta: {title: '修改密码'}},
    ]},
    // 首页
    {path: '/home', component: home, meta: {title: '首页'}, children: [
        {path: 'homePage', name: 'homePage', component: personSpreadPng, meta: {title: '用户中心'},}
    ]},
    // 系统设置
    // 为了每一级的重定向
    {path: '/system', redirect: '/system/userManage'},
    {path: '/system', component: home, meta: {title: '系统设置'}, children: [
        {path: 'userManage', name: 'userManage', component: userManage, meta: {title: '用户管理'}},
        {path: 'userAdd', name: 'userAdd', component: userAdd, meta: {title: '新增用户'}},
        {path: 'userEdit/: userId', name: 'userEdit', component: userEdit, meta: {title: '编辑用户'}},
        {path: 'areaDivide', name: 'areaDivide', component: areaDivide, meta: {title: '区域划分'}},
        {path: 'areaAuthority', name: 'areaAuthority', component: areaAuthority, meta: {title: '区域权限'}},
        {path: 'areaAuthority/areaAuthorityAdd', name: 'areaAuthorityAdd', component: areaAuthorityAdd, meta: {title: '新增区域权限'}},
        {path: 'areaAuthority/areaAuthorityEdit/: groupId', name: 'areaAuthorityEdit', component: areaAuthorityEdit, meta: {title: '编辑区域权限'}},
        {path: 'organManage', name: 'organManage', component: organManage, meta: {title: '机构管理'}},
        // {path: 'organManage/organEdit',name: 'organEdit',component: organEdit, meta: {title: '新增机构'}},
        {path: 'controlLevel', name: 'controlLevel', component: controlLevel, meta: {title: '布控等级'}},
        {path: 'roleManage',name: 'roleManage',component: roleManage, meta: {title: '角色管理'}},
        {path: 'warningManage', name: 'warningManage', component: warningManage, meta: {title: '预警管理'}},
        {path: 'warningManage/warningSetting', name: 'warningSetting', component: warningSetting, meta: {title: '预警设置'}},
        {path: 'logManage', name: 'logManage', component: logManage, meta: {title: '日志管理'}},
        {path: 'policeManage', name: 'policeManage', component: policeManage, meta: {title: '警员管理'}}
    ]},
    // 智能设备
    {path: '/intelligence', redirect: '/intelligence/deviceManage'},
    {path: '/intelligence', component: home, meta: {title: '智能设备'}, children: [
        {path: 'deviceManage', name: 'deviceManage', component: deviceManage, meta: {title: '设备管理'}},
        {path: 'deviceManage/deviceEdit', name: 'deviceEdit', component: deviceEdit, meta: {title: '新增设备'}},
        {path: 'deviceType', name: 'deviceType', component: deviceType, meta: {title: '设备类型'}},
        {path: 'deviceType/deviceTypeEdit', name: 'deviceTypeEdit', component: deviceTypeEdit, meta: {title: '新增设备类型'}},
        {path: 'mapSpread', name: 'mapSpread', component: mapSpread, meta: {title: '地图分布'}},
        {path: 'deviceMonitor', name: 'deviceMonitor', component: deviceMonitor, meta: {title:'视频监控'}}
    ]},
    // 人员管理
    {path: '/personManage', redirect: '/personManage/keyPerson'},
    {path: '/personManage', component: home, meta: {title: '人员管理'}, children: [
        {path: 'keyPerson', name: 'keyPerson', component: keyPerson, meta: {title: '重点人员'}},
        {path: 'keyPerson/personAdd', name: 'personAdd', component: personAdd, meta: {title: '新增重点人员'}},
        {path: 'keyPerson/personEdit/:personId', name: 'personEdit', component: personEdit, meta: {title: '重点人员编辑'}},
        {path: 'personControl', name: 'personControl', component: personControl, meta: {title: '布控人员'}},
        {path: 'personTrack', name: 'personTrack', component: personTrack, meta: {title: '人员轨迹'}},
        {path: 'warningOntime', name: 'warningOntime', component: warningOntime, meta: {title: '实时预警'}},
        {path: 'warningOntime/personWarningEchart', name: 'personWarningEchart', component: personWarningEchart, meta: {title: '统计报表'}},
        {path: 'policeDuty', name: 'policeDuty', component: policeDuty, meta: {title: '警员执勤'}},
        {path: 'passerManage', name: 'passerManage', component: passerManage, meta: {title: '行人管理'}}
    ]},
    // 车辆管理
    {path: '/cartManage', redirect: '/cartManage/cartDataManage'},
    {path: '/cartManage', component: home, meta: {title: '车辆管理'}, children: [
        {path: 'cartDataManage', name: 'cartDataManage', component: cartDataManage, meta: {title: '车辆数据管理'}},
        {path: 'cartControl', name: 'cartControl', component: cartControl, meta: {title: '布控车辆'}},
        {path: 'cartTrack', name: 'cartTrack', component: cartTrack, meta: {title: '车辆轨迹'}},
        {path: 'cartWarning', name: 'cartWarning', component: cartWarning, meta: {title: '实时预警'}},
        {path: 'cartWarning/cartWarningEchart', name: 'cartWarningEchart', component: cartWarningEchart, meta: {title: '统计报表'}},
    ]},
	// 人数统计------ begin ------
	{
		path: '/preventCrowd',
		redirect: '/preventCrowd/preventCrowd'
	},
	{
		path: '/preventCrowd',
		component: home,
		meta: {
			title: '防拥挤踩踏'
		},
		children: [
			{
				path: 'areaCapacity',
				name: 'areaCapacity',
				component: areaCapacity,
				meta: {
					title: '预警设置'
				}
            },
            {
				path: 'equipCapacity',
				name: 'equipCapacity',
				component: equipCapacity,
				meta: {
					title: '预警设置'
				}
            },
            {
				path: 'dealInfo',
				name: 'dealInfo',
				component: dealInfo,
				meta: {
					title: '预警设置'
				}
			},
			{
				path: 'personCount',
				name: 'personCount',
				component: personCount,
				meta: {
					title: '人数统计'
				}
            },
            {
                path: 'personSpreadPng',
                name: 'personSpreadPng',
                component: homePage,
                meta: {
                    title: 'personSpreadPng'
                }
            }
		]
    },
    // 人数统计------ end ------
  {
    path: '/vectorIllustration',
    name: 'vectorIllustration',
    component: home,
    meta: {
      title: '人员管理'
    },
    children: [
      {
        path: 'personTrackVector',
        name: 'personTrackVector',
        component: personTrackVector,
        meta: {
          title: '人员轨迹',
          oldPath: '/personManage/personTrack'
        }
      }
    ]
  },
  //----------------wifi
  {
    path: '/wifi',
    name: 'wifi',
    component: home,
    meta: {
      title: 'wifi'
    },
    children: [
      {
        path: 'trackRepaint',
        name: 'trackRepaint',
        component: trackRepaint,
        meta: {
          title: 'wifi轨迹重绘'
        }
      },
      {
        path: 'wifiTrack',
        name: 'wifiTrack',
        component: wifiTrack,
        meta: {
          title: '实时轨迹'
        }
      },
      {
        path: 'wifiAnalysis',
        name: 'wifiAnalysis',
        component: wifiAnalysis,
        meta: {
          title: '同行分析'
        }
      }
    ]
  }
]

const router = new VueRouter({
    routes,
})



/**
 * 路由守卫
 * 
 * to 跳转到哪里去
 * from 从哪里跳转过来
 * next 调用next就会触发路由，调用它，就不会触发路由
 */
// router.beforeEach((to, from, next) => {
//     //记录要去的路径
//     // if(to.path!='/site/login'){
//     //     localStorage.setItem('lastVisitPath',to.path)
//     // }

//     //2、判断即将跳转的组件中的路径(to)里面是否需要进行权限验证，如果需要权限验证，就发送请求给后台
//     //如果不需要权限验证，直接跳过
//     if(to.meta.title=='人员轨迹'){//需要登录的组件
//         document.getElementById('outside-container').style.backgroundColor ='#004158'
//         //判断登录
//         // const url = "site/account/islogin"

//         // axios.get(url).then(response=>{
//         //     console.log(response.data)
//         //     if(response.data.code==='nologin'){
//         //         //跳转到登录页面上面去
//         //         router.push({name:'login'})
//         //     }else{
//                 next()
//         //     }
//         // })
//     }else{
//         document.getElementById('outside-container').style.backgroundColor ='#fff'
//         next()
//     }
// })
export { routes }
export default router
