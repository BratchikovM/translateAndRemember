import React, {
  useState, useEffect, useRef, useCallback,
} from 'react'
import {
  Row, Col, Space, Input, Button, Typography, notification,
} from 'antd'
import { indexedDb } from '../../../indexedDb/db'

export const Set = () => {
  const [word, setWord] = useState('')
  const [translateWord, setTranslateWord] = useState('')
  const [isLoadingSave, setIsLoadingSave] = useState(false)

  const inputRef = useRef()

  const onNotification = ({ type, message, description }) => {
    notification[type]({
      message,
      description,
      duration: 1.5,
      maxCount: 1,
    })
  }

  const onSave = useCallback(() => {
    (async () => {
      setIsLoadingSave(true)
      try {
        await indexedDb.remember.add({
          sourceText: word.trim(),
          translationText: translateWord.trim(),
          sourceLang: 'en',
          translateLang: 'ru',
          correctAnswers: 0,
        })
        onNotification({ type: 'success', message: 'Success!', description: 'Saving was successful' })
      } catch (e) {
        onNotification({
          type: 'error',
          message: 'Error adding',
          description: 'Couldn\'t add a word, try again.',
        })
      }

      setIsLoadingSave(false)
    })()
  }, [word, translateWord])

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  return (
    <Space direction="vertical">
      <Row>
        <Col span={24}>
          <Typography.Text strong>Word</Typography.Text>

          <Input
            value={word}
            allowClear
            onChange={(e) => setWord(e.target.value)}
            ref={inputRef}
          />
        </Col>
      </Row>

      <Row>
        <Col span={24}>
          <Typography.Text strong>Translate</Typography.Text>

          <Input
            value={translateWord}
            allowClear
            onChange={(e) => setTranslateWord(e.target.value)}
          />
        </Col>
      </Row>

      <Row>
        <Col span={24}>
          <Button
            type="primary"
            block
            disabled={!word || !translateWord}
            loading={isLoadingSave}
            onClick={onSave}
          >
            Save
          </Button>
        </Col>
      </Row>
    </Space>
  )
}
