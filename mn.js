var Game = {};
var UI = {};

Game.init = function() {
  Game.placeRandom();
  Game.placeRandom();
};

Game.move = function(dir) {
  if(dir === 'north') {
    for(col = 1; col <= 4; col++) {
      for(repeat = 0; repeat <= 3; repeat++) {
        for(row = 1; row <= 3; row++) {
          Game.merge(col, row, col, row+1);
        }
      }
    }
  } else if(dir === 'south') {
    for(col = 1; col <= 4; col++) {
      for(repeat = 0; repeat <= 3; repeat++) {
        for(row = 4; row >= 2; row--) {
          Game.merge(col, row, col, row-1);
        }
      }
    }
  } else if(dir === 'west') {
    for(row = 1; row <= 4; row++) {
      for(repeat = 0; repeat <= 3; repeat++) {
        for(col = 1; col <= 3; col++) {
          Game.merge(col, row, col+1, row);
        }
      }
    }
  } else if(dir === 'east') {
    for(row = 1; row <= 4; row++) {
      for(repeat = 0; repeat <= 3; repeat++) {
        for(col = 4; col >= 2; col--) {
          Game.merge(col, row, col-1, row);
        }
      }
    }
  }
  Game.placeRandom();
};

Game.merge = function(col1, row1, col2, row2) {
  var value1 = Game.get(col1, row1);
  var value2 = Game.get(col2, row2);
  if(value1 === value2) {
    Game.set(col1, row1, value1+value2);
    Game.set(col2, row2, "");
  } else if (value1 === "") {
    Game.set(col1, row1, value2);
    Game.set(col2, row2, "");
  }
}

Game.placeRandom = function() {
  var freeFields = Game.getFreeFields();
  if(freeFields.length === 0) {
    alert("game over");
    return;
  }
  var index = Game.random(0, freeFields.length-1);
  var num = 2;
  if(Game.random(1, 10) > 8) {
    /* 20 percent chance that the generated number is a 4 instead of a 2. */
    num = 4;
  }
  freeFields[index].innerHTML = "" + num;
};

Game.getFreeFields = function() {
  var freeFields = [];
  Game.walkFields(function(col, row) {
    if(Game.isEmpty(col, row)) {
      freeFields[freeFields.length] = Game.sel(col, row);
    }
  });
  return freeFields;
};

Game.walkFields = function(func) {
  for(col = 1;col <= 4;col++) {
    for(row = 1;row <= 4;row++) {
      func(col, row);
    }
  }
};

Game.get = function(col, row) {
  var content = Game.sel(col, row).innerHTML;
  if(content === "") {
    return "";
  } else {
    return parseInt(content);
  }
};

Game.set = function(col, row, val) {
  Game.sel(col, row).innerHTML = "" + val;
};

Game.isEmpty = function(col, row) {
    var field = Game.sel(col, row);
    return field.innerHTML === "";
};

Game.sel = function(col, row) {
  return document.getElementById('field_' + col + '_' + row);
};

Game.random = function(from, to) {
  return Math.floor((Math.random() * to) + from);
};

UI.drawTriangle = function(canvas, x1, y1, x2, y2, x3, y3) {
  var c = document.getElementById(canvas); 
  var ctx = c.getContext("2d");
  ctx.fillStyle = "#FFFFFF";
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.lineTo(x3, y3);
  ctx.closePath();
  ctx.fill();
};

UI.draw = function() {
  UI.drawTriangle("north", 10, 5, 20, 15, 0, 15);
  UI.drawTriangle("south", 0, 5, 10, 15, 20, 5);
  UI.drawTriangle("west", 5, 10, 15, 0, 15, 20);
  UI.drawTriangle("east", 5, 0, 15, 10, 5, 20);
};

window.onload = function() {
  UI.draw();
  Game.init();
};

