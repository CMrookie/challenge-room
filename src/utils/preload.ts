import icon01 from './assets/images/icon-01.png'
import icon02 from './assets/images/icon-02.png'
import icon03 from './assets/images/icon-03.png'
import icon04 from './assets/images/icon-04.png'
import icon05 from './assets/images/icon-05.png'
import part01 from './assets/images/part-01.png'
import part02 from './assets/images/part-02.png'
import part03 from './assets/images/part-03.png'
import part04 from './assets/images/part-04.png'
import part05 from './assets/images/part-05.png'
import part06 from './assets/images/part-06.png'
import part07 from './assets/images/part-07.png'
import part08 from './assets/images/part-08.png'
import part09 from './assets/images/part-09.png'
import part10 from './assets/images/part-10.png'

const preloadList = [
  icon01,
  icon02,
  icon03,
  icon04,
  icon05,
  part01,
  part02,
  part03,
  part04,
  part05,
  part06,
  part07,
  part08,
  part09,
  part10
]

export default function preload() {
  const len = preloadList.length
  let i = 0
  function loadedFn(e: Event) {
    console.log('loaded image: ', e)
    i++
    return Math.floor(i / len) * 100
  }
  preloadList.forEach((item) => {
    const img = new Image()
    img.onload = loadedFn
    img.src = item
  })
}
