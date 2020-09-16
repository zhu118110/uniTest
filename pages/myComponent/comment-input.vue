<!-- 底部固定的评论的输入框 -->
<template>
	<view class="container">
		<view class="footer" :style="{'bottom':bottom+'px'}">
			<view class="inp">
				<u-search 
					search-icon="order"
					:placeholder="placeholder" 
					v-model="comment"
					action-text="发表"
					@search="search"
					@custom="search"
					:adjustPosition="false"
					
					>
				</u-search>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		name:"commentInput",
		props:{
			placeholder:{
				type:String,
				default:"输入评论"
			},
			bottom:{
				type:Number,
				default:0
			}
		},
		data(){
			return{
				comment:"",
				
			}
		},
		
		methods:{
			// 点击发表或者回车将内容传递给父组件
			search(value){
				// 判断是否输入了值和输入的值是否全是空格
				if(value==""||value.replace(/\s/g,"").length<=0){
					this.comment="";
					return;
				}
				
				let noeData = new Date();
				let Y = noeData.getFullYear() + '-';
				let M = (noeData.getMonth()+1 < 10 ? '0'+(noeData.getMonth()+1) : noeData.getMonth()+1) + '-';
				let D = noeData.getDate()< 10 ? "0" + noeData.getDate() : noeData.getDate() + ' ';
				
				this.$emit("search",value,Y+M+D);
				this.comment="";
				
			},
		}
	}
</script>

<style scoped lang="less">
	@width:100%;
	.footer{
		width: @width;
		position: fixed;
		
		height: 44px;
		border-top: 1rpx solid #f8f8f8;
		background-color: #fff;
	}
	.footer .inp{
		line-height: 44px;
		padding: 0 10rpx;
	}
</style>
