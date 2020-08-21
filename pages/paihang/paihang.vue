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
			<list></list>
		</view>
		
	</view>
</template>

<script>
	import list from "../myComponent/list.vue"
	export default{
		data(){
			return{
				tabbarColor:{
					backgroundColor:"#2a91d5"
				},
				searchCol:{
					color:"#fff"
				},
				inputStyle:{
					width:"100%"
				}
			}
		},
		components:{
			list
		},
		onShow() {
			this.tabbarColor.backgroundColor=this.$getMainColor().color
		},
		methods:{
			toSearch(){
				uni.navigateTo({
					url:"./search/search"
				})
			}
		}
		
	}
</script>

<style scoped>
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
		}
	/* #endif */
	
	.list{
		padding: 0 10rpx;
	}
</style>
