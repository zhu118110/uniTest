import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
    state: {
		titleBarStyle:[],  //存储导航条颜色
	},
    mutations: {
		// 修改导航条颜色
		changetitleBarStyle(state,data){
			state.titleBarStyle=[];
			state.titleBarStyle.push(data);
			console.log("主题改变了："+state.titleBarStyle)
		},
		aaa(state,data){
			uni.setNavigationBarColor({
				frontColor:"#ffffff",
				backgroundColor:state.titleBarStyle[0].color,
				
			})
		}
	},
    actions: {}
})
export default store