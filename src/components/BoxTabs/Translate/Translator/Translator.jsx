import React, { useEffect, useRef } from 'react'
import {
  Input, Row, Col,
} from 'antd'

const { Search } = Input

export const Translator = ({
  searchValue,
  onSetSearchValue,
  onTranslating = () => {},
  isLoading = false,
}) => {
  const inputRef = useRef()

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  return (
    <>
      <Row>
        <Col span={23}>
          <Search
            value={searchValue}
            onPressEnter={onTranslating}
            allowClear
            loading={isLoading}
            enterButton="Translate"
            size="large"
            onChange={onSetSearchValue}
            onSearch={onTranslating}
            ref={inputRef}
          />
        </Col>
      </Row>
    </>
  )
}
