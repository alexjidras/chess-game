<template>
  <div
    :style="style + `${playerColor !== color ? 'pointer-events: none;' : ''}`"
    :class="['piece', selected]"
    v-html="content"
    @click="onPieceClick"
  />
</template>

<script>
import { pieceCodes } from '../utils';

export default {
    name: 'Piece',
    props: {
        color: String,
        position: String,
        selected: Boolean,
        playerColor: String
    },
    data: function() {
        return {
            content: this.getPieceContent()
        }
    },
    computed: {
        style: function() {
            if (this.position === null) {
                return 'opacity: 0;';
            }
            const [col, row] = this.position.split('');
            let x, y;

            if (this.playerColor === 'white') {
                x = (col.charCodeAt(0) - 97) * 95;
                y = (8 - row) * 95;
            } else {
                x = (7 - (col.charCodeAt(0) - 97)) * 95;
                y = (row - 1) * 95;
            }
            return `left:${x}px;top:${y}px;`;
        }
    },
    methods: {
        getPieceContent() {
            const [col, row] = this.position.split('');
            let content;
            if (row === '2' || row === '7') {
                content = `&#${pieceCodes[this.color].PAWN};`;
            } else {
                switch(col) {
                    case 'a':
                    case 'h': content = `&#${pieceCodes[this.color].ROOK};`; break;
                    case 'b':
                    case 'g': content = `&#${pieceCodes[this.color].KNIGHT};`; break;
                    case 'c':
                    case 'f': content = `&#${pieceCodes[this.color].BISHOP};`; break;
                    case 'd': content = `&#${pieceCodes[this.color].QUEEN};`; break;
                    case 'e': content = `&#${pieceCodes[this.color].KING};`; break;
                }
            }
            return content;
        },
        onPieceClick(e) {
            if (this.color === this.playerColor) {
                e.stopPropagation();
                this.$emit('select-piece', this.position);
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.piece {
    position: absolute;
    font-size: 50px;
    line-height: 95px;
    width: 95px;
    height: 95px;
    transition: all 0.5s linear;

    &.selected {
        background: #9BDDEA;
    }
}
</style>