let seenImagesListBrowse = [["IMAGE NUMBER", "IMAGE TAG", "USER SUB STATUS"]];
let seenImagesListTrending = [["IMAGE NUMBER", "IMAGE TAG", "AMOUNT OF LIKES"]];
let currentImageNumber = 0;
let photoTagList = ["FOOTBALL", "SPACE", "FLOWERS", "COMPUTERS", "GAMING", "ANIMALS", "FASHION", "CELEBRITIES", "FOOD", "SCENERY"]
let userInterestsStarter = "Current user interests: ";
let userInterests = [];
let likedPhotoList = [];
let galleryPhotos = [["GALLERY IMAGE NUMBER", "GALLERY IMAGE TAG", "GALLERY USER SUB STATUS"]];
let galleryPhotoIndex = 0;

//Function that gets and stores user interests 
function getUserInterests() {
  let insertInterest = prompt("Enter one of your interests: ").toUpperCase();
  if (typeof insertInterest == "string" && insertInterest.length >= 1) { //Don't know how to fix this part but you get the idea of what I am trying to do
    userInterests.push(insertInterest);
    console.log("Updated user interests: " + userInterests);
    document.getElementById("interests").innerHTML = userInterestsStarter + userInterests.join(", "); 
  } else {
    alert("Invalid entry. Please use alphabetical characters only.");
  }
}

//Function that deletes stored user interests
function delUserInterests() {
  let delInterest = prompt("Please type which interest you would like to delete: ").toUpperCase();
  if (userInterests.includes(delInterest)) {
    let delIndex = userInterests.indexOf(delInterest);
    if (delIndex > -1) { // Only splice array when item is found
      userInterests.splice(delIndex, 1); // 2nd parameter means remove one item only
    }
    if (userInterests.length >= 1) {
      document.getElementById("interests").innerHTML = userInterestsStarter + userInterests.join(", ");
    } else {
      document.getElementById("interests").innerHTML = userInterestsStarter + "NONE";
    }
  } else {
    alert("Invalid entry. Either no interests to delete, or a mistype.");
  }
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
    window.alert("Please click 'NEXT IMAGE' to get started.");
  } else if (currentImageNumber == 1) {
    alert("Already at image number ONE.");
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
  if (currentImageNumber <= 20) {
    document.getElementById("image-number").innerHTML = "IMAGE " + currentImageNumber;
    let newImageTag = photoTagList[getRandomInt(photoTagList.length)];
    document.getElementById("image-tag").innerHTML = newImageTag;
    let numOfLikes = likedPhotoList[currentImageNumber];
    document.getElementById("likes").innerHTML = "NUMBER OF LIKES: " + numOfLikes;
    console.log("Successfully grabbed next top trending photo: " + currentImageNumber + " + new tag: " + newImageTag + " + amount of likes: " + numOfLikes);
    seenImagesListTrending.push([currentImageNumber, newImageTag, numOfLikes]);
  } else {
    alert("Reached end of photos for now.");
  }
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
    alert("Already at image number ONE.")
  } else {
    currentImageNumber--;
    document.getElementById("image-number").innerHTML = "IMAGE " + currentImageNumber;
    document.getElementById("image-tag").innerHTML = seenImagesListTrending[currentImageNumber][1];
    document.getElementById("likes").innerHTML = "NUMBER OF LIKES: " + seenImagesListTrending[currentImageNumber][2];
    console.log("Going back to already cached photo: " + currentImageNumber);
  }
}

/* GALLERY BUTTONS */
/* First number in array seach is index of image number
 * Second number in array search is 0 / 1 / 2
 * 0 == Image Number
 * 1 == Image Tag
 * 2 == User Sub Status
 */

function galleryNext() {
  if (galleryPhotos.length > 1 && galleryPhotoIndex < galleryPhotos.length - 1) {
    galleryPhotoIndex++;
    document.getElementById("image-number-gallery").innerHTML = galleryPhotos[galleryPhotoIndex][0];
    document.getElementById("image-tag-gallery").innerHTML = galleryPhotos[galleryPhotoIndex][1];
    document.getElementById("sub-status-gallery").innerHTML = galleryPhotos[galleryPhotoIndex][2];
    console.log("GALLERY NEXT SUCCESS");
  } else {
    alert("Either no images in gallery or at end of gallery.");
  }
}

function galleryPrev() {
  if (galleryPhotoIndex == 0) {
    alert("Please click 'NEXT IMAGE' to get started.")
  } else if (galleryPhotoIndex == 1) {
    alert("Already at image number ONE of liked gallery.");
  } else {
    galleryPhotoIndex--;
    document.getElementById("image-number-gallery").innerHTML = galleryPhotos[galleryPhotoIndex][0];
    document.getElementById("image-tag-gallery").innerHTML = galleryPhotos[galleryPhotoIndex][1];
    document.getElementById("sub-status-gallery").innerHTML = galleryPhotos[galleryPhotoIndex][2];
    console.log("GALLERY PREV SUCCESS");
  }
}

/* Add photo to liked gallery function*/
function addToLikedGallery() {
  if (currentImageNumber == 0) {
    alert("No image currently available to like!");
  } else {
    let currentNum = document.getElementById("image-number").innerHTML;
    let currentTag = document.getElementById("image-tag").innerHTML;
    let currentSub = document.getElementById("sub-status").innerHTML;
    let imageArray = [currentNum, currentTag, currentSub];
    galleryPhotos.push(imageArray);
    console.log("Photo added to liked photos gallery.");
    let sumOfTags = 0;
    for (let interest in photoTagList) {
      for (let photo in galleryPhotos) {
        if (photoTagList[interest] == galleryPhotos[photo][1]) {
          sumOfTags++; //CONTINUE HERE
        }
      }
    }
  }
}

/* Function to add 1 like to trending photo */ 
function addLikeToTrendingPhoto() {
  let numOfLikes = document.getElementById("likes").innerHTML;
  let lastNumberStr = numOfLikes.charAt(numOfLikes.length -1);
  let secondLastNumberStr = numOfLikes.charAt(numOfLikes.length -2);
  let lastNumberInt = parseInt(lastNumberStr);
  if (lastNumberInt == 9 && secondLastNumberStr != " ") {
    secondLastNumberInt = parseInt(secondLastNumberStr);
    lastNumberInt = 0;
    secondLastNumberInt += 1;
    let numOfLikesUpdated = numOfLikes.substring(0, numOfLikes.length-2) + secondLastNumberInt + lastNumberInt;
    document.getElementById("likes").innerHTML = numOfLikesUpdated;
  } else {
    lastNumberStr = String(lastNumberInt += 1);
    let numOfLikesUpdated = numOfLikes.substring(0, numOfLikes.length-1) + lastNumberStr;
    document.getElementById("likes").innerHTML = numOfLikesUpdated;
  }
}