function returnFigure(figure){
    let black=['♜','♞','♝','♛','♚','♟'];
    let white=['♖','♘','♗','♕','♔','♙'];

    if(figure.is_empty){
        return '▯'
    }

    if(figure.team==0){
        
        switch(figure.type){
            case 'top':return white[0];break;
            case 'konj':return white[1];break;
            case 'lovac':return white[2];break;
            case 'kraljica':return white[3];break;
            case 'kralj':return white[4];break;
            case 'pijun':return white[5];break;
        }

    }else{

        switch(figure.type){
            case 'top':return black[0];break;
            case 'konj':return black[1];break;
            case 'lovac':return black[2];break;
            case 'kraljica':return black[3];break;
            case 'kralj':return black[4];break;
            case 'pijun':return black[5];break;
        }

    }

}


function print(s){
    console.log(s)
}



class table{

 
sizex=8
sizey=8
map=[]
constructor(){
   this.cleanTable();
}



cleanTable(){
    this.map=[]

    for(let x=0;x<this.sizex;x++){
        var red=[]
        for(let y=0;y<this.sizey;y++){
            red.push(new figure(null,this,x,y))
        }
        this.map.push(structuredClone(red));

    }

    console.log("cista tabela ...")

}

printTableInConsole(){

    let s=""
    for(let x=0;x<this.sizex;x++){
        
        for(let y=0;y<this.sizey;y++){
            s+=returnFigure(this.map[x][y])
            }
            s+="\n"
        } 
        console.log(s)

    }


    setTable(){
        this.cleanTable()
        //setting figures for white team
        this.map[0][0]=new topp(0,this)
        this.map[0][1]=new konj(0,this)
        this.map[0][2]=new lovac(0,this)
        this.map[0][3]=new kraljica(0,this)
        this.map[0][4]=new kralj(0,this)
        this.map[0][5]=new lovac(0,this)
        this.map[0][6]=new konj(0,this)
        this.map[0][7]=new topp(0,this)
        for(let i=0;i<this.sizey;i++){
            this.map[1][i]=new pijun(0,this)
        }
        //setting figures for black team
        this.map[this.sizex-1][0]=new topp(1,this)
        this.map[this.sizex-1][1]=new konj(1,this)
        this.map[this.sizex-1][2]=new lovac(1,this)
        this.map[this.sizex-1][3]=new kraljica(1,this)
        this.map[this.sizex-1][4]=new kralj(1,this)
        this.map[this.sizex-1][5]=new lovac(1,this)
        this.map[this.sizex-1][6]=new konj(1,this)
        this.map[this.sizex-1][7]=new topp(1,this)
        for(let i=0;i<this.sizey;i++){
            this.map[this.sizex-2][i]=new pijun(1,this)
        }
    }



}







class figure{
    type
    team
    table
    is_empty=true


    getposition(){
        
        let position={x:-1,y:-1};

        for(let x=0;x<this.table.sizex;x++){

            for(let y=0;y<this.table.sizey;y++){

                if(this.table.map[x][y]===this){
                    
                    position.x=x;
                    position.y=y;

                }

            }

        }

        return position;

    } 
        constructor(team,table){
        this.team=team;
        this.table=table
        }
     
    
    //this one returns all possible moves that that figure can make
    possibleMoves(){
    
    }
    
    //this function does the moving of figure 
    do_the_move(position){
        
        let stara_pozicija=this.getposition()
        this.table.map[position.x][position.y]=this
        this.table.map[stara_pozicija.x][stara_pozicija.y]=new figure(null,this.table);
        
    }

 

    
    }
    class pijun extends figure{//♟
        is_empty=false
        type="pijun"
        
 
    
        constructor(team,table){
            super(team,table)
        }
    
        possibleMoves(){

            let moves=[]

            
            
            if(this.team==0){
                //this one is logic for white one

                ///this try is here in case index out of bound so it wont addup and it wont crash whole program
            try{
                let go=this.getposition();
                go.x++;
                if(this.table.map[go.x][go.y].is_empty){
                    moves.push(go)
                }
            }catch(e){}


            try{
                // eating on left
                let go=this.getposition();
                go.x++;
                go.y++;
                if(this.table.map[go.x][go.y].team!=this.team && !this.table.map[go.x][go.y].is_empty){
                    moves.push(go)
                }
            }catch(e){}

            try{
                // eating on the right side
                let go=this.getposition();
                go.x++;
                go.y--;
                if(this.table.map[go.x][go.y].team!=this.team && !this.table.map[go.x][go.y].is_empty){
                    moves.push(go)
                }
            }catch(e){}
        
        }else{
                //this one is logic for blacks 
            try{
                let go=this.getposition();
                go.x--;
                if(this.table.map[go.x][go.y].is_empty){
                    moves.push(go)
                }
            }catch(e){}


            try{
                // eating on left
                let go=this.getposition();
                go.x--;
                go.y--;
                if(this.table.map[go.x][go.y].team!=this.team && !this.table.map[go.x][go.y].is_empty){
                    moves.push(go)
                }
            }catch(e){}

            try{
                // eating on the right side
                let go=this.getposition();
                go.x--;
                go.y++;
                if(this.table.map[go.x][go.y].team!=this.team && !this.table.map[go.x][go.y].is_empty){
                    moves.push(go)
                }
            }catch(e){}

        }



            return moves;
        }

    }

    class topp extends figure{//♜
        is_empty=false
        type="top"
    
    
        constructor(team,table){
            super(team,table)
        }
    
  

        possibleMoves(){
            let moves=[]
            let pos=this.getposition()
            let position=pos

            //this error will be when x of figure is sizex(out bound)
            try{
            for(let x=pos.x+1;x<this.table.sizex;x++){
                

                if(!this.table.map[x][pos.y].is_empty){
                    if(this.table.map[x][pos.y].team!=this.team){
                        moves.push({x:x,y:pos.y})
                    }
                    break;
                }else{
                    moves.push({x:x,y:pos.y})
                }
            }
            }catch(e){}


            try{
                for(let x=pos.x-1;x>=0;x--){
                    
                    if(!this.table.map[x][pos.y].is_empty){
                        if(this.table.map[x][pos.y].team!=this.team){
                            moves.push({x:x,y:pos.y})
                        }
                        break;
                    }else{
                        moves.push({x:x,y:pos.y})
                    }
                }
                }catch(e){}


            try{
                    for(let y=pos.y+1;y<this.table.sizey;y++){
                        
                        if(!this.table.map[pos.x][y].is_empty){
                            if(this.table.map[pos.x][y].team!=this.team){
                                moves.push({x:pos.x,y:y})
                            }
                            break;
                        }else{
                            moves.push({x:pos.x,y:y})
                        }
                    }
                }catch(e){}
        
        
                try{
                    for(let y=pos.y-1;y>=0;y--){
                        
                        if(!this.table.map[pos.x][y].is_empty){
                            if(this.table.map[pos.x][y].team!=this.team){
                                moves.push({x:pos.x,y:y})
                            }
                            break;
                        }else{
                            moves.push({x:pos.x,y:y})
                        }
                    }
                }catch(e){}


                return moves;
        }


        
    
    }
    
    class lovac extends figure{//♝
        is_empty=false
        type="lovac"
    
    
        constructor(team,table){
            super(team,table)
        }


        possibleMoves(){

            let position=this.getposition()
            let moves=[]
            try{
                let x=position.x+1
                let y=position.y+1
                while(true){
                    if(this.table.map[x][y]==null || this.table.map[x][y]==undefined){
                        break;
                    }
                    if(!this.table.map[x][y].is_empty){
                        if(this.table.map[x][y].team!=this.team){
                            moves.push({x:x,y:y})
                        }   
                        break;
                    }
                    moves.push({x:x,y:y})
                    x++;
                    y++;
                }
            }catch(e){}

            try{
                let x=position.x+1
                let y=position.y-1
                while(true){
                    if(this.table.map[x][y]==null || this.table.map[x][y]==undefined){
                        break;
                    }
                    if(!this.table.map[x][y].is_empty){
                        if(this.table.map[x][y].team!=this.team){
                            moves.push({x:x,y:y})
                        }   
                        break;
                    }
                    moves.push({x:x,y:y})
                    x++;
                    y--;
                }
            }catch(e){}

            try{
                let x=position.x-1
                let y=position.y-1
                while(true){
                    if(this.table.map[x][y]==null || this.table.map[x][y]==undefined){
                        break;
                    }
                    if(!this.table.map[x][y].is_empty){
                        if(this.table.map[x][y].team!=this.team){
                            moves.push({x:x,y:y})
                        }   
                        break;
                    }
                    moves.push({x:x,y:y})
                    x--;
                    y--;
                }
            }catch(e){}

            try{
                let x=position.x-1
                let y=position.y+1
                while(true){
                    if(this.table.map[x][y]==null || this.table.map[x][y]==undefined){
                        break;
                    }
                    if(!this.table.map[x][y].is_empty){
                        if(this.table.map[x][y].team!=this.team){
                            moves.push({x:x,y:y})
                        }   
                        break;
                    }
                    moves.push({x:x,y:y})
                    x--;
                    y++;
                }
            }catch(e){}

            return moves
        }
        
    
    }
    class konj extends figure{//♞
        is_empty=false
        type="konj"
    
    
        constructor(team,table){
            super(team,table)
        }

        possibleMoves(){
            let moves=[]
            let position=this.getposition()
             
            try{
                let x=position.x+2
                let y=position.y+1
                if((this.table.map[x][y].is_empty || this.table.map[x][y].team!=this.team) && this.table.map[x][y]!=null && this.table.map[x][y]!=undefined){
                    moves.push({x:x,y:y})
                }
            }catch(e){}
            try{
                let x=position.x-2
                let y=position.y-1
                if((this.table.map[x][y].is_empty || this.table.map[x][y].team!=this.team) && this.table.map[x][y]!=null && this.table.map[x][y]!=undefined){
                    moves.push({x:x,y:y})
                }
            }catch(e){}

            try{
                let x=position.x+2
                let y=position.y-1
                if((this.table.map[x][y].is_empty || this.table.map[x][y].team!=this.team) && this.table.map[x][y]!=null && this.table.map[x][y]!=undefined){
                    moves.push({x:x,y:y})
                }
            }catch(e){}

            try{
                let x=position.x-2
                let y=position.y+1
                if((this.table.map[x][y].is_empty || this.table.map[x][y].team!=this.team) && this.table.map[x][y]!=null && this.table.map[x][y]!=undefined){
                    moves.push({x:x,y:y})
                }
            }catch(e){}

            try{
                let x=position.x+1
                let y=position.y+2
                if((this.table.map[x][y].is_empty || this.table.map[x][y].team!=this.team) && this.table.map[x][y]!=null && this.table.map[x][y]!=undefined){
                    moves.push({x:x,y:y})
                }
            }catch(e){}

            try{
                let x=position.x-1
                let y=position.y-2
                if((this.table.map[x][y].is_empty || this.table.map[x][y].team!=this.team) && this.table.map[x][y]!=null && this.table.map[x][y]!=undefined){
                    moves.push({x:x,y:y})
                }
            }catch(e){}
            try{
                let x=position.x+1
                let y=position.y-2
                if((this.table.map[x][y].is_empty || this.table.map[x][y].team!=this.team) && this.table.map[x][y]!=null && this.table.map[x][y]!=undefined){
                    moves.push({x:x,y:y})
                }
            }catch(e){}

            try{
                let x=position.x-1
                let y=position.y+2
                if((this.table.map[x][y].is_empty || this.table.map[x][y].team!=this.team) && this.table.map[x][y]!=null && this.table.map[x][y]!=undefined){
                    moves.push({x:x,y:y})
                }
            }catch(e){}

            return moves
        }
        
    
    }
    class kraljica extends figure{//♛
        is_empty=false
        type="kraljica"
    
    
        constructor(team,table){
            super(team,table)
        }

        possibleMoves(){

            let position=this.getposition()

            //reason for this is because in cannon i used 'pos' for position and in hunter i used 'position' for position 
            let pos=position
            let moves=[]


            //hunter logic
            try{
                let x=position.x+1
                let y=position.y+1
                while(true){
                    if(this.table.map[x][y]==null || this.table.map[x][y]==undefined){
                        break;
                    }
                    if(!this.table.map[x][y].is_empty){
                        if(this.table.map[x][y].team!=this.team){
                            moves.push({x:x,y:y})
                        }   
                        break;
                    }
                    moves.push({x:x,y:y})
                    x++;
                    y++;
                }
            }catch(e){}

            try{
                let x=position.x+1
                let y=position.y-1
                while(true){
                    if(this.table.map[x][y]==null || this.table.map[x][y]==undefined){
                        break;
                    }
                    if(!this.table.map[x][y].is_empty){
                        if(this.table.map[x][y].team!=this.team){
                            moves.push({x:x,y:y})
                        }   
                        break;
                    }
                    moves.push({x:x,y:y})
                    x++;
                    y--;
                }
            }catch(e){}

            try{
                let x=position.x-1
                let y=position.y-1
                while(true){
                    if(this.table.map[x][y]==null || this.table.map[x][y]==undefined){
                        break;
                    }
                    if(!this.table.map[x][y].is_empty){
                        if(this.table.map[x][y].team!=this.team){
                            moves.push({x:x,y:y})
                        }   
                        break;
                    }
                    moves.push({x:x,y:y})
                    x--;
                    y--;
                }
            }catch(e){}

            try{
                let x=position.x-1
                let y=position.y+1
                while(true){
                    if(this.table.map[x][y]==null || this.table.map[x][y]==undefined){
                        break;
                    }
                    if(!this.table.map[x][y].is_empty){
                        if(this.table.map[x][y].team!=this.team){
                            moves.push({x:x,y:y})
                        }   
                        break;
                    }
                    moves.push({x:x,y:y})
                    x--;
                    y++;
                }
            }catch(e){}



            //cannon logic 

            try{
                for(let x=pos.x+1;x<this.table.sizex;x++){
                    
    
                    if(!this.table.map[x][pos.y].is_empty){
                        if(this.table.map[x][pos.y].team!=this.team){
                            moves.push({x:x,y:pos.y})
                        }
                        break;
                    }else{
                        moves.push({x:x,y:pos.y})
                    }
                }
                }catch(e){}
    
    
                try{
                    for(let x=pos.x-1;x>=0;x--){
                        
                        if(!this.table.map[x][pos.y].is_empty){
                            if(this.table.map[x][pos.y].team!=this.team){
                                moves.push({x:x,y:pos.y})
                            }
                            break;
                        }else{
                            moves.push({x:x,y:pos.y})
                        }
                    }
                    }catch(e){}
    
    
                try{
                        for(let y=pos.y+1;y<this.table.sizey;y++){
                            
                            if(!this.table.map[pos.x][y].is_empty){
                                if(this.table.map[pos.x][y].team!=this.team){
                                    moves.push({x:pos.x,y:y})
                                }
                                break;
                            }else{
                                moves.push({x:pos.x,y:y})
                            }
                        }
                    }catch(e){}
            
            
                    try{
                        for(let y=pos.y-1;y>=0;y--){
                            
                            if(!this.table.map[pos.x][y].is_empty){
                                if(this.table.map[pos.x][y].team!=this.team){
                                    moves.push({x:pos.x,y:y})
                                }
                                break;
                            }else{
                                moves.push({x:pos.x,y:y})
                            }
                        }
                    }catch(e){}



            return moves

        }
        
    
    }
    
    class kralj extends figure{//♚
        is_empty=false
        type="kralj"
    
    
        constructor(team,table){
            super(team,table)
        }

        possibleMoves(){
            let position=this.getposition()
            let moves=[]
            
            //left
            try{
                let move={x:position.x+1,y:position.y}
                if(this.table.map[move.x][move.y].is_empty || (!this.table.map[move.x][move.y].is_empty && this.table.map[move.x][move.y].team!=this.table.map[position.x][position.y].team)){
                    moves.push(move)
                }
            }catch(e){}

            //right
            try{
                let move={x:position.x-1,y:position.y}
                if(this.table.map[move.x][move.y].is_empty || (!this.table.map[move.x][move.y].is_empty && this.table.map[move.x][move.y].team!=this.table.map[position.x][position.y].team)){
                    moves.push(move)
                }
            }catch(e){}

            //up
            try{
                let move={x:position.x,y:position.y+1}
                if(this.table.map[move.x][move.y].is_empty || (!this.table.map[move.x][move.y].is_empty && this.table.map[move.x][move.y].team!=this.table.map[position.x][position.y].team)){
                    moves.push(move)
                }
            }catch(e){}

            //down
            try{
                let move={x:position.x,y:position.y-1}
                if(this.table.map[move.x][move.y].is_empty || (!this.table.map[move.x][move.y].is_empty && this.table.map[move.x][move.y].team!=this.table.map[position.x][position.y].team)){
                    moves.push(move)
                }
            }catch(e){}

            //up left
            try{
                let move={x:position.x+1,y:position.y+1}
                if(this.table.map[move.x][move.y].is_empty || (!this.table.map[move.x][move.y].is_empty && this.table.map[move.x][move.y].team!=this.table.map[position.x][position.y].team)){
                    moves.push(move)
                }
            }catch(e){}

            //up right
            try{
                let move={x:position.x+1,y:position.y-1}
                if(this.table.map[move.x][move.y].is_empty || (!this.table.map[move.x][move.y].is_empty && this.table.map[move.x][move.y].team!=this.table.map[position.x][position.y].team)){
                    moves.push(move)
                }
            }catch(e){}

            //down left
            try{
                let move={x:position.x-1,y:position.y+1}
                if(this.table.map[move.x][move.y].is_empty || (!this.table.map[move.x][move.y].is_empty && this.table.map[move.x][move.y].team!=this.table.map[position.x][position.y].team)){
                    moves.push(move)
                }
            }catch(e){}

            //down right
            try{
                let move={x:position.x-1,y:position.y-1}
                if(this.table.map[move.x][move.y].is_empty || (!this.table.map[move.x][move.y].is_empty && this.table.map[move.x][move.y].team!=this.table.map[position.x][position.y].team)){
                    moves.push(move)
                }
            }catch(e){}


            return moves;
        }

    
    }