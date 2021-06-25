$(function(){
    getMatches()
    $('.refresh-btn').click(function(){
      location.reload()
    })
  })


  function getMatches(){
    $.ajax({
      type: "GET",
      url: "https://psl-mini.herokuapp.com/matches",
      error: function (){
        $('.matches').append(`<h3 class="text-center mt-3">An Error has occured!!!</h3>`)
      },
      success: function (response) {
        $('.matches').empty()
  
        for (let i = 0; i < response.length; i++) {
          $(".matches").append(`
          <div class= "match my-5" match-id="${response[i]._id}">
            <button class="btn btn-danger btn-sm float-right">Delete</button>
            <button class="btn btn-warning btn-sm float-right mx-2">Edit</button>
            <h4>${response[i].name}</h4>
            <p>${response[i].description}</p>
          </div>
          `); 
        }
      }
    });
  }