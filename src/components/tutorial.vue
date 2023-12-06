<template>
    <section class="tutorial">
        <h2 class="dev-text">Tutorial de criação de cadastro/login:</h2>
        <video class="video" controls>
            <source :src="video" type="video/mp4">
        </video>
    </section>
</template>

<script>
    export default {
        name: 'tutorial',
        data() {
            return {
                video: './assets/tutorial.mp4'
            }
        }
    }
</script>

<style scoped>
    .dev-text{
        margin-bottom: 30px;
    }
</style>

<style>
    :root{
        --tutorial-bg: #F5F5F5;
    }

    .tutorial{
        width: 100%;
        height: 450px;
        background-color: var(--tutorial-bg);
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 250px;
        padding: 30px 0px;
    }

    .video {
        width: 80%;
    }
</style>