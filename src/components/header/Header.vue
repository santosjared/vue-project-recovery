<template>
    <div style="display: flex; justify-content: space-between;">
        <button type="button" class="btn btn-secondary" @click="toggleFilters">
            {{ showFilter ? 'Cerrar Filtros' : 'Mostrar Filtros' }}
        </button>
        <button type="button" class="btn btn-secondary" @click="toggleDrawer">Nuevo Registro</button>
    </div>
    <div class="card" v-if="showFilter">
        <form class="table-filter">

            <input v-model="filters.nombre" class="form-control" type="text" placeholder="Nombre empleado">
            <input v-model="filters.area" class="form-control" type="text" placeholder="Area de trabajo">
            <input v-model="filters.tipo" class="form-control" type="text" placeholder="Tipo de Vehiculo">
            <input v-model="filters.placa" class="form-control" type="text" placeholder="Numero de placa">
            <input v-model="filters.color" class="form-control" type="text" placeholder="Color">
        </form>
        
        <div style="display: flex; justify-content: start;">
            <button class="btn btn-secondary btn-filter" type="button" @click="applyFilters">
                Filtrar
            </button>
            <button class="btn btn-outline-secondary btn-filter" type="button" @click="clearFilters">
                Cancelar
            </button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Header',
    props:{
        toggleDrawer:{
            default:()=>{}
        }
    },
    data() {
        return {
            showFilter: false,
            filters: {
                nombre: '',
                area: '',
                tipo: '',
                placa: '',
                color: ''
            }
        };
    },
    methods: {
        toggleFilters() {
            this.showFilter = !this.showFilter;
        },
        applyFilters() {
            this.$store.dispatch('fetchData', {endpoint:'/vehiculos?_expand=empleado',filters:this.filters});
        },
        clearFilters() {
            this.filters = {
                nombre: '',
                area: '',
                tipo: '',
                placa: '',
                color: ''
            };

            this.$store.dispatch('fetchData', {endpoint:'/vehiculos?_expand=empleado'})
        }
    }
};
</script>

<style scoped>
div.card {
    padding: 10px;
    margin-top: 15px;
}

form.table-filter {
    display: flex;
    justify-content: space-between;
}

input.form-control {
    margin: 6px;
}

.btn-filter {
    margin-left: 10px;
    margin-top: 5px;
}
</style>
