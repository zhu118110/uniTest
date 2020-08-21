<template>
	<!-- 电影列表展示 -->
	<view class="container">
		<view class="list-box">
			<view class="list-item" v-for="(item,index) in movieData" @click="toDetail(index)">
				<view >
					<u-image src="/static/bd1.jpg" height='270rpx' width="100%">
						<u-loading slot="loading"></u-loading>
						<view slot="error" style="font-size: 24rpx;">加载失败</view>
					</u-image>
				</view>
				<view class="title">
					{{item.nm}}
				</view>
				<view class="rate">
					<uniRate :max="5" readonly :allowHalf="true" :value="item.sc/2" size="14"></uniRate>
					<text style="color: #ccc;font-size: 12px;">
						{{item.sc}}
					</text>
				</view>
					
			</view>
		</view>
	</view>
</template>

<script>
	import uniRate from "@/components/uni-rate/uni-rate.vue"
	export default{
		props:{
			movieData:{
				type:Array
			}
		},
		components:{
			uniRate
		},
		data(){
			
			return {
				
				dataList:[{
					type:"电影",
					title:"港囧",
					grade:8.5,//评分,
					poster:"/static/bd1.jpg"
				},{
					type:"电影",
					title:"复仇者联盟二",
					grade:8.0,//评分
					poster:"/static/bd1.jpg"
				},{
					type:"电影",
					title:"复仇者联盟一",
					grade:8.5,//评分,
					poster:"/static/bd1.jpg"
				},{
					type:"电影",
					title:"心花路放",
					grade:8.0,//评分
					poster:"/static/bd1.jpg"
				},{
					type:"电影",
					title:"上海滩",
					grade:8.0,//评分
					poster:"/static/bd1.jpg"
				}]
			}
		},
		
		methods:{
			// 携带点击的电影名称跳转到详情页
			toDetail(index){
				let _this=this;
				uni.navigateTo({
					url:"../detail/detail?name="+_this.movieData[index].nm+"&cover="+_this.movieData[index].img,
					// url:"../detail/detail?id="+_this.movieData[index].id
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
	.list-box{
		width: 100%;
		
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		box-sizing: border-box;
	}
	/* 解决 space-between 换行后子元素排版问题*/
	.list-box:after{
		width: 32%;
		content: "";
	}
	.list-item{
		margin-top: 20rpx;
		width: 32%;
		height:auto;
		text-align: center;
		font-size: 28rpx;
		border-radius: 10rpx;
		overflow: hidden;
	}
	
	.list-box .list-item image{
		width: 100%;
		
		display: block;
	}
	.list-box .list-item .title{
		margin-top: 10rpx;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		line-clamp: 1;
	}
	.list-box .list-item .rate{
		display: flex;
		justify-content: space-between;
		width: 100%;
		padding: 0 10rpx;
	}
</style>
