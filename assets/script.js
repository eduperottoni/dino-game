const dino = document.querySelector('div.dino')
const bg = document.querySelector('div.bg')
let isJumping = false;
let position = 0

const handleKeyUp = function(event){
    if (event.keyCode === 32){
        if (!isJumping){
            jump()
        }
    }
}

const handleClick = function(){
    jump()
}

const jump = function(){
    isJumping = true
    let upInterval = setInterval(()=>{
        if (position >= 150){
            clearInterval(upInterval);
            let downInterval = setInterval(() =>{
                if (position <= 0){
                    clearInterval(downInterval);
                    isJumping = false;
                }else{
                    position -= 20;
                    dino.style.bottom = position + 'px'
                }
            },20)
        } else{
            position += 20
            dino.style.bottom = position + 'px'
        }
    }, 20)
}

const createCactus = function(){
    const cactus = document.createElement('div')
    let cactusPosition = 1000
    let randomTime = Math.random() * 6000

    cactus.classList.add('cactus')
    cactus.style.left= 1000 + 'px'  
    bg.appendChild(cactus)   

    let leftInterval = setInterval(() =>{
        if(cactusPosition < -60){
            clearInterval(leftInterval)
            bg.removeChild(cactus)
        }else if (cactusPosition > 0 && cactusPosition < 60 && position < 60){
            clearInterval(leftInterval)
            document.body.innerHTML = '<h1 class="game-over">Fim de Jogo</h1>'
        }else{
            cactusPosition -= 10
            cactus.style.left = cactusPosition + 'px'
        }
    },20)

    setTimeout(createCactus, randomTime)
}

createCactus()

document.addEventListener('keydown', handleKeyUp)
document.addEventListener('click', handleClick)