const html = document.querySelector('html')
const focoBt = document.querySelector('.app__card-button--foco')
const curtoBt = document.querySelector('.app__card-button--curto')
const longoBt = document.querySelector('.app__card-button--longo')
const banner = document.querySelector('.app__image')
const titulo = document.querySelector('.app__title')
const botoes = document.querySelectorAll('.app__card-button')
const startPauseBt = document.querySelector('#start-pause')
const musicaFocoImput = document.querySelector('#alternar-musica')
const iniciarOuPausarBt = document.querySelector('#start-pause span')
const iniciarOuPausarBtIcone = document.querySelector('#start-pause img')
const tempoNaTela = document.querySelector('#timer') 

const musica = new Audio('/sons/luna-rise-part-one.mp3')
const mplay = new Audio('/sons/play.wav')
const mpause = new Audio('/sons/pause.mp3')
const beep = new Audio('/sons/beep.mp3')

let tempoDecorridosEmSegundo = 1500 
let intervaloId = null

musica.loop = true

musicaFocoImput.addEventListener('change', () => {
    if (musica.paused) {
        musica.play()
    } else {
        musica.pause()
    }
})

focoBt.addEventListener('click', () => {
    tempoDecorridosEmSegundo = 1500
    alterarContexto('foco')
    focoBt.classList.add('active')
})

curtoBt.addEventListener('click', () => {
    tempoDecorridosEmSegundo = 300
    alterarContexto('descanso-curto')
    curtoBt.classList.add('active')
})

longoBt.addEventListener('click', () => {
    tempoDecorridosEmSegundo = 900
    alterarContexto('descanso-longo')
    longoBt.classList.add('active')
})

function alterarContexto(contexto) {
    mostrarTempo ()
    botoes.forEach(function (botao) {  
        botao.classList.remove('active')
    })
    html.setAttribute('data-contexto', contexto)
    banner.setAttribute('src', `/imagens/${contexto}.png`)
    switch (contexto) {
        case "foco":
            titulo.innerHTML = `
            Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>
            `
            break;
        case "descanso-curto":
            titulo.innerHTML = `
            Que tal dar uma respirada? <strong class="app__title-strong">Faça uma pausa curta!</strong>
            `
            break;
        case "descanso-longo":
            titulo.innerHTML = `
            Hora de voltar à superfície.<strong class="app__title-strong"> Faça uma pausa longa.</strong>
            `
            break; 
        default:
            break;
    }
}

const contagemRegressiva = () => {
    if (tempoDecorridosEmSegundo <= 0) {
        beep.play()  
        alert('intervalo')
        zerar()
        return
    }
    tempoDecorridosEmSegundo -= 1
    mostrarTempo ()
}

startPauseBt.addEventListener('click', iniciarOuPausar)

function iniciarOuPausar() {
    if (intervaloId) {
        mpause.play()  
        zerar()
        return
    }
    mplay.play()
    intervaloId = setInterval(contagemRegressiva, 1000)
    iniciarOuPausarBtIcone.setAttribute('src', `/imagens/pause.png`)
    iniciarOuPausarBt.textContent = "pausar"
}

function zerar() {
    clearInterval(intervaloId)
    iniciarOuPausarBt.textContent = "começar"
    iniciarOuPausarBtIcone.setAttribute('src', `/imagens/play_arrow.png`)
    intervaloId = null
}

function mostrarTempo () {
    const tempo = new Date (tempoDecorridosEmSegundo *1000)
    const tempoFormatado = tempo.toLocaleTimeString('pt-Br', {minute: '2-digit', second: '2-digit'})
    tempoNaTela.innerHTML = `${tempoFormatado}`
}

mostrarTempo()
