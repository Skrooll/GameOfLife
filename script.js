window.addEventListener('load', main, false);
function main() {
	
	var ctx = canvas_ex.getContext('2d');
	var w = canvas_ex.width;
	var h = canvas_ex.height;
	var threshold = 0.3;
	var sizeX = 100;
	var sizeY = 100;
	var scaleX = w/sizeX;
	var scaleY = h/sizeY;
	var field = [];
	var field_old = [];
	var pause = true;
	
	for (var i=0; i<sizeX; i++) {
		var row = [];
		var row_old = [];
		for (var j=0; j<sizeY; j++) {
			row.push(Math.random()<threshold ? 1 : 0);
			row_old.push(1);
		}
		field.push(row);
		field_old.push(row_old);
	}
	
	function draw() {
		ctx.clearRect(0,0,w,h);
		for (var i=0; i<sizeX; i++) {
			for (var j=0; j<sizeY; j++) {
				if (field[i][j]==0) {
					ctx.fillRect(i*scaleX, j*scaleY, scaleX, scaleY);
				} else {
					ctx.strokeRect(i*scaleX, j*scaleY, scaleX, scaleY);
				}
			}
		}
	}
	
	function phys() {
		if (!pause) {
			// копируем массив
			for (var i=0; i<sizeX; i++) {
				for (var j=0; j<sizeY; j++) {
					field_old[i][j] = field[i][j];
				}
			}
			// рассчитать новое состояние
			for (var i=0; i<sizeX; i++) {
				for (var j=0; j<sizeY; j++) {
					var alive = 0;
					alive += field_old[i-1==-1 ? sizeX-1 : i-1][j];
					alive += field_old[i-1==-1 ? sizeX-1 : i-1][j+1==sizeY ? 0 : j+1];
					alive += field_old[i][j+1==sizeY ? 0 : j+1];
					alive += field_old[i+1==sizeX ? 0 : i+1][j+1==sizeY ? 0 : j+1];
					alive += field_old[i+1==sizeX ? 0 : i+1][j];
					alive += field_old[i+1==sizeX ? 0 : i+1][j-1==-1 ? sizeY-1 : j-1];
					alive += field_old[i][j-1==-1 ? sizeY-1 : j-1];
					alive += field_old[i-1==-1 ? sizeX-1 : i-1][j-1==-1 ? sizeY-1 : j-1];
					if (alive<2 || alive>3) {
						field[i][j] = 0;
					} else if (alive==3) {
						field[i][j] = 1;
					}
				}
			}
		}
	}
	
	document.onkeypress = function(e) {
		if (e.keyCode == 32) {
			pause = !pause;
		}
	}
	
	canvas_ex.onclick = function(e) {
		var x = Math.floor(e.offsetX / scaleX);
		var y = Math.floor(e.offsetY / scaleY);
		field[x][y] = field[x][y]==0 ? 1 : 0;
	}
	
	function control() {
		phys();
		draw();
	}
	
	setInterval(control, 100);
}