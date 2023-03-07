let seenImagesNumbers = [];
let currentImageNumber = 1;
let photoTagList = ["FOOTBALL", "SPACE", "FLOWERS", "COMPUTERS", "GAMING", "ANIMALS", "FASHION", "CELEBRITIES", "FOOD", "SCENERY"]
let userInterestsStarter = "Current user interests: ";
let userInterests = [];

function getUserInterests() {
  userInterests.push(prompt("Enter one of your interests: ").toUpperCase());
  console.log("Updated user interests: " + userInterests);
  document.getElementById("interests").innerHTML = userInterestsStarter + userInterests.join(", ");
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

//Functions for getting next and previous images
function nextImage() {
  if (userInterests.length >= 1) { //This will be if user has custom interests
    currentImageNumber += 1;
    document.getElementById("image-number").innerHTML = "IMAGE " + currentImageNumber;
    let newImageTag = userInterests[getRandomInt(userInterests.length)];
    document.getElementById("image-tag").innerHTML = newImageTag;
    console.log("CUSTOM INTERESTS NEXT SUCCESS, new number: " + currentImageNumber + " new tag: " + newImageTag);
  } else { //This will be if no user interests have been selected
    currentImageNumber += 1;
    document.getElementById("image-number").innerHTML = "IMAGE " + currentImageNumber;
    let newImageTag = photoTagList[getRandomInt(photoTagList.length)];
    document.getElementById("image-tag").innerHTML = newImageTag;
    console.log("NO INTERESTS NEXT SUCCESS, new number: " + currentImageNumber + " new tag: " + newImageTag);
  }
}

//This will need to be updated once saving seen images shown to be able to revert to EXACTLY what was previously shown
function prevImage() {
  if (currentImageNumber > 1) {
    currentImageNumber -= 1;
    document.getElementById("image-number").innerHTML = "IMAGE " + currentImageNumber;
    console.log("PREV SUCCESS, new number: " + currentImageNumber)
  } else {
    console.log("FAIL, at image number 1")
  }
}

//To store each seen image so when we click previous we will iterate over the last seen images, and next will go back until end of seen images where we will then start to find more new images of course
class Image {
  seenImage(number, tag, sub) {
    this.number = number;
    this.tag = tag;
    this.sub = sub;
  }
}


