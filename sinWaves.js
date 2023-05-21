const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

canvas.width = innerWidth - 10;
canvas.height = innerHeight - 10;

context.beginPath();

context.moveTo(0, canvas.height/2);

for(let i=0; i<canvas.width; i++)
context.lineTo(i, canvas.height/2 * Math.sin(i));

context.stroke();

const animate = ()=>{
    requestAnimationFrame(animate);
    context.clearRect(0, 0, canvas.width, canvas.height);

    


}
