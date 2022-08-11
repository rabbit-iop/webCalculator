import './style.css'

import { data } from './src/components/data'
import { dom } from './src/components/dom'
import { animation } from './src/components/animation'
import { calculator } from './src/components/calculator'

// 为按钮赋予标签
data.info.forEach(element => {
  if (dom.haveByID(element.id)) {
    document.styleSheets[0].insertRule(`#${element.id}::before{
      content: "${element.tag}"
    }`)
  }
})

// 鼠标触发按钮按下事件
dom.button.forEach(btnDom => {
  btnDom.addEventListener('mousedown', () => {
    animation.btnPress(btnDom)
  })
  btnDom.addEventListener('mouseup', () => {
    animation.btnRelease(btnDom)
  })
  btnDom.addEventListener('mouseout', () => {
    animation.btnRelease(btnDom)
  })
})

// 键盘触发按钮按下事件
data.info.forEach(info => {
  window.addEventListener('keydown', (event)=>{
    info.key.forEach(key => {
      if(event.key === key && dom.getByID(info.id)) {
        animation.btnPress(dom.getByID(info.id))
        calculator.analysisEachTimeInput(info)
      }
    })
  })
  window.addEventListener('keyup', (event) => {
    info.key.forEach(key => {
      if(event.key === key && dom.getByID(info.id)) {
        animation.btnRelease(dom.getByID(info.id))
      }
    })
  })
  // 为筛洗出的每一个节点添加鼠标点击事件
  dom.getByID(info.id)?.addEventListener('click', () => {
    calculator.analysisEachTimeInput(info)
  })
})


// 切换主题动画
animation.switchTheme({ toDark: true })

dom.toggle.sun.addEventListener('click', () => {
  animation.switchTheme({ toDark: false, switchBtnDuration: 1, backgroundDuration: 1.5, calculatorDuration: 0.5, calculatorDelay: 0.05 })
})
dom.toggle.moon.addEventListener('click', () => {
  animation.switchTheme({ toDark: true, switchBtnDuration: 1, backgroundDuration: 1.5, calculatorDuration: 0.5, calculatorDelay: 0.05 })
})