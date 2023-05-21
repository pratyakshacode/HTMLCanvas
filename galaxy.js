const canvas = document.querySelector('canvas');
canvas.width = innerWidth - 10;
canvas.height = innerHeight - 10;

const context = canvas.getContext('2d');


addEventListener('resize', ()=>{
    canvas.width = innerWidth - 10;
    canvas.height = innerHeight - 10;
})

let mousedown = false;
addEventListener('mousedown',()=>{
    mousedown = true;
})
addEventListener('mouseup',()=>{
    mousedown = false;
})
class Particle {
    constructor(x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
    }

    draw(){
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        context.shadowColor = this.color;
        context.shadowBlur = 15;
        context.fillStyle = this.color;
        context.fill();
    }

    update() {
        this.draw();
    }
}

let particles;

const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66']

function init(){
    particles = [];

    for(let i=0; i<400; i++){

        const canvasWidth = canvas.width + 300;
        const canvasHeight = canvas.height + 300;
        const x = Math.random() * canvasWidth - canvasWidth / 2;
        const y = Math.random() * canvasHeight - canvasHeight/2;
        const radius = Math.random() * 1.5 + 1;

        const color = colors[Math.floor(Math.random() * colors.length)]
        particles.push(new Particle(x, y, radius, color));
    }

}
init();

let radians = 0;
let alpha = 1;

function animate(){
    requestAnimationFrame(animate);
    context.fillStyle = `rgba(10, 10, 10, ${alpha})`;
    context.fillRect(0,0, canvas.width, canvas.height);


    context.save();
    context.translate(canvas.width/2, canvas.height/2)
    context.rotate(radians);

    particles.forEach(particle =>{
        particle.update();
    })
    context.restore();

    radians += 0.005;

    if(mousedown) {
        if(alpha >= 0.03) {
            alpha -= 0.01
        }
    } else if(!mousedown && alpha < 1) {
        alpha += 0.01
    }
}

animate();