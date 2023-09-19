const TypeWriter = function (txtElement, words, wait = 3000) {
  this.txtElement = txtElement;
  this.words = words;
  this.txt = "";
  this.wordIndex = 0;
  this.wait = parseInt(wait, 10);
  //   this.type();
  this.isDeleting = false;
  this.type();
};
//type method
TypeWriter.prototype.type = function () {
  //current index of word
  const current = this.wordIndex % this.words.length;
  //Get Full Text of current word

  const fullTxt = this.words[current];
  //check if deleting
  if (this.isDeleting) {
    //remove char
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    //add a char
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }
  //insert txt into element
  this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

  //Initial Type Speed
  let typeSpeed = 300;
  if (this.isDeleting) {
    typeSpeed /= 2;
  }
  //If word is complete
  if (!this.isDeleting && this.txt === fullTxt) {
    //this make pause at end
    typeSpeed = this.wait;
    //set delete to true
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === "") {
    this.isDeleting = false;
    //move nbext word
    this.wordIndex++;
    //pause before start typing
    typeSpeed = 500;
  }

  setTimeout(() => this.type(), typeSpeed);
};

//init on DOM load
document.addEventListener("DOMContentLoaded", init);
//Init App
function init() {
  const txtElement = document.querySelector(".txt-type");
  const words = JSON.parse(txtElement.getAttribute("data-words"));
  const wait = txtElement.getAttribute("data-wait");
  //init typewriter
  new TypeWriter(txtElement, words, wait);
}

////////////////es6 class/////////////////////////////
// class TypeWriter {
//   constructor(txtElement, words, wait = 3000) {
//     this.txtElement = txtElement;
//     this.words = words;
//     this.txt = "";
//     this.wordIndex = 0;
//     this.wait = parseInt(wait, 10);
//     this.type();
//     this.isDeleting = false;
//   }
//   type() {
//     const current = this.wordIndex % this.words.length;
//     //Get Full Text of current word

//     const fullTxt = this.words[current];
//     //check if deleting
//     if (this.isDeleting) {
//       //remove char
//       this.txt = fullTxt.substring(0, this.txt.length - 1);
//     } else {
//       //add a char
//       this.txt = fullTxt.substring(0, this.txt.length + 1);
//     }
//     //insert txt into element
//     this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

//     //Initial Type Speed
//     let typeSpeed = 300;
//     if (this.isDeleting) {
//       typeSpeed /= 2;
//     }
//     //If word is complete
//     if (!this.isDeleting && this.txt === fullTxt) {
//       //this make pause at end
//       typeSpeed = this.wait;
//       //set delete to true
//       this.isDeleting = true;
//     } else if (this.isDeleting && this.txt === "") {
//       this.isDeleting = false;
//       //move nbext word
//       this.wordIndex++;
//       //pause before start typing
//       typeSpeed = 500;
//     }

//     setTimeout(() => this.type(), typeSpeed);
//   }
// }
