import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
    state: {
		// 用户登录信息
		userInfor:{
			user_name:"",   //用户名称
			user_img:"",   //用户头像
		},
		isLogin:false,  //是否登录
	},
    mutations: {
		// 保存登录信息
		login(state,userInfor){
			state.isLogin = true;
			state.userInfor.user_name = userInfor.nickName;
			state.userInfor.user_img = userInfor.avatarUrl;
			uni.setStorage({
				key:"userInfor",
				data:userInfor
			})
		},
		// 退出登录清除登录信息
		loginOut(state,userInfor){
			state.isLogin=false;
			state.userInfor.user_name="";
			state.userInfor.user_img="";
			uni.removeStorage({
				key:"userInfor"
			})
		}
	},
    actions: {}
})
export default store