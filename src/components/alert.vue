<template>
    <section class="alert" v-show="text">
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
        <h2 class="dev-text">
            <span class="material-symbols-outlined">
                notifications
            </span>
            Notificação
        </h2>
        <p>{{text}}</p>
    </section>
</template>

<script>
    export default {
        name: 'alert',
        props: {
            text: String
        }
    }
</script>

<style>
    .alert{
        background-color: rgba(55, 148, 255, 0.74);
        color: white;
        border: 1px solid rgb(0, 23, 85);
        border-radius: 10px;
        width: 340px;
        padding: 15px 20px;
        position: fixed;
        top: 10px;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        font-weight: 100;
    }

    @media (max-width: 410px) {
        .alert {
            width: 85%;
        }
    }
</style>