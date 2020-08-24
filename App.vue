<script>
	import {mapMutations} from "vuex"
	export default {
		onLaunch: function() {
			let _this = this;
			//  应用刚进来时从本地获取登录信息
			uni.getStorage({
				key:"userInfor",
				success:(res)=>{
					// _this.login(res);
					_this.login(res.data)
				}
			})
		
			
		},
		onShow: function() {
			// console.log('App Show')
		},
		onHide: function() {
			// console.log('App Hide')
		},
		methods: {  
			...mapMutations(['login'])  
		}  
		
		
	}
</script>

<style lang="scss">
	@import url("font/font.css");
	@import "./components/uview-ui/index";
	view,text,image{
		box-sizing: border-box;
	}
	.status_bar {
	      height: var(--status-bar-height);
	      width: 100%;
		  background-color: #000000;
	  }
	/*每个页面公共css */
	
		
		
	
</style>
