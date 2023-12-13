<template>
    <section class="interface">
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
        <menuVue v-show="SHOW_MENU" class="absolute" />
        <menuVue class="menu-pc" />

        <div class="header-height"></div>

        <section class="header-chat" v-if="SHOW_MENU == false">
            <span class="material-symbols-outlined close" @click="CLOSE">
            arrow_back
            </span>

            <h2 class="dev-text">
                <span class="material-symbols-outlined">
                code
                </span>
                DevsWeb
            </h2>
        </section>

        <section class="chat-main">
            <section class="messages">
                <article v-for="message in messages" :class="message.class" :key="message.by">
                    <p>{{message.message}}</p>
                    <small>{{message.date}}</small>
                </article>
            </section>

            <form class="form" @submit="MESSAGE_FORM">
                <input type="text" class="input" placeholder="Digite aqui..." v-model="text" required>
                <button class="button-add">
                    <span class="material-symbols-outlined">
                    send
                    </span>
                </button>
            </form>

            <div class="none">{{MENU}}</div>

        </section>
    </section>
</template>

<script>
    import menuVue from '../components/menu.vue'
    const socket = require('socket.io-client')('http://localhost:3000')

    socket.emit('CHANGE_ROOM', '0')

    export default {
        name: 'chat',
        data() {
            return {
                text: '',
                messages: [],
                SHOW_MENU: false
            }
        },
        created() {
            this.messages.forEach(object => {
            
                if (object.by == this.$store.state.id) {
                    object.class = 'message me'
                } else {
                    object.class = 'message'
                }

                const index = this.messages.findIndex(objeto => {
                    objeto.message == object.message
                })

                this.messages[index] = object
            })

            socket.on('USER_ID', (id) => {
                this.$store.commit('SET_ID', id)
            })

            socket.on('SEND_MESSAGE', (messageData) => {
                this.MESSAGES(messageData)
            })
        },
        components: {
            menuVue
        },
        methods: {
            MESSAGE_FORM(e) {
                e.preventDefault()
                
                const DATA = {
                    message: this.text,
                    by: this.$store.state.email,
                    room: this.$store.state.room
                }

                this.text = ''

                socket.emit('SEND_MESSAGE', DATA)
            },
            MESSAGES(object) {
                if (object.by == this.$store.state.email) {
                    object.class = 'message me'
                } else {
                    object.class = 'message'
                }

                this.messages.push(object)
            },
            CLOSE() {
                this.$store.commit('MENU', true)
            }
        },
        computed: {
            async MENU() {
                this.SHOW_MENU = this.$store.state.MENU

                if (this.$store.state.NewRoom) {
                    socket.emit('CHANGE_ROOM', this.$store.state.room)
                    this.messages = []

                    const URL = "https://backend-devs-web.vercel.app/message/read"

                    const request = await fetch(URL, {
                        method: 'POST',
                        body: JSON.stringify({
                            room: this.$store.state.room,
                            token: localStorage.getItem("x-access-token")
                        }),
                        headers: {
                            "Content-Type": "application/json"
                        }
                    }).then(async(res) => {
                        const response = await res.json()

                        if (response.result) {
                            response.messages.map(message => {
                                setTimeout(() => {
                                    this.MESSAGES(message)
                                }, 150)
                            })
                        }
                    })

                    this.$store.commit('IN_ROOM', false)
                }

                return ""
            }
        }
    }
</script>

<style scoped>
    .button-add{
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 20px 20px;
    }

    .input{
        width: 85%;
        border: none;
        margin-right: 20px;
    }

    .form{
        display: flex;
        flex-direction: row;
    }

    .dev-text{
        color: white;
    }
</style>

<style>
    :root{
        --message-bg: rgb(250, 250, 250);
        --message-bg-me: rgb(216, 252, 209);
    }

    .header-chat{
        background-color: var(--vue-color);
        width: 100%;
        height: 60px;
        position: fixed;
        top: 0%;
        display: none;
        padding: 5px;
    }

    .absolute{
        position: fixed;
        width: 100%;
    }

    .close{
       color: white;
       background: none;
       border: none;
       font-size: 30px;
       transform: scale(1.5);
    }

    .close:hover{
        color: rgb(233, 233, 233);
    }

    .chat-main{
        height: 98vh;
        width: 100%;
    }

    .interface{
        display: flex;
        flex-direction: row;
    }

    .message{
        background-color: var(--message-bg);
        min-width: 350px;
        max-width: 450px;
        padding: 12px;
        border-radius: 10px;
        margin-bottom: 20px;
        display: flex;
        justify-content: space-between;
        word-break: break-all;
    }

    .none{
        display: none;
    }

    .me{
        background-color: var(--message-bg-me);
    }

    .messages{
        height: 84vh;
        margin-top: 6vh;
        display: flex;
        flex-direction: column;
        padding-top: 20px;
        padding-left: 20px;
        overflow: auto;
    }

    .message small{
        color: grey;
    }

    @media (max-width: 860px) {
        .menu-pc{
            display: none;
        }

        .header-chat{
            display: block;
        }

        .interface{
            flex-direction: column;
        }

        .messages{
            padding-left: 0;
        }

        .message{
            min-width: 90%;
            width: 90%;
        }
    }
</style>