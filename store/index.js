import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
    state: {
		// 用户登录信息
		userInfor:{},
		isLogin:false,  //是否登录
		test:1,
		// 导航栏颜色
		tabColor:"#2a91d5"
	},
    mutations: {
		// 保存小程序登录信息
		
		login(state,userInfor){
			state.isLogin = true;
			state.userInfor = userInfor;
			uni.setStorage({
				key:"userInfor",
				data:userInfor
			})
		},
		// 退出登录清除登录信息
		loginOut(state,userInfor){
			state.isLogin=false;
			state.userInfor={};
			uni.removeStorage({
				key:"userInfor"
			})
		},
		// 改变tabbar样式
		changeTabBar(state,color){
			state.tabColor=color;
			
			uni.setStorageSync("styleColor",color);
		}
	},
    actions: {}
})
export default store