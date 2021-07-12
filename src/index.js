$(document).ready(function () {
  var apiUrl = "https://dummyapi.io/data/api";
  var appId = "60e344ca4876ae6a77d19d74";
  var initLimit = 15;
  var $card = $("#card-content");
  var $loading = $('#loadingDiv').hide();

  $("#moreButton").hide();
 
  getUserList(initLimit); // set initial users
  function getUserList(limit) {

    console.log("limit", limit)
    $.ajax({
      url: `${apiUrl}/user?limit=${limit}`,
      type: "GET",
      dataType: "json",
      headers: {
        "app-id": appId,
      },
      contentType: "application/json; charset=utf-8",
      success: function (result) {
        if (result.limit < limit) {
          $("#moreButton").hide();
        } else {
          $("#moreButton").show();
        }
        $("#loading").hide();

        $.each(result.data, function (i, profile) {

          renderProfiles(profile, i);
        });
      },
      error: function (error) {
        console.log("error", error);
      },
    });
  };

  function renderProfiles(profile, i) {
    $card.append(
      `<div id="profile" key= 
      ${profile.id} +
       class="card col-sm-6 col-md-4 col-lg-2 m-1">
          <img
        class="card-img-top sm-3"
      src=${profile.picture} 
      
      alt="Card image"
     
    />
    <div class="card-body">
      <h5 id="name" class="card-title">${profile.firstName} 
      ${profile.lastName} 
      </h5>
          <p class="card-text">
          ${profile.email}
      </p>
      </div>
          </div>`
    );
  }
 

  $("#moreButton").click(function () {
    initLimit += 15;
    console.log("moreButton", initLimit)
    $("#card-content").empty();
    $("#moreButton").hide();
    $("#loading").show();

    getUserList(initLimit)
  });

  $("#searchInput").keyup(function () {

    // Retrieve the input field text and reset the count to zero
    var searchText = $(this).val();

    $("#card-content div").each(function(){
     var $this = $(this);
     if($this.text().toLowerCase().indexOf(searchText) === -1)
         $this.closest("#card-content div").fadeOut();
    else $this.closest("#card-content div").fadeIn();
});
  });
});
