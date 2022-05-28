import instance from '../axios-api'
import config from '../config'

export const yandexTranslate = ({
  sourceLanguageCode,
  targetLanguageCode = 'ru',
  text,
}) => {
  const body = {
    params: {
      sourceLanguageCode,
      targetLanguageCode,
      text,
    },
  }

  return instance.get(config.yandexFunction, body)
}
