var innerLinks = document.querySelectorAll('.nav-container>.inner-nav>.inner-nav-links');
var mainContainer = document.querySelectorAll('.row');

for(let i=0;i<innerLinks.length;i++){
    innerLinks[i].addEventListener('click',function(e){
        document.querySelector('.active').classList.remove('active');
        innerLinks[i].classList.add('active');
        document.querySelector('.show').classList.remove('show');
        mainContainer[i].classList.add('show');
    });
}