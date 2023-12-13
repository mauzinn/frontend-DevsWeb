<template>
    <section class="background-code">
        <h2 class="dev-text">Criar contato</h2>

        <form class="form" @submit="CREATE_CONTACT">
            <input type="email" class="input" placeholder="example: test@email.com" v-model="email" required>
            <br>
            <button class="button-continue">Criar</button>
        </form>

        <alertVue :text="alert" />
    </section>
</template>

<script>
    export default {
        name: 'contactCreate',
        data() {
            return {
                email: ''
            }
        },
        methods: {

            async CREATE_CONTACT(e) {
                e.preventDefault()

                const URL = "https://backend-devs-web.vercel.app/contact/create"

                const DATA = JSON.stringify({
                    email: this.email,
                    by: this.$store.state.email,
                    token: localStorage.getItem('x-access-token')
                })

                const request = await fetch(URL, {
                    method: 'POST',
                    body: DATA,
                    headers: {
                        "Content-Type": "application/json"
                    }
                }).then(async(res) => {
                    const response = await res.json()

                    if (response.result) {
                        this.email = ''
                        location.reload()
                    }
                })
            }

        }
    }
</script>

<style scoped>
    .background-code{
        position: fixed;
        top: 0;
        width: 100%;
        height: 99vh;
    }
</style>