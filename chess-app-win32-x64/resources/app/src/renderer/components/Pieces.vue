<template>
  <div class="pieces">
      <template v-for="(colorPositions, color) in positions">
          <keep-alive v-for="position in colorPositions" :key="position">
            <Piece
                :position="position"
                :color="color"
                :selected="selectedPiece === position"
                :playerColor="playerColor"
                @select-piece="selectedPiece = $event"
            />
        </keep-alive>
      </template>
  </div>
</template>

<script>
import Piece from './Piece.vue';

export default {
    name: 'Pieces',
    data() {
        console.log('data')
        return {
            positions: this.getDefaultPositions(),
            selectedPiece: null,
            playerMoveTimer: null
        }
    },
    props: {
        playerColor: String
    },
    components: {
        Piece
    },
    methods: {
        getDefaultPositions() {
            const positions = {
                black: [],
                white: []
            };

            for (let i = 1; i < 3; i++) {
                for (let j = 97; j < 105; j++) {
                    positions.white.push(`${String.fromCharCode(j)}${i}`)
                }
            }

            for (let i = 7; i < 9; i++) {
                for (let j = 97; j < 105; j++) {
                    positions.black.push(`${String.fromCharCode(j)}${i}`)
                }
            }

            return positions;
        },
        move(move, color1) {
            const color2 = color1 === 'white' ? 'black' : 'white';
            const pos1 = move.slice(0, 2);
            const pos2 = move.slice(2);

            const pos1Index = this.positions[color1].indexOf(pos1);
            if (pos1Index === -1) {
                console.error(new Error(`${pos1} not found in ${color1} positions`));
                return;
            }
            this.$set(this.positions[color1], pos1Index, pos2); 
            
            const pos2Index = this.positions[color2].indexOf(pos2);
            if (pos2Index !== -1) {
                setTimeout(() => this.$set(this.positions[color2], pos2Index, null), 400); 
            }
        },
        computerMove(move) {
            setTimeout(() => this.move(move, this.computerColor), 550);
        },
        playerMove(move) {
            ipcRenderer.send('game-events', 'MOVE', move);
            this.playerMoveTimer = setTimeout(() => {
                this.selectedPiece = null;
                this.move(move, this.playerColor);
            }, 50);
        }
    },
    computed: {
        computerColor() {
            if (this.playerColor === 'black') {
                return 'white';
            }
            return 'black';
        }
    },
    created() {
        ipcRenderer.on('game-events', (_, event, ...args) => {
            console.log(event, args);
            if(event === 'MOVE') {
                this.computerMove(args[0]);
            } else if(event === 'ILLEGAL_MOVE') {
                clearTimeout(this.playerMoveTimer);
                alert('Illegal move')
            }
        });
        this.$root.$on('cell-click', targetCell => {
            console.log(targetCell)
            if (this.selectedPiece) {
                this.playerMove(`${this.selectedPiece}${targetCell}`);
            }
        });
        this.$root.$on('reset-pieces', () => {
            clearTimeout(this.playerMoveTimer);
            this.positions = this.getDefaultPositions();
            this.selectedPiece = null;
        })
    }
}
</script>

<style>
.pieces {
    position: absolute;
    top:0;
}
</style>