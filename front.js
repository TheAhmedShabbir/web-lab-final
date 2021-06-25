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
          <div class= "match my-5" match-id="${response[i].id}">
            <h4>${response[i].city}</h4>
            <p>${response[i].date}</p>
            <p>${response[i].teamA}</p>
            <p>${response[i].teamB}</p>
          </div>
          `); 
        }
      }
    });
  }