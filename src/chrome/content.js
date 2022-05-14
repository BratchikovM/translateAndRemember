const pointerCustom = document.createElement('pointer-custom')
document.body.appendChild(pointerCustom)

const setMarkerPosition = (markerPosition) => pointerCustom.setAttribute(
  'markerPosition',
  JSON.stringify(markerPosition),
)

function getMarkerPosition() {
  const rangeBounds = window
    .getSelection()
    .getRangeAt(0)
    .getBoundingClientRect()
  return {
    left: rangeBounds.left + rangeBounds.width / 2 - 20,
    top: rangeBounds.top - 30,
    display: 'flex',
  }
}

const getSelectedText = () => window.getSelection().toString()

document.addEventListener('click', () => {
  if (getSelectedText().length > 0) {
    setMarkerPosition(getMarkerPosition())
  }
})

// document.addEventListener('selectionchange', () => {
//   if (getSelectedText().length === 0) {
//     setMarkerPosition({ display: 'none' })
//   }
// })
