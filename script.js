let seenImagesListBrowse = [["IMAGE NUMBER", "IMAGE TAG", "USER SUB STATUS"]];
let seenImagesListTrending = [["IMAGE NUMBER", "IMAGE TAG", "AMOUNT OF LIKES"]];
let currentImageNumber = 0;
let photoTagList = ["FOOTBALL", "SPACE", "FLOWERS", "COMPUTERS", "GAMING", "ANIMALS", "FASHION", "CELEBRITIES", "FOOD", "SCENERY"]
let userInterestsStarter = "Current user interests: ";
let userInterests = [];
let likedPhotoList = [];

//Function that gets and stores user interests
function getUserInterests() {
  userInterests.push(prompt("Enter one of your interests: ").toUpperCase());
  console.log("Updated user interests: " + userInterests);
  document.getElementById("interests").innerHTML = userInterestsStarter + userInterests.join(", ");
}

//Function that will choose a random index within an array (using for photoTagList and userInterests)
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

//Function that will weight each new image with a 10% chance of being uploaded by a free user vs 90% chance from a paid user
function getRandomImageSub() {
  let randomImageWeight = Math.random();
  if (randomImageWeight >= 0.9) {
    return "FREE USER";
  } else {
    return "PAID USER";
  }
}

//Functions for getting next and previous images
function nextImage(searchParameter) {
  if (currentImageNumber < seenImagesListBrowse.length - 1) { //This is to check whether we are revisiting an already passed image number
    currentImageNumber++;
    document.getElementById("image-number").innerHTML = "IMAGE " + currentImageNumber;
    document.getElementById("image-tag").innerHTML = seenImagesListBrowse[currentImageNumber][1];
    document.getElementById("sub-status").innerHTML = seenImagesListBrowse[currentImageNumber][2];
    console.log("Going forward to already cached photo: " + currentImageNumber);
  } else { //Otherwise this is acting as finding new images for us
    if (searchParameter == "interests") {
      if (userInterests.length >= 1) { //This will be if user has custom interests
        currentImageNumber += 1;
        document.getElementById("image-number").innerHTML = "IMAGE " + currentImageNumber;
        let newImageTag = userInterests[getRandomInt(userInterests.length)];
        document.getElementById("image-tag").innerHTML = newImageTag;
        let newSubStatus = getRandomImageSub();
        document.getElementById("sub-status").innerHTML = newSubStatus;
        console.log("Succesfully grabbed new random interests photo: " + currentImageNumber + " + new tag: " + newImageTag + " + new user: " + newSubStatus);
        seenImagesListBrowse.push([currentImageNumber, newImageTag, newSubStatus]);
        console.table(seenImagesListBrowse);
      }
      else {
        alert("No interests added! Consider adding some before using this feature.");
      }
    } else if (searchParameter == "random") { //This will be if no user interests have been selected
      currentImageNumber += 1;
      document.getElementById("image-number").innerHTML = "IMAGE " + currentImageNumber;
      let newImageTag = photoTagList[getRandomInt(photoTagList.length)];
      document.getElementById("image-tag").innerHTML = newImageTag;
      let newSubStatus = getRandomImageSub();
      document.getElementById("sub-status").innerHTML = newSubStatus;
      console.log("Successfully grabbed new random non-interests photo: " + currentImageNumber + " + new tag: " + newImageTag + " + new user: " + newSubStatus);
      seenImagesListBrowse.push([currentImageNumber, newImageTag, newSubStatus]);
      console.table(seenImagesListBrowse);
    } else if (searchParameter == "mixed") {
      let randomNumber = getRandomInt(2);
      if (randomNumber == 1) { //Randomly chosen website stuff
        currentImageNumber += 1;
        document.getElementById("image-number").innerHTML = "IMAGE " + currentImageNumber;
        let newImageTag = photoTagList[getRandomInt(photoTagList.length)];
        document.getElementById("image-tag").innerHTML = newImageTag;
        let newSubStatus = getRandomImageSub();
        document.getElementById("sub-status").innerHTML = newSubStatus;
        console.log("Successfully grabbed new random non-interests photo: " + currentImageNumber + " + new tag: " + newImageTag + " + new user: " + newSubStatus);
        seenImagesListBrowse.push([currentImageNumber, newImageTag, newSubStatus]);
        console.table(seenImagesListBrowse);
      } else {
        if (userInterests.length >= 1) {
          currentImageNumber += 1;
          document.getElementById("image-number").innerHTML = "IMAGE " + currentImageNumber;
          let newImageTag = userInterests[getRandomInt(userInterests.length)];
          document.getElementById("image-tag").innerHTML = newImageTag;
          let newSubStatus = getRandomImageSub();
          document.getElementById("sub-status").innerHTML = newSubStatus;
          console.log("Succesfully grabbed new random interests photo: " + currentImageNumber + " + new tag: " + newImageTag + " + new user: " + newSubStatus);
          seenImagesListBrowse.push([currentImageNumber, newImageTag, newSubStatus]);
          console.table(seenImagesListBrowse);
        } else {
          alert("No interests added! Consider adding some before using this feature.")
        }
      }
    } else {
      alert("Please select a filter option.");
    }
  }
}

/* First number in array seach is index of image number
 * Second number in array search is 0 / 1 / 2
 * 0 == Image Number
 * 1 == Image Tag
 * 2 == User Sub Status
 */
function prevImage() {
  if (currentImageNumber == 0) {
    window.alert("Please click 'NEXT IMAGE' to get started.")
  } else if (currentImageNumber == 1) {
    console.log("FAIL, at image number 1")
  } else {
    currentImageNumber--;
    document.getElementById("image-number").innerHTML = "IMAGE " + currentImageNumber;
    document.getElementById("image-tag").innerHTML = seenImagesListBrowse[currentImageNumber][1];
    document.getElementById("sub-status").innerHTML = seenImagesListBrowse[currentImageNumber][2];
    console.log("Going back to already cached photo: " + currentImageNumber);
  }
}

/* Function for each selection in timeframe (daily / weekly / monthly) */
function checkFilterValueTrending() {
  var trendValue = document.getElementById("trending-timeframe");
  return selectedValue = trendValue.options[trendValue.selectedIndex].value;
}

function checkFilterValueBrowse() {
  var browseValue = document.getElementById("browse-selection");
  return selectedValue = browseValue.options[browseValue.selectedIndex].value;
}

/* Function to grab next trending image and display it */
function grabTrendingImage() {
  currentImageNumber += 1;
  document.getElementById("image-number").innerHTML = "IMAGE " + currentImageNumber;
  let newImageTag = photoTagList[getRandomInt(photoTagList.length)];
  document.getElementById("image-tag").innerHTML = newImageTag;
  let numOfLikes = likedPhotoList[currentImageNumber];
  document.getElementById("likes").innerHTML = "NUMBER OF LIKES: " + numOfLikes;
  console.log("Successfully grabbed next top trending photo: " + currentImageNumber + " + new tag: " + newImageTag + " + amount of likes: " + numOfLikes);
  seenImagesListTrending.push([currentImageNumber, newImageTag, numOfLikes]);
}

function nextImageTrending(searchParameter) {
  if (currentImageNumber < seenImagesListTrending.length - 1) { //This is to check whether we are revisiting an already passed image number
    currentImageNumber++;
    document.getElementById("image-number").innerHTML = "IMAGE " + currentImageNumber;
    document.getElementById("image-tag").innerHTML = seenImagesListTrending[currentImageNumber][1];
    document.getElementById("likes").innerHTML = "NUMBER OF LIKES: " + seenImagesListTrending[currentImageNumber][2];
    console.log("Going forward to already cached photo: " + currentImageNumber);
  } else {
    if (searchParameter == "daily") {
      if (likedPhotoList.length < 1) {
        for (let i = 20; i >= 0; i--) {
          let numOfLikes = getRandomInt(100);
          likedPhotoList.push(numOfLikes);
          likedPhotoList.sort(function(a, b){return b-a});
        }
      }
      grabTrendingImage();
      console.table(seenImagesListTrending);
    } else if (searchParameter == "weekly") {
      if (likedPhotoList.length < 1) {
        for (let i = 20; i >= 0; i--) {
          let numOfLikes = getRandomInt(500);
          likedPhotoList.push(numOfLikes);
          likedPhotoList.sort(function(a, b){return b-a});
        }
      }
      grabTrendingImage();
      console.table(seenImagesListTrending);
    } else if (searchParameter == "monthly") {
      if (likedPhotoList.length < 1) {
        for (let i = 20; i >= 0; i--) {
          let numOfLikes = getRandomInt(2000);
          likedPhotoList.push(numOfLikes);
          likedPhotoList.sort(function(a, b){return b-a});
        }
      }
      grabTrendingImage();
      console.table(seenImagesListTrending);
    } else {
      alert("Please select a filter option above.");
    }
  }
}

function prevImageTrending() {
  if (currentImageNumber == 0) {
    window.alert("Please click 'NEXT IMAGE' to get started.")
  } else if (currentImageNumber == 1) {
    console.log("FAIL, at image number 1")
  } else {
    currentImageNumber--;
    document.getElementById("image-number").innerHTML = "IMAGE " + currentImageNumber;
    document.getElementById("image-tag").innerHTML = seenImagesListTrending[currentImageNumber][1];
    document.getElementById("likes").innerHTML = "NUMBER OF LIKES: " + seenImagesListTrending[currentImageNumber][2];
    console.log("Going back to already cached photo: " + currentImageNumber);
  }
}