const skyCanvas = document.getElementById('skyCanvas')
const ctx = skyCanvas.getContext('2d');

skyCanvas.width = window.innerWidth;
skyCanvas.height = window.innerHeight

ctx.fillStyle = '#094077'
ctx.fillRect(0, 0, skyCanvas.width, skyCanvas.height);

const starCount = 300;
for (let i = 0; i < starCount; i++) {
    const x = Math.random() * skyCanvas.width;
    const y = Math.random() * skyCanvas.height;

    const radious = Math.random() * 1 
    ctx.beginPath();
    ctx.arc(x, y, radious, 0, Math.PI * 2);
    ctx.fillStyle = '#eef2f6';
    ctx.fill()
}


console.log('hello');
