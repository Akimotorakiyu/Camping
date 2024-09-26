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
  dx: number,
  dy: number,
  pieceType: EPieceType,
): number {
  const piece = board[y][x]
  if (piece.color === pieceType) {
    return 1 + count(board, x + dx, y + dy, dx, dy, pieceType)
  }
  return 0
}

const directionList = [
  {
    side1: {
      dx: 1,
      dy: 0,
    },
    side2: {
      dx: -1,
      dy: 0,
    },
  },
  {
    side1: {
      dx: 0,
      dy: 1,
    },
    side2: {
      dx: 0,
      dy: -1,
    },
  },
  {
    side1: {
      dx: 1,
      dy: 1,
    },
    side2: {
      dx: -1,
      dy: -1,
    },
  },
  {
    side1: {
      dx: -1,
      dy: 1,
    },
    side2: {
      dx: 1,
      dy: -1,
    },
  },
]

export function co(
  board: IPosition[][],
  x: number,
  y: number,
  pieceType: EPieceType,
) {
  return directionList.some(({ side1, side2 }) => {
    const piece = board[y][x]
    if (piece.color === pieceType) {
      const countNumber =
        1 +
        count(
          board,
          x + side1.dx,
          y + side1.dy,
          side1.dx,
          side1.dy,
          pieceType,
        ) +
        count(board, x + side2.dx, y + side2.dy, side2.dx, side2.dy, pieceType)
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
