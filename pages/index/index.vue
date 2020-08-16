<template>
	<view class="container">
		<view class="status_bar" :style="{'background-color':tabbarColor}"></view>
		<view class="scrollView">
			<scroll-view scroll-x="true" class="scroll_x" :scroll-left="scroll_left">
				<view class="nav-item" 
					v-for="(item,index) in scrollTitle" 
					:key="index" @click="getItemIndex(index)" 
					:class="{'nav-item-active':scroll_index==index}">
					{{ item.title }}
				</view>
			</scroll-view>
		</view>
		<view class="swiper">
			
			<swiper @change="touch" :current="scroll_index" duration="300" :style="{'height':siwperHeight+'px'}">
				<swiper-item>
					<keep-alive>
						<jingxuan class="component" v-if="currentComponent == 'jingxuan'"></jingxuan>
					</keep-alive>
				</swiper-item>
				<swiper-item>
					<keep-alive>
						<juji class="component" v-if="currentComponent == 'juji'"></juji>
					</keep-alive>
				</swiper-item>
				<swiper-item >
					<keep-alive>
						<dianying class="component" v-if="currentComponent == 'dianying'"></dianying>
					</keep-alive>
				</swiper-item>
				<swiper-item >
					<keep-alive>
						<dongman class="component" v-if="currentComponent == 'dongman'"></dongman>
					</keep-alive>
				</swiper-item>
				<swiper-item >
					<keep-alive>
						<zongyi class="component" v-if="currentComponent == 'zongyi'"></zongyi>
					</keep-alive>
				</swiper-item>
				
			</swiper>
		</view>
	</view>
</template>

<script>
	import jingxuan from "./indexModule/jingxuan.vue"
	import juji from "./indexModule/juji.vue"
	import dianying from "./indexModule/dianying.vue"
	import dongman from "./indexModule/dongman.vue"
	import zongyi from "./indexModule/zongyi.vue"
	export default {
		data() {
			return {
				siwperHeight:700,
				currentComponent:"jingxuan",//默认当前页面加载的组件         
				tabbarColor:"#2a91d5",
				scrollTitle:[{
					id:"jx",
					title:"精选",
					componentName:"jingxuan"
				},{
					id:"jj",
					title:"剧集",
					componentName:"juji"
				},{
					id:"dy",
					title:"电影",
					componentName:"dianying"
				},{
					id:"dm",
					title:"动漫",
					componentName:"dongman"
				},{
					id:"zy",
					title:"综艺",
					componentName:"zongyi"
				}],
				scroll_left:0,   //滚动导航移动的距离
				scroll_index:0,  //控制选中导航的样式类
				
			}
		},
		components:{
			jingxuan,juji,dianying,dongman,zongyi
		},
		
		
		onShow(){
			
			// 从本地获取主题色
			this.tabbarColor=this.$getMainColor().color;
			
		},
		onReady() {
			// this.getPageHeight();
		},
		methods: {
			// 点击顶部滚动导航时执行
			getItemIndex(i){
				
				let cur = i; //记录点击的导航的下标
				let singleNavWidth = uni.getSystemInfoSync().windowWidth / 5; //每屏幕导航最多显示5个                
				this.scroll_left = (cur - 2) * singleNavWidth;   //scroll_left控制移动的距离
				this.currentComponent = this.scrollTitle[cur].componentName;  //更换显示的组件页面
				
				if (this.scroll_index == cur) {  //如果点击的是选中的导航 return false
					return false;
				}else{
					
					this.scroll_index = i;
				}
				// this.getPageHeight();
			},
			
			// 滑动swiper时触发
			touch(e){
				// 滑动后得到的页面的下标
				let {current} = e.detail
				
				this.getItemIndex(current);
				
			},
			
			// 滑动swiper-item切换页面时动态设置swiper高度,否则每个页面高度都相同
			getPageHeight(){
				
				let _this = this;
				_this.siwperHeight = 0;
				const query = uni.createSelectorQuery().in(this);
				query.selectAll(".component").boundingClientRect(d=>{
					
					_this.siwperHeight = Math.ceil(d[0].height);
					
				}).exec();
			}
		},
		watch:{
			
		}
	}
</script>

<style scoped>
	.container{
		width: 100%;
		font-size: 28rpx;
		box-sizing: border-box;
		
	}
	.scrollView{
		width: 100%;
	}
	.scroll_x{
		white-space: nowrap;
		width: 100%;
		box-sizing: border-box;
		border-bottom: 1rpx solid #f1f1f1;
	}
	.nav-item{
		width: 20%;  
		height: 80rpx;
		line-height: 80rpx;
		text-align: center;
		display: inline-block;
	}
	.nav-item.nav-item-active{
		color: red;
		border-bottom: 2rpx solid red;
	}
	
	/* h5中隐藏导航滚动条，但依旧具备可以滚动的功能 */
	/* #ifdef H5 */
	.uni-scroll-view::-webkit-scrollbar {
		display: none
	}
	/* #endif */
</style>
