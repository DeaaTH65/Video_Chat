const APP_ID = '3d45f1402ea04215b6fae5ac1983deab'
const CHANNEL = 'main'
const TOKEN = '007eJxTYGgxLC3q8D100vHmYWUjpRfr7y93MexltD00IyLqaIS/OYMCg3GKiWmaoYmBUWqigYmRoWmSWVpiqmlisqGlhXFKamLS/PMqqQ2BjAwBV7+wMjJAIIjPwpCbmJnHwAAACQ0fEA=='
let UID;

const client = AgoraRTC.createClient({mode:'rtc', codec:'vp8'})

let localTracks = []
let remoteUsers = {}

let joinAndDisplayLocalStream = async() => {
    UID = await client.join(APP_ID, CHANNEL, TOKEN, null)

    localTracks = await AgoraRTC.createMicrophoneAndCameraTracks()

    let player = `<div class="video-container" id="user-container-${UID}">
                    <div class="username-wrapper"><span class="user-name">My Name<span></div>
                    <div class="video-player" id="user-${UID}"></div>
                </div>`
    document.getElementById('video-streams').insertAdjacentHTML('beforeend', player)

    localTracks[1].play(`user-${UID}`)

    await client.publish([localTracks[0], localTracks[1]])
}

joinAndDisplayLocalStream()