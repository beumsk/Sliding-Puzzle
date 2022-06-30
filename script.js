// make sure puzzle is possible --> work with array
// different images
// different sizes

// https://www.sitepoint.com/image-manipulation-with-html5-canvas-a-sliding-puzzle-2/

var modal = document.querySelector(".modal");
var button = document.querySelector(".modal__button");
var puzzleBox = document.querySelector(".puzzle");
var puzzleItems = document.getElementsByClassName("items");

button.addEventListener("click", init);

// random values in boxes; insert values and add classnames
function init() {
  modal.classList.add("hidden");
  var puzzleValues = [1, 2, 3, 4, 5, 6, 7, 8, ""];
  puzzleBox.innerHTML = "";
  for (let i=0; i<9; i++) {
    var newDiv = document.createElement("div");
    let numb = random(puzzleValues);
    newDiv.innerHTML = numb;
    // newDiv.innerHTML = i ? i : "";
    newDiv.classList.add("items", "item"+numb);
    // newDiv.classList.add("items", "item"+(i ? i : ""));
    puzzleBox.appendChild(newDiv);
  }
  puzzleBox.addEventListener("click", move)
}

// on every move, check if the game is won
function check() {
  let checkArr = [];
  for (let i=0; i<9; i++) {
    if (puzzleItems[i].classList.contains("item"+(i+1))) {
      checkArr.push(i+1);
    }
  }
  if (checkArr.length === 8) {
    document.querySelector('.item').style.backgroundImage = "url(https://res.cloudinary.com/beumsk/image/upload/v1513108563/tiger_veeob8.jpg)";
    setTimeout(function() {
      button.innerHTML = "You win !";
      modal.classList.remove("hidden");
      setTimeout(function() {
        button.innerHTML = "PLAY";
      }, 800);
    }, 800);
  }
}

// takes random element af an array and deletes it
function random(arr) {
  let rand = Math.floor(Math.random() * arr.length);
  let toReturn = arr[rand];
  arr.splice(rand, 1);
  return toReturn; 
}

function swapElts(i, j, swap) {
  // p.before(span) -> <span></span><p></p>
  // p.after(span) -> <p></p><span></span>
  if (!swap) puzzleItems[j].before(puzzleItems[i]); // i,j
  else {
    puzzleItems[j].after(puzzleItems[i]); // j,i
    puzzleItems[i].before(puzzleItems[j-1]); // (j-1),i
  }
}

// on click, move this box to the 'empty' box
function move(e) {
  if (Array.from(puzzleItems).indexOf(e.target) === 0) {
    if (puzzleItems[1].classList.contains("item")) swapElts(1, 0);
    if (puzzleItems[3].classList.contains("item")) swapElts(0, 3, true);
  }
  else if (Array.from(puzzleItems).indexOf(e.target) === 1) {
    if (puzzleItems[0].classList.contains("item")) swapElts(1, 0);
    if (puzzleItems[2].classList.contains("item")) swapElts(2, 1);
    if (puzzleItems[4].classList.contains("item")) swapElts(1, 4, true);
  }
  else if (Array.from(puzzleItems).indexOf(e.target) === 2) {
    if (puzzleItems[1].classList.contains("item")) swapElts(2, 1);
    if (puzzleItems[5].classList.contains("item")) swapElts(2, 5, true);
  }
  else if (Array.from(puzzleItems).indexOf(e.target) === 3) {
    if (puzzleItems[4].classList.contains("item")) swapElts(4, 3);
    if (puzzleItems[0].classList.contains("item")) swapElts(0, 3, true);
    if (puzzleItems[6].classList.contains("item")) swapElts(3, 6, true);   
  }
  else if (Array.from(puzzleItems).indexOf(e.target) === 4) {
    if (puzzleItems[3].classList.contains("item")) swapElts(4, 3);
    if (puzzleItems[5].classList.contains("item")) swapElts(5, 4);
    if (puzzleItems[1].classList.contains("item")) swapElts(1, 4, true);
    if (puzzleItems[7].classList.contains("item")) swapElts(4, 7, true);
  }
  else if (Array.from(puzzleItems).indexOf(e.target) === 5) {
    if (puzzleItems[4].classList.contains("item")) swapElts(5, 4);
    if (puzzleItems[2].classList.contains("item")) swapElts(2, 5, true);
    if (puzzleItems[8].classList.contains("item")) swapElts(5, 8, true);
  }
  else if (Array.from(puzzleItems).indexOf(e.target) === 6) {
    if (puzzleItems[7].classList.contains("item")) swapElts(7, 6);
    if (puzzleItems[3].classList.contains("item")) swapElts(3, 6, true);    
  }
  else if (Array.from(puzzleItems).indexOf(e.target) === 7) {
    if (puzzleItems[6].classList.contains("item")) swapElts(7, 6);
    if (puzzleItems[8].classList.contains("item")) swapElts(8, 7);
    if (puzzleItems[4].classList.contains("item")) swapElts(4, 7, true);
  }
  else if (Array.from(puzzleItems).indexOf(e.target) === 8) {
    if (puzzleItems[7].classList.contains("item")) swapElts(8, 7);
    if (puzzleItems[5].classList.contains("item")) swapElts(5, 8, true);
  }
  check();
}