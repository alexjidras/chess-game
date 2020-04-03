<template>
  <div class="menu main-menu">
    <p class="heading win-message" v-if="isWin">You won! 🎉</p>
    <p class="heading lose-message" v-else>You lost 😓</p>
    <button class="action-button" style="margin-bottom: 25px;" @click="$emit('restart')">
        Restart
        <i class="fas icon fa-undo-alt"></i>
    </button>
    <button class="action-button" @click="$emit('main-menu')">
        Main menu
        <i class="fas icon fa-bars"></i>
    </button>
  </div>
</template>

<script>
export default {
    name: 'EndGameMenu',
    props: {
        isWin: Boolean
    }
}
</script>

<style lang="scss" scoped>
.menu {
    width: 400px;
    // text-align: center;
    padding: 50px 0;
    background: #f1e7d4;
    border-radius: 5px;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    margin: 0 auto;
    left: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: #222 0 0 5px;
    z-index: 1;

    .icon {
        font-size: 20px;
        margin-left: 15px;
    }

    .heading {
        font-size: 24px;
        font-weight: bold;
        font-family: Arial, sans-serif;
        margin-top: 0px;
        margin-bottom: 30px;
    }

    .win-message {
        color: rgb(58, 219, 23);
    }

    .lose-message {
        color: red;
    }

    .action-button {
        font-family: Arial, sans-serif;
        width: 220px;
        border: 2px solid #894831;
        color: #894831;
        background: transparent;
        //#24130D
        font-weight: bold;
        padding: 20px;
        font-size: 24px;
        border-radius: 5px;
        display: inline-flex;
        align-items: center;
        justify-content: center;

        &:focus {
            outline: none;
        }

        &:hover {
            color: #fff;
            background: #894831;
        }
    }
}
</style>