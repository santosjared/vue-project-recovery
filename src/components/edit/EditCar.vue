<template>
    <div class="sidenav" :style="{ width: isDrawerOpen ? '400px' : '0', display: isDrawerOpen ? 'block' : 'none' }">
      <button @click="toggleDrawer" class="closebtn">×</button>
      <div class="card" style="text-align: start;">
        <div class="card-body">
          <h5 class="card-title">Editar de vehículos</h5>
          <hr>
          <form @submit.prevent="handleSubmit">
            <div class="mb-3">
              <label for="empleado" class="form-label">Empleado</label>
              <select id="empleado" class="form-select" v-model="formData.empleadoId" required>
                <option :value="formData.empleadoId?formData.empleadoId:formData.id">
                    {{ formData.empleado?formData.empleado.nombre:
                '----Seleccione un empleado----' }}</option>
                <option v-for="(user, index) in user" :key="index" :value="user.id">{{ user.nombre }}</option>
              </select>
              <div v-if="errors.empleado" class="text-danger">{{ errors.empleado }}</div>
            </div>
  
            <div class="mb-3">
              <label for="tipoVehiculo" class="form-label">Tipo de vehículo</label>
              <select id="tipoVehiculo" class="form-select" v-model="formData.tipo" required>
                <option :value="formData.tipo">{{ formData.tipo }}</option>
                <option value="Automóvil">Automóvil</option>
                <option value="Moto">Moto</option>
                <option value="Bus">Bus</option>
                <option value="Otro">Otro</option>
              </select>
              <div v-if="errors.tipoVehiculo" class="text-danger">{{ errors.tipoVehiculo }}</div>
            </div>
            <div v-if="formData.tipo === 'Otro'" class="mb-3">
              <label for="otroTipo" class="form-label">Especificar otro tipo de vehículo</label>
              <input type="text" id="otroTipo" class="form-control" v-model="otroTipo" placeholder="Especifique el tipo de vehículo" required />
              <div v-if="errors.otroTipo" class="text-danger">{{ errors.otroTipo }}</div>
            </div>
  
            <div class="mb-3">
              <label for="placa" class="form-label">Placa del vehículo</label>
              <input type="text" id="placa" class="form-control" v-model="formData.placa" required placeholder="XDFS 7890" />
              <div v-if="errors.placa" class="text-danger">{{ errors.placa }}</div>
            </div>
  
            <div class="mb-3">
              <label for="color" class="form-label">Color del vehículo</label>
              <input type="text" id="color" class="form-control" v-model="formData.color" required placeholder="Rosado" />
              <div v-if="errors.color" class="text-danger">{{ errors.color }}</div>
            </div>
  
            <div style="display: flex; justify-content: space-between;">
              <button type="submit" class="btn btn-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-floppy-fill" viewBox="0 0 16 16">
                  <path d="M0 1.5A1.5 1.5 0 0 1 1.5 0H3v5.5A1.5 1.5 0 0 0 4.5 7h7A1.5 1.5 0 0 0 13 5.5V0h.086a1.5 1.5 0 0 1 1.06.44l1.415 1.414A1.5 1.5 0 0 1 16 2.914V14.5a1.5 1.5 0 0 1-1.5 1.5H14v-5.5A1.5 1.5 0 0 0 12.5 9h-9A1.5 1.5 0 0 0 2 10.5V16h-.5A1.5 1.5 0 0 1 0 14.5z" />
                  <path d="M3 16h10v-5.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5zm9-16H4v5.5a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5zM9 1h2v4H9z" />
                </svg>
                Guardar
              </button>
              <button type="button" @click="handleCancel" class="btn btn-outline-secondary">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16">
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
                </svg>
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import { mapGetters } from 'vuex';
  
  export default {
    name: 'RegisterCar',
    props: {
      isDrawerOpen: {
        default: false,
      },
      toggleDrawer: {
        default: () => {},
      },
    },
    data() {
      return {
        user: [],
        otroTipo: '',
        errors: {
          empleado: '',
          tipoVehiculo: '',
          placa: '',
          color: '',
          otroTipo: '',
        },
      };
    },
    computed: {
      ...mapGetters(['getBaseUrl', 'isLoading', 'IsOk', 'getEditData']),
      formData(){
            if(this.getEditData){
                return this.getEditData
            }else{
                return  {
          empleadoId: '',
          tipo: '',
          placa: '',
          color: '',
          id:''
        }
            }
        }
    },
    mounted() {
      this.fetch()
    },
    methods: {
      validateForm() {
        let isValid = true;
        this.errors = {
          empleado: '',
          tipoVehiculo: '',
          placa: '',
          color: '',
          otroTipo: '',
        };
  
        if (!this.formData.empleadoId) {
          this.errors.empleado = 'Debe seleccionar un empleado.';
          isValid = false;
        }
  
        const placaPattern = /^[A-Za-z]{3,4} \d{3,4}$/;
        if (!placaPattern.test(this.formData.placa)) {
          this.errors.placa = 'El formato de la placa no es válido (Ej: ABCD 1234).';
          isValid = false;
        }
        if (!this.formData.color) {
          this.errors.color = 'Debe ingresar un color.';
          isValid = false;
        }
        if (this.formData.tipo=== 'Otro' && !this.otroTipo) {
          this.errors.otroTipo = 'Debe especificar el tipo de vehículo.';
          isValid = false;
        }
  
        return isValid;
      },
      handleSubmit() {
        if (this.validateForm()) {
            const data = {
                empleadoId: this.formData.empleadoId,
          tipo: this.formData.tipo,
          placa: this.formData.placa,
          color: this.formData.color,
            }
          if(this.otroTipo){
            data.tipo = this.otroTipo
          }
          this.$store.dispatch('editCar',{endpoint:'/vehiculos', data:data, id:this.formData.id});
        //   this.$store.dispatch('fetchData', '/empleados?_embed=vehiculos');
          this.handleCancel()
          this.fetch()
        } else {
          console.log('Formulario con errores, por favor corrija.');
        }
      },
      handleCancel() {
        this.formData = {
          empleado: '',
          tipoVehiculo: '1',
          placa: '',
          color: '',
          otroTipo: '',
        };
        this.errors = {};
        this.toggleDrawer()
      },
      async fetch (){
        const empleados = await axios.get(`${this.getBaseUrl}/empleados`)
        const vehiculos = await axios.get(`${this.getBaseUrl}/vehiculos`)
        if( empleados.status === 200&&vehiculos.status === 200){
           const vehiculoID = new Set(vehiculos.data.map(vehiculo => vehiculo.empleadoId))
           const empleadosNotAsigne = empleados.data.filter(empleado => !vehiculoID.has(empleado.id))
           this.user = empleadosNotAsigne
        } 
      }
    },
  };
  </script>
  
  
  <style scoped>
  .sidenav {
    height: 100%;
    width: 0;
    position: fixed;
    z-index: 1090;
    top: 0;
    right: 0;
    background-color: #f7f7f7;
    overflow-x: hidden;
    transition: 0.5s;
    padding-top: 45px;
    padding-left: 20px;
    padding-right: 20px;
    padding-bottom: 20px;
    box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.2);
    border: 1px solid #ccc;
  }
  
  .sidenav .closebtn {
    position: absolute;
    top: 0;
    right: 25px;
    font-size: 25px;
    margin-left: 50px;
  }
  
  @media screen and (max-height: 450px) {
    .sidenav {
      padding-top: 15px;
    }
  }
  </style>
  