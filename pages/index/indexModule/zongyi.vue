<template>
	<view class="container">
		<scroll-view class="scrollHeight"
		scroll-y="true"
		refresher-enabled="true"
		:refresher-triggered="refresher"
		@scrolltolower="scrolltolower"
		@refresherrefresh="refresherpulling">
		</scroll-view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				refresher:false,
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
				
				
			}
		},
		mounted() {
			console.log("综艺")
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
</style>

