$(document).ready(function() {
   $(".navbar-toggler, .overlay").on("click",function(){
       $(".mobileMenu, .overlay").toggleClass("open");
   });
  });

 
  $(document).ready(function () {
    $('#sidebarCollapse').on('click', function () {
        $(this).toggleClass('active');
    });
});