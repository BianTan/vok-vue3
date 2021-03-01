import { createApp } from 'vue'
import Message from './Message.vue'
export type MessageType = 'default' | 'success' | 'error'

export function createMessage(message: string, type?: MessageType, time = 3000) {
  const messageInstance = createApp(Message, {
    type,
    message
  })
  const mountNode = document.createElement('div')
  document.body.appendChild(mountNode)
  messageInstance.mount(mountNode)
  setTimeout(() => {
    messageInstance.unmount(mountNode)
    document.body.removeChild(mountNode)
  }, time)
}