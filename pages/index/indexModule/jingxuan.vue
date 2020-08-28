<template>
	<view class="container">
		<scroll-view class="scrollHeight" 
			scroll-y="true" 
			refresher-enabled="true"
			:refresher-triggered="refresher"
			@scrolltolower="scrolltolower"
			@refresherrefresh="refresherpulling"
			
			>
			<!-- 顶部轮播图 -->
			<view class="header">
				<swiper class="swiper" 
					:indicator-dots="true" 
					:interval="3000" 
					:duration="500"
					>
					<swiper-item v-for="(item,index) in headBanner" class="swiper-item">
						
							<image :src="item.imgSrc" mode=""></image>
						
					</swiper-item>
				</swiper>
			</view>
			
			<!-- 导航 -->
			<view class="navList">
				<view class="navItem" v-for="(item,index) in navList">
					<view class="iconfont" :class="item.icon"></view>
					<view>{{ item.title }}</view>
					
				</view>
			</view>
			
			<!-- 分类 -->
			<view class="type" v-for="(item,index) in videoType">
				<view class="type_title">
					<text>{{ item.name }}</text>
					<text>更多></text>
				</view>
				<list :movieData="item.dataList" :rate="true" style="padding: 0;"></list>
			</view>
			
			<!-- 滚动到底部加载的数据显示区域 -->
			<view class="loadData type">
				<view class="type_title">
					<text>猜你喜欢</text>
					<text></text>
				</view>
				<list :movieData="loadPush">
					
				</list>
			</view>
			
			<!-- 滚动到底部显示的加载动画 -->
			<view class="loading">
				<u-loading mode="circle" :show="loading">记载中</u-loading>
			</view>
			
			<view class="loading" v-if="noData">
				<u-loadmore status="暂无数据" />
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import apikeys from "../../../api/api.js"   //动态接口key，
	import list from "../../myComponent/list.vue"
	export default {
		
		data(){
			return {
				refresher:false,
				// 轮播图
				headBanner:[{
					imgSrc:"/static/lb4.png"
				},{
					imgSrc:"/static/lb2.jpg"
				},{
					imgSrc:"/static/lb3.png"
				}],
				// 导航
				navList:[{
					icon:"icon-dianshi",
					title:"电视剧"
				},{
					icon:"icon-dianying",
					title:"电影"
				},{
					icon:"icon-liebiaodaohang_zongyi",
					title:"综艺"
				},{
					icon:"icon-donghuapian",
					title:"动漫"
				},{
					icon:"icon-zhuanti",
					title:"专题"
				},],
				// 视频分类
				videoType:[{
					name:"每日必看",
					dataList:[{
							type:"电影",
							nm:"港囧",
							sc:8.5,//评分,
							cover:"/static/lb1.jpg"
						},{
							type:"电影",
							nm:"无极",
							sc:8.0,//评分
							cover:"/static/bd1.jpg"
						},{
							type:"电影",
							nm:"复仇者联盟一",
							sc:8.5,//评分,
							cover:"/static/lb2.jpg"
						},{
							type:"电影",
							nm:"心花路放",
							sc:8.0,//评分
							cover:"/static/bd1.jpg"
						},{
							type:"电影",
							nm:"暗夜",
							sc:8.0,//评分
							cover:"/static/lb1.jpg"
						},{
							type:"电影",
							nm:"越狱",
							sc:8.0,//评分
							cover:"/static/lb3.png"
						}
					]
				},{
					name:"夏日高分",
					dataList:[{
							type:"电影",
							nm:"我是谁",
							sc:8.5,//评分,
							cover:"/static/bd1.jpg"
						},{
							type:"电影",
							nm:"真命天子",
							sc:8.0,//评分
							cover:"/static/bd1.jpg"
						},{
							type:"电影",
							nm:"白蛇:缘起",
							sc:8.5,//评分,
							cover:"/static/bd1.jpg"
						},{
							type:"电影",
							nm:"极限挑战",
							sc:8.0,//评分
							cover:"/static/bd1.jpg"
						},{
							type:"电影",
							nm:"妙先生",
							sc:8.0,//评分
							cover:"/static/bd1.jpg"
						}
					]
				}],
				movieData:null,   //电影数据
				// 滚动到底部要加载的数据
				loadData:[{
					type:"电影",
						nm:"港囧",
						sc:8.5,//评分,
						cover:"/static/bd1.jpg"
					},{
						type:"电影",
						nm:"无极",
						sc:8.0,//评分
						cover:"/static/lb3.png"
					},{
						type:"电影",
						nm:"复仇者联盟一",
						sc:8.5,//评分,
						cover:"/static/lb2.jpg"
					},{
						type:"电影",
						nm:"心花路放",
						sc:8.0,//评分
						cover:"/static/bd1.jpg"
				}],
				loadPush:[{
					type:"电影",
					nm:"白蛇:缘起",
					sc:8.5,//评分,
					cover:"/static/bd1.jpg"
				},{
					type:"电影",
					nm:"极限挑战",
					sc:8.0,//评分
					cover:"/static/bd1.jpg"
				},{
					type:"电影",
					nm:"妙先生",
					sc:8.0,//评分
					cover:"/static/bd1.jpg"
				}],
				loading:false,
				loadNum:1,
				noData:false
			}
		},
		components:{
			list
		},
		created() {
		
		},
		mounted() {
		},
		
		methods:{
			getAllMovie(){
				let _this=this;
				// let url='http://v.juhe.cn/movie/index?key='+apikeys.listKey+"&smode=0";
				let url="https://m.maoyan.com/ajax/movieOnInfoList"
				_this.$hhtpGet({
					url
				})
				.then(res=>{
					if(res.data.movieList){
						_this.movieData=res.data.movieList;
					}else{
						_this.movieData=[]
					}
				})
				.catch(err=>{
					_this.$u.toast("网络连接失败")
				})
			},
			// 下拉时触发
			refresherpulling(){
				this.refresher=true;
				setTimeout(()=>{
					this.refresher=false;
					this.$u.toast("下拉刷新但是没有数据")
				},1000)
				
			},
			// 滑动到底部加载数据
			scrolltolower(){
				let _this=this;
				console.log(_this.loadNum)
				if(_this.loadNum>=5){
					_this.noData=true;
					return false
				}
				_this.loadNum+=1;
				_this.loading=true;
				setTimeout(function(){
					_this.loadPush.push(..._this.loadData)
					_this.loading=false
				},1000)
				
			}
		}
		
	}
</script>

<style scoped>
	view,image,swiper,swiper-item{
		
		box-sizing: border-box;
	}
	.scrollHeight{
		height: calc( 100vh - 105px );
	}
	.container{
		width: 100%;
		padding: 0 10rpx;
	}
	.header{
		width: 100%;
		height: 400rpx;
		margin: 10rpx 0;
	}
	
	.header swiper,.swiper-item{
		width: 100%;
		height: 100%;
		
	}
	.swiper-item{
		border-radius: 20rpx;
		overflow: hidden;
	}
	.swiper-item image{
		width: 100%;
		height: 100%;
		display: block;
		
	}
	
	/* 导航 */
	.navList{
		width: 100%;
		margin: 40rpx 0;
		display: flex;
		padding: 0 10rpx;
		justify-content: space-between;
	}
	.navList .navItem{
		text-align: center;
		
	}
	.navItem .iconfont{
		font-size: 35px;
	}
	.navItem .icon-dianshi{
		color: #0086B3;
	}
	.navItem .icon-dianying{
		color: #aa0000;
	}
	.navItem .icon-liebiaodaohang_zongyi{
		color: #ff5500;
	}
	.navItem .icon-donghuapian{
		color: #007AFF;
	}
	.navItem .icon-zhuanti{
		color: #aa00ff;
	}
	
	.type{
		width: 100%;
		padding: 20rpx 0;
		border-bottom: 1rpx solid #f1f1f1;
	}
	.type .type_title{
		display: flex;
		justify-content: space-between;
	}
	.type .type_title text:first-child{
		font-size: 16px;
		
	}
	.type .type_title text:last-child{
		font-size: 12px;
		color: #ccc;
	}
	
	.loading{
		display: flex;
		justify-content: center;
	}
</style>
