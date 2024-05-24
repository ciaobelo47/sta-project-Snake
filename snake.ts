class Snake {
    nome: String = "Gino®"
    lista: Array<Array<number>>
    direzione: Direzione = Direzione.RIGHT

    constructor(x: number, y: number) {
        this.lista = [[x, y]]
    }

    /**
     * Metodo che muove il serpente
     */
    move(eaten: Boolean) {
        let tmpLista: Array<Array<number>> = []
        
        // Calcolo la posizione della nuova testa
        if (this.direzione == Direzione.RIGHT) {
            tmpLista.push([this.lista[0][0] + 1, this.lista[0][1]])
        } else if (this.direzione == Direzione.DOWN) {
            tmpLista.push([this.lista[0][0], this.lista[0][1] + 1])
        } else if (this.direzione == Direzione.LEFT) {
            tmpLista.push([this.lista[0][0] - 1, this.lista[0][1]])
        } else if (this.direzione == Direzione.UP) {
            tmpLista.push([this.lista[0][0], this.lista[0][1] - 1])
        }

        // Muovo le posizioni precedenti contando anche se il serpente ha mangiato
        let n = 0
        if (eaten) {
            n = this.lista.length
            rndFoodPos()
        } else {
            n = this.lista.length - 1
        }

        for (let i = 0; i < n; i++) {
            tmpLista.push(this.lista[i])
        }
        
        this.lista = tmpLista
    }

    /**
     * Metodo che mostra a schermo il serpente
     */
    paint() {
        basic.clearScreen()
        this.lista.forEach(point => led.plot(point[0],point[1]))
    }

    x(): number {
        return this.lista[0][0]
    }

    y(): number {
        return this.lista[0][1]
    }

    direction(): Direzione {
        return this.direzione
    }

    setDirection(d: Direzione) {
        this.direzione = d
    }

}
