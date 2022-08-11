$(document).ready(function () {
  
   $(".fancybox-media").fancybox({
        helpers: {
            media: {}
        }
    });
  
function validateEmail(sEmail) {
var filter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
if (filter.test(sEmail)) {
   return true;
    }
    else {
        return false;
    }
}
	
 $('#btnValidate').click(function() {

        var sEmail = $('#txtEmail').val();

        if ($.trim(sEmail).length == 0) {

            alert('Please enter valid email address');

            e.preventDefault();

        }

        if (validateEmail(sEmail)) {

window.location.href = "/thankyou";

			
			
        }

        else {

            alert('Invalid Email Address');

            e.preventDefault();

        }

    });

	
	
	

  $('.toggle-menu').jPushMenu();



// Select all links with hashes
$('a[href*="#"]')
  // Remove links that don't actually link to anything
  .not('[href="#"]')
  .not('[href="#0"]')
  .click(function(event) {
    // On-page links
    if (
      location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
      && 
      location.hostname == this.hostname
    ) {
      // Figure out element to scroll to
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      // Does a scroll target exist?
      if (target.length) {
        // Only prevent default if animation is actually gonna happen
        event.preventDefault();
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000, function() {
          // Callback after animation
          // Must change focus!
          var $target = $(target);
          $target.focus();
          if ($target.is(":focus")) { // Checking if the target was focused
            return false;
          } else {
            $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
            $target.focus(); // Set focus again
          };
        });
      }
    }
  });


  $(function () {

    var path = window.location.href;


    var newURLssss = window.location.pathname.split('/')[1];
    if (/logo-design/.test(newURLssss)) {

        $(".parenturl a[href^='/logo-design/']").each(function () {
            $(this).addClass('selectnavs');

        });
        // alert(newURLssss);
    }

    if (/schools/.test(newURLssss)) {

        $(".parenturl a[href^='/schools/']").each(function () {
            $(this).parent("").addClass('active');

        });
        // alert(newURLssss);
    }


    $('.main-nav li a').each(function () {
        if (this.href === path) {
            $(this).parents(".parenturl").addClass('selectnavs');

        }
    });

});
	
	
  // for popup
  $('#popup-closed').click(function () {
    $("#popup").removeClass("acttive");
    // $('#popup').css({top: '-100%'});
    setTimeout(() => {
      $('body').css({ overflow: 'auto' });
    }, 400)
  })
  $('.popup-open').click(function () {
    $("#popup").addClass("acttive");
    // $('#popup').css({top: 0});
    $('body').css({ overflow: 'hidden' });
  })

  // Load More //

  let wid = $(window).width()
  if ( wid < 992) {
    $('.slider-1').slick({
      dots: true,
      infinite: false,
      speed: 300,
      slidesToShow: 4,
      slidesToScroll: 4,
      responsive: [
        {
          breakpoint: 992,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 4,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2
          }
        },
        {
          breakpoint: 481,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
        // You can unslick at a given breakpoint now by adding:
        // settings: "unslick"
        // instead of a settings object
      ]
    });
    
    $('.slider-2').slick({
      dots: true,
      infinite: false,
      speed: 300,
      slidesToShow: 4,
      slidesToScroll: 4,
      responsive: [
        {
          breakpoint: 992,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 4,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2
          }
        },
        {
          breakpoint: 481,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
        // You can unslick at a given breakpoint now by adding:
        // settings: "unslick"
        // instead of a settings object
      ]
    });
    
    $('.slider-3').slick({
      dots: true,
      infinite: false,
      speed: 300,
      slidesToShow: 4,
      slidesToScroll: 4,
      responsive: [
        {
          breakpoint: 992,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 4,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
        // You can unslick at a given breakpoint now by adding:
        // settings: "unslick"
        // instead of a settings object
      ]
    });
  };



$(".main-nav > ul").clone().appendTo(".apnd-menu-device");


  $(".packdetails .listpacks").mCustomScrollbar({
    scrollButtons: { enable: true },
    theme: "light-thick",
    scrollbarPosition: "outside"
  });


  $(".mainsliders-homes").not('.slick-initialized').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    dots: false
  });

  $('.packagesbxs .tabscontent').hide();
  $('.packagesbxs .tabscontent:first').show();
  $('.packagesbxs .toptabs1 li:first').addClass('active');
  $('.packagesbxs .toptabs1 li').click(function (event) {
    event.preventDefault();

    $('.packagesbxs .toptabs1 li').removeClass('active');
    $(this).addClass('active');
    $('.packagesbxs .tabscontent').hide();

    var selectTab = $(this).find('a').attr("href");
    //alert(selectTab);
    $(selectTab).fadeIn();
    $('.responsive-slider').slick('setPosition');

  });

  $(".fixedform .barforms").click(function (event) {

    $(this).parent().toggleClass("active");
    $('.formOverlaySide').toggleClass('active');
    event.stopPropagation();
  });

  $('body').delegate('.mainpriceng-count .leftcont-ban a ', 'click', function (event) {
    // console.log('qa');
    event.preventDefault();
    $('.fixedform .barforms').trigger('click');
  });


  $(function () {
    // $(".fixedfomrclick").click(function (event) {

    //   $('html, body').animate({ scrollTop: $('#section08').offset().top + 400 }, 500, 'linear');
    //   $('.fixedform .barforms').trigger('click');

    // });

    $(".slidedwon-btns").click(function () {

      $('html, body').animate({ scrollTop: $('#packagesdrops').offset().top-80 }, 500, 'linear');
      //$('.fixedform .barforms').trigger('click');

    });
  });

  // $(".liststylss > li > a").hover(function(event) {
  //   $(".innerdropdowns").removeClass("opaque");

  //   var newImage = $(this).index();

  //   $(".innerdropdowns").eq(newImage).addClass("opaque");

  //   $(".liststylss li").removeClass("active");
  //   $(this).parent().addClass("active");
  // });

  if ($(window).width() > 768) {
    $(".liststylss > li").hover(
      function () {
        $(this).addClass("active").siblings().removeClass("active");
      },
      function () {
        //$(".pack-list > li:nth-child(2)").addClass("pkg-active").siblings().removeClass("pkg-active");
        $('.always-active').addClass("active").siblings().removeClass("active")
      }
    );

  $(".packagesbxs .col-md-3").hover(
        function () {
          $(this).addClass("active").siblings().removeClass("active");
        },
        function () {
          //$(".pack-list > li:nth-child(2)").addClass("pkg-active").siblings().removeClass("pkg-active");
          $('.always-active').addClass("active").siblings().removeClass("active")
        }
      );



  }
$(".packagesbxs .col-md-3 .boxpackages.active").parent().addClass("always-active active");

$(".mainpackages .packagesbxs .tabscontent .col-md-3").removeClass("col-md-3").addClass("col-md-4");


  $(window).scroll(function () {
    if ($(window).scrollTop() >= 900) {
      $('.fixedform').addClass('fixed-forms-main');

    }
    if ($(window).scrollTop() >= 100) {
      $('header').addClass('stickyheader');

    }
    else {
      $('.fixedform').removeClass('fixed-forms-main');
      $('header').removeClass('stickyheader');

    }
  });





  $('.accord-tab').click(function (e) {
    e.preventDefault();

    var $this = $(this);
    if ($this.hasClass('actives')) {
      $this.removeClass('actives');
      $this.parent().removeClass('actives');
      $this.next().slideUp(350);
    } else {

      $this.parent().parent().find('li a').removeClass('actives');
      $this.parent().parent().find('li').removeClass('actives');
      $this.parent().parent().find('li .inner').slideUp(350);
      $this.toggleClass('actives');
      $this.parent().toggleClass('actives');
      $this.next().stop().slideToggle(350);
    }
  });

  // $('.mm-field fieldset').click(function () {
  //   $(this).closest('.mm-field').find('fieldset').addClass('active');
  // })
  $('.mm-field input, .mm-field textarea').blur(function () {
    if ($(this).val() != '') {
      $(this).closest('.mm-field').find('fieldset').addClass('active');
    } else {

      $(this).closest('.mm-field').find('fieldset').removeClass('active');
    }

  });

  $('.mm-field input, .mm-field textarea').focusin(function () {
    $(this).closest('.mm-field').find('fieldset').addClass('active');

  });

  $(".fullslider .row").not('.slick-initialized').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: false,
    dots: true
  });


  $('.count').each(function () {
    $(this).prop('Counter', 0).animate({
      Counter: $(this).text()
    }, {
        duration: 4000,
        easing: 'swing',
        step: function (now) {
          $(this).text(Math.ceil(now));
        }
      });
  });

  var loc = window.location.hash.substr(1);
  //alert(loc);
  /*var pathArray = window.location.pathname.split('/');
  var secondLevelLocation = pathArray[1];
  loc = secondLevelLocation;*/
  if (loc == "pack1") {
    $('.packagesbxs .toptabs1 li').removeClass('active');
    $('.packagesbxs .toptabs1 li:first').removeClass('active');
    $('.packagesbxs .toptabs1 li.pack1').addClass('active');
    $('.packagesbxs .tabscontent').fadeOut();
    $('.packagesbxs #pack1').fadeIn();
    $('html, body').animate({ scrollTop: $('#pack1').offset().top - 300 }, 500, 'linear');
  }

  if (loc == "pack2") {
    $('.packagesbxs .toptabs1 li').removeClass('active');
    $('.packagesbxs .toptabs1 li:first').removeClass('active');
    $('.packagesbxs .toptabs1 li.pack2').addClass('active');
    $('.packagesbxs .tabscontent').fadeOut();
    $('.packagesbxs #pack2').fadeIn();
    $('html, body').animate({ scrollTop: $('#pack2').offset().top - 300 }, 500, 'linear');
  }

  if (loc == "pack3") {
    $('.packagesbxs .toptabs1 li').removeClass('active');
    $('.packagesbxs .toptabs1 li:first').removeClass('active');
    $('.packagesbxs .toptabs1 li.pack3').addClass('active');
    $('.packagesbxs .tabscontent').fadeOut();
    $('.packagesbxs #pack3').fadeIn();
    $('html, body').animate({ scrollTop: $('#pack3').offset().top - 300 }, 500, 'linear');
  }

  if (loc == "pack4") {
    $('.packagesbxs .toptabs1 li').removeClass('active');
    $('.packagesbxs .toptabs1 li:first').removeClass('active');
    $('.packagesbxs .toptabs1 li.pack4').addClass('active');
    $('.packagesbxs .tabscontent').fadeOut();
    $('.packagesbxs #pack4').fadeIn();
    $('html, body').animate({ scrollTop: $('#pack4').offset().top - 300 }, 500, 'linear');
  }



  if (loc == "stationerypack") {
    $('.packagesbxs .toptabs1 li').removeClass('active');
    $('.packagesbxs .toptabs1 li:first').removeClass('active');
    $('.packagesbxs .toptabs1 li.pack4').addClass('active');
    $('.packagesbxs .tabsclick li.pack8 ').addClass('active');
    $('.packagesbxs .tabsclick li.first').removeClass('active');
    $('.packagesbxs .tabscontent').fadeOut();
    $('.packagesbxs #pack4').fadeIn();
    $('.packagesbxs .innertabcontents').removeClass('active');
    $('.packagesbxs #stationerypack').addClass('active');
    $('html, body').animate({ scrollTop: $('#stationerypack').offset().top - 300 }, 500, 'linear');
  }

  if (loc == "broucherspack") {
    $('.packagesbxs .toptabs1 li').removeClass('active');
    $('.packagesbxs .toptabs1 li:first').removeClass('active');
    $('.packagesbxs .toptabs1 li.pack4').addClass('active');
    $('.packagesbxs .tabsclick li.pack6 ').addClass('active');
    $('.packagesbxs .tabsclick li.first').removeClass('active');
    $('.packagesbxs .tabscontent').fadeOut();
    $('.packagesbxs #pack4').fadeIn();
    $('.packagesbxs .innertabcontents').removeClass('active');
    $('.packagesbxs #broucherspack').addClass('active');
    $('html, body').animate({ scrollTop: $('#broucherspack').offset().top - 300 }, 500, 'linear');
  }

  if (loc == "bannerpack") {
    $('.packagesbxs .toptabs1 li').removeClass('active');
    $('.packagesbxs .toptabs1 li:first').removeClass('active');
    $('.packagesbxs .toptabs1 li.pack4').addClass('active');
    $('.packagesbxs .tabsclick li.pack5').addClass('active');
    $('.packagesbxs .tabscontent').fadeOut();
    $('.packagesbxs #pack4').fadeIn();
    $('.packagesbxs .innertabcontents').removeClass('active');
    $('.packagesbxs #bannerpack').addClass('active');
    $('html, body').animate({ scrollTop: $('#bannerpack').offset().top - 300 }, 500, 'linear');
  }

  if (loc == "packagingpack") {
    $('.packagesbxs .toptabs1 li').removeClass('active');
    $('.packagesbxs .toptabs1 li:first').removeClass('active');
    $('.packagesbxs .toptabs1 li.pack4').addClass('active');
    $('.packagesbxs .tabsclick li.pack7 ').addClass('active');
    $('.packagesbxs .tabsclick li.first').removeClass('active');
    $('.packagesbxs .tabscontent').fadeOut();
    $('.packagesbxs #pack4').fadeIn();
    $('.packagesbxs .innertabcontents').removeClass('active');
    $('.packagesbxs #packagingpack').addClass('active');
    $('html, body').animate({ scrollTop: $('#packagingpack').offset().top - 300 }, 500, 'linear');

  }


  // Reviews Loc //

  if (loc == "logotest") {
    $('.testimonials .toptabs1 li').removeClass('active');
    $('.testimonials .toptabs1 li:first').removeClass('active');
    $('.testimonials .toptabs1 li.testim1').addClass('active');
    $('.testimonials .innertabcontents').removeClass('active');
    $('.testimonials #logotest').addClass('active');
    $('html, body').animate({ scrollTop: $('#logotest').offset().top - 300 }, 500, 'linear');
  }

  if (loc == "webtest") {
    $('.testimonials .toptabs1 li').removeClass('active');
    $('.testimonials .toptabs1 li:first').removeClass('active');
    $('.testimonials .toptabs1 li.testim2').addClass('active');
    $('.testimonials .innertabcontents').removeClass('active');
    $('.testimonials #webtest').addClass('active');
    $('html, body').animate({ scrollTop: $('#webtest').offset().top - 300 }, 500, 'linear');
  }

  if (loc == "animtest") {
    $('.testimonials .toptabs1 li').removeClass('active');
    $('.testimonials .toptabs1 li:first').removeClass('active');
    $('.testimonials .toptabs1 li.testim3').addClass('active');
    $('.testimonials .innertabcontents').removeClass('active');
    $('.testimonials #animtest').addClass('active');
    $('html, body').animate({ scrollTop: $('#animtest').offset().top - 300 }, 500, 'linear');
  }

  if (loc == "brandtest") {
    $('.testimonials .toptabs1 li').removeClass('active');
    $('.testimonials .toptabs1 li:first').removeClass('active');
    $('.testimonials .toptabs1 li.testim4').addClass('active');
    $('.testimonials .innertabcontents').removeClass('active');
    $('.testimonials #brandtest').addClass('active');
    $('html, body').animate({ scrollTop: $('#brandtest').offset().top - 300 }, 500, 'linear');
  }

  // Portfolio Loc //

  if (loc == "logoport") {
    $('.portfoliomaindivs .toptabs1 li').removeClass('active');
    $('.portfoliomaindivs .toptabs1 li:first').removeClass('active');
    $('.portfoliomaindivs .toptabs1 li.portfolio2').addClass('active');
    $('.portfoliomaindivs #logoport').addClass('active');
    $('.portfoliomaindivs #logoall1').addClass('active');
    $('#All.innertabcontents ').removeClass('active');
    $('html, body').animate({ scrollTop: $('#logoport').offset().top - 300 }, 500, 'linear');
  }

  if (loc == "webport") {
    $('.portfoliomaindivs .toptabs1 li').removeClass('active');
    $('.portfoliomaindivs .toptabs1 li:first').removeClass('active');
    $('.portfoliomaindivs .toptabs1 li.portfolio3').addClass('active');
    $('.portfoliomaindivs #webport').addClass('active');
    $('.portfoliomaindivs #innerall3').addClass('active');
    $('#All.innertabcontents ').removeClass('active');
    $('html, body').animate({ scrollTop: $('#webport').offset().top - 300 }, 500, 'linear');
  }

  if (loc == "animport") {
    $('.portfoliomaindivs .toptabs1 li').removeClass('active');
    $('.portfoliomaindivs .toptabs1 li:first').removeClass('active');
    $('.portfoliomaindivs .toptabs1 li.portfolio4').addClass('active');
    $('.portfoliomaindivs #animport').addClass('active');
    $('.portfoliomaindivs #innerall2').addClass('active');
    $('#All.innertabcontents ').removeClass('active');
    $('html, body').animate({ scrollTop: $('#animport').offset().top - 300 }, 500, 'linear');
  }

  if (loc == "brandport") {
    $('.portfoliomaindivs .toptabs1 li').removeClass('active');
    $('.portfoliomaindivs .toptabs1 li:first').removeClass('active');
    $('.portfoliomaindivs .toptabs1 li.portfolio5').addClass('active');
    $('.portfoliomaindivs #brandport').addClass('active');
    $('.portfoliomaindivs #innerall2').addClass('active');
    $('#All.innertabcontents ').removeClass('active');
    $('html, body').animate({ scrollTop: $('#brandport').offset().top - 300 }, 500, 'linear');

  }

  if (loc == "bannerport") {
    $('.portfoliomaindivs .toptabs1 li').removeClass('active');
    $('.portfoliomaindivs .toptabs1 li:first').removeClass('active');
    $('.portfoliomaindivs .toptabs1 li.portfolio5 ').addClass('active');
    $('.portfoliomaindivs .tabsclick li.port5 ').addClass('active');
    $('.portfoliomaindivs #brandingport, .portfoliomaindivs #bannerport').addClass('active');
    $('.portfoliomaindivs #innerall2').addClass('active');
    $('#All.innertabcontents ').removeClass('active');
    $('html, body').animate({ scrollTop: $('#bannerport').offset().top - 300 }, 500, 'linear');

  }

  if (loc == "stationeryport") {
    $('.portfoliomaindivs .toptabs1 li').removeClass('active');
    $('.portfoliomaindivs .toptabs1 li:first').removeClass('active');
    $('.portfoliomaindivs .toptabs1 li.portfolio5').addClass('active');
    $('.portfoliomaindivs .tabsclick li.port6').addClass('active');
    $('.portfoliomaindivs .tabsclick li.first').removeClass('active');
    $('.portfoliomaindivs #brandingport, .portfoliomaindivs #stationeryport').addClass('active');
    $('.portfoliomaindivs #innerall2').addClass('active');
    $('#All.innertabcontents ').removeClass('active');
    $('html, body').animate({ scrollTop: $('#stationeryport').offset().top - 300 }, 500, 'linear');

  }

  if (loc == "packaginngport") {
    $('.portfoliomaindivs .toptabs1 li:first').removeClass('active');
    $('.portfoliomaindivs .toptabs1 li.portfolio5').addClass('active');
    $('.portfoliomaindivs .tabsclick li.port7').addClass('active');
    $('.portfoliomaindivs .tabsclick li.first').removeClass('active');
    $('.portfoliomaindivs #brandingport, .portfoliomaindivs #packaginngport').addClass('active');
    $('.portfoliomaindivs #innerall2').addClass('active');
    $('#All.innertabcontents ').removeClass('active');
    $('html, body').animate({ scrollTop: $('#packaginngport').offset().top - 300 }, 500, 'linear');

  }

  if (loc == "broucherport") {
    $('.portfoliomaindivs .toptabs1 li').removeClass('active');
    $('.portfoliomaindivs .toptabs1 li:first').removeClass('active');
    $('.portfoliomaindivs .toptabs1 li.portfolio5').addClass('active');
    $('.portfoliomaindivs .tabsclick li.port8').addClass('active');
    $('.portfoliomaindivs .tabsclick li.first').removeClass('active');
    $('.portfoliomaindivs #brandingport, .portfoliomaindivs #broucherport').addClass('active');
    $('.portfoliomaindivs #innerall2').addClass('active');
    $('#All.innertabcontents ').removeClass('active');

    $('html, body').animate({ scrollTop: $('#broucherport').offset().top - 300 }, 500, 'linear');


  }


  $(".animation .portfolio-mmbx .col-md-3:nth-child(n+9)").hide();
  // $(".logopackages-p .boxpackages, .innerpackages-p .boxpackages").removeClass("active");




  $(function () {
    $('.scrolldown-fl a[href*=#]').on('click', function (e) {
      e.preventDefault();
      $('html, body').animate({ scrollTop: $($(this).attr('href')).offset().top }, 500, 'linear');
    });
  });

  $('.child-tooltip').hover(function () {
    $(this).siblings('ul').show();
  });
  $('.child-tooltip').mouseleave(function () {
    $(this).siblings('ul').hide();
  });


  // setInterval(function() {

  // var random = Math.floor(Math.random() * 7);
  // var $li = $(".blink-bx .blinkbxs > div");
  // $li.removeClass('active').parent().removeClass("parentdivss");
  // $li.eq(random % $li.length).addClass("active").parent().addClass("parentdivss");

  // }, 1000);


  // $(function(){
  //   $('.srvc-box').hover(function(){
  //     // on mouse enter
  //      var $link = $(this).find("img").attr('src');
  //      var customdata = $(this).find("a").attr('href');

  //      $(this).find("img").data("link", $link);
  //      $(this).find("img").attr('src',customdata);

  //   }, function(){
  //     // on mouse leave
  //     alert($(this).find("img").attr('src', $link));

  //   });

  // });




  $(".testimo .testi-main").removeClass("slidertest-mm");
  $(".testimo .testi-main .col-md-4").removeClass("col-md-4").addClass("col-md-6");



  //alert("Hello");


  // var y=5;

  // $('#loadMore').click(function () {
  //   var add =  $('.testimo .testi-main').slice( x , 5 );
  //   x= x+5
  //     // x= (x+5 <= size_li) ? x+5 : size_li;
  //     $('.testimo .testi-main > div').slice( x , 5 ).hide();
  //     console.log(add)
  //     console.log(x)
  // });

  $(".testimo .testi-main > div").slice(0, 8).show();
  var size_li = $(".testimo .testi-main > div").size();
  $("#loadMore").on('click', function (e) {
    e.preventDefault();
    $(".testimo .testi-main > div:hidden").slice(0, 4).slideDown();
    if ($(".testimo .testi-main > div:hidden").length == 0) {

    }
    $('html,body').animate({
      scrollTop: $(this).offset().top
    }, 1500);
  });





  $('.tabsclick > li').on('click', function () {
    $('.responsive-slider-1').slick('setPosition');
  });
  $('.tabsclick span').on('click', function () {
    $([$(this).parent()[0], $($(this).data('href'))[0]]).addClass('active').siblings('.active').removeClass('active');
    $('.responsive-slider').slick('setPosition');
 
  });

  $(".packagesbranding-1").not('.slick-initialized').slick({
    slidesToShow: 4,
    slidesToScroll: 4,
    arrows: false,
    autoplay: true,
    dots: true,
    responsive: [
    {
      breakpoint: 991,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3
      }
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2
      }
    },
        {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
  ]   
  });


  $(".slidertest-mm").not('.slick-initialized').slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    autoplay: false,
    false: true,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
      // You can unslick at a given breakpoint now by adding:
      // settings: "unslick"
      // instead of a settings object
    ]
  });


  $('.tabs-btns li a').click(function () {
    var tab_id = $(this).attr('data-tab');

    $('.tabs-btns li').removeClass('active');
    $('.howdiscr').removeClass('active');

    $(this).parent().addClass('active');
    $("#" + tab_id).addClass('active');
  });





  $('.tabs-box ul.tabs-list li').click(function () {
    let attrs = $(this).attr('tab')
    $(this).addClass('active').siblings().removeClass('active')
    $(this).parents('.tabs-box').find(`#${attrs}`).show().siblings('.tab-content').hide()
  })



  $('#videoduration').val('0.5').trigger('change');

  docalculation();



  $('#animationcountry').change(function () {

    var thisval = $(this).val();

    $('#animationcountrycode').val('+' + thisval);


  });

  $('.pricingbox li').click(function () {
    $(this).addClass('active');
    $(this).siblings().removeClass('active');
    var thistext = $(this).find('h3').text();
    $('input[name="animationtype"]').val(thistext);

    docalculation();

  });



  $('#videoduration').change(function () {
    var thisval = $(this).val();
    var substr = thisval.split('.');
    if (substr[1] == 5) {
      var seconds = "30";
    } else {
      var seconds = "0";
    }
    $('#durationoutput').text(substr[0] + " Min " + seconds + " Sec");


    $('input[name="videoduration"]').val(substr[0] + " Min " + seconds + " Sec");

    docalculation();
  });



  $('#videoqty').change(function () {
    var thisval = $(this).val();
    if (thisval == 0) {
      thisval = 1;
    }
    $('#videoqty').val(thisval);
    $('input[name="noofvideos"]').val(thisval);


    docalculation();
  });




  function docalculation() {



    var theduration = $('#videoduration').val();
    var unitcost = $('.pricingbox li.active').attr('rel');

    var projectcost = parseFloat(theduration) * parseInt(unitcost);
    var finalcost = parseFloat(projectcost) * 2;
    // alert(unitcost);

    var qty = $('input[name="noofvideos"]').val();
    var thefinalamount = parseFloat(finalcost) * parseInt(qty);

    var initialamount = parseFloat(thefinalamount) * 5;
    var discountamount = parseFloat(thefinalamount) * 4;

    $('input[name="price"]').val(thefinalamount);
    $('.costing-final span').text(thefinalamount);
    $('.costing-initial span').text(initialamount);
    // $('.costing-discount span').text(discountamount);


  }




});



  if ($(window).width() < 992) {
    

    $(".responsive-slider").not('.slick-initialized').slick({
      slidesToShow: 3,
      slidesToScroll: 1,
      arrows: true,
      autoplay: false,
      dots: true,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            arrows: false,
            centerMode: true,
            slidesToShow: 3
          }
        },
        {
          breakpoint: 600,
          settings: {
            arrows: false,
            centerMode: true,
            slidesToShow: 2
          }
        },
        {
          breakpoint: 481,
          settings: {
            arrows: false,
            centerMode: true,
            slidesToShow: 1
          }
        }
      ]
    });
    $(".responsive-slider-1").not('.slick-initialized').slick({
      slidesToShow: 2,
      slidesToScroll: 1,
      arrows: true,
      autoplay: false,
      dots: true,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            arrows: false,
            centerMode: true,
            slidesToShow: 1
          }
        },
        {
          breakpoint: 480,
          settings: {
            arrows: false,
            centerMode: true,
            slidesToShow: 1
          }
        }
      ]
    });


  }





// $(".cookie-btn-3").click(function () {
//   $('.cookie-bar').fadeOut();
// });


// $(document).ready(function () {
//   if (readCookie("cookie_accepted") == "1") {
//     $(".cookie-bar").hide();
//   }
//   else {
//     $(".cookie-bar").show();
//     $('body').addClass('pbpx-45');
//     $('.cookie-btn').click(function () {
//       $('body').removeClass('pbpx-45');
//       //$('body').addClass('pbpx-10');

//       $('.cookie-bar').fadeOut();
//       createCookie("cookie_accepted", 1, 365);
//     });
//   }
// });


// function getParameterByName(name, url) {
//   if (!url) {
//     url = window.location.href;
//   }
//   name = name.replace(/[\[\]]/g, "\\$&");
//   var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
//     results = regex.exec(url);
//   if (!results) return null;
//   if (!results[2]) return '';
//   return decodeURIComponent(results[2].replace(/\+/g, " "));
// }

// function createCookie(name, value, days) {
//   var expires = "";
//   if (days) {
//     var date = new Date();
//     date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
//     expires = "; expires=" + date.toUTCString();
//   }
//   document.cookie = name + "=" + value + expires + "; path=/";
// }

// function readCookie(name) {
//   var nameEQ = name + "=";
//   var ca = document.cookie.split(';');
//   for (var i = 0; i < ca.length; i++) {
//     var c = ca[i];
//     while (c.charAt(0) == ' ') c = c.substring(1, c.length);
//     if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
//   }
//   return null;
// }

// function eraseCookie(name) {
//   createCookie(name, "", -1);
// }

// function setButtonURL(){ 
// 	LC_API.open_chat_window(); 
// 	} 



