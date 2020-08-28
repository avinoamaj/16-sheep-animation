(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [
		{name:"keves_atlas_1", frames: [[0,722,771,545],[1282,0,754,531],[1396,901,615,327],[773,1233,414,290],[1396,1230,378,327],[2003,826,38,23],[2003,851,39,21],[1282,533,649,366],[773,901,621,330],[1084,811,40,69],[1933,533,87,81],[1129,799,85,63],[1933,616,91,68],[1933,752,79,72],[1129,722,79,75],[1933,686,95,64],[492,1269,60,62],[1189,1233,69,65],[1216,722,61,78],[1011,811,71,65],[554,1269,56,58],[1933,826,68,67],[1260,1233,57,72],[1216,802,55,78],[0,0,1280,720],[773,722,236,174],[254,1269,236,185],[1319,1233,68,56],[0,1269,252,189],[1776,1230,252,201],[1011,722,116,87]]}
];


(lib.AnMovieClip = function(){
	this.actionFrames = [];
	this.currentSoundStreamInMovieclip;
	this.soundStreamDuration = new Map();
	this.streamSoundSymbolsList = [];

	this.gotoAndPlayForStreamSoundSync = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.gotoAndPlay = function(positionOrLabel){
		this.clearAllSoundStreams();
		var pos = this.timeline.resolve(positionOrLabel);
		if (pos != null) { this.startStreamSoundsForTargetedFrame(pos); }
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.play = function(){
		this.clearAllSoundStreams();
		this.startStreamSoundsForTargetedFrame(this.currentFrame);
		cjs.MovieClip.prototype.play.call(this);
	}
	this.gotoAndStop = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndStop.call(this,positionOrLabel);
		this.clearAllSoundStreams();
	}
	this.stop = function(){
		cjs.MovieClip.prototype.stop.call(this);
		this.clearAllSoundStreams();
	}
	this.startStreamSoundsForTargetedFrame = function(targetFrame){
		for(var index=0; index<this.streamSoundSymbolsList.length; index++){
			if(index <= targetFrame && this.streamSoundSymbolsList[index] != undefined){
				for(var i=0; i<this.streamSoundSymbolsList[index].length; i++){
					var sound = this.streamSoundSymbolsList[index][i];
					if(sound.endFrame > targetFrame){
						var targetPosition = Math.abs((((targetFrame - sound.startFrame)/lib.properties.fps) * 1000));
						var instance = playSound(sound.id);
						var remainingLoop = 0;
						if(sound.offset){
							targetPosition = targetPosition + sound.offset;
						}
						else if(sound.loop > 1){
							var loop = targetPosition /instance.duration;
							remainingLoop = Math.floor(sound.loop - loop);
							if(targetPosition == 0){ remainingLoop -= 1; }
							targetPosition = targetPosition % instance.duration;
						}
						instance.loop = remainingLoop;
						instance.position = Math.round(targetPosition);
						this.InsertIntoSoundStreamData(instance, sound.startFrame, sound.endFrame, sound.loop , sound.offset);
					}
				}
			}
		}
	}
	this.InsertIntoSoundStreamData = function(soundInstance, startIndex, endIndex, loopValue, offsetValue){ 
 		this.soundStreamDuration.set({instance:soundInstance}, {start: startIndex, end:endIndex, loop:loopValue, offset:offsetValue});
	}
	this.clearAllSoundStreams = function(){
		this.soundStreamDuration.forEach(function(value,key){
			key.instance.stop();
		});
 		this.soundStreamDuration.clear();
		this.currentSoundStreamInMovieclip = undefined;
	}
	this.stopSoundStreams = function(currentFrame){
		if(this.soundStreamDuration.size > 0){
			var _this = this;
			this.soundStreamDuration.forEach(function(value,key,arr){
				if((value.end) == currentFrame){
					key.instance.stop();
					if(_this.currentSoundStreamInMovieclip == key) { _this.currentSoundStreamInMovieclip = undefined; }
					arr.delete(key);
				}
			});
		}
	}

	this.computeCurrentSoundStreamInstance = function(currentFrame){
		if(this.currentSoundStreamInMovieclip == undefined){
			var _this = this;
			if(this.soundStreamDuration.size > 0){
				var maxDuration = 0;
				this.soundStreamDuration.forEach(function(value,key){
					if(value.end > maxDuration){
						maxDuration = value.end;
						_this.currentSoundStreamInMovieclip = key;
					}
				});
			}
		}
	}
	this.getDesiredFrame = function(currentFrame, calculatedDesiredFrame){
		for(var frameIndex in this.actionFrames){
			if((frameIndex > currentFrame) && (frameIndex < calculatedDesiredFrame)){
				return frameIndex;
			}
		}
		return calculatedDesiredFrame;
	}

	this.syncStreamSounds = function(){
		this.stopSoundStreams(this.currentFrame);
		this.computeCurrentSoundStreamInstance(this.currentFrame);
		if(this.currentSoundStreamInMovieclip != undefined){
			var soundInstance = this.currentSoundStreamInMovieclip.instance;
			if(soundInstance.position != 0){
				var soundValue = this.soundStreamDuration.get(this.currentSoundStreamInMovieclip);
				var soundPosition = (soundValue.offset?(soundInstance.position - soundValue.offset): soundInstance.position);
				var calculatedDesiredFrame = (soundValue.start)+((soundPosition/1000) * lib.properties.fps);
				if(soundValue.loop > 1){
					calculatedDesiredFrame +=(((((soundValue.loop - soundInstance.loop -1)*soundInstance.duration)) / 1000) * lib.properties.fps);
				}
				calculatedDesiredFrame = Math.floor(calculatedDesiredFrame);
				var deltaFrame = calculatedDesiredFrame - this.currentFrame;
				if(deltaFrame >= 2){
					this.gotoAndPlayForStreamSoundSync(this.getDesiredFrame(this.currentFrame,calculatedDesiredFrame));
				}
			}
		}
	}
}).prototype = p = new cjs.MovieClip();
// symbols:



(lib.bedlines = function() {
	this.initialize(ss["keves_atlas_1"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.bedcolor = function() {
	this.initialize(ss["keves_atlas_1"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.blackboardbackground = function() {
	this.initialize(img.blackboardbackground);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,5472,3648);


(lib.dreambackground = function() {
	this.initialize(ss["keves_atlas_1"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.kid = function() {
	this.initialize(ss["keves_atlas_1"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.kidcolors = function() {
	this.initialize(ss["keves_atlas_1"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.kideyes = function() {
	this.initialize(ss["keves_atlas_1"]);
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib.kideyesblinked = function() {
	this.initialize(ss["keves_atlas_1"]);
	this.gotoAndStop(6);
}).prototype = p = new cjs.Sprite();



(lib.Layer1 = function() {
	this.initialize(ss["keves_atlas_1"]);
	this.gotoAndStop(7);
}).prototype = p = new cjs.Sprite();



(lib.Layer2 = function() {
	this.initialize(ss["keves_atlas_1"]);
	this.gotoAndStop(8);
}).prototype = p = new cjs.Sprite();



(lib.number1 = function() {
	this.initialize(ss["keves_atlas_1"]);
	this.gotoAndStop(9);
}).prototype = p = new cjs.Sprite();



(lib.number10 = function() {
	this.initialize(ss["keves_atlas_1"]);
	this.gotoAndStop(10);
}).prototype = p = new cjs.Sprite();



(lib.number11 = function() {
	this.initialize(ss["keves_atlas_1"]);
	this.gotoAndStop(11);
}).prototype = p = new cjs.Sprite();



(lib.number12 = function() {
	this.initialize(ss["keves_atlas_1"]);
	this.gotoAndStop(12);
}).prototype = p = new cjs.Sprite();



(lib.number13 = function() {
	this.initialize(ss["keves_atlas_1"]);
	this.gotoAndStop(13);
}).prototype = p = new cjs.Sprite();



(lib.number14 = function() {
	this.initialize(ss["keves_atlas_1"]);
	this.gotoAndStop(14);
}).prototype = p = new cjs.Sprite();



(lib.number15 = function() {
	this.initialize(ss["keves_atlas_1"]);
	this.gotoAndStop(15);
}).prototype = p = new cjs.Sprite();



(lib.number2 = function() {
	this.initialize(ss["keves_atlas_1"]);
	this.gotoAndStop(16);
}).prototype = p = new cjs.Sprite();



(lib.number3 = function() {
	this.initialize(ss["keves_atlas_1"]);
	this.gotoAndStop(17);
}).prototype = p = new cjs.Sprite();



(lib.number4 = function() {
	this.initialize(ss["keves_atlas_1"]);
	this.gotoAndStop(18);
}).prototype = p = new cjs.Sprite();



(lib.number5 = function() {
	this.initialize(ss["keves_atlas_1"]);
	this.gotoAndStop(19);
}).prototype = p = new cjs.Sprite();



(lib.number6 = function() {
	this.initialize(ss["keves_atlas_1"]);
	this.gotoAndStop(20);
}).prototype = p = new cjs.Sprite();



(lib.number7 = function() {
	this.initialize(ss["keves_atlas_1"]);
	this.gotoAndStop(21);
}).prototype = p = new cjs.Sprite();



(lib.number8 = function() {
	this.initialize(ss["keves_atlas_1"]);
	this.gotoAndStop(22);
}).prototype = p = new cjs.Sprite();



(lib.number9 = function() {
	this.initialize(ss["keves_atlas_1"]);
	this.gotoAndStop(23);
}).prototype = p = new cjs.Sprite();



(lib.OGA3KG0 = function() {
	this.initialize(ss["keves_atlas_1"]);
	this.gotoAndStop(24);
}).prototype = p = new cjs.Sprite();



(lib.sheepcolor1 = function() {
	this.initialize(ss["keves_atlas_1"]);
	this.gotoAndStop(25);
}).prototype = p = new cjs.Sprite();



(lib.sheepcolor1b = function() {
	this.initialize(ss["keves_atlas_1"]);
	this.gotoAndStop(26);
}).prototype = p = new cjs.Sprite();



(lib.sheepgirlinator = function() {
	this.initialize(ss["keves_atlas_1"]);
	this.gotoAndStop(27);
}).prototype = p = new cjs.Sprite();



(lib.sheep1a = function() {
	this.initialize(ss["keves_atlas_1"]);
	this.gotoAndStop(28);
}).prototype = p = new cjs.Sprite();



(lib.sheep1b = function() {
	this.initialize(ss["keves_atlas_1"]);
	this.gotoAndStop(29);
}).prototype = p = new cjs.Sprite();



(lib.thought = function() {
	this.initialize(ss["keves_atlas_1"]);
	this.gotoAndStop(30);
}).prototype = p = new cjs.Sprite();
// helper functions:

function mc_symbol_clone() {
	var clone = this._cloneProps(new this.constructor(this.mode, this.startPosition, this.loop, this.reversed));
	clone.gotoAndStop(this.currentFrame);
	clone.paused = this.paused;
	clone.framerate = this.framerate;
	return clone;
}

function getMCSymbolPrototype(symbol, nominalBounds, frameBounds) {
	var prototype = cjs.extend(symbol, cjs.MovieClip);
	prototype.clone = mc_symbol_clone;
	prototype.nominalBounds = nominalBounds;
	prototype.frameBounds = frameBounds;
	return prototype;
	}


(lib.thoughtout = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.thought();

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.thoughtout, new cjs.Rectangle(0,0,116,87), null);


(lib.thoughtin = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.thought();
	this.instance.setTransform(0,0,0.4896,0.4896);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.thoughtin, new cjs.Rectangle(0,0,56.8,42.6), null);


(lib.sheep1b_1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// animation_assets_psd
	this.instance = new lib.sheep1a();
	this.instance.setTransform(655,148);

	this.instance_1 = new lib.sheepcolor1();
	this.instance_1.setTransform(664,155);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(655,148,252,189);


(lib.sheep1a_1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// animation_assets_psd
	this.instance = new lib.sheep1b();
	this.instance.setTransform(655,148);

	this.instance_1 = new lib.sheepcolor1b();
	this.instance_1.setTransform(664,155);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(655,148,252,201);


(lib.Scene_1_background = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// background
	this.instance = new lib.blackboardbackground();
	this.instance.setTransform(-6,-25,0.2434,0.2434);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1).to({x:-7},0).wait(738));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.playbutton = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// animation assets.psd
	this.instance = new lib.Layer1();
	this.instance.setTransform(-295,-230);

	this.instance_1 = new lib.Layer2();
	this.instance_1.setTransform(-281,-202);

	this.instance_2 = new lib.OGA3KG0();
	this.instance_2.setTransform(-630,-362);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).to({state:[{t:this.instance_2},{t:this.instance_1},{t:this.instance}]},1).to({state:[{t:this.instance_2},{t:this.instance_1},{t:this.instance}]},1).to({state:[{t:this.instance_1},{t:this.instance}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-630,-362,1280,720);


(lib.dreambackgroundfadein = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.dreambackground();
	this.instance.setTransform(0,0,1.0714,1.0714);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.dreambackgroundfadein, new cjs.Rectangle(0,0,658.9,350.4), null);


(lib.kideyedwithblink = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.kideyes();
	this.instance.setTransform(-19,-11.5);

	this.instance_1 = new lib.kideyesblinked();
	this.instance_1.setTransform(-20,-13);
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).to({_off:true},62).wait(2).to({_off:false},0).to({_off:true},24).wait(2).to({_off:false},0).to({_off:true},57).wait(2).to({_off:false},0).to({_off:true},4).wait(2).to({_off:false},0).wait(150).to({_off:true},55).wait(2).to({_off:false},0).to({_off:true},24).wait(2).to({_off:false},0).wait(56));
	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(62).to({_off:false},0).to({_off:true},2).wait(24).to({_off:false},0).to({_off:true},2).wait(57).to({_off:false},0).to({_off:true},2).wait(4).to({_off:false},0).to({_off:true},2).wait(205).to({_off:false},0).to({_off:true},2).wait(24).to({_off:false},0).to({_off:true},2).wait(56));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-20,-13,39,24.5);


(lib.kidnoface = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.kid();
	this.instance.setTransform(-204,-127.5);

	this.instance_1 = new lib.kidcolors();
	this.instance_1.setTransform(-210,-163.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-210,-163.5,420,327);


(lib.bed = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.bedlines();
	this.instance.setTransform(-385.5,-272.5);

	this.instance_1 = new lib.bedcolor();
	this.instance_1.setTransform(-377.5,-266.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-385.5,-272.5,771,545);


(lib.___Camera___ = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// timeline functions:
	this.frame_0 = function() {
		this.visible = false;
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(2));

	// cameraBoundary
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("rgba(0,0,0,0)").ss(2,1,1,3,true).p("EAq+AfQMhV7AAAMAAAg+fMBV7AAAg");

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(2));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-641,-361,1282,722);


(lib.thoughtscominginandout = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// out_1
	this.instance = new lib.thoughtin();
	this.instance.setTransform(-210.6,106.3,1,1,0,0,0,28.4,21.3);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1).to({scaleX:1.0298,scaleY:1.0298,x:-192.5,y:104.4},0).wait(1).to({scaleX:1.0597,scaleY:1.0597,x:-175.55,y:102.2},0).wait(1).to({scaleX:1.0895,scaleY:1.0895,x:-159.6,y:99.8},0).wait(1).to({scaleX:1.1194,scaleY:1.1194,x:-144.55,y:97.15},0).wait(1).to({scaleX:1.1492,scaleY:1.1492,x:-130.25,y:94.3},0).wait(1).to({scaleX:1.1791,scaleY:1.1791,x:-116.65,y:91.15},0).wait(1).to({scaleX:1.2089,scaleY:1.2089,x:-103.7,y:87.85},0).wait(1).to({scaleX:1.2388,scaleY:1.2388,x:-91.3,y:84.35},0).wait(1).to({scaleX:1.2686,scaleY:1.2686,x:-79.45,y:80.55},0).wait(1).to({scaleX:1.2985,scaleY:1.2985,x:-68.1,y:76.65},0).wait(1).to({scaleX:1.3283,scaleY:1.3283,x:-57.25,y:72.55},0).wait(1).to({scaleX:1.3581,scaleY:1.3581,x:-46.8,y:68.25},0).wait(1).to({scaleX:1.388,scaleY:1.388,x:-36.75,y:63.7},0).wait(1).to({scaleX:1.4178,scaleY:1.4178,x:-27.05,y:59},0).wait(1).to({scaleX:1.4477,scaleY:1.4477,x:-17.75,y:54.1},0).wait(1).to({scaleX:1.4775,scaleY:1.4775,x:-8.75,y:48.95},0).wait(1).to({scaleX:1.5074,scaleY:1.5074,x:-0.15,y:43.6},0).wait(1).to({scaleX:1.5372,scaleY:1.5372,x:8.2,y:38.05},0).wait(1).to({scaleX:1.5671,scaleY:1.5671,x:16.2,y:32.35},0).wait(1).to({scaleX:1.5969,scaleY:1.5969,x:23.9,y:26.3},0).wait(1).to({scaleX:1.6268,scaleY:1.6268,x:31.3,y:20},0).wait(1).to({scaleX:1.6566,scaleY:1.6566,x:38.45,y:13.5},0).wait(1).to({scaleX:1.6865,scaleY:1.6865,x:45.3,y:6.7},0).wait(1).to({scaleX:1.7163,scaleY:1.7163,x:51.8,y:-0.4},0).wait(1).to({scaleX:1.7461,scaleY:1.7461,x:58.1,y:-7.75},0).wait(1).to({scaleX:1.776,scaleY:1.776,x:64.1,y:-15.45},0).wait(1).to({scaleX:1.8058,scaleY:1.8058,x:69.85,y:-23.55},0).wait(1).to({scaleX:1.8357,scaleY:1.8357,x:75.3,y:-31.95},0).wait(1).to({scaleX:1.8655,scaleY:1.8655,x:80.5,y:-40.8},0).wait(1).to({scaleX:1.8954,scaleY:1.8954,x:85.4,y:-50.1},0).wait(1).to({scaleX:1.9252,scaleY:1.9252,x:90,y:-59.85},0).wait(1).to({scaleX:1.9551,scaleY:1.9551,x:94.2,y:-70.15},0).wait(1).to({scaleX:1.9849,scaleY:1.9849,x:98.15,y:-81.05},0).wait(1).to({scaleX:2.0148,scaleY:2.0148,x:101.8,y:-92.7},0).wait(1).to({scaleX:2.0446,scaleY:2.0446,x:105,y:-105.1},0).to({_off:true},1).wait(39));

	// out_2
	this.instance_1 = new lib.thoughtin();
	this.instance_1.setTransform(-210.6,106.3,1,1,0,0,0,28.4,21.3);
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(19).to({_off:false},0).wait(1).to({scaleX:1.0298,scaleY:1.0298,x:-192.5,y:104.4},0).wait(1).to({scaleX:1.0597,scaleY:1.0597,x:-175.55,y:102.2},0).wait(1).to({scaleX:1.0895,scaleY:1.0895,x:-159.65,y:99.8},0).wait(1).to({scaleX:1.1194,scaleY:1.1194,x:-144.6,y:97.15},0).wait(1).to({scaleX:1.1492,scaleY:1.1492,x:-130.3,y:94.3},0).wait(1).to({scaleX:1.1791,scaleY:1.1791,x:-116.75,y:91.15},0).wait(1).to({scaleX:1.2089,scaleY:1.2089,x:-103.8,y:87.85},0).wait(1).to({scaleX:1.2388,scaleY:1.2388,x:-91.4,y:84.35},0).wait(1).to({scaleX:1.2686,scaleY:1.2686,x:-79.6,y:80.55},0).wait(1).to({scaleX:1.2985,scaleY:1.2985,x:-68.25,y:76.65},0).wait(1).to({scaleX:1.3283,scaleY:1.3283,x:-57.45,y:72.55},0).wait(1).to({scaleX:1.3581,scaleY:1.3581,x:-47,y:68.25},0).wait(1).to({scaleX:1.388,scaleY:1.388,x:-36.95,y:63.7},0).wait(1).to({scaleX:1.4178,scaleY:1.4178,x:-27.3,y:59},0).wait(1).to({scaleX:1.4477,scaleY:1.4477,x:-18,y:54.1},0).wait(1).to({scaleX:1.4775,scaleY:1.4775,x:-9.05,y:48.95},0).wait(1).to({scaleX:1.5074,scaleY:1.5074,x:-0.45,y:43.6},0).wait(1).to({scaleX:1.5372,scaleY:1.5372,x:7.8,y:38.05},0).wait(1).to({scaleX:1.5671,scaleY:1.5671,x:15.8,y:32.35},0).wait(1).to({scaleX:1.5969,scaleY:1.5969,x:23.5,y:26.3},0).wait(1).to({scaleX:1.6268,scaleY:1.6268,x:30.85,y:20},0).wait(1).to({scaleX:1.6566,scaleY:1.6566,x:37.95,y:13.5},0).wait(1).to({scaleX:1.6865,scaleY:1.6865,x:44.8,y:6.7},0).wait(1).to({scaleX:1.7163,scaleY:1.7163,x:51.3,y:-0.4},0).wait(1).to({scaleX:1.7461,scaleY:1.7461,x:57.55,y:-7.75},0).wait(1).to({scaleX:1.776,scaleY:1.776,x:63.55,y:-15.45},0).wait(1).to({scaleX:1.8058,scaleY:1.8058,x:69.25,y:-23.55},0).wait(1).to({scaleX:1.8357,scaleY:1.8357,x:74.7,y:-31.95},0).wait(1).to({scaleX:1.8655,scaleY:1.8655,x:79.85,y:-40.8},0).wait(1).to({scaleX:1.8954,scaleY:1.8954,x:84.75,y:-50.1},0).wait(1).to({scaleX:1.9252,scaleY:1.9252,x:89.3,y:-59.85},0).wait(1).to({scaleX:1.9551,scaleY:1.9551,x:93.55,y:-70.15},0).wait(1).to({scaleX:1.9849,scaleY:1.9849,x:97.5,y:-81.05},0).wait(1).to({scaleX:2.0148,scaleY:2.0148,x:101.1,y:-92.7},0).wait(1).to({scaleX:2.0446,scaleY:2.0446,x:104.3,y:-105.1},0).to({_off:true},1).wait(20));

	// out_3
	this.instance_2 = new lib.thoughtin();
	this.instance_2.setTransform(-210.6,106.3,1,1,0,0,0,28.4,21.3);
	this.instance_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(34).to({_off:false},0).wait(1).to({scaleX:1.0298,scaleY:1.0298,x:-192.5,y:104.4,alpha:0.975},0).wait(1).to({scaleX:1.0597,scaleY:1.0597,x:-175.55,y:102.2,alpha:0.95},0).wait(1).to({scaleX:1.0895,scaleY:1.0895,x:-159.65,y:99.8,alpha:0.925},0).wait(1).to({scaleX:1.1194,scaleY:1.1194,x:-144.6,y:97.15,alpha:0.9},0).wait(1).to({scaleX:1.1492,scaleY:1.1492,x:-130.3,y:94.3,alpha:0.875},0).wait(1).to({scaleX:1.1791,scaleY:1.1791,x:-116.75,y:91.15,alpha:0.85},0).wait(1).to({scaleX:1.2089,scaleY:1.2089,x:-103.8,y:87.85,alpha:0.825},0).wait(1).to({scaleX:1.2388,scaleY:1.2388,x:-91.4,y:84.35,alpha:0.8},0).wait(1).to({scaleX:1.2686,scaleY:1.2686,x:-79.6,y:80.55,alpha:0.775},0).wait(1).to({scaleX:1.2985,scaleY:1.2985,x:-68.25,y:76.65,alpha:0.75},0).wait(1).to({scaleX:1.3283,scaleY:1.3283,x:-57.45,y:72.55,alpha:0.725},0).wait(1).to({scaleX:1.3581,scaleY:1.3581,x:-47,y:68.25,alpha:0.7},0).wait(1).to({scaleX:1.388,scaleY:1.388,x:-36.95,y:63.7,alpha:0.675},0).wait(1).to({scaleX:1.4178,scaleY:1.4178,x:-27.3,y:59,alpha:0.65},0).wait(1).to({scaleX:1.4477,scaleY:1.4477,x:-18,y:54.1,alpha:0.625},0).wait(1).to({scaleX:1.4775,scaleY:1.4775,x:-9.05,y:48.95,alpha:0.6},0).wait(1).to({scaleX:1.5074,scaleY:1.5074,x:-0.45,y:43.6,alpha:0.575},0).wait(1).to({scaleX:1.5372,scaleY:1.5372,x:7.8,y:38.05,alpha:0.55},0).wait(1).to({scaleX:1.5671,scaleY:1.5671,x:15.8,y:32.35,alpha:0.525},0).wait(1).to({scaleX:1.5969,scaleY:1.5969,x:23.5,y:26.3,alpha:0.5},0).wait(1).to({scaleX:1.6268,scaleY:1.6268,x:30.85,y:20,alpha:0.475},0).wait(1).to({scaleX:1.6566,scaleY:1.6566,x:37.95,y:13.5,alpha:0.45},0).wait(1).to({scaleX:1.6865,scaleY:1.6865,x:44.8,y:6.7,alpha:0.425},0).wait(1).to({scaleX:1.7163,scaleY:1.7163,x:51.3,y:-0.4,alpha:0.4},0).wait(1).to({scaleX:1.7461,scaleY:1.7461,x:57.55,y:-7.75,alpha:0.375},0).wait(1).to({scaleX:1.776,scaleY:1.776,x:63.55,y:-15.45,alpha:0.35},0).wait(1).to({scaleX:1.8058,scaleY:1.8058,x:69.25,y:-23.55,alpha:0.325},0).wait(1).to({scaleX:1.8357,scaleY:1.8357,x:74.7,y:-31.95,alpha:0.3},0).wait(1).to({scaleX:1.8655,scaleY:1.8655,x:79.85,y:-40.8,alpha:0.275},0).wait(1).to({scaleX:1.8954,scaleY:1.8954,x:84.75,y:-50.1,alpha:0.25},0).wait(1).to({scaleX:1.9252,scaleY:1.9252,x:89.3,y:-59.85,alpha:0.225},0).wait(1).to({scaleX:1.9551,scaleY:1.9551,x:93.55,y:-70.15,alpha:0.2},0).wait(1).to({scaleX:1.9849,scaleY:1.9849,x:97.5,y:-81.05,alpha:0.175},0).wait(1).to({scaleX:2.0148,scaleY:2.0148,x:101.1,y:-92.7,alpha:0.15},0).wait(1).to({scaleX:2.0446,scaleY:2.0446,x:104.3,y:-105.1,alpha:0.125},0).to({_off:true},1).wait(5));

	// in_1
	this.instance_3 = new lib.thoughtout();
	this.instance_3.setTransform(-463.25,12.35,1,1,0,0,0,58,43.5);
	this.instance_3._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(25).to({_off:false},0).wait(1).to({scaleX:0.9787,scaleY:0.9787,x:-446,y:7.15},0).wait(1).to({scaleX:0.9575,scaleY:0.9575,x:-429.35,y:2.75},0).wait(1).to({scaleX:0.9362,scaleY:0.9362,x:-413.35,y:-0.9},0).wait(1).to({scaleX:0.9149,scaleY:0.9149,x:-397.9,y:-3.7},0).wait(1).to({scaleX:0.8937,scaleY:0.8937,x:-382.95,y:-5.75},0).wait(1).to({scaleX:0.8724,scaleY:0.8724,x:-368.7,y:-7},0).wait(1).to({scaleX:0.8511,scaleY:0.8511,x:-355,y:-7.45},0).wait(1).to({scaleX:0.8299,scaleY:0.8299,x:-341.8,y:-7.1},0).wait(1).to({scaleX:0.8086,scaleY:0.8086,x:-329.25,y:-5.95},0).wait(1).to({scaleX:0.7874,scaleY:0.7874,x:-317.3,y:-4},0).wait(1).to({scaleX:0.7661,scaleY:0.7661,x:-305.9,y:-1.3},0).wait(1).to({scaleX:0.7448,scaleY:0.7448,x:-295.1,y:2.25},0).wait(1).to({scaleX:0.7236,scaleY:0.7236,x:-284.9,y:6.5},0).wait(1).to({scaleX:0.7023,scaleY:0.7023,x:-275.2,y:11.65},0).wait(1).to({scaleX:0.681,scaleY:0.681,x:-266.15,y:17.5},0).wait(1).to({scaleX:0.6598,scaleY:0.6598,x:-257.65,y:24.25},0).wait(1).to({scaleX:0.6385,scaleY:0.6385,x:-249.7,y:31.65},0).wait(1).to({scaleX:0.6172,scaleY:0.6172,x:-242.4,y:39.95},0).wait(1).to({scaleX:0.596,scaleY:0.596,x:-235.65,y:49},0).wait(1).to({scaleX:0.5747,scaleY:0.5747,x:-229.45,y:58.85},0).wait(1).to({scaleX:0.5534,scaleY:0.5534,x:-223.85,y:69.5},0).wait(1).to({scaleX:0.5322,scaleY:0.5322,x:-218.9,y:81},0).wait(1).to({scaleX:0.5109,scaleY:0.5109,x:-214.4,y:93.2},0).wait(1).to({scaleX:0.4897,scaleY:0.4897,x:-210.55,y:106.3},0).to({_off:true},1).wait(25));

	// in_2
	this.instance_4 = new lib.thoughtout();
	this.instance_4.setTransform(-463.25,12.35,1,1,0,0,0,58,43.5);
	this.instance_4._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(40).to({_off:false},0).wait(1).to({scaleX:0.9787,scaleY:0.9787,x:-446,y:7.15},0).wait(1).to({scaleX:0.9575,scaleY:0.9575,x:-429.35,y:2.75},0).wait(1).to({scaleX:0.9362,scaleY:0.9362,x:-413.35,y:-0.9},0).wait(1).to({scaleX:0.9149,scaleY:0.9149,x:-397.9,y:-3.7},0).wait(1).to({scaleX:0.8937,scaleY:0.8937,x:-382.95,y:-5.75},0).wait(1).to({scaleX:0.8724,scaleY:0.8724,x:-368.7,y:-7},0).wait(1).to({scaleX:0.8511,scaleY:0.8511,x:-355,y:-7.45},0).wait(1).to({scaleX:0.8299,scaleY:0.8299,x:-341.8,y:-7.1},0).wait(1).to({scaleX:0.8086,scaleY:0.8086,x:-329.25,y:-5.95},0).wait(1).to({scaleX:0.7874,scaleY:0.7874,x:-317.3,y:-4},0).wait(1).to({scaleX:0.7661,scaleY:0.7661,x:-305.9,y:-1.3},0).wait(1).to({scaleX:0.7448,scaleY:0.7448,x:-295.1,y:2.25},0).wait(1).to({scaleX:0.7236,scaleY:0.7236,x:-284.9,y:6.5},0).wait(1).to({scaleX:0.7023,scaleY:0.7023,x:-275.2,y:11.65},0).wait(1).to({scaleX:0.681,scaleY:0.681,x:-266.15,y:17.5},0).wait(1).to({scaleX:0.6598,scaleY:0.6598,x:-257.65,y:24.25},0).wait(1).to({scaleX:0.6385,scaleY:0.6385,x:-249.7,y:31.65},0).wait(1).to({scaleX:0.6172,scaleY:0.6172,x:-242.4,y:39.95},0).wait(1).to({scaleX:0.596,scaleY:0.596,x:-235.65,y:49},0).wait(1).to({scaleX:0.5747,scaleY:0.5747,x:-229.45,y:58.85},0).wait(1).to({scaleX:0.5534,scaleY:0.5534,x:-223.85,y:69.5},0).wait(1).to({scaleX:0.5322,scaleY:0.5322,x:-218.9,y:81},0).wait(1).to({scaleX:0.5109,scaleY:0.5109,x:-214.4,y:93.2},0).wait(1).to({scaleX:0.4897,scaleY:0.4897,x:-210.55,y:106.3},0).to({_off:true},1).wait(10));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-521.2,-148.6,684.2,276.2);


(lib.sheep15 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_3
	this.instance = new lib.number15();
	this.instance.setTransform(63,9);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(16));

	// Layer_2
	this.instance_1 = new lib.sheepgirlinator();
	this.instance_1.setTransform(-20,-44);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(16));

	// Layer_1
	this.instance_2 = new lib.sheep1a_1("synched",0);
	this.instance_2.setTransform(69,56.05,1,1,0,0,0,781,248.5);

	this.instance_3 = new lib.sheep1b_1("synched",0);
	this.instance_3.setTransform(70,50.05,1,1,0,0,0,781,242.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_2}]}).to({state:[{t:this.instance_3}]},8).wait(8));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-57,-44.4,253,201);


(lib.sheep14 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_3
	this.instance = new lib.number14();
	this.instance.setTransform(63,9);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(16));

	// Layer_2
	this.instance_1 = new lib.sheepgirlinator();
	this.instance_1.setTransform(-20,-44);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(16));

	// Layer_1
	this.instance_2 = new lib.sheep1a_1("synched",0);
	this.instance_2.setTransform(69,56.05,1,1,0,0,0,781,248.5);

	this.instance_3 = new lib.sheep1b_1("synched",0);
	this.instance_3.setTransform(70,50.05,1,1,0,0,0,781,242.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_2}]}).to({state:[{t:this.instance_3}]},8).wait(8));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-57,-44.4,253,201);


(lib.sheep13 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_3
	this.instance = new lib.number13();
	this.instance.setTransform(63,9);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(16));

	// Layer_2
	this.instance_1 = new lib.sheepgirlinator();
	this.instance_1.setTransform(-20,-44);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(16));

	// Layer_1
	this.instance_2 = new lib.sheep1a_1("synched",0);
	this.instance_2.setTransform(69,56.05,1,1,0,0,0,781,248.5);

	this.instance_3 = new lib.sheep1b_1("synched",0);
	this.instance_3.setTransform(70,50.05,1,1,0,0,0,781,242.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_2}]}).to({state:[{t:this.instance_3}]},8).wait(8));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-57,-44.4,253,201);


(lib.sheep12 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_2
	this.instance = new lib.number12();
	this.instance.setTransform(60,7);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(16));

	// Layer_1
	this.instance_1 = new lib.sheep1a_1("synched",0);
	this.instance_1.setTransform(69,56.05,1,1,0,0,0,781,248.5);

	this.instance_2 = new lib.sheep1b_1("synched",0);
	this.instance_2.setTransform(70,50.05,1,1,0,0,0,781,242.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1}]}).to({state:[{t:this.instance_2}]},8).wait(8));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-57,-44.4,253,201);


(lib.sheep11 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_3
	this.instance = new lib.number11();
	this.instance.setTransform(63,9);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(16));

	// Layer_2
	this.instance_1 = new lib.sheepgirlinator();
	this.instance_1.setTransform(-20,-44);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(16));

	// Layer_1
	this.instance_2 = new lib.sheep1a_1("synched",0);
	this.instance_2.setTransform(69,56.05,1,1,0,0,0,781,248.5);

	this.instance_3 = new lib.sheep1b_1("synched",0);
	this.instance_3.setTransform(70,50.05,1,1,0,0,0,781,242.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_2}]}).to({state:[{t:this.instance_3}]},8).wait(8));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-57,-44.4,253,201);


(lib.sheep10 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_2
	this.instance = new lib.number10();
	this.instance.setTransform(62,2);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(16));

	// Layer_1
	this.instance_1 = new lib.sheep1a_1("synched",0);
	this.instance_1.setTransform(69,56.05,1,1,0,0,0,781,248.5);

	this.instance_2 = new lib.sheep1b_1("synched",0);
	this.instance_2.setTransform(70,50.05,1,1,0,0,0,781,242.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1}]}).to({state:[{t:this.instance_2}]},8).wait(8));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-57,-44.4,253,201);


(lib.sheep9 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_3
	this.instance = new lib.number9();
	this.instance.setTransform(63,9);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(16));

	// Layer_2
	this.instance_1 = new lib.sheepgirlinator();
	this.instance_1.setTransform(-20,-44);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(16));

	// Layer_1
	this.instance_2 = new lib.sheep1a_1("synched",0);
	this.instance_2.setTransform(69,56.05,1,1,0,0,0,781,248.5);

	this.instance_3 = new lib.sheep1b_1("synched",0);
	this.instance_3.setTransform(70,50.05,1,1,0,0,0,781,242.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_2}]}).to({state:[{t:this.instance_3}]},8).wait(8));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-57,-44.4,253,201);


(lib.sheep8 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_3
	this.instance = new lib.number8();
	this.instance.setTransform(63,9);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(16));

	// Layer_2
	this.instance_1 = new lib.sheepgirlinator();
	this.instance_1.setTransform(-20,-44);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(16));

	// Layer_1
	this.instance_2 = new lib.sheep1a_1("synched",0);
	this.instance_2.setTransform(69,56.05,1,1,0,0,0,781,248.5);

	this.instance_3 = new lib.sheep1b_1("synched",0);
	this.instance_3.setTransform(70,50.05,1,1,0,0,0,781,242.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_2}]}).to({state:[{t:this.instance_3}]},8).wait(8));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-57,-44.4,253,201);


(lib.sheep7 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_2
	this.instance = new lib.number7();
	this.instance.setTransform(76,11);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(16));

	// Layer_1
	this.instance_1 = new lib.sheep1a_1("synched",0);
	this.instance_1.setTransform(69,56.05,1,1,0,0,0,781,248.5);

	this.instance_2 = new lib.sheep1b_1("synched",0);
	this.instance_2.setTransform(70,50.05,1,1,0,0,0,781,242.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1}]}).to({state:[{t:this.instance_2}]},8).wait(8));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-57,-44.4,253,201);


(lib.sheep6 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_2
	this.instance = new lib.number6();
	this.instance.setTransform(76,11);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(16));

	// Layer_1
	this.instance_1 = new lib.sheep1a_1("synched",0);
	this.instance_1.setTransform(69,56.05,1,1,0,0,0,781,248.5);

	this.instance_2 = new lib.sheep1b_1("synched",0);
	this.instance_2.setTransform(70,50.05,1,1,0,0,0,781,242.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1}]}).to({state:[{t:this.instance_2}]},8).wait(8));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-57,-44.4,253,201);


(lib.sheep5 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_2
	this.instance = new lib.number5();
	this.instance.setTransform(76,11);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(16));

	// Layer_1
	this.instance_1 = new lib.sheep1a_1("synched",0);
	this.instance_1.setTransform(69,56.05,1,1,0,0,0,781,248.5);

	this.instance_2 = new lib.sheep1b_1("synched",0);
	this.instance_2.setTransform(70,50.05,1,1,0,0,0,781,242.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1}]}).to({state:[{t:this.instance_2}]},8).wait(8));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-57,-44.4,253,201);


(lib.sheep4 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_3
	this.instance = new lib.number4();
	this.instance.setTransform(67,3);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(16));

	// Layer_2
	this.instance_1 = new lib.sheepgirlinator();
	this.instance_1.setTransform(-20,-44);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(16));

	// Layer_1
	this.instance_2 = new lib.sheep1a_1("synched",0);
	this.instance_2.setTransform(69,56.05,1,1,0,0,0,781,248.5);

	this.instance_3 = new lib.sheep1b_1("synched",0);
	this.instance_3.setTransform(70,50.05,1,1,0,0,0,781,242.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_2}]}).to({state:[{t:this.instance_3}]},8).wait(8));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-57,-44.4,253,201);


(lib.sheep3 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_3
	this.instance = new lib.number3();
	this.instance.setTransform(63,9);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(16));

	// Layer_2
	this.instance_1 = new lib.sheepgirlinator();
	this.instance_1.setTransform(-20,-44);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(16));

	// Layer_1
	this.instance_2 = new lib.sheep1a_1("synched",0);
	this.instance_2.setTransform(69,56.05,1,1,0,0,0,781,248.5);

	this.instance_3 = new lib.sheep1b_1("synched",0);
	this.instance_3.setTransform(70,50.05,1,1,0,0,0,781,242.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_2}]}).to({state:[{t:this.instance_3}]},8).wait(8));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-57,-44.4,253,201);


(lib.sheep2 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_2
	this.instance = new lib.number2();
	this.instance.setTransform(76,11);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(16));

	// Layer_1
	this.instance_1 = new lib.sheep1a_1("synched",0);
	this.instance_1.setTransform(69,56.05,1,1,0,0,0,781,248.5);

	this.instance_2 = new lib.sheep1b_1("synched",0);
	this.instance_2.setTransform(70,50.05,1,1,0,0,0,781,242.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1}]}).to({state:[{t:this.instance_2}]},8).wait(8));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-57,-44.4,253,201);


(lib.sheep1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_2
	this.instance = new lib.number1();
	this.instance.setTransform(83,9);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(16));

	// Layer_1
	this.instance_1 = new lib.sheep1a_1("synched",0);
	this.instance_1.setTransform(69,56.05,1,1,0,0,0,781,248.5);

	this.instance_2 = new lib.sheep1b_1("synched",0);
	this.instance_2.setTransform(70,50.05,1,1,0,0,0,781,242.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1}]}).to({state:[{t:this.instance_2}]},8).wait(8));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-57,-44.4,253,201);


(lib.Scene_1_thoughts = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// thoughts
	this.instance = new lib.thoughtscominginandout("synched",0);
	this.instance.setTransform(482.4,268.3);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(187).to({_off:false},0).to({_off:true},70).wait(482));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_play_button = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// play_button
	this.playbutton = new lib.playbutton();
	this.playbutton.name = "playbutton";
	this.playbutton.setTransform(630.45,365);
	new cjs.ButtonHelper(this.playbutton, 0, 1, 2, false, new lib.playbutton(), 3);

	this.timeline.addTween(cjs.Tween.get(this.playbutton).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Scene_1_play_button, null, null);


(lib.Scene_1_kid_eyes = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// kid_eyes
	this.instance = new lib.kideyedwithblink("synched",0);
	this.instance.setTransform(289,374.5);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1).to({_off:false},0).wait(374).to({startPosition:374},0).wait(364));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_kid = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// kid
	this.instance = new lib.kidnoface("synched",0);
	this.instance.setTransform(391,469.5,0.8857,0.8857);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1).to({_off:false},0).wait(374).to({startPosition:0},0).wait(364));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_background_items = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// background_items
	this.instance = new lib.bed("synched",0);
	this.instance.setTransform(435.5,492.4,0.8159,0.8159);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1).to({_off:false},0).wait(206).to({startPosition:0},0).wait(91).to({startPosition:0},0).wait(2).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(12).to({startPosition:0},0).wait(44).to({startPosition:0},0).wait(382));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.dreamfadein = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.dreambackgroundfadein();
	this.instance.setTransform(-0.05,0.05,1,1,0,0,0,329.4,175.2);
	this.instance.alpha = 0;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1).to({regX:329.5,x:0.05,alpha:0.0294},0).wait(1).to({alpha:0.0588},0).wait(1).to({alpha:0.0882},0).wait(1).to({alpha:0.1176},0).wait(1).to({alpha:0.1471},0).wait(1).to({alpha:0.1765},0).wait(1).to({alpha:0.2059},0).wait(1).to({alpha:0.2353},0).wait(1).to({alpha:0.2647},0).wait(1).to({alpha:0.2941},0).wait(1).to({alpha:0.3235},0).wait(1).to({alpha:0.3529},0).wait(1).to({alpha:0.3824},0).wait(1).to({alpha:0.4118},0).wait(1).to({alpha:0.4412},0).wait(1).to({alpha:0.4706},0).wait(1).to({alpha:0.5},0).wait(1).to({alpha:0.5294},0).wait(1).to({alpha:0.5588},0).wait(1).to({alpha:0.5882},0).wait(1).to({alpha:0.6176},0).wait(1).to({alpha:0.6471},0).wait(1).to({alpha:0.6765},0).wait(1).to({alpha:0.7059},0).wait(1).to({alpha:0.7353},0).wait(1).to({alpha:0.7647},0).wait(1).to({alpha:0.7941},0).wait(1).to({alpha:0.8235},0).wait(1).to({alpha:0.8529},0).wait(1).to({alpha:0.8824},0).wait(1).to({alpha:0.9118},0).wait(1).to({alpha:0.9412},0).wait(1).to({alpha:0.9706},0).wait(1).to({alpha:1},0).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-329.4,-175.1,658.9,350.29999999999995);


(lib.sheepspiral = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// sheep_15
	this.instance = new lib.sheep15("synched",0);
	this.instance.setTransform(7.6,-57.6,1,1,0,0,0,69.5,56.1);
	this.instance.alpha = 0;
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(110).to({_off:false},0).wait(1).to({regY:56,scaleX:0.9855,scaleY:0.9855,x:-19.1,y:-68.75,alpha:0.2,startPosition:1},0).wait(1).to({scaleX:0.971,scaleY:0.971,x:-45.6,y:-77.95,alpha:0.4,startPosition:2},0).wait(1).to({scaleX:0.9566,scaleY:0.9566,x:-71.8,y:-85.35,alpha:0.6,startPosition:3},0).wait(1).to({scaleX:0.9421,scaleY:0.9421,x:-97.75,y:-90.85,alpha:0.8,startPosition:4},0).wait(1).to({scaleX:0.9276,scaleY:0.9276,x:-123.4,y:-94.5,alpha:1,startPosition:5},0).wait(1).to({scaleX:0.9131,scaleY:0.9131,x:-148.75,y:-96.25,startPosition:6},0).wait(1).to({scaleX:0.8986,scaleY:0.8986,x:-173.85,startPosition:7},0).wait(1).to({scaleX:0.8842,scaleY:0.8842,x:-198.7,y:-94.35,startPosition:8},0).wait(1).to({scaleX:0.8697,scaleY:0.8697,x:-223.3,y:-90.6,startPosition:9},0).wait(1).to({scaleX:0.8552,scaleY:0.8552,x:-247.6,y:-85,startPosition:10},0).wait(1).to({scaleX:0.8407,scaleY:0.8407,x:-271.7,y:-77.55,startPosition:11},0).wait(1).to({scaleX:0.8262,scaleY:0.8262,x:-295.55,y:-68.3,startPosition:12},0).wait(1).to({scaleX:0.8118,scaleY:0.8118,x:-319.05,y:-57.1,startPosition:13},0).wait(1).to({scaleX:0.7973,scaleY:0.7973,x:-342.35,y:-44.1,startPosition:14},0).wait(1).to({scaleX:0.7828,scaleY:0.7828,x:-365.4,y:-29.25,startPosition:15},0).wait(1).to({scaleX:0.7683,scaleY:0.7683,x:-388.15,y:-12.5,startPosition:0},0).wait(1).to({scaleX:0.7538,scaleY:0.7538,x:-414.9,y:-20,startPosition:1},0).wait(1).to({scaleX:0.7394,scaleY:0.7394,x:-441.3,y:-25.75,startPosition:2},0).wait(1).to({scaleX:0.7249,scaleY:0.7249,x:-467.4,y:-29.75,startPosition:3},0).wait(1).to({scaleX:0.7104,scaleY:0.7104,x:-493.15,y:-32.05,startPosition:4},0).wait(1).to({scaleX:0.6959,scaleY:0.6959,x:-518.55,y:-32.7,startPosition:5},0).wait(1).to({scaleX:0.6814,scaleY:0.6814,x:-543.6,y:-31.6,startPosition:6},0).wait(1).to({scaleX:0.667,scaleY:0.667,x:-568.3,y:-28.8,startPosition:7},0).wait(1).to({scaleX:0.6525,scaleY:0.6525,x:-592.7,y:-24.25,startPosition:8},0).wait(1).to({scaleX:0.638,scaleY:0.638,x:-616.75,y:-18,startPosition:9},0).wait(1).to({scaleX:0.6235,scaleY:0.6235,x:-640.5,y:-10.1,startPosition:10},0).wait(1).to({scaleX:0.609,scaleY:0.609,x:-663.9,y:-0.4,startPosition:11},0).wait(1).to({scaleX:0.5946,scaleY:0.5946,x:-687.05,y:11,startPosition:12},0).wait(1).to({scaleX:0.5801,scaleY:0.5801,x:-709.85,y:24.1,startPosition:13},0).wait(1).to({scaleX:0.5486,skewY:180,startPosition:14},0).wait(1).to({x:-693.7,y:17.3,startPosition:15},0).wait(1).to({x:-677.55,y:11.4,startPosition:0},0).wait(1).to({x:-661.3,y:6.4,startPosition:1},0).wait(1).to({x:-644.95,y:2.3,startPosition:2},0).wait(1).to({x:-628.6,y:-0.9,startPosition:3},0).wait(1).to({x:-612.15,y:-3.2,startPosition:4},0).wait(1).to({x:-595.65,y:-4.55,startPosition:5},0).wait(1).to({x:-579.05,y:-5.05,startPosition:6},0).wait(1).to({x:-562.4,y:-4.6,startPosition:7},0).wait(1).to({x:-545.65,y:-3.25,startPosition:8},0).wait(1).to({x:-528.9,y:-1.05,startPosition:9},0).wait(1).to({x:-512,y:2.1,startPosition:10},0).wait(1).to({x:-495.1,y:6.15,startPosition:11},0).wait(1).to({x:-478.1,y:11.1,startPosition:12},0).wait(1).to({x:-461,y:17,startPosition:13},0).wait(1).to({x:-443.85,y:23.75,startPosition:14},0).wait(1).to({x:-426.65,y:31.45,startPosition:15},0).wait(1).to({x:-409.35,y:39.95,startPosition:0},0).wait(1).to({x:-392,y:49.45,startPosition:1},0).wait(1).to({scaleX:0.5998,skewY:0,x:-404.2,y:45.95,startPosition:2},0).wait(1).to({scaleX:0.5971,x:-414.1,y:35.95,startPosition:3},0).wait(1).to({scaleX:0.5943,x:-424.25,y:26.6,startPosition:4},0).wait(1).to({scaleX:0.5916,x:-434.55,y:17.75,startPosition:5},0).wait(1).to({scaleX:0.5889,x:-445.05,y:9.55,startPosition:6},0).wait(1).to({scaleX:0.5861,x:-455.8,y:1.9,startPosition:7},0).wait(1).to({scaleX:0.5834,x:-466.8,y:-5.1,startPosition:8},0).wait(1).to({scaleX:0.5807,x:-478,y:-11.55,startPosition:9},0).wait(1).to({scaleX:0.578,x:-489.4,y:-17.4,startPosition:10},0).wait(1).to({scaleX:0.5752,x:-500.95,y:-22.65,startPosition:11},0).wait(1).to({scaleX:0.5725,x:-512.8,y:-27.35,startPosition:12},0).wait(1).to({scaleX:0.5698,x:-524.85,y:-31.4,startPosition:13},0).wait(1).to({scaleX:0.567,x:-537.1,y:-34.9,startPosition:14},0).wait(1).to({scaleX:0.5643,x:-549.6,y:-37.75,startPosition:15},0).wait(1).to({scaleX:0.5616,x:-562.2,y:-40.05,startPosition:0},0).wait(1).to({scaleX:0.5589,x:-575.15,y:-41.75,startPosition:1},0).wait(1).to({scaleX:0.5561,x:-588.25,y:-42.9,startPosition:2},0).wait(1).to({scaleX:0.5534,x:-601.6,y:-43.4,startPosition:3},0).wait(1).to({scaleX:0.5507,x:-615.2,y:-43.3,startPosition:4},0).wait(1).to({scaleX:0.5479,x:-628.9,y:-42.65,startPosition:5},0).wait(1).to({scaleX:0.5452,x:-642.9,y:-41.4,startPosition:6},0).wait(1).to({scaleX:0.5425,x:-657.15,y:-39.55,startPosition:7},0).wait(1).to({scaleX:0.5398,x:-671.6,y:-37.1,startPosition:8},0).wait(1).to({scaleX:0.537,x:-686.25,y:-34.05,startPosition:9},0).wait(1).to({scaleX:0.5486,skewY:180,x:-674.65,y:-38.25,startPosition:10},0).wait(1).to({x:-663.05,y:-48.2,startPosition:11},0).wait(1).to({x:-651.45,y:-57.6,startPosition:12},0).wait(1).to({x:-639.85,y:-66.35,startPosition:13},0).wait(1).to({x:-628.25,y:-74.45,startPosition:14},0).wait(1).to({x:-616.7,y:-82,startPosition:15},0).wait(1).to({x:-605.1,y:-88.9,startPosition:0},0).wait(1).to({x:-593.5,y:-95.2,startPosition:1},0).wait(1).to({x:-581.95,y:-100.9,startPosition:2},0).wait(1).to({x:-570.35,y:-105.95,startPosition:3},0).wait(1).to({x:-558.8,y:-110.4,startPosition:4},0).wait(1).to({x:-547.2,y:-114.25,startPosition:5},0).wait(1).to({x:-535.6,y:-117.45,startPosition:6},0).wait(1).to({x:-524.05,y:-120.1,startPosition:7},0).wait(1).to({x:-512.45,y:-122.1,startPosition:8},0).wait(1).to({x:-500.85,y:-123.5,startPosition:9},0).wait(1).to({x:-489.25,y:-124.3,startPosition:10},0).wait(1).to({x:-477.7,y:-124.45,startPosition:11},0).wait(1).to({x:-466.1,y:-124,startPosition:12},0).wait(1).to({x:-454.5,y:-122.95,startPosition:13},0).wait(1).to({x:-442.9,y:-121.3,startPosition:14},0).wait(1).to({scaleX:0.5947,skewY:0,x:-453.7,y:-124.65,startPosition:15},0).wait(1).to({scaleX:0.595,x:-462.85,y:-135.25,startPosition:0},0).wait(1).to({scaleX:0.5953,x:-472.15,y:-145.05,startPosition:1},0).wait(1).to({scaleX:0.5956,x:-481.6,y:-154.05,startPosition:2},0).wait(1).to({scaleX:0.5959,x:-491.3,y:-162.2,startPosition:3},0).wait(1).to({scaleX:0.5961,x:-501.2,y:-169.6,startPosition:4},0).wait(1).to({scaleX:0.5964,x:-511.3,y:-176.15,startPosition:5},0).wait(1).to({scaleX:0.5967,x:-521.6,y:-181.95,startPosition:6},0).wait(1).to({scaleX:0.597,x:-532.05,y:-186.9,startPosition:7},0).wait(1).to({scaleX:0.5972,x:-542.8,y:-191.05,startPosition:8},0).wait(1).to({scaleX:0.5975,x:-553.65,y:-194.4,startPosition:9},0).wait(1).to({scaleX:0.5978,x:-564.75,y:-197,startPosition:10},0).wait(1).to({scaleX:0.5981,x:-576.05,y:-198.75,startPosition:11},0).wait(1).to({scaleX:0.5984,x:-587.55,y:-199.7,startPosition:12},0).wait(1).to({scaleX:0.5986,x:-599.25,y:-199.85,startPosition:13},0).wait(1).to({scaleX:0.5989,x:-611.2,y:-199.15,startPosition:14},0).wait(1).to({scaleX:0.5992,x:-623.25,y:-197.7,startPosition:15},0).wait(1).to({scaleX:0.5995,x:-635.6,y:-195.45,startPosition:0},0).wait(1).to({scaleX:0.5997,x:-648.1,y:-192.35,startPosition:1},0).wait(1).to({scaleX:0.6,x:-660.85,y:-188.5,startPosition:2},0).wait(1).to({scaleX:0.5486,skewY:180,x:-649.8,y:-196.25,startPosition:3},0).wait(1).to({x:-644.3,y:-208.95,startPosition:4},0).wait(1).to({x:-638.35,y:-221.3,startPosition:5},0).wait(1).to({x:-632,y:-233.3,startPosition:6},0).wait(1).to({x:-625.3,y:-244.9,startPosition:7},0).wait(1).to({x:-618.15,y:-256.15,startPosition:8},0).wait(1).to({x:-610.6,y:-267.05,startPosition:9},0).wait(1).to({x:-602.6,y:-277.55,startPosition:10},0).wait(1).to({x:-594.25,y:-287.7,startPosition:11},0).wait(1).to({x:-585.5,y:-297.5,startPosition:12},0).wait(1).to({x:-576.3,y:-306.9,startPosition:13},0).wait(1).to({x:-566.7,y:-315.95,startPosition:14},0).wait(1).to({x:-556.7,y:-324.6,startPosition:15},0).wait(1).to({x:-546.3,y:-332.9,startPosition:0},0).wait(1).to({x:-535.5,y:-340.85,startPosition:1},0).to({_off:true},1).wait(33));

	// sheep_14
	this.instance_1 = new lib.sheep14("synched",0);
	this.instance_1.setTransform(7.6,-57.6,1,1,0,0,0,69.5,56.1);
	this.instance_1.alpha = 0;
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(99).to({_off:false},0).wait(1).to({regY:56,scaleX:0.9855,scaleY:0.9855,x:-19.1,y:-68.75,alpha:0.2,startPosition:1},0).wait(1).to({scaleX:0.971,scaleY:0.971,x:-45.6,y:-77.95,alpha:0.4,startPosition:2},0).wait(1).to({scaleX:0.9566,scaleY:0.9566,x:-71.8,y:-85.35,alpha:0.6,startPosition:3},0).wait(1).to({scaleX:0.9421,scaleY:0.9421,x:-97.75,y:-90.85,alpha:0.8,startPosition:4},0).wait(1).to({scaleX:0.9276,scaleY:0.9276,x:-123.4,y:-94.5,alpha:1,startPosition:5},0).wait(1).to({scaleX:0.9131,scaleY:0.9131,x:-148.75,y:-96.25,startPosition:6},0).wait(1).to({scaleX:0.8986,scaleY:0.8986,x:-173.85,startPosition:7},0).wait(1).to({scaleX:0.8842,scaleY:0.8842,x:-198.7,y:-94.35,startPosition:8},0).wait(1).to({scaleX:0.8697,scaleY:0.8697,x:-223.3,y:-90.6,startPosition:9},0).wait(1).to({scaleX:0.8552,scaleY:0.8552,x:-247.6,y:-85,startPosition:10},0).wait(1).to({scaleX:0.8407,scaleY:0.8407,x:-271.7,y:-77.55,startPosition:11},0).wait(1).to({scaleX:0.8262,scaleY:0.8262,x:-295.55,y:-68.3,startPosition:12},0).wait(1).to({scaleX:0.8118,scaleY:0.8118,x:-319.05,y:-57.1,startPosition:13},0).wait(1).to({scaleX:0.7973,scaleY:0.7973,x:-342.35,y:-44.1,startPosition:14},0).wait(1).to({scaleX:0.7828,scaleY:0.7828,x:-365.4,y:-29.25,startPosition:15},0).wait(1).to({scaleX:0.7683,scaleY:0.7683,x:-388.15,y:-12.5,startPosition:0},0).wait(1).to({scaleX:0.7538,scaleY:0.7538,x:-414.9,y:-20,startPosition:1},0).wait(1).to({scaleX:0.7394,scaleY:0.7394,x:-441.3,y:-25.75,startPosition:2},0).wait(1).to({scaleX:0.7249,scaleY:0.7249,x:-467.4,y:-29.75,startPosition:3},0).wait(1).to({scaleX:0.7104,scaleY:0.7104,x:-493.15,y:-32.05,startPosition:4},0).wait(1).to({scaleX:0.6959,scaleY:0.6959,x:-518.55,y:-32.7,startPosition:5},0).wait(1).to({scaleX:0.6814,scaleY:0.6814,x:-543.6,y:-31.6,startPosition:6},0).wait(1).to({scaleX:0.667,scaleY:0.667,x:-568.3,y:-28.8,startPosition:7},0).wait(1).to({scaleX:0.6525,scaleY:0.6525,x:-592.7,y:-24.25,startPosition:8},0).wait(1).to({scaleX:0.638,scaleY:0.638,x:-616.75,y:-18,startPosition:9},0).wait(1).to({scaleX:0.6235,scaleY:0.6235,x:-640.5,y:-10.1,startPosition:10},0).wait(1).to({scaleX:0.609,scaleY:0.609,x:-663.9,y:-0.4,startPosition:11},0).wait(1).to({scaleX:0.5946,scaleY:0.5946,x:-687.05,y:11,startPosition:12},0).wait(1).to({scaleX:0.5801,scaleY:0.5801,x:-709.85,y:24.1,startPosition:13},0).wait(1).to({scaleX:0.5486,skewY:180,startPosition:14},0).wait(1).to({x:-693.7,y:17.3,startPosition:15},0).wait(1).to({x:-677.55,y:11.4,startPosition:0},0).wait(1).to({x:-661.3,y:6.4,startPosition:1},0).wait(1).to({x:-644.95,y:2.3,startPosition:2},0).wait(1).to({x:-628.6,y:-0.9,startPosition:3},0).wait(1).to({x:-612.15,y:-3.2,startPosition:4},0).wait(1).to({x:-595.65,y:-4.55,startPosition:5},0).wait(1).to({x:-579.05,y:-5.05,startPosition:6},0).wait(1).to({x:-562.4,y:-4.6,startPosition:7},0).wait(1).to({x:-545.65,y:-3.25,startPosition:8},0).wait(1).to({x:-528.9,y:-1.05,startPosition:9},0).wait(1).to({x:-512,y:2.1,startPosition:10},0).wait(1).to({x:-495.1,y:6.15,startPosition:11},0).wait(1).to({x:-478.1,y:11.1,startPosition:12},0).wait(1).to({x:-461,y:17,startPosition:13},0).wait(1).to({x:-443.85,y:23.75,startPosition:14},0).wait(1).to({x:-426.65,y:31.45,startPosition:15},0).wait(1).to({x:-409.35,y:39.95,startPosition:0},0).wait(1).to({x:-392,y:49.45,startPosition:1},0).wait(1).to({scaleX:0.5998,skewY:0,x:-404.2,y:45.95,startPosition:2},0).wait(1).to({scaleX:0.5971,x:-414.1,y:35.95,startPosition:3},0).wait(1).to({scaleX:0.5943,x:-424.25,y:26.6,startPosition:4},0).wait(1).to({scaleX:0.5916,x:-434.55,y:17.75,startPosition:5},0).wait(1).to({scaleX:0.5889,x:-445.05,y:9.55,startPosition:6},0).wait(1).to({scaleX:0.5861,x:-455.8,y:1.9,startPosition:7},0).wait(1).to({scaleX:0.5834,x:-466.8,y:-5.1,startPosition:8},0).wait(1).to({scaleX:0.5807,x:-478,y:-11.55,startPosition:9},0).wait(1).to({scaleX:0.578,x:-489.4,y:-17.4,startPosition:10},0).wait(1).to({scaleX:0.5752,x:-500.95,y:-22.65,startPosition:11},0).wait(1).to({scaleX:0.5725,x:-512.8,y:-27.35,startPosition:12},0).wait(1).to({scaleX:0.5698,x:-524.85,y:-31.4,startPosition:13},0).wait(1).to({scaleX:0.567,x:-537.1,y:-34.9,startPosition:14},0).wait(1).to({scaleX:0.5643,x:-549.6,y:-37.75,startPosition:15},0).wait(1).to({scaleX:0.5616,x:-562.2,y:-40.05,startPosition:0},0).wait(1).to({scaleX:0.5589,x:-575.15,y:-41.75,startPosition:1},0).wait(1).to({scaleX:0.5561,x:-588.25,y:-42.9,startPosition:2},0).wait(1).to({scaleX:0.5534,x:-601.6,y:-43.4,startPosition:3},0).wait(1).to({scaleX:0.5507,x:-615.2,y:-43.3,startPosition:4},0).wait(1).to({scaleX:0.5479,x:-628.9,y:-42.65,startPosition:5},0).wait(1).to({scaleX:0.5452,x:-642.9,y:-41.4,startPosition:6},0).wait(1).to({scaleX:0.5425,x:-657.15,y:-39.55,startPosition:7},0).wait(1).to({scaleX:0.5398,x:-671.6,y:-37.1,startPosition:8},0).wait(1).to({scaleX:0.537,x:-686.25,y:-34.05,startPosition:9},0).wait(1).to({scaleX:0.5486,skewY:180,x:-674.65,y:-38.25,startPosition:10},0).wait(1).to({x:-663.05,y:-48.2,startPosition:11},0).wait(1).to({x:-651.45,y:-57.6,startPosition:12},0).wait(1).to({x:-639.85,y:-66.35,startPosition:13},0).wait(1).to({x:-628.25,y:-74.45,startPosition:14},0).wait(1).to({x:-616.7,y:-82,startPosition:15},0).wait(1).to({x:-605.1,y:-88.9,startPosition:0},0).wait(1).to({x:-593.5,y:-95.2,startPosition:1},0).wait(1).to({x:-581.95,y:-100.9,startPosition:2},0).wait(1).to({x:-570.35,y:-105.95,startPosition:3},0).wait(1).to({x:-558.8,y:-110.4,startPosition:4},0).wait(1).to({x:-547.2,y:-114.25,startPosition:5},0).wait(1).to({x:-535.6,y:-117.45,startPosition:6},0).wait(1).to({x:-524.05,y:-120.1,startPosition:7},0).wait(1).to({x:-512.45,y:-122.1,startPosition:8},0).wait(1).to({x:-500.85,y:-123.5,startPosition:9},0).wait(1).to({x:-489.25,y:-124.3,startPosition:10},0).wait(1).to({x:-477.7,y:-124.45,startPosition:11},0).wait(1).to({x:-466.1,y:-124,startPosition:12},0).wait(1).to({x:-454.5,y:-122.95,startPosition:13},0).wait(1).to({x:-442.9,y:-121.3,startPosition:14},0).wait(1).to({scaleX:0.5947,skewY:0,x:-453.7,y:-124.65,startPosition:15},0).wait(1).to({scaleX:0.595,x:-462.85,y:-135.25,startPosition:0},0).wait(1).to({scaleX:0.5953,x:-472.15,y:-145.05,startPosition:1},0).wait(1).to({scaleX:0.5956,x:-481.6,y:-154.05,startPosition:2},0).wait(1).to({scaleX:0.5959,x:-491.3,y:-162.2,startPosition:3},0).wait(1).to({scaleX:0.5961,x:-501.2,y:-169.6,startPosition:4},0).wait(1).to({scaleX:0.5964,x:-511.3,y:-176.15,startPosition:5},0).wait(1).to({scaleX:0.5967,x:-521.6,y:-181.95,startPosition:6},0).wait(1).to({scaleX:0.597,x:-532.05,y:-186.9,startPosition:7},0).wait(1).to({scaleX:0.5972,x:-542.8,y:-191.05,startPosition:8},0).wait(1).to({scaleX:0.5975,x:-553.65,y:-194.4,startPosition:9},0).wait(1).to({scaleX:0.5978,x:-564.75,y:-197,startPosition:10},0).wait(1).to({scaleX:0.5981,x:-576.05,y:-198.75,startPosition:11},0).wait(1).to({scaleX:0.5984,x:-587.55,y:-199.7,startPosition:12},0).wait(1).to({scaleX:0.5986,x:-599.25,y:-199.85,startPosition:13},0).wait(1).to({scaleX:0.5989,x:-611.2,y:-199.15,startPosition:14},0).wait(1).to({scaleX:0.5992,x:-623.25,y:-197.7,startPosition:15},0).wait(1).to({scaleX:0.5995,x:-635.6,y:-195.45,startPosition:0},0).wait(1).to({scaleX:0.5997,x:-648.1,y:-192.35,startPosition:1},0).wait(1).to({scaleX:0.6,x:-660.85,y:-188.5,startPosition:2},0).wait(1).to({scaleX:0.5486,skewY:180,x:-649.8,y:-196.25,startPosition:3},0).wait(1).to({x:-644.3,y:-208.95,startPosition:4},0).wait(1).to({x:-638.35,y:-221.3,startPosition:5},0).wait(1).to({x:-632,y:-233.3,startPosition:6},0).wait(1).to({x:-625.3,y:-244.9,startPosition:7},0).wait(1).to({x:-618.15,y:-256.15,startPosition:8},0).wait(1).to({x:-610.6,y:-267.05,startPosition:9},0).wait(1).to({x:-602.6,y:-277.55,startPosition:10},0).wait(1).to({x:-594.25,y:-287.7,startPosition:11},0).wait(1).to({x:-585.45,y:-297.5,startPosition:12},0).wait(1).to({x:-576.3,y:-306.9,startPosition:13},0).wait(1).to({x:-566.7,y:-315.95,startPosition:14},0).wait(1).to({x:-556.7,y:-324.6,startPosition:15},0).wait(1).to({x:-546.3,y:-332.95,startPosition:0},0).wait(1).to({x:-535.5,y:-340.85,startPosition:1},0).wait(1).to({x:-524.25,y:-348.45,startPosition:2},0).wait(1).to({x:-512.65,y:-355.65,startPosition:3},0).wait(1).to({x:-500.6,y:-362.5,startPosition:4},0).wait(1).to({x:-488.15,y:-369,startPosition:5},0).wait(1).to({x:-475.3,y:-375.1,startPosition:6},0).wait(1).to({x:-462.05,y:-380.9,startPosition:7},0).wait(1).to({x:-448.35,y:-386.25,startPosition:8},0).wait(1).to({x:-434.3,y:-391.3,startPosition:9},0).wait(1).to({x:-419.8,y:-395.95,startPosition:10},0).wait(1).to({x:-404.9,y:-400.25,startPosition:11},0).wait(1).to({x:-389.55,y:-404.15,startPosition:12},0).to({_off:true},1).wait(33));

	// sheep_13
	this.instance_2 = new lib.sheep13("synched",0);
	this.instance_2.setTransform(7.6,-57.6,1,1,0,0,0,69.5,56.1);
	this.instance_2.alpha = 0;
	this.instance_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(88).to({_off:false},0).wait(1).to({regY:56,scaleX:0.9855,scaleY:0.9855,x:-19.1,y:-68.75,alpha:0.2,startPosition:1},0).wait(1).to({scaleX:0.971,scaleY:0.971,x:-45.6,y:-77.95,alpha:0.4,startPosition:2},0).wait(1).to({scaleX:0.9566,scaleY:0.9566,x:-71.8,y:-85.35,alpha:0.6,startPosition:3},0).wait(1).to({scaleX:0.9421,scaleY:0.9421,x:-97.75,y:-90.85,alpha:0.8,startPosition:4},0).wait(1).to({scaleX:0.9276,scaleY:0.9276,x:-123.4,y:-94.5,alpha:1,startPosition:5},0).wait(1).to({scaleX:0.9131,scaleY:0.9131,x:-148.75,y:-96.25,startPosition:6},0).wait(1).to({scaleX:0.8986,scaleY:0.8986,x:-173.85,startPosition:7},0).wait(1).to({scaleX:0.8842,scaleY:0.8842,x:-198.7,y:-94.35,startPosition:8},0).wait(1).to({scaleX:0.8697,scaleY:0.8697,x:-223.3,y:-90.6,startPosition:9},0).wait(1).to({scaleX:0.8552,scaleY:0.8552,x:-247.6,y:-85,startPosition:10},0).wait(1).to({scaleX:0.8407,scaleY:0.8407,x:-271.7,y:-77.55,startPosition:11},0).wait(1).to({scaleX:0.8262,scaleY:0.8262,x:-295.55,y:-68.3,startPosition:12},0).wait(1).to({scaleX:0.8118,scaleY:0.8118,x:-319.05,y:-57.1,startPosition:13},0).wait(1).to({scaleX:0.7973,scaleY:0.7973,x:-342.35,y:-44.1,startPosition:14},0).wait(1).to({scaleX:0.7828,scaleY:0.7828,x:-365.4,y:-29.25,startPosition:15},0).wait(1).to({scaleX:0.7683,scaleY:0.7683,x:-388.15,y:-12.5,startPosition:0},0).wait(1).to({scaleX:0.7538,scaleY:0.7538,x:-414.9,y:-20,startPosition:1},0).wait(1).to({scaleX:0.7394,scaleY:0.7394,x:-441.3,y:-25.75,startPosition:2},0).wait(1).to({scaleX:0.7249,scaleY:0.7249,x:-467.4,y:-29.75,startPosition:3},0).wait(1).to({scaleX:0.7104,scaleY:0.7104,x:-493.15,y:-32.05,startPosition:4},0).wait(1).to({scaleX:0.6959,scaleY:0.6959,x:-518.55,y:-32.7,startPosition:5},0).wait(1).to({scaleX:0.6814,scaleY:0.6814,x:-543.6,y:-31.6,startPosition:6},0).wait(1).to({scaleX:0.667,scaleY:0.667,x:-568.3,y:-28.8,startPosition:7},0).wait(1).to({scaleX:0.6525,scaleY:0.6525,x:-592.7,y:-24.25,startPosition:8},0).wait(1).to({scaleX:0.638,scaleY:0.638,x:-616.75,y:-18,startPosition:9},0).wait(1).to({scaleX:0.6235,scaleY:0.6235,x:-640.5,y:-10.1,startPosition:10},0).wait(1).to({scaleX:0.609,scaleY:0.609,x:-663.9,y:-0.4,startPosition:11},0).wait(1).to({scaleX:0.5946,scaleY:0.5946,x:-687.05,y:11,startPosition:12},0).wait(1).to({scaleX:0.5801,scaleY:0.5801,x:-709.85,y:24.1,startPosition:13},0).wait(1).to({scaleX:0.5486,skewY:180,startPosition:14},0).wait(1).to({x:-693.7,y:17.3,startPosition:15},0).wait(1).to({x:-677.55,y:11.4,startPosition:0},0).wait(1).to({x:-661.3,y:6.4,startPosition:1},0).wait(1).to({x:-644.95,y:2.3,startPosition:2},0).wait(1).to({x:-628.6,y:-0.9,startPosition:3},0).wait(1).to({x:-612.15,y:-3.2,startPosition:4},0).wait(1).to({x:-595.65,y:-4.55,startPosition:5},0).wait(1).to({x:-579.05,y:-5.05,startPosition:6},0).wait(1).to({x:-562.4,y:-4.6,startPosition:7},0).wait(1).to({x:-545.65,y:-3.25,startPosition:8},0).wait(1).to({x:-528.9,y:-1.05,startPosition:9},0).wait(1).to({x:-512,y:2.1,startPosition:10},0).wait(1).to({x:-495.1,y:6.15,startPosition:11},0).wait(1).to({x:-478.1,y:11.1,startPosition:12},0).wait(1).to({x:-461,y:17,startPosition:13},0).wait(1).to({x:-443.85,y:23.75,startPosition:14},0).wait(1).to({x:-426.65,y:31.45,startPosition:15},0).wait(1).to({x:-409.35,y:39.95,startPosition:0},0).wait(1).to({x:-392,y:49.45,startPosition:1},0).wait(1).to({scaleX:0.5998,skewY:0,x:-404.2,y:45.95,startPosition:2},0).wait(1).to({scaleX:0.5971,x:-414.1,y:35.95,startPosition:3},0).wait(1).to({scaleX:0.5943,x:-424.25,y:26.6,startPosition:4},0).wait(1).to({scaleX:0.5916,x:-434.55,y:17.75,startPosition:5},0).wait(1).to({scaleX:0.5889,x:-445.05,y:9.55,startPosition:6},0).wait(1).to({scaleX:0.5861,x:-455.8,y:1.9,startPosition:7},0).wait(1).to({scaleX:0.5834,x:-466.8,y:-5.1,startPosition:8},0).wait(1).to({scaleX:0.5807,x:-478,y:-11.55,startPosition:9},0).wait(1).to({scaleX:0.578,x:-489.4,y:-17.4,startPosition:10},0).wait(1).to({scaleX:0.5752,x:-500.95,y:-22.65,startPosition:11},0).wait(1).to({scaleX:0.5725,x:-512.8,y:-27.35,startPosition:12},0).wait(1).to({scaleX:0.5698,x:-524.85,y:-31.4,startPosition:13},0).wait(1).to({scaleX:0.567,x:-537.1,y:-34.9,startPosition:14},0).wait(1).to({scaleX:0.5643,x:-549.6,y:-37.75,startPosition:15},0).wait(1).to({scaleX:0.5616,x:-562.2,y:-40.05,startPosition:0},0).wait(1).to({scaleX:0.5589,x:-575.15,y:-41.75,startPosition:1},0).wait(1).to({scaleX:0.5561,x:-588.25,y:-42.9,startPosition:2},0).wait(1).to({scaleX:0.5534,x:-601.6,y:-43.4,startPosition:3},0).wait(1).to({scaleX:0.5507,x:-615.2,y:-43.3,startPosition:4},0).wait(1).to({scaleX:0.5479,x:-628.9,y:-42.65,startPosition:5},0).wait(1).to({scaleX:0.5452,x:-642.9,y:-41.4,startPosition:6},0).wait(1).to({scaleX:0.5425,x:-657.15,y:-39.55,startPosition:7},0).wait(1).to({scaleX:0.5398,x:-671.6,y:-37.1,startPosition:8},0).wait(1).to({scaleX:0.537,x:-686.25,y:-34.05,startPosition:9},0).wait(1).to({scaleX:0.5486,skewY:180,x:-674.65,y:-38.25,startPosition:10},0).wait(1).to({x:-663.05,y:-48.2,startPosition:11},0).wait(1).to({x:-651.45,y:-57.6,startPosition:12},0).wait(1).to({x:-639.85,y:-66.35,startPosition:13},0).wait(1).to({x:-628.25,y:-74.45,startPosition:14},0).wait(1).to({x:-616.7,y:-82,startPosition:15},0).wait(1).to({x:-605.1,y:-88.9,startPosition:0},0).wait(1).to({x:-593.5,y:-95.2,startPosition:1},0).wait(1).to({x:-581.95,y:-100.9,startPosition:2},0).wait(1).to({x:-570.35,y:-105.95,startPosition:3},0).wait(1).to({x:-558.8,y:-110.4,startPosition:4},0).wait(1).to({x:-547.2,y:-114.25,startPosition:5},0).wait(1).to({x:-535.6,y:-117.45,startPosition:6},0).wait(1).to({x:-524.05,y:-120.1,startPosition:7},0).wait(1).to({x:-512.45,y:-122.1,startPosition:8},0).wait(1).to({x:-500.85,y:-123.5,startPosition:9},0).wait(1).to({x:-489.25,y:-124.3,startPosition:10},0).wait(1).to({x:-477.7,y:-124.45,startPosition:11},0).wait(1).to({x:-466.1,y:-124,startPosition:12},0).wait(1).to({x:-454.5,y:-122.95,startPosition:13},0).wait(1).to({x:-442.9,y:-121.3,startPosition:14},0).wait(1).to({scaleX:0.5947,skewY:0,x:-453.7,y:-124.65,startPosition:15},0).wait(1).to({scaleX:0.595,x:-462.85,y:-135.25,startPosition:0},0).wait(1).to({scaleX:0.5953,x:-472.15,y:-145.05,startPosition:1},0).wait(1).to({scaleX:0.5956,x:-481.6,y:-154.05,startPosition:2},0).wait(1).to({scaleX:0.5959,x:-491.3,y:-162.2,startPosition:3},0).wait(1).to({scaleX:0.5961,x:-501.2,y:-169.6,startPosition:4},0).wait(1).to({scaleX:0.5964,x:-511.3,y:-176.15,startPosition:5},0).wait(1).to({scaleX:0.5967,x:-521.6,y:-181.95,startPosition:6},0).wait(1).to({scaleX:0.597,x:-532.05,y:-186.9,startPosition:7},0).wait(1).to({scaleX:0.5972,x:-542.8,y:-191.05,startPosition:8},0).wait(1).to({scaleX:0.5975,x:-553.65,y:-194.4,startPosition:9},0).wait(1).to({scaleX:0.5978,x:-564.75,y:-197,startPosition:10},0).wait(1).to({scaleX:0.5981,x:-576.05,y:-198.75,startPosition:11},0).wait(1).to({scaleX:0.5984,x:-587.55,y:-199.7,startPosition:12},0).wait(1).to({scaleX:0.5986,x:-599.25,y:-199.85,startPosition:13},0).wait(1).to({scaleX:0.5989,x:-611.2,y:-199.15,startPosition:14},0).wait(1).to({scaleX:0.5992,x:-623.25,y:-197.7,startPosition:15},0).wait(1).to({scaleX:0.5995,x:-635.6,y:-195.45,startPosition:0},0).wait(1).to({scaleX:0.5997,x:-648.1,y:-192.35,startPosition:1},0).wait(1).to({scaleX:0.6,x:-660.85,y:-188.5,startPosition:2},0).wait(1).to({scaleX:0.5486,skewY:180,x:-649.8,y:-196.25,startPosition:3},0).wait(1).to({x:-644.3,y:-208.95,startPosition:4},0).wait(1).to({x:-638.35,y:-221.3,startPosition:5},0).wait(1).to({x:-632,y:-233.3,startPosition:6},0).wait(1).to({x:-625.3,y:-244.9,startPosition:7},0).wait(1).to({x:-618.15,y:-256.15,startPosition:8},0).wait(1).to({x:-610.6,y:-267.05,startPosition:9},0).wait(1).to({x:-602.6,y:-277.55,startPosition:10},0).wait(1).to({x:-594.25,y:-287.7,startPosition:11},0).wait(1).to({x:-585.45,y:-297.5,startPosition:12},0).wait(1).to({x:-576.3,y:-306.9,startPosition:13},0).wait(1).to({x:-566.7,y:-315.95,startPosition:14},0).wait(1).to({x:-556.7,y:-324.6,startPosition:15},0).wait(1).to({x:-546.3,y:-332.95,startPosition:0},0).wait(1).to({x:-535.5,y:-340.85,startPosition:1},0).wait(1).to({x:-524.25,y:-348.45,startPosition:2},0).wait(1).to({x:-512.65,y:-355.65,startPosition:3},0).wait(1).to({x:-500.6,y:-362.5,startPosition:4},0).wait(1).to({x:-488.15,y:-369,startPosition:5},0).wait(1).to({x:-475.3,y:-375.1,startPosition:6},0).wait(1).to({x:-462.05,y:-380.85,startPosition:7},0).wait(1).to({x:-448.35,y:-386.25,startPosition:8},0).wait(1).to({x:-434.3,y:-391.3,startPosition:9},0).wait(1).to({x:-419.8,y:-395.95,startPosition:10},0).wait(1).to({x:-404.9,y:-400.25,startPosition:11},0).wait(1).to({x:-389.55,y:-404.15,startPosition:12},0).wait(1).to({x:-373.85,y:-407.7,startPosition:13},0).wait(1).to({x:-357.7,y:-410.9,startPosition:14},0).wait(1).to({x:-341.15,y:-413.75,startPosition:15},0).to({_off:true},1).wait(41));

	// sheep_12
	this.instance_3 = new lib.sheep12("synched",0);
	this.instance_3.setTransform(7.6,-57.6,1,1,0,0,0,69.5,56.1);
	this.instance_3.alpha = 0;
	this.instance_3._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(77).to({_off:false},0).wait(1).to({regY:56,scaleX:0.9855,scaleY:0.9855,x:-19.1,y:-68.75,alpha:0.2,startPosition:1},0).wait(1).to({scaleX:0.971,scaleY:0.971,x:-45.6,y:-77.95,alpha:0.4,startPosition:2},0).wait(1).to({scaleX:0.9566,scaleY:0.9566,x:-71.8,y:-85.35,alpha:0.6,startPosition:3},0).wait(1).to({scaleX:0.9421,scaleY:0.9421,x:-97.75,y:-90.85,alpha:0.8,startPosition:4},0).wait(1).to({scaleX:0.9276,scaleY:0.9276,x:-123.4,y:-94.5,alpha:1,startPosition:5},0).wait(1).to({scaleX:0.9131,scaleY:0.9131,x:-148.75,y:-96.25,startPosition:6},0).wait(1).to({scaleX:0.8986,scaleY:0.8986,x:-173.85,startPosition:7},0).wait(1).to({scaleX:0.8842,scaleY:0.8842,x:-198.7,y:-94.35,startPosition:8},0).wait(1).to({scaleX:0.8697,scaleY:0.8697,x:-223.3,y:-90.6,startPosition:9},0).wait(1).to({scaleX:0.8552,scaleY:0.8552,x:-247.6,y:-85,startPosition:10},0).wait(1).to({scaleX:0.8407,scaleY:0.8407,x:-271.7,y:-77.55,startPosition:11},0).wait(1).to({scaleX:0.8262,scaleY:0.8262,x:-295.55,y:-68.3,startPosition:12},0).wait(1).to({scaleX:0.8118,scaleY:0.8118,x:-319.05,y:-57.1,startPosition:13},0).wait(1).to({scaleX:0.7973,scaleY:0.7973,x:-342.35,y:-44.1,startPosition:14},0).wait(1).to({scaleX:0.7828,scaleY:0.7828,x:-365.4,y:-29.25,startPosition:15},0).wait(1).to({scaleX:0.7683,scaleY:0.7683,x:-388.15,y:-12.5,startPosition:0},0).wait(1).to({scaleX:0.7538,scaleY:0.7538,x:-414.9,y:-20,startPosition:1},0).wait(1).to({scaleX:0.7394,scaleY:0.7394,x:-441.3,y:-25.75,startPosition:2},0).wait(1).to({scaleX:0.7249,scaleY:0.7249,x:-467.4,y:-29.75,startPosition:3},0).wait(1).to({scaleX:0.7104,scaleY:0.7104,x:-493.15,y:-32.05,startPosition:4},0).wait(1).to({scaleX:0.6959,scaleY:0.6959,x:-518.55,y:-32.7,startPosition:5},0).wait(1).to({scaleX:0.6814,scaleY:0.6814,x:-543.6,y:-31.6,startPosition:6},0).wait(1).to({scaleX:0.667,scaleY:0.667,x:-568.3,y:-28.8,startPosition:7},0).wait(1).to({scaleX:0.6525,scaleY:0.6525,x:-592.7,y:-24.25,startPosition:8},0).wait(1).to({scaleX:0.638,scaleY:0.638,x:-616.75,y:-18,startPosition:9},0).wait(1).to({scaleX:0.6235,scaleY:0.6235,x:-640.5,y:-10.1,startPosition:10},0).wait(1).to({scaleX:0.609,scaleY:0.609,x:-663.9,y:-0.4,startPosition:11},0).wait(1).to({scaleX:0.5946,scaleY:0.5946,x:-687.05,y:11,startPosition:12},0).wait(1).to({scaleX:0.5801,scaleY:0.5801,x:-709.85,y:24.1,startPosition:13},0).wait(1).to({scaleX:0.5486,skewY:180,startPosition:14},0).wait(1).to({x:-693.7,y:17.3,startPosition:15},0).wait(1).to({x:-677.55,y:11.4,startPosition:0},0).wait(1).to({x:-661.3,y:6.4,startPosition:1},0).wait(1).to({x:-644.95,y:2.3,startPosition:2},0).wait(1).to({x:-628.6,y:-0.9,startPosition:3},0).wait(1).to({x:-612.15,y:-3.2,startPosition:4},0).wait(1).to({x:-595.65,y:-4.55,startPosition:5},0).wait(1).to({x:-579.05,y:-5.05,startPosition:6},0).wait(1).to({x:-562.4,y:-4.6,startPosition:7},0).wait(1).to({x:-545.65,y:-3.25,startPosition:8},0).wait(1).to({x:-528.9,y:-1.05,startPosition:9},0).wait(1).to({x:-512,y:2.1,startPosition:10},0).wait(1).to({x:-495.1,y:6.15,startPosition:11},0).wait(1).to({x:-478.1,y:11.1,startPosition:12},0).wait(1).to({x:-461,y:17,startPosition:13},0).wait(1).to({x:-443.85,y:23.75,startPosition:14},0).wait(1).to({x:-426.65,y:31.45,startPosition:15},0).wait(1).to({x:-409.35,y:39.95,startPosition:0},0).wait(1).to({x:-392,y:49.45,startPosition:1},0).wait(1).to({scaleX:0.5998,skewY:0,x:-404.2,y:45.95,startPosition:2},0).wait(1).to({scaleX:0.5971,x:-414.1,y:35.95,startPosition:3},0).wait(1).to({scaleX:0.5943,x:-424.25,y:26.6,startPosition:4},0).wait(1).to({scaleX:0.5916,x:-434.55,y:17.75,startPosition:5},0).wait(1).to({scaleX:0.5889,x:-445.05,y:9.55,startPosition:6},0).wait(1).to({scaleX:0.5861,x:-455.8,y:1.9,startPosition:7},0).wait(1).to({scaleX:0.5834,x:-466.8,y:-5.1,startPosition:8},0).wait(1).to({scaleX:0.5807,x:-478,y:-11.55,startPosition:9},0).wait(1).to({scaleX:0.578,x:-489.4,y:-17.4,startPosition:10},0).wait(1).to({scaleX:0.5752,x:-500.95,y:-22.65,startPosition:11},0).wait(1).to({scaleX:0.5725,x:-512.8,y:-27.35,startPosition:12},0).wait(1).to({scaleX:0.5698,x:-524.85,y:-31.4,startPosition:13},0).wait(1).to({scaleX:0.567,x:-537.1,y:-34.9,startPosition:14},0).wait(1).to({scaleX:0.5643,x:-549.6,y:-37.75,startPosition:15},0).wait(1).to({scaleX:0.5616,x:-562.2,y:-40.05,startPosition:0},0).wait(1).to({scaleX:0.5589,x:-575.15,y:-41.75,startPosition:1},0).wait(1).to({scaleX:0.5561,x:-588.25,y:-42.9,startPosition:2},0).wait(1).to({scaleX:0.5534,x:-601.6,y:-43.4,startPosition:3},0).wait(1).to({scaleX:0.5507,x:-615.2,y:-43.3,startPosition:4},0).wait(1).to({scaleX:0.5479,x:-628.9,y:-42.65,startPosition:5},0).wait(1).to({scaleX:0.5452,x:-642.9,y:-41.4,startPosition:6},0).wait(1).to({scaleX:0.5425,x:-657.15,y:-39.55,startPosition:7},0).wait(1).to({scaleX:0.5398,x:-671.6,y:-37.1,startPosition:8},0).wait(1).to({scaleX:0.537,x:-686.25,y:-34.05,startPosition:9},0).wait(1).to({scaleX:0.5486,skewY:180,x:-674.65,y:-38.25,startPosition:10},0).wait(1).to({x:-663.05,y:-48.2,startPosition:11},0).wait(1).to({x:-651.45,y:-57.6,startPosition:12},0).wait(1).to({x:-639.85,y:-66.35,startPosition:13},0).wait(1).to({x:-628.25,y:-74.45,startPosition:14},0).wait(1).to({x:-616.7,y:-82,startPosition:15},0).wait(1).to({x:-605.1,y:-88.9,startPosition:0},0).wait(1).to({x:-593.5,y:-95.2,startPosition:1},0).wait(1).to({x:-581.95,y:-100.9,startPosition:2},0).wait(1).to({x:-570.35,y:-105.95,startPosition:3},0).wait(1).to({x:-558.8,y:-110.4,startPosition:4},0).wait(1).to({x:-547.2,y:-114.25,startPosition:5},0).wait(1).to({x:-535.6,y:-117.45,startPosition:6},0).wait(1).to({x:-524.05,y:-120.1,startPosition:7},0).wait(1).to({x:-512.45,y:-122.1,startPosition:8},0).wait(1).to({x:-500.85,y:-123.5,startPosition:9},0).wait(1).to({x:-489.25,y:-124.3,startPosition:10},0).wait(1).to({x:-477.7,y:-124.45,startPosition:11},0).wait(1).to({x:-466.1,y:-124,startPosition:12},0).wait(1).to({x:-454.5,y:-122.95,startPosition:13},0).wait(1).to({x:-442.9,y:-121.3,startPosition:14},0).wait(1).to({scaleX:0.5947,skewY:0,x:-453.7,y:-124.65,startPosition:15},0).wait(1).to({scaleX:0.595,x:-462.85,y:-135.25,startPosition:0},0).wait(1).to({scaleX:0.5953,x:-472.15,y:-145.05,startPosition:1},0).wait(1).to({scaleX:0.5956,x:-481.6,y:-154.05,startPosition:2},0).wait(1).to({scaleX:0.5959,x:-491.3,y:-162.2,startPosition:3},0).wait(1).to({scaleX:0.5961,x:-501.2,y:-169.6,startPosition:4},0).wait(1).to({scaleX:0.5964,x:-511.3,y:-176.15,startPosition:5},0).wait(1).to({scaleX:0.5967,x:-521.6,y:-181.95,startPosition:6},0).wait(1).to({scaleX:0.597,x:-532.05,y:-186.9,startPosition:7},0).wait(1).to({scaleX:0.5972,x:-542.8,y:-191.05,startPosition:8},0).wait(1).to({scaleX:0.5975,x:-553.65,y:-194.4,startPosition:9},0).wait(1).to({scaleX:0.5978,x:-564.75,y:-197,startPosition:10},0).wait(1).to({scaleX:0.5981,x:-576.05,y:-198.75,startPosition:11},0).wait(1).to({scaleX:0.5984,x:-587.55,y:-199.7,startPosition:12},0).wait(1).to({scaleX:0.5986,x:-599.25,y:-199.85,startPosition:13},0).wait(1).to({scaleX:0.5989,x:-611.2,y:-199.15,startPosition:14},0).wait(1).to({scaleX:0.5992,x:-623.25,y:-197.7,startPosition:15},0).wait(1).to({scaleX:0.5995,x:-635.6,y:-195.45,startPosition:0},0).wait(1).to({scaleX:0.5997,x:-648.1,y:-192.35,startPosition:1},0).wait(1).to({scaleX:0.6,x:-660.85,y:-188.5,startPosition:2},0).wait(1).to({scaleX:0.5486,skewY:180,x:-649.8,y:-196.25,startPosition:3},0).wait(1).to({x:-644.3,y:-208.95,startPosition:4},0).wait(1).to({x:-638.35,y:-221.3,startPosition:5},0).wait(1).to({x:-632,y:-233.3,startPosition:6},0).wait(1).to({x:-625.3,y:-244.9,startPosition:7},0).wait(1).to({x:-618.15,y:-256.15,startPosition:8},0).wait(1).to({x:-610.6,y:-267.05,startPosition:9},0).wait(1).to({x:-602.6,y:-277.55,startPosition:10},0).wait(1).to({x:-594.25,y:-287.7,startPosition:11},0).wait(1).to({x:-585.45,y:-297.5,startPosition:12},0).wait(1).to({x:-576.3,y:-306.9,startPosition:13},0).wait(1).to({x:-566.7,y:-315.95,startPosition:14},0).wait(1).to({x:-556.7,y:-324.6,startPosition:15},0).wait(1).to({x:-546.3,y:-332.95,startPosition:0},0).wait(1).to({x:-535.5,y:-340.85,startPosition:1},0).wait(1).to({x:-524.25,y:-348.45,startPosition:2},0).wait(1).to({x:-512.65,y:-355.65,startPosition:3},0).wait(1).to({x:-500.6,y:-362.5,startPosition:4},0).wait(1).to({x:-488.15,y:-369,startPosition:5},0).wait(1).to({x:-475.3,y:-375.1,startPosition:6},0).wait(1).to({x:-462.05,y:-380.85,startPosition:7},0).wait(1).to({x:-448.35,y:-386.25,startPosition:8},0).wait(1).to({x:-434.3,y:-391.3,startPosition:9},0).wait(1).to({x:-419.8,y:-395.95,startPosition:10},0).wait(1).to({x:-404.9,y:-400.25,startPosition:11},0).wait(1).to({x:-389.55,y:-404.15,startPosition:12},0).wait(1).to({x:-373.85,y:-407.7,startPosition:13},0).wait(1).to({x:-357.7,y:-410.9,startPosition:14},0).wait(1).to({x:-341.15,y:-413.75,startPosition:15},0).to({_off:true},1).wait(52));

	// sheep_11
	this.instance_4 = new lib.sheep11("synched",0);
	this.instance_4.setTransform(7.6,-57.6,1,1,0,0,0,69.5,56.1);
	this.instance_4.alpha = 0;
	this.instance_4._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(66).to({_off:false},0).wait(1).to({regY:56,scaleX:0.9855,scaleY:0.9855,x:-19.1,y:-68.75,alpha:0.2,startPosition:1},0).wait(1).to({scaleX:0.971,scaleY:0.971,x:-45.6,y:-77.95,alpha:0.4,startPosition:2},0).wait(1).to({scaleX:0.9566,scaleY:0.9566,x:-71.8,y:-85.35,alpha:0.6,startPosition:3},0).wait(1).to({scaleX:0.9421,scaleY:0.9421,x:-97.75,y:-90.85,alpha:0.8,startPosition:4},0).wait(1).to({scaleX:0.9276,scaleY:0.9276,x:-123.4,y:-94.5,alpha:1,startPosition:5},0).wait(1).to({scaleX:0.9131,scaleY:0.9131,x:-148.75,y:-96.25,startPosition:6},0).wait(1).to({scaleX:0.8986,scaleY:0.8986,x:-173.85,startPosition:7},0).wait(1).to({scaleX:0.8842,scaleY:0.8842,x:-198.7,y:-94.35,startPosition:8},0).wait(1).to({scaleX:0.8697,scaleY:0.8697,x:-223.3,y:-90.6,startPosition:9},0).wait(1).to({scaleX:0.8552,scaleY:0.8552,x:-247.6,y:-85,startPosition:10},0).wait(1).to({scaleX:0.8407,scaleY:0.8407,x:-271.7,y:-77.55,startPosition:11},0).wait(1).to({scaleX:0.8262,scaleY:0.8262,x:-295.55,y:-68.3,startPosition:12},0).wait(1).to({scaleX:0.8118,scaleY:0.8118,x:-319.05,y:-57.1,startPosition:13},0).wait(1).to({scaleX:0.7973,scaleY:0.7973,x:-342.35,y:-44.1,startPosition:14},0).wait(1).to({scaleX:0.7828,scaleY:0.7828,x:-365.4,y:-29.25,startPosition:15},0).wait(1).to({scaleX:0.7683,scaleY:0.7683,x:-388.15,y:-12.5,startPosition:0},0).wait(1).to({scaleX:0.7538,scaleY:0.7538,x:-414.9,y:-20,startPosition:1},0).wait(1).to({scaleX:0.7394,scaleY:0.7394,x:-441.3,y:-25.75,startPosition:2},0).wait(1).to({scaleX:0.7249,scaleY:0.7249,x:-467.4,y:-29.75,startPosition:3},0).wait(1).to({scaleX:0.7104,scaleY:0.7104,x:-493.15,y:-32.05,startPosition:4},0).wait(1).to({scaleX:0.6959,scaleY:0.6959,x:-518.55,y:-32.7,startPosition:5},0).wait(1).to({scaleX:0.6814,scaleY:0.6814,x:-543.6,y:-31.6,startPosition:6},0).wait(1).to({scaleX:0.667,scaleY:0.667,x:-568.3,y:-28.8,startPosition:7},0).wait(1).to({scaleX:0.6525,scaleY:0.6525,x:-592.7,y:-24.25,startPosition:8},0).wait(1).to({scaleX:0.638,scaleY:0.638,x:-616.75,y:-18,startPosition:9},0).wait(1).to({scaleX:0.6235,scaleY:0.6235,x:-640.5,y:-10.1,startPosition:10},0).wait(1).to({scaleX:0.609,scaleY:0.609,x:-663.9,y:-0.4,startPosition:11},0).wait(1).to({scaleX:0.5946,scaleY:0.5946,x:-687.05,y:11,startPosition:12},0).wait(1).to({scaleX:0.5801,scaleY:0.5801,x:-709.85,y:24.1,startPosition:13},0).wait(1).to({scaleX:0.5486,skewY:180,startPosition:14},0).wait(1).to({x:-693.7,y:17.3,startPosition:15},0).wait(1).to({x:-677.55,y:11.4,startPosition:0},0).wait(1).to({x:-661.3,y:6.4,startPosition:1},0).wait(1).to({x:-644.95,y:2.3,startPosition:2},0).wait(1).to({x:-628.6,y:-0.9,startPosition:3},0).wait(1).to({x:-612.15,y:-3.2,startPosition:4},0).wait(1).to({x:-595.65,y:-4.55,startPosition:5},0).wait(1).to({x:-579.05,y:-5.05,startPosition:6},0).wait(1).to({x:-562.4,y:-4.6,startPosition:7},0).wait(1).to({x:-545.65,y:-3.25,startPosition:8},0).wait(1).to({x:-528.9,y:-1.05,startPosition:9},0).wait(1).to({x:-512,y:2.1,startPosition:10},0).wait(1).to({x:-495.1,y:6.15,startPosition:11},0).wait(1).to({x:-478.1,y:11.1,startPosition:12},0).wait(1).to({x:-461,y:17,startPosition:13},0).wait(1).to({x:-443.85,y:23.75,startPosition:14},0).wait(1).to({x:-426.65,y:31.45,startPosition:15},0).wait(1).to({x:-409.35,y:39.95,startPosition:0},0).wait(1).to({x:-392,y:49.45,startPosition:1},0).wait(1).to({scaleX:0.5998,skewY:0,x:-404.2,y:45.95,startPosition:2},0).wait(1).to({scaleX:0.5971,x:-414.1,y:35.95,startPosition:3},0).wait(1).to({scaleX:0.5943,x:-424.25,y:26.6,startPosition:4},0).wait(1).to({scaleX:0.5916,x:-434.55,y:17.75,startPosition:5},0).wait(1).to({scaleX:0.5889,x:-445.05,y:9.55,startPosition:6},0).wait(1).to({scaleX:0.5861,x:-455.8,y:1.9,startPosition:7},0).wait(1).to({scaleX:0.5834,x:-466.8,y:-5.1,startPosition:8},0).wait(1).to({scaleX:0.5807,x:-478,y:-11.55,startPosition:9},0).wait(1).to({scaleX:0.578,x:-489.4,y:-17.4,startPosition:10},0).wait(1).to({scaleX:0.5752,x:-500.95,y:-22.65,startPosition:11},0).wait(1).to({scaleX:0.5725,x:-512.8,y:-27.35,startPosition:12},0).wait(1).to({scaleX:0.5698,x:-524.85,y:-31.4,startPosition:13},0).wait(1).to({scaleX:0.567,x:-537.1,y:-34.9,startPosition:14},0).wait(1).to({scaleX:0.5643,x:-549.6,y:-37.75,startPosition:15},0).wait(1).to({scaleX:0.5616,x:-562.2,y:-40.05,startPosition:0},0).wait(1).to({scaleX:0.5589,x:-575.15,y:-41.75,startPosition:1},0).wait(1).to({scaleX:0.5561,x:-588.25,y:-42.9,startPosition:2},0).wait(1).to({scaleX:0.5534,x:-601.6,y:-43.4,startPosition:3},0).wait(1).to({scaleX:0.5507,x:-615.2,y:-43.3,startPosition:4},0).wait(1).to({scaleX:0.5479,x:-628.9,y:-42.65,startPosition:5},0).wait(1).to({scaleX:0.5452,x:-642.9,y:-41.4,startPosition:6},0).wait(1).to({scaleX:0.5425,x:-657.15,y:-39.55,startPosition:7},0).wait(1).to({scaleX:0.5398,x:-671.6,y:-37.1,startPosition:8},0).wait(1).to({scaleX:0.537,x:-686.25,y:-34.05,startPosition:9},0).wait(1).to({scaleX:0.5486,skewY:180,x:-674.65,y:-38.25,startPosition:10},0).wait(1).to({x:-663.05,y:-48.2,startPosition:11},0).wait(1).to({x:-651.45,y:-57.6,startPosition:12},0).wait(1).to({x:-639.85,y:-66.35,startPosition:13},0).wait(1).to({x:-628.25,y:-74.45,startPosition:14},0).wait(1).to({x:-616.7,y:-82,startPosition:15},0).wait(1).to({x:-605.1,y:-88.9,startPosition:0},0).wait(1).to({x:-593.5,y:-95.2,startPosition:1},0).wait(1).to({x:-581.95,y:-100.9,startPosition:2},0).wait(1).to({x:-570.35,y:-105.95,startPosition:3},0).wait(1).to({x:-558.8,y:-110.4,startPosition:4},0).wait(1).to({x:-547.2,y:-114.25,startPosition:5},0).wait(1).to({x:-535.6,y:-117.45,startPosition:6},0).wait(1).to({x:-524.05,y:-120.1,startPosition:7},0).wait(1).to({x:-512.45,y:-122.1,startPosition:8},0).wait(1).to({x:-500.85,y:-123.5,startPosition:9},0).wait(1).to({x:-489.25,y:-124.3,startPosition:10},0).wait(1).to({x:-477.7,y:-124.45,startPosition:11},0).wait(1).to({x:-466.1,y:-124,startPosition:12},0).wait(1).to({x:-454.5,y:-122.95,startPosition:13},0).wait(1).to({x:-442.9,y:-121.3,startPosition:14},0).wait(1).to({scaleX:0.5947,skewY:0,x:-453.7,y:-124.65,startPosition:15},0).wait(1).to({scaleX:0.595,x:-462.85,y:-135.25,startPosition:0},0).wait(1).to({scaleX:0.5953,x:-472.15,y:-145.05,startPosition:1},0).wait(1).to({scaleX:0.5956,x:-481.6,y:-154.05,startPosition:2},0).wait(1).to({scaleX:0.5959,x:-491.3,y:-162.2,startPosition:3},0).wait(1).to({scaleX:0.5961,x:-501.2,y:-169.6,startPosition:4},0).wait(1).to({scaleX:0.5964,x:-511.3,y:-176.15,startPosition:5},0).wait(1).to({scaleX:0.5967,x:-521.6,y:-181.95,startPosition:6},0).wait(1).to({scaleX:0.597,x:-532.05,y:-186.9,startPosition:7},0).wait(1).to({scaleX:0.5972,x:-542.8,y:-191.05,startPosition:8},0).wait(1).to({scaleX:0.5975,x:-553.65,y:-194.4,startPosition:9},0).wait(1).to({scaleX:0.5978,x:-564.75,y:-197,startPosition:10},0).wait(1).to({scaleX:0.5981,x:-576.05,y:-198.75,startPosition:11},0).wait(1).to({scaleX:0.5984,x:-587.55,y:-199.7,startPosition:12},0).wait(1).to({scaleX:0.5986,x:-599.25,y:-199.85,startPosition:13},0).wait(1).to({scaleX:0.5989,x:-611.2,y:-199.15,startPosition:14},0).wait(1).to({scaleX:0.5992,x:-623.25,y:-197.7,startPosition:15},0).wait(1).to({scaleX:0.5995,x:-635.6,y:-195.45,startPosition:0},0).wait(1).to({scaleX:0.5997,x:-648.1,y:-192.35,startPosition:1},0).wait(1).to({scaleX:0.6,x:-660.85,y:-188.5,startPosition:2},0).wait(1).to({scaleX:0.5486,skewY:180,x:-649.8,y:-196.25,startPosition:3},0).wait(1).to({x:-644.3,y:-208.95,startPosition:4},0).wait(1).to({x:-638.35,y:-221.3,startPosition:5},0).wait(1).to({x:-632,y:-233.3,startPosition:6},0).wait(1).to({x:-625.3,y:-244.9,startPosition:7},0).wait(1).to({x:-618.15,y:-256.15,startPosition:8},0).wait(1).to({x:-610.6,y:-267.05,startPosition:9},0).wait(1).to({x:-602.6,y:-277.55,startPosition:10},0).wait(1).to({x:-594.25,y:-287.7,startPosition:11},0).wait(1).to({x:-585.45,y:-297.5,startPosition:12},0).wait(1).to({x:-576.3,y:-306.9,startPosition:13},0).wait(1).to({x:-566.7,y:-315.95,startPosition:14},0).wait(1).to({x:-556.7,y:-324.6,startPosition:15},0).wait(1).to({x:-546.3,y:-332.95,startPosition:0},0).wait(1).to({x:-535.5,y:-340.85,startPosition:1},0).wait(1).to({x:-524.25,y:-348.45,startPosition:2},0).wait(1).to({x:-512.65,y:-355.65,startPosition:3},0).wait(1).to({x:-500.6,y:-362.5,startPosition:4},0).wait(1).to({x:-488.15,y:-369,startPosition:5},0).wait(1).to({x:-475.3,y:-375.1,startPosition:6},0).wait(1).to({x:-462.05,y:-380.85,startPosition:7},0).wait(1).to({x:-448.35,y:-386.25,startPosition:8},0).wait(1).to({x:-434.3,y:-391.3,startPosition:9},0).wait(1).to({x:-419.8,y:-395.95,startPosition:10},0).wait(1).to({x:-404.9,y:-400.25,startPosition:11},0).wait(1).to({x:-389.55,y:-404.15,startPosition:12},0).wait(1).to({x:-373.85,y:-407.7,startPosition:13},0).wait(1).to({x:-357.7,y:-410.9,startPosition:14},0).wait(1).to({x:-341.15,y:-413.75,startPosition:15},0).to({_off:true},1).wait(63));

	// sheep_10
	this.instance_5 = new lib.sheep10("synched",0);
	this.instance_5.setTransform(7.6,-57.6,1,1,0,0,0,69.5,56.1);
	this.instance_5.alpha = 0;
	this.instance_5._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(55).to({_off:false},0).wait(1).to({regY:56,scaleX:0.9855,scaleY:0.9855,x:-19.1,y:-68.75,alpha:0.2,startPosition:1},0).wait(1).to({scaleX:0.971,scaleY:0.971,x:-45.6,y:-77.95,alpha:0.4,startPosition:2},0).wait(1).to({scaleX:0.9566,scaleY:0.9566,x:-71.8,y:-85.35,alpha:0.6,startPosition:3},0).wait(1).to({scaleX:0.9421,scaleY:0.9421,x:-97.75,y:-90.85,alpha:0.8,startPosition:4},0).wait(1).to({scaleX:0.9276,scaleY:0.9276,x:-123.4,y:-94.5,alpha:1,startPosition:5},0).wait(1).to({scaleX:0.9131,scaleY:0.9131,x:-148.75,y:-96.25,startPosition:6},0).wait(1).to({scaleX:0.8986,scaleY:0.8986,x:-173.85,startPosition:7},0).wait(1).to({scaleX:0.8842,scaleY:0.8842,x:-198.7,y:-94.35,startPosition:8},0).wait(1).to({scaleX:0.8697,scaleY:0.8697,x:-223.3,y:-90.6,startPosition:9},0).wait(1).to({scaleX:0.8552,scaleY:0.8552,x:-247.6,y:-85,startPosition:10},0).wait(1).to({scaleX:0.8407,scaleY:0.8407,x:-271.7,y:-77.55,startPosition:11},0).wait(1).to({scaleX:0.8262,scaleY:0.8262,x:-295.55,y:-68.3,startPosition:12},0).wait(1).to({scaleX:0.8118,scaleY:0.8118,x:-319.05,y:-57.1,startPosition:13},0).wait(1).to({scaleX:0.7973,scaleY:0.7973,x:-342.35,y:-44.1,startPosition:14},0).wait(1).to({scaleX:0.7828,scaleY:0.7828,x:-365.4,y:-29.25,startPosition:15},0).wait(1).to({scaleX:0.7683,scaleY:0.7683,x:-388.15,y:-12.5,startPosition:0},0).wait(1).to({scaleX:0.7538,scaleY:0.7538,x:-414.9,y:-20,startPosition:1},0).wait(1).to({scaleX:0.7394,scaleY:0.7394,x:-441.3,y:-25.75,startPosition:2},0).wait(1).to({scaleX:0.7249,scaleY:0.7249,x:-467.4,y:-29.75,startPosition:3},0).wait(1).to({scaleX:0.7104,scaleY:0.7104,x:-493.15,y:-32.05,startPosition:4},0).wait(1).to({scaleX:0.6959,scaleY:0.6959,x:-518.55,y:-32.7,startPosition:5},0).wait(1).to({scaleX:0.6814,scaleY:0.6814,x:-543.6,y:-31.6,startPosition:6},0).wait(1).to({scaleX:0.667,scaleY:0.667,x:-568.3,y:-28.8,startPosition:7},0).wait(1).to({scaleX:0.6525,scaleY:0.6525,x:-592.7,y:-24.25,startPosition:8},0).wait(1).to({scaleX:0.638,scaleY:0.638,x:-616.75,y:-18,startPosition:9},0).wait(1).to({scaleX:0.6235,scaleY:0.6235,x:-640.5,y:-10.1,startPosition:10},0).wait(1).to({scaleX:0.609,scaleY:0.609,x:-663.9,y:-0.4,startPosition:11},0).wait(1).to({scaleX:0.5946,scaleY:0.5946,x:-687.05,y:11,startPosition:12},0).wait(1).to({scaleX:0.5801,scaleY:0.5801,x:-709.85,y:24.1,startPosition:13},0).wait(1).to({scaleX:0.5486,skewY:180,startPosition:14},0).wait(1).to({x:-693.7,y:17.3,startPosition:15},0).wait(1).to({x:-677.55,y:11.4,startPosition:0},0).wait(1).to({x:-661.3,y:6.4,startPosition:1},0).wait(1).to({x:-644.95,y:2.3,startPosition:2},0).wait(1).to({x:-628.6,y:-0.9,startPosition:3},0).wait(1).to({x:-612.15,y:-3.2,startPosition:4},0).wait(1).to({x:-595.65,y:-4.55,startPosition:5},0).wait(1).to({x:-579.05,y:-5.05,startPosition:6},0).wait(1).to({x:-562.4,y:-4.6,startPosition:7},0).wait(1).to({x:-545.65,y:-3.25,startPosition:8},0).wait(1).to({x:-528.9,y:-1.05,startPosition:9},0).wait(1).to({x:-512,y:2.1,startPosition:10},0).wait(1).to({x:-495.1,y:6.15,startPosition:11},0).wait(1).to({x:-478.1,y:11.1,startPosition:12},0).wait(1).to({x:-461,y:17,startPosition:13},0).wait(1).to({x:-443.85,y:23.75,startPosition:14},0).wait(1).to({x:-426.65,y:31.45,startPosition:15},0).wait(1).to({x:-409.35,y:39.95,startPosition:0},0).wait(1).to({x:-392,y:49.45,startPosition:1},0).wait(1).to({scaleX:0.5998,skewY:0,x:-404.2,y:45.95,startPosition:2},0).wait(1).to({scaleX:0.5971,x:-414.1,y:35.95,startPosition:3},0).wait(1).to({scaleX:0.5943,x:-424.25,y:26.6,startPosition:4},0).wait(1).to({scaleX:0.5916,x:-434.55,y:17.75,startPosition:5},0).wait(1).to({scaleX:0.5889,x:-445.05,y:9.55,startPosition:6},0).wait(1).to({scaleX:0.5861,x:-455.8,y:1.9,startPosition:7},0).wait(1).to({scaleX:0.5834,x:-466.8,y:-5.1,startPosition:8},0).wait(1).to({scaleX:0.5807,x:-478,y:-11.55,startPosition:9},0).wait(1).to({scaleX:0.578,x:-489.4,y:-17.4,startPosition:10},0).wait(1).to({scaleX:0.5752,x:-500.95,y:-22.65,startPosition:11},0).wait(1).to({scaleX:0.5725,x:-512.8,y:-27.35,startPosition:12},0).wait(1).to({scaleX:0.5698,x:-524.85,y:-31.4,startPosition:13},0).wait(1).to({scaleX:0.567,x:-537.1,y:-34.9,startPosition:14},0).wait(1).to({scaleX:0.5643,x:-549.6,y:-37.75,startPosition:15},0).wait(1).to({scaleX:0.5616,x:-562.2,y:-40.05,startPosition:0},0).wait(1).to({scaleX:0.5589,x:-575.15,y:-41.75,startPosition:1},0).wait(1).to({scaleX:0.5561,x:-588.25,y:-42.9,startPosition:2},0).wait(1).to({scaleX:0.5534,x:-601.6,y:-43.4,startPosition:3},0).wait(1).to({scaleX:0.5507,x:-615.2,y:-43.3,startPosition:4},0).wait(1).to({scaleX:0.5479,x:-628.9,y:-42.65,startPosition:5},0).wait(1).to({scaleX:0.5452,x:-642.9,y:-41.4,startPosition:6},0).wait(1).to({scaleX:0.5425,x:-657.15,y:-39.55,startPosition:7},0).wait(1).to({scaleX:0.5398,x:-671.6,y:-37.1,startPosition:8},0).wait(1).to({scaleX:0.537,x:-686.25,y:-34.05,startPosition:9},0).wait(1).to({scaleX:0.5486,skewY:180,x:-674.65,y:-38.25,startPosition:10},0).wait(1).to({x:-663.05,y:-48.2,startPosition:11},0).wait(1).to({x:-651.45,y:-57.6,startPosition:12},0).wait(1).to({x:-639.85,y:-66.35,startPosition:13},0).wait(1).to({x:-628.25,y:-74.45,startPosition:14},0).wait(1).to({x:-616.7,y:-82,startPosition:15},0).wait(1).to({x:-605.1,y:-88.9,startPosition:0},0).wait(1).to({x:-593.5,y:-95.2,startPosition:1},0).wait(1).to({x:-581.95,y:-100.9,startPosition:2},0).wait(1).to({x:-570.35,y:-105.95,startPosition:3},0).wait(1).to({x:-558.8,y:-110.4,startPosition:4},0).wait(1).to({x:-547.2,y:-114.25,startPosition:5},0).wait(1).to({x:-535.6,y:-117.45,startPosition:6},0).wait(1).to({x:-524.05,y:-120.1,startPosition:7},0).wait(1).to({x:-512.45,y:-122.1,startPosition:8},0).wait(1).to({x:-500.85,y:-123.5,startPosition:9},0).wait(1).to({x:-489.25,y:-124.3,startPosition:10},0).wait(1).to({x:-477.7,y:-124.45,startPosition:11},0).wait(1).to({x:-466.1,y:-124,startPosition:12},0).wait(1).to({x:-454.5,y:-122.95,startPosition:13},0).wait(1).to({x:-442.9,y:-121.3,startPosition:14},0).wait(1).to({scaleX:0.5947,skewY:0,x:-453.7,y:-124.65,startPosition:15},0).wait(1).to({scaleX:0.595,x:-462.85,y:-135.25,startPosition:0},0).wait(1).to({scaleX:0.5953,x:-472.15,y:-145.05,startPosition:1},0).wait(1).to({scaleX:0.5956,x:-481.6,y:-154.05,startPosition:2},0).wait(1).to({scaleX:0.5959,x:-491.3,y:-162.2,startPosition:3},0).wait(1).to({scaleX:0.5961,x:-501.2,y:-169.6,startPosition:4},0).wait(1).to({scaleX:0.5964,x:-511.3,y:-176.15,startPosition:5},0).wait(1).to({scaleX:0.5967,x:-521.6,y:-181.95,startPosition:6},0).wait(1).to({scaleX:0.597,x:-532.05,y:-186.9,startPosition:7},0).wait(1).to({scaleX:0.5972,x:-542.8,y:-191.05,startPosition:8},0).wait(1).to({scaleX:0.5975,x:-553.65,y:-194.4,startPosition:9},0).wait(1).to({scaleX:0.5978,x:-564.75,y:-197,startPosition:10},0).wait(1).to({scaleX:0.5981,x:-576.05,y:-198.75,startPosition:11},0).wait(1).to({scaleX:0.5984,x:-587.55,y:-199.7,startPosition:12},0).wait(1).to({scaleX:0.5986,x:-599.25,y:-199.85,startPosition:13},0).wait(1).to({scaleX:0.5989,x:-611.2,y:-199.15,startPosition:14},0).wait(1).to({scaleX:0.5992,x:-623.25,y:-197.7,startPosition:15},0).wait(1).to({scaleX:0.5995,x:-635.6,y:-195.45,startPosition:0},0).wait(1).to({scaleX:0.5997,x:-648.1,y:-192.35,startPosition:1},0).wait(1).to({scaleX:0.6,x:-660.85,y:-188.5,startPosition:2},0).wait(1).to({scaleX:0.5486,skewY:180,x:-649.8,y:-196.25,startPosition:3},0).wait(1).to({x:-644.3,y:-208.95,startPosition:4},0).wait(1).to({x:-638.35,y:-221.3,startPosition:5},0).wait(1).to({x:-632,y:-233.3,startPosition:6},0).wait(1).to({x:-625.3,y:-244.9,startPosition:7},0).wait(1).to({x:-618.15,y:-256.15,startPosition:8},0).wait(1).to({x:-610.6,y:-267.05,startPosition:9},0).wait(1).to({x:-602.6,y:-277.55,startPosition:10},0).wait(1).to({x:-594.25,y:-287.7,startPosition:11},0).wait(1).to({x:-585.45,y:-297.5,startPosition:12},0).wait(1).to({x:-576.3,y:-306.9,startPosition:13},0).wait(1).to({x:-566.7,y:-315.95,startPosition:14},0).wait(1).to({x:-556.7,y:-324.6,startPosition:15},0).wait(1).to({x:-546.3,y:-332.95,startPosition:0},0).wait(1).to({x:-535.5,y:-340.85,startPosition:1},0).wait(1).to({x:-524.25,y:-348.45,startPosition:2},0).wait(1).to({x:-512.65,y:-355.65,startPosition:3},0).wait(1).to({x:-500.6,y:-362.5,startPosition:4},0).wait(1).to({x:-488.15,y:-369,startPosition:5},0).wait(1).to({x:-475.3,y:-375.1,startPosition:6},0).wait(1).to({x:-462.05,y:-380.85,startPosition:7},0).wait(1).to({x:-448.35,y:-386.25,startPosition:8},0).wait(1).to({x:-434.3,y:-391.3,startPosition:9},0).wait(1).to({x:-419.8,y:-395.95,startPosition:10},0).wait(1).to({x:-404.9,y:-400.25,startPosition:11},0).wait(1).to({x:-389.55,y:-404.15,startPosition:12},0).wait(1).to({x:-373.85,y:-407.7,startPosition:13},0).wait(1).to({x:-357.7,y:-410.9,startPosition:14},0).wait(1).to({x:-341.15,y:-413.75,startPosition:15},0).to({_off:true},1).wait(74));

	// sheep_9
	this.instance_6 = new lib.sheep9("synched",0);
	this.instance_6.setTransform(7.6,-57.6,1,1,0,0,0,69.5,56.1);
	this.instance_6.alpha = 0;
	this.instance_6._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(44).to({_off:false},0).wait(1).to({regY:56,scaleX:0.9855,scaleY:0.9855,x:-19.1,y:-68.75,alpha:0.2,startPosition:1},0).wait(1).to({scaleX:0.971,scaleY:0.971,x:-45.6,y:-77.95,alpha:0.4,startPosition:2},0).wait(1).to({scaleX:0.9566,scaleY:0.9566,x:-71.8,y:-85.35,alpha:0.6,startPosition:3},0).wait(1).to({scaleX:0.9421,scaleY:0.9421,x:-97.75,y:-90.85,alpha:0.8,startPosition:4},0).wait(1).to({scaleX:0.9276,scaleY:0.9276,x:-123.4,y:-94.5,alpha:1,startPosition:5},0).wait(1).to({scaleX:0.9131,scaleY:0.9131,x:-148.75,y:-96.25,startPosition:6},0).wait(1).to({scaleX:0.8986,scaleY:0.8986,x:-173.85,startPosition:7},0).wait(1).to({scaleX:0.8842,scaleY:0.8842,x:-198.7,y:-94.35,startPosition:8},0).wait(1).to({scaleX:0.8697,scaleY:0.8697,x:-223.3,y:-90.6,startPosition:9},0).wait(1).to({scaleX:0.8552,scaleY:0.8552,x:-247.6,y:-85,startPosition:10},0).wait(1).to({scaleX:0.8407,scaleY:0.8407,x:-271.7,y:-77.55,startPosition:11},0).wait(1).to({scaleX:0.8262,scaleY:0.8262,x:-295.55,y:-68.3,startPosition:12},0).wait(1).to({scaleX:0.8118,scaleY:0.8118,x:-319.05,y:-57.1,startPosition:13},0).wait(1).to({scaleX:0.7973,scaleY:0.7973,x:-342.35,y:-44.1,startPosition:14},0).wait(1).to({scaleX:0.7828,scaleY:0.7828,x:-365.4,y:-29.25,startPosition:15},0).wait(1).to({scaleX:0.7683,scaleY:0.7683,x:-388.15,y:-12.5,startPosition:0},0).wait(1).to({scaleX:0.7538,scaleY:0.7538,x:-414.9,y:-20,startPosition:1},0).wait(1).to({scaleX:0.7394,scaleY:0.7394,x:-441.3,y:-25.75,startPosition:2},0).wait(1).to({scaleX:0.7249,scaleY:0.7249,x:-467.4,y:-29.75,startPosition:3},0).wait(1).to({scaleX:0.7104,scaleY:0.7104,x:-493.15,y:-32.05,startPosition:4},0).wait(1).to({scaleX:0.6959,scaleY:0.6959,x:-518.55,y:-32.7,startPosition:5},0).wait(1).to({scaleX:0.6814,scaleY:0.6814,x:-543.6,y:-31.6,startPosition:6},0).wait(1).to({scaleX:0.667,scaleY:0.667,x:-568.3,y:-28.8,startPosition:7},0).wait(1).to({scaleX:0.6525,scaleY:0.6525,x:-592.7,y:-24.25,startPosition:8},0).wait(1).to({scaleX:0.638,scaleY:0.638,x:-616.75,y:-18,startPosition:9},0).wait(1).to({scaleX:0.6235,scaleY:0.6235,x:-640.5,y:-10.1,startPosition:10},0).wait(1).to({scaleX:0.609,scaleY:0.609,x:-663.9,y:-0.4,startPosition:11},0).wait(1).to({scaleX:0.5946,scaleY:0.5946,x:-687.05,y:11,startPosition:12},0).wait(1).to({scaleX:0.5801,scaleY:0.5801,x:-709.85,y:24.1,startPosition:13},0).wait(1).to({scaleX:0.5486,skewY:180,startPosition:14},0).wait(1).to({x:-693.7,y:17.3,startPosition:15},0).wait(1).to({x:-677.55,y:11.4,startPosition:0},0).wait(1).to({x:-661.3,y:6.4,startPosition:1},0).wait(1).to({x:-644.95,y:2.3,startPosition:2},0).wait(1).to({x:-628.6,y:-0.9,startPosition:3},0).wait(1).to({x:-612.15,y:-3.2,startPosition:4},0).wait(1).to({x:-595.65,y:-4.55,startPosition:5},0).wait(1).to({x:-579.05,y:-5.05,startPosition:6},0).wait(1).to({x:-562.4,y:-4.6,startPosition:7},0).wait(1).to({x:-545.65,y:-3.25,startPosition:8},0).wait(1).to({x:-528.9,y:-1.05,startPosition:9},0).wait(1).to({x:-512,y:2.1,startPosition:10},0).wait(1).to({x:-495.1,y:6.15,startPosition:11},0).wait(1).to({x:-478.1,y:11.1,startPosition:12},0).wait(1).to({x:-461,y:17,startPosition:13},0).wait(1).to({x:-443.85,y:23.75,startPosition:14},0).wait(1).to({x:-426.65,y:31.45,startPosition:15},0).wait(1).to({x:-409.35,y:39.95,startPosition:0},0).wait(1).to({x:-392,y:49.45,startPosition:1},0).wait(1).to({scaleX:0.5998,skewY:0,x:-404.2,y:45.95,startPosition:2},0).wait(1).to({scaleX:0.5971,x:-414.1,y:35.95,startPosition:3},0).wait(1).to({scaleX:0.5943,x:-424.25,y:26.6,startPosition:4},0).wait(1).to({scaleX:0.5916,x:-434.55,y:17.75,startPosition:5},0).wait(1).to({scaleX:0.5889,x:-445.05,y:9.55,startPosition:6},0).wait(1).to({scaleX:0.5861,x:-455.8,y:1.9,startPosition:7},0).wait(1).to({scaleX:0.5834,x:-466.8,y:-5.1,startPosition:8},0).wait(1).to({scaleX:0.5807,x:-478,y:-11.55,startPosition:9},0).wait(1).to({scaleX:0.578,x:-489.4,y:-17.4,startPosition:10},0).wait(1).to({scaleX:0.5752,x:-500.95,y:-22.65,startPosition:11},0).wait(1).to({scaleX:0.5725,x:-512.8,y:-27.35,startPosition:12},0).wait(1).to({scaleX:0.5698,x:-524.85,y:-31.4,startPosition:13},0).wait(1).to({scaleX:0.567,x:-537.1,y:-34.9,startPosition:14},0).wait(1).to({scaleX:0.5643,x:-549.6,y:-37.75,startPosition:15},0).wait(1).to({scaleX:0.5616,x:-562.2,y:-40.05,startPosition:0},0).wait(1).to({scaleX:0.5589,x:-575.15,y:-41.75,startPosition:1},0).wait(1).to({scaleX:0.5561,x:-588.25,y:-42.9,startPosition:2},0).wait(1).to({scaleX:0.5534,x:-601.6,y:-43.4,startPosition:3},0).wait(1).to({scaleX:0.5507,x:-615.2,y:-43.3,startPosition:4},0).wait(1).to({scaleX:0.5479,x:-628.9,y:-42.65,startPosition:5},0).wait(1).to({scaleX:0.5452,x:-642.9,y:-41.4,startPosition:6},0).wait(1).to({scaleX:0.5425,x:-657.15,y:-39.55,startPosition:7},0).wait(1).to({scaleX:0.5398,x:-671.6,y:-37.1,startPosition:8},0).wait(1).to({scaleX:0.537,x:-686.25,y:-34.05,startPosition:9},0).wait(1).to({scaleX:0.5486,skewY:180,x:-674.65,y:-38.25,startPosition:10},0).wait(1).to({x:-663.05,y:-48.2,startPosition:11},0).wait(1).to({x:-651.45,y:-57.6,startPosition:12},0).wait(1).to({x:-639.85,y:-66.35,startPosition:13},0).wait(1).to({x:-628.25,y:-74.45,startPosition:14},0).wait(1).to({x:-616.7,y:-82,startPosition:15},0).wait(1).to({x:-605.1,y:-88.9,startPosition:0},0).wait(1).to({x:-593.5,y:-95.2,startPosition:1},0).wait(1).to({x:-581.95,y:-100.9,startPosition:2},0).wait(1).to({x:-570.35,y:-105.95,startPosition:3},0).wait(1).to({x:-558.8,y:-110.4,startPosition:4},0).wait(1).to({x:-547.2,y:-114.25,startPosition:5},0).wait(1).to({x:-535.6,y:-117.45,startPosition:6},0).wait(1).to({x:-524.05,y:-120.1,startPosition:7},0).wait(1).to({x:-512.45,y:-122.1,startPosition:8},0).wait(1).to({x:-500.85,y:-123.5,startPosition:9},0).wait(1).to({x:-489.25,y:-124.3,startPosition:10},0).wait(1).to({x:-477.7,y:-124.45,startPosition:11},0).wait(1).to({x:-466.1,y:-124,startPosition:12},0).wait(1).to({x:-454.5,y:-122.95,startPosition:13},0).wait(1).to({x:-442.9,y:-121.3,startPosition:14},0).wait(1).to({scaleX:0.5947,skewY:0,x:-453.7,y:-124.65,startPosition:15},0).wait(1).to({scaleX:0.595,x:-462.85,y:-135.25,startPosition:0},0).wait(1).to({scaleX:0.5953,x:-472.15,y:-145.05,startPosition:1},0).wait(1).to({scaleX:0.5956,x:-481.6,y:-154.05,startPosition:2},0).wait(1).to({scaleX:0.5959,x:-491.3,y:-162.2,startPosition:3},0).wait(1).to({scaleX:0.5961,x:-501.2,y:-169.6,startPosition:4},0).wait(1).to({scaleX:0.5964,x:-511.3,y:-176.15,startPosition:5},0).wait(1).to({scaleX:0.5967,x:-521.6,y:-181.95,startPosition:6},0).wait(1).to({scaleX:0.597,x:-532.05,y:-186.9,startPosition:7},0).wait(1).to({scaleX:0.5972,x:-542.8,y:-191.05,startPosition:8},0).wait(1).to({scaleX:0.5975,x:-553.65,y:-194.4,startPosition:9},0).wait(1).to({scaleX:0.5978,x:-564.75,y:-197,startPosition:10},0).wait(1).to({scaleX:0.5981,x:-576.05,y:-198.75,startPosition:11},0).wait(1).to({scaleX:0.5984,x:-587.55,y:-199.7,startPosition:12},0).wait(1).to({scaleX:0.5986,x:-599.25,y:-199.85,startPosition:13},0).wait(1).to({scaleX:0.5989,x:-611.2,y:-199.15,startPosition:14},0).wait(1).to({scaleX:0.5992,x:-623.25,y:-197.7,startPosition:15},0).wait(1).to({scaleX:0.5995,x:-635.6,y:-195.45,startPosition:0},0).wait(1).to({scaleX:0.5997,x:-648.1,y:-192.35,startPosition:1},0).wait(1).to({scaleX:0.6,x:-660.85,y:-188.5,startPosition:2},0).wait(1).to({scaleX:0.5486,skewY:180,x:-649.8,y:-196.25,startPosition:3},0).wait(1).to({x:-644.3,y:-208.95,startPosition:4},0).wait(1).to({x:-638.35,y:-221.3,startPosition:5},0).wait(1).to({x:-632,y:-233.3,startPosition:6},0).wait(1).to({x:-625.3,y:-244.9,startPosition:7},0).wait(1).to({x:-618.15,y:-256.15,startPosition:8},0).wait(1).to({x:-610.6,y:-267.05,startPosition:9},0).wait(1).to({x:-602.6,y:-277.55,startPosition:10},0).wait(1).to({x:-594.25,y:-287.7,startPosition:11},0).wait(1).to({x:-585.45,y:-297.5,startPosition:12},0).wait(1).to({x:-576.3,y:-306.9,startPosition:13},0).wait(1).to({x:-566.7,y:-315.95,startPosition:14},0).wait(1).to({x:-556.7,y:-324.6,startPosition:15},0).wait(1).to({x:-546.3,y:-332.95,startPosition:0},0).wait(1).to({x:-535.5,y:-340.85,startPosition:1},0).wait(1).to({x:-524.25,y:-348.45,startPosition:2},0).wait(1).to({x:-512.65,y:-355.65,startPosition:3},0).wait(1).to({x:-500.6,y:-362.5,startPosition:4},0).wait(1).to({x:-488.15,y:-369,startPosition:5},0).wait(1).to({x:-475.3,y:-375.1,startPosition:6},0).wait(1).to({x:-462.05,y:-380.85,startPosition:7},0).wait(1).to({x:-448.35,y:-386.25,startPosition:8},0).wait(1).to({x:-434.3,y:-391.3,startPosition:9},0).wait(1).to({x:-419.8,y:-395.95,startPosition:10},0).wait(1).to({x:-404.9,y:-400.25,startPosition:11},0).wait(1).to({x:-389.55,y:-404.15,startPosition:12},0).wait(1).to({x:-373.85,y:-407.7,startPosition:13},0).wait(1).to({x:-357.7,y:-410.9,startPosition:14},0).wait(1).to({x:-341.15,y:-413.75,startPosition:15},0).to({_off:true},1).wait(85));

	// sheep_8
	this.instance_7 = new lib.sheep8("synched",0);
	this.instance_7.setTransform(7.6,-57.6,1,1,0,0,0,69.5,56.1);
	this.instance_7.alpha = 0;
	this.instance_7._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(33).to({_off:false},0).wait(1).to({regY:56,scaleX:0.9855,scaleY:0.9855,x:-19.1,y:-68.75,alpha:0.2,startPosition:1},0).wait(1).to({scaleX:0.971,scaleY:0.971,x:-45.6,y:-77.95,alpha:0.4,startPosition:2},0).wait(1).to({scaleX:0.9566,scaleY:0.9566,x:-71.8,y:-85.35,alpha:0.6,startPosition:3},0).wait(1).to({scaleX:0.9421,scaleY:0.9421,x:-97.75,y:-90.85,alpha:0.8,startPosition:4},0).wait(1).to({scaleX:0.9276,scaleY:0.9276,x:-123.4,y:-94.5,alpha:1,startPosition:5},0).wait(1).to({scaleX:0.9131,scaleY:0.9131,x:-148.75,y:-96.25,startPosition:6},0).wait(1).to({scaleX:0.8986,scaleY:0.8986,x:-173.85,startPosition:7},0).wait(1).to({scaleX:0.8842,scaleY:0.8842,x:-198.7,y:-94.35,startPosition:8},0).wait(1).to({scaleX:0.8697,scaleY:0.8697,x:-223.3,y:-90.6,startPosition:9},0).wait(1).to({scaleX:0.8552,scaleY:0.8552,x:-247.6,y:-85,startPosition:10},0).wait(1).to({scaleX:0.8407,scaleY:0.8407,x:-271.7,y:-77.55,startPosition:11},0).wait(1).to({scaleX:0.8262,scaleY:0.8262,x:-295.55,y:-68.3,startPosition:12},0).wait(1).to({scaleX:0.8118,scaleY:0.8118,x:-319.05,y:-57.1,startPosition:13},0).wait(1).to({scaleX:0.7973,scaleY:0.7973,x:-342.35,y:-44.1,startPosition:14},0).wait(1).to({scaleX:0.7828,scaleY:0.7828,x:-365.4,y:-29.25,startPosition:15},0).wait(1).to({scaleX:0.7683,scaleY:0.7683,x:-388.15,y:-12.5,startPosition:0},0).wait(1).to({scaleX:0.7538,scaleY:0.7538,x:-414.9,y:-20,startPosition:1},0).wait(1).to({scaleX:0.7394,scaleY:0.7394,x:-441.3,y:-25.75,startPosition:2},0).wait(1).to({scaleX:0.7249,scaleY:0.7249,x:-467.4,y:-29.75,startPosition:3},0).wait(1).to({scaleX:0.7104,scaleY:0.7104,x:-493.15,y:-32.05,startPosition:4},0).wait(1).to({scaleX:0.6959,scaleY:0.6959,x:-518.55,y:-32.7,startPosition:5},0).wait(1).to({scaleX:0.6814,scaleY:0.6814,x:-543.6,y:-31.6,startPosition:6},0).wait(1).to({scaleX:0.667,scaleY:0.667,x:-568.3,y:-28.8,startPosition:7},0).wait(1).to({scaleX:0.6525,scaleY:0.6525,x:-592.7,y:-24.25,startPosition:8},0).wait(1).to({scaleX:0.638,scaleY:0.638,x:-616.75,y:-18,startPosition:9},0).wait(1).to({scaleX:0.6235,scaleY:0.6235,x:-640.5,y:-10.1,startPosition:10},0).wait(1).to({scaleX:0.609,scaleY:0.609,x:-663.9,y:-0.4,startPosition:11},0).wait(1).to({scaleX:0.5946,scaleY:0.5946,x:-687.05,y:11,startPosition:12},0).wait(1).to({scaleX:0.5801,scaleY:0.5801,x:-709.85,y:24.1,startPosition:13},0).wait(1).to({scaleX:0.5486,skewY:180,startPosition:14},0).wait(1).to({x:-693.7,y:17.3,startPosition:15},0).wait(1).to({x:-677.55,y:11.4,startPosition:0},0).wait(1).to({x:-661.3,y:6.4,startPosition:1},0).wait(1).to({x:-644.95,y:2.3,startPosition:2},0).wait(1).to({x:-628.6,y:-0.9,startPosition:3},0).wait(1).to({x:-612.15,y:-3.2,startPosition:4},0).wait(1).to({x:-595.65,y:-4.55,startPosition:5},0).wait(1).to({x:-579.05,y:-5.05,startPosition:6},0).wait(1).to({x:-562.4,y:-4.6,startPosition:7},0).wait(1).to({x:-545.65,y:-3.25,startPosition:8},0).wait(1).to({x:-528.9,y:-1.05,startPosition:9},0).wait(1).to({x:-512,y:2.1,startPosition:10},0).wait(1).to({x:-495.1,y:6.15,startPosition:11},0).wait(1).to({x:-478.1,y:11.1,startPosition:12},0).wait(1).to({x:-461,y:17,startPosition:13},0).wait(1).to({x:-443.85,y:23.75,startPosition:14},0).wait(1).to({x:-426.65,y:31.45,startPosition:15},0).wait(1).to({x:-409.35,y:39.95,startPosition:0},0).wait(1).to({x:-392,y:49.45,startPosition:1},0).wait(1).to({scaleX:0.5998,skewY:0,x:-404.2,y:45.95,startPosition:2},0).wait(1).to({scaleX:0.5971,x:-414.1,y:35.95,startPosition:3},0).wait(1).to({scaleX:0.5943,x:-424.25,y:26.6,startPosition:4},0).wait(1).to({scaleX:0.5916,x:-434.55,y:17.75,startPosition:5},0).wait(1).to({scaleX:0.5889,x:-445.05,y:9.55,startPosition:6},0).wait(1).to({scaleX:0.5861,x:-455.8,y:1.9,startPosition:7},0).wait(1).to({scaleX:0.5834,x:-466.8,y:-5.1,startPosition:8},0).wait(1).to({scaleX:0.5807,x:-478,y:-11.55,startPosition:9},0).wait(1).to({scaleX:0.578,x:-489.4,y:-17.4,startPosition:10},0).wait(1).to({scaleX:0.5752,x:-500.95,y:-22.65,startPosition:11},0).wait(1).to({scaleX:0.5725,x:-512.8,y:-27.35,startPosition:12},0).wait(1).to({scaleX:0.5698,x:-524.85,y:-31.4,startPosition:13},0).wait(1).to({scaleX:0.567,x:-537.1,y:-34.9,startPosition:14},0).wait(1).to({scaleX:0.5643,x:-549.6,y:-37.75,startPosition:15},0).wait(1).to({scaleX:0.5616,x:-562.2,y:-40.05,startPosition:0},0).wait(1).to({scaleX:0.5589,x:-575.15,y:-41.75,startPosition:1},0).wait(1).to({scaleX:0.5561,x:-588.25,y:-42.9,startPosition:2},0).wait(1).to({scaleX:0.5534,x:-601.6,y:-43.4,startPosition:3},0).wait(1).to({scaleX:0.5507,x:-615.2,y:-43.3,startPosition:4},0).wait(1).to({scaleX:0.5479,x:-628.9,y:-42.65,startPosition:5},0).wait(1).to({scaleX:0.5452,x:-642.9,y:-41.4,startPosition:6},0).wait(1).to({scaleX:0.5425,x:-657.15,y:-39.55,startPosition:7},0).wait(1).to({scaleX:0.5398,x:-671.6,y:-37.1,startPosition:8},0).wait(1).to({scaleX:0.537,x:-686.25,y:-34.05,startPosition:9},0).wait(1).to({scaleX:0.5486,skewY:180,x:-674.65,y:-38.25,startPosition:10},0).wait(1).to({x:-663.05,y:-48.2,startPosition:11},0).wait(1).to({x:-651.45,y:-57.6,startPosition:12},0).wait(1).to({x:-639.85,y:-66.35,startPosition:13},0).wait(1).to({x:-628.25,y:-74.45,startPosition:14},0).wait(1).to({x:-616.7,y:-82,startPosition:15},0).wait(1).to({x:-605.1,y:-88.9,startPosition:0},0).wait(1).to({x:-593.5,y:-95.2,startPosition:1},0).wait(1).to({x:-581.95,y:-100.9,startPosition:2},0).wait(1).to({x:-570.35,y:-105.95,startPosition:3},0).wait(1).to({x:-558.8,y:-110.4,startPosition:4},0).wait(1).to({x:-547.2,y:-114.25,startPosition:5},0).wait(1).to({x:-535.6,y:-117.45,startPosition:6},0).wait(1).to({x:-524.05,y:-120.1,startPosition:7},0).wait(1).to({x:-512.45,y:-122.1,startPosition:8},0).wait(1).to({x:-500.85,y:-123.5,startPosition:9},0).wait(1).to({x:-489.25,y:-124.3,startPosition:10},0).wait(1).to({x:-477.7,y:-124.45,startPosition:11},0).wait(1).to({x:-466.1,y:-124,startPosition:12},0).wait(1).to({x:-454.5,y:-122.95,startPosition:13},0).wait(1).to({x:-442.9,y:-121.3,startPosition:14},0).wait(1).to({scaleX:0.5947,skewY:0,x:-453.7,y:-124.65,startPosition:15},0).wait(1).to({scaleX:0.595,x:-462.85,y:-135.25,startPosition:0},0).wait(1).to({scaleX:0.5953,x:-472.15,y:-145.05,startPosition:1},0).wait(1).to({scaleX:0.5956,x:-481.6,y:-154.05,startPosition:2},0).wait(1).to({scaleX:0.5959,x:-491.3,y:-162.2,startPosition:3},0).wait(1).to({scaleX:0.5961,x:-501.2,y:-169.6,startPosition:4},0).wait(1).to({scaleX:0.5964,x:-511.3,y:-176.15,startPosition:5},0).wait(1).to({scaleX:0.5967,x:-521.6,y:-181.95,startPosition:6},0).wait(1).to({scaleX:0.597,x:-532.05,y:-186.9,startPosition:7},0).wait(1).to({scaleX:0.5972,x:-542.8,y:-191.05,startPosition:8},0).wait(1).to({scaleX:0.5975,x:-553.65,y:-194.4,startPosition:9},0).wait(1).to({scaleX:0.5978,x:-564.75,y:-197,startPosition:10},0).wait(1).to({scaleX:0.5981,x:-576.05,y:-198.75,startPosition:11},0).wait(1).to({scaleX:0.5984,x:-587.55,y:-199.7,startPosition:12},0).wait(1).to({scaleX:0.5986,x:-599.25,y:-199.85,startPosition:13},0).wait(1).to({scaleX:0.5989,x:-611.2,y:-199.15,startPosition:14},0).wait(1).to({scaleX:0.5992,x:-623.25,y:-197.7,startPosition:15},0).wait(1).to({scaleX:0.5995,x:-635.6,y:-195.45,startPosition:0},0).wait(1).to({scaleX:0.5997,x:-648.1,y:-192.35,startPosition:1},0).wait(1).to({scaleX:0.6,x:-660.85,y:-188.5,startPosition:2},0).wait(1).to({scaleX:0.5486,skewY:180,x:-649.8,y:-196.25,startPosition:3},0).wait(1).to({x:-644.3,y:-208.95,startPosition:4},0).wait(1).to({x:-638.35,y:-221.3,startPosition:5},0).wait(1).to({x:-632,y:-233.3,startPosition:6},0).wait(1).to({x:-625.3,y:-244.9,startPosition:7},0).wait(1).to({x:-618.15,y:-256.15,startPosition:8},0).wait(1).to({x:-610.6,y:-267.05,startPosition:9},0).wait(1).to({x:-602.6,y:-277.55,startPosition:10},0).wait(1).to({x:-594.25,y:-287.7,startPosition:11},0).wait(1).to({x:-585.45,y:-297.5,startPosition:12},0).wait(1).to({x:-576.3,y:-306.9,startPosition:13},0).wait(1).to({x:-566.7,y:-315.95,startPosition:14},0).wait(1).to({x:-556.7,y:-324.6,startPosition:15},0).wait(1).to({x:-546.3,y:-332.95,startPosition:0},0).wait(1).to({x:-535.5,y:-340.85,startPosition:1},0).wait(1).to({x:-524.25,y:-348.45,startPosition:2},0).wait(1).to({x:-512.65,y:-355.65,startPosition:3},0).wait(1).to({x:-500.6,y:-362.5,startPosition:4},0).wait(1).to({x:-488.15,y:-369,startPosition:5},0).wait(1).to({x:-475.3,y:-375.1,startPosition:6},0).wait(1).to({x:-462.05,y:-380.85,startPosition:7},0).wait(1).to({x:-448.35,y:-386.25,startPosition:8},0).wait(1).to({x:-434.3,y:-391.3,startPosition:9},0).wait(1).to({x:-419.8,y:-395.95,startPosition:10},0).wait(1).to({x:-404.9,y:-400.25,startPosition:11},0).wait(1).to({x:-389.55,y:-404.15,startPosition:12},0).wait(1).to({x:-373.85,y:-407.7,startPosition:13},0).wait(1).to({x:-357.7,y:-410.9,startPosition:14},0).wait(1).to({x:-341.15,y:-413.75,startPosition:15},0).to({_off:true},1).wait(96));

	// sheep_7
	this.instance_8 = new lib.sheep7("synched",0);
	this.instance_8.setTransform(7.6,-57.6,1,1,0,0,0,69.5,56.1);
	this.instance_8.alpha = 0;
	this.instance_8._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(22).to({_off:false},0).wait(1).to({regY:56,scaleX:0.9855,scaleY:0.9855,x:-19.1,y:-68.75,alpha:0.2,startPosition:1},0).wait(1).to({scaleX:0.971,scaleY:0.971,x:-45.6,y:-77.95,alpha:0.4,startPosition:2},0).wait(1).to({scaleX:0.9566,scaleY:0.9566,x:-71.8,y:-85.35,alpha:0.6,startPosition:3},0).wait(1).to({scaleX:0.9421,scaleY:0.9421,x:-97.75,y:-90.85,alpha:0.8,startPosition:4},0).wait(1).to({scaleX:0.9276,scaleY:0.9276,x:-123.4,y:-94.5,alpha:1,startPosition:5},0).wait(1).to({scaleX:0.9131,scaleY:0.9131,x:-148.75,y:-96.25,startPosition:6},0).wait(1).to({scaleX:0.8986,scaleY:0.8986,x:-173.85,startPosition:7},0).wait(1).to({scaleX:0.8842,scaleY:0.8842,x:-198.7,y:-94.35,startPosition:8},0).wait(1).to({scaleX:0.8697,scaleY:0.8697,x:-223.3,y:-90.6,startPosition:9},0).wait(1).to({scaleX:0.8552,scaleY:0.8552,x:-247.6,y:-85,startPosition:10},0).wait(1).to({scaleX:0.8407,scaleY:0.8407,x:-271.7,y:-77.55,startPosition:11},0).wait(1).to({scaleX:0.8262,scaleY:0.8262,x:-295.55,y:-68.3,startPosition:12},0).wait(1).to({scaleX:0.8118,scaleY:0.8118,x:-319.05,y:-57.1,startPosition:13},0).wait(1).to({scaleX:0.7973,scaleY:0.7973,x:-342.35,y:-44.1,startPosition:14},0).wait(1).to({scaleX:0.7828,scaleY:0.7828,x:-365.4,y:-29.25,startPosition:15},0).wait(1).to({scaleX:0.7683,scaleY:0.7683,x:-388.15,y:-12.5,startPosition:0},0).wait(1).to({scaleX:0.7538,scaleY:0.7538,x:-414.9,y:-20,startPosition:1},0).wait(1).to({scaleX:0.7394,scaleY:0.7394,x:-441.3,y:-25.75,startPosition:2},0).wait(1).to({scaleX:0.7249,scaleY:0.7249,x:-467.4,y:-29.75,startPosition:3},0).wait(1).to({scaleX:0.7104,scaleY:0.7104,x:-493.15,y:-32.05,startPosition:4},0).wait(1).to({scaleX:0.6959,scaleY:0.6959,x:-518.55,y:-32.7,startPosition:5},0).wait(1).to({scaleX:0.6814,scaleY:0.6814,x:-543.6,y:-31.6,startPosition:6},0).wait(1).to({scaleX:0.667,scaleY:0.667,x:-568.3,y:-28.8,startPosition:7},0).wait(1).to({scaleX:0.6525,scaleY:0.6525,x:-592.7,y:-24.25,startPosition:8},0).wait(1).to({scaleX:0.638,scaleY:0.638,x:-616.75,y:-18,startPosition:9},0).wait(1).to({scaleX:0.6235,scaleY:0.6235,x:-640.5,y:-10.1,startPosition:10},0).wait(1).to({scaleX:0.609,scaleY:0.609,x:-663.9,y:-0.4,startPosition:11},0).wait(1).to({scaleX:0.5946,scaleY:0.5946,x:-687.05,y:11,startPosition:12},0).wait(1).to({scaleX:0.5801,scaleY:0.5801,x:-709.85,y:24.1,startPosition:13},0).wait(1).to({scaleX:0.5486,skewY:180,startPosition:14},0).wait(1).to({x:-693.7,y:17.3,startPosition:15},0).wait(1).to({x:-677.55,y:11.4,startPosition:0},0).wait(1).to({x:-661.3,y:6.4,startPosition:1},0).wait(1).to({x:-644.95,y:2.3,startPosition:2},0).wait(1).to({x:-628.6,y:-0.9,startPosition:3},0).wait(1).to({x:-612.15,y:-3.2,startPosition:4},0).wait(1).to({x:-595.65,y:-4.55,startPosition:5},0).wait(1).to({x:-579.05,y:-5.05,startPosition:6},0).wait(1).to({x:-562.4,y:-4.6,startPosition:7},0).wait(1).to({x:-545.65,y:-3.25,startPosition:8},0).wait(1).to({x:-528.9,y:-1.05,startPosition:9},0).wait(1).to({x:-512,y:2.1,startPosition:10},0).wait(1).to({x:-495.1,y:6.15,startPosition:11},0).wait(1).to({x:-478.1,y:11.1,startPosition:12},0).wait(1).to({x:-461,y:17,startPosition:13},0).wait(1).to({x:-443.85,y:23.75,startPosition:14},0).wait(1).to({x:-426.65,y:31.45,startPosition:15},0).wait(1).to({x:-409.35,y:39.95,startPosition:0},0).wait(1).to({x:-392,y:49.45,startPosition:1},0).wait(1).to({scaleX:0.5998,skewY:0,x:-404.2,y:45.95,startPosition:2},0).wait(1).to({scaleX:0.5971,x:-414.1,y:35.95,startPosition:3},0).wait(1).to({scaleX:0.5943,x:-424.25,y:26.6,startPosition:4},0).wait(1).to({scaleX:0.5916,x:-434.55,y:17.75,startPosition:5},0).wait(1).to({scaleX:0.5889,x:-445.05,y:9.55,startPosition:6},0).wait(1).to({scaleX:0.5861,x:-455.8,y:1.9,startPosition:7},0).wait(1).to({scaleX:0.5834,x:-466.8,y:-5.1,startPosition:8},0).wait(1).to({scaleX:0.5807,x:-478,y:-11.55,startPosition:9},0).wait(1).to({scaleX:0.578,x:-489.4,y:-17.4,startPosition:10},0).wait(1).to({scaleX:0.5752,x:-500.95,y:-22.65,startPosition:11},0).wait(1).to({scaleX:0.5725,x:-512.8,y:-27.35,startPosition:12},0).wait(1).to({scaleX:0.5698,x:-524.85,y:-31.4,startPosition:13},0).wait(1).to({scaleX:0.567,x:-537.1,y:-34.9,startPosition:14},0).wait(1).to({scaleX:0.5643,x:-549.6,y:-37.75,startPosition:15},0).wait(1).to({scaleX:0.5616,x:-562.2,y:-40.05,startPosition:0},0).wait(1).to({scaleX:0.5589,x:-575.15,y:-41.75,startPosition:1},0).wait(1).to({scaleX:0.5561,x:-588.25,y:-42.9,startPosition:2},0).wait(1).to({scaleX:0.5534,x:-601.6,y:-43.4,startPosition:3},0).wait(1).to({scaleX:0.5507,x:-615.2,y:-43.3,startPosition:4},0).wait(1).to({scaleX:0.5479,x:-628.9,y:-42.65,startPosition:5},0).wait(1).to({scaleX:0.5452,x:-642.9,y:-41.4,startPosition:6},0).wait(1).to({scaleX:0.5425,x:-657.15,y:-39.55,startPosition:7},0).wait(1).to({scaleX:0.5398,x:-671.6,y:-37.1,startPosition:8},0).wait(1).to({scaleX:0.537,x:-686.25,y:-34.05,startPosition:9},0).wait(1).to({scaleX:0.5486,skewY:180,x:-674.65,y:-38.25,startPosition:10},0).wait(1).to({x:-663.05,y:-48.2,startPosition:11},0).wait(1).to({x:-651.45,y:-57.6,startPosition:12},0).wait(1).to({x:-639.85,y:-66.35,startPosition:13},0).wait(1).to({x:-628.25,y:-74.45,startPosition:14},0).wait(1).to({x:-616.7,y:-82,startPosition:15},0).wait(1).to({x:-605.1,y:-88.9,startPosition:0},0).wait(1).to({x:-593.5,y:-95.2,startPosition:1},0).wait(1).to({x:-581.95,y:-100.9,startPosition:2},0).wait(1).to({x:-570.35,y:-105.95,startPosition:3},0).wait(1).to({x:-558.8,y:-110.4,startPosition:4},0).wait(1).to({x:-547.2,y:-114.25,startPosition:5},0).wait(1).to({x:-535.6,y:-117.45,startPosition:6},0).wait(1).to({x:-524.05,y:-120.1,startPosition:7},0).wait(1).to({x:-512.45,y:-122.1,startPosition:8},0).wait(1).to({x:-500.85,y:-123.5,startPosition:9},0).wait(1).to({x:-489.25,y:-124.3,startPosition:10},0).wait(1).to({x:-477.7,y:-124.45,startPosition:11},0).wait(1).to({x:-466.1,y:-124,startPosition:12},0).wait(1).to({x:-454.5,y:-122.95,startPosition:13},0).wait(1).to({x:-442.9,y:-121.3,startPosition:14},0).wait(1).to({scaleX:0.5947,skewY:0,x:-453.7,y:-124.65,startPosition:15},0).wait(1).to({scaleX:0.595,x:-462.85,y:-135.25,startPosition:0},0).wait(1).to({scaleX:0.5953,x:-472.15,y:-145.05,startPosition:1},0).wait(1).to({scaleX:0.5956,x:-481.6,y:-154.05,startPosition:2},0).wait(1).to({scaleX:0.5959,x:-491.3,y:-162.2,startPosition:3},0).wait(1).to({scaleX:0.5961,x:-501.2,y:-169.6,startPosition:4},0).wait(1).to({scaleX:0.5964,x:-511.3,y:-176.15,startPosition:5},0).wait(1).to({scaleX:0.5967,x:-521.6,y:-181.95,startPosition:6},0).wait(1).to({scaleX:0.597,x:-532.05,y:-186.9,startPosition:7},0).wait(1).to({scaleX:0.5972,x:-542.8,y:-191.05,startPosition:8},0).wait(1).to({scaleX:0.5975,x:-553.65,y:-194.4,startPosition:9},0).wait(1).to({scaleX:0.5978,x:-564.75,y:-197,startPosition:10},0).wait(1).to({scaleX:0.5981,x:-576.05,y:-198.75,startPosition:11},0).wait(1).to({scaleX:0.5984,x:-587.55,y:-199.7,startPosition:12},0).wait(1).to({scaleX:0.5986,x:-599.25,y:-199.85,startPosition:13},0).wait(1).to({scaleX:0.5989,x:-611.2,y:-199.15,startPosition:14},0).wait(1).to({scaleX:0.5992,x:-623.25,y:-197.7,startPosition:15},0).wait(1).to({scaleX:0.5995,x:-635.6,y:-195.45,startPosition:0},0).wait(1).to({scaleX:0.5997,x:-648.1,y:-192.35,startPosition:1},0).wait(1).to({scaleX:0.6,x:-660.85,y:-188.5,startPosition:2},0).wait(1).to({scaleX:0.5486,skewY:180,x:-649.8,y:-196.25,startPosition:3},0).wait(1).to({x:-644.3,y:-208.95,startPosition:4},0).wait(1).to({x:-638.35,y:-221.3,startPosition:5},0).wait(1).to({x:-632,y:-233.3,startPosition:6},0).wait(1).to({x:-625.3,y:-244.9,startPosition:7},0).wait(1).to({x:-618.15,y:-256.15,startPosition:8},0).wait(1).to({x:-610.6,y:-267.05,startPosition:9},0).wait(1).to({x:-602.6,y:-277.55,startPosition:10},0).wait(1).to({x:-594.25,y:-287.7,startPosition:11},0).wait(1).to({x:-585.45,y:-297.5,startPosition:12},0).wait(1).to({x:-576.3,y:-306.9,startPosition:13},0).wait(1).to({x:-566.7,y:-315.95,startPosition:14},0).wait(1).to({x:-556.7,y:-324.6,startPosition:15},0).wait(1).to({x:-546.3,y:-332.95,startPosition:0},0).wait(1).to({x:-535.5,y:-340.85,startPosition:1},0).wait(1).to({x:-524.25,y:-348.45,startPosition:2},0).wait(1).to({x:-512.65,y:-355.65,startPosition:3},0).wait(1).to({x:-500.6,y:-362.5,startPosition:4},0).wait(1).to({x:-488.15,y:-369,startPosition:5},0).wait(1).to({x:-475.3,y:-375.1,startPosition:6},0).wait(1).to({x:-462.05,y:-380.85,startPosition:7},0).wait(1).to({x:-448.35,y:-386.25,startPosition:8},0).wait(1).to({x:-434.3,y:-391.3,startPosition:9},0).wait(1).to({x:-419.8,y:-395.95,startPosition:10},0).wait(1).to({x:-404.9,y:-400.25,startPosition:11},0).wait(1).to({x:-389.55,y:-404.15,startPosition:12},0).wait(1).to({x:-373.85,y:-407.7,startPosition:13},0).wait(1).to({x:-357.7,y:-410.9,startPosition:14},0).wait(1).to({x:-341.15,y:-413.75,startPosition:15},0).to({_off:true},1).wait(107));

	// sheep_6
	this.instance_9 = new lib.sheep6("synched",0);
	this.instance_9.setTransform(7.6,-57.6,1,1,0,0,0,69.5,56.1);
	this.instance_9.alpha = 0;
	this.instance_9._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_9).wait(11).to({_off:false},0).wait(1).to({regY:56,scaleX:0.9855,scaleY:0.9855,x:-19.1,y:-68.75,alpha:0.1667,startPosition:1},0).wait(1).to({scaleX:0.971,scaleY:0.971,x:-45.6,y:-77.95,alpha:0.3333,startPosition:2},0).wait(1).to({scaleX:0.9566,scaleY:0.9566,x:-71.75,y:-85.35,alpha:0.5,startPosition:3},0).wait(1).to({scaleX:0.9421,scaleY:0.9421,x:-97.75,y:-90.85,alpha:0.6667,startPosition:4},0).wait(1).to({scaleX:0.9276,scaleY:0.9276,x:-123.4,y:-94.5,alpha:0.8333,startPosition:5},0).wait(1).to({scaleX:0.9131,scaleY:0.9131,x:-148.75,y:-96.25,alpha:1,startPosition:6},0).wait(1).to({scaleX:0.8986,scaleY:0.8986,x:-173.85,startPosition:7},0).wait(1).to({scaleX:0.8842,scaleY:0.8842,x:-198.7,y:-94.35,startPosition:8},0).wait(1).to({scaleX:0.8697,scaleY:0.8697,x:-223.3,y:-90.6,startPosition:9},0).wait(1).to({scaleX:0.8552,scaleY:0.8552,x:-247.6,y:-85,startPosition:10},0).wait(1).to({scaleX:0.8407,scaleY:0.8407,x:-271.7,y:-77.55,startPosition:11},0).wait(1).to({scaleX:0.8262,scaleY:0.8262,x:-295.55,y:-68.3,startPosition:12},0).wait(1).to({scaleX:0.8118,scaleY:0.8118,x:-319.05,y:-57.1,startPosition:13},0).wait(1).to({scaleX:0.7973,scaleY:0.7973,x:-342.35,y:-44.1,startPosition:14},0).wait(1).to({scaleX:0.7828,scaleY:0.7828,x:-365.4,y:-29.25,startPosition:15},0).wait(1).to({scaleX:0.7683,scaleY:0.7683,x:-388.15,y:-12.5,startPosition:0},0).wait(1).to({scaleX:0.7538,scaleY:0.7538,x:-414.9,y:-20,startPosition:1},0).wait(1).to({scaleX:0.7394,scaleY:0.7394,x:-441.3,y:-25.75,startPosition:2},0).wait(1).to({scaleX:0.7249,scaleY:0.7249,x:-467.4,y:-29.75,startPosition:3},0).wait(1).to({scaleX:0.7104,scaleY:0.7104,x:-493.15,y:-32.05,startPosition:4},0).wait(1).to({scaleX:0.6959,scaleY:0.6959,x:-518.55,y:-32.7,startPosition:5},0).wait(1).to({scaleX:0.6814,scaleY:0.6814,x:-543.6,y:-31.6,startPosition:6},0).wait(1).to({scaleX:0.667,scaleY:0.667,x:-568.3,y:-28.8,startPosition:7},0).wait(1).to({scaleX:0.6525,scaleY:0.6525,x:-592.7,y:-24.25,startPosition:8},0).wait(1).to({scaleX:0.638,scaleY:0.638,x:-616.75,y:-18,startPosition:9},0).wait(1).to({scaleX:0.6235,scaleY:0.6235,x:-640.5,y:-10.1,startPosition:10},0).wait(1).to({scaleX:0.609,scaleY:0.609,x:-663.9,y:-0.4,startPosition:11},0).wait(1).to({scaleX:0.5946,scaleY:0.5946,x:-687.05,y:11,startPosition:12},0).wait(1).to({scaleX:0.5801,scaleY:0.5801,x:-709.85,y:24.1,startPosition:13},0).wait(1).to({scaleX:0.5486,skewY:180,startPosition:14},0).wait(1).to({x:-693.7,y:17.3,startPosition:15},0).wait(1).to({x:-677.55,y:11.4,startPosition:0},0).wait(1).to({x:-661.3,y:6.4,startPosition:1},0).wait(1).to({x:-644.95,y:2.3,startPosition:2},0).wait(1).to({x:-628.6,y:-0.9,startPosition:3},0).wait(1).to({x:-612.15,y:-3.2,startPosition:4},0).wait(1).to({x:-595.65,y:-4.55,startPosition:5},0).wait(1).to({x:-579.05,y:-5.05,startPosition:6},0).wait(1).to({x:-562.4,y:-4.6,startPosition:7},0).wait(1).to({x:-545.65,y:-3.25,startPosition:8},0).wait(1).to({x:-528.9,y:-1.05,startPosition:9},0).wait(1).to({x:-512,y:2.1,startPosition:10},0).wait(1).to({x:-495.1,y:6.15,startPosition:11},0).wait(1).to({x:-478.1,y:11.1,startPosition:12},0).wait(1).to({x:-461,y:17,startPosition:13},0).wait(1).to({x:-443.85,y:23.75,startPosition:14},0).wait(1).to({x:-426.65,y:31.45,startPosition:15},0).wait(1).to({x:-409.35,y:39.95,startPosition:0},0).wait(1).to({x:-392,y:49.45,startPosition:1},0).wait(1).to({scaleX:0.5998,skewY:0,x:-404.2,y:45.95,startPosition:2},0).wait(1).to({scaleX:0.5971,x:-414.1,y:35.95,startPosition:3},0).wait(1).to({scaleX:0.5943,x:-424.25,y:26.6,startPosition:4},0).wait(1).to({scaleX:0.5916,x:-434.55,y:17.75,startPosition:5},0).wait(1).to({scaleX:0.5889,x:-445.05,y:9.55,startPosition:6},0).wait(1).to({scaleX:0.5861,x:-455.8,y:1.9,startPosition:7},0).wait(1).to({scaleX:0.5834,x:-466.8,y:-5.1,startPosition:8},0).wait(1).to({scaleX:0.5807,x:-478,y:-11.55,startPosition:9},0).wait(1).to({scaleX:0.578,x:-489.4,y:-17.4,startPosition:10},0).wait(1).to({scaleX:0.5752,x:-500.95,y:-22.65,startPosition:11},0).wait(1).to({scaleX:0.5725,x:-512.8,y:-27.35,startPosition:12},0).wait(1).to({scaleX:0.5698,x:-524.85,y:-31.4,startPosition:13},0).wait(1).to({scaleX:0.567,x:-537.1,y:-34.9,startPosition:14},0).wait(1).to({scaleX:0.5643,x:-549.6,y:-37.75,startPosition:15},0).wait(1).to({scaleX:0.5616,x:-562.2,y:-40.05,startPosition:0},0).wait(1).to({scaleX:0.5589,x:-575.15,y:-41.75,startPosition:1},0).wait(1).to({scaleX:0.5561,x:-588.25,y:-42.9,startPosition:2},0).wait(1).to({scaleX:0.5534,x:-601.6,y:-43.4,startPosition:3},0).wait(1).to({scaleX:0.5507,x:-615.2,y:-43.3,startPosition:4},0).wait(1).to({scaleX:0.5479,x:-628.9,y:-42.65,startPosition:5},0).wait(1).to({scaleX:0.5452,x:-642.9,y:-41.4,startPosition:6},0).wait(1).to({scaleX:0.5425,x:-657.15,y:-39.55,startPosition:7},0).wait(1).to({scaleX:0.5398,x:-671.6,y:-37.1,startPosition:8},0).wait(1).to({scaleX:0.537,x:-686.25,y:-34.05,startPosition:9},0).wait(1).to({scaleX:0.5486,skewY:180,x:-674.65,y:-38.25,startPosition:10},0).wait(1).to({x:-663.05,y:-48.2,startPosition:11},0).wait(1).to({x:-651.45,y:-57.6,startPosition:12},0).wait(1).to({x:-639.85,y:-66.35,startPosition:13},0).wait(1).to({x:-628.25,y:-74.45,startPosition:14},0).wait(1).to({x:-616.7,y:-82,startPosition:15},0).wait(1).to({x:-605.1,y:-88.9,startPosition:0},0).wait(1).to({x:-593.5,y:-95.2,startPosition:1},0).wait(1).to({x:-581.95,y:-100.9,startPosition:2},0).wait(1).to({x:-570.35,y:-105.95,startPosition:3},0).wait(1).to({x:-558.8,y:-110.4,startPosition:4},0).wait(1).to({x:-547.2,y:-114.25,startPosition:5},0).wait(1).to({x:-535.6,y:-117.45,startPosition:6},0).wait(1).to({x:-524.05,y:-120.1,startPosition:7},0).wait(1).to({x:-512.45,y:-122.1,startPosition:8},0).wait(1).to({x:-500.85,y:-123.5,startPosition:9},0).wait(1).to({x:-489.25,y:-124.3,startPosition:10},0).wait(1).to({x:-477.7,y:-124.45,startPosition:11},0).wait(1).to({x:-466.1,y:-124,startPosition:12},0).wait(1).to({x:-454.5,y:-122.95,startPosition:13},0).wait(1).to({x:-442.9,y:-121.3,startPosition:14},0).wait(1).to({scaleX:0.5947,skewY:0,x:-453.7,y:-124.65,startPosition:15},0).wait(1).to({scaleX:0.595,x:-462.85,y:-135.25,startPosition:0},0).wait(1).to({scaleX:0.5953,x:-472.15,y:-145.05,startPosition:1},0).wait(1).to({scaleX:0.5956,x:-481.6,y:-154.05,startPosition:2},0).wait(1).to({scaleX:0.5959,x:-491.3,y:-162.2,startPosition:3},0).wait(1).to({scaleX:0.5961,x:-501.2,y:-169.6,startPosition:4},0).wait(1).to({scaleX:0.5964,x:-511.3,y:-176.15,startPosition:5},0).wait(1).to({scaleX:0.5967,x:-521.6,y:-181.95,startPosition:6},0).wait(1).to({scaleX:0.597,x:-532.05,y:-186.9,startPosition:7},0).wait(1).to({scaleX:0.5972,x:-542.8,y:-191.05,startPosition:8},0).wait(1).to({scaleX:0.5975,x:-553.65,y:-194.4,startPosition:9},0).wait(1).to({scaleX:0.5978,x:-564.75,y:-197,startPosition:10},0).wait(1).to({scaleX:0.5981,x:-576.05,y:-198.75,startPosition:11},0).wait(1).to({scaleX:0.5984,x:-587.55,y:-199.7,startPosition:12},0).wait(1).to({scaleX:0.5986,x:-599.25,y:-199.85,startPosition:13},0).wait(1).to({scaleX:0.5989,x:-611.2,y:-199.15,startPosition:14},0).wait(1).to({scaleX:0.5992,x:-623.25,y:-197.7,startPosition:15},0).wait(1).to({scaleX:0.5995,x:-635.6,y:-195.45,startPosition:0},0).wait(1).to({scaleX:0.5997,x:-648.1,y:-192.35,startPosition:1},0).wait(1).to({scaleX:0.6,x:-660.85,y:-188.5,startPosition:2},0).wait(1).to({scaleX:0.5486,skewY:180,x:-649.8,y:-196.25,startPosition:3},0).wait(1).to({x:-644.3,y:-208.95,startPosition:4},0).wait(1).to({x:-638.35,y:-221.3,startPosition:5},0).wait(1).to({x:-632,y:-233.3,startPosition:6},0).wait(1).to({x:-625.3,y:-244.9,startPosition:7},0).wait(1).to({x:-618.15,y:-256.15,startPosition:8},0).wait(1).to({x:-610.6,y:-267.05,startPosition:9},0).wait(1).to({x:-602.6,y:-277.55,startPosition:10},0).wait(1).to({x:-594.25,y:-287.7,startPosition:11},0).wait(1).to({x:-585.45,y:-297.5,startPosition:12},0).wait(1).to({x:-576.3,y:-306.9,startPosition:13},0).wait(1).to({x:-566.7,y:-315.95,startPosition:14},0).wait(1).to({x:-556.7,y:-324.6,startPosition:15},0).wait(1).to({x:-546.3,y:-332.95,startPosition:0},0).wait(1).to({x:-535.5,y:-340.85,startPosition:1},0).wait(1).to({x:-524.25,y:-348.45,startPosition:2},0).wait(1).to({x:-512.65,y:-355.65,startPosition:3},0).wait(1).to({x:-500.6,y:-362.5,startPosition:4},0).wait(1).to({x:-488.15,y:-369,startPosition:5},0).wait(1).to({x:-475.3,y:-375.1,startPosition:6},0).wait(1).to({x:-462.05,y:-380.85,startPosition:7},0).wait(1).to({x:-448.35,y:-386.25,startPosition:8},0).wait(1).to({x:-434.3,y:-391.3,startPosition:9},0).wait(1).to({x:-419.8,y:-395.95,startPosition:10},0).wait(1).to({x:-404.9,y:-400.25,startPosition:11},0).wait(1).to({x:-389.55,y:-404.15,startPosition:12},0).wait(1).to({x:-373.85,y:-407.7,startPosition:13},0).wait(1).to({x:-357.7,y:-410.9,startPosition:14},0).wait(1).to({x:-341.15,y:-413.75,startPosition:15},0).to({_off:true},1).wait(118));

	// sheep_5
	this.instance_10 = new lib.sheep5("synched",0);
	this.instance_10.setTransform(7.6,-57.6,1,1,0,0,0,69.5,56.1);
	this.instance_10.alpha = 0;

	this.timeline.addTween(cjs.Tween.get(this.instance_10).wait(1).to({regY:56,scaleX:0.9855,scaleY:0.9855,x:-19.1,y:-68.75,alpha:0.1667,startPosition:1},0).wait(1).to({scaleX:0.971,scaleY:0.971,x:-45.6,y:-77.95,alpha:0.3333,startPosition:2},0).wait(1).to({scaleX:0.9566,scaleY:0.9566,x:-71.75,y:-85.35,alpha:0.5,startPosition:3},0).wait(1).to({scaleX:0.9421,scaleY:0.9421,x:-97.75,y:-90.85,alpha:0.6667,startPosition:4},0).wait(1).to({scaleX:0.9276,scaleY:0.9276,x:-123.4,y:-94.5,alpha:0.8333,startPosition:5},0).wait(1).to({scaleX:0.9131,scaleY:0.9131,x:-148.75,y:-96.25,alpha:1,startPosition:6},0).wait(1).to({scaleX:0.8986,scaleY:0.8986,x:-173.85,startPosition:7},0).wait(1).to({scaleX:0.8842,scaleY:0.8842,x:-198.7,y:-94.35,startPosition:8},0).wait(1).to({scaleX:0.8697,scaleY:0.8697,x:-223.3,y:-90.6,startPosition:9},0).wait(1).to({scaleX:0.8552,scaleY:0.8552,x:-247.6,y:-85,startPosition:10},0).wait(1).to({scaleX:0.8407,scaleY:0.8407,x:-271.7,y:-77.55,startPosition:11},0).wait(1).to({scaleX:0.8262,scaleY:0.8262,x:-295.55,y:-68.3,startPosition:12},0).wait(1).to({scaleX:0.8118,scaleY:0.8118,x:-319.05,y:-57.1,startPosition:13},0).wait(1).to({scaleX:0.7973,scaleY:0.7973,x:-342.35,y:-44.1,startPosition:14},0).wait(1).to({scaleX:0.7828,scaleY:0.7828,x:-365.4,y:-29.25,startPosition:15},0).wait(1).to({scaleX:0.7683,scaleY:0.7683,x:-388.15,y:-12.5,startPosition:0},0).wait(1).to({scaleX:0.7538,scaleY:0.7538,x:-414.9,y:-20,startPosition:1},0).wait(1).to({scaleX:0.7394,scaleY:0.7394,x:-441.3,y:-25.75,startPosition:2},0).wait(1).to({scaleX:0.7249,scaleY:0.7249,x:-467.4,y:-29.75,startPosition:3},0).wait(1).to({scaleX:0.7104,scaleY:0.7104,x:-493.15,y:-32.05,startPosition:4},0).wait(1).to({scaleX:0.6959,scaleY:0.6959,x:-518.55,y:-32.7,startPosition:5},0).wait(1).to({scaleX:0.6814,scaleY:0.6814,x:-543.6,y:-31.6,startPosition:6},0).wait(1).to({scaleX:0.667,scaleY:0.667,x:-568.3,y:-28.8,startPosition:7},0).wait(1).to({scaleX:0.6525,scaleY:0.6525,x:-592.7,y:-24.25,startPosition:8},0).wait(1).to({scaleX:0.638,scaleY:0.638,x:-616.75,y:-18,startPosition:9},0).wait(1).to({scaleX:0.6235,scaleY:0.6235,x:-640.5,y:-10.1,startPosition:10},0).wait(1).to({scaleX:0.609,scaleY:0.609,x:-663.9,y:-0.4,startPosition:11},0).wait(1).to({scaleX:0.5946,scaleY:0.5946,x:-687.05,y:11,startPosition:12},0).wait(1).to({scaleX:0.5801,scaleY:0.5801,x:-709.85,y:24.1,startPosition:13},0).wait(1).to({scaleX:0.5486,skewY:180,startPosition:14},0).wait(1).to({x:-693.7,y:17.3,startPosition:15},0).wait(1).to({x:-677.55,y:11.4,startPosition:0},0).wait(1).to({x:-661.3,y:6.4,startPosition:1},0).wait(1).to({x:-644.95,y:2.3,startPosition:2},0).wait(1).to({x:-628.6,y:-0.9,startPosition:3},0).wait(1).to({x:-612.15,y:-3.2,startPosition:4},0).wait(1).to({x:-595.65,y:-4.55,startPosition:5},0).wait(1).to({x:-579.05,y:-5.05,startPosition:6},0).wait(1).to({x:-562.4,y:-4.6,startPosition:7},0).wait(1).to({x:-545.65,y:-3.25,startPosition:8},0).wait(1).to({x:-528.9,y:-1.05,startPosition:9},0).wait(1).to({x:-512,y:2.1,startPosition:10},0).wait(1).to({x:-495.1,y:6.15,startPosition:11},0).wait(1).to({x:-478.1,y:11.1,startPosition:12},0).wait(1).to({x:-461,y:17,startPosition:13},0).wait(1).to({x:-443.85,y:23.75,startPosition:14},0).wait(1).to({x:-426.65,y:31.45,startPosition:15},0).wait(1).to({x:-409.35,y:39.95,startPosition:0},0).wait(1).to({x:-392,y:49.45,startPosition:1},0).wait(1).to({scaleX:0.5998,skewY:0,x:-404.2,y:45.95,startPosition:2},0).wait(1).to({scaleX:0.5971,x:-414.1,y:35.95,startPosition:3},0).wait(1).to({scaleX:0.5943,x:-424.25,y:26.6,startPosition:4},0).wait(1).to({scaleX:0.5916,x:-434.55,y:17.75,startPosition:5},0).wait(1).to({scaleX:0.5889,x:-445.05,y:9.55,startPosition:6},0).wait(1).to({scaleX:0.5861,x:-455.8,y:1.9,startPosition:7},0).wait(1).to({scaleX:0.5834,x:-466.8,y:-5.1,startPosition:8},0).wait(1).to({scaleX:0.5807,x:-478,y:-11.55,startPosition:9},0).wait(1).to({scaleX:0.578,x:-489.4,y:-17.4,startPosition:10},0).wait(1).to({scaleX:0.5752,x:-500.95,y:-22.65,startPosition:11},0).wait(1).to({scaleX:0.5725,x:-512.8,y:-27.35,startPosition:12},0).wait(1).to({scaleX:0.5698,x:-524.85,y:-31.4,startPosition:13},0).wait(1).to({scaleX:0.567,x:-537.1,y:-34.9,startPosition:14},0).wait(1).to({scaleX:0.5643,x:-549.6,y:-37.75,startPosition:15},0).wait(1).to({scaleX:0.5616,x:-562.2,y:-40.05,startPosition:0},0).wait(1).to({scaleX:0.5589,x:-575.15,y:-41.75,startPosition:1},0).wait(1).to({scaleX:0.5561,x:-588.25,y:-42.9,startPosition:2},0).wait(1).to({scaleX:0.5534,x:-601.6,y:-43.4,startPosition:3},0).wait(1).to({scaleX:0.5507,x:-615.2,y:-43.3,startPosition:4},0).wait(1).to({scaleX:0.5479,x:-628.9,y:-42.65,startPosition:5},0).wait(1).to({scaleX:0.5452,x:-642.9,y:-41.4,startPosition:6},0).wait(1).to({scaleX:0.5425,x:-657.15,y:-39.55,startPosition:7},0).wait(1).to({scaleX:0.5398,x:-671.6,y:-37.1,startPosition:8},0).wait(1).to({scaleX:0.537,x:-686.25,y:-34.05,startPosition:9},0).wait(1).to({scaleX:0.5486,skewY:180,x:-674.65,y:-38.25,startPosition:10},0).wait(1).to({x:-663.05,y:-48.2,startPosition:11},0).wait(1).to({x:-651.45,y:-57.6,startPosition:12},0).wait(1).to({x:-639.85,y:-66.35,startPosition:13},0).wait(1).to({x:-628.25,y:-74.45,startPosition:14},0).wait(1).to({x:-616.7,y:-82,startPosition:15},0).wait(1).to({x:-605.1,y:-88.9,startPosition:0},0).wait(1).to({x:-593.5,y:-95.2,startPosition:1},0).wait(1).to({x:-581.95,y:-100.9,startPosition:2},0).wait(1).to({x:-570.35,y:-105.95,startPosition:3},0).wait(1).to({x:-558.8,y:-110.4,startPosition:4},0).wait(1).to({x:-547.2,y:-114.25,startPosition:5},0).wait(1).to({x:-535.6,y:-117.45,startPosition:6},0).wait(1).to({x:-524.05,y:-120.1,startPosition:7},0).wait(1).to({x:-512.45,y:-122.1,startPosition:8},0).wait(1).to({x:-500.85,y:-123.5,startPosition:9},0).wait(1).to({x:-489.25,y:-124.3,startPosition:10},0).wait(1).to({x:-477.7,y:-124.45,startPosition:11},0).wait(1).to({x:-466.1,y:-124,startPosition:12},0).wait(1).to({x:-454.5,y:-122.95,startPosition:13},0).wait(1).to({x:-442.9,y:-121.3,startPosition:14},0).wait(1).to({scaleX:0.5947,skewY:0,x:-453.7,y:-124.65,startPosition:15},0).wait(1).to({scaleX:0.595,x:-462.85,y:-135.25,startPosition:0},0).wait(1).to({scaleX:0.5953,x:-472.15,y:-145.05,startPosition:1},0).wait(1).to({scaleX:0.5956,x:-481.6,y:-154.05,startPosition:2},0).wait(1).to({scaleX:0.5959,x:-491.3,y:-162.2,startPosition:3},0).wait(1).to({scaleX:0.5961,x:-501.2,y:-169.6,startPosition:4},0).wait(1).to({scaleX:0.5964,x:-511.3,y:-176.15,startPosition:5},0).wait(1).to({scaleX:0.5967,x:-521.6,y:-181.95,startPosition:6},0).wait(1).to({scaleX:0.597,x:-532.05,y:-186.9,startPosition:7},0).wait(1).to({scaleX:0.5972,x:-542.8,y:-191.05,startPosition:8},0).wait(1).to({scaleX:0.5975,x:-553.65,y:-194.4,startPosition:9},0).wait(1).to({scaleX:0.5978,x:-564.75,y:-197,startPosition:10},0).wait(1).to({scaleX:0.5981,x:-576.05,y:-198.75,startPosition:11},0).wait(1).to({scaleX:0.5984,x:-587.55,y:-199.7,startPosition:12},0).wait(1).to({scaleX:0.5986,x:-599.25,y:-199.85,startPosition:13},0).wait(1).to({scaleX:0.5989,x:-611.2,y:-199.15,startPosition:14},0).wait(1).to({scaleX:0.5992,x:-623.25,y:-197.7,startPosition:15},0).wait(1).to({scaleX:0.5995,x:-635.6,y:-195.45,startPosition:0},0).wait(1).to({scaleX:0.5997,x:-648.1,y:-192.35,startPosition:1},0).wait(1).to({scaleX:0.6,x:-660.85,y:-188.5,startPosition:2},0).wait(1).to({scaleX:0.5486,skewY:180,x:-649.8,y:-196.25,startPosition:3},0).wait(1).to({x:-644.3,y:-208.95,startPosition:4},0).wait(1).to({x:-638.35,y:-221.3,startPosition:5},0).wait(1).to({x:-632,y:-233.3,startPosition:6},0).wait(1).to({x:-625.3,y:-244.9,startPosition:7},0).wait(1).to({x:-618.15,y:-256.15,startPosition:8},0).wait(1).to({x:-610.6,y:-267.05,startPosition:9},0).wait(1).to({x:-602.6,y:-277.55,startPosition:10},0).wait(1).to({x:-594.25,y:-287.7,startPosition:11},0).wait(1).to({x:-585.45,y:-297.5,startPosition:12},0).wait(1).to({x:-576.3,y:-306.9,startPosition:13},0).wait(1).to({x:-566.7,y:-315.95,startPosition:14},0).wait(1).to({x:-556.7,y:-324.6,startPosition:15},0).wait(1).to({x:-546.3,y:-332.95,startPosition:0},0).wait(1).to({x:-535.5,y:-340.85,startPosition:1},0).wait(1).to({x:-524.25,y:-348.45,startPosition:2},0).wait(1).to({x:-512.65,y:-355.65,startPosition:3},0).wait(1).to({x:-500.6,y:-362.5,startPosition:4},0).wait(1).to({x:-488.15,y:-369,startPosition:5},0).wait(1).to({x:-475.3,y:-375.1,startPosition:6},0).wait(1).to({x:-462.05,y:-380.85,startPosition:7},0).wait(1).to({x:-448.35,y:-386.25,startPosition:8},0).wait(1).to({x:-434.3,y:-391.3,startPosition:9},0).wait(1).to({x:-419.8,y:-395.95,startPosition:10},0).wait(1).to({x:-404.9,y:-400.25,startPosition:11},0).wait(1).to({x:-389.55,y:-404.15,startPosition:12},0).wait(1).to({x:-373.85,y:-407.7,startPosition:13},0).wait(1).to({x:-357.7,y:-410.9,startPosition:14},0).wait(1).to({x:-341.15,y:-413.75,startPosition:15},0).to({_off:true},1).wait(129));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-782.6,-472,915.7,579.8);


(lib.sheepjumps = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// sheep_4
	this.instance = new lib.sheep4("synched",0);
	this.instance.setTransform(393.9,155.2,0.9999,0.9999,0,0,0,57,43.6);
	this.instance.alpha = 0;
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(90).to({_off:false},0).wait(1).to({regX:69.5,regY:56,scaleX:0.9578,scaleY:0.9578,x:251.2,y:105.05,startPosition:1},0).wait(1).to({scaleX:0.9156,scaleY:0.9156,x:96.05,y:42.5,startPosition:2},0).wait(1).to({scaleX:0.9052,scaleY:0.9052,x:85.55,y:38.25,alpha:0.1,startPosition:3},0).wait(1).to({scaleX:0.8947,scaleY:0.8947,x:75.15,y:34,alpha:0.2,startPosition:4},0).wait(1).to({scaleX:0.8843,scaleY:0.8843,x:64.7,y:29.7,alpha:0.3,startPosition:5},0).wait(1).to({scaleX:0.8738,scaleY:0.8738,x:54.3,y:25.5,alpha:0.4,startPosition:6},0).wait(1).to({scaleX:0.8634,scaleY:0.8634,x:43.85,y:21.2,alpha:0.5,startPosition:7},0).wait(1).to({scaleX:0.8529,scaleY:0.8529,x:33.45,y:16.9,alpha:0.6,startPosition:8},0).wait(1).to({scaleX:0.8425,scaleY:0.8425,x:23,y:12.7,alpha:0.7,startPosition:9},0).wait(1).to({scaleX:0.832,scaleY:0.832,x:12.55,y:8.4,alpha:0.8,startPosition:10},0).wait(1).to({scaleX:0.8216,scaleY:0.8216,x:2.1,y:4.15,alpha:0.9,startPosition:11},0).wait(1).to({scaleX:0.8111,scaleY:0.8111,x:-8.35,y:-0.15,alpha:1,startPosition:12},0).wait(1).to({scaleX:0.8007,scaleY:0.8007,x:-34.95,y:-11.9,startPosition:13},0).wait(1).to({scaleX:0.7902,scaleY:0.7902,x:-60,y:-21.75,startPosition:14},0).wait(1).to({scaleX:0.7798,scaleY:0.7798,x:-83.65,y:-30,startPosition:15},0).wait(1).to({scaleX:0.7693,scaleY:0.7693,x:-106.25,y:-36.75,startPosition:0},0).wait(1).to({scaleX:0.7589,scaleY:0.7589,x:-127.8,y:-42.2,startPosition:1},0).wait(1).to({scaleX:0.7484,scaleY:0.7484,x:-148.55,y:-46.45,startPosition:2},0).wait(1).to({scaleX:0.738,scaleY:0.738,x:-168.5,y:-49.55,startPosition:3},0).wait(1).to({scaleX:0.7275,scaleY:0.7275,x:-187.85,y:-51.65,startPosition:4},0).wait(1).to({scaleX:0.7171,scaleY:0.7171,x:-206.55,y:-52.7,startPosition:5},0).wait(1).to({scaleX:0.7066,scaleY:0.7066,x:-224.8,y:-52.8,startPosition:6},0).wait(1).to({scaleX:0.6962,scaleY:0.6962,x:-242.5,y:-51.95,startPosition:7},0).wait(1).to({scaleX:0.6857,scaleY:0.6857,x:-259.85,y:-50.2,startPosition:8},0).wait(1).to({scaleX:0.6753,scaleY:0.6753,x:-276.7,y:-47.55,startPosition:9},0).wait(1).to({scaleX:0.6648,scaleY:0.6648,x:-293.3,y:-43.95,startPosition:10},0).wait(1).to({scaleX:0.6544,scaleY:0.6544,x:-309.5,y:-39.5,startPosition:11},0).wait(1).to({scaleX:0.6439,scaleY:0.6439,x:-325.5,y:-34.15,startPosition:12},0).wait(1).to({scaleX:0.6335,scaleY:0.6335,x:-341.15,y:-27.85,startPosition:13},0).wait(1).to({scaleX:0.623,scaleY:0.623,x:-356.65,y:-20.6,startPosition:14},0).wait(1).to({scaleX:0.6126,scaleY:0.6126,x:-371.95,y:-12.4,startPosition:15},0).wait(1).to({scaleX:0.6021,scaleY:0.6021,x:-387.05,y:-3.15,startPosition:0},0).wait(1).to({scaleX:0.5917,scaleY:0.5917,x:-402,y:7.2,startPosition:1},0).wait(1).to({scaleX:0.5812,scaleY:0.5812,x:-416.8,y:18.65,startPosition:2},0).wait(1).to({scaleX:0.5708,scaleY:0.5708,x:-431.55,y:31.3,startPosition:3},0).wait(1).to({scaleX:0.5603,scaleY:0.5603,x:-446.2,y:45.3,startPosition:4},0).wait(1).to({scaleX:0.5499,scaleY:0.5499,x:-460.85,y:60.7,startPosition:5},0).wait(1).to({scaleX:0.5394,scaleY:0.5394,x:-475.45,y:77.7,startPosition:6},0).wait(1).to({scaleX:0.529,scaleY:0.529,x:-490.15,y:96.55,startPosition:7},0).wait(1).to({scaleX:0.5185,scaleY:0.5185,x:-504.9,y:117.45,startPosition:8},0).wait(1).to({scaleX:0.5081,scaleY:0.5081,x:-519.9,y:140.7,startPosition:9},0).wait(1).to({alpha:0.8333,startPosition:10},0).wait(1).to({alpha:0.6667,startPosition:11},0).wait(1).to({alpha:0.5,startPosition:12},0).wait(1).to({alpha:0.3333,startPosition:13},0).wait(1).to({alpha:0.1667,startPosition:14},0).wait(1).to({alpha:0,startPosition:15},0).wait(1));

	// sheep_3
	this.instance_1 = new lib.sheep3("synched",0);
	this.instance_1.setTransform(393.95,155.15,0.9999,0.9999,0,0,0,57.1,43.6);
	this.instance_1.alpha = 0;
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(60).to({_off:false},0).wait(1).to({regX:69.5,regY:56,scaleX:0.9578,scaleY:0.9578,x:251.15,y:105,startPosition:1},0).wait(1).to({scaleX:0.9156,scaleY:0.9156,x:96,y:42.45,startPosition:2},0).wait(1).to({scaleX:0.9052,scaleY:0.9052,x:85.5,y:38.2,alpha:0.1,startPosition:3},0).wait(1).to({scaleX:0.8947,scaleY:0.8947,x:75.1,y:33.95,alpha:0.2,startPosition:4},0).wait(1).to({scaleX:0.8843,scaleY:0.8843,x:64.65,y:29.65,alpha:0.3,startPosition:5},0).wait(1).to({scaleX:0.8738,scaleY:0.8738,x:54.3,y:25.45,alpha:0.4,startPosition:6},0).wait(1).to({scaleX:0.8634,scaleY:0.8634,x:43.8,y:21.15,alpha:0.5,startPosition:7},0).wait(1).to({scaleX:0.8529,scaleY:0.8529,x:33.4,y:16.85,alpha:0.6,startPosition:8},0).wait(1).to({scaleX:0.8425,scaleY:0.8425,x:22.95,y:12.65,alpha:0.7,startPosition:9},0).wait(1).to({scaleX:0.832,scaleY:0.832,x:12.5,y:8.35,alpha:0.8,startPosition:10},0).wait(1).to({scaleX:0.8216,scaleY:0.8216,x:2.05,y:4.1,alpha:0.9,startPosition:11},0).wait(1).to({scaleX:0.8111,scaleY:0.8111,x:-8.4,y:-0.2,alpha:1,startPosition:12},0).wait(1).to({scaleX:0.8007,scaleY:0.8007,x:-35,y:-11.9,startPosition:13},0).wait(1).to({scaleX:0.7902,scaleY:0.7902,x:-60.05,y:-21.8,startPosition:14},0).wait(1).to({scaleX:0.7798,scaleY:0.7798,x:-83.7,y:-30.05,startPosition:15},0).wait(1).to({scaleX:0.7693,scaleY:0.7693,x:-106.3,y:-36.75,startPosition:0},0).wait(1).to({scaleX:0.7589,scaleY:0.7589,x:-127.85,y:-42.25,startPosition:1},0).wait(1).to({scaleX:0.7484,scaleY:0.7484,x:-148.6,y:-46.5,startPosition:2},0).wait(1).to({scaleX:0.738,scaleY:0.738,x:-168.55,y:-49.6,startPosition:3},0).wait(1).to({scaleX:0.7275,scaleY:0.7275,x:-187.9,y:-51.65,startPosition:4},0).wait(1).to({scaleX:0.7171,scaleY:0.7171,x:-206.6,y:-52.75,startPosition:5},0).wait(1).to({scaleX:0.7066,scaleY:0.7066,x:-224.85,y:-52.85,startPosition:6},0).wait(1).to({scaleX:0.6962,scaleY:0.6962,x:-242.55,y:-51.95,startPosition:7},0).wait(1).to({scaleX:0.6857,scaleY:0.6857,x:-259.85,y:-50.25,startPosition:8},0).wait(1).to({scaleX:0.6753,scaleY:0.6753,x:-276.75,y:-47.6,startPosition:9},0).wait(1).to({scaleX:0.6648,scaleY:0.6648,x:-293.35,y:-44,startPosition:10},0).wait(1).to({scaleX:0.6544,scaleY:0.6544,x:-309.55,y:-39.55,startPosition:11},0).wait(1).to({scaleX:0.6439,scaleY:0.6439,x:-325.55,y:-34.2,startPosition:12},0).wait(1).to({scaleX:0.6335,scaleY:0.6335,x:-341.2,y:-27.9,startPosition:13},0).wait(1).to({scaleX:0.623,scaleY:0.623,x:-356.7,y:-20.6,startPosition:14},0).wait(1).to({scaleX:0.6126,scaleY:0.6126,x:-372,y:-12.4,startPosition:15},0).wait(1).to({scaleX:0.6021,scaleY:0.6021,x:-387.05,y:-3.2,startPosition:0},0).wait(1).to({scaleX:0.5917,scaleY:0.5917,x:-402.05,y:7.2,startPosition:1},0).wait(1).to({scaleX:0.5812,scaleY:0.5812,x:-416.8,y:18.6,startPosition:2},0).wait(1).to({scaleX:0.5708,scaleY:0.5708,x:-431.55,y:31.3,startPosition:3},0).wait(1).to({scaleX:0.5603,scaleY:0.5603,x:-446.2,y:45.25,startPosition:4},0).wait(1).to({scaleX:0.5499,scaleY:0.5499,x:-460.85,y:60.7,startPosition:5},0).wait(1).to({scaleX:0.5394,scaleY:0.5394,x:-475.45,y:77.7,startPosition:6},0).wait(1).to({scaleX:0.529,scaleY:0.529,x:-490.15,y:96.5,startPosition:7},0).wait(1).to({scaleX:0.5185,scaleY:0.5185,x:-504.95,y:117.4,startPosition:8},0).wait(1).to({scaleX:0.5081,scaleY:0.5081,x:-519.9,y:140.65,startPosition:9},0).wait(1).to({alpha:0.8333,startPosition:10},0).wait(1).to({alpha:0.6667,startPosition:11},0).wait(1).to({alpha:0.5,startPosition:12},0).wait(1).to({alpha:0.3333,startPosition:13},0).wait(1).to({alpha:0.1667,startPosition:14},0).wait(1).to({alpha:0,startPosition:15},0).to({_off:true},1).wait(30));

	// sheep_2
	this.instance_2 = new lib.sheep2("synched",0);
	this.instance_2.setTransform(393.9,155.1,0.9999,0.9999,0,0,0,57.1,43.6);
	this.instance_2.alpha = 0;
	this.instance_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(30).to({_off:false},0).wait(1).to({regX:69.5,regY:56,scaleX:0.9578,scaleY:0.9578,x:251.1,y:104.95,startPosition:1},0).wait(1).to({scaleX:0.9156,scaleY:0.9156,x:95.95,y:42.4,startPosition:2},0).wait(1).to({scaleX:0.9052,scaleY:0.9052,x:85.5,y:38.2,alpha:0.1,startPosition:3},0).wait(1).to({scaleX:0.8947,scaleY:0.8947,x:75.05,y:33.9,alpha:0.2,startPosition:4},0).wait(1).to({scaleX:0.8843,scaleY:0.8843,x:64.6,y:29.6,alpha:0.3,startPosition:5},0).wait(1).to({scaleX:0.8738,scaleY:0.8738,x:54.25,y:25.4,alpha:0.4,startPosition:6},0).wait(1).to({scaleX:0.8634,scaleY:0.8634,x:43.75,y:21.1,alpha:0.5,startPosition:7},0).wait(1).to({scaleX:0.8529,scaleY:0.8529,x:33.35,y:16.85,alpha:0.6,startPosition:8},0).wait(1).to({scaleX:0.8425,scaleY:0.8425,x:22.9,y:12.6,alpha:0.7,startPosition:9},0).wait(1).to({scaleX:0.832,scaleY:0.832,x:12.5,y:8.3,alpha:0.8,startPosition:10},0).wait(1).to({scaleX:0.8216,scaleY:0.8216,x:2,y:4.05,alpha:0.9,startPosition:11},0).wait(1).to({scaleX:0.8111,scaleY:0.8111,x:-8.45,y:-0.25,alpha:1,startPosition:12},0).wait(1).to({scaleX:0.8007,scaleY:0.8007,x:-35.05,y:-11.95,startPosition:13},0).wait(1).to({scaleX:0.7902,scaleY:0.7902,x:-60.1,y:-21.85,startPosition:14},0).wait(1).to({scaleX:0.7798,scaleY:0.7798,x:-83.75,y:-30.1,startPosition:15},0).wait(1).to({scaleX:0.7693,scaleY:0.7693,x:-106.35,y:-36.8,startPosition:0},0).wait(1).to({scaleX:0.7589,scaleY:0.7589,x:-127.9,y:-42.3,startPosition:1},0).wait(1).to({scaleX:0.7484,scaleY:0.7484,x:-148.65,y:-46.55,startPosition:2},0).wait(1).to({scaleX:0.738,scaleY:0.738,x:-168.6,y:-49.6,startPosition:3},0).wait(1).to({scaleX:0.7275,scaleY:0.7275,x:-187.95,y:-51.7,startPosition:4},0).wait(1).to({scaleX:0.7171,scaleY:0.7171,x:-206.65,y:-52.8,startPosition:5},0).wait(1).to({scaleX:0.7066,scaleY:0.7066,x:-224.85,y:-52.9,startPosition:6},0).wait(1).to({scaleX:0.6962,scaleY:0.6962,x:-242.55,y:-52,startPosition:7},0).wait(1).to({scaleX:0.6857,scaleY:0.6857,x:-259.9,y:-50.25,startPosition:8},0).wait(1).to({scaleX:0.6753,scaleY:0.6753,x:-276.8,y:-47.6,startPosition:9},0).wait(1).to({scaleX:0.6648,scaleY:0.6648,x:-293.35,y:-44,startPosition:10},0).wait(1).to({scaleX:0.6544,scaleY:0.6544,x:-309.6,y:-39.55,startPosition:11},0).wait(1).to({scaleX:0.6439,scaleY:0.6439,x:-325.55,y:-34.2,startPosition:12},0).wait(1).to({scaleX:0.6335,scaleY:0.6335,x:-341.25,y:-27.95,startPosition:13},0).wait(1).to({scaleX:0.623,scaleY:0.623,x:-356.75,y:-20.65,startPosition:14},0).wait(1).to({scaleX:0.6126,scaleY:0.6126,x:-372.05,y:-12.45,startPosition:15},0).wait(1).to({scaleX:0.6021,scaleY:0.6021,x:-387.1,y:-3.2,startPosition:0},0).wait(1).to({scaleX:0.5917,scaleY:0.5917,x:-402.05,y:7.15,startPosition:1},0).wait(1).to({scaleX:0.5812,scaleY:0.5812,x:-416.85,y:18.6,startPosition:2},0).wait(1).to({scaleX:0.5708,scaleY:0.5708,x:-431.6,y:31.25,startPosition:3},0).wait(1).to({scaleX:0.5603,scaleY:0.5603,x:-446.25,y:45.25,startPosition:4},0).wait(1).to({scaleX:0.5499,scaleY:0.5499,x:-460.9,y:60.65,startPosition:5},0).wait(1).to({scaleX:0.5394,scaleY:0.5394,x:-475.5,y:77.65,startPosition:6},0).wait(1).to({scaleX:0.529,scaleY:0.529,x:-490.2,y:96.5,startPosition:7},0).wait(1).to({scaleX:0.5185,scaleY:0.5185,x:-504.95,y:117.4,startPosition:8},0).wait(1).to({scaleX:0.5081,scaleY:0.5081,x:-519.95,y:140.65,startPosition:9},0).wait(1).to({alpha:0.8333,startPosition:10},0).wait(1).to({alpha:0.6667,startPosition:11},0).wait(1).to({alpha:0.5,startPosition:12},0).wait(1).to({alpha:0.3333,startPosition:13},0).wait(1).to({alpha:0.1667,startPosition:14},0).wait(1).to({alpha:0,startPosition:15},0).to({_off:true},1).wait(60));

	// sheep_1
	this.instance_3 = new lib.sheep1("synched",0);
	this.instance_3.setTransform(393.9,155.2,0.9999,0.9999,0,0,0,57.3,43.9);
	this.instance_3.alpha = 0;

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(1).to({regX:69.5,regY:56,scaleX:0.9578,scaleY:0.9578,x:250.9,y:104.75,startPosition:1},0).wait(1).to({scaleX:0.9156,scaleY:0.9156,x:95.75,y:42.2,startPosition:2},0).wait(1).to({scaleX:0.9052,scaleY:0.9052,x:85.3,y:38,alpha:0.1,startPosition:3},0).wait(1).to({scaleX:0.8947,scaleY:0.8947,x:74.9,y:33.7,alpha:0.2,startPosition:4},0).wait(1).to({scaleX:0.8843,scaleY:0.8843,x:64.4,y:29.45,alpha:0.3,startPosition:5},0).wait(1).to({scaleX:0.8738,scaleY:0.8738,x:54.05,y:25.2,alpha:0.4,startPosition:6},0).wait(1).to({scaleX:0.8634,scaleY:0.8634,x:43.6,y:20.95,alpha:0.5,startPosition:7},0).wait(1).to({scaleX:0.8529,scaleY:0.8529,x:33.2,y:16.65,alpha:0.6,startPosition:8},0).wait(1).to({scaleX:0.8425,scaleY:0.8425,x:22.75,y:12.45,alpha:0.7,startPosition:9},0).wait(1).to({scaleX:0.832,scaleY:0.832,x:12.3,y:8.15,alpha:0.8,startPosition:10},0).wait(1).to({scaleX:0.8216,scaleY:0.8216,x:1.85,y:3.9,alpha:0.9,startPosition:11},0).wait(1).to({scaleX:0.8111,scaleY:0.8111,x:-8.6,y:-0.4,alpha:1,startPosition:12},0).wait(1).to({scaleX:0.8007,scaleY:0.8007,x:-35.2,y:-12.1,startPosition:13},0).wait(1).to({scaleX:0.7902,scaleY:0.7902,x:-60.25,y:-22,startPosition:14},0).wait(1).to({scaleX:0.7798,scaleY:0.7798,x:-83.9,y:-30.25,startPosition:15},0).wait(1).to({scaleX:0.7693,scaleY:0.7693,x:-106.5,y:-36.95,startPosition:0},0).wait(1).to({scaleX:0.7589,scaleY:0.7589,x:-128.05,y:-42.45,startPosition:1},0).wait(1).to({scaleX:0.7484,scaleY:0.7484,x:-148.8,y:-46.7,startPosition:2},0).wait(1).to({scaleX:0.738,scaleY:0.738,x:-168.75,y:-49.75,startPosition:3},0).wait(1).to({scaleX:0.7275,scaleY:0.7275,x:-188.1,y:-51.85,startPosition:4},0).wait(1).to({scaleX:0.7171,scaleY:0.7171,x:-206.8,y:-52.9,startPosition:5},0).wait(1).to({scaleX:0.7066,scaleY:0.7066,x:-225,y:-53.05,startPosition:6},0).wait(1).to({scaleX:0.6962,scaleY:0.6962,x:-242.7,y:-52.15,startPosition:7},0).wait(1).to({scaleX:0.6857,scaleY:0.6857,x:-260.05,y:-50.4,startPosition:8},0).wait(1).to({scaleX:0.6753,scaleY:0.6753,x:-276.9,y:-47.75,startPosition:9},0).wait(1).to({scaleX:0.6648,scaleY:0.6648,x:-293.5,y:-44.15,startPosition:10},0).wait(1).to({scaleX:0.6544,scaleY:0.6544,x:-309.7,y:-39.7,startPosition:11},0).wait(1).to({scaleX:0.6439,scaleY:0.6439,x:-325.7,y:-34.35,startPosition:12},0).wait(1).to({scaleX:0.6335,scaleY:0.6335,x:-341.35,y:-28.05,startPosition:13},0).wait(1).to({scaleX:0.623,scaleY:0.623,x:-356.85,y:-20.8,startPosition:14},0).wait(1).to({scaleX:0.6126,scaleY:0.6126,x:-372.15,y:-12.55,startPosition:15},0).wait(1).to({scaleX:0.6021,scaleY:0.6021,x:-387.2,y:-3.35,startPosition:0},0).wait(1).to({scaleX:0.5917,scaleY:0.5917,x:-402.2,y:7.05,startPosition:1},0).wait(1).to({scaleX:0.5812,scaleY:0.5812,x:-416.95,y:18.5,startPosition:2},0).wait(1).to({scaleX:0.5708,scaleY:0.5708,x:-431.7,y:31.15,startPosition:3},0).wait(1).to({scaleX:0.5603,scaleY:0.5603,x:-446.35,y:45.1,startPosition:4},0).wait(1).to({scaleX:0.5499,scaleY:0.5499,x:-461,y:60.55,startPosition:5},0).wait(1).to({scaleX:0.5394,scaleY:0.5394,x:-475.6,y:77.55,startPosition:6},0).wait(1).to({scaleX:0.529,scaleY:0.529,x:-490.3,y:96.35,startPosition:7},0).wait(1).to({scaleX:0.5185,scaleY:0.5185,x:-505.05,y:117.3,startPosition:8},0).wait(1).to({scaleX:0.5081,scaleY:0.5081,x:-520.05,y:140.55,startPosition:9},0).wait(1).to({alpha:0.8333,startPosition:10},0).wait(1).to({alpha:0.6667,startPosition:11},0).wait(1).to({alpha:0.5,startPosition:12},0).wait(1).to({alpha:0.3333,startPosition:13},0).wait(1).to({alpha:0.1667,startPosition:14},0).wait(1).to({alpha:0,startPosition:15},0).to({_off:true},1).wait(90));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-583.6,-124.8,1115.6,393);


(lib.Scene_1_sheep_vortex = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// sheep_vortex
	this.instance = new lib.sheepspiral("synched",0);
	this.instance.setTransform(839.45,305.5,0.9999,0.9999,0,0,0,-1.9,-4.9);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(462).to({_off:false},0).wait(240));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_sheep = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// sheep
	this.instance = new lib.sheepjumps("synched",0);
	this.instance.setTransform(740.8,228.8);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(326).to({_off:false},0).wait(139));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_dream_background = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// dream_background
	this.instance = new lib.dreamfadein("synched",0);
	this.instance.setTransform(717.45,231.15);

	this.instance_1 = new lib.dreambackground();
	this.instance_1.setTransform(388,56,1.0705,1.0705);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance}]},291).to({state:[{t:this.instance_1}]},35).wait(413));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


// stage content:
(lib.keves = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	this.actionFrames = [0,1,738];
	this.streamSoundSymbolsList[1] = [{id:"יונירכטרהכבשהשישהעשרלילהטוב",startFrame:1,endFrame:739,loop:1,offset:0}];
	this.___GetDepth___ = function(obj) {
		var depth = obj.depth;
		var cameraObj = this.___camera___instance;
		if(cameraObj && cameraObj.depth && obj.isAttachedToCamera)
		{
			depth += depth + cameraObj.depth;
		}
		return depth;
		}
	this.___needSorting___ = function() {
		for (var i = 0; i < this.numChildren - 1; i++)
		{
			var prevDepth = this.___GetDepth___(this.getChildAt(i));
			var nextDepth = this.___GetDepth___(this.getChildAt(i + 1));
			if (prevDepth < nextDepth)
				return true;
		}
		return false;
	}
	this.___sortFunction___ = function(obj1, obj2) {
		return (this.exportRoot.___GetDepth___(obj2) - this.exportRoot.___GetDepth___(obj1));
	}
	this.on('tick', function (event){
		var curTimeline = event.currentTarget;
		if (curTimeline.___needSorting___()){
			this.sortChildren(curTimeline.___sortFunction___);
		}
	});

	// timeline functions:
	this.frame_0 = function() {
		this.clearAllSoundStreams();
		 
		this.playbutton = this.play_button.playbutton;
		this.stop();
		
		/* Click to Go to Frame and Play
		Clicking on the specified symbol instance moves the playhead to the specified frame in the timeline and continues playback from that frame.
		Can be used on the main timeline or on movie clip timelines.
		
		Instructions:
		1. Replace the number 5 in the code below with the frame number you would like the playhead to move to when the symbol instance is clicked.
		2.Frame numbers in EaselJS start at 0 instead of 1
		*/
		
		this.playbutton.addEventListener("click", playAnimation.bind(this));
		
		function playAnimation()
		{
			this.gotoAndPlay(1);
		}
	}
	this.frame_1 = function() {
		var soundInstance = playSound("יונירכטרהכבשהשישהעשרלילהטוב",0);
		this.InsertIntoSoundStreamData(soundInstance,1,739,1);
	}
	this.frame_738 = function() {
		this.___loopingOver___ = true;
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1).call(this.frame_1).wait(737).call(this.frame_738).wait(1));

	// Camera
	this.___camera___instance = new lib.___Camera___();
	this.___camera___instance.name = "___camera___instance";
	this.___camera___instance.setTransform(640,360);
	this.___camera___instance.depth = 0;
	this.___camera___instance._off = true;
	this.___camera___instance.visible = false;

	this.timeline.addTween(cjs.Tween.get(this.___camera___instance).wait(1).to({_off:false},0).wait(14).to({scaleX:0.9989,scaleY:0.9989,x:639.4595,y:360.0209},0).wait(1).to({scaleX:0.9933,scaleY:0.9933,x:636.7299,y:360.1265},0).wait(1).to({scaleX:0.9877,scaleY:0.9877,x:634.0023,y:360.232},0).wait(1).to({scaleX:0.982,scaleY:0.982,x:631.2768,y:360.3374},0).wait(1).to({scaleX:0.9764,scaleY:0.9764,x:628.5535,y:360.4428},0).wait(1).to({scaleX:0.9708,scaleY:0.9708,x:625.8301,y:360.5481},0).wait(1).to({scaleX:0.9652,scaleY:0.9652,x:623.1109,y:360.6533},0).wait(1).to({scaleX:0.9596,scaleY:0.9596,x:620.3918,y:360.7584},0).wait(1).to({scaleX:0.9541,scaleY:0.9541,x:617.6747,y:360.8635},0).wait(1).to({scaleX:0.9485,scaleY:0.9485,x:614.9598,y:360.9686},0).wait(1).to({scaleX:0.9429,scaleY:0.9429,x:612.2469,y:361.0735},0).wait(1).to({scaleX:0.9373,scaleY:0.9373,x:609.5341,y:361.1784},0).wait(1).to({scaleX:0.9317,scaleY:0.9317,x:606.8254,y:361.2832},0).wait(1).to({scaleX:0.9262,scaleY:0.9262,x:604.1168,y:361.388},0).wait(1).to({scaleX:0.9206,scaleY:0.9206,x:601.4102,y:361.4927},0).wait(1).to({scaleX:0.915,scaleY:0.915,x:598.7058,y:361.5973},0).wait(1).to({scaleX:0.9095,scaleY:0.9095,x:596.0035,y:361.7018},0).wait(1).to({scaleX:0.9039,scaleY:0.9039,x:593.3032,y:361.8062},0).wait(1).to({scaleX:0.8983,scaleY:0.8983,x:590.603,y:361.9107},0).wait(1).to({scaleX:0.8928,scaleY:0.8928,x:587.907,y:362.015},0).wait(1).to({scaleX:0.8873,scaleY:0.8873,x:585.2109,y:362.1192},0).wait(1).to({scaleX:0.8817,scaleY:0.8817,x:582.517,y:362.2234},0).wait(1).to({scaleX:0.8762,scaleY:0.8762,x:579.8252,y:362.3276},0).wait(1).to({scaleX:0.8706,scaleY:0.8706,x:577.1334,y:362.4317},0).wait(1).to({scaleX:0.8651,scaleY:0.8651,x:574.4458,y:362.5356},0).wait(1).to({scaleX:0.8596,scaleY:0.8596,x:571.7581,y:362.6396},0).wait(1).to({scaleX:0.854,scaleY:0.854,x:569.0726,y:362.7435},0).wait(1).to({scaleX:0.8485,scaleY:0.8485,x:566.3913,y:362.8472},0).wait(1).to({scaleX:0.843,scaleY:0.843,x:563.7079,y:362.951},0).wait(1).to({scaleX:0.8375,scaleY:0.8375,x:561.0287,y:363.0546},0).wait(1).to({scaleX:0.832,scaleY:0.832,x:558.3516,y:363.1582},0).wait(1).to({scaleX:0.8265,scaleY:0.8265,x:555.6745,y:363.2617},0).wait(1).to({scaleX:0.821,scaleY:0.821,x:553.0016,y:363.3651},0).wait(1).to({scaleX:0.8155,scaleY:0.8155,x:550.3287,y:363.4685},0).wait(1).to({scaleX:0.81,scaleY:0.81,x:547.6579,y:363.5718},0).wait(1).to({scaleX:0.8045,scaleY:0.8045,x:544.9871,y:363.6751},0).wait(1).to({scaleX:0.799,scaleY:0.799,x:542.3206,y:363.7782},0).wait(1).to({scaleX:0.7935,scaleY:0.7935,x:539.6561,y:363.8813},0).wait(1).to({scaleX:0.788,scaleY:0.788,x:536.9916,y:363.9844},0).wait(1).to({scaleX:0.7825,scaleY:0.7825,x:534.3292,y:364.0873},0).wait(1).to({scaleX:0.7771,scaleY:0.7771,x:531.6689,y:364.1902},0).wait(1).to({scaleX:0.7716,scaleY:0.7716,x:529.0108,y:364.2931},0).wait(1).to({scaleX:0.7661,scaleY:0.7661,x:526.3547,y:364.3958},0).wait(1).to({scaleX:0.7607,scaleY:0.7607,x:523.6986,y:364.4985},0).wait(1).to({scaleX:0.7552,scaleY:0.7552,x:521.0447,y:364.6012},0).wait(1).to({scaleX:0.7498,scaleY:0.7498,x:518.3949,y:364.7037},0).wait(1).to({scaleX:0.7443,scaleY:0.7443,x:515.7451,y:364.8062},0).wait(1).to({scaleX:0.7389,scaleY:0.7389,x:513.0975,y:364.9086},0).wait(1).to({scaleX:0.7334,scaleY:0.7334,x:510.4498,y:365.011},0).wait(1).to({scaleX:0.728,scaleY:0.728,x:507.8064,y:365.1132},0).wait(1).to({scaleX:0.7225,scaleY:0.7225,x:505.1629,y:365.2155},0).wait(1).to({scaleX:0.7171,scaleY:0.7171,x:502.5237,y:365.3176},0).wait(1).to({scaleX:0.7117,scaleY:0.7117,x:499.8844,y:365.4197},0).wait(1).to({scaleX:0.7062,scaleY:0.7062,x:497.2473,y:365.5217},0).wait(1).to({scaleX:0.7008,scaleY:0.7008,x:494.6101,y:365.6237},0).wait(1).to({scaleX:0.6954,scaleY:0.6954,x:491.9772,y:365.7255},0).wait(1).to({scaleX:0.69,scaleY:0.69,x:489.3464,y:365.8273},0).wait(1).to({scaleX:0.6846,scaleY:0.6846,x:486.7155,y:365.929},0).wait(1).to({scaleX:0.6792,scaleY:0.6792,x:484.0868,y:366.0307},0).wait(1).to({scaleX:0.6738,scaleY:0.6738,x:481.4602,y:366.1323},0).wait(1).to({scaleX:0.6684,scaleY:0.6684,x:478.8356,y:366.2338},0).wait(1).to({scaleX:0.663,scaleY:0.663,x:476.2132,y:366.3353},0).wait(1).to({scaleX:0.6576,scaleY:0.6576,x:473.5908,y:366.4367},0).wait(1).to({scaleX:0.6522,scaleY:0.6522,x:470.9705,y:366.5381},0).wait(1).to({scaleX:0.6468,scaleY:0.6468,x:468.3544,y:366.6392},0).wait(1).to({scaleX:0.6414,scaleY:0.6414,x:465.7382,y:366.7404},0).wait(1).to({scaleX:0.636,scaleY:0.636,x:463.1221,y:366.8416},0).wait(1).to({scaleX:0.6306,scaleY:0.6306,x:460.5102,y:366.9427},0).wait(1).to({scaleX:0.6253,scaleY:0.6253,x:457.9004,y:367.0436},0).wait(1).to({scaleX:0.6199,scaleY:0.6199,x:455.2906,y:367.1445},0).wait(1).to({scaleX:0.6145,scaleY:0.6145,x:452.6829,y:367.2454},0).wait(1).to({scaleX:0.6092,scaleY:0.6092,x:450.0794,y:367.3461},0).wait(1).to({scaleX:0.6038,scaleY:0.6038,x:447.4738,y:367.4469},0).wait(1).to({scaleX:0.5985,scaleY:0.5985,x:444.8724,y:367.5475},0).wait(1).to({scaleX:0.5931,scaleY:0.5931,x:442.2731,y:367.6481},0).wait(1).to({scaleX:0.5878,scaleY:0.5878,x:439.6739,y:367.7486},0).wait(1).to({scaleX:0.5824,scaleY:0.5824,x:437.0788,y:367.849},0).wait(1).to({scaleX:0.5771,scaleY:0.5771,x:434.4837,y:367.9494},0).wait(1).to({scaleX:0.5717,scaleY:0.5717,x:431.8907,y:368.0497},0).wait(1).to({scaleX:0.5664,scaleY:0.5664,x:429.2977,y:368.15},0).wait(1).to({scaleX:0.5611,scaleY:0.5611,x:426.7089,y:368.2501},0).wait(1).to({scaleX:0.5558,scaleY:0.5558,x:424.1223,y:368.3501},0).wait(1).to({scaleX:0.5504,scaleY:0.5504,x:421.5356,y:368.4502},0).wait(1).to({scaleX:0.5451,scaleY:0.5451,x:418.951,y:368.5502},0).wait(1).to({scaleX:0.5398,scaleY:0.5398,x:416.3686,y:368.65},0).wait(1).to({scaleX:0.5345,scaleY:0.5345,x:413.7882,y:368.7499},0).wait(1).to({scaleX:0.5292,scaleY:0.5292,x:411.2099,y:368.8496},0).wait(1).to({scaleX:0.5239,scaleY:0.5239,x:408.6317,y:368.9493},0).wait(1).to({scaleX:0.5186,scaleY:0.5186,x:406.0576,y:369.0489},0).wait(1).to({scaleX:0.5133,scaleY:0.5133,x:403.4836,y:369.1484},0).wait(1).to({scaleX:0.508,scaleY:0.508,x:400.9116,y:369.2479},0).wait(1).to({scaleX:0.5027,scaleY:0.5027,x:398.3418,y:369.3473},0).wait(1).to({scaleX:0.4974,scaleY:0.4974,x:395.774,y:369.4466},0).wait(1).to({scaleX:0.4921,scaleY:0.4921,x:393.2063,y:369.546},0).wait(1).to({scaleX:0.4869,scaleY:0.4869,x:390.6428,y:369.6451},0).wait(1).to({scaleX:0.4816,scaleY:0.4816,x:388.0792,y:369.7443},0).wait(1).to({scaleX:0.4763,scaleY:0.4763,x:385.5178,y:369.8434},0).wait(1).to({scaleX:0.4711,scaleY:0.4711,x:382.9584,y:369.9423},0).wait(1).to({scaleX:0.4658,scaleY:0.4658,x:380.4012,y:370.0413},0).wait(1).to({scaleX:0.4605,scaleY:0.4605,x:377.844,y:370.1402},0).wait(1).to({scaleX:0.4553,scaleY:0.4553,x:375.291,y:370.2389},0).wait(1).to({scaleX:0.45,scaleY:0.45,x:372.7379,y:370.3377},0).wait(1).to({scaleX:0.4448,scaleY:0.4448,x:370.187,y:370.4363},0).wait(1).to({scaleX:0.4395,scaleY:0.4395,x:367.6382,y:370.5349},0).wait(1).to({scaleX:0.4343,scaleY:0.4343,x:365.0915,y:370.6334},0).wait(1).to({scaleX:0.4291,scaleY:0.4291,x:362.5469,y:370.7319},0).wait(1).to({scaleX:0.4238,scaleY:0.4238,x:360.0023,y:370.8303},0).wait(1).to({scaleX:0.4201,scaleY:0.4201,x:358.2,y:370.9},0).wait(87).to({scaleX:0.4215,scaleY:0.4215,x:359.1047,y:370.5614},0).wait(1).to({scaleX:0.427,scaleY:0.427,x:362.7428,y:369.1997},0).wait(1).to({scaleX:0.4324,scaleY:0.4324,x:366.3809,y:367.8381},0).wait(1).to({scaleX:0.4379,scaleY:0.4379,x:370.0158,y:366.4777},0).wait(1).to({scaleX:0.4434,scaleY:0.4434,x:373.6475,y:365.1184},0).wait(1).to({scaleX:0.4489,scaleY:0.4489,x:377.276,y:363.7604},0).wait(1).to({scaleX:0.4543,scaleY:0.4543,x:380.9045,y:362.4023},0).wait(1).to({scaleX:0.4598,scaleY:0.4598,x:384.5266,y:361.0467},0).wait(1).to({scaleX:0.4653,scaleY:0.4653,x:388.1486,y:359.691},0).wait(1).to({scaleX:0.4707,scaleY:0.4707,x:391.7675,y:358.3366},0).wait(1).to({scaleX:0.4762,scaleY:0.4762,x:395.3831,y:356.9833},0).wait(1).to({scaleX:0.4816,scaleY:0.4816,x:398.9956,y:355.6313},0).wait(1).to({scaleX:0.4871,scaleY:0.4871,x:402.6048,y:354.2805},0).wait(1).to({scaleX:0.4925,scaleY:0.4925,x:406.2141,y:352.9296},0).wait(1).to({scaleX:0.498,scaleY:0.498,x:409.8169,y:351.5812},0).wait(1).to({scaleX:0.5034,scaleY:0.5034,x:413.4197,y:350.2328},0).wait(1).to({scaleX:0.5088,scaleY:0.5088,x:417.0193,y:348.8855},0).wait(1).to({scaleX:0.5142,scaleY:0.5142,x:420.6157,y:347.5395},0).wait(1).to({scaleX:0.5197,scaleY:0.5197,x:424.2121,y:346.1934},0).wait(1).to({scaleX:0.5251,scaleY:0.5251,x:427.8021,y:344.8498},0).wait(1).to({scaleX:0.5305,scaleY:0.5305,x:431.3921,y:343.5062},0).wait(1).to({scaleX:0.5359,scaleY:0.5359,x:434.9789,y:342.1637},0).wait(1).to({scaleX:0.5413,scaleY:0.5413,x:438.5592,y:340.8237},0).wait(1).to({scaleX:0.5467,scaleY:0.5467,x:442.1428,y:339.4825},0).wait(1).to({scaleX:0.5521,scaleY:0.5521,x:445.7199,y:338.1436},0).wait(1).to({scaleX:0.5575,scaleY:0.5575,x:449.2939,y:336.806},0).wait(1).to({scaleX:0.5629,scaleY:0.5629,x:452.8678,y:335.4684},0).wait(1).to({scaleX:0.5683,scaleY:0.5683,x:456.4386,y:334.132},0).wait(1).to({scaleX:0.5736,scaleY:0.5736,x:460.0029,y:332.7979},0).wait(1).to({scaleX:0.579,scaleY:0.579,x:463.5672,y:331.4639},0).wait(1).to({scaleX:0.5844,scaleY:0.5844,x:467.1315,y:330.1299},0).wait(1).to({scaleX:0.5898,scaleY:0.5898,x:470.6894,y:328.7982},0).wait(1).to({scaleX:0.5951,scaleY:0.5951,x:474.2473,y:327.4666},0).wait(1).to({scaleX:0.6005,scaleY:0.6005,x:477.7988,y:326.1374},0).wait(1).to({scaleX:0.6058,scaleY:0.6058,x:481.3503,y:324.8082},0).wait(1).to({scaleX:0.6112,scaleY:0.6112,x:484.8986,y:323.4801},0).wait(1).to({scaleX:0.6165,scaleY:0.6165,x:488.4437,y:322.1533},0).wait(1).to({scaleX:0.6219,scaleY:0.6219,x:491.9887,y:320.8265},0).wait(1).to({scaleX:0.6272,scaleY:0.6272,x:495.5274,y:319.5021},0).wait(1).to({scaleX:0.6325,scaleY:0.6325,x:499.066,y:318.1776},0).wait(1).to({scaleX:0.6379,scaleY:0.6379,x:502.5983,y:316.8556},0).wait(1).to({scaleX:0.6432,scaleY:0.6432,x:506.1305,y:315.5336},0).wait(1).to({scaleX:0.6485,scaleY:0.6485,x:509.6595,y:314.2128},0).wait(1).to({scaleX:0.6538,scaleY:0.6538,x:513.1886,y:312.892},0).wait(1).to({scaleX:0.6592,scaleY:0.6592,x:516.7112,y:311.5735},0).wait(1).to({scaleX:0.6645,scaleY:0.6645,x:520.2338,y:310.2551},0).wait(1).to({scaleX:0.6698,scaleY:0.6698,x:523.7532,y:308.9379},0).wait(1).to({scaleX:0.6751,scaleY:0.6751,x:527.2662,y:307.6231},0).wait(1).to({scaleX:0.6804,scaleY:0.6804,x:530.7792,y:306.3083},0).wait(1).to({scaleX:0.6857,scaleY:0.6857,x:534.2922,y:304.9934},0).wait(1).to({scaleX:0.691,scaleY:0.691,x:537.7988,y:303.681},0).wait(1).to({scaleX:0.6963,scaleY:0.6963,x:541.3053,y:302.3686},0).wait(1).to({scaleX:0.7015,scaleY:0.7015,x:544.8055,y:301.0586},0).wait(1).to({scaleX:0.7068,scaleY:0.7068,x:548.3056,y:299.7486},0).wait(1).to({scaleX:0.7121,scaleY:0.7121,x:551.8026,y:298.4398},0).wait(1).to({scaleX:0.7174,scaleY:0.7174,x:555.2963,y:297.1322},0).wait(1).to({scaleX:0.7226,scaleY:0.7226,x:558.7901,y:295.8245},0).wait(1).to({scaleX:0.7279,scaleY:0.7279,x:562.2774,y:294.5193},0).wait(1).to({scaleX:0.7331,scaleY:0.7331,x:565.7647,y:293.2141},0).wait(1).to({scaleX:0.7384,scaleY:0.7384,x:569.2488,y:291.9101},0).wait(1).to({scaleX:0.7436,scaleY:0.7436,x:572.7297,y:290.6073},0).wait(1).to({scaleX:0.7443,scaleY:0.7443,x:573.15,y:290.45},0).wait(170).to({scaleX:0.7442,scaleY:0.7442,x:573.0552,y:290.466},0).wait(1).to({scaleX:0.7401,scaleY:0.7401,x:569.6249,y:291.0451},0).wait(1).to({scaleX:0.7361,scaleY:0.7361,x:566.2019,y:291.6229},0).wait(1).to({scaleX:0.732,scaleY:0.732,x:562.7789,y:292.2008},0).wait(1).to({scaleX:0.728,scaleY:0.728,x:559.3632,y:292.7774},0).wait(1).to({scaleX:0.7239,scaleY:0.7239,x:555.9474,y:293.354},0).wait(1).to({scaleX:0.7199,scaleY:0.7199,x:552.5354,y:293.93},0).wait(1).to({scaleX:0.7158,scaleY:0.7158,x:549.1233,y:294.506},0).wait(1).to({scaleX:0.7118,scaleY:0.7118,x:545.7185,y:295.0808},0).wait(1).to({scaleX:0.7078,scaleY:0.7078,x:542.3137,y:295.6555},0).wait(1).to({scaleX:0.7037,scaleY:0.7037,x:538.9162,y:296.2291},0).wait(1).to({scaleX:0.6997,scaleY:0.6997,x:535.5187,y:296.8026},0).wait(1).to({scaleX:0.6957,scaleY:0.6957,x:532.1248,y:297.3755},0).wait(1).to({scaleX:0.6917,scaleY:0.6917,x:528.7346,y:297.9479},0).wait(1).to({scaleX:0.6877,scaleY:0.6877,x:525.3444,y:298.5202},0).wait(1).to({scaleX:0.6837,scaleY:0.6837,x:521.9615,y:299.0912},0).wait(1).to({scaleX:0.6797,scaleY:0.6797,x:518.5786,y:299.6623},0).wait(1).to({scaleX:0.6757,scaleY:0.6757,x:515.1993,y:300.2328},0).wait(1).to({scaleX:0.6717,scaleY:0.6717,x:511.8237,y:300.8026},0).wait(1).to({scaleX:0.6677,scaleY:0.6677,x:508.4517,y:301.3719},0).wait(1).to({scaleX:0.6637,scaleY:0.6637,x:505.0834,y:301.9405},0).wait(1).to({scaleX:0.6597,scaleY:0.6597,x:501.7187,y:302.5085},0).wait(1).to({scaleX:0.6557,scaleY:0.6557,x:498.354,y:303.0765},0).wait(1).to({scaleX:0.6517,scaleY:0.6517,x:494.993,y:303.6439},0).wait(1).to({scaleX:0.6478,scaleY:0.6478,x:491.6356,y:304.2106},0).wait(1).to({scaleX:0.6438,scaleY:0.6438,x:488.2818,y:304.7768},0).wait(1).to({scaleX:0.6398,scaleY:0.6398,x:484.9317,y:305.3423},0).wait(1).to({scaleX:0.6359,scaleY:0.6359,x:481.5852,y:305.9072},0).wait(1).to({scaleX:0.6319,scaleY:0.6319,x:478.2388,y:306.4722},0).wait(1).to({scaleX:0.628,scaleY:0.628,x:474.896,y:307.0365},0).wait(1).to({scaleX:0.624,scaleY:0.624,x:471.5568,y:307.6002},0).wait(1).to({scaleX:0.62,scaleY:0.62,x:468.2213,y:308.1632},0).wait(1).to({scaleX:0.6161,scaleY:0.6161,x:464.8894,y:308.7257},0).wait(1).to({scaleX:0.6122,scaleY:0.6122,x:461.5611,y:309.2875},0).wait(1).to({scaleX:0.6082,scaleY:0.6082,x:458.2329,y:309.8494},0).wait(1).to({scaleX:0.6043,scaleY:0.6043,x:454.912,y:310.41},0).wait(1).to({scaleX:0.6004,scaleY:0.6004,x:451.591,y:310.9706},0).wait(1).to({scaleX:0.5964,scaleY:0.5964,x:448.2737,y:311.5306},0).wait(1).to({scaleX:0.5925,scaleY:0.5925,x:444.9601,y:312.09},0).wait(1).to({scaleX:0.5886,scaleY:0.5886,x:441.6464,y:312.6494},0).wait(1).to({scaleX:0.5847,scaleY:0.5847,x:438.34,y:313.2075},0).wait(1).to({scaleX:0.5808,scaleY:0.5808,x:435.0337,y:313.7657},0).wait(1).to({scaleX:0.5769,scaleY:0.5769,x:431.7346,y:314.3226},0).wait(1).to({scaleX:0.5729,scaleY:0.5729,x:428.4355,y:314.8795},0).wait(1).to({scaleX:0.569,scaleY:0.569,x:425.1365,y:315.4365},0).wait(1).to({scaleX:0.5651,scaleY:0.5651,x:421.8447,y:315.9922},0).wait(1).to({scaleX:0.5612,scaleY:0.5612,x:418.5565,y:316.5472},0).wait(1).to({scaleX:0.5574,scaleY:0.5574,x:415.2684,y:317.1023},0).wait(1).to({scaleX:0.5535,scaleY:0.5535,x:411.9876,y:317.6562},0).wait(1).to({scaleX:0.5496,scaleY:0.5496,x:408.7067,y:318.21},0).wait(1).to({scaleX:0.5457,scaleY:0.5457,x:405.4295,y:318.7632},0).wait(1).to({scaleX:0.5418,scaleY:0.5418,x:402.1523,y:319.3165},0).wait(1).to({scaleX:0.538,scaleY:0.538,x:398.8824,y:319.8685},0).wait(1).to({scaleX:0.5341,scaleY:0.5341,x:395.6125,y:320.4205},0).wait(1).to({scaleX:0.5302,scaleY:0.5302,x:392.3499,y:320.9712},0).wait(1).to({scaleX:0.5264,scaleY:0.5264,x:389.0872,y:321.522},0).wait(1).to({scaleX:0.5225,scaleY:0.5225,x:385.8283,y:322.0722},0).wait(1).to({scaleX:0.5186,scaleY:0.5186,x:382.5729,y:322.6217},0).wait(1).to({scaleX:0.5148,scaleY:0.5148,x:379.3176,y:323.1712},0).wait(1).to({scaleX:0.5109,scaleY:0.5109,x:376.0696,y:323.7195},0).wait(1).to({scaleX:0.5071,scaleY:0.5071,x:372.8215,y:324.2679},0).wait(1).to({scaleX:0.5033,scaleY:0.5033,x:369.5808,y:324.8149},0).wait(1).to({scaleX:0.4994,scaleY:0.4994,x:366.34,y:325.362},0).wait(1).to({scaleX:0.4956,scaleY:0.4956,x:363.0993,y:325.9091},0).wait(1).to({scaleX:0.4918,scaleY:0.4918,x:359.8658,y:326.4549},0).wait(1).to({scaleX:0.4879,scaleY:0.4879,x:356.636,y:327.0002},0).wait(1).to({scaleX:0.4841,scaleY:0.4841,x:353.4062,y:327.5454},0).wait(1).to({scaleX:0.4803,scaleY:0.4803,x:350.1801,y:328.09},0).wait(1).to({scaleX:0.4765,scaleY:0.4765,x:346.9612,y:328.6334},0).wait(1).to({scaleX:0.4727,scaleY:0.4727,x:343.7387,y:329.1774},0).wait(1).to({scaleX:0.4689,scaleY:0.4689,x:340.5234,y:329.7202},0).wait(1).to({scaleX:0.4651,scaleY:0.4651,x:337.3118,y:330.2623},0).wait(1).to({scaleX:0.4632,scaleY:0.4632,x:336.0319,y:327.1482},0).wait(1).to({scaleX:0.4623,scaleY:0.4623,x:335.7752,y:322.1096},0).wait(1).to({scaleX:0.4614,scaleY:0.4614,x:335.5186,y:317.0709},0).wait(1).to({scaleX:0.4605,scaleY:0.4605,x:335.2623,y:312.038},0).wait(1).to({scaleX:0.4596,scaleY:0.4596,x:335.0063,y:307.0108},0).wait(1).to({scaleX:0.4587,scaleY:0.4587,x:334.7503,y:301.9836},0).wait(1).to({scaleX:0.4578,scaleY:0.4578,x:334.4948,y:296.9679},0).wait(1).to({scaleX:0.4569,scaleY:0.4569,x:334.2394,y:291.9522},0).wait(1).to({scaleX:0.456,scaleY:0.456,x:333.9842,y:286.9422},0).wait(1).to({scaleX:0.4551,scaleY:0.4551,x:333.7294,y:281.9379},0).wait(1).to({scaleX:0.4542,scaleY:0.4542,x:333.4748,y:276.9394},0).wait(1).to({scaleX:0.4533,scaleY:0.4533,x:333.2205,y:271.9466},0).wait(1).to({scaleX:0.4524,scaleY:0.4524,x:332.9662,y:266.9538},0).wait(1).to({scaleX:0.4515,scaleY:0.4515,x:332.7125,y:261.9725},0).wait(1).to({scaleX:0.4506,scaleY:0.4506,x:332.4589,y:256.9911},0).wait(1).to({scaleX:0.4497,scaleY:0.4497,x:332.2055,y:252.0155},0).wait(1).to({scaleX:0.4489,scaleY:0.4489,x:331.9523,y:247.0457},0).wait(1).to({scaleX:0.448,scaleY:0.448,x:331.6995,y:242.0815},0).wait(1).to({scaleX:0.4471,scaleY:0.4471,x:331.4467,y:237.1174},0).wait(1).to({scaleX:0.4462,scaleY:0.4462,x:331.1945,y:232.1647},0).wait(1).to({scaleX:0.4453,scaleY:0.4453,x:330.9422,y:227.212},0).wait(1).to({scaleX:0.4444,scaleY:0.4444,x:330.6903,y:222.2651},0).wait(1).to({scaleX:0.4435,scaleY:0.4435,x:330.4387,y:217.3239},0).wait(1).to({scaleX:0.4427,scaleY:0.4427,x:330.1873,y:212.3884},0).wait(1).to({scaleX:0.4418,scaleY:0.4418,x:329.9362,y:207.4587},0).wait(1).to({scaleX:0.4409,scaleY:0.4409,x:329.6852,y:202.5289},0).wait(1).to({scaleX:0.44,scaleY:0.44,x:329.4344,y:197.6049},0).wait(1).to({scaleX:0.4392,scaleY:0.4392,x:329.1842,y:192.6924},0).wait(1).to({scaleX:0.4383,scaleY:0.4383,x:328.934,y:187.7798},0).wait(1).to({scaleX:0.4374,scaleY:0.4374,x:328.6841,y:182.873},0).wait(1).to({scaleX:0.4365,scaleY:0.4365,x:328.4342,y:177.9662},0).wait(1).to({scaleX:0.4356,scaleY:0.4356,x:328.1849,y:173.0709},0).wait(1).to({scaleX:0.4348,scaleY:0.4348,x:327.9356,y:168.1755},0).wait(1).to({scaleX:0.4339,scaleY:0.4339,x:327.6866,y:163.2859},0).wait(1).to({scaleX:0.433,scaleY:0.433,x:327.4379,y:158.402},0).wait(1).to({scaleX:0.4322,scaleY:0.4322,x:327.1894,y:153.5239},0).wait(1).to({scaleX:0.4313,scaleY:0.4313,x:326.7564,y:152.7445},0).wait(1).to({scaleX:0.4304,scaleY:0.4304,x:326.289,y:152.7379},0).wait(1).to({scaleX:0.4295,scaleY:0.4295,x:325.8216,y:152.7313},0).wait(1).to({scaleX:0.4287,scaleY:0.4287,x:325.3548,y:152.7248},0).wait(1).to({scaleX:0.4278,scaleY:0.4278,x:324.8885,y:152.7182},0).wait(1).to({scaleX:0.4269,scaleY:0.4269,x:324.4228,y:152.7117},0).wait(1).to({scaleX:0.4261,scaleY:0.4261,x:323.9576,y:152.7052},0).wait(1).to({scaleX:0.4252,scaleY:0.4252,x:323.4929,y:152.6986},0).wait(1).to({scaleX:0.4244,scaleY:0.4244,x:323.0283,y:152.6921},0).wait(1).to({scaleX:0.4235,scaleY:0.4235,x:322.5648,y:152.6856},0).wait(1).to({scaleX:0.4226,scaleY:0.4226,x:322.1012,y:152.6791},0).wait(1).to({scaleX:0.4218,scaleY:0.4218,x:321.6382,y:152.6726},0).wait(1).to({scaleX:0.4209,scaleY:0.4209,x:321.1758,y:152.6661},0).wait(1).to({scaleX:0.4201,scaleY:0.4201,x:320.7134,y:152.6596},0).wait(1).to({scaleX:0.4192,scaleY:0.4192,x:320.252,y:152.6531},0).wait(1).to({scaleX:0.4183,scaleY:0.4183,x:319.7907,y:152.6466},0).wait(1).to({scaleX:0.4175,scaleY:0.4175,x:319.3299,y:152.6402},0).wait(1).to({scaleX:0.4166,scaleY:0.4166,x:318.8697,y:152.6337},0).wait(1).to({scaleX:0.4158,scaleY:0.4158,x:318.41,y:152.6273},0).wait(1).to({scaleX:0.4149,scaleY:0.4149,x:317.9509,y:152.6208},0).wait(1).to({scaleX:0.4141,scaleY:0.4141,x:317.4923,y:152.6144},0).wait(1).to({scaleX:0.4132,scaleY:0.4132,x:317.0337,y:152.6079},0).wait(1).to({scaleX:0.4124,scaleY:0.4124,x:316.5757,y:152.6015},0).wait(1).to({scaleX:0.4115,scaleY:0.4115,x:316.1182,y:152.5951},0).wait(1).to({scaleX:0.4107,scaleY:0.4107,x:315.6613,y:152.5886},0).wait(1).to({scaleX:0.4098,scaleY:0.4098,x:315.2049,y:152.5822},0).wait(1).to({scaleX:0.409,scaleY:0.409,x:314.7491,y:152.5758},0).wait(1).to({scaleX:0.4081,scaleY:0.4081,x:314.2933,y:152.5694},0).wait(1).to({scaleX:0.4073,scaleY:0.4073,x:313.838,y:152.563},0).wait(1).to({scaleX:0.4064,scaleY:0.4064,x:313.3833,y:152.5567},0).wait(1).to({scaleX:0.4056,scaleY:0.4056,x:312.9291,y:152.5503},0).wait(1).to({scaleX:0.4047,scaleY:0.4047,x:312.4755,y:152.5439},0).wait(1).to({scaleX:0.4039,scaleY:0.4039,x:312.0224,y:152.5375},0).wait(1).to({scaleX:0.4031,scaleY:0.4031,x:311.5693,y:152.5312},0).wait(1).to({scaleX:0.4022,scaleY:0.4022,x:311.1173,y:152.5248},0).wait(1).to({scaleX:0.4014,scaleY:0.4014,x:310.6654,y:152.5185},0).wait(1).to({scaleX:0.4005,scaleY:0.4005,x:310.2139,y:152.5121},0).wait(1).to({scaleX:0.3997,scaleY:0.3997,x:309.7631,y:152.5058},0).wait(1).to({scaleX:0.3989,scaleY:0.3989,x:309.3128,y:152.4995},0).wait(1).to({scaleX:0.398,scaleY:0.398,x:308.8624,y:152.4932},0).wait(1).to({scaleX:0.3972,scaleY:0.3972,x:308.4132,y:152.4868},0).wait(1).to({scaleX:0.3964,scaleY:0.3964,x:307.964,y:152.4805},0).wait(1).to({scaleX:0.3955,scaleY:0.3955,x:307.5153,y:152.4742},0).wait(1).to({scaleX:0.3947,scaleY:0.3947,x:307.0672,y:152.4679},0).wait(1).to({scaleX:0.3939,scaleY:0.3939,x:306.6196,y:152.4617},0).wait(1).to({scaleX:0.393,scaleY:0.393,x:306.1721,y:152.4554},0).wait(1).to({scaleX:0.3922,scaleY:0.3922,x:305.7256,y:152.4491},0).wait(1).to({scaleX:0.3914,scaleY:0.3914,x:305.2791,y:152.4428},0).wait(1).to({scaleX:0.3905,scaleY:0.3905,x:304.8332,y:152.4366},0).wait(1).to({scaleX:0.3897,scaleY:0.3897,x:304.3878,y:152.4303},0).wait(1).to({scaleX:0.3889,scaleY:0.3889,x:303.943,y:152.4241},0).wait(1).to({scaleX:0.3881,scaleY:0.3881,x:303.4982,y:152.4178},0).wait(1).to({scaleX:0.3872,scaleY:0.3872,x:303.0545,y:152.4116},0).wait(1).to({scaleX:0.3864,scaleY:0.3864,x:302.6108,y:152.4054},0).wait(1).to({scaleX:0.3856,scaleY:0.3856,x:302.1676,y:152.3991},0).wait(1).to({scaleX:0.3848,scaleY:0.3848,x:301.725,y:152.3929},0).wait(1).to({scaleX:0.3839,scaleY:0.3839,x:301.2829,y:152.3867},0).wait(1).to({scaleX:0.3831,scaleY:0.3831,x:300.8414,y:152.3805},0).wait(1).to({scaleX:0.3823,scaleY:0.3823,x:300.3999,y:152.3743},0).wait(1).to({scaleX:0.3815,scaleY:0.3815,x:299.9595,y:152.3681},0).wait(1).to({scaleX:0.3807,scaleY:0.3807,x:299.5191,y:152.3619},0).wait(1).to({scaleX:0.3798,scaleY:0.3798,x:299.0792,y:152.3558},0).wait(1).to({scaleX:0.379,scaleY:0.379,x:298.6399,y:152.3496},0).wait(1).to({scaleX:0.3782,scaleY:0.3782,x:298.2011,y:152.3434},0).wait(1).to({scaleX:0.3774,scaleY:0.3774,x:297.7624,y:152.3373},0).wait(1).to({scaleX:0.3766,scaleY:0.3766,x:297.3247,y:152.3311},0).wait(1).to({scaleX:0.3758,scaleY:0.3758,x:296.8871,y:152.325},0).wait(1).to({scaleX:0.3749,scaleY:0.3749,x:296.45,y:152.3188},0).wait(1).to({scaleX:0.3741,scaleY:0.3741,x:296.0134,y:152.3127},0).wait(1).to({scaleX:0.3733,scaleY:0.3733,x:295.5774,y:152.3066},0).wait(1).to({scaleX:0.3725,scaleY:0.3725,x:295.1414,y:152.3004},0).wait(1).to({scaleX:0.3717,scaleY:0.3717,x:294.7065,y:152.2943},0).wait(1).to({scaleX:0.3709,scaleY:0.3709,x:294.2716,y:152.2882},0).wait(1).to({scaleX:0.3701,scaleY:0.3701,x:293.8372,y:152.2821},0).wait(1).to({scaleX:0.3693,scaleY:0.3693,x:293.4034,y:152.276},0).wait(1).to({scaleX:0.3685,scaleY:0.3685,x:292.9702,y:152.27},0).wait(1).to({scaleX:0.3677,scaleY:0.3677,x:292.5374,y:152.2639},0).wait(1).to({scaleX:0.3669,scaleY:0.3669,x:292.1047,y:152.2578},0).wait(1).to({scaleX:0.3661,scaleY:0.3661,x:291.6731,y:152.2517},0).wait(1).to({scaleX:0.3653,scaleY:0.3653,x:291.2415,y:152.2457},0).wait(1).to({scaleX:0.3645,scaleY:0.3645,x:290.8105,y:152.2396},0).wait(1).to({scaleX:0.3637,scaleY:0.3637,x:290.38,y:152.2336},0).wait(1).to({scaleX:0.3629,scaleY:0.3629,x:289.95,y:152.2275},0).wait(1).to({scaleX:0.3621,scaleY:0.3621,x:289.5201,y:152.2215},0).wait(1).to({scaleX:0.3613,scaleY:0.3613,x:289.0912,y:152.2155},0).wait(1).to({scaleX:0.3605,scaleY:0.3605,x:288.6624,y:152.2094},0).wait(1).to({scaleX:0.3597,scaleY:0.3597,x:288.2341,y:152.2034},0).wait(1).to({scaleX:0.3589,scaleY:0.3589,x:287.8063,y:152.1974},0).wait(1).to({scaleX:0.3581,scaleY:0.3581,x:287.3791,y:152.1914},0).wait(1).to({scaleX:0.3573,scaleY:0.3573,x:286.9519,y:152.1854},0).wait(1).to({scaleX:0.3565,scaleY:0.3565,x:286.5258,y:152.1794},0).wait(1).to({scaleX:0.3557,scaleY:0.3557,x:286.0997,y:152.1735},0).wait(1).to({scaleX:0.3549,scaleY:0.3549,x:285.6742,y:152.1675},0).wait(1).to({scaleX:0.3541,scaleY:0.3541,x:285.2492,y:152.1615},0).wait(1).to({scaleX:0.3533,scaleY:0.3533,x:284.8247,y:152.1555},0).wait(1).to({scaleX:0.3525,scaleY:0.3525,x:284.4008,y:152.1496},0).wait(1).to({scaleX:0.3518,scaleY:0.3518,x:283.9769,y:152.1436},0).wait(1).to({scaleX:0.351,scaleY:0.351,x:283.5536,y:152.1377},0).wait(1).to({scaleX:0.3502,scaleY:0.3502,x:283.1313,y:152.1318},0).wait(1).to({scaleX:0.3494,scaleY:0.3494,x:282.7091,y:152.1258},0).wait(1).to({scaleX:0.3486,scaleY:0.3486,x:282.2874,y:152.1199},0).wait(1).to({scaleX:0.3478,scaleY:0.3478,x:281.8657,y:152.114},0).wait(1).to({scaleX:0.3471,scaleY:0.3471,x:281.4451,y:152.1081},0).wait(1).to({scaleX:0.3463,scaleY:0.3463,x:281.0245,y:152.1022},0).wait(1).to({scaleX:0.3455,scaleY:0.3455,x:280.6045,y:152.0963},0).wait(1).to({scaleX:0.3447,scaleY:0.3447,x:280.1855,y:152.0904},0).wait(1).to({scaleX:0.3439,scaleY:0.3439,x:279.766,y:152.0845},0).wait(1).to({scaleX:0.3432,scaleY:0.3432,x:279.3476,y:152.0786},0).wait(1).to({scaleX:0.3424,scaleY:0.3424,x:278.9298,y:152.0728},0).wait(1).to({scaleX:0.3416,scaleY:0.3416,x:278.512,y:152.0669},0).wait(1).to({scaleX:0.3408,scaleY:0.3408,x:278.0947,y:152.061},0).wait(1).to({scaleX:0.3401,scaleY:0.3401,x:277.6785,y:152.0552},0).wait(1).to({scaleX:0.3393,scaleY:0.3393,x:277.2623,y:152.0493},0).wait(1).to({scaleX:0.3385,scaleY:0.3385,x:276.8461,y:152.0435},0).wait(1).to({scaleX:0.3377,scaleY:0.3377,x:276.431,y:152.0377},0).wait(1).to({scaleX:0.337,scaleY:0.337,x:276.0165,y:152.0318},0).wait(1).to({scaleX:0.3362,scaleY:0.3362,x:275.6019,y:152.026},0).wait(1).to({scaleX:0.3354,scaleY:0.3354,x:275.188,y:152.0202},0).wait(1).to({scaleX:0.3347,scaleY:0.3347,x:274.7745,y:152.0144},0).wait(1).to({scaleX:0.3339,scaleY:0.3339,x:274.3616,y:152.0086},0).wait(1).to({scaleX:0.3331,scaleY:0.3331,x:273.9493,y:152.0028},0).wait(1).to({scaleX:0.3327,scaleY:0.3327,x:273.75,y:152},0).wait(70));

	// play_button_obj_
	this.play_button = new lib.Scene_1_play_button();
	this.play_button.name = "play_button";
	this.play_button.setTransform(640.5,363,1,1,0,0,0,640.5,363);
	this.play_button.depth = 0;
	this.play_button.isAttachedToCamera = 0
	this.play_button.isAttachedToMask = 0
	this.play_button.layerDepth = 0
	this.play_button.layerIndex = 0
	this.play_button.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.play_button).to({_off:true},1).wait(738));

	// sheep_vortex_obj_
	this.sheep_vortex = new lib.Scene_1_sheep_vortex();
	this.sheep_vortex.name = "sheep_vortex";
	this.sheep_vortex.depth = 0;
	this.sheep_vortex.isAttachedToCamera = 0
	this.sheep_vortex.isAttachedToMask = 0
	this.sheep_vortex.layerDepth = 0
	this.sheep_vortex.layerIndex = 1
	this.sheep_vortex.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.sheep_vortex).wait(452).to({regX:87,regY:47,scaleX:1.4374,scaleY:1.4374,x:0.1},0).wait(10).to({regX:78.7,regY:67,scaleX:1.525,scaleY:1.525,x:-0.05,y:-0.05},0).to({_off:true},240).wait(37));

	// kid_eyes_obj_
	this.kid_eyes = new lib.Scene_1_kid_eyes();
	this.kid_eyes.name = "kid_eyes";
	this.kid_eyes.depth = 0;
	this.kid_eyes.isAttachedToCamera = 0
	this.kid_eyes.isAttachedToMask = 0
	this.kid_eyes.layerDepth = 0
	this.kid_eyes.layerIndex = 2
	this.kid_eyes.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.kid_eyes).wait(375).to({regX:96.9,regY:22.5,scaleX:1.3436,scaleY:1.3436,x:0.1},0).wait(364));

	// kid_obj_
	this.kid = new lib.Scene_1_kid();
	this.kid.name = "kid";
	this.kid.depth = 0;
	this.kid.isAttachedToCamera = 0
	this.kid.isAttachedToMask = 0
	this.kid.layerDepth = 0
	this.kid.layerIndex = 3
	this.kid.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.kid).wait(375).to({regX:96.9,regY:22.5,scaleX:1.3436,scaleY:1.3436,x:0.1},0).wait(364));

	// thoughts_obj_
	this.thoughts = new lib.Scene_1_thoughts();
	this.thoughts.name = "thoughts";
	this.thoughts.depth = 0;
	this.thoughts.isAttachedToCamera = 0
	this.thoughts.isAttachedToMask = 0
	this.thoughts.layerDepth = 0
	this.thoughts.layerIndex = 4
	this.thoughts.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.thoughts).wait(187).to({regX:89.4,regY:219.7,scaleX:2.3804,scaleY:2.3804,x:0.15},0).wait(70).to({regX:95.4,regY:61.5,scaleX:1.4698,scaleY:1.4698,x:0,y:0.1},0).wait(118).to({regX:96.9,regY:22.5,scaleX:1.3436,scaleY:1.3436,x:0.1,y:0},0).wait(364));

	// background_items_obj_
	this.background_items = new lib.Scene_1_background_items();
	this.background_items.name = "background_items";
	this.background_items.depth = 0;
	this.background_items.isAttachedToCamera = 0
	this.background_items.isAttachedToMask = 0
	this.background_items.layerDepth = 0
	this.background_items.layerIndex = 5
	this.background_items.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.background_items).wait(207).to({regX:89.4,regY:219.7,scaleX:2.3804,scaleY:2.3804,x:0.15},0).wait(91).to({regX:96.9,regY:22.5,scaleX:1.3436,scaleY:1.3436,x:0.1},0).wait(441));

	// sheep_obj_
	this.sheep = new lib.Scene_1_sheep();
	this.sheep.name = "sheep";
	this.sheep.depth = 0;
	this.sheep.isAttachedToCamera = 0
	this.sheep.isAttachedToMask = 0
	this.sheep.layerDepth = 0
	this.sheep.layerIndex = 6
	this.sheep.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.sheep).wait(326).to({regX:96.9,regY:22.5,scaleX:1.3436,scaleY:1.3436,x:0.1},0).to({_off:true},139).wait(274));

	// dream_background_obj_
	this.dream_background = new lib.Scene_1_dream_background();
	this.dream_background.name = "dream_background";
	this.dream_background.depth = 0;
	this.dream_background.isAttachedToCamera = 0
	this.dream_background.isAttachedToMask = 0
	this.dream_background.layerDepth = 0
	this.dream_background.layerIndex = 7
	this.dream_background.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.dream_background).wait(291).to({regX:96.9,regY:22.5,scaleX:1.3436,scaleY:1.3436,x:0.1},0).wait(448));

	// background_obj_
	this.background = new lib.Scene_1_background();
	this.background.name = "background";
	this.background.setTransform(660.1,419,1,1,0,0,0,660.1,419);
	this.background.depth = 0;
	this.background.isAttachedToCamera = 0
	this.background.isAttachedToMask = 0
	this.background.layerDepth = 0
	this.background.layerIndex = 8
	this.background.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.background).wait(739));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(601.2,198.4,724.8999999999999,664.7);
// library properties:
lib.properties = {
	id: 'BD6BEB0A72C69942B6D42E2404E811EE',
	width: 1280,
	height: 720,
	fps: 30,
	color: "#FFFFFF",
	opacity: 1.00,
	manifest: [
		{src:"images/blackboardbackground.jpg", id:"blackboardbackground"},
		{src:"images/keves_atlas_1.png", id:"keves_atlas_1"},
		{src:"sounds/יונירכטרהכבשהשישהעשרלילהטוב_.mp3", id:"יונירכטרהכבשהשישהעשרלילהטוב"}
	],
	preloads: []
};



// bootstrap callback support:

(lib.Stage = function(canvas) {
	createjs.Stage.call(this, canvas);
}).prototype = p = new createjs.Stage();

p.setAutoPlay = function(autoPlay) {
	this.tickEnabled = autoPlay;
}
p.play = function() { this.tickEnabled = true; this.getChildAt(0).gotoAndPlay(this.getTimelinePosition()) }
p.stop = function(ms) { if(ms) this.seek(ms); this.tickEnabled = false; }
p.seek = function(ms) { this.tickEnabled = true; this.getChildAt(0).gotoAndStop(lib.properties.fps * ms / 1000); }
p.getDuration = function() { return this.getChildAt(0).totalFrames / lib.properties.fps * 1000; }

p.getTimelinePosition = function() { return this.getChildAt(0).currentFrame / lib.properties.fps * 1000; }

an.bootcompsLoaded = an.bootcompsLoaded || [];
if(!an.bootstrapListeners) {
	an.bootstrapListeners=[];
}

an.bootstrapCallback=function(fnCallback) {
	an.bootstrapListeners.push(fnCallback);
	if(an.bootcompsLoaded.length > 0) {
		for(var i=0; i<an.bootcompsLoaded.length; ++i) {
			fnCallback(an.bootcompsLoaded[i]);
		}
	}
};

an.compositions = an.compositions || {};
an.compositions['BD6BEB0A72C69942B6D42E2404E811EE'] = {
	getStage: function() { return exportRoot.stage; },
	getLibrary: function() { return lib; },
	getSpriteSheet: function() { return ss; },
	getImages: function() { return img; }
};

an.compositionLoaded = function(id) {
	an.bootcompsLoaded.push(id);
	for(var j=0; j<an.bootstrapListeners.length; j++) {
		an.bootstrapListeners[j](id);
	}
}

an.getComposition = function(id) {
	return an.compositions[id];
}

p._getProjectionMatrix = function(container, totalDepth) {	var focalLength = 528.25;
	var projectionCenter = { x : lib.properties.width/2, y : lib.properties.height/2 };
	var scale = (totalDepth + focalLength)/focalLength;
	var scaleMat = new createjs.Matrix2D;
	scaleMat.a = 1/scale;
	scaleMat.d = 1/scale;
	var projMat = new createjs.Matrix2D;
	projMat.tx = -projectionCenter.x;
	projMat.ty = -projectionCenter.y;
	projMat = projMat.prependMatrix(scaleMat);
	projMat.tx += projectionCenter.x;
	projMat.ty += projectionCenter.y;
	return projMat;
}
p._handleTick = function(event) {
	var cameraInstance = exportRoot.___camera___instance;
	if(cameraInstance !== undefined && cameraInstance.pinToObject !== undefined)
	{
		cameraInstance.x = cameraInstance.pinToObject.x + cameraInstance.pinToObject.pinOffsetX;
		cameraInstance.y = cameraInstance.pinToObject.y + cameraInstance.pinToObject.pinOffsetY;
		if(cameraInstance.pinToObject.parent !== undefined && cameraInstance.pinToObject.parent.depth !== undefined)
		cameraInstance.depth = cameraInstance.pinToObject.parent.depth + cameraInstance.pinToObject.pinOffsetZ;
	}
	stage._applyLayerZDepth(exportRoot);
}
p._applyLayerZDepth = function(parent)
{
	var cameraInstance = parent.___camera___instance;
	var focalLength = 528.25;
	var projectionCenter = { 'x' : 0, 'y' : 0};
	if(parent === exportRoot)
	{
		var stageCenter = { 'x' : lib.properties.width/2, 'y' : lib.properties.height/2 };
		projectionCenter.x = stageCenter.x;
		projectionCenter.y = stageCenter.y;
	}
	for(child in parent.children)
	{
		var layerObj = parent.children[child];
		if(layerObj == cameraInstance)
			continue;
		stage._applyLayerZDepth(layerObj, cameraInstance);
		if(layerObj.layerDepth === undefined)
			continue;
		if(layerObj.currentFrame != layerObj.parent.currentFrame)
		{
			layerObj.gotoAndPlay(layerObj.parent.currentFrame);
		}
		var matToApply = new createjs.Matrix2D;
		var cameraMat = new createjs.Matrix2D;
		var totalDepth = layerObj.layerDepth ? layerObj.layerDepth : 0;
		var cameraDepth = 0;
		if(cameraInstance && !layerObj.isAttachedToCamera)
		{
			var mat = cameraInstance.getMatrix();
			mat.tx -= projectionCenter.x;
			mat.ty -= projectionCenter.y;
			cameraMat = mat.invert();
			cameraMat.prependTransform(projectionCenter.x, projectionCenter.y, 1, 1, 0, 0, 0, 0, 0);
			cameraMat.appendTransform(-projectionCenter.x, -projectionCenter.y, 1, 1, 0, 0, 0, 0, 0);
			if(cameraInstance.depth)
				cameraDepth = cameraInstance.depth;
		}
		if(layerObj.depth)
		{
			totalDepth = layerObj.depth;
		}
		//Offset by camera depth
		totalDepth -= cameraDepth;
		if(totalDepth < -focalLength)
		{
			matToApply.a = 0;
			matToApply.d = 0;
		}
		else
		{
			if(layerObj.layerDepth)
			{
				var sizeLockedMat = stage._getProjectionMatrix(parent, layerObj.layerDepth);
				if(sizeLockedMat)
				{
					sizeLockedMat.invert();
					matToApply.prependMatrix(sizeLockedMat);
				}
			}
			matToApply.prependMatrix(cameraMat);
			var projMat = stage._getProjectionMatrix(parent, totalDepth);
			if(projMat)
			{
				matToApply.prependMatrix(projMat);
			}
		}
		layerObj.transformMatrix = matToApply;
	}
}
an.makeResponsive = function(isResp, respDim, isScale, scaleType, domContainers) {		
	var lastW, lastH, lastS=1;		
	window.addEventListener('resize', resizeCanvas);		
	resizeCanvas();		
	function resizeCanvas() {			
		var w = lib.properties.width, h = lib.properties.height;			
		var iw = window.innerWidth, ih=window.innerHeight;			
		var pRatio = window.devicePixelRatio || 1, xRatio=iw/w, yRatio=ih/h, sRatio=1;			
		if(isResp) {                
			if((respDim=='width'&&lastW==iw) || (respDim=='height'&&lastH==ih)) {                    
				sRatio = lastS;                
			}				
			else if(!isScale) {					
				if(iw<w || ih<h)						
					sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==1) {					
				sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==2) {					
				sRatio = Math.max(xRatio, yRatio);				
			}			
		}
		domContainers[0].width = w * pRatio * sRatio;			
		domContainers[0].height = h * pRatio * sRatio;
		domContainers.forEach(function(container) {				
			container.style.width = w * sRatio + 'px';				
			container.style.height = h * sRatio + 'px';			
		});
		stage.scaleX = pRatio*sRatio;			
		stage.scaleY = pRatio*sRatio;
		lastW = iw; lastH = ih; lastS = sRatio;            
		stage.tickOnUpdate = false;            
		stage.update();            
		stage.tickOnUpdate = true;		
	}
}

// Virtual camera API : 

an.VirtualCamera = new function() {
var _camera = new Object();
function VC(timeline) {
	this.timeline = timeline;
	this.camera = timeline.___camera___instance;
	this.centerX = lib.properties.width / 2;
	this.centerY = lib.properties.height / 2;
	this.camAxisX = this.camera.x;
	this.camAxisY = this.camera.y;
	if(timeline.___camera___instance == null || timeline.___camera___instance == undefined ) {
		timeline.___camera___instance = new cjs.MovieClip();
		timeline.___camera___instance.visible = false;
		timeline.___camera___instance.parent = timeline;
		timeline.___camera___instance.setTransform(this.centerX, this.centerY);
	}
	this.camera = timeline.___camera___instance;
}

VC.prototype.moveBy = function(x, y, z) {
z = typeof z !== 'undefined' ? z : 0;
	var position = this.___getCamPosition___();
	var rotAngle = this.getRotation()*Math.PI/180;
	var sinTheta = Math.sin(rotAngle);
	var cosTheta = Math.cos(rotAngle);
	var offX= x*cosTheta + y*sinTheta;
	var offY = y*cosTheta - x*sinTheta;
	this.camAxisX = this.camAxisX - x;
	this.camAxisY = this.camAxisY - y;
	var posX = position.x + offX;
	var posY = position.y + offY;
	this.camera.x = this.centerX - posX;
	this.camera.y = this.centerY - posY;
	this.camera.depth += z;
};

VC.prototype.setPosition = function(x, y, z) {
	z = typeof z !== 'undefined' ? z : 0;

	const MAX_X = 10000;
	const MIN_X = -10000;
	const MAX_Y = 10000;
	const MIN_Y = -10000;
	const MAX_Z = 10000;
	const MIN_Z = -5000;

	if(x > MAX_X)
	  x = MAX_X;
	else if(x < MIN_X)
	  x = MIN_X;
	if(y > MAX_Y)
	  y = MAX_Y;
	else if(y < MIN_Y)
	  y = MIN_Y;
	if(z > MAX_Z)
	  z = MAX_Z;
	else if(z < MIN_Z)
	  z = MIN_Z;

	var rotAngle = this.getRotation()*Math.PI/180;
	var sinTheta = Math.sin(rotAngle);
	var cosTheta = Math.cos(rotAngle);
	var offX= x*cosTheta + y*sinTheta;
	var offY = y*cosTheta - x*sinTheta;
	
	this.camAxisX = this.centerX - x;
	this.camAxisY = this.centerY - y;
	this.camera.x = this.centerX - offX;
	this.camera.y = this.centerY - offY;
	this.camera.depth = z;
};

VC.prototype.getPosition = function() {
	var loc = new Object();
	loc['x'] = this.centerX - this.camAxisX;
	loc['y'] = this.centerY - this.camAxisY;
	loc['z'] = this.camera.depth;
	return loc;
};

VC.prototype.resetPosition = function() {
	this.setPosition(0, 0);
};

VC.prototype.zoomBy = function(zoom) {
	this.setZoom( (this.getZoom() * zoom) / 100);
};

VC.prototype.setZoom = function(zoom) {
	const MAX_zoom = 10000;
	const MIN_zoom = 1;
	if(zoom > MAX_zoom)
	zoom = MAX_zoom;
	else if(zoom < MIN_zoom)
	zoom = MIN_zoom;
	this.camera.scaleX = 100 / zoom;
	this.camera.scaleY = 100 / zoom;
};

VC.prototype.getZoom = function() {
	return 100 / this.camera.scaleX;
};

VC.prototype.resetZoom = function() {
	this.setZoom(100);
};

VC.prototype.rotateBy = function(angle) {
	this.setRotation( this.getRotation() + angle );
};

VC.prototype.setRotation = function(angle) {
	const MAX_angle = 180;
	const MIN_angle = -179;
	if(angle > MAX_angle)
		angle = MAX_angle;
	else if(angle < MIN_angle)
		angle = MIN_angle;
	this.camera.rotation = -angle;
};

VC.prototype.getRotation = function() {
	return -this.camera.rotation;
};

VC.prototype.resetRotation = function() {
	this.setRotation(0);
};

VC.prototype.reset = function() {
	this.resetPosition();
	this.resetZoom();
	this.resetRotation();
	this.unpinCamera();
};
VC.prototype.setZDepth = function(zDepth) {
	const MAX_zDepth = 10000;
	const MIN_zDepth = -5000;
	if(zDepth > MAX_zDepth)
		zDepth = MAX_zDepth;
	else if(zDepth < MIN_zDepth)
		zDepth = MIN_zDepth;
	this.camera.depth = zDepth;
}
VC.prototype.getZDepth = function() {
	return this.camera.depth;
}
VC.prototype.resetZDepth = function() {
	this.camera.depth = 0;
}

VC.prototype.pinCameraToObject = function(obj, offsetX, offsetY, offsetZ) {

	offsetX = typeof offsetX !== 'undefined' ? offsetX : 0;

	offsetY = typeof offsetY !== 'undefined' ? offsetY : 0;

	offsetZ = typeof offsetZ !== 'undefined' ? offsetZ : 0;
	if(obj === undefined)
		return;
	this.camera.pinToObject = obj;
	this.camera.pinToObject.pinOffsetX = offsetX;
	this.camera.pinToObject.pinOffsetY = offsetY;
	this.camera.pinToObject.pinOffsetZ = offsetZ;
};

VC.prototype.setPinOffset = function(offsetX, offsetY, offsetZ) {
	if(this.camera.pinToObject != undefined) {
	this.camera.pinToObject.pinOffsetX = offsetX;
	this.camera.pinToObject.pinOffsetY = offsetY;
	this.camera.pinToObject.pinOffsetZ = offsetZ;
	}
};

VC.prototype.unpinCamera = function() {
	this.camera.pinToObject = undefined;
};
VC.prototype.___getCamPosition___ = function() {
	var loc = new Object();
	loc['x'] = this.centerX - this.camera.x;
	loc['y'] = this.centerY - this.camera.y;
	loc['z'] = this.depth;
	return loc;
};

this.getCamera = function(timeline) {
	timeline = typeof timeline !== 'undefined' ? timeline : null;
	if(timeline === null) timeline = exportRoot;
	if(_camera[timeline] == undefined)
	_camera[timeline] = new VC(timeline);
	return _camera[timeline];
}

this.getCameraAsMovieClip = function(timeline) {
	timeline = typeof timeline !== 'undefined' ? timeline : null;
	if(timeline === null) timeline = exportRoot;
	return this.getCamera(timeline).camera;
}
}


// Layer depth API : 

an.Layer = new function() {
	this.getLayerZDepth = function(timeline, layerName)
	{
		if(layerName === "Camera")
		layerName = "___camera___instance";
		var script = "if(timeline." + layerName + ") timeline." + layerName + ".depth; else 0;";
		return eval(script);
	}
	this.setLayerZDepth = function(timeline, layerName, zDepth)
	{
		const MAX_zDepth = 10000;
		const MIN_zDepth = -5000;
		if(zDepth > MAX_zDepth)
			zDepth = MAX_zDepth;
		else if(zDepth < MIN_zDepth)
			zDepth = MIN_zDepth;
		if(layerName === "Camera")
		layerName = "___camera___instance";
		var script = "if(timeline." + layerName + ") timeline." + layerName + ".depth = " + zDepth + ";";
		eval(script);
	}
	this.removeLayer = function(timeline, layerName)
	{
		if(layerName === "Camera")
		layerName = "___camera___instance";
		var script = "if(timeline." + layerName + ") timeline.removeChild(timeline." + layerName + ");";
		eval(script);
	}
	this.addNewLayer = function(timeline, layerName, zDepth)
	{
		if(layerName === "Camera")
		layerName = "___camera___instance";
		zDepth = typeof zDepth !== 'undefined' ? zDepth : 0;
		var layer = new createjs.MovieClip();
		layer.name = layerName;
		layer.depth = zDepth;
		layer.layerIndex = 0;
		timeline.addChild(layer);
	}
}
an.handleSoundStreamOnTick = function(event) {
	if(!event.paused){
		var stageChild = stage.getChildAt(0);
		if(!stageChild.paused){
			stageChild.syncStreamSounds();
		}
	}
}


})(createjs = createjs||{}, AdobeAn = AdobeAn||{});
var createjs, AdobeAn;