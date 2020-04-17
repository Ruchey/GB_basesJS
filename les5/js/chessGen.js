'use strict'

// Расстановка фигур
function arrangeFigur() {
  var figures = {
    a1: '&#9814;',
    b1: '&#9816;',
    c1: '&#9815;',
    d1: '&#9813;',
    e1: '&#9812;',
    f1: '&#9815;',
    g1: '&#9816;',
    h1: '&#9814;',
    a2: '&#9817;',
    b2: '&#9817;',
    c2: '&#9817;',
    d2: '&#9817;',
    e2: '&#9817;',
    f2: '&#9817;',
    g2: '&#9817;',
    h2: '&#9817;',
    a8: '&#9820;',
    b8: '&#9822;',
    c8: '&#9821;',
    d8: '&#9819;',
    e8: '&#9818;',
    f8: '&#9821;',
    g8: '&#9822;',
    h8: '&#9820;',
    a7: '&#9823;',
    b7: '&#9823;',
    c7: '&#9823;',
    d7: '&#9823;',
    e7: '&#9823;',
    f7: '&#9823;',
    g7: '&#9823;',
    h7: '&#9823;',
  }
  for (var i in figures) {
    var cage = document.getElementById(i)
    cage.innerHTML = figures[i]
  }
}

// Расстановка букв
function genChessL(node, reverse = false) {
  var letters = ['', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', '']
  for (var i of letters) {
    var th = document.createElement('th')
    th.innerText = i
    if (reverse) {
      th.className = 'invert'
    }
    node.appendChild(th)
  }
}

// Генератор полоски клеток
function genChessCol(node, row) {
  // node - родительский узел, которому добавляем элементы
  // row - номер строки

  if (row % 2 != 0) {
    var evenCage = 'chess-black'
    var notEvenCage = 'chess-white'
  } else {
    var evenCage = 'chess-white'
    var notEvenCage = 'chess-black'
  }
  var th = document.createElement('th')
  var thEnd = document.createElement('th')
  th.innerText = 9 - row
  node.appendChild(th)
  thEnd.innerText = 9 - row
  thEnd.className = 'invert'
  for (var i = 1; i < 9; i++) {
    var td = document.createElement('td')
    if (i % 2 == 0) {
      td.className = evenCage
    } else {
      td.className = notEvenCage
    }
    if (i == 1) {
      td.classList.add('cage-left')
    }
    if (i == 8) {
      td.classList.add('cage-right')
    }
    if (row == 1) {
      td.classList.add('cage-top')
    }
    if (row == 8) {
      td.classList.add('cage-bottom')
    }
    var cageId = String.fromCharCode(96 + i) + (9 - row)
    td.id = cageId
    node.appendChild(td)
  }
  node.appendChild(thEnd)
}

// Генератор строк клеток
function genChessRow(node) {
  for (var i = 1; i < 9; i++) {
    var tr = document.createElement('tr')
    genChessCol(tr, i)
    node.appendChild(tr)
  }
}

var board = document.querySelector('#chessboard')
var tbl = document.createElement('table')
board.appendChild(tbl)
tbl.className = 'chess-field'
var tbody = document.createElement('tbody')
tbl.appendChild(tbody)
genChessL(tbody, true)
genChessRow(tbody)
genChessL(tbody)
arrangeFigur()
