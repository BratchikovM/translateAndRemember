chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'copyAsPlainText',
    title: 'Translate and remember',
    contexts: ['selection'],
  })
})

chrome.contextMenus.onClicked.addListener((itemData) => {
  console.log('itemData.selectionText', itemData.selectionText)
})
