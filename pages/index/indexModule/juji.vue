<template>
	<!-- @scrolltolower="scrolltolower" -->
	<view class="container">
		<scroll-view class="scrollHeight"
			scroll-y="true"
			refresher-enabled="true"
			:refresher-triggered="refresher"
			@refresherrefresh="refresherpulling">
			
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
			<!-- 顶部轮播图结束 -->
			<view>
				<scrolllist :scrollList="scrollList"></scrolllist>
			</view>
			<view>
				<list :movieData="videoType" :episodes="true">
					
				</list>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import list from "../../myComponent/list.vue"
	import scrolllist from "../../myComponent/type-scroll.vue"
	export default{
		
		data(){
			return{
				refresher:false,
				// 轮播图
				headBanner:[{
					imgSrc:"/static/jj_lb1.jpg"
				},{
					imgSrc:"/static/jj_lb2.jpg"
				},{
					imgSrc:"/static/jj_lb3.png"
				}],
				scrollList:["全部","风云榜","豆瓣高分","情景喜剧","都市喜剧","罪案嫌疑"],
				// 视频分类
				videoType:[{
					type:"电视剧",
					nm:"如懿传",
					episodeNum:10,
					cover:"/static/bd1.jpg"
				},{
					type:"电视剧",
					nm:"武林外传",
					episodeNum:80,
					cover:"/static/lb1.jpg"
				},{
					type:"电视剧",
					nm:"行尸走肉",
					episodeNum:15,
					cover:"/static/bd1.jpg"
				},{
					type:"电视剧",
					nm:"大侠霍元甲",
					episodeNum:11,
					cover:"/static/bd1.jpg"
				},{
					type:"电视剧",
					nm:"三十而已",
					episodeNum:13,
					cover:"/static/bd1.jpg"
				}],
			}
		},
		components:{
			list,scrolllist
		},
		mounted() {
			console.log("剧集")
		},
		methods:{
			// 下拉时触发
			refresherpulling(){
				this.refresher=true;
				setTimeout(()=>{
					this.refresher=false;
					this.$u.toast("下拉刷新但是没有数据")
				},1000)
				
			},
		}
	}
</script>

<style scoped>
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
</style>

