import { yandexTranslate } from '../service/yandexApi'

const template = `
  <button id="translateIcon">
    <svg class="text-marker" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
        width="32" height="32"
        viewBox="0 0 48 48"
        style=" fill:#000000;"><path fill="#424242" d="M34,42H14c-4.411,0-8-3.589-8-8V14c0-4.411,3.589-8,8-8h20c4.411,0,8,3.589,8,8v20 C42,38.411,38.411,42,34,42z"></path><path fill="#00838f" d="M24,38c-7.72,0-14-6.28-14-14s6.28-14,14-14s14,6.28,14,14S31.72,38,24,38z M24,12 c-6.617,0-12,5.383-12,12s5.383,12,12,12s12-5.383,12-12S30.617,12,24,12z"></path><path fill="#00838f" d="M33.016,33.58C30.723,31.94,27.437,31,24,31c-3.438,0-6.724,0.94-9.016,2.58l-1.164-1.627 C16.444,30.077,20.154,29,24,29c3.9,0,7.516,1.049,10.18,2.953L33.016,33.58z"></path><path fill="#00838f" d="M24,19c-3.846,0-7.556-1.077-10.18-2.953l1.164-1.627C17.276,16.06,20.563,17,24,17 c3.437,0,6.723-0.94,9.016-2.58l1.164,1.627C31.516,17.951,27.9,19,24,19z"></path><path fill="#00838f" d="M24,38c-3.925,0-7-6.149-7-14s3.075-14,7-14s7,6.149,7,14S27.925,38,24,38z M24,12 c-2.365,0-5,4.928-5,12s2.635,12,5,12s5-4.928,5-12S26.365,12,24,12z"></path><rect width="26" height="2" x="11" y="23" fill="#00838f"></rect><rect width="2" height="26" x="23" y="11" fill="#00838f"></rect><path fill="#eee" d="M11.476,21H12v2.069c0,0.713,0.862,1.07,1.366,0.566L16,21h2.524C19.891,21,21,19.891,21,18.524 v-4.048C21,13.109,19.891,12,18.524,12h-7.048C10.109,12,9,13.109,9,14.476v4.048C9,19.891,10.109,21,11.476,21z"></path><path fill="#26c6da" d="M36.524,36H36v2.069c0,0.713-0.862,1.07-1.366,0.566L32,36h-2.524C28.109,36,27,34.891,27,33.524 v-4.048C27,28.109,28.109,27,29.476,27h7.048C37.891,27,39,28.109,39,29.476v4.048C39,34.891,37.891,36,36.524,36z"></path></svg>
  </button>
  
  <div id="translateTooltip">
  </div>
`

const styled = ({
  display = 'none', left = 0, top = 0, hiddenTranslateIcon = false,
}) => `
  #translateIcon {
    background: none;
    border: none;
    padding: 0;
    align-items: center;
    cursor: pointer;
    display: ${hiddenTranslateIcon ? 'none' : display};
    justify-content: center;
    left: ${left}px;
    position: fixed;
    top: ${top}px;
    z-index: 9999;
  }
  #translateTooltip {
    Font-family: 'Roboto',arial,sans-serif;
    font-size: 14px;
    line-height: 1.5715;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgb(0 0 0 / 8%), 0 4px 8px rgb(0 0 0 / 8%), 0 8px 16px rgb(0 0 0 / 8%), 0 16px 24px rgb(0 0 0 / 8%), inset 0 1px 1px hsl(0deg 0% 100% / 8%);
    background: #fff;
    border: none;
    padding: 4px;
    align-items: center;
    cursor: pointer;
    display: ${hiddenTranslateIcon ? 'flex' : 'none'};
    justify-content: center;
    left: ${left}px;
    position: fixed;
    top: ${top}px;
    z-index: 9999;
  }
`

class PointerCustom extends HTMLElement {
  constructor() {
    super()
    this.left = 0
    this.top = 0
    this.render()
  }

  get markerPosition() {
    return JSON.parse(this.getAttribute('markerPosition') || '{}')
  }

  get styleElement() {
    return this.shadowRoot.querySelector('style')
  }

  static get observedAttributes() {
    return ['markerPosition']
  }

  render() {
    this.attachShadow({ mode: 'open' })
    const style = document.createElement('style')
    style.textContent = styled({})
    this.shadowRoot.appendChild(style)
    this.shadowRoot.innerHTML += template
    this.shadowRoot
      .getElementById('translateIcon')
      .addEventListener('click', async () => {
        console.log('window.getSelection().toString()', window.getSelection().toString())
        const { data } = await yandexTranslate({
          sourceLanguageCode: 'en',
          text: window.getSelection().toString(),
        })
        this.styleElement.textContent = styled({
          left: this.left, top: this.top, hiddenTranslateIcon: true,
        })
        console.log('data', data)

        this.shadowRoot
          .getElementById('translateTooltip')
          .innerHTML = data.translations[0].text
      })
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'markerPosition') {
      const position = this.markerPosition

      this.left = position.left
      this.top = position.top

      this.styleElement.textContent = styled(position)
    }
  }
}

window.customElements.define('pointer-custom', PointerCustom)
