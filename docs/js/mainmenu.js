$(document).ready(function() {

    $("#button-play").on("click", function() {
        $("#middle-box").show();
        $("#menu").fadeOut("slow", function() {
            $(this).remove();
        });
    });

    $("#button-settings").on("click", function() {
        $("div.tab-container button").removeClass("active");
        $(this).addClass("active");

        $(".info-area div").hide();
        $("#settings").fadeIn("fast");
    });

    $("#button-info").on("click", function() {
        $("div.tab-container button").removeClass("active");
        $(this).addClass("active");

        $(".info-area div").hide();
        $("#instructions").fadeIn("fast");
    });

    $("#button-credits").on("click", function() {
        $("div.tab-container button").removeClass("active");
        $(this).addClass("active");
        
        $(".info-area div").hide();
        $("#credits").fadeIn("fast");
    });

    $(document).on("loaderDone.DemoSystem", function() {
        $("#button-play").removeAttr("disabled");
    });

});
