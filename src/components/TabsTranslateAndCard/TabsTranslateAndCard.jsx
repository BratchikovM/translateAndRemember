import React from 'react'
import { Tabs, Row, Col } from 'antd'
import { Translate } from './Translate/Translate'

const { TabPane } = Tabs

export const TabsTranslateAndCard = () => (
  <Row>
    <Col offset={1}>
      <Tabs defaultActiveKey="1" size="large">
        <TabPane tab="Translate" key="1">
          <Translate />
        </TabPane>
      </Tabs>
    </Col>
  </Row>
)
