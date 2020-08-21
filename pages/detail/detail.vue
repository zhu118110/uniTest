<template>
	<view class="container">
		
		<u-mask :show="showLoad" :mask-click-able="false" :custom-style="{background: 'rgba(255, 255, 255, 0.5)'}">
			
				<u-loading :show="showLoad" :color="tabbarColor"></u-loading>
			
		</u-mask>
		<u-navbar :is-fixed="false" title="人人视频" :background="tabbarColor"></u-navbar>
		
		<!-- 视频播放区域 -->
		<view class="videoArea">
			<video 
				id="myVideo"
				style="width: 100%;"
				src="http://1252463788.vod2.myqcloud.com/95576ef5vodtransgzp1252463788/28742df34564972819219071568/v.f210.m3u8" 
				poster="/static/bd1.jpg"
				:title="name"
				controls
				
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
		
		<!-- 影片详情 -->
		<view class="detail">
			<u-collapse style="width: 100%;">
				<u-collapse-item :title="name" >
					<view>
						<view>导演:{{ dir }}</view>
						<view>类型:{{ tag }}</view>
						<view style="text-indent: 1cm;">{{ desc }}</view>	
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
		
		<!-- 底部评论 -->
		<view class="footer">
			<view class="inp">
				<u-search 
					search-icon="order"
					placeholder="评论" 
					v-model="comment"
					action-text="发表"
					:action-style="{color:tabbarColor.backgroundColor}"
					>
				</u-search>
			</view>
		</view>
	</view>	
</template>

<script>
	import yyVideoPlayer from '@/components/yy-video-player/yy-video-player.nvue'
	import keys from "../../api/api.js"
	export default{
		data(){
			return{
				id:"",
				tabbarColor:{
					backgroundColor:"#2a91d5"
				},
				paused:true,   //视频暂停是否显示的cover-view
				name:"默认标题",   //电影名称
				coverImg:"",   //封面图片
				desc:"默认简介默认简介默认简介默认简介默认简介默认简介默认简介",  //电影简介
				area:"未知",   //电影地区
				dir:"未知",  //导演 
				tag:"无",   //电影标签
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
				comment:"",   //评论
                
			}
		},
		onReady() {
			this.videoText=uni.createVideoContext("myVideo");
			
		},
		components:{
			"videoPlayer":yyVideoPlayer,
		},
		onLoad(options) {
			// this.id=options.id;
			this.name=options.name;
			this.coverImg=options.cover;
			this.getVideo();
			
		},
		onShow(){
			// 从本地存储获取主题色
			this.tabbarColor.backgroundColor=this.$getMainColor().color
			
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
							
							_this.desc=res.data.result.desc;
							_this.area=res.data.result.area;
							_this.dir=res.data.result.dir;
							_this.tag=res.data.result.tag;
							
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
			// 点击暂停按钮图片进行播放
			hideCover(){
				if(this.paused==true){
					this.videoText.play();
				}
			},
			// 播放时触发
			play(){
				this.paused=false;
				
			},
			
		}
	}
</script>

<style scoped>
	view{
		font-size: 32upx;
		box-sizing: border-box;
	}
	.container{
		width: 100%;
		padding-bottom: 44px;
	}
	.videoArea{
		width: 100%;
	}
	.detail{
		width: 100%;
		padding:0 10upx;
		display: flex;
		justify-content: space-between;
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
	
	.footer{
		width: 100%;
		position: fixed;
		bottom: 0rpx;
		height: 44px;
		border-top: 1rpx solid #f8f8f8;
	}
	.footer .inp{
		line-height: 44px;
		padding: 0 10rpx;
	}
</style>
