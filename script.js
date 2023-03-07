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


//Functions for getting next and previous images
function nextImage() {
  if (userInterests.length >= 1) { //This will be if user has custom interests
      currentImageNumber += 1;
      document.getElementById("image-number").innerHTML = "IMAGE " + currentImageNumber;
      console.log("CUSTOM INTERESTS SUCCESS, new number: " + currentImageNumber)
  } else { //This will be if no user interests have been selected
      currentImageNumber += 1;
      document.getElementById("image-number").innerHTML = "IMAGE " + currentImageNumber;
      console.log("NO INTERESTS SUCCESS, new number: " + currentImageNumber)
  }
}

//This will need to be updated once saving seen images shown to be able to revert to EXACTLY what was previously shown
function prevImage() {
  if (currentImageNumber > 1) {
    currentImageNumber -= 1;
    document.getElementById("image-number").innerHTML = "IMAGE " + currentImageNumber;
    console.log("SUCCESS, new number: " +currentImageNumber)
  } else {
    console.log("FAIL, at image number 1")
  }
}


