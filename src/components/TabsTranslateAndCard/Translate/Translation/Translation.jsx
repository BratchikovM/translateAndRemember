import React from 'react'
import {
  Row, Col, Typography,
} from 'antd'

const { Text } = Typography

export const Translation = ({ translatedText }) => (
  <>
    {translatedText && (
      <>
        <Row>
          <Col offset={1}>
            <Text type="secondary">Russian</Text>
          </Col>
        </Row>

        <Row>
          <Col offset={2}>
            <Text strong>{translatedText}</Text>
          </Col>
        </Row>
      </>
    )}

    {/* <Row gutter={8}> */}
    {/*  <Col className="gutter-row" span={3} offset={2}> */}
    {/*    <Text type="secondary" italic>noun</Text> */}
    {/*  </Col> */}
    {/*  <Col className="gutter-row" span={19}> */}
    {/*    <Text>пример, образец, экземпляр, характерный пример, урок, примерное наказание</Text> */}
    {/*  </Col> */}
    {/* </Row> */}

    {/* <Row gutter={8}> */}
    {/*  <Col className="gutter-row" span={3} offset={2}> */}
    {/*    <Text type="secondary" italic>verb</Text> */}
    {/*  </Col> */}
    {/*  <Col className="gutter-row" span={19}> */}
    {/*    <Text>служить примером</Text> */}
    {/*  </Col> */}
    {/* </Row> */}
  </>
)
