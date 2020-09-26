/* global Module */

/* Magic Mirror
 * Module: testModule
 *
 * By 
 * MIT Licensed.
 */

Module.register("MMM-AirbarHelper", {
	defaults: {
		barPosition: 'bottom',
		debugMode: true
	},

	requiresVersion: "2.1.0", // Required version of MagicMirror
	start: function() {
		this.inputDetails = "no input";
		this.data.position = "fullscreen_above";
		this.dragConst = 4;
		this.lastInputTime = 0;
		if (this.config.barPosition === 'top') {
			this.touch_input = {
				HOLD: 'hold',
				DOUBLE_TOUCH: 'double_touch',
				TOUCH: 'touch',
				UP: 'down',
				DOWN: 'up',
				RIGHT: 'left',
				LEFT: 'right',
				
			}
		} else if (this.config.barPosition === 'right') {
			this.touch_input = {
				HOLD: 'hold',
				DOUBLE_TOUCH: 'double_touch',
				TOUCH: 'touch',
				UP: 'left',
				DOWN: 'right',
				RIGHT: 'up',
				LEFT: 'down'
			}
		} else if (this.config.barPosition === 'left') {
			this.touch_input = {
				HOLD: 'hold',
				DOUBLE_TOUCH: 'double_touch',
				TOUCH: 'touch',
				UP: 'right',
				DOWN: 'down',
				RIGHT: 'down',
				LEFT: 'up'
			}
		} else {
			this.touch_input = {
				HOLD: 'hold',
				DOUBLE_TOUCH: 'double_touch',
				TOUCH: 'touch',
				UP: 'up',
				DOWN: 'down',
				RIGHT: 'right',
				LEFT: 'left'
			}
		}
	},

	getDom: function() {
		var wrapper = document.createElement("div");
		// TODO this is super hacky should be doable in css
		if (this.config.debugMode) {
			wrapper.innerHTML = this.inputDetails
		}
		wrapper.innerHTML += "<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>";
		Log.log('getDom');
		
		var touchStartX = 0;
		var touchStartY = 0;
		var touchStartTime = 0;
		
		wrapper.addEventListener('touchstart', () => {
			touchStartX = event.touches[0].clientX;
			touchStartY = event.touches[0].clientY;
			touchStartTime = new Date().getTime();
		}, false);
		
		
		wrapper.addEventListener('touchend', () => {
			var inputTime = new Date().getTime();
			var quickTouch = false;
			if (inputTime - 200 <= this.lastInputTime) { // todo add to config
				quickTouch = true;
			}
			this.lastInputTime = inputTime;
			var xChange = touchStartX - event.changedTouches[0].clientX;
			var yChange = touchStartY - event.changedTouches[0].clientY;
			if (!this.isDrag(xChange, yChange)) {
				if (touchStartTime + 2000 < inputTime) {
					this.inputDetails = this.touch_input.HOLD;
				} else if (this.inputDetails == this.touch_input.TOUCH && quickTouch) {
					this.inputDetails = this.touch_input.DOUBLE_TOUCH;	
				} else {
					this.inputDetails = this.touch_input.TOUCH;	
				}
			} else if (quickTouch) {
				// do nothing for quick touch event
			} else if (Math.abs(xChange) > Math.abs(yChange)) {
				if (xChange > this.dragConst) {
					this.inputDetails = this.touch_input.LEFT;
					Log.log('Left move');
				} else if (xChange < this.dragConst * -1) {
					this.inputDetails = this.touch_input.RIGHT;
					Log.log('Right move');
				}
			} else {
				if (yChange > this.dragConst) {
					this.inputDetails = this.touch_input.UP;
					Log.log('Up move');
				} else if (yChange < this.dragConst * -1) {
					this.inputDetails = this.touch_input.DOWN;
					Log.log('Down move');
				}
			}
			
			
			this.sendNotification('AIRBARHELPER_INPUT', 
			{
				motion:this.inputDetails,
				startX: touchStartX,
				startY: touchStartY,
				endX: event.clientX,
				endY: event.clientY
			});

			this.updateDom();
		
		}, false);
		return wrapper;
	},
	
	isDrag: function(xChange, yChange) {
		return (Math.abs(xChange) > this.dragConst && Math.abs(yChange) > this.dragConst)
	},

	getScripts: function() {
		return [];
	},

	getStyles: function () {
		return [
			"testModule.css",
		];
	},


});
