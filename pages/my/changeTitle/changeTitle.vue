<!-- 更换主题页面 -->
<template>
	<view class="container">
		<view class="colorBox">
			<block v-for="(item,i) in colorList">
				<view class="colorList" @click="changeColor(i)">
					<view :style="{'background-color':item.color}"></view>
					<view>{{ item.name }}</view>	
				</view>
			</block>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				colorList: [{
					color: "#2a91d5",
					name: "经典蓝"
				}, {
					color: "#d51320",
					name: "活力红"
				}, {
					color: "#000",
					name: "炫酷黑"
				}, {
					color: "#ff6b01",
					name: "新鲜橙"
				}, {
					color: "#00c600",
					name: "健康绿"
				}, {
					color: "#aaaaff",
					name: "高贵紫"
				}, {
					color: "#ff007f",
					name: "可爱粉"
				}]
			}
		},
		onShow() {
			this.$getMainColor();
		},
		methods:{
			/*
				点击更换主题颜色
				@params{Number}:index 点击的colorList数据的下标
				
				触发 我的 页面事件,传递的参数是点击的颜色
			*/
			changeColor(index){
				
				
				// 同步存储更新后的主题色
				uni.setStorageSync("styleColor",{index:index,color:this.colorList[index].color});
				this.$getMainColor();
			},
			
		},
		watch:{
			
		}

	}
</script>

<style>
	view{
		box-sizing: border-box;
	}
	.colorBox {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
	}
	.colorBox .colorList{
		width: 50%;
		text-align: center;
		margin: 20rpx 0;
	}
	.colorBox .colorList>view{
		font-size: 32rpx;
	}
	.colorBox .colorList>view:first-child{
		width: 60%;
		height: 70rpx;
		display: inline-block;
	}
</style>
