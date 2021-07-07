/* Step 1: using axios, send a GET request to the following URL 
           (replacing the palceholder with your Github name):
           https://api.github.com/users/<your name>
*/

const cards = document.querySelector(".cards");
console.log(cards)

// This returns a promise
axios.get('https://api.github.com/users/desiquinn')

// .then chains off of the promise and allows you to get the data from the promise if successful
.then(data => {
  // This is where we get results from the server
  console.log(data.data)
  const user = data.data
  const userURL = createUserCard(user);
  cards.appendChild(userURL)
  const username = user.login
  followerPull(username)
})

// .catch chains off of the promise and allows you to get the value from the promise if failed
.catch(error => {
  console.log(`ERROR: ${error}`)
})

/* Step 2: Inspect and study the data coming back, this is YOUR 
   github info! You will need to understand the structure of this 
   data in order to use it to build your component function 

   Skip to Step 3.
*/

/* Step 4: Pass the data received from Github into your function, 
           create a new component and add it to the DOM as a child of .cards
*/

/* Step 5: Now that you have your own card getting added to the DOM, either 
          follow this link in your browser https://api.github.com/users/<Your github name>/followers 
          , manually find some other users' github handles, or use the list found 
          at the bottom of the page. Get at least 5 different Github usernames and add them as
          Individual strings to the friendsArray below.
          
          Using that array, iterate over it, requesting data for each user, creating a new card for each
          user, and adding that card to the DOM.
*/

const followersArray = [];
// console.log(followersArray)

function followerPull(username) {
  axios.get(`https://api.github.com/users/${username}/followers`)

  .then(followerData => {
    console.log(followerData.data)
    followerData.data.forEach(follower => {
      followersArray.push(follower.login)
    })
  })

  .catch(followerError => {
    console.log(followerError)
  })


}

console.log(followersArray)
// followersArray.push(followerPull())

followersArray.forEach(user => {
  axios.get(`https://api.github.com/users/${user}`)

  .then(followerData => {
    console.log(followerData.data)
    const follower = followerData.data
    const followerURL = createUserCard(follower)
    console.log("FollowerURL: ", followerURL)
    cards.appendChild(followerURL)
  })

  .catch(followerError => {
    console.log(followerError)
  })
})

/* Step 3: Create a function that accepts a single object as its only argument,
          Using DOM methods and properties, create a component that will return the following DOM element:

<div class="card">
  <img src={image url of user} />
  <div class="card-info">
    <h3 class="name">{users name}</h3>
    <p class="username">{users user name}</p>
    <p>Location: {users location}</p>
    <p>Profile:  
      <a href={address to users github page}>{address to users github page}</a>
    </p>
    <p>Followers: {users followers count}</p>
    <p>Following: {users following count}</p>
    <p>Bio: {users bio}</p>
  </div>
</div>

*/

function createUserCard(user) {
  //created elements
  const card = document.createElement('div');
  const userImage = document.createElement('img');
  const cardInfo = document.createElement('div');
  const name = document.createElement('h3');
  const username = document.createElement('p');
  const location = document.createElement('p');
  const profile = document.createElement('p');
  const githubURL = document.createElement('a');
  const followers = document.createElement('p');
  const following = document.createElement('p');
  const bio = document.createElement('p');

  //set class names
  card.classList.add('card');
  cardInfo.classList.add('card-info');
  name.classList.add('name');
  username.classList.add('username');

  //add content
  userImage.src = user.avatar_url;
  name.textContent = user.name;
  username.textContent = user.login;
  location.textContent = user.location;
  profile.textContent = `Profile: `;
  githubURL.href = user.url;
  githubURL.textContent = user.url;
  followers.textContent = `Followers: ${user.followers}`;
  following.textContent = `Following: ${user.following}`;
  bio.textContent = `Bio: ${user.bio}`

  //format the structure
  card.appendChild(userImage);
  card.appendChild(cardInfo);
  cardInfo.appendChild(name);
  cardInfo.appendChild(username);
  cardInfo.appendChild(location);
  cardInfo.appendChild(profile);
    profile.appendChild(githubURL);
  cardInfo.appendChild(followers);
  cardInfo.appendChild(following);
  cardInfo.appendChild(bio);

  return card;
}


/* List of LS Instructors Github username's: 
  tetondan
  dustinmyers
  justsml
  luishrd
  bigknell
*/

