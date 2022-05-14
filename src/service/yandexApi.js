import instance from '../axios-api'

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

  return instance.get(
    'https://functions.yandexcloud.net/d4ebnestevp33tcpo5tq',
    body,
  )
}
