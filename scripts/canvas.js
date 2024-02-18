// get canvas element
const surface = document.getElementById("surface");

// canvas update on window resize
let resizeCanvas = () => {
    surface.width = window.innerWidth;
    surface.height = window.innerHeight;
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
    
    this.s = (Math.random() > 0.7)? 5 : 10;

    this.dx = 0;
    this.dy = 0;
    
    this.red = Math.floor(Math.random()*256);
    this.green = Math.floor(Math.random()*256);
    this.blue = Math.floor(Math.random()*256);
}

let draw = (ball) => {
    c.beginPath();
    c.arc(ball.x, ball.y, ball.r, 0, Math.PI*2);
    c.fillStyle = "rgb("+ball.red+","+ball.green+","+ball.blue+")";
    c.fill();
};

let updateBall = (ball) => {
    ball.x += ball.dx;
    ball.y += ball.dy;
    
    ball.dx += (Math.random() - 0.5) / ball.s;
    ball.dy += (Math.random() - 0.5) / ball.s;

    if (ball.x + ball.r > surface.width) {
        ball.x = surface.width - ball.r;
        ball.dx = -ball.dx/10;
    }
    else if (ball.x - ball.r < 0) {
        ball.x = ball.r;
        ball.dx = -ball.dx/10;
    }
    if (ball.y + ball.r > surface.height) {
        ball.y = surface.height - ball.r;
        ball.dy = -ball.dy/10;
    }
    else if (ball.y - ball.r < 0) {
        ball.y = ball.r;
        ball.dy = -ball.dy/10;
    }
};

// track mouse location
let cursorX = 0;
let cursorY = 0;
surface.addEventListener("mousemove", (e) => {
    cursorX = e.clientX;
    cursorY = e.clientY;
});

// ball spawner
let balls = [];
let spawnBall = (x, y) => {
    if (balls.length > 750) {
        balls.shift();
    }
    balls.push(new Ball(x, y));
}
let spawnBallAtCursor = () => {
    spawnBall(cursorX, cursorY);
}

// user interaction
let id;
surface.addEventListener("click", spawnBallAtCursor);
surface.addEventListener("mousedown", () => {
    id = setInterval(spawnBallAtCursor, 10);
});
surface.addEventListener("mouseup", () => {
    clearInterval(id);
});
surface.addEventListener("mouseleave", () => {
    clearInterval(id);
});

// animator
let animate = () => {
    c.fillStyle = "rgba(0, 0, 0, 0.1)";
    c.fillRect(0, 0, surface.width, surface.height);

    balls.forEach(b => {
        draw(b);
        updateBall(b);
    });

    requestAnimationFrame(animate);
}
animate();
