window.addEventListener("load",bindEvents);
function bindEvents(){
    IntialState();
    // setTextTable();
    OpenChoosen();
}
function IntialState(){
    var multibox= document.querySelector("#Multi-Box");
    var singlebox = document.querySelector("#Single-Box");
    // var choosebox = document.querySelector("#chooseNo");
    // choosebox.className="hide";
    // choosebox.className="show";
    // singlebox.className="hide";
    multibox.classList="show layout";

}
function OpenChoosen(){
    var reset = true;
    var multibox= document.querySelector("#Multi-Box");
    var singlebox = document.querySelector("#Single-Box");
    singlebox.className="hide";
    // var choosebox = document.querySelector("#chooseNo");
    // document.querySelector("#single").addEventListener("click",()=>{
    //     console.log("single player is selected")
    //     choosebox.className="hide";
    //     // singlebox.className="show layout";
    //     ResetBoard(); 
    //     setCountWin(); 
    // })  ;
    // document.querySelector("#multi").addEventListener("click",()=>{
        // choosebox.className="hide";
        multibox.className="show layout";  
        ResetBoard();  
        setCountWin();
        setTextTable();
        setInitialZoom();
    // })  ;
    checkHome();
    checkreset();
}
function hideLine(){
    var line= document.querySelector("#line");
    line.className="hide";
}
function ResetBoard2(){
    ResetBoard();
    setCountWin();
}
function setCountWin(){
    var count2 = document.querySelector("#countP2");
    var count1 = document.querySelector("#countP1"); 
    // var count3 = document.querySelector("#countY");
    // var count4 = document.querySelector("#countC"); 
    count1.innerText="0";
    count2.innerText="0"; 
    // count3.innerText="0";
    // count4.innerText="0"; 
}
function setInitialZoom(){
    var divp1=document.querySelector("#turn-P1"); 
    var divp2 = document.querySelector("#turn-P2");
    divp1.className="zoom2";
    divp2.className="zoom";
}
function checkHome(){
    document.querySelector("#M-home").addEventListener("click",ResetBoard2);
    document.querySelector("#S-home").addEventListener("click",IntialState);
}
function checkreset(){
    document.querySelector("#M-reset").addEventListener("click",ResetBoard);
    // document.querySelector("#S-reset").addEventListener("click",ResetBoard);
}
function setTextTable(reset){
    var cells = document.getElementsByTagName("td");
    var count=0;
    var player=TicTacToeOperations.CurrentPlayer;
    for(let i=0;i<cells.length;i++){
        cells[i].addEventListener("click",()=>{
            count++;
            var invalidMove = false;
            var Win=TicTacToeOperations.getWin();
            if(cells[i].innerText=="O"||cells[i].innerText=="X"||Win){
                invalidMove=true;
                // player = TicTacToeOperations.CurrentPlayer;
            }
            else{
                setClass(player,i);
                player=TicTacToeOperations.TogglePlayer(player);
                setZoom(player);
            }

            if(count>=5){
                var wincells = TicTacToeOperations.CheckWin(cells);
                drawLine(wincells,player);
                if(!invalidMove){
                PrintWinner(player);
                }
            }    
        });
    }
}
function drawLine(wincells,player){
    var line=document.querySelector("#line");
    setcolor(line,player);
    if(wincells=="diag1"){
        line.className="show lined";
    }else
    if(wincells=="diag2"){
        line.className="show lined2";
    }else
    if(wincells=="H0"){
        line.className="show lineh0";
    }else
    if(wincells=="H1"){
        line.className="show lineh1";
        // line.style.top="46%";       
    }else
    if(wincells=="H2"){
        line.className="show lineh2 ";
    }else
    if(wincells=="V0"){
        line.className="show linev linev0";
    }else
    if(wincells=="V1"){
        line.className="show linev";
    }else
    if(wincells=="V2"){
        line.className="show linev linev2";
    }
}

function setcolor(line,player){
    if(player=="X"){
        line.style.backgroundColor="#C7493A";
    }else
    if(player=="O"){
        line.style.backgroundColor="#8E8741";
    }
}
function setZoom(player){
    var divp1=document.querySelector("#turn-P1"); 
    var divp2 = document.querySelector("#turn-P2");
    if(player =="X"){
        divp1.className="zoom";
        divp2.className="zoom2";
    }
    else{
        divp2.className="zoom";
        divp1.classList="zoom2";
    }
}
function setClass(player,no){
    var cells = document.getElementsByTagName("td");
    for(let i=0;i<cells.length;i++){
        if(i==no){
        cells[i].innerText=player;
            if(player =="O"){
                cells[no].className="cellP1";
            }
            else{
                cells[no].className="cellP2";
            }
        }
    }            
}
function ResetBoard(){
    TicTacToeOperations.isWin=false;
    var cells = document.getElementsByTagName("td");
    for(let i=0;i<cells.length;i++){
        cells[i].innerText= " ";
    }
    hideLine();
}
function PrintWinner(player){
    var count1 = document.querySelector("#countP1");
    var count2 = document.querySelector("#countP2");
    count1.className="format1";
    count2.className="format2";
    var gameOver = TicTacToeOperations.getWin();
    if(gameOver){
        var winner = TicTacToeOperations.getPlayer(player);
        if(winner==1){
            var count1 = document.querySelector("#countP1");
            var no=parseInt(count1.innerText);
             var n1=no+1;
            count1.innerText=null;
            count1.innerHTML=n1;
            count1.className="blink format1";

        }else{
            var count2 = document.querySelector("#countP2");
            var no=parseInt(count2.innerText);
            var n1=no+1;
            count2.innerText=null;
            count2.innerText=n1;
            count2.className="blink format2";
        }
    }

}