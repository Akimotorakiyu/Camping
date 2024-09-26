<template>
  <div>
    <div>
      <h1 class="text-center text-lg m-8">五子棋 🐲 vs 🐯 争霸赛</h1>
    </div>
    <div class="container">
      <div class="stage">
        <div v-for="(row, x) in stage" class="row">
          <div
            v-for="(col, y) in row"
            class="coin"
            @click="
              () => {
                if (col.color === ECoin.empty) {
                  col.color = ECoin.white
                } else if (col.color === ECoin.white) {
                  col.color = ECoin.black
                } else {
                  col.color = ECoin.empty
                }
              }
            "
          >
            <div
              v-if="col.color !== ECoin.empty"
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

enum ECoin {
  'black' = 'black',
  'white' = 'white',
  'empty' = 'empty',
}

interface IPosition {
  color: ECoin
}

function genStage(x: number, y: number) {
  const stage: IPosition[][] = []

  for (let index = 0; index < x; index++) {
    const row: IPosition[] = []
    for (let index = 0; index < y; index++) {
      row.push({
        color: ECoin.empty,
      })
    }
    stage.push(row)
  }

  return stage
}

const stage = ref(genStage(15, 15))

console.log(stage.value)
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

.stage {
  position: relative;
  background-color: darkseagreen;
  width: fit-content;
}

.container {
  display: flex;
  justify-content: center;
}
</style>
