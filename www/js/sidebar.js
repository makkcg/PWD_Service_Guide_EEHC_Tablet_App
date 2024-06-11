////document ready 
$(document).ready(function() {
	/*****side menu initialization***/
	if($(window).width()<=2048){
		$("#wrapper").removeClass("toggled");
	}else{
		$("#wrapper").addClass("toggled");
	}
			  
	 $("#menu-toggle").click(function(e) {
                e.preventDefault();
                $("#wrapper").toggleClass("toggled");
            });

            $(window).resize(function(e) {
             /*if($(window).width()<=768){*/
				if($(window).width()<=2048){
					$("#wrapper").removeClass("toggled");
				}else{
					$("#wrapper").addClass("toggled");
				}
            });
});///end document ready 