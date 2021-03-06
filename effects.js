var lifeCalc = {

  setup: function() {
    console.log("Set up initialized");
    window.birthday;
    this.initializeCanvas();
    this.initializeButtonsandListeners();
  }, 

  initializeButtonsandListeners: function() {

    $( "#datepicker" ).datepicker({
      changeMonth: true,
      changeYear: true,
      yearRange: "-100:+0", 
      onClose: function(selectedDate){
        lifeCalc.setBirthday(selectedDate);
        lifeCalc.updatePage();
      }
    });

    this.initializeOptions();
  }, 

  setBirthday: function(date){
    if (date === '' || date === undefined || date === null){
      alert("Please enter a valid birthday.");
    } else {
      window.birthday = $( "#datepicker" ).datepicker( "getDate");
      alert("Birthday set to "+ window.birthday);
    }
  },

  initializeOptions: function() {
    var options = document.getElementById('options');
    var buttons = options.querySelectorAll("li");
    console.log("Buttons.length = " + buttons.length);
    for (var i = 0; i < buttons.length; i++){
      buttons[i].addEventListener("click", lifeCalc.updatePage);
      console.log("Added event listener to " + buttons[i].id);
    }
  }, 

  getAge: function() { // returns date as an int, TODO modify it to return as a decimal!
    if (window.birthday === undefined || window.birthday === null){
      alert("Please use the datepicker to enter your birthday.");
      return null;
    } else {
      var today = new Date();
      todayYear = today.getFullYear();
      todayMonth = today.getMonth(); // beware, this is on a 0-11 scale, but since you are getting difference it doesn't matter here
      todayDay = today.getDate();

      birthYear = window.birthday.getFullYear();
      birthMonth = window.birthday.getMonth();
      birthDay = window.birthday.getDate();

      age = (todayYear - birthYear)+((todayMonth-birthMonth)/12.0)+((todayDay-birthDay)/30.42/12.0);
      console.log("today = " + today + ', birthday = '+   window.birthday+ ", therefore age = "+ age);
      return age;
    }
  }, 

  updatePage: function() {
    var context = lifeCalc.getContext();
    var age = lifeCalc.getAge();
    context.clearRect(0, 0, 850, 1100);
    console.log("Pressed " + this.id);
    $("#options li").removeClass("active");
    $("#"+this.id).addClass("active");
    switch(this.id){
      case 'years':
      console.log("draw years");
      lifeCalc.drawYears(context, age);
      break;
      case "months":
      console.log("draw months");
      lifeCalc.drawMonths(context, age);
      break;
      case "weeks":
      console.log("draw weeks");
      lifeCalc.drawWeeks(context, age);
      break;
      case "days":
      console.log("draw days");
      lifeCalc.drawDays(context, age);
      break;
      default:
      $('#years').addClass('active');
      lifeCalc.drawYears(context, age);
    }
  }, 

  drawYears: function(context, age){
    age = Math.round(age);
    var count = 0;
    for (var y = 0; y < 9; y++){
      for (var i = 0; i < 10; i++ ) {
        context.beginPath();
        context.arc(50+80*i, 50+80*y, 30, 0, 2*Math.PI);
        context.stroke();
        if (count < age) {
          context.fill();
        }
        count++;
      }
    }
  }, 

  drawMonths: function(context, age){
    var ageInMonths = Math.round(age*12);
    var count = 0;
    for (var y = 0; y < 30; y ++){
      for (var x = 0; x < 36; x++){
        context.beginPath();
        context.arc(50+22*x, 50+33*y, 5.5, 0, 2*Math.PI);
        context.stroke();
        if (count < ageInMonths){
          context.fill();
        }
        count++;
      }
    }
  },

  drawWeeks: function(context, age){
    var ageInWeeks = Math.round(age*52);
    var count = 0;
    for (var y = 0; y < 90; y ++){
      for (var x = 0; x < 52; x++){
        context.beginPath();
        context.arc(50+15*x, 50+11.1*y, 3.8, 0, 2*Math.PI);
        context.stroke();
        if (count < ageInWeeks){
          context.fill();
        }
        count++;
      }
    }
  }, 

  drawDays: function(context, age){
   context.font = '60pt Calibri';
   context.lineWidth = 3;
   context.strokeText('Too small to draw', 50, 50);
 }, 

 initializeCanvas: function(){
  var my_canvas = document.getElementById('canvas');
  var context = my_canvas.getContext('2d');
  my_canvas.setAttribute('width', '850');
  my_canvas.setAttribute('height', '1100');
  context.fillStyle="red";
}, 

getContext: function(){
  var my_canvas = document.getElementById('canvas');
  var context = my_canvas.getContext('2d');
  return context;

}
};

$(function() {
  console.log( "JS Loaded!" );
  lifeCalc.setup();
});





