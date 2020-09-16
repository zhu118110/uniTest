import Vue from 'vue'
import App from './App'

import store from "./store/index.js"
import './font/font.css'
Vue.config.productionTip = false

import uView from "./components/uview-ui";
Vue.use(uView);
// 从本地获取主题色
Vue.prototype.$getMainColor=function(){
	let mainColor="";
	mainColor=uni.getStorageSync("styleColor");
	uni.setTabBarStyle({
		selectedColor:mainColor.color,
	});
	// 改变顶部导航条颜色
	uni.setNavigationBarColor({
		frontColor:"#ffffff",
		backgroundColor:mainColor.color,
		
	})
	return mainColor
};
// 封装GET请求
/*
	@params(Object) params:请求参数
		params{
			url，
			data,
			header,
		}	
*/
Vue.prototype.$hhtpGet=function(params){
	
	return new Promise((resolve,reject)=>{
		uni.request({
			...params,
			success(res) {
				resolve(res)
			},
			fail(err) {
				reject(err)
			}
		})
	})
};

// 改变主题色
Vue.prototype.$changeTabColor=function(color){
	
	// uni.setTabBarStyle({
	// 	selectedColor:color,
	// });
	// 改变顶部导航条颜色
	uni.setNavigationBarColor({
		frontColor:"#ffffff",
		backgroundColor:color,
	})
};


App.mpType = 'app'

const app = new Vue({
    ...App,
	store
})
app.$mount()
