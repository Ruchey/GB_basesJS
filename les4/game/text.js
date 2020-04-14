class Work {
  constructor(txt, variants, endVar) {
    this.txt = txt
    this.variants = variants
    this.endVar = endVar
  }
}

var work1 = new Work(
  'Вы живёте в тихой и уютной деревеньке на окрайне страны.\n' +
    'Здесь есть практчески всё: речка, лес, горы, озеро, луга и поля, есть даже школа в соседнем селе.\n' +
    'Сейчас начало лета, воскресенье, раннее утро, Вы просыпаетесь и собираетесь ...\n',
  [
    {
      vr: 'Поспать до обеда',
      work: 'work2',
    },
    {
      vr: 'Пойти прогуляться',
      work: 'work3',
    },
  ],
  false
)

var work2 = new Work(
  'Вы решили поспать до обеда.\n' +
    'После того как Вы проснулись первое, что вы ощутили, это приятный запах, который шёл с кухни.\n' +
    'После Вы замечаете, какая за окном прекрасная погода, и Вы думаете ...\n',
  [
    {
      vr: 'Пойти прогуляться',
      work: 'work3',
    },
    {
      vr: 'Начать заново',
      work: 'work1',
    },
  ],
  false
)

var work3 = new Work(
  'Вы решили пойти прогуляться.\n' +
    'Вы выходите из своего дома и видите прекрасный рассвет, блики солнца так и играют на озёрной глади.\n' +
    'Вы решаете дойти до озера, полюбоваться его красотойю\n' +
    'С одной стороны тропинки Вы видите пшеничное поле, за которым веднеется лес.\n' +
    'С другой стороны течёт речка, а в далеке виднеются горы.\n' +
    'Вы наслаждаетесь пейзажами и не замечаете как летит время.\n' +
    'Домой Вы приходите только к обеду, но до обеда ещё есть время и Вы решаете ...\n',
  [
    {
      vr: 'Подождать обед в столовой',
      work: 'work4',
    },
    {
      vr: 'Поколоть дров перед обедом',
      work: 'work4',
    },
  ],
  false
)

var work4 = new Work(
  'Варианты исчерпаны.\n' +
    'Если хотите узнать, что вы выбрали в одном из ходов, введите номер хода: ',
  null,
  true
)
