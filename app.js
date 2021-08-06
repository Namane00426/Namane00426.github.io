//setting for accordion
const accordion = document.getElementsByClassName('container');
for(i = 0; i<accordion.length; i++) {
  accordion[i].addEventListener('click', function(){
    this.classList.toggle('active')
  })
};
 
 //setting for dark-light theme
 let darkMode = localStorage.getItem("darkMode");
 const btn = document.querySelector("#btn-mode");

 //check if dark mode is enabled
 //if it's enabled, turn it off
 //if it's disabled, turn it on

 const enableDarkMode = () => {
  document.body.classList.toggle("dark-theme");
  localStorage.setItem("darkMode", "enabled");
 };

 const disableDarkMode = () => {
  document.body.classList.remove("dark-theme");
  localStorage.setItem("darkMode", null);
 };

 const input_agree = document.querySelector("input");

 if(darkMode === "enabled") {
   enableDarkMode();
   input_agree.checked = true;
 };

 btn.onclick = function(){
   darkMode = localStorage.getItem("darkMode");
   if(darkMode !== "enabled") {
     enableDarkMode();
   } else {
     disableDarkMode();
   }
 };
