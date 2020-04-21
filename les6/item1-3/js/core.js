const NO_PHOTO = 'img/no_photo.jpg'
var imgActive

function fillGallery(images) {
  var slider = document.querySelector('.slider')
  var sliderView = document.createElement('div')
  sliderView.className = 'slider-view'
  var sliderViewImg = document.createElement('img')
  sliderViewImg.id = 'slider-view-img'
  sliderViewImg.src = NO_PHOTO
  var sliderRowR = document.createElement('span')
  sliderRowR.className = 'slider-rarr'
  sliderRowR.onclick = arrNext
  var sliderRowL = document.createElement('span')
  sliderRowL.className = 'slider-larr'
  sliderRowL.onclick = arrPrev
  var sliderThumbs = document.createElement('div')
  sliderThumbs.className = 'slider-thumbs'
  sliderView.append(sliderViewImg)
  sliderView.append(sliderRowL)
  sliderView.append(sliderRowR)
  slider.append(sliderView)
  slider.append(sliderThumbs)
  for (var i of images) {
    var sliderThumb = document.createElement('div')
    sliderThumb.className = 'slider-thumb'
    var sliderThumbImg = document.createElement('img')
    sliderThumbImg.src = i.tmb
    sliderThumbImg.dataset.big = i.big
    sliderThumb.onclick = nextView
    sliderThumb.append(sliderThumbImg)
    sliderThumbs.append(sliderThumb)
  }
  imgActive = sliderThumbs.firstElementChild
  imgActive.click()
}

function arrNext() {
  var obj = imgActive.nextElementSibling
  if (obj) {
    obj.click()
  }
}

function arrPrev() {
  var obj = imgActive.previousElementSibling
  if (obj) {
    obj.click()
  }
}

function nextView(e) {
  imgActive.style.opacity = 0.4
  imgActive = e.currentTarget
  imgActive.style.opacity = 1
  var bigImg = imgActive.firstElementChild.dataset.big
  var sliderViewImg = document.querySelector('#slider-view-img')
  sliderViewImg.src = bigImg
  sliderViewImg.onerror = function () {
    sliderViewImg.src = NO_PHOTO
  }
}

window.onload = function () {
  var imgs = [
    {
      tmb: 'img/tmb/1.jpg',
      big: 'img/1.jpg',
    },
    {
      tmb: 'img/tmb/2.jpg',
      big: 'img/2.jpg',
    },
    {
      tmb: 'img/tmb/3.jpg',
      big: 'img/3.jpg',
    },
    {
      tmb: 'img/tmb/4.jpg',
      big: 'img/4.jpg',
    },
    {
      tmb: 'img/tmb/5.jpg',
      big: 'img/5.jpg',
    },
    {
      tmb: 'img/tmb/6.jpg',
      big: 'img/6.jpg',
    },
  ]
  fillGallery(imgs)
}
