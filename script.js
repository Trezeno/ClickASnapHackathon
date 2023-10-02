let seenImagesList = [["IMAGE NUMBER", "IMAGE TAG", "USER SUB STATUS"]];
let currentImageNumber = 0;
let photoTagList = ["FOOTBALL", "SPACE", "FLOWERS", "COMPUTERS", "GAMING", "ANIMALS", "FASHION", "CELEBRITIES", "FOOD", "SCENERY"]
let userInterestsStarter = "Current user interests: ";
let userInterests = [];

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
function nextImage() {
  if (currentImageNumber < seenImagesList.length - 1) { //This is to check whether we are revisiting an already passed image number
    currentImageNumber++;
    document.getElementById("image-number").innerHTML = "IMAGE " + currentImageNumber;
    document.getElementById("image-tag").innerHTML = seenImagesList[currentImageNumber][1];
    document.getElementById("sub-status").innerHTML = seenImagesList[currentImageNumber][2];
  } else { //Otherwise this is acting as finding new images for us
    if (userInterests.length >= 1) { //This will be if user has custom interests
      currentImageNumber += 1;
      document.getElementById("image-number").innerHTML = "IMAGE " + currentImageNumber;
      let newImageTag = userInterests[getRandomInt(userInterests.length)];
      document.getElementById("image-tag").innerHTML = newImageTag;
      let newSubStatus = getRandomImageSub();
      document.getElementById("sub-status").innerHTML = newSubStatus;
      console.log("CUSTOM INTERESTS NEXT SUCCESS, new number: " + currentImageNumber + " new tag: " + newImageTag + " new user: " + newSubStatus);
      seenImagesList.push([currentImageNumber, newImageTag, newSubStatus]);
      console.table(seenImagesList);
    } else { //This will be if no user interests have been selected
      currentImageNumber += 1;
      document.getElementById("image-number").innerHTML = "IMAGE " + currentImageNumber;
      let newImageTag = photoTagList[getRandomInt(photoTagList.length)];
      document.getElementById("image-tag").innerHTML = newImageTag;
      let newSubStatus = getRandomImageSub();
      document.getElementById("sub-status").innerHTML = newSubStatus;
      console.log("NO INTERESTS NEXT SUCCESS, new number: " + currentImageNumber + " new tag: " + newImageTag + " new user: " + newSubStatus);
      seenImagesList.push([currentImageNumber, newImageTag, newSubStatus]);
      console.table(seenImagesList);
    }
  }
}

function prevImage() {
  if (currentImageNumber == 0) {
    window.alert("Please click 'NEXT IMAGE' to get started.") //To catch negative indexing if no photos are yet generated in the array
  } else if (currentImageNumber == 1) { //To show you are at image number one of the generated array
    console.log("FAIL, at image number 1")
  } else { //Must be above number one so must be able to go back to previous image
    currentImageNumber--;
    document.getElementById("image-number").innerHTML = "IMAGE " + currentImageNumber;
    document.getElementById("image-tag").innerHTML = seenImagesList[currentImageNumber][1];
    document.getElementById("sub-status").innerHTML = seenImagesList[currentImageNumber][2];
  }
}

