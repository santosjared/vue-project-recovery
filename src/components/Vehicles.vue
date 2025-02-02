<template>
  <div class="container" style="margin-top: 30px;">
    <Header :toggleDrawer="toggleDrawerCar" />
    <div class="card" style="margin-top: 20px;">
      <Table :columns="columns" :rows="rows" :isLoading="isLoading" :limit="limit" :deleteAcctions="deleteCar"
        :editAcctions="editCar" />
    </div>
    <RegisterCar :isDrawerOpen="isDrawerOpenCar" :toggleDrawer="toggleDrawerCar" />
    <EditCar :isDrawerOpen="openEdit" :toggleDrawer="toggleEdit" />
  </div>
</template>

<script>
import Header from '@/components/header/Header.vue';
import Table from './table/Table.vue';
import { mapGetters } from 'vuex';
import RegisterCar from './register/RegisterCar.vue';
import axios from 'axios';
import EditCar from './edit/EditCar.vue';

export default {
  name: 'Vehicles',
  components: {
    Header,
    Table,
    RegisterCar,
    EditCar
  },
  data() {
    return {
      columns: [
        { 
          name: 'Nombre Empleado', 
          field: 'nombre',
           renderCell: (row) => {
            return row.empleado.nombre
          }
        },
        { name: 'Area de trabajo', 
        field: 'area,',
        renderCell:(row) =>{
          return row.empleado.area
        } 
      },
        {
          name: 'Tipo vehiculo',
          field: 'tipo',
          // renderCell: (row) => {
          //   return row.vehiculos.map(vehiculo => vehiculo.tipo).join(', ')
          // }
        },
        {
          name: 'Numero de placa',
          field: 'placa',
          // renderCell: (row) => {
          //   return row.vehiculos.map(vehiculo => vehiculo.placa).join(', ')
          // }
        },
        {
          name: 'Color vehiculo',
          field: 'color',
          // renderCell: (row) => {
          //   return row.vehiculos.map(vehiculo => vehiculo.color).join(', ')
          // }
        },
      ],
      limit: 8,
      isDrawerOpenCar: false,
      openEdit: false,
    };
  },
  computed: {
    ...mapGetters(['getData', 'isLoading', 'getError', 'getBaseUrl', 'getDeleteId', 'getEditId']),
    rows() {
      return this.getData;
    }
  },
  mounted() {
    if (!this.getData.length) {
      this.$store.dispatch('fetchData', { endpoint: '/vehiculos?_expand=empleado' });
    };
  },
  methods: {
    toggleDrawerCar() {
      this.isDrawerOpenCar = !this.isDrawerOpenCar
    },
    toggleEdit() {
      this.openEdit = !this.openEdit
    },
    deleteCar() {
      axios.delete(`${this.getBaseUrl}/vehiculos/${this.getDeleteId}`).then((res) => {
        console.log('delete succes', res.status)
        this.$store.dispatch('fetchData', { endpoint: '/vehiculos?_expand=empleado' });
      })
        .catch((er) => console.log('error', er))
    },
    async editCar() {
      try {
        const car = await axios.get(`${this.getBaseUrl}/vehiculos/${this.getEditId}?_expand=empleado`)
        console.log(this.getEditId)
        this.$store.dispatch('editAddData', car.data)
      } catch (er) { console.log('error', er) }
      this.toggleEdit()
    }
  }
};
</script>
