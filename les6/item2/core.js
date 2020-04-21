var basket = document.getElementById('basket')

function parceCards() {
  var cards = document.querySelectorAll('.prod')
  for (i of cards) {
    var btn = i.querySelector('.btn')
    btn.onclick = toBasketAdd
  }
}

function toBasketAdd(e) {
  var card = e.currentTarget.closest('.prod')
  var title = card.querySelector('.card-title').innerText
  var price = parseInt(e.currentTarget.dataset.price)
  var id = e.currentTarget.dataset.id
  var item = basket.querySelector(`[data-id='${id}']`)
  if (item == null) {
    var item = document.createElement('li')
    item.className = 'list-group-item'
    item.dataset.id = id
    item.dataset.cnt = 1
    item.innerText = `${title} -- ${price} руб. 1шт`
    basket.append(item)
  } else {
    var cnt = parseInt(item.dataset.cnt) + 1
    item.dataset.cnt = parseInt(cnt)
    item.innerText = `${title} -- ${price * cnt} руб. ${cnt} шт`
  }
}

parceCards()
