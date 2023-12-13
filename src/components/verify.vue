<template>
    <div></div>
</template>

<script>
    export default {
        name: 'verify',
        async created() {
            const token = localStorage.getItem('x-access-token')
            const URL = 'https://backend-devs-web.vercel.app/jwt/decode'

            if (!token) {
                location.href = 'http://localhost:8080/'
            }

            const request = await fetch(URL, {
                method: 'POST',
                body: JSON.stringify({
                    token
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(async(res) => {
                const response = await res.json()

                if (!response.result) {
                    localStorage.removeItem('x-access-token')
                    location.href = 'https://frontend-devs-web.vercel.app/'
                }

                this.$store.commit('SET_DATA_USER', response.data)
            })
        }
    }
</script>