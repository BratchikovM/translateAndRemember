import React from 'react'
import { Input, Row, Col } from 'antd'

const { Search } = Input

export const Translator = ({ searchValue, onSetSearchValue, onTranslating = () => {} }) => (
  <>
    <Row>
      <Col span={23}>
        <Search
          value={searchValue}
          onPressEnter={onTranslating}
          allowClear
          enterButton="Translate"
          size="large"
          onChange={onSetSearchValue}
          onSearch={onTranslating}
        />
      </Col>
    </Row>
  </>
)
