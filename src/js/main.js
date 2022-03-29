(function(window, document){

	let tl, txt, windowWidth;

	const cl = txt => console.log('%c '+txt,'background: rgba(51, 255, 0, 0.3); color: white;');
	const id = txt => document.getElementById(txt);

	function init(e){
		cl('init');
		windowWidth = window.innerWidth;
		gsap.set('.hero',{visibility:'visible'});
		startAnimation(windowWidth);
	}

	function startAnimation() {
		cl(windowWidth);

		if (windowWidth > 1024) {
			animateDesktop();
		}
		else if (windowWidth > 780) {
			animateTablet();
		} 
		else {
			animateMobile();
		}
	}

	function onResize(event) {
		windowWidth = event.target.innerWidth;
		tl.seek(0);
		tl.kill();
		cl('onResize: '+windowWidth);
		startAnimation();
	}

	function animateDesktop() {
		cl('animateDesktop!');

		tl = gsap.timeline({ defaults:{ paused:false, duration:0.5, ease:'power3.out' }});

		tl.add('start')
			.fromTo('#pic-dt',{x:0},{x:getDtPicStartX(), duration:0})
			.fromTo('#wave-mask-dt',{x:-900}, {x:getDtWaveEndX(), duration:2, ease:'power3.out'}, 'start')
			.add(logoTl(), 'start+=0.3')
 			.fromTo('#logo',{x:0, y:100, scale:1.2}, { y:0, scale:1, duration: 1, ease:'power3.inOut'}, '+=0.5')
			.add('end', '-=0.3')
			.add(endTl(), 'end')
			// .seek('end')
			// tl.pause(.6);
	}

	function animateTablet() {
		cl('animateTablet!');

		tl = gsap.timeline({ defaults:{ paused:false, duration:0.5, ease:'power3.out' }});
	
		tl.add('start')
			.fromTo('#wave-mask-tab',{x:-2000,y:500}, {x:0, y:-42, duration:2.3, ease:'power.out'}, 'start')
			.fromTo('#pic-tab',{x:'-30%', scale:1.3},{x:0, scale:1, duration:1.8, ease:'power.out'}, 'start')
			.add(logoTl(), '-=1.3')
 			.fromTo('#logo', { x:getCenterX('#logo') }, {x:'40%', duration:1.5, ease:'power3.inOut'})
			.add('end', '-=1.3')
			.add(endTl(), 'end')
			// .seek('end')
			// tl.pause(.6);
	}

	function animateMobile() {
		cl('animateMobile!');

		resizeMoWaveClipPath('wave-mask-mo', 'wave-path-mo');
		tl = gsap.timeline({ defaults:{ paused:false, duration:0.5, ease:'power3.out' }});

		tl.add('start')
			.fromTo('#wave-path-mo',{x:'-100%', y:'-100%'}, {x:0, y:0, duration:2, ease:'power3.out'}, 'start')
			.fromTo('#pic-mo',{x:0, y:'-10%', scale:1.3 },{ y:0, scale:1, duration:1.5, ease:'power3.out'}, 'start')
			.add(logoTl(), '-=.5')
			.add('end', '-=.3')
			// .add(logoTl(), 'start')
			// .add('end', 'start+=.8')
			.add(endTl(), 'end')
			// .seek('end')
			// tl.pause(.6);
	}

	function popInTl(_id, _origin='50% 50%') {
		return gsap.timeline()
			.fromTo(_id, { scale:0, y:0 }, { duration:0.5, scale:1, transformOrigin:_origin, ease:'back.out(1.2)'});
	}
	function logoElementPopInTl(_id, _speed=0.3) {
		return gsap.timeline()
			.fromTo(_id, {  x:'50%', y:'50%', scale:0 }, { x:0, y:0, scale:1, duration:_speed, ease:'back.out(1.3)'})
	}
	function logoTl() {
		return gsap.timeline()
			.add('start')
 			.fromTo(['#N','#E','#W'], { x:'50%', y:'50%', scale:0 }, {x:0, y:0, scale:1, duration:0.3, stagger:0.1, ease:'back.out(1.3)'}, 'start')
 			.add(logoElementPopInTl('#Gerber-logo'), 'start+=.3')
 			.add(logoElementPopInTl('#plant-tastic-lockup', 0.4), 'start+=0.6')
	}
	function endTl() {
		return gsap.timeline()
			.add('start')
			.add(txtInTl('h1'), 'start')
			.add(txtInTl('#txt'), '-=0.3')
			.add(popInTl('.cta'), '-=0.3')
	}

	function txtInTl(_txt){

		return gsap.timeline()
			.fromTo(_txt, { scale:0, y:0 }, { duration:1, scale:1, transformOrigin:'30% 50%', ease:'back.out(1.2)'})
			.fromTo(_txt+' span', { alpha:0 }, {alpha:1, duration: 0.2, ease:'none', stagger:0.1 },'-=1')
	}

	function getDtPicStartX() {
		let pct = 62.5,
			_maxWidth = 1440,
			// _picWidth = gsap.getProperty('#pic', 'width','px'),
			_diffWidth =  _maxWidth - windowWidth;
			_distanceX = Math.round( (_diffWidth * pct)/100 )/2,
			_startX = _distanceX <= 0 ? 0 : '+='+_distanceX * -1;

			console.group('getDtPicStartX')
			cl('_diffWidth '+_diffWidth);
			cl('_startX '+_startX);
			console.groupEnd();
		return _startX;
	}

	function resizeMoWaveClipPath(_clipPathId, _pathId) {
		let thePath = id(_pathId),
			_picProp = gsap.getProperty('#pic-mo'),
			_picW = _picProp('width'),
			// _picH = _picProp('height'),
			_picH = id('pic-mo').naturalHeight,
			// bb = thePath.getBBox(),
			// sx = 1/bb.width,
			// sy = 1/bb.height;
			// sx = 1/_picW,
			// sy = 1/_picH;
			sx = 0.0012345,
			sy = 0.00178814; // Edit these numbers to get close to image width + height /1
		console.group('resizeMoWaveClipPath');
		// cl(`bb ${bb}`);
		// cl(`bb.width ${bb.width}`);
		// cl(`bb.height ${bb.height}`);
		cl(`_picW ${(1/_picW)}`);
		cl(`_picH ${(_picH)}`);
		cl(`sx ${sx}`);
		cl(`sy ${sy} `)
		console.groupEnd();
		id(_clipPathId).setAttribute('transform', `scale(${sx} ${sy})`);
		// id(_clipPathId).setAttribute('transform', `scale(0.0012345, 0.00178814)`);
		// thePath.setAttribute('transform', `scale(${sx} ${sy})`);
	}

/*	function getMoWaveEndY() {
		let _waveH = 525,
			_picH = gsap.getProperty('#pic-mo','height'),
			_startY = (_waveH - _picH) *-1; 
		cl(`	getMoWaveEndY ${_endY}`)

		return _endY;
	}*/

	function getDtWaveEndX() {
		let pct = 62.5,
			_maxWidth = 1440,
			// _picWidth = gsap.getProperty('#pic', 'width','px'),
			_diffWidth =  _maxWidth - windowWidth;
			_distanceX = Math.round( _diffWidth * pct/100) /2,
			_endX = _distanceX <= 0 ? 0 : (_distanceX * -1)/*+'px'*/;

			console.group('getDtWaveEndX')
			cl('_diffWidth '+_diffWidth);
			cl('_endX '+_endX);
			console.groupEnd();
		return _endX;
	}

	function getCenterX(_id) {
		return Math.round(windowWidth / 2 - (gsap.getProperty(_id, 'width') / 2));
	}

	window.addEventListener('load', init);
	window.addEventListener('resize', onResize, true);
	
})(window, document)