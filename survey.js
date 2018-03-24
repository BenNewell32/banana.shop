var Nightmare = require("nightmare");

//var expect = require("chai").expect;
var nightmare = Nightmare ({show: true});

nightmare
    .goto("https://bootcampspot-v2.com/")
    .wait(5000)
    .click('.btn :nth-child(1)')
    .wait(5000)
    .click("strong")
    .wait(15000)
    .evaluate(function(){
      var buttons =  document.querySelectorAll('.radio-button-inline input');

      for(i=0; i<buttons.length; i++){
          buttons[i].classList.add(`radiobutton${i}`);
      };

      return true;

     })
    .then(function(kdjdksfj){
        return nightmare
            .click('.radiobutton3')
            .wait(1000)
            .click('.radiobutton5')
            .wait(1000)
            .click('.radiobutton14')
            .wait(1000)
            .click('.radiobutton19')
            .wait(1000)
            .click('.radiobutton24')
            .wait(1000)
            .click('.radiobutton29')
            .wait(1000)
            .click('.radiobutton34')
            .wait(1000)
            .click('.radiobutton39')
            .wait(1000)
            .type("#hoursSpentOutsideOfClass", "324532526565")
            .type("#timeSpentOn", "Project 2. The only thing that wasn't a nightmare.... was NIGHTMARE.")
            .type("#commentsOnPaceOfClass", "If you're trying to make me feel dumb, you succeeded months ago.")
            .type("#commentsOnInstructor", "I'd keep him if i were you.")
            
            .click('.radiobutton40')
            .type("#additionalNotes", "Sorry Jeff...")
            .wait(3000)
            .end()
    })

    .then(function(result){
        alert("time well spent....")
    })
    .catch(function(error){
        console.log("error");
    })
