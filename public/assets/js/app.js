
$(document).ready(function(){
  $('.button-collapse').sidenav();

  $('.modal').modal;

  $('.save-article-btn').on('click', function(){
    var dbId = $(this).data('dbid');

    $.ajax({
      method: 'PUT',
      url:"/articles/"+dbId,
      data: {saved: true}
    })
    .done(function(data){
      console.log(data);
    });

    $(this).html('Article saved');
  });

  $('.delete-from-saved-button').on('click', function(){
    var dbId = $(this).data('dbid');

    $.ajax({
      method:'PUT',
      url:'/articles/'+dbId,
      data: {saved:false}
    })
    .done(function(data){
      location.reload();
    })
  });

  // $('.view-comments-button').on('click',function(){

  // })

})

//Side Nav bar
 document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.sidenav');
    // var instances = M.Sidenav.init(elems, options);
  });

  // Or with jQuery

  $(document).ready(function(){
    $('.sidenav').sidenav();
  });