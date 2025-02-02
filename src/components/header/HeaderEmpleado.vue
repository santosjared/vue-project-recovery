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
    name: 'HeaderEmpleado',
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
                area:''
            }
        };
    },
    methods: {
        toggleFilters() {
            this.showFilter = !this.showFilter;
        },
        applyFilters() {
            let endpoint = '/empleados?'
            Object.keys(this.filters).forEach((key) => {
                if(this.filters[key]){
                    endpoint += `&${key}_like=${this.filters[key]}`
                }
            })
            this.$store.dispatch('fetchDataEmpleado', endpoint);
        },
        clearFilters() {
            this.filters = {
                nombre: '',
                area: ''
            };

            this.$store.dispatch('fetchDataEmpleado', '/empleados')
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
