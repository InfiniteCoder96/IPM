/***
        Name: Simple Slider jQuery Plugin
        Author: Angélique Allain
        Version: 0.0.1
***/

(function($) {

	/* ========= Slider Plugin ========= */

    $.fn.slider = function(first_creation, animation, add_slide, remove_slide, colorsARR, autoplay, autoplay_interval) {

        // ========= Init slider

  		var $slider = $(this);
		// $slider.load('slider-template.html');

  		// ========= Variables

  		var $slides = $slider.find('.slide'),
            	$arrows = $slider.find('.arrow'),
  		$next = $slider.find('.next'),
  		$previous = $slider.find('.previous'),
            	$bullets_container = $slider.find('.bullet-list'),
  		$bullets = $slider.find('.bullet');

        var indice = 0,
            timer;

  		// ========= Functions

        /** Bullets navigation & active bullet **/

  	function create_bullets() {
            	var li;
  		$('.slide').each(function(i,x) {
                	li = $('<li><button class="bullet slider-button" data-index="'+i+'"></button></li>');
                	$bullets_container.append(li);
  		});
  	}

        function remove_activeClass(bullets) { // Reset active class
            bullets.each(function() {
                if ( $(this).hasClass('active') ) {
                    $(this).removeClass('active');
                }
            });
        }

        function active_bullet() {
            var $this_bullet = $(this);
            remove_activeClass( $('.bullet') );
            $('.slide').each(function() {
                var $this_slide = $(this);
                if ( $this_bullet.data('index') == $this_slide.data('index') ) {
                    indice = $this_slide.data('index'); // Update indice
                    $this_bullet.addClass('active');
                    $this_slide.show();
                }
                else {
                    $this_slide.hide();
                }
            });
        }

        /** Slider **/

        function show_first_slide() {
            $('.slide').hide();
            $('.slide:first').show();
            $('.bullet:first').addClass('active');
        }

        function next_slide() {
  		    indice = (indice + 1) % $('.slide').length;
            left_animate();
            show_slide(indice);
        }

        function previous_slide() {
            indice = ($('.slide').length + indice - 1) % $('.slide').length;
            right_animate();
            show_slide(indice);
        }
        
        function slider_autoplay() {
            next_slide();
        }
        
        
       

       

        /** Slide animation **/

        function left_animate() {
            $('.slide').removeClass('slideInRight').addClass('slideInLeft animated slide');
        }

        function right_animate() {
            $('.slide').removeClass('slideInLeft').addClass('slideInRight animated slide');
        }

        // ========= Customize/add slides for DEMO

        function set_color() {
            $('.slide').each(function(e,x) {
//                let color_class = colorsARR[e].name;
//                $(this).attr('data-color',color_class);
//                $(this).addClass(color_class);
            });
        }

        function add_new_slide() {
            var i = parseInt($('.slide').length),
                e = i+1,
                slide = $('<li class="slide" data-index="'+i+'"><div class="slide-content"><h3 class="slide-title">Slide #'+e+'</h3></div></li>');
            $('.slider-list').append(slide);
            indice = 0;
            remove_activeClass($bullets);
        }

        function add_bullets() {
            var i = $('.bullet').length,
                bullet = $('<li><button class="bullet slider-button" data-index="'+i+'"></button></li>');
            $('.bullet-list').append(bullet);
        }

        function stop_adding_slides() {
            var stop = false;
            if ( $slides.length > 7 ) {
                stop = true;
            }
            return stop;
        }

        function stop_removing_slides() {
            var stop = false;
            if ( $slides.length < 2 ) {
                stop = true;
            }
            return stop;
        }

        function remove_last_slide() {
            $('.slide:last').remove();
            $('.bullet:last').remove();
        }

  		// ========= DEMO Application

        if ( first_creation ) {
            create_bullets();
            show_first_slide();
            set_color();
        }

        if ( autoplay ) { // Autoplay function coming soon :)
            timer = setInterval(slider_autoplay,autoplay_interval);
        }

        if ( timer && autoplay == false ) {
            clearInterval(timer);
        }

        if ( add_slide ) {
            if ( stop_adding_slides() ) {
                console.log('Impossible d\'ajouter des slides à l\'infini');
            }
            else {
                add_new_slide();
                add_bullets();
                show_first_slide();
                set_color();
            }
        }

        if ( remove_slide ) {
            if ( stop_removing_slides() ) {
                console.log('Il faut au moins une slide');
            }
            else {
                remove_last_slide();
            }
            
        }

        // ========= Events

  		$next.click(next_slide);
  		$previous.click(previous_slide);
        	$bullets_container.on('click','.bullet', active_bullet);


 function show_slide(indice) { // Afficher ou masquer une slide
            remove_activeClass( $('.bullet') );
            $('.slide').each(function() {
                let $this = $(this);
                if ( $this.data('index') == indice ) {
                    $('.bullet[data-index="'+indice+'"').addClass('active');
                    //get_previous_color($this);
                    $this.show();
                }
                else {
                    $this.hide();
                }
            });
        }
		return this;

  	};

})(jQuery);
