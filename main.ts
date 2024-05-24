let playing = false
let snake = new Snake(0, 0)
let food = [0, 0]
let score = 0
let loading = false

/**
 * Funzione dedicata al funzionamento generale del gioco
 */
function playGame() {
    playing = true
    rndFoodPos()
    while (playing) {
        // se il serpente tocca il muro, muore; altrimenti controllo se mangia
        if (snake.x() > 4 || snake.y() > 4 || snake.x() < 0 || snake.y() < 0) {
            gameOver()
        } else {
            if (snake.lista[0][0] == food[0] && snake.lista[0][1] == food[1]) {
                snake.move(true)
                snake.paint()
                led.plot(food[0], food[1])
            } else {
                snake.move(false)
                snake.paint()
                led.plot(food[0], food[1])
                console.log(food)
            }
        }
        basic.pause(500)
    }
}

/**
 * Funzione usata per eseguire il gioco quando si premono i pulsanti A+B insieme
 */
input.onButtonPressed(Button.AB, () => {
    if (loading) {
        return
    } else {
        playGame()
    }
})

/**
 * Funzione usata per far muovere il serpente a destra calcolato sulla Direzione attuale
 */
input.onButtonPressed(Button.A, () => {
    if (snake.direction() == Direzione.RIGHT) {
        snake.setDirection(Direzione.UP)
    } else if (snake.direction() == Direzione.DOWN) {
        snake.setDirection(Direzione.LEFT)
    } else if (snake.direction() == Direzione.LEFT) {
        snake.setDirection(Direzione.DOWN)
    } else if (snake.direction() == Direzione.UP) {
        snake.setDirection(Direzione.LEFT)
    }

})

/**
 * Funzione usata per far muovere il serpente a destra calcolato sulla Direzione attuale
 */
input.onButtonPressed(Button.B, () => {
    if (snake.direction() == Direzione.RIGHT) {
        snake.setDirection(Direzione.DOWN)
    } else if (snake.direction() == Direzione.DOWN) {
        snake.setDirection(Direzione.RIGHT)
    } else if (snake.direction() == Direzione.LEFT) {
        snake.setDirection(Direzione.UP)
    } else if (snake.direction() == Direzione.UP) {
        snake.setDirection(Direzione.RIGHT)
    }
})

/**
 * Funzione usata per far vedere il caricamento del gioco
 */
function loadingGame() {
    loading = true
    while (loading) {
        let indice3;
        let indice4;
        for (let indice = 0; indice <= 4; indice++) {
            led.plot(indice, 0)
            basic.pause(200)
        }
        for (let indice2 = 0; indice2 <= 4; indice2++) {
            led.plot(4, indice2)
            basic.pause(200)
        }
        indice3 = 4
        for (let index = 0; index <= 4; index++) {
            led.plot(indice3, 4)
            indice3 += -1
            basic.pause(200)
        }
        indice4 = 4
        for (let index2 = 0; index2 <= 4; index2++) {
            led.plot(0, indice4)
            indice4 += -1
            basic.pause(200)
        }
        for (let indice5 = 0; indice5 <= 3; indice5++) {
            led.plot(indice5, 1)
            basic.pause(200)
        }
        for (let indice6 = 0; indice6 <= 3; indice6++) {
            led.plot(3, indice6)
            basic.pause(200)
        }
        led.plot(2, 3)
        basic.pause(200)
        led.plot(1, 3)
        basic.pause(200)
        led.plot(1, 2)
        basic.pause(200)
        led.plot(2, 2)
        basic.pause(200)
        for (let index = 0; index < 2; index++) {
            basic.showLeds(`
            . . . . .
            . . . . .
            . . . . .
            . . . . .
            . . . . .
            `)
            basic.pause(200)
            basic.showLeds(`
            # # # # #
            # # # # #
            # # # # #
            # # # # #
            # # # # #
            `)
        }
        basic.clearScreen()
        loading = false
    }

}

function gameOver() {
    basic.clearScreen()
    playing = false
    basic.showString("Game Over")
}

/**
 * Funzione usata per far apparire randomicamente il cibo
 */
function rndFoodPos() {
    food = [randint(0, 4), randint(0, 4)]
    // controllo che il cibo non si generi sopra ai pixel del serpente
    snake.lista.forEach(point => {
        if (food[0] == point[0] && food[1] == point[1]) {
            food = [randint(0, 4), randint(0, 4)]
            led.plot(food[0], food[1])
        } else {
            led.plot(food[0], food[1])
        }
    })

}

loadingGame()
