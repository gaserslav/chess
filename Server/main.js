const ws = require('ws')

let server = new ws.Server({ port: 8081 })

let players = []
let num = 0

function send_to_all_players(string) {
    for (let i = 0; i < players.length; i++) {
        try {
            players[i].send(send)
        } catch (e) { }
    }
}


function start_game() {

    function closeallplayers() {
        for (let i = 0; i < players.length; i++) {
            try {
                players[i].close();
                players[i] = null;
            } catch (e) { }
        }
    }


    //now game can start
    console.log("game started...")

    players[0].send(JSON.stringify({ team: 0 }))
    players[1].send(JSON.stringify({ team: 1 }))

    //send_to_all_players("game started...")

    //if some binary is send so it doesnt crash server as a whole
    try {
        players[0].on("message", (massage) => {
            console.log("player 0 send to player 1 : " + massage)
            players[1].send(String(massage))
        })

        players[1].on("message", (massage) => {
            console.log("player 1 send to player 0 : " + massage)

            players[0].send(String(massage))
        })

    } catch (e) { throw e }

    players[0].on("close", (e) => {
        closeallplayers()
        num = 0

        return null

    })

    players[1].on("close", (e) => {

        closeallplayers()
        num = 0

        return null

    })
}







console.log("Server started ....")
server.on("connection", (socket) => {

    if (num < 2) {
        players[num] = socket
        num++
        console.log("zauzeta mesta " + num)

        if (num == 2) {
            setTimeout(start_game, 1000)
        }

    } else {
        socket.send("maxx player cap reached")
        socket.close()
    }






})








