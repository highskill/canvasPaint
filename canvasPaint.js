$(document).ready(function () {
	var canvas = document.getElementById('canvas'),
		$canvas = $('canvas'),
		ctx = canvas.getContext('2d'),
		h = window.innerHeight - 60 - 40,
		w = window.innerWidth*.96;

		canvas.height = h;
		canvas.width = w;

	(function( pen, $, undefined ) {
	    
	    pen.x = 390;
	    pen.y = 265;
	    pen.size = 30;
	    pen.color = '#000';
	    marks = [];

	     
	    //Public Method
	    pen.move = function() {
	        penTipMove();
	    };
	    pen.draw = function() {
	    	drawMarks();
	    };
	     
	    //Private Method
	    function penTipMove() {
	    	ctx.clearRect(0, 0, w, h);
	    	
	    	_.each(marks, function (m) {
				// make mark a circle
				ctx.beginPath();
				ctx.arc(m.x, m.y, m.size / 2, 0, Math.PI * 2);
				ctx.closePath();
				ctx.fillStyle = m.color;
				ctx.fill();
	    		
				
	    	});

	    	if (pen.color == '#ffffff') {
		      ctx.beginPath();
			  ctx.arc(pen.x, pen.y, pen.size / 2, 0, Math.PI * 2);
			  ctx.closePath();		      
		      ctx.fillStyle = pen.color;
		      ctx.fill();
		      ctx.lineWidth = 1;
		      ctx.strokeStyle = 'black';
		      ctx.stroke();
	    	} else {
				ctx.beginPath();
			    ctx.arc(pen.x, pen.y, pen.size / 2, 0, Math.PI * 2);
	    		ctx.fillStyle = pen.color;
	    		ctx.fill();				
	    	}
	    };

	    function Mark() {
	    	this.x = pen.x;
	    	this.y = pen.y;
	    	this.size = pen.size;
	    	this.color = pen.color;
	    };

	    function drawMarks() {
	    	penTipMove();
	    	marks.push(new Mark());
	    };
	}( window.pen = window.pen || {}, jQuery ));

	

	$canvas.on('mousemove', function (e) {
		getPenPosition(e);
		pen.move();
	});

	$canvas.on('mousedown', function (e) {
		getPenPosition(e);
		pen.draw();	

		$canvas.on('mousemove', function (e) {
			getPenPosition(e);
			pen.draw();			
		});

		$canvas.on('mouseup', function (e) {
			$canvas.off('mousemove', pen.draw());
			
			$canvas.on('mousemove', function (e) {
				getPenPosition(e);
				pen.move();
			});
		});
	});
	
	
	//panel controllers
	var $color = $('.color'),
		$size = $('.size'),
		$eraser = $('.eraser'),
		$clear_canvas = $('.clear_canvas');
	
	$color.on('change', function () {
		var newColor = $('.color').val();
		pen.color = '#' + newColor.toLowerCase();
	});
	
	$size.on('change', function () {
		var size = $('.size').val();

		if (!($.isNumeric(size))){
			alert('Size must be a number')
		} else {
			pen.size = size;
		}
	});
	
	$eraser.on('click', function () {
		pen.color = '#ffffff'
	});
	
	$clear_canvas.on('click', function () {
		if (confirm('Clear canvas?')){
			ctx.clearRect(0, 0, w, h);
			marks = [];
		} else {
			return;
		}
	})


	function getPenPosition(e) {
		pen.x = e.pageX - canvas.offsetLeft;
		pen.y = e.pageY - canvas.offsetTop;
	}
	
	//disable selection
	$('#canvas').disableSelection();
	
	$('#canvasImg').on('click', function() {
			pen.draw = null;			  
      var dataURL = canvas.toDataURL();      
      document.getElementById('canvasImg').href = dataURL;	  
	  
	});
});

(function($){
    $.fn.disableSelection = function() {
        return this
                 .attr('unselectable', 'on')
                 .css('user-select', 'none')
                 .on('selectstart', false);
    };
})(jQuery);









