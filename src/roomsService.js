import api from "./api"

const fakeRooms = [
    {
        id: 'example',
        displayName: 'Auditorium',
        fallbackItem: true
    }
]

export async function getRooms(prefix = 'Room') {
    return await api(
        `users`, {
            "$filter": `startswith(displayName, '${prefix}')`
        }
    )
        .get()
        .catch(e => {
            console.warn(e)
            return getFakeRooms()
        })
}

function getFakeRooms() {
    return fakeRooms
}

export async function getRoomName(roomId) {
    const roomInfo = await api(`users/${roomId}`)
        .get()
        .catch(e => {
            console.warn(e)
            let matchingRoom = fakeRooms.find(item => item.id === roomId)
            if(!matchingRoom) {
                matchingRoom = fakeRooms.find(item => item.fallbackItem)
            }
            return matchingRoom
        })
    return roomInfo.displayName
}
