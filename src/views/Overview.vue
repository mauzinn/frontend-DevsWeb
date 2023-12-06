<template>
    <body>
        <verifyVue />
        <chatVue />
    </body>
</template>

<script>
    import chatVue from '../components/chat.vue'
    import verifyVue from '../components/verify.vue'

    export default {
        name: 'Overview',
        components: {
            chatVue,
            verifyVue
        }
    }
</script>