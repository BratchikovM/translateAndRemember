import Dexie from 'dexie'

export const indexedDb = new Dexie('translateAndRemember')

indexedDb.version(1).stores({
  remember: 'sourceText, translationText, sourceLang, translateLang, correctAnswers', // Primary key and indexed props
})
