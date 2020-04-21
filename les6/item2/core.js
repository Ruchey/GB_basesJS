function parceCards() {
  var cards = document.querySelectorAll('.prod')
  for (i of cards) {
    var btn = i.querySelector('.btn')
    btn.onclick = toBasketAdd
  }
}
