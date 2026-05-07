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
        for (let i = 0; i <= 7; i++) {
            if (The_grid.length - 1 != i) {
                The_grid.push([randint(1, 7)])
            }
            for (let j = 0; j <= 7; j++) {
                if (The_grid[i].length - 1 != j) {
                    The_grid[i].push(randint(1, 3))
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
    for (let k = 0; k <= 7; k++) {
        for (let l = 0; l <= 7; l++) {
            tiles.setTileAt(tiles.getTileLocation(l + 3, k), gemlist[The_grid[k][l]])
        }
    }
}
function Rotate (col: number, row: number) {
    cba = [0, 1]
    cba = [The_grid[row + 1][col]]
    cba.push(The_grid[row][col])
    cba.push(The_grid[row][col + 1])
    cba.push(The_grid[row + 1][col + 1])
    The_grid[row][col] = cba[0]
    The_grid[row][col + 1] = cba[1]
    The_grid[row + 1][col + 1] = cba[2]
    The_grid[row + 1][col] = cba[3]
    return The_grid
}
let cba: number[] = []
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
