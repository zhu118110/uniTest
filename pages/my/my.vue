<template>
	<view class="box">
		<view class="status_bar" :style="{'background-color':tabbarColor}"></view>
		<view class="header" :style="{'background-color':tabbarColor}">
			<!-- 微信小程序登录区域 -->
			<!-- #ifdef MP-WEIXIN -->
			<view class="wxLogin">
				<view class="head_img">
					<image v-if="!userInfor.avatarUrl" src="../../static/logo.png"></image>
					<image v-else :src="userInfor.avatarUrl"></image>
					
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
			<!-- #endif -->
			
			<!-- h5,app用户头部 -->
			<!-- #ifndef MP-WEIXIN -->
				<view class="appLogin" >
					<view class="appLogin_img">
						<image v-if="!userInfor.head_img" src="../../static/logo.png"></image>
						<image v-else :src="userInfor.head_img"></image>
						<!-- <image :src="userInfor.head_img"></image> -->
					</view>
					<view class="appLogin_name" @click="appLogin">
						<view class="notLogin" >
							
							<view v-if="!userInfor.name">
								登录或注册
							</view>
							<view v-else>
								{{ userInfor.name }}
							</view>
							<view>
								账号管理
							</view>
						</view>
						
						<view>
							<u-icon name="arrow-right" color="#ccc"></u-icon>
						</view>
					</view>
					
				</view>
			<!-- #endif -->
			
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
				<view  class = "list-item" style="padding: 0">
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
		
		<view @click="change">
			{{ count }}
		</view>
		<!-- 遮罩层,小程序用户登录时显示loading动画 -->
		<!-- #ifdef MP-WEIXIN -->
		<u-mask :show="maskShow" :custom-style="{background: 'rgba(255, 255, 255, 0.5)'}">
			<view class="load">
				<u-loading :show="maskShow" mode="circle" size="50"></u-loading>
					正在登录
			</view>
		</u-mask>
		<!-- #endif -->
	</view>
</template>

<script>
	import {mapState,mapMutations} from "vuex"
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
				tabbarColor:"#2a91d5",  //主题颜色
				userInfor:{},  //小程序端用户信息
				
				maskShow:false
			}
		},
		onLoad() {
			
		},
		// 页面显示时监听 “更改主题” 页面事件，动态改变底部tabbar颜色
		onShow() {
			this.tabbarColor=this.$getMainColor().color;
			
			let userInfor=uni.getStorageSync("userInfor");
			if(userInfor){
				this.userInfor=userInfor;
				this.login(userInfor);
			}
		
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
			
			//// app端调用分享
			// #ifdef APP-PLUS
			share(){
				let _this=this;
				
					uni.shareWithSystem({
						summary:"我在追美剧,你也快来吧",
						href:"http://www.baidu.com",
						success() {
							uni.showToast({
								title:"打开分享",
								icon:"none"
							})
						},
						fail(err){
							uni.showToast({
								title:"分享失败"+err,
								icon:"none"
							})
						}
					})
			},	
			// #endif
			// 微信端点击右上角调用分享功能
			onShareAppMessage(res){
				if(res){
					
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
			// 小程序获取用户信息登录
			// #ifdef MP-WEIXIN
			getuserinfo(){	
				let _this = this;
				_this.maskShow=true;
				uni.login({
					provider: 'weixin',
					auth_user: "auth_user",
					success(res) {
						
						uni.getUserInfo({
							lang:"zh_CN",
							provider:"weixin",
							success(res) {
								
								setTimeout(function(){
									_this.userInfor.avatarUrl=res.userInfo.avatarUrl;
									_this.userInfor.nickName=res.userInfo.nickName;
									_this.maskShow=false;
									// _this.login是vuex里mutatuons的方法,用来保存登录用户的信息
									_this.login(res.userInfo)
								},1000)
							},
							fail(err) {
								_this.maskShow=false;
								uni.showToast({
									title:"获取用户授权失败"+err,
									icon:"none"
								})
							
							}
						})
						
					},
					fail(err) {
						uni.showToast({
							title:"登录失败" + err,
							icon:"none"
						})
					}
				})
			},
			// #endif
			
			// #ifndef MP-WEIXIN
			// app\h5点击登录跳转到登陆页面
			appLogin(){
				uni.navigateTo({
					url:"./login/login"
				})
			},
			// #endif
			
			change(){
				let i=1;
				this.$store.commit("changeTest",i++)
			},
			...mapMutations(["login","changeTest"])
		},
		computed:{
			count(){
				return this.$store.state.test
			}
		}
	}
</script>

<style scoped lang="less">
	
	.box{
		width:100%;
		
		box-sizing:border-box;
	}
	.tx(@width,@height){
		width: @width;
		/* max-width: 180rpx; */
		height: @height;
		/* max-height: 80%; */
		border-radius: 50%;
		overflow: hidden;
		text-align: center;
		font-size: 0;
		display: inline-block;
		& image{
			width: 100%;
			height: 100%;
		}
	}
	.header{
		
		padding: 30rpx 0;
		
	}
	/* 头像样式 */
	/* #ifdef MP-WEIXIN */
	.header .wxLogin{
		text-align: center;
		display:flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		
	}
	.header .wxLogin .head_img{
		.tx(150rpx,150rpx)
	}
	
	.header .wxLogin>view:last-child{
		text-align: center;
		color: #fff;
		padding: 0rpx 80rpx;
		border-radius: 40rpx;
		background-color: #55aaff;
		margin-top: 10rpx;
		height:60rpx;
		line-height: 60rpx;
		font-size: 16px;
		
	}
	.header .wxLogin view button{
		line-height: none !important;
		font-size: 14px;
		color: #fff;
		border: none;
	}
	/* #endif */
	
	/* #ifndef MP-WEIXIN*/
		.appLogin{
			width: 100%;
			padding: 0 20rpx;
			// background-color: #fff;
			display: flex;
			justify-content: flex-start;
			.appLogin_img{
				.tx(130rpx,130rpx )
			}
			.appLogin_name{
				flex: 1;
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-left: 20rpx;
				.notLogin{
					display: flex;
					flex-direction: column;
					justify-content: space-around;
					& view:first-child{
						font-size: 18px;
						font-weight: 800;
						color: #fff;
					}
					& view:last-child{
						color: #ccc;
					}
				}
				
			}
			
		}
	/* #endif */
	
	/* 头部4个导航 */
	.headnav{
		display: flex;
		justify-content: space-between;
		
		width: 100%;
		margin-top: 40rpx;
		padding: 0 20rpx;
	}
	.headnav .navList{
		text-align: center;
		color: #fff;
		
	}
	.headnav .navList .navIcon{
		font-size: 25px;
	}
	.headnav .navList .nav-Item{
		font-size: 16px;
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
		padding: 20rpx 0;
		border-bottom: 1rpx solid #f1f1f1;
		font-size: 16px;
	}
	.listArea .list .list-item .listIcon{
		  font-size: 18px;
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
		font-size: 16px;
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
	
	.load{
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
