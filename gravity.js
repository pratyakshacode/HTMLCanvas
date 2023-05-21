let canvas = document.querySelector('canvas');
let innerHeight = window.innerHeight;
let innerWidth = window.innerWidth;

canvas.height = innerHeight - 10;
canvas.width = innerWidth - 5;
var circleArray = [];
var maxRadius = 50
var friction = 0.89;
var gravity = 0.2;


let context = canvas.getContext('2d');
window.addEventListener('resize',()=>{

    innerHeight = window.innerHeight - 10;
    innerWidth = window.innerWidth - 10;

    canvas.width = innerWidth;
    canvas.height = innerHeight;

    init();
})


const init = ()=>{
    circleArray = [];

    for(let i=0; i<400; i++){

        var radius = Math.random() * 18 + 1;
        var x = Math.random() * (innerWidth - 2 * radius) + radius;
        var y = Math.random() * (innerHeight - 2 * radius) + radius;
        var dx = (Math.random() - 0.5) * 2;
        var dy = (Math.random() - 0.5) * 2; 
        circleArray.push(new Circle(x, y, dx, dy, radius));
    }

}





function Circle(x, y, dx, dy, radius){
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = radius;

    var r = Math.random() * 254;
    var g = Math.random() * 254;
    var b = Math.random() * 254;


    this.draw = function(){

        context.beginPath()
        context.arc(this.x , this.y, this.radius, 0, Math.PI * 2, false);
        // context.strokeStyle =`green`;
        context.fillStyle =`rgb(${r}, ${g}, ${b})`;
        context.fill();
        context.stroke();
        context.closePath()

    }

    this.update = function(){

    
        if(this.y + this.dy >  innerHeight - this.radius  || this.y - this.radius <= 0){
            this.dy = -this.dy * friction;
        } else {
            this.dy += gravity;
        }

        if(this.x + this.radius + this.dx >= innerWidth || this.x - this.radius<= 0){
            this.dx = -this.dx;
        }
        this.y += this.dy
        this.x += this.dx
        

        this.draw();
    }

}
context.beginPath();


// var circle = new Circle(x, y, dx, dy, radius);


init()



function animate(){
    requestAnimationFrame(animate)
    context.clearRect(0, 0, innerWidth, innerHeight);
    
    for(let i=0; i<circleArray.length; i++){
        circleArray[i].update()
    }
}

animate();


addEventListener('click', ()=>{
    init();
})
