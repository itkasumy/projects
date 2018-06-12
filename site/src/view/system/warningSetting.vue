<template>
<div class="warning-setting">
  <el-main>
    <div class="left">
        <div class="title">
            <h2>预警设置</h2>
            <p>按不同等级设置预警通知信息</p>
        </div>
        <div class="content clearfix">
					<ul>
						<li class="clearfix">
							<span><i class="red">*</i>预警等级</span>
							<div class="select">
								<el-select 
									v-model="level" 
									size="small" 
									@change="eLevelChange"
									placeholder="请选择预警等级"
                >
                  <el-option
                    v-for="item in levelList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
								</el-select>
							</div>
						</li>
						<li class="clearfix">
							<span><i class="red">*</i>区域组</span>
							<div class="area-group">
								<div class="clearfix" ref="area-group" @click.stop="eAreaGroupFocus">
									<el-checkbox :indeterminate="isIndeterminate" size="small" class="sp" border v-model="checkAll" @change="eCheckAll">全选</el-checkbox>
									<el-checkbox-group 
										v-model="checkedList" 
										@change="eCheckedChange"
									>
										<el-tooltip :open-delay="800" v-for="(item, index) in checkboxList" :key="index" class="item" effect="dark" :content="item" placement="top">
											<el-checkbox 
												:label="item" 
												:key="index"
												size="small" 
												border 
											></el-checkbox>
    								</el-tooltip>
									</el-checkbox-group>
								</div>
							</div>
						</li>
						<li class="clearfix">
							<span><i class="red">*</i>知会人</span>
							<div class="select sp">
								<div class="select-box">
									<el-select 
										v-model="notifyPeople" 
										size="small" 
										@change="eNotifyChange"
										filterable
										placeholder="请选择知会人"
									>
										<!-- :filter-method="eSearchNotifyPeople" -->
										<el-option
											v-for="item in notifyPeopleList"
											:key="item.value"
											:label="item.label"
											:value="item.value"
										>
										</el-option>
									</el-select>
								</div>
								<ul class="select-ul">
									<li v-for="value in selectedNotifyPeopleList" :key="value">
									{{value}}<i class="el-icon-close" @click="eRemoveselectedNotifyPeople(value)"></i>
									</li>
								</ul>
							</div>
						</li>
						<li class="clearfix">
							<span><i class="red">*</i>预警内容</span>
							<div class="textarea">
								<div>
									<div class="input" ref="input" @click="eWarningTextBoxClick">
										<div contenteditable ref="editContent" class="editable fl" @input="eWarningTextInput" @click.stop="()=>{}">
										</div>
										<p class="input-placeholder" v-show="inputPlaceholdeShow">请输入预警内容（200个字符以内）</p>
									</div>
									<div class="placeholder">
										<el-button  @click="eClickPlaceHolder('peopleNameHtml')" size="small" :disabled="isCarOrPeopleShow.indexOf('people') !== -1" plain>人员姓名(类型)</el-button>
										<el-button @click="eClickPlaceHolder('carNumberHtml')" size="small" :disabled="isCarOrPeopleShow.indexOf('car') !== -1" plain>车牌号</el-button>
										<el-button @click="eClickPlaceHolder('timeHtml')" size="small" :disabled="isCarOrPeopleShow.indexOf('time') !== -1" plain>时间</el-button>
										<el-button @click="eClickPlaceHolder('addresssHtml')" size="small" :disabled="isCarOrPeopleShow.indexOf('address') !== -1" plain>地点</el-button>
									</div>
								</div>
								<span class="red fl" v-show="warningTextTipShow">{{errorInputTip}}</span>
							</div>
						</li>
						<li>
							<h5 style="color: rgb(114, 163,244); text-align: left;">样例</h5>
							<p class="fl" style="text-align:left;">人员姓名（类型）在2018年3月13日15点30分20秒在上海市黄埔区南京一路被1号摄像头监控</p>
						</li>
						<li>
							<el-button type="primary" size="small" class="fl" @click="eSubmit">确定</el-button>
							<el-button size="small" type="default" class="fl" @click="eCancle">取消</el-button>
						</li>
					</ul>
        </div>
    </div>
    <div class="right">
			<div class="content">
				<h3>效果预览</h3>
				<el-card class="box-card" :class="cardMsg.class">
					<div slot="header" class="clearfix">
						<span>{{cardMsg.text}}预警</span>
						<el-button style="float: right; padding: 3px 0" type="text"><i class="el-icon-close"></i></el-button>
					</div>
					<div class="text item">
						<p style="text-align: left;">人员姓名（类型）在2018年3月13日15点30分20秒在上海市黄埔区南京一路被1号摄像头监控</p>
						<el-button type="text" class="fr">查看详情</el-button>
					</div>
				</el-card>
			</div>
    </div>
  </el-main>
</div>
</template>
<script>
import {errorException, successTip, errorTip, confirmModal} from '../intelligence/js/tip'
import {debounce} from '../intelligence/js/utils'
import BASE from '../intelligence/js/basePath'
const BASEPATH = BASE.BASEPATH_YIHANG// 艺航
const BASEPATH2 = BASE.BASEPATH_WEIKANG//韦康
const BASEPATH3= BASE.BASEPATH_YUWEI // 布控等级--玉伟
const NOTIFYPATH = BASE.BASEPATH_YIHANG_NOTIFY// 知会人8080端口
const MAP_COLOR_2_TEXT = [
	['red', 'orange', 'yellow', 'blue'],
	['红色', '橙色', '黄色', '蓝色'],
]
export default {
	data(){
		return {
			level: '',
			levelList: [],

			checkAll: false,
			isIndeterminate: false,
			checkedList: [],
			checkboxList: [],
			checkboxIdList: [],

			notifyPeople: '',
			notifyPeopleList:[],
			selectedNotifyPeopleList: [],
			selectedNotifyPeopleIdList: [],

			peopleNameHtml: '<span contenteditable="false">人员姓名（类型）</span>',
			carNumberHtml: '<span contenteditable="false">车牌号</span>',
			timeHtml: '<span contenteditable="false">时间</span>',
			addresssHtml: '<span contenteditable="false">地点</span>',

			inputPlaceholdeShow: true,
			warningTextTipShow: false,
			errorInputTip: '请使用"汉字"、"字母"、"数字"、"_"、"-"、","、"。"、"！"',
			
			resetBorderColor: ()=>{
				this.eAreaGroup.style.borderColor = '#dcdfe6'
				window.removeEventListener('click', this.resetBorderColor, true)
			},

			oldInnerHtml: '',
			// dom
			eEditContent: null,
			eAreaGroup: null,
			warningId: '',
			isCarOrPeopleShow: [],
		}
	},
	computed: {
		cardMsg(){
			let arr = this.levelList
			for (let i = 0, len = arr.length; i < len; i++) {
				let item = arr[i]
				if (item.value == this.level) {
          let index = MAP_COLOR_2_TEXT[0].indexOf(item.levelColor)
					index === -1 ? text = '红色': text = MAP_COLOR_2_TEXT[1][index]
					let text = MAP_COLOR_2_TEXT[1][index]
					return {class: item.levelColor, text: text}
				}
			}
			return {class: 'red', text: '红色'}
		},
	},
	mounted(){
		this.eEditContent = this.$refs.editContent || {}
		let eInput = this.$refs.input
		this.eAreaGroup = this.$refs['area-group']

		this.eEditContent.onfocus = ()=>{
			eInput.style.borderColor = '#409EFF'
		}
		this.eEditContent.onblur = ()=>{
			eInput.style.borderColor = '#dcdfe6'
		}
	},
	created(){
		this._getLevelList()
		this._getNotifyPeopleList()
		this._getCheckboxList()
		this.warningId = this.$route.query.warningId
		this.warningId && this._getwarningDetail()
	},
	methods: {
		_getCheckboxList(){
			let option = {
				method: 'GET',
				url: `${BASEPATH2}/info/areagroup/getAllGroup`
			}
			this.$axios(option)
				.then(( data )=>{
					this.handleCheckboxList(data.data)
				})
				.catch((e)=>{this.mCatchException(e)})
		},
		_getLevelList(){
			let option = {
				method: 'GET',
				url: `${BASEPATH3}/info/surveillanceLevel/getSurveillanceLevelData`
			}
      this.$axios(option)
        .then(( data )=>{
					data = data.data
					this.levelList = []
          data.forEach(( v, i )=>{
            this.levelList.push({label: v.levelName, value: v.levelId, levelColor: v.levelColor, levelType: v.levelType})
          })
        })
        .catch((e)=>{this.mCatchException(e)})
		},
		_getNotifyPeopleList(){
			let option = {
				method: 'GET',
				url: `${NOTIFYPATH}/base/user/getUserList`
			}
			this.$axios(option)
				.then(( data )=>{
						data = data.data
						data.forEach(( v, i )=>{
							this.notifyPeopleList.push({label: v.userRealname, value: v.userId})
						})
				})
				.catch((e)=>{this.mCatchException(e)})
		},
		_createWarning(){
			let msg = this.uGetAllMsgToBackEnd()
			let option = {
				method: 'POST',
				url: `${BASEPATH}/info/warning/createWarning`,
				data: {
					levelName: this.uGetLevelName(),
					levelType: this.uGetLevelType(),
					levelId: this.level,
					levelRelevaUser: msg.leveRelevaUser,
					levelRelevaUserId: msg.leveRelevaUserId,
					areaGroupId: msg.areaGroupId,
					levelWarningMag: msg.leveWarningMag
				}
			}
			this.$axios(option)
				.then(( data )=>{
						this.mSuccessTip('设置成功!')
						setTimeout(() => {
							this.$router.push({name: 'warningManage'})
						}, 500);
				})
				.catch((e)=>{this.mCatchException(e)})
		},
		_updateWarning(){
			let msg = this.uGetAllMsgToBackEnd()
			let option = {
				method: 'POST',
				url: `${BASEPATH}/info/warning/updateWarning`,
				data: {
					levelName: this.uGetLevelName(),
					levelType: this.uGetLevelType(),
					warningId: this.warningId,
					levelId: this.level,
					levelRelevaUser: msg.leveRelevaUser,
					levelRelevaUserId: msg.leveRelevaUserId,
					areaGroupId: msg.areaGroupId,
					levelWarningMag: msg.leveWarningMag
				}
			}
			this.$axios(option)
				.then(( data )=>{
						this.mSuccessTip('更新成功!')
						setTimeout(() => {
							this.$router.push({name: 'warningManage'})
						}, 500);
				})
				.catch((e)=>{this.mCatchException(e)})
		},
		_getwarningDetail(){
			let option = {
				method: 'GET',
				url: `${BASEPATH}/info/warning/getOneWarningConfig/${this.warningId}`,
			}
			this.$axios(option)
				.then(( data )=>{
						data = data.data
						this.handleGetWarningDetail(data)
				})
				.catch((e)=>{this.mCatchException(e)})
		},
		handleGetWarningDetail(data){
			this.selectedNotifyPeopleList = data.levelRelevaUser.split(',')
			let str = data.levelWarningMag.replace(/\$\{name\}/g, this.peopleNameHtml)
			str = str.replace(/\$\{plateNumber\}/g, this.carNumberHtml)
			str = str.replace(/\$\{time\}/g, this.timeHtml)
			str = str.replace(/\$\{site\}/g, this.addresssHtml)
			if (str && str.length) {
				this.inputPlaceholdeShow = false
			}
			this.eEditContent.innerHTML = str
			let tempAraeGroup = data.warningAreagroupEntiy
			this.checkedList = tempAraeGroup[0].areaGroupName.split(',') || []
			this.level = data.levelId
		},
		handleCheckboxList(data){
			this.checkboxList = []
			this.checkboxIdList = []
			data.forEach(( v, i )=>{
				this.checkboxList.push(v.areaGroupName)
				this.checkboxIdList.push(v.areaGroupId)
			})
		},
		uGetAreaGroupId(){
			let checkedIdList = []
			this.checkedList.forEach(( v, i )=>{
				let arr = this.checkboxList
				for (let i = 0, len = arr.length; i < len; i++) {
					let item = arr[i]
					if (item === v) {
						checkedIdList.push(this.checkboxIdList[i])
						break
					}
				}
			})
			return checkedIdList
		},
		uGetLevelName(){
			let arr = this.levelList
			for (let i = 0, len = arr.length; i < len; i++) {
				let item = arr[i]
				if(item.value==this.level)
					return item.label
			}
			return ''
		},
		uGetLevelType(){
			let arr = this.levelList
			for (let i = 0, len = arr.length; i < len; i++) {
				let item = arr[i]
				if(item.value==this.level)
					return item.levelType
			}
			return ''
		},
		uGetEditContent2Text(){
			if (this.warningTextTipShow) {
				return false
			}
			let html = this.eEditContent.innerHTML
			let str = html.replace(new RegExp(this.peopleNameHtml, 'g'), '${name}')
			str = str.replace(new RegExp(this.carNumberHtml, 'g'), '${plateNumber}')
			str = str.replace(new RegExp(this.timeHtml, 'g'), '${time}')
			str = str.replace(new RegExp(this.addresssHtml, 'g'), '${site}')
			return str
		},
		uGetAllMsgToBackEnd(){
			let leveRelevaUser = this.selectedNotifyPeopleList.join(',')
			let leveRelevaUserId = this.selectedNotifyPeopleIdList.join(',')
			let areaGroupId = this.uGetAreaGroupId().join(',')
			let leveWarningMag = this.uGetEditContent2Text()
			return {leveRelevaUser, leveRelevaUserId, areaGroupId, leveWarningMag}
		},
		uHandleForbidClickPlaceHolderBtn(){
			let html = this.eEditContent.innerHTML
			// 点击两次就禁止点击
			let regPeople = new RegExp(this.peopleNameHtml, 'g')
			let regCar = new RegExp(this.carNumberHtml, 'g')
			let regTime = new RegExp(this.timeHtml, 'g')
			let regAddress = new RegExp(this.addresssHtml, 'g')
			let arrText1 = [['people', 'car'], [regPeople, regCar]]
			let arrText2 = [['time', 'address', 'people', 'car'], [regTime, regAddress, regPeople, regCar]]

			for (let i = 0, len = arrText2[1].length; i < len; i++) {
				let itemReg = arrText2[1][i]
				let index = this.isCarOrPeopleShow.indexOf(arrText2[0][i])
				if (html.match(itemReg) && html.match(itemReg).length > 1) {
					if (index === -1) { // 已经两次了, 没有就添加禁止
						this.isCarOrPeopleShow.push(arrText2[0][i])
					}
				}else {
					if (index !== -1) {		// 没到两次， 已经存在就干掉
						this.isCarOrPeopleShow.splice(index, 1)
					}
				}
			}
			// // 两次和互斥并集
			let indexP = this.isCarOrPeopleShow.indexOf('people')
			let indexC = this.isCarOrPeopleShow.indexOf('car')
			if (html.match(regPeople)) {
				if (indexC === -1) {// 已经选了People, 但car没有被限制
					this.isCarOrPeopleShow.push('car')
				}
			}
			if (html.match(regCar)) {
				if (indexP === -1) {// 已经选了Car， 但people没有限制
					this.isCarOrPeopleShow.push('people')
				}
			}
		},
		eSubmit(){
			if (!this.level) {
				this.mConfirmModal('请选择预警等级！').catch(()=>{})
				return
			}
			if (this.checkedList.length===0) {
				this.mConfirmModal('请选择区域组！').catch(()=>{})
				return
			}
			if (this.selectedNotifyPeopleList.length === 0) {
				this.mConfirmModal('请选择知会人！').catch(()=>{})
				return
			}
			if (!this.warningTextTipShow && this.inputPlaceholdeShow) {
				this.mConfirmModal('请输入预警内容！').catch(()=>{})
				return
			}
			if (this.warningId) {
				this._updateWarning()
			}else {
				this._createWarning()
			}
		},
		eRemoveselectedNotifyPeople(peopleName){
			let list = this.selectedNotifyPeopleList
			let index = list.indexOf(peopleName)
			if (index == list.length - 1) {
				this.notifyPeople = ''// 重置下拉框
			}
			list.splice(index, 1)
		},
		eAreaGroupFocus(){
			this.eAreaGroup.style.borderColor = '#409EFF'
			window.addEventListener('click', this.resetBorderColor, true)
		},
		eWarningTextBoxClick(){
			this.eEditContent.focus()
			// 光标置到最后
			let sel = window.getSelection()
			sel.selectAllChildren(this.eEditContent)
			sel.collapseToEnd()
		},
		eWarningTextInput() {
			let html = this.eEditContent.innerHTML
			this.uHandleForbidClickPlaceHolderBtn()
			this.inputPlaceholdeShow = !html
			let reg = /^[\u4E00-\u9FA5\uF900-\uFA2D\w-,，！。]{1,101}$/
			let str = html.replace(new RegExp(this.peopleNameHtml, 'g'), '')
			str = str.replace(new RegExp(this.carNumberHtml, 'g'), '')
			str = str.replace(new RegExp(this.timeHtml, 'g'), '')
			str = str.replace(new RegExp(this.addresssHtml, 'g'), '')
			
			// 限制输入长度
			let len = str.length
			if (len <= 100) {
				this.oldInnerHtml = html
			}else {
				this.eEditContent.innerHTML = this.oldInnerHtml
				str = str.slice(0, -1)
				//光标置于最后
				let sel = window.getSelection()
				sel.selectAllChildren(this.eEditContent)
				sel.collapseToEnd()
			}
			if( reg.test(str) ) {
				this.warningTextTipShow = false
			}else {
				this.warningTextTipShow = true
			}
		},
		eInsertEditContent(html){
			this.eEditContent.focus()
			let sel, range
			sel = window.getSelection()
			if (window.getSelection) {
				sel = window.getSelection()
				if (sel.getRangeAt && sel.rangeCount) {
					range = sel.getRangeAt(0)
					range.deleteContents()
					
					let el = document.createElement('div')
					el.innerHTML = html
					let frag = document.createDocumentFragment(),
						node,
						lastNode
					while ((node = el.firstChild)) {
						lastNode = frag.appendChild(node)//返回添加的节点
					}
					range.insertNode(frag)
					if (lastNode) {
						range = range.cloneRange()
						// 光标置到最后
						range.setStartAfter(lastNode)
						range.collapse(true)
						sel.removeAllRanges()
						sel.addRange(range)
					}
				}
			}else if(document.selection && document.selection.type != 'Control'){
				document.selection.createRange().pasteHTML(html)
			}
			this.inputPlaceholdeShow = !this.eEditContent.innerHTML
		},
		eClickPlaceHolder(html){
			this.eInsertEditContent(this[html])
			this.uHandleForbidClickPlaceHolderBtn()
			this.oldInnerHtml = this.eEditContent.innerHTML
		},
		eCheckAll(isCheckAll){
			this.checkedList = isCheckAll? this.checkboxList : []
			this.isIndeterminate = false;
		},
		eCheckedChange(data){
			let count = data.length
			this.checkAll = count === this.checkboxList.length
			this.isIndeterminate = count > 0 && count < this.checkboxList.length;// 指示是否已经选择过checkbox了 中画线
		},
		eSearchNotifyPeople(e){
			this.notifyPeopleList = [
					{label: 'x1', value: 'y1'},
					{label: 'x2', value:'y2'}
				]
		},
		eLevelChange(data){
			console.log( data, '123' )
		},
		eNotifyChange(data){
			let arr = this.notifyPeopleList
			for (let i = 0, len = arr.length; i < len; i++) {
				let item = arr[i]
				if (data === item.value) {
					this.selectedNotifyPeopleList.push(item.label)
					this.selectedNotifyPeopleIdList.push(item.value)
					this.selectedNotifyPeopleList = [...new Set(this.selectedNotifyPeopleList)]
					this.selectedNotifyPeopleIdList = [...new Set(this.selectedNotifyPeopleIdList)]
					break
				}
			}
		},

		eCancle(){
			this.$router.push({name: 'warningManage'})
		},
		 //tip fn
    mCatchException(e, nocatchDesc = '请检查您的网络是否异常！'){
      return errorException(this, e, nocatchDesc)
    },
    mSuccessTip(msg='操作成功'){
      return successTip(this, msg)
    },
    mErrorTip(msg = '操作失败！'){
      return errorTip(this, msg)
    },
    mConfirmModal(msg = '您确定进行此操作？'){
      return confirmModal(this, msg)
    },
	}
};
</script>
<style lang="scss">
.warning-setting {

	color: #999999;
	font-size: 12px;
	.left {
		padding-left: 54px;
		padding-right: 60px;
		width: 60%;
		box-sizing: border-box;
		float: left;
	}
  .title {
		text-align: left;
		margin-top: 20px;
		h2 {
      color: #5a5a5a;
			font-size: 16px;
    }
	}
	.content {
		margin-top: 40px;
		li {
			padding: 10px 0 10px 70px;
			position: relative;
			>span {
				position: absolute;
				left: 0px;
				line-height: 30px;
			}
			>div {
				float: left;
			}
			.select {
				width: 224px;
				&.sp {
					width: 100%;
				}
				.el-select {
					width: 100%;
				}
				.el-select__tags {
					display: none;
				}
				.select-box {
					width: 224px;
				}
				.select-ul {
					margin-top: 5px;
					li {
						float: left;
						padding: 5px;
						margin: 5px;
						margin-left: 0;
						background-color: rgb(243,247,251);
						border-radius: 3px;
						i {
							border-radius: 50%;
							margin-left: 5px;
							line-height: 16px;
							width: 16px;
							height: 16px;
							background-color: darken(rgb(243,247,251), 10%);
							cursor: pointer;
							color: #fff;
							&:active {
								background-color: darken(rgb(243,247,251), 20%);
							}

						}
					}
				}
			}
			.area-group {
				width: 100%;
				box-sizing: border-box;
				padding-right: 132px;
				>div {
					max-height: 150px;
					overflow: scroll;
					padding-left: 10px;
					border-radius: 5px;
					border: 1px solid #d9d9d9;
					&:hover {
						border-color: #c0c4cc;
					}
				}
				// checkall
				label.is-bordered.sp {
					width: 100%;
					border:none;
				}
				// normal checkbox
				label.is-bordered {
					margin-left: 0;
					float: left;
					box-sizing: border-box;
					margin-left: 0;
					width: 25%;
					text-align: left;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}
				.el-checkbox__label {
					color: #999;
				}
				.el-checkbox.is-bordered {
					border: none;
				}
			}
			.textarea {
				width: 100%;
				>div {
					display: flex;
					.input {
						border: 1px solid #dcdfe6;
						border-radius: 5px;
						flex: 1;
						padding: 5px 10px;
						position: relative;
						max-height: 150px;
						overflow: scroll;
						&:hover {
							border-color: #c0c4cc;
						}
						.input-placeholder {
							color: rgb(192,196,204);
							position: absolute;
							left: 10px;
							top: 4px;
						}
						.editable {
							height: 100%;
							min-width: 10px;
							outline: 0;
							text-align: left;
							word-wrap: break-word;
							word-break: break-all;
							-webkit-user-modify: read-write-plaintext-only;
							span {
								display: inline;
								padding: 5px;
								background-color: #c1d9f1;
								border-radius: 3px;
								i {
									border-radius: 50%;
									margin-left: 5px;
									line-height: 14px;
									font-size: 14px;
									width: 14px;
									height: 14px;
									background-color: darken(rgb(243,247,251), 10%);
									cursor: pointer;
									color: #fff;
									&:active {
										background-color: darken(rgb(243,247,251), 20%);
									}
								}
							}
						}
						div.el-textarea {
							display: inline;
						}
						textarea {
							border: none;
							resize: none;
							width: inherit;
							display: inline;
						}
					}
					.placeholder {
						width: 132px;
						button {
							width: 120px;
							margin-bottom: 5px;
							margin-left: 12px;
							color: #999999;
						}
					}
				}
			}
			button.fl {
				width: 100px;
				margin-top: 20px;
			}
		}
	}
	.right {
		width: 39%;
		float: right;
		border-left: 1px solid #eee;;
		min-height: 500px;
		box-sizing: border-box;
		padding: 0 30px 20px 50px;
		margin-top: 40px;
		.content {
			margin-top: 5px;
			max-width: 400px;
			margin: 5px auto;
		}
		.el-card {
			border-radius: 10px;
		}
		h3 {
			text-align: left;
			padding-bottom: 10px;
		}
		.red {
			.el-card__header {
				background-color: #FF0000;
			}
		}
		.blue {
			.el-card__header {
				background-color: rgb(0, 144, 255);
			}
		}
		.orange {
			.el-card__header {
				background-color: #FF8A00;
			}
		}
		.yellow {
			.el-card__header {
				background-color: #EFED51;
			}
		}

		.el-card__header {
			text-align: left;
			color: #fff;
			font-size: 16px;
			font-weight: 700;
			padding: 9px;
			line-height: 28px;
			button {
				float: right;
				width: 28px;
				height: 28px;
				border-radius: 50%;
				background: rgba(255, 255, 255, .5);
				color: rgb(255, 50, 50);
				&:active {
					background-color: darken(rgba(255, 255, 255, .5), 10%);
				}
				i {
					font-size: 20px;
				}
			}
		}
		.text {
			min-height: 80px;
			font-size: 14px;
			color:#999999;
		}
	}
	.red {
		color: red;
		line-height: 32px;
	}
}
</style>