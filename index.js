const canvas = document.querySelector('canvas')
const ctx = canvas.getContext("2d")

const scoreValue = document.querySelector(".score--value")
const finalScore = document.getElementById('final-score')
const menu = document.querySelector(".menu-screen")
const buttonPlay = document.querySelector(".btn-play")

const highScoreSpan = document.getElementById('highScoreSpan')

const esquerda = document.getElementById('esquerda')
const direita = document.getElementById('direita')
const cima = document.getElementById('cima')
const baixo = document.getElementById('baixo')


const audio = new Audio('audio.mp3')


//ctx.fillStyle = "red"

const size = 30
let score = 0

let snake = [
    {x: 270, y: 240},
    {x: 300, y: 240}
]

let highScore = []


const randomNumber = (min, max) => {
    return Math.round(Math.random() * (max - min) + min)
}

const randomPosition = () => {
    const number = randomNumber(0, canvas.width - size)
    return Math.round(number / 30) * 30
}

const randomColor = () =>{

    const red = randomNumber(0, 255)
    const green = randomNumber(0, 255)
    const blue = randomNumber(0, 255)

    return `rgb(${red}, ${green}, ${blue})`
}

//h1.innerHTML = randomColor()

const food = {
    x: randomPosition(),
    y: randomPosition(),
    color: randomColor()
}
 
let direction
let loopId
let diff = 200

const drawSnake = () => {
    ctx.fillStyle = "#ddd"
    snake.map((position, index) => {
        if(index == snake.length - 1){
            ctx.fillStyle = "lime"
        }
        ctx.fillRect(position.x, position.y, size, size)
    })
}

const moveSnake = () =>{
    moveSnakeByPhone()
    
    if(!direction) return

                    //pega o índice
    const head = snake[snake.length -1]
    snake.shift()

    if(direction == "right"){
        snake.push({x: head.x + size, y: head.y })
    }

    if(direction == "left"){
        snake.push({x: head.x - size, y: head.y })
    }

    if(direction == "down"){
        snake.push({x: head.x, y: head.y + size})
    }

    if(direction == "up"){
        snake.push({x: head.x, y: head.y - size})
    }
}

const moveSnakeByPhone = () => {
    
    esquerda.addEventListener('click', () => {
        if(direction !== "right"){
        direction = "left"
    }
    })

    direita.addEventListener('click', () => {
        if(direction !== "left"){
            direction = "right"
        }
    })

    cima.addEventListener('click', () => {
        if(direction !== "down"){
            direction = "up"
        }
    })

    baixo.addEventListener('click', () => {
        if(direction !== "up"){
            direction = "down"
        }
    })
}

const drawGrid = () => {
    ctx.lineWidth = 1
    ctx.strokeStyle = "#191919"
    //coordenadas de onde a linha será traçada 
    
    for(let i = size; i < canvas.width; i += size) {
        ctx.beginPath()
        ctx.lineTo(i, 0)
        ctx.lineTo(i, 600)
        ctx.stroke()

        ctx.beginPath()
        ctx.lineTo(0, i)
        ctx.lineTo(600, i)
        ctx.stroke()
    }  
}

const drawFood = () =>{

    const { x, y, color} = food

    ctx.shadowColor = color
    ctx.shadowBlur = 6
    ctx.fillStyle = color
    ctx.fillRect(x, y, size, size)
    ctx.shadowBlur = 0

}

const checkEat = () => {
    const head = snake[snake.length -1]

    if(head.x == food.x && head.y == food.y){
        //h1.innerHTML = "comeui"
        audio.play()
        snake.push(head)

        diff -= 10

        countScore()

        //h1.innerHTML = `Score: ${score}`
        
        let x = randomPosition()
        let y = randomPosition()

        while(snake.find((position) => position.x == x && position.y == y)){
            x= randomPosition()
            y= randomPosition()
        }

        food.x = x
        food.y = y
        food.color = randomColor()

    }
}

const countScore = () => {
    score++
    scoreValue.innerHTML = score
}

const checkCollision = () =>{
    const head = snake[snake.length - 1]
    
    const canvasLimitX = canvas.width - size
    const canvasLimitY = canvas.height - size

    const neckIndex = snake.length - 2

    const wallCollision =
     head.x < 0 || head.x > canvasLimitX || head.y < 0 
     || head.y > canvasLimitY

    const selfCollision = snake.find((position, index) => {
        return index < neckIndex && position.x == head.x && position.y == head.y
    })

    if(wallCollision || selfCollision){
        gameOver()
    }
}

const gameOver = () => {
    direction = undefined

    menu.style.display = "flex"
    finalScore.innerHTML = score

    canvas.style.filter = "blur(2px)"
}

const gameLoop = () => {

    clearInterval(loopId)
    
    ctx.clearRect(0, 0, 600, 600)
    drawGrid()
    drawFood()
    moveSnake()
    drawSnake()
    checkEat()
    checkCollision()

    loopId = setTimeout(() => {
        gameLoop()
    }, diff);
}

gameLoop()

document.addEventListener('keydown', (event) => {
    //console.log(event.key)

    if(event.key == "ArrowRight" && direction !== "left" ){
        direction = "right"
    }

    if(event.key == "ArrowLeft" && direction !== "right"){
        direction = "left"
    }
    
    if(event.key == "ArrowDown" && direction !== "up"){
        direction = "down"
    }
    
    if(event.key == "ArrowUp" && direction !== "down"){
        direction = "up"
    }
    // switch (event.key) {
    //     case 'ArrowRight':
    //         direction = "right"
    //         break;
    //     case 'ArrowDown':
    //         direction = "down"
    //         break;
    //     default:
    //         break;
    //}
})

buttonPlay.addEventListener('click', () => {
    highScore.push(score)
    diff = 300
    
    const newHighScore = highScore.reduce((prev, current) => {
        return prev > current ? prev : current
    })

    highScoreSpan.innerHTML = newHighScore

    score = 0
    scoreValue.innerHTML = "00"
    menu.style.display = "none"
    canvas.style.filter = "none"

    snake = [
        //initial position
        {x: 270, y: 240},
        {x: 300, y: 240}
    ]

})