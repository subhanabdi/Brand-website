$(document).ready(function(e) {
	if (typeof $logo != "undefined") {
		if($logo == 'logo-design'){
			$('.logoactive').css({
				'background': 'url(/web-it/assets/images/newportfolio/nav/nav_logo.png) no-repeat',
				'color': '#fff' 	
			});
		}else if($logo == 'web-it'){
			$('.webactive').css({
				'background': 'url(/web-it/assets/images/newportfolio/nav/nav_web.png) no-repeat',
				'color': '#fff' 	
			});
		}else if($logo == 'web-development'){
			$('.webdev-new').css({
				'background': 'url(/web-it/assets/images/newportfolio/nav/web-dev.jpg) no-repeat left 2px',
				'color': '#fff' 	
			});
		}else if($logo == 'animated-video'){
			$('.aniactive').css({
				'background': 'url(/web-it/assets/images/newportfolio/nav/nav_ani.png) no-repeat',
				'color': '#fff' 	
			});
		}else if($logo == 'products-packaging'){
			$('.printactive').css({
				'background': 'url(/web-it/assets/images/newportfolio/nav/nav_print.png) no-repeat',
				'color': '#fff' 	
			});
		}else if($logo == 'apps-game-development'){
			$('.appsactive').css({
				'background': 'url(/web-it/assets/images/newportfolio/nav/nav_dev.png) no-repeat',
				'color': '#fff' 	
			});
		}
	}
});