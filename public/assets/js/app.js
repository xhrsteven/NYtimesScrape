
$(document).ready(function(){
  $('.button-collapse').sidenav();

  $('.modal').modal();

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

  $('.view-comments-button').on('click',function(){
    var dbId = $(this).data('dbid');
    $('#comment-input').val('');
    $.ajax({
      method:'GET',
      url: '/articles/'+dbId
    })
    .done(function(data){
      console.log(data[0]);
      $(".modal-title").html(data[0].title);
      // $('.comment-display-root').empty();
      $('.save-comment-button').data('dbid',data[0]._id);
      if(data[0].comment.length === 0 ){
        $('.comment-display-root').html('No comment yet, please leave the first comment!')
      }else{
        for(var i=0; i<data[0].comment.length; i++){
          var newCard = "<div class='card blue-grey darken-1'><div class='card-content'><p class='col s10 left-align'>" + data[0].comment[i].body
          +"</p><button class='col s1 btn delete-comment-button' data-dbid='" + data[0].comment[i]._id + "'>X</button></div></div>";

          $('.comment-display-root').prepend(newCard);
        }
      }
    })
  });

  // when save comment is clicked, add comment to db
  $('.save-comment-button').on('click', function(){
    var dbId = $(this).data('dbid');

    $.ajax({
      method:'POST',
      url:'/articles/'+dbId,
      data:{
        body: $('#comment-input').val()
      }
    })
    .done(function(data){
      console.log(data);
      // $(this).html('Comment Saved');
      $('#comment-input').val('');
    })
  });

  $('.delete-comment-button').on('click',function(){
    var dbId = $(this).data('dbid');

    $.ajax({
      method:'DELETE',
      url:'/comments/'+dbId,
    })
    .done(function(data){
      console.log(data);
      location.reload();
    })
  })


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