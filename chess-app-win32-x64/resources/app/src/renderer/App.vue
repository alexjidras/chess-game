<template>
  <div id="app">
    <Board :playerColor="playerColor"/>
    <MainMenu v-if="!gameStatus" @start="startGame" @exit="exitGame"/>
    <ColorChooseMenu v-else-if="!playerColor" @color-choose="setPlayerColor"/>
    <EndGameMenu v-else-if="gameStatus === 'FINISHED'" :isWin="isWin" @restart="restartGame" @main-menu="resetGame"/>
    <PauseMenu v-else-if="gameStatus === 'PAUSED'" @continue="continueGame" @restart="restartGame" @main-menu="resetGame"/>
    <Pieces v-if="gameStatus && playerColor" :playerColor="playerColor"/>
  </div>
</template>

<script>
import Board from './components/Board.vue';
import Pieces from './components/Pieces.vue';
import MainMenu from './components/menu/Main.vue';
import ColorChooseMenu from './components/menu/ColorChoose.vue';
import EndGameMenu from './components/menu/EndGame.vue';
import PauseMenu from './components/menu/Pause.vue';

export default {
  name: 'App',
  components: {
    Board,
    Pieces,
    MainMenu,
    ColorChooseMenu,
    EndGameMenu,
    PauseMenu
  },
  data() {
    return {
      gameStatus: null,
      playerColor: null,
      winner: null
    }
  },
  computed: {
    isWin() {
      return this.playerColor === this.winner;
    }
  },
  created() {
    document.addEventListener('keydown', this.onEscape, true);
    ipcRenderer.on('game-events', (_, event, ...args) => {
      if(event === 'WIN') {
        this.gameStatus = 'FINISHED';
        this.winner = args[0];
      }
    });
  },
  destroyed() {
    document.removeEventListener('keydown', this.onEscape);
  },
  methods: {
    startGame() {
      this.gameStatus = 'STARTED';
      ipcRenderer.send('game-events', 'START');
    },
    exitGame() {
      ipcRenderer.send('app-events', 'EXIT');
    },
    setPlayerColor(color) {
      this.playerColor = color;
      const colorCode = this.playerColor === 'white' ? '1' : '2';
      ipcRenderer.send('game-events', 'COLOR_CHOOSE', colorCode);
    },
    continueGame() {
      this.gameStatus = 'STARTED';
    },
    restartGame() {
      this.gameStatus = 'STARTED';
      this.$root.$emit('reset-pieces');
      const colorCode = this.playerColor === 'white' ? '1' : '2';
      ipcRenderer.send('game-events', 'RESTART', colorCode);
    },
    resetGame() {
      this.gameStatus = null;
      this.playerColor = null;
      this.winner = null;
      ipcRenderer.send('game-events', 'STOP');
    },
    onEscape(e) {
      if(e.code === 'Escape') {
        if (this.gameStatus === 'STARTED' && this.playerColor) {
          this.gameStatus = 'PAUSED';
        } else if (this.gameStatus === 'PAUSED') {
          this.gameStatus = 'STARTED';
        }
      }
    }
  }
}
</script>

<style lang="scss">
body {
  margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  width: 100vw;
  height: 100vh;
}
</style>
