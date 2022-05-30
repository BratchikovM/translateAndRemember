import { TYPES_MESSAGE } from '../const/typesMsg'
import { indexedDb } from '../indexedDb/db'

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

chrome.runtime.onMessage.addListener((message) => {
  if (TYPES_MESSAGE.translate === message.type && message.selectedText.split(' ').length < 4) {
    indexedDb.remember.add({
      sourceText: message.selectedText.trim(),
      translationText: message.translatedText.trim(),
      sourceLang: 'en',
      translateLang: 'ru',
      correctAnswers: 0,
    })
  }
})
