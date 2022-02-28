
let link = "ws://localhost:8081"

//0=white 1 black
let yourteam = undefined
let yourturn = false

function gameisresetinginfo() {
    console.log("waiting for players")
}



let socket = new WebSocket(link);






socket.onopen = () => {

    gameisresetinginfo()




}




socket.onmessage = (massage) => {


    console.log(typeof (massage.data) + massage.data)
    //for some reason sometimes it will return string somethimes blob WHY?? I DONT FKING KNOW


    if (typeof (massage.data) == "object") {


        massage.data.text().then(txt => {
            //from:{x,y},to:{x,y} thats how it looks like unless its assigning teams
            let obj = JSON.parse(txt)
            if (obj.hasOwnProperty('team')) {
                //server is assigning teams
                yourteam = JSON.parse(massage.data).team;

                //white starts first
                if (yourteam == 0) {
                    yourturn = true
                }

            } else {
                console.log(obj)
                game.map[parseInt(obj.fromx)][obj.fromy].do_the_move({ x: obj.tox, y: obj.toy })
                yourturn = true
            }

        })


    } else {

        let obj = JSON.parse(massage.data)
        if (obj.hasOwnProperty('team')) {
            //server is assigning teams
            yourteam = JSON.parse(massage.data).team;

            //white starts first
            if (yourteam == 0) {
                yourturn = true
            }

        } else {
            console.log(obj)
            game.map[parseInt(obj.fromx)][obj.fromy].do_the_move({ x: obj.tox, y: obj.toy })
            yourturn = true
        }






    }




}

socket.onclose = (e) => {
    gameisresetinginfo()
    return null
}




document.getElementById("send").onmousedown = (e) => {
    let massage = document.getElementById('massage').value;
    socket.send(massage)
    console.log("ovo se salje " + massage)
}


let canvas = document.getElementById("d2")
let graf = canvas.getContext('2d');

//this is texture of chess table
let mapa = new Image()
mapa.src = "./texture2D/map.png"
let game = new table()
game.setTable()


let selected = { x: undefined, y: undefined }


//paint possible moves
function paintPossibleMoves() {
    if (!(selected.x == undefined || selected.y == undefined)) {
        let figura = game.map[selected.x][selected.y];
        if (!figura.is_empty) {
            let moves = figura.possibleMoves();

            for (let i = 0; i < moves.length; i++) {
                graf.fillStyle = 'rgba(35,46,249,0.3)';
                graf.fillRect(moves[i].x * 100, moves[i].y * 100, 100, 100);
            }
        }
    }


}

function getTexture(figure) {
    let img = new Image()
    if (figure.is_empty) {
        return img
    }
    if (figure.team == 0) {
        switch (figure.type) {
            case 'top': img.src = "./texture2D/bt.png"; break;
            case 'konj': img.src = "./texture2D/bkkk.png"; break;
            case 'lovac': img.src = "./texture2D/bl.png"; break;
            case 'kraljica': img.src = "./texture2D/bkk.png"; break;
            case 'kralj': img.src = "./texture2D/bk.png"; break;
            case 'pijun': img.src = "./texture2D/bp.png"; break;
        }
    } else {
        switch (figure.type) {
            case 'top': img.src = "./texture2D/ct.png"; break;
            case 'konj': img.src = "./texture2D/ckkk.png"; break;
            case 'lovac': img.src = "./texture2D/cl.png"; break;
            case 'kraljica': img.src = "./texture2D/ckk.png"; break;
            case 'kralj': img.src = "./texture2D/ck.png"; break;
            case 'pijun': img.src = "./texture2D/cp.png"; break;
        }
    }
    return img;
}

function paintfigures() {
    for (let x = 0; x < game.sizex; x++) {
        for (let y = 0; y < game.sizey; y++) {
            let texture = getTexture(game.map[x][y])
            graf.fillStyle = 'rgba(0,0,0,1)';
            graf.fillText("x :: " + x + " y :: " + y, x * 100, y * 100, 100, 100)
            graf.drawImage(texture, x * 100, y * 100, 100, 100)
        }
    }
}

function onEveryFrame() {
    graf.drawImage(mapa, 0, 0, 800, 800)
    graf.fillStyle = 'rgba(236,32,53,0.3)';
    graf.fillRect(selected.x * 100, selected.y * 100, 100, 100);
    paintfigures();
    paintPossibleMoves()
    setTimeout(onEveryFrame, 100)
}



canvas.addEventListener("mousedown", e => {

    let x = parseInt(e.offsetX / 100)
    let y = parseInt(e.offsetY / 100)
    if (selected.x == x && selected.y == y) {
        //when you double click on cell it get deselected
        selected.x = undefined
        selected.y = undefined
    } else {
        // you select different cell
        if (selected.x != undefined && selected.y != undefined) {
            let selectedfigure = game.map[selected.x][selected.y]
            if (!selectedfigure.is_empty && selectedfigure.team == yourteam && yourturn) {
                let moves = selectedfigure.possibleMoves()
                for (let i = 0; i < moves.length; i++) {
                    if (x == moves[i].x && y == moves[i].y) {
                        selectedfigure.do_the_move(moves[i])
                        yourturn = false
                        //you made a move its yours opponents turn
                        socket.send(JSON.stringify({ fromx: selected.x, fromy: selected.y, tox: moves[i].x, toy: moves[i].y }))

                        break;
                    }
                }
            } else {
                //when you select some other figrue/place without deselecting previus one and without makeing any move
            }
        }

        selected.x = x
        selected.y = y
    }

})

onEveryFrame()
