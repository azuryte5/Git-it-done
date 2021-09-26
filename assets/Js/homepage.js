var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#username");
//later when we build the presentation logic we need to build these two variables below
var repoContainerEl = document.querySelector("#repos-container");
var repoSearchTerm = document.querySelector("#repo-search-term");



var formSubmitHandler = function(event) {
    event.preventDefault();

    // get value from input element
var username = nameInputEl.value.trim();

if (username) {
    getUserRepos(username);
    nameInputEl.value = "";
} else {
    alert("Please enter a Github username");
}
    console.log(event);
};

var getUserRepos = function (user) {
  //format the github api url
  var apiUrl = "https://api.github.com/users/" + user + "/repos";

  // make a request to the url
fetch(apiUrl)
    .then(function (response) {
    //ADD this to not get an 404 error
    if(response.ok){
        response.json().then(function(data) {
            displayRepos(data,user);
        });
    } else {
        alert("Error:GitHub User Not Found");
    }
    })
    // Now, if the server is down. ADD this line. ontop of everything else
    .catch(function(error) {
        //Notice this '.catch()' getting chained onto the end of the '.then()' method
    alert("Unable to connect to GitHub");
    });

// This was ^ before we added the 404 ok check   
//  response.json().then(function (data) {
//       displayRepos(data, user);
//     });
//   });
};

var displayRepos = function(repos, searchTerm) {
    // NOW what happens if length is 0. 
    if (repos.length === 0) {
        repoContainerEl.textContent = "No repositories found.";
        return;
    }
    // console.log(repos);
    // console.log(searchTerm);
    repoContainerEl.textContent = "";
    repoSearchTerm.textContent = searchTerm;
    //loop generating rows of data 
    // ANdrew, THis is what I needed to build my assignemnt 5 faster with the id codes that I probably could have controlled the id's
for (var i=0; i < repos.length; i++) {
    //format repo name
    var repoName = repos[i].owner.login + "/" + repos[i].name;

    // create a container for each repo
    var repoEl =document.createElement("div");
    repoEl.classList = "list-item flex-row justify-space-between align-center";

    // create span element to hold repository name
    var titleEl = document.createElement("span");
    titleEl.textContent= repoName;

      //append to container
      repoEl.appendChild(titleEl);
    
    // create a status element
    var statusEl = document.createElement("span");
    statusEl.classList = "flex-row align-center";

    //check if current repo has issues or not
    if (repos[i].open_issues_count > 0) {
        statusEl.innerHTML =
        "<i class='fas fa-times status-icon icon-danger'></i>"+ repos[i].open_issues_count + " issue(s)";
    } else {
        statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
    }

    // append damn.
    repoEl.appendChild(statusEl)

  
    //append ^ container to the dom (Page)
    repoContainerEl.appendChild(repoEl);
}
}

userFormEl.addEventListener("submit", formSubmitHandler);