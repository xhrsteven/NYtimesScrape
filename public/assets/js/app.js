
$(document).ready(function(){
  $('.button-collapse').sidenav();

  $('.modal').modal();
//save articles
  $('.save-article-btn').on('click', function(){
    var dbId = $(this).data('dbid');

    $.ajax({
      method: 'GET',
      url:"/articles/save/"+dbId,
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
      method:'DELETE',
      url:'/articles/deleteArticle/'+dbId,
      data: {saved: false}
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
      url: '/comments/getComment'+dbId
    })
    .done(function(data){
      console.log(data);
      $(".modal-title").html(data.title);
      $('.comment-display-root').empty();
      $('.save-comment-button').data('dbid',data._id);
      if(data.comment.length === 0 ){
        $('.comment-display-root').html('No comment yet, please leave the first comment!')
      }else{
        for(var i=0; i<data.comment.length; i++){
          var newCard = "<div class='card white-grey darken-5'><div class='card-content'><p class='col s10 left-align'>" + data.comment[i].body
          +"</p><button class='col s2 btn delete-comment-button' data-dbid='" + data.comment[0]._id + "'>X</button></div></div>";

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
      url:'/comments/createComment'+dbId,
      data:{
        body: $('#comment-input').val()
      }
    })
    .done(function(data){
      console.log(data);
      $(this).html('Comment Saved');
      // $('#comment-input').val('');
    })
  });

  $('.delete-comment-button').on('click',function(){
    var dbId = $(this).data('dbid');

    $.ajax({
      method:'DELETE',
      url:'/comments/deleteComment',
      data: dbId
    })
    .done(function(data){
      console.log(data);
      location.reload();
    })
  })


  $('#download-button').on('click',function(e){
    e.preventDefault();
    $.ajax({
      url:'/scape/newArticles',
      method: 'GET'
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