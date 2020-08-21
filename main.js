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


App.mpType = 'app'

const app = new Vue({
    ...App,
	store
})
app.$mount()
