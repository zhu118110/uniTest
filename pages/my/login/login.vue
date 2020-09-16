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
					<u-button size="mini" slot="right" :class="{'diabledStyle':yzmBtn}" :disabled="yzmBtn" @click="sendCode" :custom-style="tabbarColor">
						<text>{{ tips }}</text>
					</u-button>
				</u-field>
				<view class="tips">
					<text style="color: #ccc;">温馨提示:未注册的手机号,登陆时会自动注册。如同意则勾选:</text>
					<u-checkbox v-model="agreen" :active-color="tabbarColor.backgroundColor"></u-checkbox>
					《用户服务协议》
				</view>
			</view>
			
			
			<view class="btn">
				<u-button @click="btn" class="custom-style" :class="{'diabledStyle':btnDisabled}" :disabled="btnDisabled" :custom-style="tabbarColor" :hair-line="false">登录</u-button>
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
	import {mapState,mapMutations} from "vuex"
	export default{
		name:"login",
		data(){
			return{
				
				tag:true,
				message:{
					phone:"",
					code:"",
				},
				agreen:false,  //是否同意协议
				errorMessage:"", //手机号错误提示
				flag:false, //验证手机号格式以及控制验证码框是否可点击输入值
				yzmBtn:true,   //发送验证码按钮是否可以点击
				second:10,   //验证码倒计时
				tips:"获取验证码",    
				codeNum:"",   //发送的验证码
				btnDisabled:true,   //登录按钮是否可以点击
				showLoad:false,   //是否显示遮罩层
			}
		},
		
		onShow() {
			// 从本地存储获取主题色
			// this.tabbarColor.backgroundColor=this.$getMainColor().color||""
		},
		
		methods:{
			...mapMutations(["login"]),
			// 手机号输入框失去焦点时触发
			phoneBlur(){
				// 验证手机号
				let reg =/^1[3456789]\d{9}$/;
				this.flag=reg.test(parseInt(this.message.phone));
				// 如果手机号格式不对,会出现提示信息,验证码按钮和输入框禁止使用
				if(!this.flag){
					this.yzmBtn=true;
					this.errorMessage="手机号格式错误"
				}else{
					this.yzmBtn=false;
					this.errorMessage=""
				}
			},
			// 点击发送验证码
			sendCode(){
				
					let _this=this;
					_this.yzmBtn=true;
					uni.showLoading({
						title: '正在获取验证码'
					})
					
					_this.codeNum=1000+Math.round(Math.random()*9000); 
					setTimeout(() => {
						uni.hideLoading();
						// 这里此提示会被this.start()方法中的提示覆盖
						_this.$u.toast('验证码已发送');
						_this.$u.toast('验证码是'+_this.codeNum);
					
						djs()
					}, 2000);
					// 倒计时 ,模拟验证码倒计时发送
					function djs(){
						let _second=_this.second;
						let timer=setInterval(()=>{
							_second--;
							_this.tips=_second+"秒后重新发送";
							if(_second==0){
								clearInterval(timer);
								_this.tips="重新发送";
								_this.yzmBtn=false;
							}
						},1000);
						
					}
					
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
					let roundName=Math.ceil( Math.random()*100000000000 );  //生成随机用户名
					let appUserInfo={
						head_img:"/static/logo1.jpg",
						name:"用户"+roundName
					};
					// 把随机用户名和头像通过vuex存到本地
					_this.login(appUserInfo);
					setTimeout(function(){
						_this.showLoad=false;
						_this.$u.toast('登录成功');
						_this.message.code=""
						uni.navigateBack({})
					},2000)
					
				}
			}
		},
		computed:{
			tabbarColor(){
				// console.log(this.$store.state.tabColor)
				return {backgroundColor:this.$store.state.tabColor,color:"#fff"};
			}
		},
		// watch:{
		// 	// 监听页面主题色是否改变
		// 	"tabbarColor.backgroundColor"(nVal,oVal){
		// 		this.$changeTabColor(nVal)
		// 		// console.log(nVal,oVal);
		// 	}
		// }
	}
</script>

<style scoped lang="less">
	@width:100%;
	.container{
		width: @width;
		height: 100vh;
		display: flex;
		justify-content:center;
	}
	.diabledStyle{
		
		background-color: rgb(255,255,255,0.4);
		opacity: 0.5;
	}
	// 登录区域
	.loginArea{
		width: 90%;
		margin-top: 200px;
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
