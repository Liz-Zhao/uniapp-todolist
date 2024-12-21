<template>
	<view class="container">
		<text class="title">代办</text>
		
		<view class="search-box">
			<img :src="searchIcon" alt="" class="img" />
			<input type="text" placeholder="搜索" class="search-input" v-model="searchText" @input="handleSearch" />
		</view>
		
		<view class="add-box">
			<input v-model="text" placeholder="干点啥..." class="add-input" />
			<view @click="addTodo" class="add-btn">新增</view>
		</view>
		
		<text>共计{{allTodos}}条，{{completedTodosLength}}条已办</text>
		<scroll-view scroll-y="true" class="scroll-Y">
			<view class="todolist">
				<Todo 
				v-for="(todo, index) in filteredTodos" 
				:key="todo.id"
				:todo="todo"
				@toggle="toggleTodo"
				@delete="deleteTodo"
				@edit="editTodo"
				/>
			</view>
		</scroll-view>
		
		
	</view>
	

</template>

<script>
	import {mapState,mapActions,mapGetters } from 'vuex';
	import searchIcon from '../../static/search.svg'

	export default {
		data() {
			return {
				text: '',
				searchIcon,
				searchText:''
			}
		},
		onLoad() {

		},
		computed: {
			...mapState(['todos']),
			...mapGetters(['allTodos','completedTodosLength','filteredTodos'])
		},
		methods: {
			...mapActions(['addTodoAction', 'deleteTodoAction', 'toggleTodoAction','updateTodoAction','setSearchQueryAction']),
			addTodo() {
				if (this.text.trim()) {
					this.addTodoAction({text:this.text});
					this.text = '';
				}
			},
			toggleTodo(value) {
				this.toggleTodoAction(value);
			},
			deleteTodo(value) {
				this.deleteTodoAction(value);
			},
			editTodo(value){
				this.updateTodoAction(value);
			},
			handleSearch(){
				this.setSearchQueryAction(this.searchText)
			}
		}
	}
</script>

<style lang="scss">
	button,view{
		padding: 0;
		margin: 0;
		box-sizing: border-box;
	}
	.container{
		margin: 30rpx 60rpx;
		.title {
			font-size: 50rpx;
			font-weight: bold;
			
		}
		.add-input{
			border-bottom: 2px solid #457AF7;
			padding-left: 10rpx;
		}
		.add-box {
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin-top: 30rpx;
			margin-bottom: 30rpx;
			.add-btn{
				border: 1px solid #457AF7;
				padding: 15rpx 30rpx;
				border-radius: 30rpx;
			}
		}
		.search-box{
			background-color: #F8F8F8;
			border-radius: 30rpx;
			display: flex;
			align-items: center;
			gap: 10rpx;
			padding: 20rpx;
			margin: 25rpx 0;
			
			.search-input{
				width: 100%;
			}
			
			.img{
				width: 48rpx;
				height: 48rpx;
				object-fit: contain;
			}
		}
		.scroll-Y{
			height: 70vh;
		}
		.todolist{
			padding: 20rpx 10rpx;
		}
	}
	
	
	
</style>