var _ = require('underscore');

function drawArray(fabricObj, optObj) {
	const path = 'M 0,0 l 20,-13 v 7 h 50 v -7 l 20,13 l -20,13 v -7 h -50 v 7 l -20,-13 z';
	if (optObj.down) {
		var array = new fabric.Path(path);
		fabricObj.add(array.set({
			left: optObj.x + 5,
			top: optObj.y + 25,
			fill: '#b4e2e7',
			angle: 90
		}));
	}
	if (optObj.right) {
		var array = new fabric.Path(path);
		fabricObj.add(array.set({
			left: optObj.x,
			top: optObj.y,
			fill: '#b4e2e7',
		}));
	}
}

function startDrawNoC(id) {
	var canvas = new fabric.StaticCanvas(id);
	canvas.setWidth(500)
	canvas.setHeight(500)
	var rectArr = [];
	var circleArr = [];
	var lineArr = [];
	for (var i = 0; i < 4; ++i) {
		var nowRectArr = rectArr[i] = [];
		var nowCircleArr = circleArr[i] = [];
		var nowLineArr = lineArr[i] = [];
		for (var j = 0; j < 4; ++j) {
			nowRectArr[j] = new fabric.Rect({
				left: 50 + j * 110,
				top: 50 + i * 110,
				fill: '#ff8000',
				width: 60,
				height: 60,
				rx: 10,
				ry: 10,
			});
			var text = new fabric.Text('PU'+(i*4+j), { left: 50 + j * 110, top: 70 + i * 110,fontSize: 26 });
			nowCircleArr[j] = new fabric.Circle({
				left: 120 + j * 110,
				top: 30 + i * 110,
				fill: '#ff8080',
				radius: 10
			});
			nowLineArr[j] = new fabric.Line([130 + j * 110, 35 + i * 110, 100 + j * 110, 60 + i * 110], {
				stroke: 'red'
			});

			canvas.add(nowRectArr[j]);
			canvas.add(nowCircleArr[j]);
			canvas.add(nowLineArr[j]);
			canvas.add(text);
			var arrayObj = {
				right: true,
				down: true,
				x: 140 + i * 110,
				y: 25 + j * 110
			};
			if (i === 3) {
				arrayObj.right = false;
			}
			if (j === 3) {
				arrayObj.down = false;
			}
			drawArray(canvas, arrayObj);
		}
	}
	return canvas;
}

function stsRoute(arrParam,canvas) {
	var dataChunk = new fabric.Rect({
		left: 100 +110 * arrParam[0],
		top: 60 +110 * arrParam[1],
		fill: '#ff0000',
		width: 10,
		height: 10
	});
	canvas.add(dataChunk);
	
	var resultRoute = transformData(findTheWay(arrParam));//[]
	console.log(resultRoute);
	// outFromPU(dataChunk, canvas);
	
	var animationPromise = new Promise(function(fulfill, reject) {
		outFromPU(dataChunk, canvas);
		setTimeout(function(){
			fulfill();
		}, 2000);
	})
	for (let i = 0; i < resultRoute.length; ++i) {
		animationPromise = animationPromise.then(()=>{
			return moveAnimate(dataChunk, resultRoute[i], canvas);
		})
	}
	animationPromise.then(()=>{
		intoPU(dataChunk,canvas)
	})
}

function transformData(arr) {
	return arr.map(function(value, index){
		switch(value){
			case '+x': return 'right'; break;
			case '+y': return 'down'; break;
			case '-x': return 'left'; break;
			case '-y': return 'up'; break;
		}
	})
}

function findTheWay(param) {
	var nowPoint = {
		x: param[0],
		y: param[1]
	} ;
	var desPoint = {
		x: param[2],
		y: param[3]
	};

	var result = [];
	for (var i = 0; i < 3; ++i ) {	//进行X方向移动
		if (_.isEqual(nowPoint, desPoint)) {
	 		return result; 
		}else if (nowPoint.x === desPoint.x) {
			break;
		} else {
			if(nowPoint.x > desPoint.x) {
				--nowPoint.x;
				result.push('-x');
			}else {
				++nowPoint.x;
				result.push('+x');
			}
		}
	}
	for (var i = 0; i < 3; ++i ) {	//进行Y方向移动
		if (_.isEqual(nowPoint, desPoint)) {
	 		return result; 
		} else {
			if(nowPoint.y > desPoint.y) {
				--nowPoint.y;
				result.push('-y');
			}else {
				++nowPoint.y;
				result.push('+y');
			}
		}

	}
	return result;
}

function moveAnimate(fabricObj, direction, canvas){
	console.log('called at '+ new Date() + ' direction is '+ direction);
	var funStr = '-=110';
	var isPositive = false; // 是否是正向（下右）
	if (direction === 'right' || direction === 'down') {
		funStr = '+=110';
	} 

	if (direction === 'left' || direction === 'right') {
		direction = 'left';
	} else {
		direction = 'top';
	}
	return new Promise((fulfill, reject) => {
		fabricObj.animate(direction, funStr, {
			onChange:canvas.renderAll.bind(canvas),
			duration:2000,
			easing:fabric.util.linear,
			onComplete: fulfill
		})
	})
}

function outFromPU(fabricObj, canvas) {
	fabricObj.animate({
		left: '+=30',
		top: '-=20'
	}, {
		onChange:canvas.renderAll.bind(canvas),
		duration:2000,

	})
}
function intoPU(fabricObj, canvas) {
	fabricObj.animate({
		left: '-=30',
		top: '+=20',
		opacity: 0
	}, {
		onChange:canvas.renderAll.bind(canvas),
		duration:2000,
		onComplete: ()=>{canvas.remove(fabricObj)}
	})
}


export {startDrawNoC, stsRoute};

