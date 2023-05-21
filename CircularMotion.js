const canvas = document.querySelector('canvas');
const innerWidth = window.innerWidth - 10;
const innerHeight = window.innerHeight - 10;

canvas.width = innerWidth;
canvas.height = innerHeight;
const context = canvas.getContext('2d');

const randomIntRange = (min, max) =>{
    return Math.floor(Math.random() * (max - min + 1) + min);
}


const mouse = {
    x: undefined,
    y: undefined
}

addEventListener('mousemove', (event)=>{
    mouse.x = event.clientX;
    mouse.y = event.clientY;

})
function Particle(x, y, radius, color){
        
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.radian =Math.random() * Math.PI * 2 ;
        this.color = color;
        this.velocity = 0.09  ;
        this.distFromRadius = randomIntRange(50, 120);
        this.lastMouse = {
            x: x,
            y: y
        }
        this.update = function(){
            
            const lastPoint = {x: this.x, y: this.y};

            
            this.radian += this.velocity;
            this.x = this.lastMouse.x + Math.cos(this.radian) * this.distFromRadius;
            this.y = this.lastMouse.y + Math.sin(this.radian) * this.distFromRadius;

            // this.lastMouse.x += (mouse.x - this.lastMouse.x) * 0.05 ;
            // this.lastMouse.y += (mouse.y - this.lastMouse.y) * 0.05;
            this.draw(lastPoint);
        }


        this.draw = function(lastPoint){

            context.beginPath();
            context.strokeStyle = this.color;
            context.lineWidth = this.radius;

            context.moveTo(lastPoint.x, lastPoint.y);
            context.lineTo(this.x, this.y);
            context.stroke();
            context.closePath();
        }


}
let particles;

function init() {
    particles = []

    for(let i=0; i<10; i++){
        let color = `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;
        const radius = (Math.random() * 2 + 1);
        particles.push(new Particle(innerWidth/2, innerHeight/3, radius, color ));
    }

    console.log(particles)
}

init();


const animate = ()=>{
    requestAnimationFrame(animate);
    context.fillStyle = 'rgba(0,0,0,0.05)';
    context.fillRect(0, 0, canvas.width, canvas.height)
    particles.forEach( particle =>{
        particle.update();
    })
}

animate()