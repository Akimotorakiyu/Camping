<template>
  <div>
    <div>
      <h1 class="text-center text-lg m-8">吃豆子</h1>
    </div>
    <div class="board-container">
      <div
        class="board"
        tabindex="-1"
        @keypress.a="dealLeft"
        @keypress.d="dealRight"
        @keypress.w="dealUp"
        @keypress.s="dealDown"
      >
        <div v-for="(row, y) in board" class="row">
          <div v-for="(col, x) in row" class="coin">
            <div
              :class="`pill ${position[0] === x && position[1] === y ? 'white' : ''}`"
            >
              {{ col.toPrecision(4) }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="text-center text-lg m-8">
      {{ totalReward.toFixed(3) }}
    </div>
    <div v-if="isOverStatus" class="text-center text-lg m-8">over!</div>
    <div class="text-center text-lg m-8">
      <button @click="reset">reset</button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'

import {
  genBoard,
  boardSize,
  getNextState,
  getReward,
  isOver,
} from '@template/pac-board'

const totalReward = ref(0)

const board = ref(genBoard(boardSize, boardSize))

const position = ref<[number, number]>([0, 0])

function dealLeft(event: KeyboardEvent) {
  if (isOverStatus.value) {
    return
  }

  console.log('左')

  const reward = getReward(board.value, position.value, [-1, 0])

  const next = getNextState(board.value, position.value, [-1, 0])

  isOverStatus.value = isOver(board.value, next)

  position.value = next
  totalReward.value += reward

  console.log(reward, next)
}

function dealRight(event: KeyboardEvent) {
  if (isOverStatus.value) {
    return
  }

  console.log('右')
  const reward = getReward(board.value, position.value, [1, 0])

  const next = getNextState(board.value, position.value, [1, 0])
  isOverStatus.value = isOver(board.value, next)
  position.value = next
  totalReward.value += reward

  console.log(reward, next)
}

function dealDown(event: KeyboardEvent) {
  if (isOverStatus.value) {
    return
  }

  console.log('下')
  const reward = getReward(board.value, position.value, [0, 1])

  const next = getNextState(board.value, position.value, [0, 1])
  isOverStatus.value = isOver(board.value, next)
  position.value = next
  totalReward.value += reward

  console.log(reward, next)
}

function dealUp(event: KeyboardEvent) {
  if (isOverStatus.value) {
    return
  }

  console.log('上')
  const reward = getReward(board.value, position.value, [0, -1])

  const next = getNextState(board.value, position.value, [0, -1])
  isOverStatus.value = isOver(board.value, next)

  position.value = next
  totalReward.value += reward

  console.log(reward, next)
}

const isOverStatus = ref<boolean>(false)

function reset() {
  board.value = genBoard(boardSize, boardSize)

  isOverStatus.value = false
}
</script>

<style lang="css">
.coin {
  width: 100px;
  height: 100px;
  position: relative;
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
