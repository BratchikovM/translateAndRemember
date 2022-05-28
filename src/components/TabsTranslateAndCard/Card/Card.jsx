import React, {
  useCallback, useEffect, useMemo, useRef, useState,
} from 'react'
import {
  Input, Row, Col, Skeleton, Space, Typography, Button, Empty,
} from 'antd'
import { useLiveQuery } from 'dexie-react-hooks'
import { indexedDb } from '../../../indexedDb/db'

const { Text } = Typography
const { Search } = Input

export const Cards = () => {
  const [currentIndexCard, setCurrentIndexCard] = useState(0)
  const [valueInput, setValueInput] = useState('')
  const [errorAnswer, setErrorAnswer] = useState(0)
  const [isShowCorrectAnswer, setShowCorrectAnswer] = useState(false)
  const [cachedArrayWords, setCachedArrayWords] = useState([])
  const listWords = useLiveQuery(async () => {
    const remember = await indexedDb.remember
      .where('correctAnswers')
      .belowOrEqual(7)
      .toArray()

    return remember.sort(() => Math.random() - 0.5)
  }, [])
  const inputRef = useRef()

  const onNextWord = useCallback(() => {
    setErrorAnswer(0)
    setCurrentIndexCard(currentIndexCard + 1)
    setShowCorrectAnswer(false)
    setValueInput('')
  }, [currentIndexCard])

  const onCheckTranslate = useCallback(() => {
    const currentWord = cachedArrayWords[currentIndexCard]

    if (currentWord.translationText === valueInput) {
      indexedDb.remember.update(currentWord.sourceText, { correctAnswers: currentWord.correctAnswers + 1 })
      onNextWord()
    } else {
      setErrorAnswer(errorAnswer + 1)
    }
  }, [currentIndexCard, cachedArrayWords, errorAnswer, onNextWord, valueInput])

  const renderBody = useMemo(() => {
    if (cachedArrayWords && cachedArrayWords.length > 0 && currentIndexCard < cachedArrayWords.length) {
      return (
        <Space direction="vertical">
          <Text strong>{cachedArrayWords[currentIndexCard].sourceText}</Text>

          {isShowCorrectAnswer && (
            <Text type="success">{cachedArrayWords[currentIndexCard].translationText}</Text>
          )}

          <Row>
            <Col span={23}>
              <Search
                value={valueInput}
                status={errorAnswer > 0 ? 'error' : undefined}
                onPressEnter={onCheckTranslate}
                allowClear
                enterButton="Check"
                size="large"
                onChange={(e) => setValueInput(e.target.value)}
                onSearch={onCheckTranslate}
                ref={inputRef}
              />
            </Col>
          </Row>

          {isShowCorrectAnswer && (
          <Button onClick={onNextWord} type="primary">Next word</Button>
          )}
        </Space>
      )
    }

    return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
  }, [
    cachedArrayWords,
    currentIndexCard,
    errorAnswer,
    isShowCorrectAnswer,
    onCheckTranslate,
    onNextWord,
    valueInput,
  ])

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  useEffect(() => {
    if (errorAnswer === 3) {
      setShowCorrectAnswer(true)
    }
  }, [errorAnswer])

  useEffect(() => {
    if (cachedArrayWords.length === 0 && listWords && listWords.length > 0) {
      setCachedArrayWords(listWords)
    }
  }, [cachedArrayWords, listWords])

  return (
    <>
      {cachedArrayWords.length <= 0 && currentIndexCard < cachedArrayWords.length
        ? <Skeleton />
        : renderBody}
    </>
  )
}
