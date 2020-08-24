<!-- 回复列表的模板 -->

<template>
	<view class="container">
		<view class="head">
			<text>详情</text>
			<u-icon name="close" @click="hideProp"></u-icon>
		</view>
		<!-- 评论区域 -->
		<view class="comment-list">
			<view class="comment-item" v-for="(item,index) in commentList" :key="index">
				<!-- 左边用户头像 -->
				<view class="comment-item-img">
					<image src="../../static/logo1.jpg" mode=""></image>
				</view>
				<!-- 右边用户名称日期、评论内容 -->
				<view class="comment-item-infor">
					<view class="nameAndTime">
						<view class="name">{{ item.name }}</view>
						<view class="time">{{ item.commentTime }}</view>
					</view>
					<view>
						{{ item.commentMsg }}
					</view>
				</view>
			</view>
		</view>
		<view class="cut">
			<view v-if="replyList.length>0">
				全部{{replyList.length}}条回复
				<u-icon name="arrow-down-fill"></u-icon>
			</view>
			<view v-else>
				暂无回复
			</view>
			
		</view>
		<!-- 回复区域 -->
		<view class="comment-list reply-list" v-if="replyList">
			<view class="comment-item" v-for="(item,index) in replyList" :key="index">
				<!-- 左边用户头像 -->
				<view class="comment-item-img">
					<image src="../../static/logo1.jpg" mode=""></image>
				</view>
				<!-- 右边用户名称日期、评论内容 -->
				<view class="comment-item-infor">
					<view class="nameAndTime">
						<view class="name">{{ item.replyUser }}</view>
						<view class="time">{{ item.replyTime }}</view>
					</view>
					<view>
						{{ item.replyMsg }}
					</view>
				</view>
			</view>
		</view>
		
		<replyInput :placeholder="'回复 '+commentList[0].name" @search="getReplyMsg"></replyInput>
	</view>
</template>

<script>
	import replyInput from "./comment-input.vue"
	export default{
		props:{
			"commentList":{
				type:Array,
				default:[]
			}
		},
		data(){
			return{
				replyData:[],
				myreplyData:{
					replyUser:"自定义用户",
					replyTime:"2020-8-24",
					replyMsg:""
				},
				
			}
		},
		components:{
			replyInput,
		},
		created(){
			
		},
		methods:{
			/*
				点击右上角x关闭此组件,并且返回父组件评论详情页
			*/
			hideProp(){
				this.$emit("hideProp",false)
			},
			/* 
				获取子组件回复框中回复的数据
				@params{String} data:子组件回复框中输入的内容
			*/
			getReplyMsg(data){
				if(data){
					this.myreplyData.replyMsg=data;
					
					this.commentList[0].reply.push(this.myreplyData);
					
				}
			}
		},
		computed:{
			// replyList(){
			// 	if(this.commentList.length>0){
			// 		return this.commentList[0].reply
			// 	}
				
			// }
			// 监听父组件传递过来的回复的数据；如果直接在watch中监听会有问题,所有用计算属性在中间控制一下
			replyList:{
				// 如果使用上面的计算属性会报错,因为replyList在watch中被改变了
				get:function(){
					if(this.commentList.length>0){
						return this.commentList[0].reply
					}
				},
				set:function(nVal){
					this.commentList[0].reply=nVal;
				}
			}
		},
		watch:{
			"replyList":{
				handler:function(nVal,oVal){
					
					this.replyList=nVal;
					
				},
				
				deep:true
			}
		}
	}
</script>

<style scoped lang="less">
	@width:100%;
	// less变量混入
	.border(){
		border-bottom: 1rpx solid #f1f1f1;
	}
	.container{
		margin:60rpx 0 80rpx;
		// padding: 30rpx 0 10px;
		width: @width; 
	}
	.head{
		top: 0;
		left: 0;
		font-weight: 600;
		display: flex;
		position: fixed;
		justify-content: space-between;
		width:100%;
		padding: 20rpx 10rpx;
		background-color: #fff;
	}
	.comment-list{
		// margin-top: 20rpx;
	}
	.comment-item{
		display: flex;
		justify-content: flex-start;
		width: @width;
		padding: 20rpx 0;
		width: 100%;
		
		.comment-item-img{
		
			width: 80rpx;
			height: 80rpx;
			border-radius: 50%;
			overflow: hidden;
			font-size: 0;
			& image{
				width: 100%;
				height: 100%;
			}
		}
		.comment-item-infor{
			width: 100%;
			margin-left: 20rpx;
			.nameAndTime{
				height: 80rpx;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				.name{
					font-size: 16px;
				}
				.time{
					font-size: 12px;
					color: #ccc;
				}
			}
		}
	}
	.cut{
		width: 100%;
		text-align: center;
		color: #ccc;
		font-size: 12px;
		
	}
</style>
