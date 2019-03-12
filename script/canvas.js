// get canvas element
var canvas = document.getElementById("main-canvas");

// canvas update on window resize
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// drawing context
/** @type {CanvasRenderingContext2D} */
const c = canvas.getContext("2d");

// ball object
function Ball(x, y) {
    this.x = x;
    this.y = y;

    this.r = Math.random()*40 + 5;
    this.dx = Math.random()*6 - 3;
    this.dy = Math.random()*6 - 3;
    this.q = 10;
    
    this.red = Math.floor(Math.random()*256);
    this.green = Math.floor(Math.random()*256);
    this.blue = Math.floor(Math.random()*256);

    this.draw = function() {
        c.beginPath();
        c.arc(this.x, this.y, this.r, 0, Math.PI*2);
        c.fillStyle = "rgba("+this.red+","+this.green+","+this.blue+",0.4)";
        c.fill();
    };

    this.update = function() {
        this.x += this.dx;
        this.y += this.dy;
        this.dx += Math.random()*4 - 2;
        this.dy += Math.random()*4 - 2;
        if (this.x + this.r > canvas.width) {
            this.x = canvas.width - this.r;
            this.dx = -this.dx/this.q;
        }
        else if (this.x - this.r < 0) {
            this.x = this.r;
            this.dx = -this.dx/this.q;
        }
        if (this.y + this.r > canvas.height) {
            this.y = canvas.height - this.r;
            this.dy = -this.dy/this.q;
        }
        else if (this.y - this.r < 0) {
            this.y = this.r;
            this.dy = -this.dy/this.q;
        }
    };
}

// balls are stored in the array
var balls = [];

// user interaction
function spawnBall(e) {
    if (balls.length > 100) {
        balls.shift();
    }
    balls.push(new Ball(e.clientX, e.clientY));
}
canvas.addEventListener("mousemove", spawnBall);
canvas.addEventListener("click", spawnBall);

// animator
function animate() {
    requestAnimationFrame(animate);
    if (Date.now() % 120000 < 60000) {
        c.clearRect(0, 0, canvas.width, canvas.height);
    }
    for (var i = 0; i < balls.length; i++) {
        balls[i].draw();
        balls[i].update();
    }
}
animate();
