const canvas = document.querySelector('canvas');
canvas.width = innerWidth - 10;
canvas.height = innerHeight - 10;

const c = canvas.getContext('2d');

const gravity = 0.05;
const friction = 0.99;

class Particle {
    constructor(x, y, radius, color,  velocity) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velocity = velocity;
        this.alpha = 1
    }

    draw() {
        c.save();
        c.globalAlpha = this.alpha;
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
        c.closePath();
        c.restore()
    }

    update() {

        this.velocity.x *= friction;
        this.velocity.y *= friction;
        this.velocity.y += gravity;
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        this.alpha -= 0.005;
        this.draw();
    }
}

const mouse = {
    x: undefined, 
    y:undefined
}

let particles;

function init(){
    particles = [];
}
init();

function animate(){
    requestAnimationFrame(animate);
    c.fillStyle = 'rgba(0, 0, 0, 0.05)'
    c.fillRect(0, 0, canvas.width, canvas.height);

    particles.forEach((particle, i)=>{
       if(particle.alpha > 0.2) {
        particle.update();
       } else {
        particles.splice(i, 1);
       }

        
    })
}

animate()


addEventListener('resize', ()=>{
    canvas.width = innerWidth - 10;
    canvas.height = innerHeight - 10;
})
addEventListener('click', (event)=>{

    mouse.x = event.clientX;
    mouse.y = event.clientY;

    const particleCount = 400;
    const angleIncrement = (Math.PI * 2) / particleCount;


    for(let i=0; i<particleCount; i++){

        const color = `hsl(${Math.random() * 360},50%, 50%)`
        particles.push(new Particle(mouse.x, mouse.y, 5, color, {x: Math.cos(angleIncrement * i) * Math.random() * 8, y: Math.sin(angleIncrement * i) * 8  * Math.random()}));

    }
})




