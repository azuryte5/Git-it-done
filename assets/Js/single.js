//Time for presentation logic at the end
var issueContainerEl = document.querySelector("#issues-container");
var limitWarningEl = document.querySelector("#limit-warning");

var getRepoIssues = function(repo) {
    var apiUrl = "https://api.github.com/repos/" + repo + "/issues?direction=asc";
    fetch(apiUrl).then(function(response){
        //request was successful
    if (response.ok){
        response.json().then(function(data){
            displayIssues(data);
        
            //check if api has paginated issues
            if (response.headers.get("link")){
                displayWarning(repo);
            }
        });
    } else {
        alert("THere was a problem with your request");
    }
    });
   
};

var displayIssues = function(issues) {
    // NOW what happens if length is 0. 
    if (issues.length === 0) {
        issuesContainerEl.textContent = "This repo has no open issues";
        return;
    }
for (var i = 0; i < issues.length; i++) {
    // create a link element to take users to the issue on github
    var issuesEl = document.createElement("a");
    issuesEl.classList = "list-item flex-row justify-space-between align-center";
    issuesEl.setAttribute("href", issues[i].html_url);
    issuesEl.setAttribute("target", "_blank");
    // now it is time to hold titles
    var titleEl = document.createElement("span");
    titleEl.textContent=issues[i].title;

    //append to container now
    issuesEl.appendChild(titleEl);

    //create a type element
    var typeEl=document.createElement("span");

    //check if issue is actual issue or a pull request
    if (issues[i].pull_request){
        typeEl.textContent = "(Pull request)";
    } else {
        typeEl.textContent = "(Issue)";
    }

//time to append
issuesEl.appendChild(typeEl);
issueContainerEl.appendChild(issuesEl);
}

};

var displayWarning = function (repo) {
    //add text to warning container
    limitWarningEl.textContent="To see more than 30 issues, visit";
var linkEl = document.createElement("a");
linkEl.textContent = "See More issues on GitHub.com";
linkEl.setAttribute("href", "https://github.com/" + repo + "/issues");
linkEl.setAttribute("target", "_blank");

// append to warning container
limitWarningEl.appendChild(linkEl);
};

getRepoIssues("facebook/react");