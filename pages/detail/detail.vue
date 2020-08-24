<template>
	<view class="container">
		
		<!-- <u-mask :show="showLoad" :mask-click-able="false" :custom-style="{background: 'rgba(255, 255, 255, 0.5)'}">
			
				<u-loading :show="showLoad" :color="tabbarColor"></u-loading>
			
		</u-mask> -->
		<u-navbar title="人人视频" :background="tabbarColor"></u-navbar>
		<u-sticky offset-top="140"  style="background-color: #fff;">
			<view>
				<!-- 视频播放区域 -->
				<view class="videoArea">
					<video 
						id="myVideo"
						style="width: 100%;"
						src="http://1252463788.vod2.myqcloud.com/95576ef5vodtransgzp1252463788/28742df34564972819219071568/v.f210.m3u8" 
						poster="/static/bd1.jpg"
						:title="name"
						controls
						object-fit="fill"
						:danmu-list="danmuList"
						:enable-danmu="false"
						:enable-play-gesture="true"
						:initial-time="20"
						@pause="pause"
						@play="play"
					>
						<cover-view v-if="paused" class="video-cover-view" @click="hideCover">
							<cover-view class="iconfont" :class="[paused?'icon-zanting':'icon-icon_bofang']"></cover-view>
						</cover-view>
						
					</video>
				</view>
				<view class="tag">
					<view class="intro" :class="{'tag-active':tagActive}" @click="choossetag(true)">
						简介
					</view>
					<view class="comment" :class="{'tag-active':!tagActive}" @click="choossetag(false)">
						评论
					</view>
				</view>
			</view>
		</u-sticky>
		
		<!-- 简介区域 -->
		<view v-show="tagActive">
			<!-- 影片详情 -->
			<view class="detail">
				<u-collapse style="width: 100%;">
					<u-collapse-item :title="moviewInfor.name" >
						<view>
							<view>导演:{{ moviewInfor.dir }}</view>
							<view>类型:{{ moviewInfor.tag }}</view>
							<view style="text-indent: 1cm;">{{ moviewInfor.desc }}</view>	
						</view>
						
					</u-collapse-item>
				</u-collapse>
			</view>
			
			<!-- 收藏点赞区域 -->
			<view class="collectArea">
				<view>
					<text class="iconfont icon-dianzan"></text>
					<text>25</text>
				</view>	
				<view >
					<text class="iconfont icon-caishixin-"></text>
					<text>10</text>
				</view>	
				<view>
					<text class="iconfont icon-shoucang2"></text>
					<text>收藏</text>
				</view>
				<view>
					<text class="iconfont icon-tubiao-"></text>
					<text>分享</text>
				</view>	
			</view>
			
			<u-gap height="20" bg-color="#f8f8f8"></u-gap>
			
			<!-- 猜你喜欢 -->
			<view class="like">
				<like :likeData="likeData"></like>
			</view>
		</view>
		
		<!-- 评论区域 -->
		<view v-show="!tagActive" class="commentTab" >
			<u-mask :show="showLoad" :mask-click-able="false" :custom-style="{background: 'rgba(255, 255, 255, 0.5)',height:'inherit'}">
				<view class="loading">
					<u-loading :show="showLoad" :color="tabbarColor"></u-loading>
				</view>
			</u-mask>
			<comment @showReplyPop="showReplyPop" :commentData="commentData"></comment>
			<!-- 回复详情弹出层 -->
			<u-popup 
				v-model="replyPopUp" 
				mode="bottom" 
				length="50%" 
				:mask="false"
				:mask-close-able="false"
				>
				<view class="replyPopUp">
					<replyPopUp :commentList="replyData" @hideProp="hideProp"></replyPopUp>
				</view>
			</u-popup>
			
			<!-- 底部评论输入框 -->
			<commentInput @search="getCommentMsg"></commentInput>
		</view>
		
		
	</view>	
</template>

<script>
	import like from "../myComponent/like.vue"  //猜你喜欢组件
	import comment from "../myComponent/comment.vue"   //评论列表组件
	import replyPopUp from "../myComponent/replyPopUp.vue"   //回复内容组件
	import commentInput from "../myComponent/comment-input.vue"  //输入评论框
	import keys from "../../api/api.js"
	export default{
		data(){
			return{
				id:"",
				tabbarColor:{
					backgroundColor:"#2a91d5"
				},
				paused:true,   //视频暂停是否显示的cover-view
				moviewInfor:{
					name:"默认标题",   //电影名称
					coverImg:"",   //封面图片
					desc:"默认简介默认简介默认简介默认简介默认简介默认简介默认简介",  //电影简介
					area:"未知",   //电影地区
					dir:"未知",  //导演 
					tag:"无",   //电影标签
				},
				showLoad:true,
				danmuList:[{  //弹幕列表
                    text: '这说的是什么',
                    color: '#ff0000',
                    time: 1
                },{
                    text: '前面的弹幕等等我',
                    color: '#ff00ff',
                    time: 3
                },
				{
				    text: '暂停看我啥颜色',
				    color: '#fff',
				    time: 6
				}],
				comment:"",   //评论内容
                tagActive:true,   
				replyPopUp:false,
				replyData:[],
				commentData:{commentMsg:"",name:"用户",commentTime:"2020-8-23"},
				
			}
		},
		onReady() {
			this.videoText=uni.createVideoContext("myVideo");
			
		},
		components:{
			like,
			comment,
			replyPopUp,
			commentInput
		},
		onLoad(options) {
			// this.id=options.id;
			this.moviewInfor.name=options.name||"暂无";
			this.moviewInfor.coverImg=options.cover;
			this.getVideo();
			
		},
		onShow(){
			// 从本地存储获取主题色
			this.tabbarColor.backgroundColor=this.$getMainColor().color||""
			
		},
		
		methods:{
			
			getVideo(){
				let _this=this;
				// 详情接口1:"http://api.avatardata.cn/Movie/Query?key="+keys.detailKey,
				let url="http://api.avatardata.cn/Movie/Query?key="+keys.detailKey;
				// 详情接口2:https://m.maoyan.com/ajax/detailmovie?movieId=xxx
				uni.request({
					url:url,
					data:{
						title:_this.name
					},
					success(res) {
						
						if(res.data.error_code !== 1){
							
							_this.moviewInfor.desc=res.data.result.desc;
							_this.moviewInfor.area=res.data.result.area;
							_this.moviewInfor.dir=res.data.result.dir;
							_this.moviewInfor.tag=res.data.result.tag;
							
						}
					},
					complete() {
						_this.showLoad=false
					}
				})
			},
			// 暂停时触发
			pause(){
				this.paused=!this.paused;
			},
			// 点击暂停时的按钮图片进行播放
			hideCover(){
				if(this.paused==true){
					this.videoText.play();
				}
			},
			// 播放时触发
			play(){
				this.paused=false;
				
			},
			// 点击简介、评论选项卡时更改选中的样式
			choossetag(flag){
				this.tagActive=flag
			},
			/*
				点击某条评论显示回复的详细内容
				@params{Object}data:子组件comment点击的评论的信息,包括回复的内容、时间、名称
			*/
			showReplyPop(data){
				this.replyData=[];
				if(data){
					
					if(!data.reply){
						// console.log("没有值")
						data.reply=[]
					}
					this.replyPopUp=true;
					this.replyData.push(data);
					
				}
				
			},
			
			// 回复页面点击右上角x关闭页面
			hideProp(hide){
				this.replyPopUp=hide;
				
			},
			
			// 从底部子组件输入框组件获取输入的评论赋值给_this.commentData.commentMsg，
			// 再将_this.commentData.commentMsg输入的评论数据传给评论组件
			getCommentMsg(data){
				let _this=this;
				if(data){
					_this.commentData.commentMsg=data;
					_this.showLoad=true;
					setTimeout(function(){
						_this.showLoad=false;
					},1000)
				}
				
				// console.log(data)
			}
		},
		
	}
</script>

<style scoped lang="less">
	view{
		font-size: 32upx;
		box-sizing: border-box;
	}
	.container{
		width: 100%;
	}
	.videoArea{
		width: 100%;
		font-size: 0;
		
	}
	.videoArea video{
		object-fit:fill;
	}
	.video-cover-view{
		width: 50px;
		height:50px;
		background-color: rgba(00,00,00,0.5);
		display: flex;
		justify-content: center;
		align-items: center;
		margin: 0 auto;
		transform: translate(0, 150%);
	}
	.video-cover-view cover-view{
		font-size: 30px;
		color: #fff;
	}
	/* 选项卡区域 */
	.tag{
		display: flex;
		justify-content: space-around;
		height: 44px;
		align-items: center;
		// box-shadow: 0 1px 5px #ccc;
		// position: fixed;
		background-color: #fff;
		z-index: ;
		width: 100%;
		padding: 0 10rpx;
		&>view{
			height: 100%;
			line-height: 44px;
			width: 40%;
			text-align: center;
		}
		.tag-active{
			color: red;
			border-bottom: 2px solid red;
		}
	}
	
	.detail{
		width: 100%;
		padding:0 10upx;
		
	}
	
	/* 收藏 */
	.collectArea{
		width: 100%;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		padding: 10rpx;
	}
	.collectArea view{
		width: 20%;
		text-align: center;
		align-self: baseline;
	}
	.collectArea .iconfont{
		font-size: 20px;
		
		display: block;
	}
	.collectArea text{
		font-size: 12px;
		color: #c1c1c1;
	}
	
	.like{
		padding: 0 10rpx;
		margin: 10rpx 0;
	}
	.commentTab,.replyPopUp{
		padding: 0 10rpx;
	}
	
	.loading{
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
