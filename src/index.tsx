import ReactDOM from 'react-dom'
import { App } from './App'
import { RPCCommands, RPCEvents } from './streamkit/Constants'
import { RPCClient } from './streamkit/RPCClient'

const GUILD_ID = '760537592021909524'
const CHANNEL_ID = '760537592021909527'
const client = new RPCClient(GUILD_ID, CHANNEL_ID)

client.connect()

client.request(
  RPCCommands.GET_CHANNEL,
  { channel_id: client.channelId },
  (error, data) => {
    if (error || data == null) return

    console.log('GET_CHANNEL', {
      messages: data.messages,
      channelName: data.name,
    })
  }
)

client.subscribe(
  RPCEvents.MESSAGE_CREATE,
  { channel_id: client.channelId },
  (error, data) => {
    if (error || data == null) return

    console.log('MESSAGE_CREATE', { message: data.message })

    window.Main.sendMessage(data.message.content)
  }
)

// client.subscribe(
//   RPCEvents.MESSAGE_UPDATE,
//   { channel_id: client.channelId },
//   (error, data) => {
//     if (error || data == null) return

//     console.log('MESSAGE_UPDATE', { message: data.message })
//   }
// )

// client.subscribe(
//   RPCEvents.MESSAGE_DELETE,
//   { channel_id: client.channelId },
//   (error, data) => {
//     if (error || data == null) return

//     console.log('MESSAGE_DELETE', { id: data.message.id })
//   }
// )

ReactDOM.render(<App />, document.getElementById('root'))
