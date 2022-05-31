import React from 'react'
import { Tabs, Row, Col } from 'antd'
import { Translate } from './Translate/Translate'
import { Cards } from './Card/Card'
import { Set } from './Set/Set'

const { TabPane } = Tabs

export const BoxTabs = () => (
  <Row>
    <Col offset={1}>
      <Tabs defaultActiveKey="1" size="large">
        <TabPane tab="Translate" key="1">
          <Translate />
        </TabPane>

        <TabPane tab="Set" key="2">
          <Set />
        </TabPane>

        <TabPane tab="Cards" key="3">
          <Cards />
        </TabPane>
      </Tabs>
    </Col>
  </Row>
)
