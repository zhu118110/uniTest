import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
    state: {
		// 用户登录信息
		userInfor:{},
		isLogin:false,  //是否登录
		test:1,
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
		changeTest(state,newTest){
			
			state.test+=newTest;
			console.log(state.test)
		}
	},
    actions: {}
})
export default store