<!-- 评论列表的模板 -->

<template>
	<view class="container">
		<view class="">热门评论(10)</view>
		<!-- 评论列表 -->
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
						<view class="time">2020-8-22</view>
					</view>
					<u-read-more show-height="180" :toggle="true">
						<text>
							<!-- 评论评论评论评论评论评论评论评论评论评论
							评论评论评论评论评论评论
							评论评论评论评论评论评论评论评论评论
							评论评论评论评论评论评论评论 -->
							{{ item.commentMsg }}
						</text>
					</u-read-more>
					<!-- <view class="replyArea" v-if="item.reply.length>0">
						<view class="replyItem" v-for="(replyItem,replyIndex) in item.reply" v-if="replyIndex<3"  @click="lookMore(index)">
							<text>{{replyItem.replyUser}}</text> : {{ replyItem.replyMsg }}
						</view>
						<u-section class="uSection"
							v-if="item.reply.length>3"
							sub-title="更多" 
							:show-line="false" 
							color="#000" 
							:bold="false"
							@click="lookMore(index)"
							>
						</u-section>
					</view> -->
					<slot name="foot" :data="item.reply"></slot>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				commentList:[{
					name:"用户1",
					commentMsg:"这视频里的小姐姐页太好看了",
					reply:[{
						replyUser:"路人甲",
						replyMsg:"你说的这也太对了你说的这也太对了你说的这也太对了你说的这也太对了你说的这也太对了你说的这也太对了你说的这也太对了你说的这也太对了你说的这也太对了"
					},{
						replyUser:"路人乙",
						replyMsg:"你顶楼上的"
					},{
						replyUser:"路人丙",
						replyMsg:"我也赞成"
					},{
						replyUser:"路人卯",
						replyMsg:"还行吧"
					}]
				}]
			}
		},
		methods:{
			// 点击回复内容进入回复详情页
			/*
				@params{Number} index:点击的评论数据的下标
			*/
			lookMore(index){
				this.$emit("showReplyPop",this.commentList[index])
			},
			
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
		padding: 10rpx 0;
		width: @width; 
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
		.border;
		.comment-item-img{
			min-width: 100rpx;
			width: 100rpx;
			height: 100rpx;
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
				height: 100rpx;
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
			.replyArea{
				width: 100%;
				background-color: #f1f1f1;
				border-radius: 10rpx;
				padding: 10rpx 0;
				box-sizing: border-box;
				.replyItem{
					
					font-size: 14px;
					padding:5rpx 10rpx;
					text-overflow: ellipsis;
					overflow: hidden;
					display: -webkit-box;
					-webkit-line-clamp: 2; //行数
					-webkit-box-orient: vertical;
					& text:first-child{
						color: #b1b1b1;
					}
				}
				.uSection{
					
				}
				
			}
		}
	}
</style>
