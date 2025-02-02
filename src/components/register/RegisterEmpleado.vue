<template>
    <div class="sidenav" :style="{ width: isDrawerOpen ? '400px' : '0', display: isDrawerOpen ? 'block' : 'none' }">
      <button @click="toggleDrawer" class="closebtn">×</button>
      <div class="card" style="text-align: start;">
        <div class="card-body">
          <h5 class="card-title">Registro de empleado</h5>
          <hr>
          <form @submit.prevent="handleSubmit">
            <div class="mb-3">
              <label for="placa" class="form-label">Nombre</label>
              <input type="text" id="nombre" class="form-control" v-model="formData.nombre" required placeholder="Santos Machaca" />
              <div v-if="errors.nombre" class="text-danger">{{ errors.nombre }}</div>
            </div>
            <div class="mb-3">
              <label for="tipoVehiculo" class="form-label">Area de Trabajo</label>
              <select id="tipoVehiculo" class="form-select" v-model="formData.area" required>
                <option value="Contabilidad">Contabilidad</option>
                <option value="Finanzas">Finanzas</option>
                <option value="Médico">Médico</option>
                <option value="Otro">Otro</option>
              </select>
              <div v-if="errors.area" class="text-danger">{{ errors.area }}</div>
            </div>
            <div v-if="formData.area === 'Otro'" class="mb-3">
              <label for="otroArea" class="form-label">Especificar otro area de trabajo</label>
              <input type="text" id="otroArea" class="form-control" v-model="otroArea" placeholder="Ing. Sistemas" required />
              <div v-if="errors.otroArea" class="text-danger">{{ errors.otroArea }}</div>
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
    name: 'RegisterEmpleado',
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
        formData: {
          nombre: '',
          area:'Contabilidad'
        },
        otroArea: '',
        errors: {
         nombre: '',
         area:'',
         otroArea: '',
        },
      };
    },
    computed: {
      ...mapGetters(['getBaseUrl', 'isLoading', 'IsOk']),
    },
    methods: {
      validateForm() {
        let isValid = true;
        this.errors = {
            nombre:'',
            area:'',
            otroArea: '',
        };
        if (this.formData.area === 'Otro' && !this.otroArea) {
          this.errors.otroTipo = 'Debe especificar la area de trabajo';
          isValid = false;
        }
        const placaPattern = /^[A-Za-z\s]+$/;
        if (!placaPattern.test(this.formData.nombre)) {
        this.errors.placa = 'El formato del nombre no es válido (Ej: Santos Machaca).';
        isValid = false;
      }
        return isValid;
      },
      handleSubmit() {
        if (this.validateForm()) {
          if(this.otroArea){
            this.formData.area = this.otroArea
          }
          this.$store.dispatch('addDataEmpleado',{endpoint:'/empleados', data:this.formData});
          this.handleCancel()
        } else {
          console.log('Formulario con errores, por favor corrija.');
        }
      },
      handleCancel() {
        this.formData = {
            nombre:'',
            area:''
        };
        this.errors = {};
        this.toggleDrawer()
      },
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
  