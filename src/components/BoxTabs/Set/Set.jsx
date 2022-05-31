import React, {
  useState, useEffect, useRef, useCallback,
} from 'react'
import {
  Row, Col, Space, Input, Button, Typography,
} from 'antd'
import { indexedDb } from '../../../indexedDb/db'
import CustomNotification from '../../Notification/CustomNotification'

export const Set = () => {
  const [word, setWord] = useState('')
  const [translateWord, setTranslateWord] = useState('')
  const [isLoadingSave, setIsLoadingSave] = useState(false)

  const inputRef = useRef()

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
        CustomNotification({ type: 'success', message: 'Success!', description: 'Saving was successful' })
      } catch (e) {
        console.error(`Error adding word: ${e.message || e}`)
        CustomNotification({
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
