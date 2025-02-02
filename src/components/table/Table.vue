<template>
    <div class="table-responsive">
        <table class="table">
            <thead>
                <tr>
                    <th scope="col" v-for="(col, index) in columns" :key="index">
                        {{ col.name }}
                    </th>
                    <th scope="col">Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr v-if="isLoading">
                    <td colspan="100%" class="text-center">
                        <div class="d-flex justify-content-center">
                            <div class="spinner-border" role="status">
                                <span class="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    </td>
                </tr>
                <tr v-for="(row, index) in paginatedRows" :key="index" v-if="!isLoading">
                    <td v-for="(col, colIndex) in columns" :key="colIndex">
                        <template v-if="col.renderCell">
                            {{ col.renderCell(row) }}
                        </template>
                        <template v-else>
                            {{ row[col.field] }}
                        </template>
                    </td>
                    <td class="position-relative">

                        <button class="btn" type="button" @click="toggleDropdown(index)">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                class="bi bi-three-dots-vertical" viewBox="0 0 16 16">
                                <path
                                    d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
                            </svg>
                        </button>

                        <ul v-if="dropdownVisible[index]" class="menu" aria-labelledby="dropdownMenuButton1"
                            style="list-style: none;">
                            <li><a class="menu-item" href="#" @click="editAction(row,index)">
                                    <span class="text-primary"><svg xmlns="http://www.w3.org/2000/svg" width="16"
                                            height="16" fill="currentColor" class="bi bi-pencil-square"
                                            viewBox="0 0 16 16">
                                            <path
                                                d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                            <path fill-rule="evenodd"
                                                d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                                        </svg>
                                    </span>
                                    Editar</a></li>
                            <li><a class="menu-item" href="#" @click="deleteAction(row,index)">
                                    <span class="text-danger">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                            fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">
                                            <path
                                                d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5" />
                                        </svg>
                                    </span>
                                    Eliminar</a></li>
                        </ul>

                    </td>
                </tr>
            </tbody>
        </table>
        <div v-if="rows.length > 0" style="display: flex; justify-content: end; padding-right: 10px;">
            <nav aria-label="Table pagination">
                <ul class="pagination">
                    <li class="page-item" :class="{ disabled: currentPage === 1 }">
                        <a class="page-link" href="#" @click.prevent="changePage(currentPage - 1)">&lt;</a>
                    </li>
                    <li class="page-item" :class="{ active: currentPage === page }" v-for="page in totalPages"
                        :key="page">
                        <a class="page-link" href="#" @click.prevent="changePage(page)">{{ page }}</a>
                    </li>
                    <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                        <a class="page-link" href="#" @click.prevent="changePage(currentPage + 1)">&gt;</a>
                    </li>
                </ul>
            </nav>
        </div>
    </div>
</template>

<script>

export default {
    name: 'Table',
    props: {
        rows: {
            default: []
        },
        columns: {
            required: true,
        },
        limit: {
            default: 5
        },
        isLoading: {
            default: false
        },
        editAcctions:{
            default:()=>{}
        },
        deleteAcctions:{
            default:()=>{}
        }
    },

    data() {
        return {
            currentPage: 1,
            dropdownVisible: {}
        };
    },
    computed: {
        paginatedRows() {
            const startIndex = (this.currentPage - 1) * this.limit;
            const endIndex = startIndex + this.limit;
            return this.rows.slice(startIndex, endIndex);
        },
        totalPages() {
            return Math.ceil(this.rows.length / this.limit);
        },

    },
    methods: {
        changePage(page) {
            if (page >= 1 && page <= this.totalPages) {
                this.currentPage = page;
            }
        },
        toggleDropdown(index) {
            this.dropdownVisible[index] = !this.dropdownVisible[index];
        },
        editAction(row, index) {
            this.$store.dispatch('editData',row.id)
            console.log(row.id)
            this.editAcctions()
            this.toggleDropdown(index)
        },
        deleteAction(row, index) {
            this.$store.dispatch('deleteData',row.id)
            this.deleteAcctions()
            this.toggleDropdown(index)
        }
    },
};
</script>

<style scoped>
td.position-relative {
    position: relative;
    display: flex;
    justify-content: center;
}

ul.menu {
    position: absolute;
    top: 100%;
    z-index: 1050;
    background-color: rgb(255, 255, 255);
    box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.1);
    padding: 10px !important;
}

ul.menu li {
    padding-top: 8px;
}

ul.menu li:hover {
    background-color: #f1f1f1;
}

ul.menu .menu-item {
    text-decoration: none;
    color: rgb(48, 48, 48);
}
</style>
