<template>
    <div></div>
</template>

<script>
    export default {
        name: 'verify',
        async created() {
            const token = localStorage.getItem('x-access-token')
            const URL = 'http://localhost:3000/jwt/decode'

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
                    location.href = 'http://localhost:8080/'
                }

                this.$store.commit('SET_DATA_USER', response.data)
            })
        }
    }
</script>