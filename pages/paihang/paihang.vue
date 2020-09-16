<template>
	<view class="container">
		<!-- <view class="status_bar" :style="{'background-color':tabCol}"></view> -->
		<!-- #ifndef MP-WEIXIN -->
			<u-navbar :is-back="false" :is-fixed="false" :background="tabbarColor" title="排行" title-color="#fff">
				<view slot="right" class="navBar" @click="toSearch">
					<text class="iconfont icon-tubiao-1" style="font-size: 24px;"></text>
				</view>
			</u-navbar>
		<!-- #endif -->
		
		<!-- #ifdef MP-WEIXIN -->
			<u-navbar :is-back="false" :is-fixed="false" :background="tabbarColor">
				<view class="wxSearch">
					<u-search
						placeholder="复仇者联盟4" 
						input-align="center" 
						height="44" 
						:disabled="true" 
						:action-style="searchCol"
						@click="toSearch"
						:show-action="false"
						:input-style="inputStyle"
						>
					</u-search>
				</view>
				
			</u-navbar>
		<!-- #endif -->
		
		<!-- 筛选 -->
		<view class="filters">
			
		</view>
		<!-- 电影列表 -->
		<view class="list">
			<scroll-view scroll-y="true" class="scroll" 
				refresher-enabled="true"
				:refresher-triggered="refresher"
				
				:lower-threshold="10"
				@scrolltolower="scrolltolower"
				@refresherrefresh="refresherrefresh"
				>
				<list :movieData="dataList" :rate="true"></list>
			
			</scroll-view>
			<view class="loading" v-if="loading">
				<u-loading mode="circle" :show="true">加载中</u-loading>
			</view>
			
		</view>
		
	</view>
</template>

<script>
	import list from "../myComponent/list.vue"
	export default{
		data(){
			return{
				scrollHeight:500,
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
					},{
						type:"电影",
						nm:"白蛇:缘起",
						sc:8.5,//评分,
						cover:"/static/bd1.jpg"
					},{
						type:"电影",
						nm:"极限挑战",
						sc:8.0,//评分
						cover:"/static/lb3.png"
					},{
						type:"电影",
						nm:"妙先生",
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
						nm:"极限挑战",
						sc:7.4,//评分
						cover:"/static/bd1.jpg"
					}
				],
				// tabbarColor:{
				// 	backgroundColor:"#2a91d5"
				// },
				searchCol:{
					color:"#fff"
				},
				inputStyle:{
					width:"100%",
					
				},
				refresher:false,
				loading:false
			}
		},
		components:{
			list
		},
		onShow() {
			// this.tabbarColor.backgroundColor=this.$getMainColor().color||"#2a91d5";
		},
		computed:{
			count(){
				return this.$store.state.test
			}
		},
		methods:{
			// 点击导航跳转到搜索页面
			toSearch(){
				uni.navigateTo({
					url:"./search/search"
				})
			},
			// 滚动到底部触发
			scrolltolower(){
				console.log("滚动到了底部")
				this.loading=true;
				setTimeout(()=>{
					this.loading=false;
					this.$u.toast("上拉加载但是没有数据")
				},2000)
			},
			// 下拉时触发
			refresherrefresh(){
				this.refresher=true;
				setTimeout(()=>{
					this.refresher=false;
					this.$u.toast("下拉刷新但是没有数据")
				},1000)
				
			},
		},
		computed:{
			tabbarColor(){
				// console.log(this.$store.state.tabColor)
				return {backgroundColor:this.$store.state.tabColor};
			}
		},
		watch:{
			
		}
		
	}
</script>

<style scoped lang="less">
	.container{
		width: 100%;
		height: 100%;
		box-sizing: border-box;
	}
	.navBar{
		height: 44px;
		margin:0 20rpx;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		color: #fff;
	}
	/* #ifdef MP-WEIXIN */
		.wxSearch{
			display: flex;
			align-items: center;
			justify-content: center;
			margin-left: 20rpx;
			overflow: hidden;
			& .u-search .u-content{
				
			}
		}
	/* #endif */
	
	.list{
		padding: 0 10rpx;
	}
	.scroll{
		height: calc( 100vh - 70px );
	}
	
	.loading{
		
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
