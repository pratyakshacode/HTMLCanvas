const canvas = document.querySelector('canvas');
const innerHeight = window.innerHeight;
const innerWidth = window.innerWidth;

const math = Math;
canvas.height = innerHeight - 10;
canvas.width = innerWidth - 10;
const context = canvas.getContext('2d');

const randomIntRange = (min, max) =>{
    return math.floor(math.random() * (max - min + 1) + min);
}
class Particle{
    constructor(x, y, dx, dy, radius, color){
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.radius = radius;
        this.color = color;
    }

    draw() {

        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        context.strokeStyle = 'black';
        context.stroke();

    }

    update(){
        this.draw();
    }
}

let particles = [];

function init(){

    for(let i=0; i<4; i++){
        let radius = 50;
        let x = randomIntRange(radius, innerWidth - radius);
        let y = randomIntRange(radius, innerHeight - radius);
        let dx = math.random() * 3;
        let dy = math.random() * 4;
        const color = 'red';

        particles.push(new Particle(x, y, dx, dy, radius, color));
        
    }

    console.log(particles);
}

init();
function animate(){
    requestAnimationFrame(animate);
    context.clearRect(0, 0, innerWidth, innerHeight);

    particles.forEach((particle)=>{
        particle.update();
    })

}

animate()