import React, { useCallback, useState } from 'react'
import { Space } from 'antd'
import { Translator } from './Translator/Translator'
import { Translation } from './Translation/Translation'
import { yandexTranslate } from '../../../service/yandexApi'
import { indexedDb } from '../../../indexedDb/db'

export const Translate = () => {
  const [translateText, setTranslateText] = useState('')
  const [translatedText, setTranslatedText] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const onTranslating = useCallback(() => {
    (async () => {
      setTranslatedText('')
      setIsLoading(true)

      let result = {}

      try {
        const { data } = await yandexTranslate({
          sourceLanguageCode: 'en',
          text: translateText,
        })
        result = data
      } catch (e) {
        result.translations = [{ text: '' }]
        console.error(`Error translate ${e.message || e}`)
      }

      setTranslatedText(result.translations[0].text)
      if (translateText.split(' ').length > 3) {
        return
      }

      try {
        await indexedDb.remember.add({
          sourceText: translateText.trim(),
          translationText: result.translations[0].text.trim(),
          sourceLang: 'en',
          translateLang: 'ru',
          correctAnswers: 0,
        })
      } catch (e) {
        console.error(`Error adding translateText: ${e.message || e}`)
      }

      setIsLoading(false)
    })()
  }, [translateText])

  return (
    <Space direction="vertical">
      <Translator
        isLoading={isLoading}
        onTranslating={onTranslating}
        searchValue={translateText}
        onSetSearchValue={(e) => setTranslateText(e.target.value)}
      />
      <Translation
        isLoading={isLoading}
        translatedText={translatedText}
      />
    </Space>
  )
}
