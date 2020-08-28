<template>
	<view class="container">
		<scroll-view class="scroll" :scroll-x="true">
			<view class="scrollList-item" v-for="(item,index) in scrollList" :style="{'backgroundColor':background[index]}" @click="chooseType(index)">
				{{item}}
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default{
		props:{
			scrollList:{
				type:Array,
				default:[]
			},
			background:{
				type:Array,
				default:["#00ff00","#0077AA","#ffaa00","#aa0000","#ff55ff","#aaaa00"]
			}
		},
		data(){
			return{
				backgroundList:[]
			}
		},
		methods:{
			chooseType(index){
				this.$u.toast(this.scrollList[index])
			}
		}
	}
</script>

<style scoped lang="less">
	.container{
		width: 100%;
		
	}
	.scroll{
		white-space: nowrap;
		width: 100%;
		box-sizing: border-box;
		
	}
	
	.scrollList-item{
		padding: 10px 20px;
		display: inline-block;
		color: #fff;
		margin: 0 10px;
		border-radius: 5px;
	}
	
</style>
