namespace SpriteKind {
    export const Cursor = SpriteKind.create()
}
function areThereMatchedGems () {
    for (let i = 0; i <= 7; i++) {
        for (let j = 0; j <= 7; j++) {
            if (j < 6) {
                if (The_grid[i][j] == The_grid[i][j + 1]) {
                    if (The_grid[i][j] == The_grid[i][j + 2]) {
                        return true
                    }
                }
            }
            if (i < 6) {
                if (The_grid[i][j] == The_grid[i + 1][j]) {
                    if (The_grid[i][j] == The_grid[i + 2][j]) {
                        return true
                    }
                }
            }
        }
    }
    console.log("" + The_grid[0][0] + The_grid[0][1] + The_grid[0][2] + The_grid[0][3])
    return false
}
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    changecursorpos(0, -1)
})
function userSpin () {
    The_grid = Rotate(truecursorpos[0], truecursorpos[1])
    updateBoard()
}
function Reset_board () {
    latestmatchedcall = true
    while (latestmatchedcall) {
        tries += 1
        gemlist = [
        assets.tile`nothing`,
        assets.tile`blue`,
        assets.tile`red`,
        assets.tile`yellow`,
        assets.tile`orang`,
        assets.tile`whit`,
        assets.tile`ourple`,
        assets.tile`geen`
        ]
        The_grid = [[randint(1, 7)]]
        for (let k = 0; k <= 7; k++) {
            if (The_grid.length - 1 != k) {
                The_grid.push([randint(1, 7)])
            }
            for (let l = 0; l <= 7; l++) {
                if (The_grid[k].length - 1 != l) {
                    The_grid[k].push(randint(1, 7))
                }
            }
        }
        latestmatchedcall = areThereMatchedGems()
        console.log(tries)
    }
    updateBoard()
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    userSpin()
})
function changecursorpos (col: number, row: number) {
    truecursorpos = [Math.constrain(truecursorpos[0] + col, 0, 6), Math.constrain(truecursorpos[1] + row, 0, 6)]
    placeCursorOnGrid(truecursorpos[0], truecursorpos[1])
}
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    changecursorpos(-1, 0)
})
function duplicate2DList (array: number[][]) {
    clone = [[0]]
    for (let index = 0; index <= array.length - 1; index++) {
        if (index == 0) {
            clone[index] = []
        } else {
            clone.push([])
        }
        for (let j = 0; j <= array[index].length - 1; j++) {
            if (clone[index].length - 1 < array[index].length - 1) {
                clone[index].push(array[index][j])
            } else {
                clone[index][j] = array[index][j]
            }
        }
    }
    return clone
}
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    changecursorpos(1, 0)
})
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    changecursorpos(0, 1)
})
function placeCursorOnGrid (col: number, row: number) {
    tiles.placeOnTile(mySprite, tiles.getTileLocation(col + 3, row))
    mySprite.x += 8
    mySprite.y += 8
}
function updateBoard () {
    for (let m = 0; m <= 7; m++) {
        for (let n = 0; n <= 7; n++) {
            tiles.setTileAt(tiles.getTileLocation(n + 3, m), gemlist[The_grid[m][n]])
        }
    }
}
function Rotate (col: number, row: number) {
    dupedgrid = duplicate2DList(The_grid)
    cba = [0, 1]
    cba = [dupedgrid[row + 1][col]]
    cba.push(dupedgrid[row][col])
    cba.push(dupedgrid[row][col + 1])
    cba.push(dupedgrid[row + 1][col + 1])
    dupedgrid[row][col] = cba[0]
    dupedgrid[row][col + 1] = cba[1]
    dupedgrid[row + 1][col + 1] = cba[2]
    dupedgrid[row + 1][col] = cba[3]
    return dupedgrid
}
let cba: number[] = []
let dupedgrid: number[][] = []
let clone: number[][] = []
let gemlist: Image[] = []
let tries = 0
let latestmatchedcall = false
let truecursorpos: number[] = []
let mySprite: Sprite = null
let The_grid: number[][] = []
namespace userconfig { export const ARCADE_SCREEN_WIDTH = 176; export const ARCADE_SCREEN_HEIGHT = 128; }
The_grid = [[randint(1, 7)]]
tiles.setCurrentTilemap(tilemap`level`)
Reset_board()
mySprite = sprites.create(assets.image`circlesimple`, SpriteKind.Cursor)
placeCursorOnGrid(0, 0)
truecursorpos = [0, 0]
scene.setBackgroundColor(13)
