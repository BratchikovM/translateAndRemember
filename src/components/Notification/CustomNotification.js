import { notification } from 'antd'

export default ({ type, message, description }) => {
  notification[type]({
    message,
    description,
    duration: 1.5,
    maxCount: 1,
  })
}
