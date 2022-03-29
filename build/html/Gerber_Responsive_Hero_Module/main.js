const onClick = e => console.log(`CLICK!`);

(function(window, document){

	let tl, txt, windowWidth;

	const cl = txt => console.log('%c '+txt,'background: rgba(51, 255, 0, 0.3); color: white;');
	const id = txt => document.getElementById(txt);

	function init(e){
		// cl('init');
		windowWidth = window.innerWidth;
		gsap.set('.hero',{visibility:'visible'});
		startAnimation(windowWidth);
	}

	function startAnimation() {
		// cl(windowWidth);

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
		resetElements();
		tl.seek(0);
		tl.kill();
		// cl('onResize: '+windowWidth);
		startAnimation();
	}

	function resetElements() {
		// Set in case other animations were triggered on window resize.
		gsap.set(['#pic-dt','#pic-tab','#pic-mo','#wave-dt','#wave-tab','#wave-mo', '#logo'],{scale:1, x:0, y:0});
		gsap.set(['#pic-tab','#pic-mo','#wave-tab','#wave-mo'],{ width:'100%'});
		gsap.set(['#pic-dt','#wave-dt'], {height:'100%'});
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
			.add(endTl(), 'end');
	}

	function animateTablet() {
		cl('animateTablet!');
		let _picProp = gsap.getProperty('#pic-tab'),
		_picW = 1/_picProp('width'),
		_picH = _picProp('height');

		resizeWaveClipPath('tab', 1/1024, 1/415);// Pass in the full size image width + height and a number between 0-1

		tl = gsap.timeline({ defaults:{ paused:false, duration:0.5, ease:'power3.out' }});
	
		tl.add('start')
			.fromTo('#wave-path-tab',{x:'-100%',y:'100%'}, {x:0, y:0, duration:2.3, ease:'power.out'}, 'start')
			.fromTo('#pic-tab',{x:'-30%', scale:1.3},{x:0, scale:1, duration:1.8, ease:'power.out'}, 'start')
			.add(logoTl(), '-=1.3')
 			.fromTo('#logo', { x:0, y:0 }, {x:'-40%', duration:1.5, ease:'power3.inOut'})
			.add('end', '-=1.3')
			.add(endTl(), 'end');
	}

	function animateMobile() {
		cl('animateMobile!');

		resizeWaveClipPath('mo', 0.0012345, 0.00178814);
		tl = gsap.timeline({ defaults:{ paused:false, duration:0.5, ease:'power3.out' }});

		tl.add('start')
			.fromTo('#wave-path-mo',{x:'-100%', y:'-100%'}, {x:0, y:0, duration:2, ease:'power3.out'}, 'start')
			.fromTo('#pic-mo',{x:0, y:'-10%', scale:1.3 },{ y:0, scale:1, duration:1.5, ease:'power3.out'}, 'start')
			.add(logoTl(), '-=.5')
			.add('end', '-=.3')
			.add(endTl(), 'end');
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
	/* Helper functions */
	function resizeWaveClipPath(_sizeSuffix='mo', _scaleX=0.0012345, _scaleY=0.00178814 ) {
		let sx = _scaleX,
			sy = _scaleY; // Edit these numbers to get close to image width + height /1
		/*console.group('resizeWaveClipPath');
		cl(`sx ${sx}`);
		cl(`sy ${sy} `)
		console.groupEnd();*/
		id(`wave-mask-${_sizeSuffix}`).setAttribute('transform', `scale(${sx} ${sy})`);
		// id(_clipPathId).setAttribute('transform', `scale(0.0012345, 0.00178814)`);
		// thePath.setAttribute('transform', `scale(${sx} ${sy})`);
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

	window.addEventListener('load', init);
	window.addEventListener('resize', onResize, true);
	
})(window, document)