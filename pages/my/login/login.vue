<template>
	<!-- 登录页面 -->
	<view class="container">
		<u-navbar :background="tabbarColor" back-text="返回" title="登录"></u-navbar>
		<view class="loginArea">
			<view class="tab">
				
				<image src="../../../static/logo1.jpg" mode=""></image>
				<!-- <view class="tabItem" :class="{tagActive:tag}" @click="tag = true">短信登录</view> -->
				<!-- <view class="tabItem" :class="{tagActive:!tag}" @click="tag = false">密码登录</view> -->
			</view>
			<!-- 短信验证码登录 -->
			<view v-if="tag" class="messageLogin">	
				<u-field
					required
					v-model="message.phone"
					label="手机号"
					placeholder="请填写手机号"
					:clearable="false"
					:error-message="errorMessage"
					@input="phoneBlur"
				></u-field>
				<u-field
					required
					:disabled="!flag"
					:clearable="false"
					v-model="message.code"
					label="验证码"
					placeholder="请填写验证码"
					@input="phoneCode"
				>
					<u-button size="mini" slot="right" :disabled="!flag" @click="sendCode" :custom-style="tabbarColor"><text>{{ tips }}</text></u-button>
					<u-verification-code 
						:seconds="second" 
						@change="codeChange"
						@end="end"
						ref="uCode" 
						></u-verification-code>
				</u-field>
				<view class="tips">
					<text style="color: #ccc;">温馨提示:未注册的手机号,登陆时会自动注册。如同意则勾选:</text>
					<u-checkbox v-model="agreen" :active-color="tabbarColor.backgroundColor">《用户服务协议》</u-checkbox>
				</view>
			</view>
			
			
			<view class="btn">
				<u-button @click="btn" class="custom-style" :disabled="btnDisabled" :custom-style="tabbarColor" :hair-line="false">提交</u-button>
			</view>
		</view>
		
		<!-- 遮罩层,点击登录时显示 -->
		<u-mask :show="showLoad" :mask-click-able="false" :custom-style="{background: 'rgba(255, 255, 255, 0.5)'}">
			<view class="loading">
				<u-loading :show="showLoad" size="50"></u-loading>
			</view>
		</u-mask>
	</view>
</template>

<script>
	export default{
		name:"login",
		data(){
			return{
				tabbarColor:{
					backgroundColor:"#2a91d5",
					color:"#fff"
				},
				tag:true,
				message:{
					phone:"",
					code:"",
				},
				agreen:false,  //是否同意协议
				errorMessage:"", //手机号错误提示
				flag:false, //验证手机号格式以及控制验证码框是否可点击输入值
				second:10,   //验证码倒计时
				tips:"",    
				codeNum:"",   //发送的验证码
				btnDisabled:true,   //登录按钮是否可以点击
				showLoad:false,   //是否显示遮罩层
			}
		},
		
		onShow() {
			// 从本地存储获取主题色
			this.tabbarColor.backgroundColor=this.$getMainColor().color||""
		},
		
		methods:{
			// 手机号输入框失去焦点时触发
			phoneBlur(){
				// 验证手机号
				let reg =/^1[3456789]\d{9}$/;
				this.flag=reg.test(parseInt(this.message.phone));
				// 如果手机号格式不对,会出现提示信息,验证码按钮和输入框禁止使用
				if(!this.flag){
					this.errorMessage="手机号格式错误"
				}else{
					
					this.errorMessage=""
				}
			},
			// 点击发送验证码
			sendCode(){
				
				if(this.$refs.uCode.canGetCode){
					uni.showLoading({
						title: '正在获取验证码'
					})
					setTimeout(() => {
						uni.hideLoading();
						// 这里此提示会被this.start()方法中的提示覆盖
						this.$u.toast('验证码已发送');
						// 通知验证码组件内部开始倒计时
						this.$refs.uCode.start();
						this.codeNum=1000+Math.round(Math.random()*9000); 
						this.$u.toast('验证码是'+this.codeNum);
						
					}, 2000);
				}
			},
			// 验证码倒计时过程中执行
			codeChange(text){
				this.tips=text
			},
			// 验证码倒计时结束后清零
			end(){
				this.codeNum=""
			},
			// 输入验证码时触发
			phoneCode(){
				// 如果手机号格式正确,并且验证码输入框也输了内容, 提交按钮可以点击
				if(this.message.code!==""&&this.flag==true){
					
					this.btnDisabled=false;
				}else{
					this.btnDisabled=true
				}
			},
			// 点击登录按钮
			btn(){
				// 没有勾选协议时触发
				if(!this.agreen){
					this.$u.toast('请勾选协议');
					// 验证码不正确时触发
				}else if(this.codeNum!=this.message.code){
					this.$u.toast('验证码错误');
				}else{
					this.showLoad=true;
					let _this=this;
					
					setTimeout(function(){
						_this.showLoad=false;
						_this.$u.toast('登录成功');
					},2000)
				}
			}
		}
	}
</script>

<style scoped lang="less">
	@width:100%;
	.container{
		width: @width;
		height: 100vh;
		display: flex;
		justify-content:center;
		align-items: center;
		padding-top: 54px;
	}
	// 登录区域
	.loginArea{
		width: 90%;
		
		.tab{
			
			text-align: center;
			border-radius: 50%;
			width: 130rpx;
			height: 130rpx;
			margin: 0 auto;
			font-size: 0;
			overflow: hidden;
			& image{
				width: 100%;
				height: 100%;
			}
			&>view.tabActive{
				font-weight: 600;
				color: #fff;
			}
		}
		
		.messageLogin{
			width: 100%;
			margin-top: 20rpx;
			.custom-style button{
				color: #fff;
			}
			.tips{
				margin-top: 20rpx;
			}
		}
		.btn{
			width: 100%;
			text-align: center;
			margin-top: 50rpx;
		}
	}
	
	.loading{
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
