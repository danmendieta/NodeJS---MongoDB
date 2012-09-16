$(document).ready(function(){
  $('a.cancel').on('click', function(event){
    event.preventDefault();
    var li = $(this).closest('li');
    li.find('form.edit').hide();
    li.find('div.text').show();
  });
  $('a.edit').on('click', function(event){
    event.preventDefault();
    var li = $(this).closest('li');
    li.find('form.edit').show();
    li.find('div.text').hide();
  });
  $('a.save').on('click', function(event){
    event.preventDefault();
    $(this).closest('form').submit();//lleva al form mas cercano
  });

  $('a.delete').on('click', function(event){    
    event.preventDefault();
    var li =$(this).closest('li');
    $.ajax({
      url: '/delete',
      type: 'post',
      data:{id:li.find('input[name=id]').val()},
      success: function(data){
        li.remove();
      } 
    });
  });

  

});