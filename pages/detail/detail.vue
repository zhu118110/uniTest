<template>
	<view class="container">
		<view class="status_bar" :style="{'background-color':tabbarColor}"></view>
		<view class="header" :style="{backgroundImage: 'url(' + coverImg + ')'}">saadad</view>
		<hxNavbar
			:leftText="name" 
			:color="tabbarColor"
			:background-color=[255,255,255]
			transparent="auto"
			fixed="true"
			:pageScroll.sync="scrollData"
		>
		</hxNavbar>
		<view class="movieArea">
			<view class="movieInfor" v-for="(item,i) in movieData">
				<view class="movieImg">
					<image :src="item.cover" mode=""></image>
				</view>
				<view class="movieJs">
					<view class="area">
						{{item.area || 暂无}}
					</view>
					<view class="tag">
						{{item.tag}}
					</view>
					<view class="actor">
						{{item.act}}
					</view>
				</view>
			</view>
			
		</view>
		<view class="inrtroduce">
			
			asadadadadasdas
		</view>
	</view>	
</template>

<script>
	import hxNavbar from "@/components/hx-navbar/hx-navbar.vue"
	import keys from "../../api/api.js"
	export default{
		data(){
			return{
				transparent:"auto",
				tabbarColor:"",
				name:"",
				coverImg:"",
				movieData:[],
				scrollData:{}
			}
		},
		components:{
			hxNavbar
		},
		onLoad(options) {
			this.name=options.name;
			this.coverImg=options.cover;
			this.getVideo()
			
		},
		onShow(){
			// 从本地存储获取主题色
			this.tabbarColor=this.$getMainColor().color;
			
		},
		//必须在页面加 onPageScroll(e){} ，才能滑动显示背景
		onPageScroll(e){
			this.scrollData = e;
		},
		methods:{
			getVideo(){
				let _this=this;
				uni.request({
					url:"/detailApi?key="+keys.detailKey,
					data:{
						name:this.name
					},
					success(res) {
						if(res.data.error_code !== 1){
							_this.movieData.push(res.data.result);
							console.log(_this.movieData)
						}
						
					}
				})
			}
		}
	}
</script>

<style scoped>
	view{
		box-sizing: border-box;
	}
	.header{
		position: absolute;
		background-size: 100% 150%;
		background-repeat: no-repeat;
		background-clip: border-box;
		
		width: 100%;
		height: 450rpx;
		top: 88rpx;
		left: 0;
	}
	.header::after{
		content: "";
		width: 100%;
		height: 100%;
		position: absolute;
		left: 0;
		top: 0;
		background: inherit;
		filter: blur(15px);
		/*为了模糊更明显，调高模糊度*/
		
	}
	.movieArea{
		position: relative;
		z-index: 100;
		height: 320rpx;
		width: 100%;
		padding: 10rpx 0;
		/* background-color: red; */
	}
	.movieInfor{
		margin:0 auto;
		height: 300rpx;
		width: 90%;
		display: flex;
		justify-content: flex-start;
		font-size: 30rpx;
	}
	.movieInfor .movieImg image{
		width: 200rpx;
		height: 100%;
	}
	.movieInfor .movieJs{
		margin-left: 20rpx;
		color: #FFF;
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
	}
	.movieInfor .movieJs .actor{
		display: -webkit-box;
		 -webkit-line-clamp: 3;
		overflow: hidden;
		-webkit-box-orient: vertical;
		text-overflow: ellipsis;
	}
	
	.inrtroduce{
		width: 100%;
		height: 1800rpx;
		background-color: yellow;
		
	}
</style>
