import fetch from 'electron-fetch'

export async function handleDiscordMessage(message: string) {
  console.log('handleDiscordMessage', message)
  try {
    if (!message.startsWith('!')) return

    const [command] = message.split(' ')
    switch (command) {
      case '!cam1': {
        console.log('got here')
        const res = await fetch('http://192.168.1.99:4747/v1/camera/active/0', {
          method: 'PUT',
        })
        if (res.status < 200 || res.status >= 300) {
          throw new Error(`Failed to change camera: ${res.status}`)
        }
        break
      }
      case '!cam2': {
        const res = await fetch('http://192.168.1.99:4747/v1/camera/active/2', {
          method: 'PUT',
        })
        if (res.status < 200 || res.status >= 300) {
          throw new Error(`Failed to change camera: ${res.status}`)
        }
        break
      }
    }
  } catch (err) {
    console.error(err)
  }
}
