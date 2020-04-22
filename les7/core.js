var FIELD_WIDTH = 20
var FIELD_HEIGHT = 20
var START = false
var KEYS_VAL = {
  38: 'y+',
  40: 'y-',
  37: 'x-',
  39: 'x+',
}
var XY = { x: 0, y: 1 }
var snake // Тело змеи
var obstacles // Спикос клеток с препятствиями
var direct // Направление
var ate = null // Съел
var foodCell // Ячейка с едой
var oldTail // Старое значение хвоста
var snake_timer // Таймер змейки
var food_timer // Таймер для еды
var obst_timer // Таймер для препятствий
var obstCls_timer // Таймер для очистки препятствий
var score // Счёт
var scoreId = document.getElementById('score')

function init() {
  score = 0
  scoreId.innerText = score
  ate = null
  obstacles = []
  snake = []
  direct = 'y+'
}

function fieldGenerator() {
  // Генерируем чистое поле
  var snakeField = document.querySelector('#snake')
  snakeField.innerHTML = ''
  var table = document.createElement('table')
  var tbody = document.createElement('tbody')
  table.append(tbody)
  snakeField.append(table)
  for (var i = FIELD_WIDTH; i > 0; i--) {
    var row = tbody.insertRow()
    for (var j = 1; j <= FIELD_HEIGHT; j++) {
      var cell = row.insertCell()
      cell.id = `${j};${i}`
    }
  }
  var midW = parseInt(FIELD_WIDTH / 2)
  var midH = parseInt(FIELD_HEIGHT / 2)
  snake = [`${cellX(midW)};${cellY(midH)}`, `${cellX(midW)};${cellY(midH - 1)}`]
  snakeDraw()
}

function snakeDraw() {
  // Рисуем змею
  for (var i in snake) {
    var cell = document.getElementById(snake[i])
    cell.classList.add('snake-body')
  }
}

function snakeMove(newCell) {
  // Смещение змеи. Удаляем хвост, смещаем голову
  if (oldTail) {
    score += 1
    scoreId.innerText = score
    snake.push(oldTail)
    oldTail = null
  }
  var cellTailId = document.getElementById(snake[snake.length - 1])
  var newCellId = document.getElementById(newCell)
  cellTailId.classList.remove('snake-body')
  newCellId.classList.add('snake-body')
  snake = snake.splice(-1).concat(snake)
  snake[0] = newCell
  if (snake[snake.length - 1] == foodCell) {
    ate = true
    var foodCellId = document.getElementById(foodCell)
    foodCellId.classList.remove('food')
    oldTail = foodCell
    foodCell = null
  }
}

function checkCollision(cell) {
  // Проверка на столкновение с препятствием или со своим телом
  if (obstacles.indexOf(cell) > -1 || snake.indexOf(cell) > -1) {
    for (var i in snake) {
      var cell = document.getElementById(snake[i])
      cell.classList.add('blink1')
    }
    return true
  } else {
    return false
  }
}

function cellY(col) {
  if (col == FIELD_HEIGHT || col == 0) {
    return FIELD_HEIGHT
  } else {
    return col % FIELD_HEIGHT
  }
}

function cellX(row) {
  if (row == FIELD_WIDTH || row == 0) {
    return FIELD_WIDTH
  } else {
    return row % FIELD_WIDTH
  }
}

function createListeners() {
  document.onkeydown = function (e) {
    var key = KEYS_VAL[e.keyCode]
    if (key && key[0] != direct[0]) {
      direct = key
      console.log(key)
    }
  }
}

function runGame() {
  if (!START) return
  var h = snake[0].split(';') // "10;8" -> ["10", "8"] direct = "y+"
  var val = eval(`${h[XY[direct[0]]]} ${direct[1]} 1`)
  val = direct[0] == 'x' ? cellX(val) : cellY(val)
  h[XY[direct[0]]] = val
  var newCell = h.join(';')
  if (checkCollision(newCell)) {
    START = false
    clearInterval(snake_timer)
    clearInterval(food_timer)
    init()
    setTimeout(fieldGenerator, 3000)
    return
  }
  snakeMove(newCell)
}

function food() {
  if (ate == false) return
  var foodGen = true
  while (foodGen) {
    var xRand = parseInt(Math.random() * (FIELD_WIDTH - 1) + 1)
    var yRand = parseInt(Math.random() * (FIELD_HEIGHT - 1) + 1)
    foodCell = [xRand, yRand].join(';')
    var busy = [].concat(snake, obstacles)
    if (busy.indexOf(foodCell) == -1) foodGen = false
  }
  var foodCellId = document.getElementById(foodCell)
  foodCellId.className = 'food'
  ate = false
}

function genObst() {
  // Генератор препятствий
  if (obstacles.length > 0) return
  var obstGen = true
  while (obstGen) {
    var x1 = parseInt(Math.random() * (FIELD_WIDTH - 2) + 2)
    var y1 = parseInt(Math.random() * (FIELD_HEIGHT - 2) + 2)
    var rndDirect = Math.round(Math.random())
    var x2 = x1 + rndDirect
    var y2 = y1 + Number(!rndDirect)
    var obstCell = [x1, y1].join(';')
    var obstCell2 = [x2, y2].join(';')
    var busy = [].concat(snake, [foodCell])
    if (busy.indexOf(obstCell) == -1) obstGen = false
  }
  obstacles.push(obstCell)
  obstacles.push(obstCell2)
  for (var i of obstacles) {
    var id = document.getElementById(i)
    id.classList.add('obstacles')
  }
}

function obstCls() {
  for (var i of obstacles) {
    var id = document.getElementById(i)
    id.classList.remove('obstacles')
  }
  obstacles = []
}

function start() {
  if (START) return
  START = true
  init()
  fieldGenerator()
  snake_timer = setInterval(runGame, 200)
  food_timer = setInterval(food, 1500)
  obst_timer = setInterval(genObst, 3000)
  obstCls_timer = setInterval(obstCls, 10000)
}

function stop() {
  if (!START) return
  START = false
  clearInterval(snake_timer)
  clearInterval(food_timer)
  clearInterval(obst_timer)
  clearInterval(obstCls_timer)
  init()
  fieldGenerator()
}

fieldGenerator()
createListeners()
