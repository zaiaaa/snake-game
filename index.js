const canvas = document.querySelector('canvas')
const ctx = canvas.getContext("2d")

ctx.fillStyle = "red"

const size = 30

const snake = [
    {x: 200, y: 200},
    {x: 230, y: 200},
    {x: 260, y: 200},
    {x: 290, y: 200}

]
 
let direction = ""
let loopId

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

const gameLoop = () => {
    clearInterval(loopId)
    
    ctx.clearRect(0, 0, 600, 600)
    moveSnake()
    drawSnake()

    loopId = setTimeout(() => {
        gameLoop()
    }, 300);
}

gameLoop()