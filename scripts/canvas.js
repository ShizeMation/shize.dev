// get canvas element
const surface = document.getElementById("surface");
const overlay = document.getElementById("overlay");

// canvas update on window resize
function resizeCanvas() {
    surface.width = window.innerWidth;
    surface.height = window.innerHeight;
    overlay.width = window.innerWidth;
    overlay.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// drawing context
/** @type {CanvasRenderingContext2D} */
const c = surface.getContext("2d");

// ball object
function Ball(x, y) {
    this.x = x;
    this.y = y;
    
    this.r = Math.random() + 0.1;
    this.q = Math.random() * 4 + 1;
    
    this.dx = 0;
    this.dy = 0;
    
    this.red = Math.floor(Math.random()*256);
    this.green = Math.floor(Math.random()*256);
    this.blue = Math.floor(Math.random()*256);
}

Ball.prototype.draw = function() {
    c.beginPath();
    c.arc(this.x, this.y, this.r, 0, Math.PI*2);
    c.fillStyle = "rgb("+this.red+","+this.green+","+this.blue+")";
    c.fill();
};

Ball.prototype.update = function() {
    this.x += this.dx;
    this.y += this.dy;
    this.dx += (Math.random() - 0.5)/10;
    this.dy += (Math.random() - 0.5)/10;
    if (this.x + this.r > surface.width) {
        this.x = surface.width - this.r;
        this.dx = -this.dx/this.q;
    }
    else if (this.x - this.r < 0) {
        this.x = this.r;
        this.dx = -this.dx/this.q;
    }
    if (this.y + this.r > surface.height) {
        this.y = surface.height - this.r;
        this.dy = -this.dy/this.q;
    }
    else if (this.y - this.r < 0) {
        this.y = this.r;
        this.dy = -this.dy/this.q;
    }
};

// track mouse location
let cursorX = 0;
let cursorY = 0;
surface.addEventListener("mousemove", function(e) {
    cursorX = e.clientX;
    cursorY = e.clientY;
});

// ball spawner
let balls = [];
function spawnBall() {
    if (balls.length > 750) {
        balls.shift();
    }
    balls.push(new Ball(cursorX, cursorY));
}

// user interaction
let id;
surface.addEventListener("click", spawnBall);
surface.addEventListener("mousedown", function() {
    id = setInterval(spawnBall, 10);
});
surface.addEventListener("mouseup", function() {
    clearInterval(id);
});
surface.addEventListener("mouseleave", function() {
    clearInterval(id);
});

// animator
function animate() {
    c.fillStyle = "rgba(0, 0, 0, 0.1)";
    c.fillRect(0, 0, surface.width, surface.height);

    balls.forEach(b => {
        b.draw();
        b.update();
    });

    requestAnimationFrame(animate);
}
animate();
