<template>
  <table class="board">
    <tr v-for="(row, rowIndex) in rows" class="row" :key="rowIndex">
      <td v-for="(col, colIndex) in columns" class="cell" :key="colIndex" :id="col + row" @click="onClick"/>
    </tr>
  </table>
</template>

<script>
import { times } from 'lodash';

export default {
  name: 'Board',
  props: {
    playerColor: String
  },
  methods: {
    onClick(e) {
      this.$root.$emit('cell-click', e.target.id);
    }
  },
  computed: {
    rows() {
      if(this.playerColor === 'white') {
        return times(8, i => `${8 - i}`);
      }
      return times(8, i => `${i + 1}`);
    },
    columns() {
      if(this.playerColor === 'white') {
        return times(8, i => String.fromCharCode(97 + i));
      }
      return times(8, i => String.fromCharCode(104 - i));
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.board {
  height: 760px;
  width: 760px;
  border-collapse: collapse;
  
  .row {
    .cell {
        // height: 95px;
        // width: 95px;
        background: #FFECC7;
        padding: 0;
      }

      &:nth-child(odd) {
        .cell {
          &:nth-child(odd) {
            background: #24130D;
          }
        }
      }

      &:nth-child(even) {
        .cell {
          &:nth-child(even) {
            background: #24130D;
          }
        }
      }
  }
  
}
</style>
