<template>
  <div class="menu main-menu">
    <p class="heading">Choose color</p>
    <div>
    <button class="action-button white-button" @click="$emit('color-choose', 'white')">
        White
        <i class="fas icon fa-chess-rook"></i>
    </button>
    <button class="action-button black-button" @click="$emit('color-choose', 'black')">
        Black
        <i class="fas icon fa-chess-rook"></i>
    </button>
    </div>
  </div>
</template>

<script>
export default {
    name: 'ColorChooseMenu'
}
</script>

<style lang="scss" scoped>
.menu {
    width: 440px;
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

    .icon {
        font-size: 20px;
        margin-left: 5px;
    }

    .heading {
        font-size: 24px;
        font-weight: bold;
        font-family: Arial, sans-serif;
        margin-top: 0px;
        margin-bottom: 30px;
    }

    .action-button {
        font-family: Arial, sans-serif;
        width: 200px;
        //border: 2px solid #000;
        color: #000;
        //#24130D
        font-weight: bold;
        padding: 20px;
        font-size: 24px;
        border-radius: 5px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        background: transparent;

        &:focus {
            outline: none;
        }

        &.white-button {
            color: #fff;
        }

        &:hover {
            // color: #fff;
            background: #c88168;
        }
    }
}
</style>