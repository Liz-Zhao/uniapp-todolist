import { createStore } from 'vuex';

const store = createStore({
  state: {
    todos: [],
	searchQuery: '' // 搜索关键字
  },
  mutations: {
    // 添加 Todo
    addTodo(state, payload) {
      state.todos.push({
        id:Math.random() * 1000,
        text:payload.text,
        completed:false
      });
    },
    // 删除 Todo
    deleteTodo(state, payload) {
      state.todos = state.todos.filter((item)=> item.id!==payload.id);
    },
    // 标记 Todo 为完成
    toggleTodo(state, payload) {
      state.todos = state.todos.map((item)=> item.id == payload.id ? {...item, completed:!item.completed}: item)
    },
    // 编辑todo 内容
    updateTodo(state,payload){
        state.todos = state.todos.map((item)=> item.id == payload.id ? {...item, text:payload.text}: item)
    },
	// 设置搜索关键字
	setSearchQuery(state, query) {
	  state.searchQuery = query;
	}
  },
  actions: {
    addTodoAction({ commit }, payload) {
      commit('addTodo', payload);
    },
    deleteTodoAction({ commit }, payload) {
      commit('deleteTodo', payload);
    },
    toggleTodoAction({ commit }, payload) {
      commit('toggleTodo', payload);
    },
    updateTodoAction({commit},payload){
        commit('updateTodo',payload)
    },
	setSearchQueryAction({ commit }, query) {
	  commit('setSearchQuery', query);
	}
  },
  getters: {
    // 获取所有未完成的 Todo
    incompleteTodos(state) {
      return state.todos.filter(todo => !todo.completed);
    },
    // 获取所有已完成的 Todo
    completedTodos(state) {
      return state.todos.filter(todo => todo.completed);
    },
    allTodos(state){
        return state.todos.length;
    },
	completedTodosLength(state, getters){
		return getters.completedTodos.length
	},
	// 过滤 Todo 项，根据搜索关键字
	filteredTodos(state) {
	  if (!state.searchQuery.trim()) {
		return state.todos; // 如果没有搜索关键字，则返回全部 Todo 项
	  }
	  return state.todos.filter(todo =>
		todo.text.toLowerCase().includes(state.searchQuery.toLowerCase())
	  );
	}
  }
});

export default store;
