<template>
  <div>
    <div>
      <h1 class="text-center text-lg m-8">五子棋 🐲 vs 🐯 争霸赛</h1>
    </div>
    <div class="container">
      <div class="board">
        <div v-for="(row, y) in board" class="row">
          <div
            v-for="(col, x) in row"
            class="coin"
            @click="setPiece(col, x, y)"
          >
            <div
              v-if="col.color !== EPieceType.empty"
              :class="`pill ${col.color}`"
            ></div>
          </div>
        </div>
      </div>
    </div>
    <div></div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'

import { genBoard, EPieceType, IPosition, positionWinCheck } from './board'

const board = ref(genBoard(15, 15))

const userColor = ref<EPieceType>(EPieceType.black)

function setPiece(col: IPosition, x: number, y: number) {
  if (col.color === EPieceType.empty) {
    col.color = userColor.value

    const win = positionWinCheck(board.value, x, y)

    console.log('win?,', win)

    switch (userColor.value) {
      case EPieceType.black:
        userColor.value = EPieceType.white
        break

      case EPieceType.white:
      default:
        userColor.value = EPieceType.black
        break
    }
  }
}

console.log(board.value)
</script>

<style lang="css">
.coin {
  width: 40px;
  height: 40px;

  position: relative;

  &::before {
    content: '';
    position: absolute;
    width: 2px;
    height: 100%;
    background-color: gray;
    left: 50%;
  }

  &::after {
    content: '';
    position: absolute;
    height: 2px;
    width: 100%;
    background-color: gray;
    top: 50%;
  }
}

.pill {
  position: absolute;
  z-index: 1;
  border-radius: 20px;
  height: 80%;
  width: 80%;
  left: 10%;
  top: 10%;
  box-shadow:
    -2px 2px 4px 0px gray,
    inset 1px 0px 4px 0px gray;
}

.white {
  background-color: azure;
}

.black {
  background-color: black;
}

.row {
  display: flex;
  justify-content: center;
}

.board {
  position: relative;
  background-color: darkseagreen;
  width: fit-content;
}

.container {
  display: flex;
  justify-content: center;
}
</style>
