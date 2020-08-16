<template>
	<view class="container">
		
		<u-mask :show="showLoad" :mask-click-able="false" :custom-style="{background: 'rgba(255, 255, 255, 0.5)'}">
			<view>
				<u-loading :show="showLoad" :color="tabbarColor"></u-loading>
			</view>
		</u-mask>
		<view class="status_bar" :style="{'background-color':tabbarColor}"></view>
		<view class="videoArea">
			<videoPlayer 
				url="http://1252463788.vod2.myqcloud.com/95576ef5vodtransgzp1252463788/28742df34564972819219071568/v.f210.m3u8" 
				poster="/static/bd1.jpg" 
				muted 
				:show-back-btn="true" 
				:auto-play="false"
				@play="play"
				style="width: 100%;">
			</videoPlayer>
		</view>
		<view class="detail">
			<u-collapse >
				<view>
					{{ name }} / {{ area }}
				</view>
				<u-collapse-item title="简介" >
					<view>导演:{{ dir }}</view>
					<view>类型:{{ tag }}</view>
					
					{{ desc }}
				</u-collapse-item>
			</u-collapse>
		</view>
		
		<view>
			123123123123
		</view>
	</view>	
</template>

<script>
	import yyVideoPlayer from '@/components/yy-video-player/yy-video-player.nvue'
	import keys from "../../api/api.js"
	export default{
		data(){
			return{
				tabbarColor:"",
				name:"",
				coverImg:"",
				danmuList:[],
				desc:"暂无简介",
				area:"未知", 
				dir:"未知",
				tag:"无",
				showLoad:true
			}
		},
		components:{
			"videoPlayer":yyVideoPlayer,
		},
		onLoad(options) {
			this.name=options.name;
			this.coverImg=options.cover;
			this.getVideo();
			console.log("onLoad")
		},
		onShow(){
			// 从本地存储获取主题色
			this.tabbarColor=this.$getMainColor().color;
			console.log("onShow")
		},
		
		methods:{
			getVideo(){
				let _this=this;
				
				uni.request({
					url:"http://api.avatardata.cn/Movie/Query?key="+keys.detailKey,
					// url:"/detailApi?key="+keys.detailKey,
					data:{
						name:this.name
					},
					success(res) {
						if(res.data.error_code !== 1){
							_this.showLoad=false
							console.log(res.data.result)
							_this.desc=res.data.result.desc;
							_this.area=res.data.result.area;
							_this.dir=res.data.result.dir;
							_this.tag=res.data.result.tag;
							// _this.movieData.push(res.data.result);
							// console.log(_this.movieData)
						}
						
					}
				})
			},
			play(){
				console.log(4111)
			}
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
	}
	.videoArea{
		width: 100%;
	}
	.detail{
		width: 100%;
		padding: 10upx;
		display: flex;
		justify-content: space-between;
	}
</style>
