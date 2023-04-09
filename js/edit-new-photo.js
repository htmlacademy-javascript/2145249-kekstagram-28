const newImage = document.querySelector('.img-upload__preview img');
const editScaleContainer = document.querySelector('.img-upload__scale');
const scaleSmaller = editScaleContainer.querySelector('.scale__control--smaller');
const scaleBigger = editScaleContainer.querySelector('.scale__control--bigger');
const scaleInput = editScaleContainer.querySelector('.scale__control--value');
const SCALE_STEP = 25;
const SCALE_MAX = 100;
const SCALE_MIN = 25;
scaleInput.value = '100%';
const effects = document.querySelector('.effects');
const sliderContainer = document.querySelector('.img-upload__effect-level');
const sliderElement = document.querySelector('.effect-level__slider');
const effectLevel = document.querySelector('.effect-level__value');
const EFFECTS = [
  {
    name: 'none',
    style: 'none',
    min: 0,
    max: 100,
    step: 1,
    unit: '',
  },
  {
    name: 'chrome',
    style: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },
  {
    name: 'sepia',
    style: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },
  {
    name: 'marvin',
    style: 'invert',
    min: 0,
    max: 100,
    step: 1,
    unit: '%',
  },
  {
    name: 'phobos',
    style: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    unit: 'px',
  },
  {
    name: 'heat',
    style: 'brightness',
    min: 1,
    max: 3,
    step: 0.1,
    unit: '',
  }
];
const STARTEFFECTLEVEL = 100;
let currentEffect = '';

function scaleImage(value) {
  newImage.style.transform = `scale(${value / 100})`;
  scaleInput.value = `${value}%`;
}

scaleSmaller.addEventListener('click', () => {
  let newScale = parseInt(scaleInput.value, 10) - SCALE_STEP;
  if (newScale < SCALE_MIN) {
    newScale = SCALE_MIN;
  }
  scaleImage(newScale);
});

scaleBigger.addEventListener('click', () => {
  let newScale = parseInt(scaleInput.value, 10) + SCALE_STEP;
  if (newScale > SCALE_MAX) {
    newScale = SCALE_MAX;
  }
  scaleImage(newScale);
});

const resetScale = () => scaleImage(100);

sliderContainer.classList.add('hidden');

noUiSlider.create(sliderElement, {
  range: {
    min: EFFECTS[0].min,
    max: EFFECTS[0].max,
  },
  start: STARTEFFECTLEVEL,
  step: EFFECTS[0].step,
  connect: 'lower',
});

function changeEffect(evt) {
  if (!evt.target.classList.contains('effects__radio')) {
    return;
  }
  sliderContainer.classList.remove('hidden');
  currentEffect = EFFECTS.find((effect) => effect.name === evt.target.value);
  newImage.className = `effects__preview--${currentEffect.name}`;
  if (evt.target.id === 'effect-none') {
    sliderContainer.classList.add('hidden');
    newImage.className = '';
  }
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: currentEffect.min,
      max: currentEffect.max,
    },
    step: currentEffect.step,
    start: currentEffect.max,
  });
}

effects.addEventListener('change', (evt) => {
  changeEffect(evt);
});

sliderElement.noUiSlider.on('update', () => {
  effectLevel.value = sliderElement.noUiSlider.get();
  if (currentEffect === EFFECTS[0]) {
    newImage.style.filter = EFFECTS[0].style;
  } else {
    newImage.style.filter = `${currentEffect.style}(${effectLevel.value}${currentEffect.unit})`;
  }
});

function resetEffects() {
  currentEffect = EFFECTS[0];
  newImage.style.filter = EFFECTS[0].style;
  sliderContainer.classList.add('hidden');
  newImage.style.transform = 'scale(1)';

}

export { resetEffects, resetScale };
