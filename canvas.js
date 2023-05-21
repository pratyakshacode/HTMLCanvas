let canvas = document.querySelector('canvas');
let innerHeight = window.innerHeight;
let innerWidth = window.innerWidth;

canvas.height = innerHeight -10;
canvas.width = innerWidth - 10;
var circleArray = [];


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

        var radius = Math.random() * 8 + 1;
        var x = Math.random() * (innerWidth - 2 * radius) + radius;
        var y = Math.random() * (innerHeight - 2 * radius) + radius;
        var dx = (Math.random() - 0.5) * 2;
        var dy = (Math.random() - 0.5) * 2; 
        circleArray.push(new Circle(x, y, dx, dy, radius));
    }

}

// for getting the position of the mouse
var mouse = {
    x: undefined,
    y: undefined
}

var maxRadius = 50

window.addEventListener('mousemove',(event)=>{
    mouse.x = event.x;
    mouse.y = event.y;

    
})

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

    }

    this.update = function(){

        if(this.x > innerWidth -  this.radius || this.x - this.radius <= 0){
            this.dx = -this.dx
        }
    
        if(this.y >  innerHeight - this.radius || this.y - this.radius <= 0){
            this.dy = -this.dy
        } 
        this.x += this.dx
        this.y += this.dy

        if(mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50){
            if(this.radius < maxRadius){
                this.radius += 1;
            }
        } else if(this.radius > this.minRadius){
            this.radius -= 1;
        }

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



