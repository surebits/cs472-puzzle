let a = [];

$(document).ready(function () {
  a = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
  init();

  $("#shufflebutton").click(shuffle);

  $("div.puzzlepiece").each(function (i) {
    $(this).click(function () {
      if ($(this).hasClass("movablepiece")) {
        moveToAvailSlot(i);
      }
    });
  });
});

let init = function () {
  let divs = $("div#puzzlearea").children();

  for (let i = 0; i < a.length; i++) {
    if (a[i] != 16) {
      let div = divs.eq(a[i] - 1);

      let x = ((a[i] - 1) % 4) * 100;
      let y = Math.floor((a[i] - 1) / 4) * 100;
      let ix = (i % 4) * 100;
      let iy = Math.floor(i / 4) * 100;

      div.addClass("puzzlepiece");
      div.css("left", ix + "px");
      div.css("top", iy + "px");
      div.css("backgroundImage", 'url("images/background.jpg")');
      div.css("backgroundPosition", -x + "px " + -y + "px");

      div.x = ix;
      div.y = iy;
    }
  }
  markAvailSlot();
};

let shuffle = function () {
  a = mixArray(a);
  init();
};

function moveToAvailSlot(idx) {
  let availIdx = findPost(16) - 1;
  let clickedIdx = findPost(idx + 1) - 1;

  temp = a[availIdx];
  a[availIdx] = a[clickedIdx];
  a[clickedIdx] = temp;

  init();
}

function mixArray(array) {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

function findPost(pvalue) {
  return a.findIndex((i) => i == pvalue) + 1;
}

function addMoveClass(divs, indices) {
  indices.forEach((index) => {
    divs.eq(a[index] - 1).addClass("movablepiece");
  });
}

const grid = {
  16: [14, 11],
  15: [10, 13, 15],
  14: [12, 14, 9],
  13: [13, 8],
  12: [7, 10, 15],
  11: [6, 9, 11, 14],
  10: [5, 8, 10, 13],
  9: [4, 9, 12],
  8: [3, 6, 11],
  7: [2, 5, 7, 10],
  6: [1, 4, 6, 9],
  5: [0, 5, 8],
  4: [7, 2],
  3: [6, 1, 3],
  2: [5, 2, 0],
  1: [4, 1],
};

function markAvailSlot() {
  let emptyIndex = findPost(16);
  let divs = $("div#puzzlearea").children();
  divs.removeClass("movablepiece");
  addMoveClass(divs, grid[emptyIndex]);
}
