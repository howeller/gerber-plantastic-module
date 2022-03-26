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
			.fromTo('#pic',{left:0},{left:getPicStartX(), duration:0})
			.fromTo('#wave', {left:'-50%'}, {left:0, duration:1, ease:'power3.out'}, 'start')
			.fromTo('#wave-path',{x:'-100%'}, {x:0, duration:2, ease:'power3.out'}, 'start')
			// .fromTo('#wave-path',{x:'-100%'}, {x:getWaveEndX(), duration:2, ease:'power3.out'}, 'start')
			.add(logoPopInTl(),'start')
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

			// .seek('end')
			// tl.pause(.6);
	}

	function animateMobile() {
		cl('animateMobile!');

		tl = gsap.timeline({ defaults:{ paused:false, duration:0.5, ease:'power3.out' }});

		tl.add('start')

			// .seek('end')
			// tl.pause(.6);
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
	function logoPopInTl(_id, _origin='50% 50%') {
		return gsap.timeline()
 			.fromTo('#logo', { y:100, scale:0 }, {scale:1.2, duration:0.3, stagger:0.1, ease:'back.out(1.3)'})
 			.fromTo(['#N','#E','#W'], { y:10, scale:0 }, { y:0, scale:1, duration:0.3, stagger:0.1,ease:'back.out(1.3)'})
 			.to('#logo', {y:0, scale:1, duration: 0.5, ease:'power3.inOut'}, '+=2');
			// .add(popInTl('#logo'))
	}

	function txtInTl(_txt){

		return gsap.timeline()
			.fromTo(_txt, { scale:0, y:0 }, { duration:1, scale:1, transformOrigin:'30% 50%', ease:'back.out(1.2)'})
			.fromTo(_txt+' span', { alpha:0 }, {alpha:1, duration: 0.2, ease:'none', stagger:0.1 },'-=1')
	}

	function getPicStartX() {
		let pct = 62.5,
			_maxWidth = 1440,
			// _picWidth = gsap.getProperty('#pic', 'width','px'),
			_diffX =  _maxWidth - windowWidth;
			_distanceX = Math.round( _diffX * pct )/100;

			console.group('getPicStartX')
			cl('_diffX '+_diffX);
			cl('_distanceX '+_distanceX);

			console.groupEnd();
		return _distanceX <= 0 ? 0 : '+='+_distanceX * -1;
	}
	function getWaveEndX() {
		let pct = 62.5,
			_maxWidth = 1440,
			// _picWidth = gsap.getProperty('#pic', 'width','px'),
			_diffX =  _maxWidth - windowWidth;
			_distanceX = Math.round( _diffX * pct )/100;

			console.group('getWaveEndX')
			cl('_diffX '+_diffX);
			cl('_distanceX '+_distanceX);

			console.groupEnd();
		return _distanceX <= 0 ? 0 : _distanceX * -1;
	}
	function getCenterX(_id) {
		return Math.round(windowWidth / 2 - (gsap.getProperty(_id, 'width') / 2));
	}

	window.addEventListener('load', init);
	window.addEventListener('resize', onResize, true);
	
})(window, document)