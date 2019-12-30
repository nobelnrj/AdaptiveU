var challenge = document.querySelectorAll('.challenge');

for(let i=0;i<challenge.length;i++){
    challenge[i].addEventListener('click',function(){
        challenge[i].parentNode.style.display = "none";
        document.querySelector('.challenge-details').style.display = "block";
    });
}

var backBtn = document.querySelector('.back-btn>.btn-text');
backBtn.addEventListener('click',function(){
    document.querySelector('.challenges-container').style.display = "block";
    document.querySelector('.challenge-details').style.display = "none";
});


// tabs inside every challenges
var challengeTab = document.querySelectorAll('.challenge-tabs>.inner-nav>.inner-nav-links');
var tabs = document.querySelectorAll('.tab-content>div');
for(let i=0;i<challengeTab.length;i++){
    challengeTab[i].addEventListener('click',function(){
        document.querySelector('.challenge-tabs>.inner-nav>.inner-nav-links.active').classList.remove('active');
        document.querySelector('.tab-content>div.active').classList.remove('active');
        tabs[i].classList.add('active');
        challengeTab[i].classList.add('active');
    });
}