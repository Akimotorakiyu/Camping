export enum EPieceType {
  'black' = 'black',
  'white' = 'white',
  'empty' = 'empty',
}

export interface IPosition {
  color: EPieceType
}

export function genBoard(x: number, y: number) {
  const board: IPosition[][] = []

  for (let index = 0; index < x; index++) {
    const row: IPosition[] = []
    for (let index = 0; index < y; index++) {
      row.push({
        color: EPieceType.empty,
      })
    }
    board.push(row)
  }

  return board
}

export function count(
  board: IPosition[][],
  x: number,
  y: number,
  [dx, dy]: [number, number],
  pieceType: EPieceType,
): number {
  const piece = board[y][x]
  if (piece.color === pieceType) {
    return 1 + count(board, x + dx, y + dy, [dx, dy], pieceType)
  }
  return 0
}

const directions = [
  [1, 0],
  [1, 1],
  [0, 1],
  [-1, 1],
]

export function co(
  board: IPosition[][],
  x: number,
  y: number,
  pieceType: EPieceType,
) {
  return directions.some(([dx, dy]) => {
    const [inversDx, inversDy] = [dx * -1, dy * -1]
    const piece = board[y][x]
    if (piece.color === pieceType) {
      const countNumber =
        1 +
        count(board, x + dx, y + dy, [dx, dy], pieceType) +
        count(
          board,
          x + inversDx,
          y + inversDy,
          [inversDx, inversDy],
          pieceType,
        )
      if (countNumber >= 5) {
        return true
      }
      return false
    }
  })
}

export function positionWinCheck(board: IPosition[][], x: number, y: number) {
  const piece = board[y][x]

  return co(board, x, y, piece.color)
}
