export enum EDirection {
  'STAY' = 0,
  'INCREASE' = 1,
  'DECREASE' = -1,
}

export function getReward(
  mockBoard: number[][],
  [x, y]: [number, number],
  [dx, dy]: [EDirection, EDirection],
) {
  const r = mockBoard[x + dx]?.[y + dy] ?? -0.1
  return r
}

function valueInRange(min: number, mid: number, max: number) {
  return Math.min(Math.max(min, mid), max)
}

export function isOver(mockBoard: number[][], [x, y]: [number, number]) {
  const yLength = mockBoard.length ?? 0
  const xLength = mockBoard[0]?.length ?? 0

  const over = yLength - 1 === y && xLength - 1 === x
  console.log(over)

  return over
}

export function getNextState(
  mockBoard: number[][],
  [x, y]: [number, number],
  [dx, dy]: [EDirection, EDirection],
): [number, number] {
  const yLength = mockBoard.length ?? 0
  const xLength = mockBoard[0]?.length ?? 0

  return [
    valueInRange(0, x + dx, xLength - 1),
    valueInRange(0, y + dy, yLength - 1),
  ]
}

export function genBoard(x: number, y: number) {
  const board: number[][] = []

  for (let index = 0; index < x; index++) {
    const row: number[] = []
    for (let index = 0; index < y; index++) {
      row.push(Math.random())
    }
    board.push(row)
  }

  return board
}

export const boardSize = 2
