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
			
			<!-- 分类 -->
			<view class="type">
				<view class="type_title">
					<text>电影</text>
					<text>更多></text>
				</view>
				<list :movieData="movieData" style="padding: 0;"></list>
			</view>
			
			<!-- 分类 -->
			<view class="type">
				<view class="type_title">
					<text>电视剧</text>
					<text>更多></text>
				</view>
				<list :movieData="tvData" style="padding: 0;"></list>
			</view>
			
			<!-- 分类 -->
			<view class="type">
				<view class="type_title">
					<text>综艺</text>
					<text>更多></text>
				</view>
				<list :movieData="zyData" style="padding: 0;"></list>
				
			</view>
			<!-- 分类 -->
			<view class="type">
				<view class="type_title">
					<text>动漫</text>
					<text>更多></text>
				</view>
				<list :movieData="dmData" style="padding: 0;"></list>
				
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
				// 视频分类
				videoType:[{
					name:"每日必看",
					dataList:[{
						
							type:"电影",
							title:"港囧",
							rate:8.5,//评分,
							cover:"/static/bd1.jpg"
						},{
							type:"电影",
							title:"无极",
							rate:8.0,//评分
							cover:"/static/bd1.jpg"
						},{
							type:"电影",
							title:"复仇者联盟一",
							rate:8.5,//评分,
							cover:"/static/bd1.jpg"
						},{
							type:"电影",
							title:"心花路放",
							rate:8.0,//评分
							cover:"/static/bd1.jpg"
						},{
							type:"电影",
							title:"上海滩",
							rate:8.0,//评分
							cover:"/static/bd1.jpg"
						},{
							type:"电影",
							title:"越狱",
							rate:8.0,//评分
							cover:"/static/bd1.jpg"
						}
					]
				},{
					name:"夏日高分",
					dataList:[{
							type:"电影",
							title:"我是谁",
							rate:8.5,//评分,
							cover:"/static/bd1.jpg"
						},{
							type:"电影",
							title:"真命天子",
							rate:8.0,//评分
							cover:"/static/bd1.jpg"
						},{
							type:"电影",
							title:"白蛇:缘起",
							rate:8.5,//评分,
							cover:"/static/bd1.jpg"
						},{
							type:"电影",
							title:"极限挑战",
							rate:8.0,//评分
							cover:"/static/bd1.jpg"
						},{
							type:"电影",
							title:"妙先生",
							rate:8.0,//评分
							cover:"/static/bd1.jpg"
						}
					]
				}],
				movieData:null,   //电影数据
				tvData:null,
				zyData:null,
				dmData:null
			}
		},
		components:{
			list
		},
		created() {
			this.getAllMovie();
			// this.getAllTv();
			// this.getAllDm();
			// this.getAllZy()
		},
		mounted() {
			console.log("精选")
			
			
		},

		methods:{
			/* 
				电影列表接口1：'http://v.juhe.cn/movie/index?key='+apikeys.listKey+"&smode=0";
				data:{
					title=‘复’,
					pagesize=6
				},
				success(res){
					if(res.data.result)
				}
				
			*/
			/*
				电影接口2:https://moview.douban.com/j/search_subjects
				data:{
					type:"movie",
					tag:"热门",
					page_limit:20,
					page_start:0
				}
				header:{
					'content-type':'json'
				},
				success(res){
					if(res.data.subjects)
				}
			*/
			getAllMovie(){
				let _this=this;
				// #ifndef H5
				// let url='http://v.juhe.cn/movie/index?key='+apikeys.listKey+"&smode=0";
				let url="https://m.maoyan.com/ajax/movieOnInfoList"
				// #endif
				
				uni.request({
					method:"GET",
					url:url,
					success(res) {
						if(res.data.movieList){
							_this.movieData=res.data.movieList;
						
						}
					},
					fail(err) {
						console.log(err)
					}
				})
			},
			getAllTv(){
				let _this=this;
				// #ifndef H5
				// let url='http://v.juhe.cn/movie/index?key='+apikeys.listKey+"&smode=0";
				let url="https://movie.douban.com/j/search_subjects"
				// #endif
				
				uni.request({
					method:"GET",
					url:url,
					data:{
						type:"tv",
						tag:"热门",
						page_limit:6,
						page_start:0
					},
					header:{
						'content-type':'json'
					},
					success(res) {
						if(res.data.subjects){
							_this.tvData=res.data.subjects
							
						}
					},
					fail(err) {
						console.log(err)
					}
				})
			},
			getAllZy(){
				let _this=this;
				// #ifndef H5
				// let url='http://v.juhe.cn/movie/index?key='+apikeys.listKey+"&smode=0";
				let url="https://movie.douban.com/j/search_subjects"
				// #endif
				
				uni.request({
					method:"GET",
					url:url,
					data:{
						type:"tv",
						tag:"综艺",
						page_limit:6,
						page_start:0
					},
					header:{
						'content-type':'json'
					},
					success(res) {
						if(res.data.subjects){
							_this.zyData=res.data.subjects
							
						}
					},
					fail(err) {
						console.log(err)
					}
				})
			},
			getAllDm(){
				let _this=this;
				// #ifndef H5
				// let url='http://v.juhe.cn/movie/index?key='+apikeys.listKey+"&smode=0";
				let url="https://movie.douban.com/j/search_subjects"
				// #endif
				
				uni.request({
					method:"GET",
					url:url,
					data:{
						type:"movie",
						tag:"动漫",
						page_limit:6,
						page_start:0
					},
					header:{
						'content-type':'json'
					},
					success(res) {
						if(res.data.subjects){
							_this.dmData=res.data.subjects
						}
					},
					fail(err) {
						console.log(err)
					}
				})
			},
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
</style>
