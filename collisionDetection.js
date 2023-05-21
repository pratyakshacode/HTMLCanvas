let canvas = document.querySelector('canvas');
let innerHeight = window.innerHeight;
let innerWidth = window.innerWidth;


canvas.height = innerHeight -10;
canvas.width = innerWidth-10;

context = canvas.getContext('2d');

class Circle {
    constructor(x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;


    }

    draw() {
        
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        context.fillStyle = this.color;
        context.fill();
    }

    update(){
        this.draw();
    }
}   

let mouse = {
    x : undefined,
    y : undefined
}

addEventListener('mousemove', (event)=>{
    mouse.x = event.clientX;
    mouse.y = event.clientY;

    
})

let circle1;
let circle2;

function init(){
    circle1 = new Circle(innerWidth/2, innerHeight/2, 100, 'black');
    circle2 = new Circle(undefined, undefined, 30, 'red');
}

function getDistance(x1, y1, x2, y2){
    let xDist = x2 - x1;
    let yDist = y2 - y1;

    return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2))
}

function animate(){
    requestAnimationFrame(animate);
    context.clearRect(0, 0, innerWidth, innerHeight);

    circle1.update();
    circle2.x = mouse.x;
    circle2.y = mouse.y;
    circle2.update();

    if(getDistance(circle1.x, circle1.y, circle2.x, circle2.y) < circle1.radius + circle2.radius){
        circle1.color = 'red';
    } else {
        circle1.color = 'black';
    }


}

init();
animate()