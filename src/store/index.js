import axios from 'axios'
import { createStore } from 'vuex'

export default createStore({
  state: {
    baseUrl:process.env.VUE_APP_API_URL,
    data:[],
    dataUser:[],
    loading:false,
    editId:'',
    editData:null,
    deleteId:'',
    error:null,
    isOk:false
  },
  getters: {
    getBaseUrl(state){
      return state.baseUrl
    },
    getData(state){
      return state.data
    },
    getDataUser(state){
      return state.dataUser
    },
    isLoading(state){
      return state.loading
    },
    getError(state){
      return state.error
    },
    IsOk(state){
      return state.isOk
    },
    getEditId(state){
      return state.editId
    },
    getDeleteId(state){
      return state.deleteId
    },
    getEditData(state){
      return state.editData
    }
  },
  mutations: {
    setLoading(state,loading){
      state.loading = loading
    },
    setData(state, data){
      state.data = data
    },
    setDataUser(state, userData){
      state.dataUser = userData
    },
    setError(state, error){
      state.error = error
    },
    setIsOk(state,isOk){
      state.isOk = isOk
    },
    setEditId(state, id){
      state.editId = id
    },
    setDeleteId(state, id){
      state.deleteId = id
    },
    setEditData(state, data){
      state.editData = data
    }
  },
  actions: {
    fetchDataEmpleado({commit}, endpoint='/'){
      commit('setLoading', true)
      axios.get(`${process.env.VUE_APP_API_URL}${endpoint}`)
      .then((response) => {
        commit('setDataUser', response.data);
        commit('setLoading', false);
      })
      .catch((error) => {
        commit('setError', error);
        commit('setLoading', false);
      });
    },
    async fetchData({ commit }, { endpoint = '/', filters = {} }) {
      commit('setLoading', true);
      try {
        const response = await axios.get(`${process.env.VUE_APP_API_URL}${endpoint}`);
        let data = response.data;
        data = data.filter((item) => {
          let matches = true;
          if (filters.tipo) {
            matches = matches && item.tipo.toLowerCase().includes(filters.tipo.toLowerCase());
          }

          if (filters.placa) {
            matches = matches && item.placa.toLowerCase().includes(filters.placa.toLowerCase());
          }
          if (filters.color) {
            matches = matches && item.color.toLowerCase().includes(filters.color.toLowerCase());
          }
          if(filters.nombre) {
            matches = matches && item.empleado.nombre.toLowerCase().includes(filters.nombre.toLowerCase())
          }
          if(filters.area){
            matches = matches && item.empleado.area.toLowerCase().includes(filters.area.toLowerCase())
          }
          return matches;
        });

        commit('setData', data);
      } catch (error) {
        commit('setError', error);
      } finally {
        commit('setLoading', false);
      }
    },
    addData({commit, dispatch}, {endpoint,data}){
      commit('setLoading', true)
      commit('setIsOk', false)
      axios.post(`${process.env.VUE_APP_API_URL}${endpoint}`,data)
      .then((response)=>{
        dispatch('fetchData', {endpoint:'/vehiculos?_expand=empleado'})
      }).catch((error)=>{
        console.log(er)
        commit('setError', error)
        commit('setLoading', false)
      })
    },
    addDataEmpleado({commit, dispatch}, {endpoint,data}){
      commit('setLoading', true)
      commit('setIsOk', false)
      axios.post(`${process.env.VUE_APP_API_URL}${endpoint}`,data)
      .then((response)=>{
        dispatch('fetchDataEmpleado', '/empleados')
      }).catch((error)=>{
        console.log(er)
        commit('setError', error)
        commit('setLoading', false)
      })
    },
    editData({commit}, id){
      commit('setEditId',id)
    },
    deleteData({commit}, id){
      commit('setDeleteId', id)
    },
    editAddData({commit}, data){
      commit('setEditData', data)
    },
    edit({ commit, dispatch }, { endpoint, data, id }) {
      commit('setLoading', true);
      commit('setIsOk', false);
  
      return axios.put(`${process.env.VUE_APP_API_URL}${endpoint}/${id}`, data)
        .then(() => {
          dispatch('fetchDataEmpleado', endpoint);
          commit('setIsOk', true);
        })
        .catch((error) => {
          console.log(error); 
          commit('setError', error);
        })
        .finally(() => {
          commit('setLoading', false);
        });
    },
    editCar({ commit, dispatch }, { endpoint, data, id }) {
      commit('setLoading', true);
      commit('setIsOk', false);
      return axios.put(`${process.env.VUE_APP_API_URL}${endpoint}/${id}`, data)
        .then(() => {
          console.log('fetch')
          dispatch('fetchData', {endpoint:'/vehiculos?_expand=empleado'})
          commit('setIsOk', true);
        })
        .catch((error) => {
          console.log(error); 
          commit('setError', error);
        })
        .finally(() => {
          commit('setLoading', false);
        });
    }
  },
  modules: {
  }
})
