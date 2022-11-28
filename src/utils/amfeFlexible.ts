export default function flexible (window: any, document: any) {
  // 根元素
  var docEl = document.documentElement
  // 获取设备的dpr, 设备物理像素分辨率与CSS像素分辨率之比
  var dpr = window.devicePixelRatio || 1

  // adjust body font size
  // 设置默认字体大小(继承自body)
  function setBodyFontSize () {
    if (document.body) {
      document.body.style.fontSize = (12 * dpr) + 'px'
    } else {
      // 文档完全加载和解析完成后
      document.addEventListener('DOMContentLoaded', setBodyFontSize)
    }
  }
  setBodyFontSize();

  // set 1rem = viewWidth / 10
  // 设置根元素字体大小(设置1个rem的大小)
  function setRemUnit () {
    // 把屏幕宽度分成10份
    var rem = docEl.clientWidth / 10
    docEl.style.fontSize = rem + 'px'
  }

  setRemUnit()

  // reset rem unit on page resize
  // 视图大小调整
  window.addEventListener('resize', setRemUnit)
  // 往返缓存
  window.addEventListener('pageshow', function (e: any) {
    // 往返缓存存储了页面e.persisted: true
    if (e.persisted) {
      setRemUnit()
    }
  })

  // detect 0.5px supports
  // 检测是否支持 0.5px, 如果支持就在根元素类名添加 hairlines 作为标记
  if (dpr >= 2) {
    var fakeBody = document.createElement('body')
    var testElement = document.createElement('div')
    testElement.style.border = '.5px solid transparent'
    fakeBody.appendChild(testElement)
    docEl.appendChild(fakeBody)
    if (testElement.offsetHeight === 1) {
      docEl.classList.add('hairlines')
    }
    docEl.removeChild(fakeBody)
  }
}
