<template>
  <div>
    你好世界
    <div class="stage">
      <div v-for="(row, x) in stage" class="row">
        <div v-for="(col, y) in row" class="coin">
          <div
            :class="`pill ${col.color}`"
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
          ></div>
        </div>
      </div>
    </div>
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
  background-color: gray;
  margin: 2px;
}

.pill {
  border-radius: 20px;
  height: 100%;
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
  background-color: darkgray;
}
</style>
