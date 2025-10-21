let nextBlock;
let Rblock;
let randomIndex;

initBoard()
function initBoard(){
    board = document.getElementById('gameBoard');
    for (let i = 0; i < 230; i++) {
        if (i<10) {
        board.innerHTML += '<div class="box" id="0'+i+'"></div>'
        }else
        board.innerHTML += '<div class="box" id="'+i+'"></div>'
    }
    startGame()
}
 


//
function startGame(){
    let generateRandom = generateBlock()
    AddBlock(generateRandom[0],generateRandom[1])
}

function generateBlock(){ 

    let blockTypes = [
        [25,24,14,26],
        [25,26,16,24],
        [15,25,16,14], 
        [15,16,24,25],
        [15,14,25,26], 
        [16,15,14,17],
        [15,16,25,26],
    ]
    Rblock = Math.floor(Math.random()*blockTypes.length) 
    return [blockTypes[Rblock],Rblock]
}

function addNextBlock(blockType) {
    const nextBlockSection = document.getElementById('nextBlockSection');
    const nextBlockSectionBoxs = nextBlockSection.querySelectorAll('.Nbox')
    nextBlockSectionBoxs.forEach(b=>{
        b.innerHTML='';
    })
    for (let i = 0; i < 4; i++) {
        const target = nextBlockSection.querySelector('#B' + blockType[i]);
        if (target)
            target.innerHTML = `<div class="Nblock"></div>`;
    }
}


function AddBlock(blockType,random){
    randomIndex = random;
    //console.log('blockType',blockType)
    nextBlock = generateBlock();
    addNextBlock(nextBlock[0])
    //console.log('nextBlock',nextBlock)
    for (let i = 0; i < 4; i++) {
        if (i == 0) {
            document.getElementById(blockType[i]).innerHTML = `<div class="block" id="center"></div>` 
        }else{
            document.getElementById(blockType[i]).innerHTML = `<div class="block"></div>` 
        }          
    }
    down() 
}
addEventListener("keydown", function(event) {
    if (event.keyCode === 38) {
        //console.log('rotate')
        rotate()
    }
});
addEventListener("keydown", function(event) {
    if (event.keyCode === 37) {
        Left()
    }
});
addEventListener("keydown", function(event) {
    if (event.keyCode === 39) {
        right()
    }
});
addEventListener("keydown", function(event) {
    if (event.keyCode === 40) {
        down()
    }
});
function rotate(){
    center = +document.getElementById("center").parentNode.id
    let blockTypes = [
        [
            [
                [-11,-10,-9,+10],
                [-9,+1,+11,-1],
                [11,+10,+9,-10],
                [9,-11,-1,+1]
            ],[
                [
                    [-11,-1,1],
                    [-9,-10,10],
                    [11,1,-1],
                    [9,-10,10]
                ],[
                    [-10,-9,+10],
                    [1,11,-1],
                    [10,-10,9],
                    [-11,-1,1]
                ]
            ]
        ],[
            [
                [-9,10,-10,11],
                [11,9,1,-1], 
                [9,10,-10,-11],
                [-11,-9,1,-1]
            ],[
                [
                    [-9,-1,1],
                    [11,-10,10],
                    [9,1,-1],
                    [-11,-10,10]
                ],[
                    [-10,11,+10],
                    [1,9,-1],
                    [10,-10,-11],
                    [-9,-1,1]
                ]
            ]
        ],[
            [
                [10,-10],
                [-1,1],
                [-10,10],
                [1,-1] 
            ],[
                [[1],[10],[-1],[-10]],
                [[-10],[1],[10],[-1]]
                
            ]
        ],[
            [
                [9,-10,11],
                [-10,10,9]
            ],[
                [
                    [9,10],
                    [-10,11]
                ],[
                    [-10,11],
                    [9,10]
                ]
            ]
        ],[
            [
                [11,-10,9],
                [9,10,11]
            ],[
                [
                    [11,10],
                    [9,-10]
                ],[
                    [-10,9],
                    [11,10]
                ]
            ]
        ],[
            [
                [1,10,-20,-10],
                [10,1,-2,-1], 
            ],[
                [
                    [-2,-1,1],
                    [10,-20,-10],
                ],[
                    [10,-20,-10],
                    [1,-1,-2],
                ]
            ]
        ]
    ]
    //console.log(blockTypes[randomIndex])
    for (let j = 0; j < blockTypes[randomIndex][0].length; j++) {
        let Rotate = 1; 
        for (let i = 0; i < blockTypes[randomIndex][0][j].length; i++) {
            if (i== 0) {
                if (document.getElementById(center+blockTypes[randomIndex][0][j][i]).innerHTML == "") {
                    Rotate = 0
                    break;
                }
            }else{
                if (document.getElementById(center+blockTypes[randomIndex][0][j][i]).innerHTML != "") {
                    Rotate = 0
                    break;
                }
            }
        } 
        if (Rotate) {
            if (randomIndex == 5) {
                if (center%10 == 1) {
                    right() 
                }
                if (center%10 == 0) {
                    right()
                    right()
                }               
            }else
            if (center%10 == 0) {
                right()
            }else
            if (center%10 == 9) {
                Left() 
            }
        center = +document.getElementById("center").parentNode.id
            for (let i = 0; i < blockTypes[randomIndex][1][0][j].length; i++) {
                for (let q = 0; q < blockTypes[randomIndex][1][0][j].length; q++) {
                    document.getElementById(center+blockTypes[randomIndex][1][0][j][i]).innerHTML = ""                    
                }
                for (let q = 0; q < blockTypes[randomIndex][1][1][j].length; q++) {
                    document.getElementById(center+blockTypes[randomIndex][1][1][j][i]).innerHTML = `<div class="block"></div>`
                }
            }
            
            break;
        }        
    }
}
 
setInterval(function(){
    let Drop = 1;
    let blocks = document.getElementsByClassName("block")
    for (let i = 0; i < blocks.length; i++) {
        const element = +blocks[i].parentNode.id;
        if (element+10 <230 && document.getElementById(+element+10).className == "box") {
        }else{ 
            Drop = 0;
            break;
        }
    } 
    if (Drop) {  
        for (let i = blocks.length-1; i >= 0; i--) {
            const element = +blocks[i].parentNode.id;
            document.getElementById(element+10).innerHTML = document.getElementById(element).innerHTML
            document.getElementById(element).innerHTML = "" 
        }
    }else{
        for (let i = blocks.length-1; i >= 0; i--) {
            const element = blocks[i];
            document.getElementById(+blocks[i].parentNode.id).className = "boxed"
            element.className = "blocked"
        }
        lineTest()
        document.getElementById('combo').innerHTML = 'X'+combo/5;
        document.getElementById('score').innerHTML = score;
        setTimeout(function(){
            AddBlock(nextBlock[0],nextBlock[1])
        },500)
    }
},1000) 


function Left(){
    let Left = 1;
    let blocks = document.getElementsByClassName("block")
    for (let i = 0; i < blocks.length; i++) {
        const element = +blocks[i].parentNode.id;
        if (element%10 != 0 && document.getElementById(+element-1).className == "box") {
        }else{ 
            Left = 0;
            break;
        }
    } 
    if (Left) {  
        for (let i = 0; i < blocks.length; i++) {
            const element = +blocks[i].parentNode.id;
            document.getElementById(element-1).innerHTML = document.getElementById(element).innerHTML
            document.getElementById(element).innerHTML = ""
            
        }
    }
}

function right(){
    let right = 1;
    let blocks = document.getElementsByClassName("block")
    for (let i = 0; i < blocks.length; i++) {
        const element = +blocks[i].parentNode.id;
        if (element%10 != 9 && document.getElementById(+element+1).className == "box") {
        }else{ 
            right = 0;
            break;
        }
    } 
    if (right) {  
        for (let i = blocks.length-1; i >= 0; i--) {
            const element = +blocks[i].parentNode.id;
            document.getElementById(element+1).innerHTML = document.getElementById(element).innerHTML
            document.getElementById(element).innerHTML = ""
            
        }
    }
}

function down(){
    let down = 1;
    let blocks = document.getElementsByClassName("block")
    for (let i = 0; i < blocks.length; i++) {
        const element = +blocks[i].parentNode.id;
        if (element+10 <230 && document.getElementById(+element+10).className == "box") {
        }else{ 
            down = 0;
            break;
        }
    } 
    if (down) {  
        for (let i = blocks.length-1; i >= 0; i--) {
            const element = +blocks[i].parentNode.id;
            document.getElementById(element+10).innerHTML = document.getElementById(element).innerHTML
            document.getElementById(element).innerHTML = ""
            
        }
    }
}

var score = 0;
var combo = 0;
function lineTest(){
    for (let i = 0; i < 23; i++) {
        let line = 1
        for (let j = 0; j < 10; j++) {
            if (document.getElementById(i+""+j).innerHTML == "") {
                line = 0 
                break;
            }
        }
        if (line) {
            for (let j = 0; j < 10; j++) {
                //console.log(i+""+j)
                document.getElementById(i+""+j).className = "box"          
                document.getElementById(i+""+j).innerHTML = ""          
            }
            //console.log(i)
            for (let o = (i-1)*10+9; o >= 0; o--) {
                if (document.getElementById(o) && document.getElementById(o).innerHTML != "") {
                    
                document.getElementById(o+10).innerHTML = `<div class="blocked"></div>`
                document.getElementById(o+10).className = "boxed"
                document.getElementById(o).innerHTML = "" 
                document.getElementById(o).className = "box"
                }
            }
            
            score+=10+combo;
            combo+=5;
            //console.log(score)
            //document.getElementById('combo').innerHTML = 'X'+combo/5;
            //document.getElementById('score').innerHTML = score;
        }else{
            combo = 0;
        }
    }
}

//// touch

let startX = 0; 
let startY = 0;
let currentX = 0;
let currentY = 0;
let isDragging = false;
 
document.body.addEventListener('touchstart', e => {
    isDragging = true;
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
});
document.body.addEventListener('touchend', e => {
    if (!isDragging) return;
    isDragging = false;

    const endX = e.changedTouches[0].clientX;
    const endY = e.changedTouches[0].clientY;

    const diffX = endX - startX;
    const diffY = endY - startY;

    if (Math.abs(diffX) < 10 && Math.abs(diffY) < 10) {
        rotate();
    }
});
 
document.body.addEventListener('touchmove', e => {
    if (!isDragging) return;
    currentX = e.touches[0].clientX;
    currentY = e.touches[0].clientY;
    const threshold = 50;
    const diffX = currentX - startX;
    const diffY = currentY - startY;
    //console.log(diffX)
    if (diffX > threshold) {
    right();
    //console.log('---->')
    startX = currentX; 
    }  
    if (diffX < -threshold) {
    startX = currentX; 
    Left();
    //console.log('<----')
    }
    if (diffY > threshold) {
        down()
        startY = currentY;
    }
    
})