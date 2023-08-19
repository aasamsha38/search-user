// Get a reference to the HTML form element with the ID "myform"
var form = document.getElementById("myform");

// Attach a "submit" event listener to the form
form.addEventListener("submit", function (e) {
  // Prevent the default form submission behavior
  e.preventDefault();

  // Get the value entered in the input field with the ID "search"
  var search = document.getElementById("search").value;

  // Make a GET request to the GitHub API using the provided username
  fetch("https://api.github.com/users/" + search)
    .then((out) => {
      // Check if the response indicates an error
      if (!out.ok) {
        // Throw an error with a stylized error message if user doesn't exist
        throw new Error(`<br><br><br><p style=" text-align: center;
        color: green;
        text-transform: uppercase;
        font-family: 'Courier New', Courier, monospace;
        font-weight: bold;">USER DOES NOT EXISTS!!</p>`);
      }
      // Convert the response to JSON format
      return out.json();
    })
    .then((data) => {
      // Log the retrieved user data to the console
      console.log(data);

      // Build the HTML content to display user information
      document.getElementById("out").innerHTML = `
      <link rel="stylesheet" href="aa.css" />
      <br><br>
      <div class="java">
      <a target="_blank" href="https://www.github.com/${data.login}"><img src="${data.avatar_url}" alt="${data.login}" class="avatar"></a>
      <br><br>
        <h2>${data.login}</h2>
        <p>Name: ${data.name}</p>
        <p>Location: ${data.location || "Not specified"}</p>
        <p>Public Repositories: ${data.public_repos}</p>
        </div>
      `;
    })
    .catch(error => {
      // Display an error message if there's an issue with the request or data processing
      document.getElementById("out").innerHTML = `<p class="error">${error.message}</p>`;
    });
});