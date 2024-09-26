<template>
  <div>
    <div>
      <h1 class="text-center text-lg m-8">五子棋 🐲 vs 🐯 争霸赛</h1>
    </div>
    <div class="board-container">
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
    <div v-if="isWin" class="text-center text-lg m-8">{{ userColor }} win!</div>
    <div class="text-center text-lg m-8">
      <button @click="reset">reset</button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'

import {
  genBoard,
  EPieceType,
  IPosition,
  positionWinCheck,
} from '@template/gobang-board'

const board = ref(genBoard(15, 15))

const userColor = ref<EPieceType>(EPieceType.black)
const isWin = ref<boolean>(false)

function reset() {
  board.value = genBoard(15, 15)

  userColor.value = EPieceType.black
  isWin.value = false
}

function setPiece(col: IPosition, x: number, y: number) {
  if (isWin.value) {
    return
  }
  if (col.color === EPieceType.empty) {
    col.color = userColor.value

    const win = positionWinCheck(board.value, x, y)
    if (win) {
      isWin.value = win
      return
    }

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

.board-container {
  display: flex;
  justify-content: center;
}
</style>
