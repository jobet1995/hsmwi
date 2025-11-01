$(document).ready(function (){
    $(window).on("scroll", function(){
        if($(this).scrollTop() > 50){
            navbar.addClass("navbar-scrolled");
        } else {
            navbar.removeClass("navbar-scrolled");
        }
    });

    $(".navbar-link[href^='#']").on("click", function (e) {
        e.preventDefault();

        const target = $(this.getAttribute("href"));
        if(target.length){
            $("html, body").animate(
                {
                    scrollTop: target.offset().top - 70,
                },
                1000,
                "swing"
            );
        }
        $(".navbar-collapse").collapse("hide")
    });

    $(".btn-support").on("click", function (e) {
        e.preventDefault();

        const button = $(this);
        button.prop("disabled", true).text("Sending......");

        $.ajax({
            url: "/support/request",
            method: "POST",
            data: {
                csrfmiddlewaretoken: $("input[name='csrfmiddlewaretoken']").val(),
                message: "User clicked Get Support button",
            },
            success: function(response){
                alert("Support request sent, successfully");
                console.log(response);
            },
            error: function(xhr, status, error){
                console.error("AJAX error:", error);
                alert("An error occurred, please try again later")
            },
            complete: function() {
                button.prop("disabled", false).text("Get Support")
            },
        });
    });

    $(".nav-item").each(function(index) {
        $(this)
          .delay(100 * index)
          .queue(function (next) {
            $(this).css({ opacity: 1, transform: "translateY(0)"});
            next();
          })
    });

    $(".navbar-toggler").on("click", function() {
        $(this).toggleClass("active");
    })
})