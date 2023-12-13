<template>
    <section class="background-code">
        <h2 class="dev-text">Crie sua conta</h2>

        <form class="form" @submit="CREATE_ACCOUNT">
            <label class="file">
                <img src="" class="file-image">
                <label for="#file-input">Selecione</label>
                <input type="file" id="file-input" class="file-input" @change="image" required>
            </label>
            <input type="text" class="input" maxlength="50" placeholder="Name" v-model="name" required>
            <input type="text" class="input" maxlength="50" placeholder="About" v-model="about" required>
            <br>
            <button class="button-continue">Criar</button>
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
                name: '',
                about: '',
                alert: ''
            }
        },
        methods: {
            async CREATE_ACCOUNT(e) {
                e.preventDefault()
                
                const file = e.target[0].files[0]

                const URL = 'https://backend-devs-web.vercel.app/account/authentication'

                let data = new FormData()

                data.append('email', localStorage.getItem('EMAIL_USER'))
                data.append('name', this.name)
                data.append('about', this.about)
                data.append('image', file)


                const request = await fetch(URL, {
                    method: 'POST',
                    body: data
                }).then(async(res) => {
                    const response = await res.json()

                    if (response.result) {
                        localStorage.removeItem('EMAIL_USER')

                        localStorage.setItem('x-access-token', response.token)
                        location.href = 'http://localhost:8080/overview'
                    } else {
                        this.alert = response.error

                        setTimeout(() => {
                            this.alert = ''
                        }, 1500)
                    }
                })
            },
            image(e) {
                const file = e.target.files[0]
                const imageSelected = document.querySelector('.file-image')

                if (file) {
                    const reader = new FileReader()

                    reader.addEventListener('load', (e) => {
                        imageSelected.src = e.target.result
                    })

                    reader.readAsDataURL(e.target.files[0])
                }
            }
        }
    }
</script>

<style scoped>
    input{
        margin-bottom: 10px;
    }
</style>

<style>
    .file-input {
        display: none;
    }

    .file{
        width: 130px;
        height: 130px;
        background-color: rgb(192, 192, 192);
        border: 2px dashed grey;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        margin-bottom: 20px;
        border-radius: 50%;
    }

    .file-image{
        width: 130px;
        height: 130px;
        border-radius: 50%;
        position: absolute;
    }
</style>