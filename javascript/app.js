"use strict";

/*Board Construction Initialization*/
/*Array below is only to test fast the end of the game*/
let containerIcons = ["format_shapes","bubble_chart","border_right","attach_money",
                      "graphic_eq","waves","delete_sweep","duo",
                      "contact_phone","business","sort_by_alpha","snooze",
                      "queue_music","note","library_books","games",
                      "apps","rate_review","satellite","terrain",
                      "traffic","tram","zoom_out_map","local_see",
                      "fastfood","flight","hotel","layers",
                      "directions","grain","flash_auto","collections",
                      "3d_rotation","fingerprint","delete","bug_report",
                      "card_giftcard","extension","android","face",
                      "schedule", "rowing","restore_page","room",
                      "pets","pan_tool","motorcycle","language",
                      "invert_colors","line_weight","loyalty","gravel"];
let totalCards = 16;
const diffCards = totalCards/2;
const standardNumberofCards = 16;
let oBoardInit = {
  randomNumber: 0,
  arrayIconsRandom: new Array(),
  arrayIcons: new Array (),
  arraySpan: new Array(),
  genArrayIcons() { /*do not let the game repetitive with the same icons*/
    oBoardInit.arrayIcons = containerIcons.splice( Math.floor( Math.random()* (containerIcons.length-diffCards) ) , diffCards );
    for(let index=diffCards; index < totalCards; index++) {
      oBoardInit.arrayIcons[index] = oBoardInit.arrayIcons[index-diffCards];
    }
  },

  genSpanArray() {
    let getSpan;
    for (let index=0; index <= totalCards-1; index++) {
      getSpan = "#span-" + index;
      this.arraySpan[index] = getSpan;
    }
  },
  /*Creating random numbers array (arraysIconsRandom) using this forLoop and Math function*/
  genRandom() { /*from ES6 you can instead write: genRandom : function () write as it written*/
    /*this.arrayIcons = arrayIcons;Only for testing*/
    for (let iLoop=this.arrayIcons.length-1; iLoop>= 0; iLoop--) {
      this.randomNumber = Math.floor(Math.random()*iLoop);
      oBoardInit.arrayIconsRandom[iLoop] = this.arrayIcons[oBoardInit.randomNumber];
      this.arrayIcons.splice(this.randomNumber,1);/*to make sure it will keep the same elements-so remove the used element*/
    };
  },
  /*Check how many cards we need and then increase the board*/
  updateHtmlElements() {
    let numbersOfDivs = document.body.children[2].children.length;
    /*Adding or removing div*/

    const fragment = document.createDocumentFragment();  // ← uses a DocumentFragment instead of a <div>
    for (let i = 0; i < (totalCards-standardNumberofCards); i++) {
      const newElementDiv = document.createElement("div");
      const newElementSpan = document.createElement("span");
      /*newElement.innerText = 'This is paragraph number ' + i;*/
      newElementDiv.setAttribute("id", "div-" + (standardNumberofCards+i) )
      newElementSpan.setAttribute("id", "span-" + (standardNumberofCards+i) )
      newElementSpan.setAttribute("class", "hide md-48")
      fragment.appendChild(newElementDiv);
      newElementDiv.appendChild(newElementSpan);
    }
    document.getElementById("grid-container").appendChild(fragment); // reflow and repaint here -- once!

      for (let i=0; i < (numbersOfDivs-standardNumberofCards); i++) {
        let remElement = document.getElementById("div-" + (standardNumberofCards+i));
        remElement.parentNode.removeChild(remElement);
      }

  },
  /*Game Grid Initialization: passing the random Array (arrayIconsRandom) to the Grid (arraySpan)*/
  gridInit() {
    for (let iLoop = totalCards-1; iLoop >= 0; iLoop--) {
      document.querySelector(this.arraySpan[iLoop]).textContent = this.arrayIconsRandom[iLoop];
      this.arrayIcons.splice(iLoop,1);
      this.arraySpan.splice(iLoop,1);
    };
  }
};

/*oTimer Literal Object*/
let oTimer = {

 timeNow: 0,
 timeGameStart: 0,
 runTime: 0,
 elapsedTimer: 0,

 /*Start Timer*/
 startTimer() {
    this.timeGameStart = Date.now();
    this.elapsedTimer = setInterval(this.displayTimer, 1000); /*Start game timer*/
  },

/*Calculate and write the timer*/
 displayTimer() {
    this.runTime = Date.now() - oTimer.timeGameStart;
    let timeElapsedMillisec = Math.floor(this.runTime/1000);
    document.querySelector("#span-timer-m").textContent = Math.floor(timeElapsedMillisec / 60);
    document.querySelector("#span-timer-s").textContent =  timeElapsedMillisec - (Math.floor(timeElapsedMillisec / 60)*60 );
  }

};

let oMemoryGame = {
  /*Game functions variables*/
  flipIndex: 0, /*track the number of flip cards*/
  arrayIconsFlipped: new Array("none", "none-1"),/*store the name of icons to compare*/
  arraySpanIdFlipped: new Array(2), /*store the id of span elements flipped*/
  arrayDivIdFlipped: new Array(2), /*store the div of elements flipped*/
  arrayIdStars: new Array("star1","star2","star3","star4"),
  starRemoved: new Array("star5","star6","star7"),
  starIndex: 0, /*track number in the array (arrayIdStars)*/
  flipCorrectIndex: 0, /*to track the end of the game*/
  flipMissIndex: 0, /*to track misses*/

  /*Total Reset For New Start*/
  totalReset() {
    /*Total Reset for oMemoryGame*/
    /*Game functions variables*/
    oMemoryGame.flipIndex = 0; /*track the number of flip cards*/
    oMemoryGame.arrayIconsFlipped = new Array("none", "none-1");/*store the name of icons to compare*/
    oMemoryGame.arraySpanIdFlipped = new Array(2); /*store the id of span elements flipped*/
    oMemoryGame.arrayDivIdFlipped = new Array(2); /*store the div of elements flipped*/
    oMemoryGame.arrayIdStars = new Array("star1","star2","star3","star4");
    oMemoryGame.starRemoved = new Array("star5","star6","star7");
    oMemoryGame.starIndex = 0; /*track number in the array (arrayIdStars)*/
    oMemoryGame.flipCorrectIndex = 0; /*to track the end of the game*/
    oMemoryGame.flipMissIndex = 0; /*to track misses*/

    let container = document.querySelector("#grid-container");
    let listSpans = container.querySelectorAll("span");
    let listDivs = container.querySelectorAll("div");
    for(let i = 0; i < listSpans.length; i++) {
      listSpans[i].classList.add("hide");
      listSpans[i].classList.remove("material-icons");
      listDivs[i].classList.remove("effect-correct");
    }

    let containerStars = document.querySelector("#stars");
    let listStars = containerStars.querySelectorAll("img");
    console.log(listStars);
    for(let i = 0; i < 3; i++) {
      listStars[i].classList.remove("hide");
    }
  },
  /*Effect change of Element*/
  effectError() {
    document.getElementById(oMemoryGame.arrayDivIdFlipped[0]).classList.add("effect-error");
    document.getElementById(oMemoryGame.arrayDivIdFlipped[1]).classList.add("effect-error");
  },
  /*Effect change of Element*/
  effectCorrect() {
    document.getElementById(oMemoryGame.arrayDivIdFlipped[0]).classList.add("effect-correct");
    document.getElementById(oMemoryGame.arrayDivIdFlipped[1]).classList.add("effect-correct");
  },
  /*reset to restart the round NOT THE GAME*/
  reset() {
    oMemoryGame.flipIndex = 0;
    oMemoryGame.arrayIconsFlipped.splice(0,2);
    oMemoryGame.arraySpanIdFlipped.splice(0,2);
    oMemoryGame.arrayDivIdFlipped.splice(0,2);
    /*Game start again! Done to avoid more than two cards flipped at once*/
    document.querySelector("#grid-container").addEventListener("click", runGame, true);
  },
  /*Cards do not match*/
  redoFlip() {
    oMemoryGame.flipMissIndex++;
    if ( (oMemoryGame.flipMissIndex % 3 === 0) && (oMemoryGame.arrayIdStars.length > 1) ) { /*I want always 1 star there*/
      oMemoryGame.starIndex = oMemoryGame.arrayIdStars.length-1;
      document.getElementById(oMemoryGame.arrayIdStars[oMemoryGame.starIndex]).classList.add("hide");
      oMemoryGame.starRemoved[oMemoryGame.starRemoved.length] = oMemoryGame.arrayIdStars.pop();
    }
    console.log(oMemoryGame.starRemoved);
    document.querySelector("#span-miss").textContent = oMemoryGame.flipMissIndex;
    document.getElementById(oMemoryGame.arrayDivIdFlipped[0]).classList.remove("effect-error");
    document.getElementById(oMemoryGame.arrayDivIdFlipped[1]).classList.remove("effect-error");
    document.getElementById(oMemoryGame.arraySpanIdFlipped[0]).classList.toggle("material-icons");
    document.getElementById(oMemoryGame.arraySpanIdFlipped[0]).classList.toggle("hide");
    document.getElementById(oMemoryGame.arraySpanIdFlipped[1]).classList.toggle("material-icons");
    document.getElementById(oMemoryGame.arraySpanIdFlipped[1]).classList.toggle("hide");
    oMemoryGame.reset();
  },
/*Cards match*/
  matchCards() {
    this.flipCorrectIndex++;
    if ( oMemoryGame.starRemoved.length >= 1 ) {
      document.getElementById(oMemoryGame.starRemoved[oMemoryGame.starRemoved.length-1]).classList.remove("hide");
      oMemoryGame.arrayIdStars.push(oMemoryGame.starRemoved.pop());
    }
    document.querySelector("#span-hits").textContent = this.flipCorrectIndex;
    this.effectCorrect();
    this.reset();
  },
  showCards() {
    document.getElementById(oMemoryGame.arraySpanIdFlipped[oMemoryGame.flipIndex]).classList.toggle("material-icons"); /*display element*/
    document.getElementById(oMemoryGame.arraySpanIdFlipped[oMemoryGame.flipIndex]).classList.toggle("hide"); /*display element*/
    document.getElementById(oMemoryGame.arrayDivIdFlipped[oMemoryGame.flipIndex]).classList.toggle("effect-rotate");
    oMemoryGame.flipIndex++;

    if (oMemoryGame.flipIndex == 2) {

      if( (oMemoryGame.arrayIconsFlipped[0] === oMemoryGame.arrayIconsFlipped[1]) && (oMemoryGame.arrayDivIdFlipped[0] != oMemoryGame.arrayDivIdFlipped[1]) ) { /*avoid to count at same card*/
        oMemoryGame.matchCards ();
        if (oMemoryGame.flipCorrectIndex == diffCards) {
          clearTimeout(oTimer.elapsedTimer);
          /*location.reload(); /*restart the game*/
        }
      } else {
        document.querySelector("#grid-container").removeEventListener("click", runGame, true); /*prevent the user from selecting the same card twice*/
        oMemoryGame.effectError();
        setTimeout(oMemoryGame.redoFlip,1000);
      }
    }
  },
}

function startGame(levelDifficult) {

/*Setting the Board*/
totalCards = levelDifficult;
oBoardInit.updateHtmlElements();
oBoardInit.genArrayIcons();
oBoardInit.genSpanArray();
oBoardInit.genRandom(); /*generate an array of random numbers*/
oBoardInit.gridInit(); /*write the respective cards to the board*/

oMemoryGame.totalReset();


/*STARTING THE GAME*/

oTimer.startTimer(); /*Start game timer*/

};

startGame(16);

function runGame(evt) {
  oMemoryGame.arrayIconsFlipped[oMemoryGame.flipIndex] = evt.target.textContent; /*get the name of element flipped*/
  if( evt.target.children.length != 0 ) { /*avoid errors when clicking at same element*/
    oMemoryGame.arraySpanIdFlipped[oMemoryGame.flipIndex] = evt.target.children[0].id; /*get the span of element flipped*/
    /*oMemoryGame.arrayDivIdFlipped[oMemoryGame.flipIndex] = evt.path[0].id; /*get the div of element flipped: WORKS ONLY IN GOOGLE CHROME*/
    oMemoryGame.arrayDivIdFlipped[oMemoryGame.flipIndex] = evt.target.id; /*this works in IE, Google Chrome and Firefox*/
    document.getElementById(oMemoryGame.arrayDivIdFlipped[oMemoryGame.flipIndex]).classList.toggle("effect-rotate");
    setTimeout(oMemoryGame.showCards,400); /*delay because it takes time to make the animation*/
  }
}

/*Game start at first click*/
document.querySelector("#grid-container").addEventListener("click", runGame, true);

/*button refresh page*/
document.querySelector("#buttonRestart").addEventListener("click", function(){
  /*location.reload();*/
  startGame(24);
});

/*button increase level and refresh page*/
document.querySelector("#buttonLevelHard").addEventListener("click", function(){
  /*location.reload();*/
  startGame(32);
});
/*button increase level and refresh page*/
document.querySelector("#buttonLevelEasy").addEventListener("click", function(){
  /*location.reload();*/
  startGame(16);
});
