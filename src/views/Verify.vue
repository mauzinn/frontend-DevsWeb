<template>
    <body>
        <headerVue />
        <codeVue />
    </body>
</template>

<script>
    import codeVue from '../components/code.vue'
    import headerVue from '../components/header.vue'

    export default {
        name: 'Verify',
        components: {
            codeVue,
            headerVue
        }
    }
</script>