<template>
	<view class="container">
		<scroll-view 
			scroll-y="true" 
			:refresher-enabled="false"
			@refresherpulling="refresherpulling"
			@refresherrefresh="refresherrefresh"
			@refresherrestore="refresherrestore">
			<!-- 顶部轮播图 -->
			<view class="header">
				<swiper class="swiper" 
					:indicator-dots="true" 
					:interval="3000" 
					:duration="500"
					
					>
					<swiper-item v-for="item in headBanner" class="swiper-item">
						
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
			
			<list :movieData="movieData" style="padding: 0;"></list>
		</scroll-view>
	</view>
</template>

<script>
	import apikeys from "../../../api/api.js"   //动态接口key，
	import list from "../../myComponent/list.vue"
	export default {
		
		data(){
			return {
				
				refresherEnabled:true,  //控制下拉刷新
				// 轮播图
				headBanner:[{
					imgSrc:"/static/lb1.jpg"
				},{
					imgSrc:"/static/bd1.jpg"
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
				
				movieData:null,   //电影数据
			}
		},
		components:{
			list
		},
		created() {
			
			this.getAllMovie()
		
		},

		methods:{
			// 电影列表接口：http://v.juhe.cn/movie/index
			getAllMovie(){
				let _this=this;
				uni.request({
					method:"GET",
					url:'/listApi?key='+apikeys.listKey,
					data:{
						smode:0,
						title:"复"
					},
					success(res) {
						_this.movieData=res.data.result;
						console.log(_this.movieData)
						
					},
					fail(err) {
						console.log(err)
					}
				})
			},
			// 自定义下拉刷新控件被下拉
			refresherpulling(){
				// console.log("自定义下拉刷新控件被下拉")
			},
			// 自定义下拉刷新被触发
			refresherrefresh(){
				let _this = this;
				// setTimeout(function(){
				// 	_this.refresherEnabled=false;
				// },2000)
				// console.log("自定义下拉刷新被触发");
				_this.refresherEnabled=true;
			},
			// 自定义下拉刷新复位
			refresherrestore(){
				this.refresherEnabled=true;
				// console.log("自定义下拉刷新复位")
			}
		}
		
	}
</script>

<style scoped>
	view,image,swiper,swiper-item{
		
		box-sizing: border-box;
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
		
		display: flex;
		justify-content: space-between;
	}
	.navList .navItem{
		text-align: center;
		width: 25%;
	}
	.navItem .iconfont{
		font-size: 50rpx;
	}
</style>
