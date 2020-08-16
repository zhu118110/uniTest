<template>
	<!-- 电影列表展示 -->
	<view class="container">
		<view class="list-box">
			<view class="list-item" v-for="(item,index) in dataList" @click="toDetail(index)">
				<view >
					<image :src="item.poster"></image>
				</view>
				<view class="title">
					{{item.title}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		props:{
			movieData:{
				type:Array
			}
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
				}]
			}
		},
		methods:{
			// 携带点击的电影名称跳转到详情页
			toDetail(index){
				let _this=this;
				uni.navigateTo({
					url:"../detail/detail?name="+_this.dataList[index].title+"&cover="+_this.dataList[index].poster,
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
		height: 270rpx;
		display: block;
	}
	.list-box .list-item .title{
		margin-top: 10rpx;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		line-clamp: 1;
	}
</style>
