<template>
	<view class="container">
		<view class="list">
			<block v-for="(item,index) in likeData" :key="index">
				<view class="list-item" @click="toDetail">
					<view class="list-item-left">
						<image src="../../static/lb1.jpg" mode=""></image>
					</view>
					<view class="list-item-center">
						<view class="name">{{ item.title }}</view>
						<view>{{ item.type }}</view>
						<view>{{ item.actor }}</view>
					</view>
					<!-- <view class="list-item-right" @click.stop="moreDot(index)">
						<view ref="more">
							<u-icon name="more-dot-fill"></u-icon>
							<u-mask :show="showMask" :custom-style="{background: 'rgba(0, 0, 0, 0.1)'}"></u-mask>
							<view class="sjx" show="showMask"></view>
							<view class="more" v-show="showMask">收藏</view>
						</view>
						
					</view> -->
				</view>
			</block>
		</view>
		
	</view>
</template>

<script>
	export default{
		props:{
			// "likeData":{
			// 	type:Array,
			// 	default:[]
			// }
		},
		data(){
			return{
				likeData:[{
					title:"默认名称",
					type:"动作",
					actor:"默认/默认"
				},{
					title:"默认名称",
					type:"动作",
					actor:"默认/默认"
				},{
					title:"默认名称",
					type:"动作",
					actor:"默认/默认"
				},{
					title:"默认名称",
					type:"动作",
					actor:"默认/默认"
				},{
					title:"默认名称",
					type:"动作",
					actor:"默认/默认"
				},{
					title:"默认名称",
					type:"动作",
					actor:"默认/默认"
				}],
				showMask:false
			}
		},
		methods:{
			toDetail(){
				console.log(111)
			},
			moreDot(index){
				console.log(index);
				// this.showMask=!this.showMask;
				console.log(this)
			}
		}
	}
</script>

<style lang="less" scoped>
	@width:100%;
	
	.container{
		background-color: #fff;
		width:@width;
	}
	.list{
		width: @width;
		.list-item{
			display: flex;
			justify-content: flex-start;
			border-bottom: 1px solid #eee;
			padding: 10px 0;
			
			.list-item-left{
				font-size: 0;
				border-radius: 10rpx;
				overflow: hidden;
				flex: 1;
				& image{
					width: 100%;
					height: 200rpx;
				}
			}
			.list-item-center{
				flex: 3;
				display: flex;
				flex-direction: column;
				justify-content: space-around;
				margin-left: 20rpx;
				
				& .name{
					line-clamp: 1;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space:nowrap;
				}
			}
			.list-item-right{
				display: flex;
				flex-direction: column;
				justify-content: flex-end;
				align-items: baseline;
				position: relative;
				.sjx{
					position: absolute;
					width:0;
					height:0;
					right: 10px;
					top: 100px;
					border-right:12px solid transparent;
					border-left:12px solid transparent;
					border-bottom:12px solid transparent;
				}
				.more{
					
					position: absolute;
					top: 100px;
					right: 10px;
					width: 70px;
					text-align: center;
					padding: 10rpx 20rpx;
					background-color: #fff;
					z-index: 10071;
					font-size: 14px;
				}
			}
		}
	}
	
</style>
