

  var messagesRef = firebase.database().ref('feedback');
  var good =document.getElementById('feedbackSuccess');
  var bad =document.getElementById('feedbackFail');
  var working = document.getElementById('feedbackWorking').textContent;
  var feedbackData = {};
  var str= '';

  function saveToFb(theData){
    var newMessageRef = messagesRef.push();
    newMessageRef.set({
      theData:theData
    }).then(
        function(){
           var feedbackID = newMessageRef.key;
            if(!feedbackID){
                fbFail();
                return;
            }
            fbSuccess();
    })

  }

document.getElementById('feedbackButton').addEventListener('click', function(e){
  e.preventDefault();
    good.textContent = "";
    bad.textContent = "";
    good.classList.remove("feedbackSuccess");
    bad.classList.remove("feedbackFail");
    str = '';
  
    feedbackData.theName = document.getElementById('theName').value;
    feedbackData.email = document.getElementById('email').value;
    feedbackData.theVersion = document.getElementById('theVersion').value;
    feedbackData.install  = document.getElementById('install').value;
    feedbackData.workOK = document.getElementById('workOK').value;
    feedbackData.account = document.getElementById('account').value;
    feedbackData.worst = document.getElementById('worst').value;
    feedbackData.best = document.getElementById('best').value;
    feedbackData.faq = document.getElementById('faq').value;
    feedbackData.improve = document.getElementById('improve').value;
    feedbackData.comments = document.getElementById('comments').value;
    feedbackData.questions = document.getElementById('questions').value;

    //Feedback form is VERY liberal but check not completely empty
    var emptyFields = [];
    for(i in feedbackData){
        if(feedbackData[i]===''){
            emptyFields.push(feedbackData[i]);
        }
        if(emptyFields.length === 12){
            fbFail('The form is empty');
            return;
        }
    }
    feedbackData.timeNow = new Date().toString();
    saveToFb(feedbackData);
    working.textContent= 'working...';
});

function fbSuccess(){
  working.textContent= '';
  good.textContent = "That went well, thank you.";
  //TODO Add css file
  good.classList.add("feedbackSuccess");
  document.getElementById("feedbackForm").reset();
}
function fbFail(error){
    working.textContent= '';
    if(error){
        bad.textContent = error;
        bad.className += 'feedbackFail';
    }else{
        //mates rates error handling...
        bad.textContent = "Something went wrong there. Please try it again. Alternatively, scroll down and copy and paste your answers into an email to marieoh.app@gmail.com";
        bad.className += 'feedbackFail';
         for(i in feedbackData){
            str+= '<p>'+feedbackData[i] + '</p>';
         }
         document.getElementById('feedbackEmergency').innerHTML = str;
    }
}


//basic change images in screen
var clickCounter = 0;
var images = ['img/demo-screen-1.png','img/Stops.png','img/Routes.png', 'img/Register.png','img/Login.png','img/Bus_spotting_2.png'];
document.getElementsByClassName('screen')[0].addEventListener('click', function(e){
    e.preventDefault();
    if(clickCounter<images.length-1){
      clickCounter+=1;   
    }else{
    clickCounter=0;
    }
    document.getElementById('gbs-img-one').src = images[clickCounter];
})

document.getElementsByClassName('badge-link')[0].addEventListener('click', function(e){
  e.preventDefault();
  document.getElementById('gbs-soon').textContent = 'Soon!';
})