$( document ).ready(function() {
    
  //load Google Fonts asynchronously 
  WebFontConfig = {
    google: {
      families: ['Roboto:100,100i,300,300i,400,400i,500,500i,700,700i,900,900i', 'Open+Sans:300,300i,400,400i,600,600i,700,700i,800,800i']
    }
  };
  (function () {
    var wf = document.createElement('script');
    wf.src = ('https:' == document.location.protocol ? 'https' : 'http') + '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
    wf.type = 'text/javascript';
    wf.async = 'true';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(wf, s);
  })();


    // scrollspy
    $("body").scrollspy({ target: '#navbar-menu' });

    //smooth Scroll
    $('a[href*="#"]:not([href="#"]):not([data-toggle])').click(function() {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html, body').animate({
                    scrollTop: target.offset().top
                }, 1000);
                return false;
            }
        }
    });
    
    //fix scrollspy 
    $(window).on("scroll", function () {
        var scrollTop = $(window).scrollTop();
        if (scrollTop == 0 || scrollTop < 65) {
          $('.fixed-link').addClass('active');
        } 
    });

    //root URL
    var $urlMain = window.location.href;
    
    //field validation only numbers
    $('#id').keyup(function (){
        this.value = (this.value + '').replace(/[^0-9]/g, '');
      });
    $('#phone').keyup(function (){
      this.value = (this.value + '').replace(/[^0-9]/g, '');
    });

    //validation form newsletter
    $( "#form-newsletter" ).validate( {
        rules: {
            email: {
                required: true,
                email: true
            },
        },
        messages: {
            email: "Please enter a valid email address",
        },
        errorElement: "em",
        errorPlacement: function ( error, element ) {
            // Add the `invalid-feedback` class to the error element
            error.addClass( "invalid-feedback" );
            if ( element.prop( "type" ) === "checkbox" ) {
                error.insertAfter( element.next( "label" ) );
            } else {
                error.insertAfter( element );
            }
        },
        highlight: function ( element, errorClass, validClass ) {
            $( element ).addClass( "is-invalid" ).removeClass( "is-valid" );
        },
        unhighlight: function (element, errorClass, validClass) {
            $( element ).addClass( "is-valid" ).removeClass( "is-invalid" );
        },
        submitHandler: function () {
            swal.fire({
                title: "!Congratulations! You have successfully subscribed",
                text: "We will send you an email soon",
                type: "success"
            }).then(function() {
                window.location = $urlMain;
            });
        },
    });
   
   //add method jQueryValidate with RUT Validation
   $.validator.addMethod("rut", function(value, element) {
    return this.optional(element) || $.Rut.validar(value);
   }, "Invalid RUT, enter again");

   // validation form contact
    $( "#form-contact" ).validate( {
        rules: {
          id: {
            required: true,
            rut: true,
          },
          digit: {
            required: true,
            minlength: 1,
          },
          phone: {
            required: true,
            minlength: 9,
            maxlength: 9,
            number: true,
          },
          mail: {
            required: true,
            email: true
          },
        },
        messages: {
          id: {
            required: "Please enter your RUT",
            minlength: "Your username must consist of at least 2 characters"
          },
          digit: {
            required: "Please enter digit",
          },
          phone: {
            required: "Please enter your phone",
            minlength: "Your phone must have at least 9 digits",
          },
          mail: {
            required: "Please enter a valid email address",
          },
        },
        errorElement: "em",
        errorPlacement: function ( error, element ) {
          // Add the `invalid-feedback` class to the error element
          error.addClass( "invalid-feedback" );
          if ( element.prop( "type" ) === "checkbox" ) {
            error.insertAfter( element.next( "label" ) );
          } else {
            error.insertAfter( element );
          }
        },
        highlight: function ( element, errorClass, validClass ) {
          $( element ).addClass( "is-invalid" ).removeClass( "is-valid" );
        },
        unhighlight: function (element, errorClass, validClass) {
          $( element ).addClass( "is-valid" ).removeClass( "is-invalid" );
        },
        submitHandler: function () {
            swal.fire({
                title: "!Congratulations! Your message has been sent",
                text: "Thank you! For quoting with us!",
                type: "success"
            }).then(function() {
                window.location = $urlMain;
            });
        },
      });

      //RUT Validation
      $('#id').Rut({
        format_on: 'keyup',
       });

      //active profile nav tab
      $( ".profile" ).click(function() {
         $(".profile").removeClass('active');
         $(this).addClass('active');
      });

    $(".single-item").slick({
        autoplay: false,
        autoplaySpeed: 3000,
        speed: 500,
        infinite: true,
        cssEase: 'linear',
        fade: true,
        arrows: true,
        dots: true,
    });
    var userOne = document.getElementById('js-userOne');
    var userTwo = document.getElementById('js-userTwo');
    var userThree = document.getElementById('js-userThree');
    var userFour = document.getElementById('js-userFour');
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(function (response){
        return response.json();
      })
      .then(function(user){
        userOne.innerHTML = user[0].name;
        userTwo.innerHTML = user[1].name;
        userThree.innerHTML = user[2].name;
        userFour.innerHTML = user[3].name;
      })
      .catch(function(){
        console.log('¡Algo ha fallado - Users!');
      });
});



