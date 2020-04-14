var q, vr, endVar, num, event, vrTxt

var endGame = false
var wk = work1
var course = 0
var userVr = []

while (!endGame) {
  vr = wk.variants
  vrTxt = ''
  endVar = wk.endVar
  if (endVar) {
    finish(wk.txt)
    break
  }
  num = vr.length
  for (i in vr) {
    vrTxt += `${parseInt(i) + 1} -- ${vr[i].vr}\n`
  }
  q = `${wk.txt}\n${vrTxt}`
  event = +prompt(q + '-1 - Выход из игры')
  if (event > num || event < -1) {
    continue
  } else if (event == -1) {
    endGame = true
  } else {
    wk = eval(vr[event - 1].work)
    userVr[course] = vr[event - 1].vr
    course++
  }
}

function finish(txt) {
  var userCourse = +prompt(`${txt}\nот 1 до ${course}`)
  alert(`Ваш ход №${course} с выбором: ${userVr[userCourse - 1]}`)
}
