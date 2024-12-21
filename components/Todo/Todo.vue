<template>
	<view class="todo-box">
		<view class="todo" v-if="!isEdit">
			<view class="circle" v-show="!todo.completed" @click="toggleTodo(todo.id)"></view>
			<text :class="{complete : todo.completed}">{{todo.text}}</text>
			<view class="icon-box">
				<view class="icon" @click="deleteTodo(todo.id)"><img :src="deleteIcon" alt="" class="img" /></view>
				<view class="icon" v-show="!todo.completed" @click="handleSetEdit(todo.text)" ><img :src="editIcon" alt="" class="img" /></view>
			</view>
		</view>
		
		<view class="todo" v-else>
			<input type="text" class="add-input" v-model="editText"  />
			<view class="icon-box">
				<view class="icon" @click="editTodo(todo.id)"><img :src="checkIcon" alt="" class="img" /></view>
				<view class="icon" @click="isEdit=false" ><img :src="closeIcon" alt="" class="img" /></view>
			</view>
		</view>
		
	</view>
</template>

<script>
	import deleteIcon from '../../static/delete.svg'
	import editIcon from '../../static/edit.svg'
	import checkIcon from '../../static/check.svg'
	import closeIcon from '../../static/close.svg'
	
	export default {
		name:"Todo",
		props: {
		    todo: {
		      type: Object,
		      required: true
		    },
		  },
		data() {
			return {
				isEdit: false,
				editText:'',
				deleteIcon,
				editIcon,
				checkIcon,
				closeIcon,
			};
		},
		methods:{
			handleSetEdit(text){
				this.isEdit = true;
				this.editText = text;
			},
			editTodo(id){
				this.$emit('edit', {id, text:this.editText})
				this.isEdit = false;
			},
			toggleTodo(id){
				this.$emit('toggle', {id})
			},
			deleteTodo(id){
				this.$emit('delete', {id})
			}
		}
	}
</script>

<style lang="scss">
.todo-box {
		
		padding: 10rpx;
		margin-bottom: 30rpx;
		border: 1px solid #457AF7;
		border-radius: 30rpx;
		
		.todo{
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 10rpx 20rpx;
		}
		
		.circle{
			width: 48rpx;
			height: 48rpx;
			border: 1px solid #CCCCCC;
			border-radius: 50%;
		}
		.complete{
			text-decoration: line-through;
		}
		
		.icon-box{
			display: flex;
			align-items: center;
			gap: 20rpx;
			.icon{
				width: 48rpx;
				height: 48rpx;
				.img{
					width: 100%;
					height: 100%;
					object-fit: contain;
				}
			}
		}
		
	}
</style>