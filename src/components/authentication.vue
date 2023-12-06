<template>
    <section class="center">
        <section class="background-form">

            <h2 class="dev-text">Insira seu email:</h2>

            <form class="form" @submit="GENERATE_CODE">
                <input type="email" class="input" placeholder="example: test@email.com" v-model="email" required>
                <br>
                <button class="button-continue">Continuar</button>
            </form>

            <tutorialVue />
            <alertVue :text="alert" />
        </section>
    </section>
</template>

<script>
    import tutorialVue from '../components/tutorial.vue'
    import alertVue from './alert.vue'

    export default {
        name: 'authentication',
        data() {
            return {
                email: '',
                alert: ''
            }
        },
        components: {
            tutorialVue,
            alertVue
        },
        methods: {
            async GENERATE_CODE(e) {
                e.preventDefault()

                const URL = 'http://localhost:3000/code/sign'

                const request = await fetch(URL, {
                    method: 'POST',
                    body: JSON.stringify({
                        email: this.email
                    }),
                    headers: {
                        "Content-Type": "application/json"
                    }
                }).then(async(res) => {
                    const response = await res.json()

                    if (response.result) {
                        localStorage.setItem('EMAIL_USER', this.email)
                        location.href = 'http://localhost:8080/verify'
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

<style scoped>
    .center{
        height: 81.5vh;
        display: flex;
        justify-content: center;
    }

    .dev-text{
        margin-bottom: 25px;
        margin-top: 30px;
    }
</style>

<style>
    :root{
        --background: #F8F8F8;
    }

    .form{
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .background-form{
        background-color: var(--background);
        width: 800px;
        height: 100%;
        display: flex;
        align-items: center;
        flex-direction: column;
    }

    .input{
        padding: 17px;
        width: 300px;
        border: 1px solid grey;
        border-radius: 8px;
        outline: none;
        font-size: 16px;
    }

    .button-continue{
        padding: 18px 28px;
        border-radius: 10px;
        border: none;
        background-color: #3586FF;
        color: white;
        font-size: 16px;
        cursor: pointer;
        margin-top: 20px;
    }

    .button-continue:hover{
        background-color: #2977ec;
        transform: scale(105%);

        transition: 0.3s;
    }

    @media (max-width: 355px) {
        .form {
            width: 100%;
        }

        .input{
            width: 80%;
        }

        .video{
            width: 95%;
        }
    }
</style>