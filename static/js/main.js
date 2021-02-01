const IMG_SIZE = 28;
const CELL_DEFAULT_COLOR = "rgb(255, 255, 255)";
const CELL_HIGHLIGHTED_COLOR = "rgb(0, 0, 0)";

function myFunction() {
  var x = document.createElement("TABLE");
  x.setAttribute("id", "img_grid");
  x.setAttribute("oncontextmenu", "return!1");
  document.body.appendChild(x);


  for (var i = 0; i < IMG_SIZE; i++) {
    var y = document.createElement("TR");
    var name = i;
    y.setAttribute("id", name);
    document.getElementById("img_grid").appendChild(y);

    for (var j = 0; j < IMG_SIZE; j ++) {
      var id = name + ',' + j;
      var z = document.createElement("TD");
      z.setAttribute("id", id);
      var t = document.createTextNode(id);
      z.appendChild(t);
      document.getElementById(name).appendChild(z);

    }

  }

  var h = document.createElement("H1");
  var t = document.createTextNode("~");
  h.appendChild(t);
  h.setAttribute("id", "net_out_value");
  document.body.appendChild(h);

}



function setGridCells() {
    let table_grid = document.getElementById('img_grid');
    for (let row = 0; row < IMG_SIZE; row++) {
        for (let col = 0; col < IMG_SIZE; col++) {
            const table_cell = table_grid.rows[row].cells[col];
            const mouse_left_click = 1;
            const mouse_right_click = 3;
            table_cell.onmousemove = function (event) {
                const mouse_btn = event.which;
                if (mouse_btn == mouse_left_click) {
                    onLeftClick(this);
                }
                else if (mouse_btn == mouse_right_click) {
                    onRightClick(this);
                }

            };

            table_cell.onmousedown = function (event) {
                const mouse_btn = event.which;
                if (mouse_btn == mouse_left_click) {
                    onLeftClick(this);
                }
                else if (mouse_btn == mouse_right_click) {
                    onRightClick(this);
                }
            };
        }
    }
}
function onLeftClick(table_cell) {
    let id = table_cell.innerHTML;
    let sep = id.indexOf(',');
    let x = parseInt(id.slice(0, sep));
    let y = parseInt(id.slice(sep+1));

    let left_border = 0;
    let top_border = 0;
    let right_border = IMG_SIZE;
    let bottom_border = IMG_SIZE;

    var surrounds = [id];
    if (x - 1 > left_border) {
      var left = (x-1).toString(10) + "," + y.toString(10);
      surrounds.push(left);
    }
    if (x + 1 < right_border) {
      var right = (x+1).toString(10) + "," + y.toString(10);
      surrounds.push(right);
    }
    if (y + 1 < bottom_border) {
      var up = x.toString(10) + "," + (y+1).toString(10);
      surrounds.push(up);
    }
    if (y - 1 > top_border) {
      var down = x.toString(10) + "," + (y-1).toString(10);
      surrounds.push(down);
    }


    for (i = 0; i < surrounds.length; i++) {
      let table_cell_style = document.getElementById(surrounds[i]).style;
      table_cell_style.backgroundColor = CELL_HIGHLIGHTED_COLOR;
    }
    getNumber();
}
function onRightClick(table_cell) {
  let table_cell_style = document.getElementById(table_cell.innerHTML).style;
  table_cell_style.backgroundColor = CELL_DEFAULT_COLOR;
  getNumber();
}
function table_to_array(table_id) {
      myData = document.getElementById(table_id).rows
      my_liste = []
      for (var i = 0; i < myData.length; i++) {
              el = myData[i].children
              my_el = []
              for (var j = 0; j < el.length; j++) {
                      if (el[j].style.backgroundColor == CELL_HIGHLIGHTED_COLOR) {
                        my_el.push(1);
                      } else {
                        my_el.push(0);
                      }

              }
              my_liste.push(my_el);

      }
      return my_liste;
}
function getNumber() {
  number_array = table_to_array('img_grid');
  if (Math.random() < 0.25) {
    $.ajax({
      url: "http://localhost:5000/nn/",
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify({"message": number_array})
  }).done(function(data) {
    document.getElementById('net_out_value').innerHTML = data['message'];
  });
  net_out = 2;
  document.getElementById('net_out_value').innerHTML = net_out;
}
}
myFunction();
setGridCells();
