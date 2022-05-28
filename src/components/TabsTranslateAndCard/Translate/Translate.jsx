import React, { useCallback, useState } from 'react'
import { Space } from 'antd'
import { Translator } from './Translator/Translator'
import { Translation } from './Translation/Translation'
import { yandexTranslate } from '../../../service/yandexApi'
import { indexedDb } from '../../../indexedDb/db'

export const Translate = () => {
  const [translateText, setTranslateText] = useState('')
  const [translatedText, setTranslatedText] = useState('')

  const onTranslating = useCallback(() => {
    (async () => {
      const { data } = await yandexTranslate({
        sourceLanguageCode: 'en',
        text: translateText,
      })
      setTranslatedText(data.translations[0].text)

      if (translateText.split(' ').length > 3) {
        return
      }

      try {
        await indexedDb.remember.add({
          sourceText: translateText,
          translationText: data.translations[0].text,
          sourceLang: 'en',
          translateLang: 'ru',
          correctAnswers: 0,
        })
      } catch (e) {
        console.error(`Error adding translateText: ${e.message || e}`)
      }
    })()
  }, [translateText])

  return (
    <Space direction="vertical">
      <Translator
        onTranslating={onTranslating}
        searchValue={translateText}
        onSetSearchValue={(e) => setTranslateText(e.target.value)}
      />
      <Translation translatedText={translatedText} />
    </Space>
  )
}
