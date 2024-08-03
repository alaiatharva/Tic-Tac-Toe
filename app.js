let boxes = document.querySelectorAll(".box");
let reset = document.querySelector("#reset-btn");
let newBtn = document.querySelector("#new-btn");
let msgCont = document.querySelector(".msg-cont");
let msg =document.querySelector("#msg");

let turn0 = true;
let count = 0;

let winPattern = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],
];

const resetGame = () => {
    turn0 = true;
    count = 0;
    enableBoxes();
    msgCont.classList.add("hide");
}

boxes.forEach((box) => {
    box.addEventListener("click", () => {
       if(turn0){
        box.innerHTML = '<div style = "color:purple">O</div>';
        turn0 = false;
       }
       else{
        box.innerHTML = '<div style = "color:brown">X</div>';
        turn0 = true;
       }
       box.disabled = true;
       count++;
       let isWinner = checkWinner();

       if (count === 9 && !isWinner){
            gameDraw();
       }
    })
});

const gameDraw = () => {
    msg.innerText = `Game was a Draw`;
    msgCont.classList.remove("hide");
    disableBoxes();
}

const disableBoxes = () => {
    for(let box of boxes){
        box.disabled = true;
    }
}

const enableBoxes = () => {
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
}

const showWinner= (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgCont.classList.remove("hide");
    disableBoxes();
}

let checkWinner = () => {
    for(let pattern of winPattern) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if(pos1Val != "" && pos2Val != "" && pos3Val != ""){
            if(pos1Val === pos2Val && pos2Val === pos3Val){
                showWinner(pos1Val);
            }
        }
    }
};

newBtn.addEventListener("click", resetGame);
reset.addEventListener("click", resetGame);