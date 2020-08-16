<template>
	<view class="box">
		<view class="status_bar" :style="{'background-color':tabbarColor}"></view>
			
		
		<view class="header" :style="{'background-color':tabbarColor}">
			<!-- 头像 -->
			<view class="login">
				
				<view class="head_img">
					<image :src="userInfor.avatarUrl"></image>
				</view>
				<view class = "" :style="{'background-color':tabbarColor}">
					<!-- #ifdef MP-WEIXIN -->
						<view v-if="userInfor.nickName">{{userInfor.nickName}}</view>
						<button v-else type="default"  hover-class="none" plain="true" @getuserinfo="getuserinfo" open-type="getUserInfo">登录</button>
					<!-- #endif -->
					
					<!-- #ifndef MP-WEIXIN -->
						<view @click="appLogin">点击登录</view>
					<!-- #endif -->
				</view>
			</view>
			<!-- 4个导航 -->
			<view class="headnav">
				<block v-for="(item , index) in navList" :key = "index">
					
					<view class="navList">
						<view class="navIcon iconfont" :class="item.icon"></view>
						<view class="nav-Item">{{item.text}}</view>
					</view>
					
				</block>
			</view>
		</view>
		
		<!-- list -->
		<view class="listArea">
			<view class="list">
				<view class = "list-item" @click = "toOherPage">
					<text class="listIcon iconfont icon-zhuti"></text>
					<text class="listText">更换主题</text>
				</view>
				<!-- #ifdef MP-WEIXIN -->
				<view  class = "list-item" style="padding: 0 20rpx;">
					<button id="share" open-type="share" :hover-class="false">
						<text class="listIcon iconfont icon-tubiao-"></text>
						<text class="listText">分享给好友</text>
					</button>
				</view>
				<!-- #endif -->
				
				<!-- #ifndef MP-WEIXIN -->
				<view  class = "list-item" @click="share">
					<text class="listIcon iconfont icon-tubiao-"></text>
					<text class="listText">分享给好友</text>
				</view>
				<!-- #endif -->
				<view class = "list-item" @click = "mymessage">
					<text class="listIcon iconfont icon-yiliaohangyedeICON-"></text>
					<text class="listText">我的消息</text>
				</view>
				<view class = "list-item" @click = "mymessage">
					<text class="listIcon iconfont icon-haopingganxie"></text>
					<text class="listText">五星好评</text>
				</view>
				<view class = "list-item" @click = "mymessage">
					<text class="listIcon iconfont icon-fankui"></text>
					<text class="listText">帮助反馈</text>
				</view>
				<view class = "list-item" @click = "mymessage">
					<text class="listIcon iconfont icon-12"></text>
					<text class="listText">我要求视频</text>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default{
		data(){
			return{
				navList:[{
					icon:"icon-lixianxiazai",
					text:"离线缓存"
				},{
					icon:"icon-shoucang",
					text:"我的收藏"
				},{
					icon:"icon-yixianshi-",
					text:"观看历史"
				},{
					icon:"icon-yunliankeji_gongyinglianfuben",
					text:"设置"
				}],
				
				tabbarColor:"",  //主题颜色
				userInfor:{//小程序端用户信息
					avatarUrl:"../../static/logo.png",
					nickName: ""
				},  
			}
		},
		// 页面显示时监听 “更改主题” 页面事件，动态改变底部tabbar颜色
		onShow() {
			this.tabbarColor=this.$getMainColor().color;
		},
		
		methods:{
			/*
				点击跳转别的页面
				@params{Number}:index:跳转的数据的下标,根据下标获取跳转的url
			*/
			toOherPage(index){
				let _this=this;
				uni.navigateTo({
					url:"./changeTitle/changeTitle"
				})
			},
			
			// 分享事件
			share(){
				let _this=this;
				// app端调用分享
				// #ifdef APP-PLUS
					uni.shareWithSystem({
						summary:"我在追美剧,你也快来吧",
						href:"http://www.baidu.com",
						success() {
							console.log("分享成功")
						},
						fail(err){
							console.log("分享失败"+err)
						}
					})
				// #endif
				
				
			},	
			// 微信端点击右上角调用分享功能
			onShareAppMessage(res){
				if(res){
					console.log(res)
				};
				return {
					title:"我在小程序追美剧,你也快来吧",
					path:"/pages/index/index.vue",
					imageUrl:"../../static/logo.png",
				}
			},
			// 我的消息
			mymessage(){
				
				uni.showToast({
					title:"暂未开通此功能",
					icon:"none"
				})
			},
			// 小程序获取用户信息
			getuserinfo(){	
				let _this=this;
				uni.login({
					provider: 'weixin',
					auth_user:"auth_user",
					success(res) {
						console.log(res)
						uni.getUserInfo({
							lang:"zh_CN",
							provider:"weixin",
							success(res) {
								_this.userInfor.avatarUrl=res.userInfo.avatarUrl;
								_this.userInfor.nickName=res.userInfo.nickName;
								
							},
							fail(err) {
								console.log("授权失败"+err)
							}
						})
						
					},
					fail(err) {
						console.log(err)
					}
				})
			},
			// app\h5登录
			appLogin(){
				console.log(111)
			}
		},
		watch:{
			
			
		}
	}
</script>

<style scoped>
	
	.box{
		width:100%;
		height: 100%;
		box-sizing:border-box;
	}
	.header{
		
		padding: 30rpx 0;
		
	}
	/* 头像样式 */
	.header .login{
		text-align: center;
		display:flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		
	}
	.header .login .head_img{
		width: 150rpx;
		/* max-width: 180rpx; */
		height: 150rpx;
		/* max-height: 80%; */
		border-radius: 50%;
		overflow: hidden;
		text-align: center;
		font-size: 0;
		display: inline-block;
	}
	.header .login .head_img image{
		width: 100%;
		height: 100%;
		
	}
	.header .login>view:last-child{
		text-align: center;
		color: #fff;
		padding: 0rpx 80rpx;
		border-radius: 40rpx;
		background-color: #55aaff;
		margin-top: 10rpx;
		height:60rpx;
		line-height: 60rpx;
		font-size: 30rpx;
		
	}
	/* #ifdef MP-WEIXIN */
	.header .login view button{
		line-height: none !important;
		font-size: 30rpx;
		color: #fff;
		border: none;
	}
	/* #endif */
	/* 头部4个导航 */
	.headnav{
		display: flex;
		justify-content: space-around;
		
		width: 90%;
		margin: 40rpx auto 0;
	}
	.headnav .navList{
		text-align: center;
		color: #fff;
		
	}
	.headnav .navList .navIcon{
		font-size: 50rpx;
	}
	.headnav .navList .nav-Item{
		font-size: 32rpx;
	}
	
	
	
	/* 6个list */
	.listArea{
		width: 100%;
		height: 100%;
		
	}
	.listArea .list{
		width: 100%;
		height: 100%;
		box-sizing: border-box;
		padding: 0 20rpx;
		margin: 0 auto;
	}
	.listArea .list .list-item{
		padding: 20rpx;
		border-bottom: 1rpx solid #f1f1f1;
	}
	.listArea .list .list-item .listIcon{
		font-size: 32rpx;
		vertical-align: middle;
	}
	.listArea .list .list-item .icon-zhuti{
		color: #007AFF;
	}
	.listArea .list .list-item .icon-tubiao-{
		color: #ff5500;
	}
	.listArea .list .list-item .icon-yiliaohangyedeICON-{
		color: #aa0000;
	}
	.listArea .list .list-item .icon-haopingganxie{
		color: #aaaa00;
	}
	.listArea .list .list-item .icon-fankui{
		color: #aa00ff;
	}
	.listArea .list .list-item .icon-12{
		color: #ff00ff;
	}
	.listText{
		margin-left: 20rpx;
		vertical-align: middle;
	}
	.listArea .list button{
		font-size: 28rpx;
		background-color: inherit;
		text-align: left;
		line-height: none;
		border: none;
		padding: 0;
		
	}
	.listArea .list button::after{
		width: 0;
		height: 0;
	}
</style>
