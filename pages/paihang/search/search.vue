<template>
	<view class="container">
		
			<!-- <view class="status_bar" :style="{'background-color':tabbarColor}"></view> -->
			<u-navbar :background="tabbarColor" back-icon-color="#ffffff" :is-fixed="false">
				<u-search
					placeholder="输入片名" 
					height="44" 
					:action-style="searchCol"
					:focus="true"
					v-model="searchMsg"
					@search="goSearch(searchMsg)"
					@custom="goSearch(searchMsg)"
				>
				</u-search>
			</u-navbar>
			<view class="content" v-if="seacrListShow">
				<view class="title">
					<text>热门搜索</text>
					<text>换一批</text>
				</view>
				
				<view class="hotList">
					<block v-for="(item,index) in hotSearch" :key="index">
						<view class="hotListItem" @click="goSearch(item)">
							<text style="margin-right: 10rpx;">{{ index+1 }}</text>
							<text>{{ item }}</text>
						</view>
					</block>
				</view>
				
				<view class="title">
					<text>历史搜索</text>
					<text @click="clearHistorySearch">清空</text>
				</view>
				<view class="historSearch">
					<block v-for="(item,index) in historySearch" :key="index">
						<view class="historSearchItem" @click="searchHistoryData(index)">
							{{ item }}
						</view>
					</block>
					
				</view>
			</view>
		<!-- 搜索结果 -->
		<view class="searchResult" v-else="!seacrListShow">
			<view class="loading">
				<u-loading mode="circle" :show="load"></u-loading>
			</view>
			<block  v-if="result.length>0">
				
				<view class="resultItem" v-for="(item,index) in result" :key="index" @click="toDetail(index)">
					<view class="resultItem-img">
						<image :src="item.cover" mode=""></image>
					</view>
					<view class="resultItem-infor">
						<view>{{ item.title}}</view>
						<view>导演:{{ item.dir}}</view>
						<view>地区:{{ item.area}}</view>
						<view>播放</view>
					</view>
				</view>
			</block>
			<!--  -->
			<view v-else-if="result.length==0 && load==false">
				暂无数据
			</view>
		</view>
		
		
	</view>
</template>

<script>
	import keys from "../../../api/api.js"
	
	
	export default{
		data(){
			return{
				searchMsg:"",  //搜索字段
				tabbarColor:{
					backgroundColor:"#2a91d5"
				},
				searchCol:{
					color:"#fff"
				},
				hotSearch:["越狱","复仇者联盟","神盾局特工","代号:47","监狱风云"],  //热门搜索
				historySearch:[],     //历史搜索
				result:[],
				seacrListShow:true,  //true时显示历史搜索,false时显示搜索结果
				load:false,
			}
		},
		
		onShow(){
			// 从本地获取主题色
			this.tabbarColor.backgroundColor=this.$getMainColor().color;
			// 从本地获取历史搜索的数据
			this.historySearch=uni.getStorageSync("historySearch")||[];
			
		},
		onBackPress(options) {
			
			if(!this.seacrListShow){
				this.seacrListShow=true;
				return true
			}
			
		},
		methods:{
			/*
				@params{String} name: 搜索的电影名称
			*/
			goSearch(name){
				if(name==""){
					return
				}
				let _this=this;
				_this.result=[];
				_this.searchMsg=name;
				_this.load=true;
				_this.seacrListShow=false
				
				this.$hhtpGet({
					url:"http://api.avatardata.cn/Movie/Query?key="+keys.detailKey,
					data:{
						name:name
					}
				}).then(result=>{
					if(result.data.result){
						_this.result.push(result.data.result)
					}
					// 历史搜索记录超过5条删除最后一条
					_this.load=false
					_this.historySearch.unshift(name);
					if(_this.historySearch.length>=5){
						_this.historySearch.pop()
					}
					_this.historySession()  //历史搜索记录存到本地
				})
				.catch(err=>{
					this.$u.toast("请求后台数据错误,稍后在数");
					_this.load=false
				})
			},
			// 清空历史搜索记录
			clearHistorySearch(){
				uni.removeStorageSync("historySearch")
				this.historySearch=[];
			},
			
			// 每次搜索完后在本地存储历史搜索记录
			historySession(){
				let _this=this;
				uni.setStorageSync("historySearch",_this.historySearch)
			},
			// 点击历史记录里的数据进行搜索
			searchHistoryData(index){
				this.searchMsg=this.historySearch[index];
				this.goSearch(this.searchMsg);
			},
			// 点击搜索出来的电影名称跳转到详情页,参数是电影名称和电影的封面图
			toDetail(index){
				let _this=this;
				uni.navigateTo({
					url:"../../detail/detail?name="+_this.result[index].title+"&cover="+_this.result[index].cover,
				})
			},
		},
		
	}
</script>

<style scoped>
	view{
		box-sizing: border-box;
	}
	.container{
		width: 100%;
		
	}
	.content{
		width: 100%;
		padding: 0 20rpx;
	}
	.title{
		margin-top: 20rpx;
		width: 100%;
		font-size: 16px;
		display: flex;
		justify-content: space-between;
	}
	.title text:last-child{
		font-size: 12px;
		color: #CCCCCC;
	}
	
	.hotList,.historSearch{
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		border-bottom: 1rpx solid #eee;
		padding: 20rpx 0;
	}
	.hotList .hotListItem{
		width: 40%;
		text-overflow: ellipsis;
		line-clamp: 1;
		white-space: nowrap;
		overflow: hidden;
		font-size: 12px;
		margin: 10rpx 0;
	}
	.hotList .hotListItem text:first-child{
		color: #ccc;
	}
	.hotList .hotListItem:first-child text:first-child{
		color: #fa070b;
	}
	.hotList .hotListItem:nth-child(2) text:first-child{
		color: #ff6675;
	}
	.hotList .hotListItem:nth-child(3) text:first-child{
		color: #ffa7ba;
	}
	
	.historSearch{
		border: none;
		justify-content: flex-start;
	}
	.historSearch .historSearchItem{
		background-color: #f0f0f0;
		padding: 10rpx;
		border-radius: 10rpx;
		color: #a1a1a1;
		margin: 10rpx 10rpx 10rpx 0;
		font-size: 12px;
	}
	
	
	/* 搜索结果页 */
	.searchResult{
		width: 100%;
		padding:20rpx;
	}
	.resultItem{
		display: flex;
		justify-content: space-between;
		padding: 10rpx 0;
		border-bottom: 1rpx solid #eee;
	}
	.resultItem .resultItem-img{
		flex: 1;
		height: 240rpx;
		border-radius: 10rpx;
		overflow: hidden;
	}
	.resultItem .resultItem-img image{
		width: 100%;
		height: 100%;
	}
	.resultItem .resultItem-infor{
		flex: 3;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: flex-start;
		margin-left: 20rpx;
		font-size: 14px;
		color: #343434;
	}
	.resultItem .resultItem-infor view:first-child{
		color: #f30000;
		font-size: 16px;
	}
	.resultItem .resultItem-infor view:last-child{
		background-color: #c80000;
		color: #fff;
		
		border-radius: 10rpx;
		padding: 10rpx 25rpx;
		line-height: 1.5;
	}
	.loading{
		display: flex;
		justify-content: center;
	}
</style>
