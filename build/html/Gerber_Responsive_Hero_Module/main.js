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
			.fromTo('#pic-dt',{left:0},{left:getDtPicStartX(), duration:0})
			// .fromTo('#wave', {left:'-50%'}, {left:0, duration:1, ease:'power3.out'}, 'start')
			.fromTo('#wave-mask-dt',{x:-900}, {x:getDtWaveEndX(), duration:2, ease:'power3.out'}, 'start')
			// .fromTo('#wave-mask',{x:'-100%'}, {x:getDtWaveEndX(), duration:2, ease:'power3.out'}, 'start')
			// .fromTo('#wave-mask',{x:-1000}, {x:0, duration:2, ease:'power3.out'}, 'start')
			.fromTo('#logo', { x:0, y:100, scale:0 }, {scale:1.2, duration:0.3, stagger:0.1, ease:'back.out(1.3)'}, 'start')
 			.fromTo(['#N','#E','#W'], { y:10, scale:0 }, { y:0, scale:1, duration:0.3, stagger:0.1,ease:'back.out(1.3)'})
 			.to('#logo', {y:0, scale:1, duration: 1, ease:'power3.inOut'}, '+=2')
			// .add(logoPopInTl(),'start')
			.add('end')
			.add(txtInTl('h1'))
			.add(txtInTl('#txt'))
			.add(popInTl('.cta'))
			// .seek('end')
			// tl.pause(.6);
	}

	function animateTablet() {
		cl('animateTablet!');

		tl = gsap.timeline({ defaults:{ paused:false, duration:0.5, ease:'power3.out' }});
	
		tl.add('start')
			.fromTo('#wave-mask-tab',{x:-2000,y:900}, {x:0, y:0, duration:2, ease:'power3.out'}, 'start')
			.fromTo('#pic-tab',{x:'-30%', scale:1.3},{x:0, scale:1, duration:1.5, ease:'power3.out'}, 'start')
			.fromTo('#logo', { x:getCenterX('#logo'), y:0, scale:0 }, {scale:1, duration:0.3, ease:'back.out(1.3)'}, 'start')
 			.fromTo(['#N','#E','#W'], { y:10, scale:0 }, { y:0, scale:1, duration:0.3, stagger:0.1,ease:'back.out(1.3)'}, 'start+=0.3')
			.add('end')
 			.to('#logo', {x:'20%', duration: 0.5, ease:'power3.inOut'})
			.add(txtInTl('h1'))
			.add(txtInTl('#txt'))
			.add(popInTl('.cta'))
			// .seek('end')
			// tl.pause(.6);
	}

	function animateMobile() {
		cl('animateMobile!');

		// setWaveSize('wave-path-mo');
		tl = gsap.timeline({ defaults:{ paused:false, duration:0.5, ease:'power3.out' }});

		tl.add('start')
			.fromTo('#wave-path-mo',{y:'-100%'}, { y:getMoWaveEndY(), duration:2, ease:'power3.out'}, 'start')
			.fromTo('#pic-mo',{x:0, y:'-10%', scale:1.3 },{ x:0, y:0, scale:1, duration:1.5, ease:'power3.out'}, 'start')
			.fromTo('#logo', { x:0, y:0, scale:0 }, {scale:1, duration:0.3, ease:'back.out(1.3)'}, 'start')
 			.fromTo(['#N','#E','#W'], { y:10, scale:0 }, { y:0, scale:1, duration:0.3, stagger:0.1,ease:'back.out(1.3)'}, 'start+=0.3')
			.add('end')
			.add(txtInTl('h1'))
			.add(txtInTl('#txt'))
			.add(popInTl('.cta'))
			// .seek('end')
			// tl.pause(.6);
	}

	function setWaveSize(_id) {
		let thePath = id(_id),
			bb = thePath.getBBox(),
			sx = 1/bb.width,
			sy = 1/bb.height;
		// cl(`	setWaveSize ${bb.width}`);

		// gsap.set(thePath, { scale: `${sx}`,`${sy}`});
		thePath.setAttribute('transform', `scale(${sx},${sy})`);
	}
	/*function popInOutTl(_id, _origin='50% 50%', _repeat=-1) {
		let _delay = _repeat >= 0 ? 0 : 10; // Do not add delay if repeat # is passed in.
		return gsap.timeline({defaults:{duration:0.5}, repeat:_repeat, repeatDelay:_delay})
			.to(_id, { scale: 0, transformOrigin:_origin, ease:'back.in(1.2)', yoyo:true, repeat:1})
	}*/

	function popInTl(_id, _origin='50% 50%') {
		return gsap.timeline()
			.fromTo(_id, { scale:0, y:0 }, { duration:0.5, scale:1, transformOrigin:_origin, ease:'back.out(1.2)'});
	}
/*	function logoPopInTl(_id, _origin='50% 50%') {
		return gsap.timeline()
 			.fromTo('#logo', { y:100, scale:0 }, {scale:1.2, duration:0.3, stagger:0.1, ease:'back.out(1.3)'})
 			.fromTo(['#N','#E','#W'], { y:10, scale:0 }, { y:0, scale:1, duration:0.3, stagger:0.1,ease:'back.out(1.3)'})
 			.to('#logo', {y:0, scale:1, duration: 0.5, ease:'power3.inOut'}, '+=2');
			// .add(popInTl('#logo'))
	}*/

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

	function getMoWaveEndY() {
		let _waveH = 525,
			_picH = gsap.getProperty('#pic-mo','height'),
			_endY = (_waveH - _picH) *-1; 
		cl(`	getMoWaveEndY ${_endY}`)

		return _endY;
	}

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