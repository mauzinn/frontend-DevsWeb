<template>
    <header class="header">
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
        
        <section class="margin-header">
            <h2 class="dev-text">
                <span class="material-icons">
                developer_mode
                </span>
                DevsWeb
            </h2>

            <section>
                <h3 class="text">Um site de conversa online e gratuito.</h3>
            </section>
        </section>
    </header>
</template>

<style scoped>
    *{
        font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
        color: white;
    }

    .margin-header{
        margin-bottom: 40px;
    }
</style>

<style>
    :root {
        --header-bg: #6EA5E7;
    }

    .header{
        background-color: var(--header-bg);
        padding: 30px 10px;
    }

    .dev-text{
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        font-weight: 100;
        padding-bottom: 20px;
        display: flex;
        align-items: center;
    }

    .dev-text span{
        margin-right: 5px;
        font-size: 26px;
    }

    .text{
        text-align: center;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        font-weight: 100;
    }
</style>