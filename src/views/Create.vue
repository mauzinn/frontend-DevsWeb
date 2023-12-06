<template>
    <body>
        <headerVue />
        <createVue />
    </body>
</template>

<script>
    import createVue from '../components/create.vue'
    import headerVue from '../components/header.vue'

    export default {
        name: 'Create',
        components: {
            headerVue,
            createVue
        }
    }
</script>