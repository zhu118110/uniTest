<template>
	<view class="container">
		<view class="status_bar" :style="{'background-color':tabCol}"></view>
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
				tabbarColor:"#2a91d5",
			}
		},
		components:{
			list
		},
		onShow() {
			this.tabbarColor=this.$getMainColor().color
		},
		computed:{
			tabCol(){
				return this.tabbarColor
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
	.list{
		padding: 0 10rpx;
	}
</style>
