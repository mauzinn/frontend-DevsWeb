<template>
    <section class="menu-main">
        <section class="menu">
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />

            <section class="header-menu">
                <span class="material-symbols-outlined logout" @click="LOGOUT">
                logout
                </span>

                <h2 class="dev-text">
                    <span class="material-symbols-outlined">
                    developer_mode
                    </span>
                    DevsWeb
                </h2>
                
                <button class="button-add" @click="CREATE_MENU">+</button>
            </section>

            <section class="menu-options">
                <section class="option" v-for="contact in contacts" :key="contact.room" @click="SELECT(contact.room)">
                    <img :src="contact.src">
                    <div>
                        <h3>{{contact.name}}</h3>
                        <p>{{contact.about}}</p>
                    </div>
                </section>
            </section>
        </section>

        <contactCreateVue v-show="MENU_CREATE" />
    </section>
</template>

<script>
    import contactCreateVue from './contactCreate.vue'

    export default {
        name: 'menu',
        data() {
            return {
                contacts: [],
                MENU_CREATE: false
            }
        },
        components: {
            contactCreateVue
        },
        created() {

            //Buscar contatos
            setTimeout(async() => {

                const URL = "http://localhost:3000/contact/read"

                const request = await fetch(URL, {
                    method: 'POST',
                    body: JSON.stringify({
                        email: this.$store.state.email,
                        token: localStorage.getItem('x-access-token')
                    }),
                    headers: {
                        "Content-Type": "application/json"
                    }
                }).then(async(res) => {
                    const response = await res.json()

                    if (response.result) {
                        this.contacts = response.contacts
                    }
                })

            }, 250)

        },
        methods: {
            CREATE_MENU() {
                this.MENU_CREATE = !this.MENU_CREATE
            },
            SELECT(room) {
                this.$store.commit('SET_ROOM', room),
                this.$store.commit('MENU', false)
            },
            LOGOUT() {
                localStorage.removeItem('x-access-token')
                
                location.reload()
            }
        }
    }
</script>

<style scoped>
    .dev-text{
        color: white;
    }

    .button-add{
        z-index: 2;
    }

    .logout {
        color: rgb(240, 0, 0);
        font-size: 30px;
        cursor: pointer;
    }

    .logout:hover{
        color: rgb(225, 0, 0);
        transform: scale(1.1);

        transition: 0.3s;
    }
</style>

<style>
    :root {
        --background-menu: #282931;
        --vue-color: #41B883;
    }

    .menu{
        width: 400px;
        height: 98vh;
        background-color: var(--background-menu);
        padding: 10px;
        overflow: auto;
    }

    .option{
        width: 95%;
        padding: 6px;
        background-color: rgb(248, 248, 248);
        display: flex;
        align-items: center;
        flex-direction: row;
        border-radius: 12px;
        cursor: pointer;
        margin-bottom: 20px;
    }

    .header-menu{
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 30px;
    }

    .option img{
        width: 80px;
        height: 80px;
        border-radius: 50%;
        margin-right: 20px;
    }

    .option h3{
        color: rgb(107, 107, 107);
    }

    .option p{
        color: grey;
    }

    .option:hover{
        background-color: rgb(241, 241, 241);

        transition: 0.3s;
    }

    .button-add{
        font-weight: 600;
        font-size: 22px;
        color: white;
        padding: 13px 20px;
        border-radius: 50%;
        background-color: var(--vue-color);
        border: none;
        cursor: pointer;
    }
    
    .button-add:hover{
        transform: scale(105%);
        background-color: #37a774;

        transition: 0.3s;
    }

    @media (max-width: 400px) {
        .menu{
            width: 95%;
        }
    }
</style>