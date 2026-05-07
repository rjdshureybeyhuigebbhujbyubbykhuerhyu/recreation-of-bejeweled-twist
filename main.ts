namespace SpriteKind {
    export const Cursor = SpriteKind.create()
}
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    changecursorpos(0, -1)
})
function Reset_board () {
    The_grid = [[randint(1, 7)]]
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
    for (let i = 0; i <= 7; i++) {
        if (The_grid.length - 1 != i) {
            The_grid.push([randint(1, 7)])
        }
        for (let j = 0; j <= 7; j++) {
            if (The_grid[i].length - 1 != j) {
                The_grid[i].push(randint(1, 7))
            }
        }
    }
    updateBoard()
}
function changecursorpos (col: number, row: number) {
    truecursorpos = [Math.constrain(truecursorpos[0] + col, 0, 7), Math.constrain(truecursorpos[1] + row, 0, 7)]
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
let gemlist: Image[] = []
let The_grid: number[][] = []
let truecursorpos: number[] = []
let mySprite: Sprite = null
namespace userconfig { export const ARCADE_SCREEN_WIDTH = 176; export const ARCADE_SCREEN_HEIGHT = 128; }
tiles.setCurrentTilemap(tilemap`level`)
Reset_board()
mySprite = sprites.create(assets.image`circlesimple`, SpriteKind.Cursor)
placeCursorOnGrid(0, 0)
truecursorpos = [0, 0]
scene.setBackgroundColor(13)
