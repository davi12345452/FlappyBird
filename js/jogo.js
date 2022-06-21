/* Função adiciona uma tag com classe dentro do html.*/

function newElement(tagName, className) {
    const elem = document.createElement(tagName)
    elem.className = className
    return elem
}

/* Função que cria uma barreira, usa reverse como parâmetro
   para determinar se está ou não virada. */

function Barreira(reverse = false){
    this.elemento = newElement('div', 'barreira')
    const borda = newElement('div', 'borda')
    const corpo = newElement('div', 'corpo')
    this.elemento.appendChild(reverse ? corpo : borda)
    this.elemento.appendChild(reverse ? borda : corpo)

    /*Alterar altura da barreria */
    this.setAltura = altura => corpo.style.height = `${altura}px`
}

//const b = new Barreira(false)
//b.setAltura(200)
//document.querySelector('[tag-jogo]').appendChild(b.elemento)

/* Criando o par de barreiras com this, pois precisarei usar
   os elementos ali dentro depois, fora da função para calcu
   lar colisão */

function Barreiras(altura, abertura, x){
    this.elemento = newElement('div', 'barreiras')
    this.superior = new Barreira(true)
    this.inferior = new Barreira()

    this.elemento.appendChild(this.superior.elemento)
    this.elemento.appendChild(this.inferior.elemento)

    /* Sorteando a abertura, onde irá estar o par de barreiras */

    this.sortearAbertura = () => {
        const altSuperior = Math.random() * (altura - abertura)
        const altInferior = altura - abertura - altSuperior
        this.superior.setAltura(altSuperior)
        this.inferior.setAltura(altInferior)
    }

    this.getX = () => parseInt(this.elemento.style.left.split('px')[0])
    this.setX = (x) => this.elemento.style.left = `${x}px`
    this.getLargura = () => this.elemento.clientWidth

    this.sortearAbertura()
    this.setX(x)
}

const b = new Barreiras(500, 100, 700)
document.querySelector('[tag-jogo]').appendChild(b.elemento)
