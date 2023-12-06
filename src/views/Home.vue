<template>
    <body>
        <headerVue />
        <authenticationVue />   
        <menuVue /> 
    </body>
</template>

<script>
    import authenticationVue from '../components/authentication.vue'
    import headerVue from '../components/header.vue'

    export default {
        name: 'Home',
        components: {
            headerVue,
            authenticationVue
        }
    }
</script>