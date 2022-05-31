import React, { useMemo } from 'react'
import { useLiveQuery } from 'dexie-react-hooks'
import {
  Table, Tooltip, Button,
} from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import { indexedDb } from '../../../indexedDb/db'
import './list-words.css'
import CustomNotification from '../../Notification/CustomNotification'

export const ListWords = () => {
  const listWords = useLiveQuery(async () => {
    const remember = await indexedDb.remember
      .toArray()

    return remember.map((item) => ({
      key: item.sourceText,
      word: item.sourceText,
      translate: item.translationText,
      correctAnswers: item.correctAnswers,
    }))
  }, [])

  const columns = useMemo(() => {
    const onRemoveIndexedDb = (item) => {
      indexedDb.remember
        .where('sourceText').equals(item.word)
        .delete()
        .then(() => {
          CustomNotification({
            type: 'success',
            message: 'Success!',
            description: `The word ${item.word} was successfully deleted`,
          })
        })
    }

    return [
      {
        title: 'Word',
        dataIndex: 'word',
        key: 'word',
        fixed: 'left',
      },
      {
        title: 'Translate',
        dataIndex: 'translate',
        key: 'translate',
      },
      {
        title: 'Answers',
        dataIndex: 'correctAnswers',
        key: 'correctAnswers',
        width: 90,
        sorter: (a, b) => a.correctAnswers - b.correctAnswers,
      },
      {
        title: '',
        dataIndex: '',
        key: 'action',
        align: 'center',
        width: 50,
        render: (item) => (
          <Tooltip title="Remove">
            <Button
              onClick={() => onRemoveIndexedDb(item)}
              size="small"
              type="primary"
              shape="circle"
              icon={<DeleteOutlined />}
            />
          </Tooltip>
        ),
      },
    ]
  }, [])

  return (
    <div className="ListWords-Container">
      <Table
        size="small"
        columns={columns}
        dataSource={listWords}
        pagination={{
          pageSize: 30,
        }}
        scroll={{
          y: 240,
          x: 500,
        }}
      />
    </div>
  )
}
