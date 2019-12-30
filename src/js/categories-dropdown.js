var value = document.querySelector('span.categories');
var li = document.querySelectorAll('.categories-dropdown>.categories');

value.addEventListener('click',function(){
    document.querySelector('.categories-dropdown').classList.toggle('show');
});
for(let i =0 ;i<li.length;i++){
    li[i].addEventListener('click',function(e){
        if(i == 0){
            document.querySelector('.ct-chart').className = "ct-chart ct-perfect-fourth yellow";
        }
        else if(i == 1){
            document.querySelector('.ct-chart').className = "ct-chart ct-perfect-fourth blue";
        }
        else{
            document.querySelector('.ct-chart').className = "ct-chart ct-perfect-fourth green";
        }
        document.querySelector('.categories-dropdown').classList.toggle('show');
        value.innerHTML = this.innerHTML;
        chartUpdate();
    });
}