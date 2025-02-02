<template>
    <div class="container" style="margin-top: 30px;">
      <HeaderEmpleado :toggleDrawer="toggleDrawerEmpleado" />
      <div class="card" style="margin-top: 20px;">
        <Table 
          :columns="columns" 
          :rows="rows" 
          :isLoading="isLoading"
          :limit="limit"
          :deleteAcctions="deleteEmpleado"
          :editAcctions="editEmpleado"
        />
      </div>
      <RegisterEmpleado 
      :isDrawerOpen="isDrawerOpenEmpleado"
      :toggleDrawer="toggleDrawerEmpleado"
      />
      <EditEmpleado
      :isDrawerOpen="openEdit"
      :toggleDrawer="toggleEdit"
      />
    </div>
  </template>
  
  <script>
  import Table from './table/Table.vue';
  import { mapGetters } from 'vuex';
  import HeaderEmpleado from './header/HeaderEmpleado.vue';
import RegisterEmpleado from './register/RegisterEmpleado.vue';
import axios from 'axios';
import EditEmpleado from './edit/EditEmpleado.vue';
  
  export default {
    name: 'Vehicles',
    components: {
      HeaderEmpleado,
      Table,
      RegisterEmpleado,
      EditEmpleado
    },
    data() {
      return {
        columns: [
          { name: 'Nombre Empleado', field: 'nombre' },
          { name: 'Area de trabajo', field: 'area' },
        ],
        limit: 8,
        isDrawerOpenEmpleado:false,
        openEdit:false,
        editData:null
      };
    },
    computed: {
      ...mapGetters(['getDataUser', 'isLoading', 'getError', 'getBaseUrl', 'getEditId', 'getDeleteId']),
      rows() {
        return this.getDataUser; 
      },
      endpoint(){
        return `${this.getBaseUrl}/empleados`;
      }
    },
    mounted() {
      if (!this.getDataUser.length) {
        this.$store.dispatch('fetchDataEmpleado', '/empleados');
      };
    },
    methods:{
      toggleDrawerEmpleado(){
        this.isDrawerOpenEmpleado = !this.isDrawerOpenEmpleado
      },
      toggleEdit(){
        this.openEdit = !this.openEdit
      },
      deleteEmpleado(){
        axios.delete(`${this.getBaseUrl}/empleados/${this.getDeleteId}`).then((res)=>{
          console.log('delete succes', res.status)
          this.$store.dispatch('fetchDataEmpleado', '/empleados');
        })
        .catch((er)=>console.log('error', er))
      },
      async editEmpleado(){
        try{
          const empleado = await axios.get(`${this.getBaseUrl}/empleados/${this.getEditId}`)
          this.$store.dispatch('editAddData', empleado.data)
        }catch(er){console.log('error' , er)}
        this.toggleEdit()
        
      }
    }
  };
  </script>
  