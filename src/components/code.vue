<template>
    <section class="background-code">
        <h2 class="dev-text">Verifique o codigo enviado no seu email:</h2>

        <form class="form" @submit="VERIFY_CODE">
            <input type="number" class="input" placeholder="example: 1234" v-model="code" required>
            <br>
            <button class="button-continue">Continuar</button>
            <small><router-link to="/" class="link">Voltar</router-link></small>
        </form>

        <alertVue :text="alert" />
    </section>
</template>

<script>
    import alertVue from './alert.vue'

    export default {
        name: 'code',
        components: {
            alertVue
        },
        data() {
            return {
                code: '',
                alert: ''
            }
        },
        methods: {
            async VERIFY_CODE(e) {
                e.preventDefault()

                const URL = 'https://backend-devs-web.vercel.app/code/verify'

                const request = await fetch(URL, {
                    method: 'POST',
                    body: JSON.stringify({
                        code: this.code
                    }),
                    headers: {
                        "Content-Type": "application/json"
                    }
                }).then(async(res) => {
                    const response = await res.json()

                    if (response.result) {
                        location.href = 'http://localhost:8080/create'
                    } else {
                        this.alert = response.error

                        setTimeout(() => {
                            this.alert = ''
                        }, 1500)
                    }
                })
            }
        }
    }
</script>

<style>
    .background-code{
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        background-color: white;
        height: 81.5vh;
    }

    .form{
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }

    .link{
        color: rgb(0, 162, 255);
        text-decoration: none;
    }

    .link:hover{
        color: rgb(0, 47, 255);
        text-decoration: underline;
    }
</style>