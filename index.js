const canvas = document.getElementById("network");
const ctx = canvas.getContext("2d");

let particles = [];

const mouse = {
    x: null,
    y: null
};


/* =========================
   CANVAS
========================= */

function resizeCanvas() {

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    createParticles();
}

resizeCanvas();


/* =========================
   MOUSE
========================= */

window.addEventListener("mousemove", (e) => {

    mouse.x = e.clientX;
    mouse.y = e.clientY;

});


/* =========================
   PARTICLE
========================= */

class Particle {

    constructor() {

        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;

        this.size = Math.random() * 2 + 0.8;

        this.speedX =
            (Math.random() - 0.5) * 0.8;

        this.speedY =
            (Math.random() - 0.5) * 0.8;

        this.opacity =
            Math.random() * 0.6 + 0.2;
    }


    update() {

        this.x += this.speedX;
        this.y += this.speedY;


        /* Bounce */

        if (
            this.x <= 0 ||
            this.x >= canvas.width
        ) {
            this.speedX *= -1;
        }

        if (
            this.y <= 0 ||
            this.y >= canvas.height
        ) {
            this.speedY *= -1;
        }


        /* Mouse attraction */

        if (
            mouse.x !== null &&
            mouse.y !== null
        ) {

            const dx =
                mouse.x - this.x;

            const dy =
                mouse.y - this.y;

            const distance =
                Math.sqrt(
                    dx * dx +
                    dy * dy
                );


            if (distance < 220) {

                this.x +=
                    dx * 0.0008;

                this.y +=
                    dy * 0.0008;
            }
        }
    }


    draw() {

        ctx.beginPath();

        ctx.arc(
            this.x,
            this.y,
            this.size,
            0,
            Math.PI * 2
        );

        ctx.fillStyle =
            `rgba(
                255,
                48,
                45,
                ${this.opacity}
            )`;

        ctx.shadowBlur = 12;

        ctx.shadowColor =
            "rgba(255, 48, 45, 0.6)";

        ctx.fill();

        ctx.shadowBlur = 0;
    }
}


/* =========================
   CREATE
========================= */

function createParticles() {

    particles = [];

    const amount =
        Math.min(
            100,
            Math.floor(
                canvas.width *
                canvas.height /
                12000
            )
        );


    for (
        let i = 0;
        i < amount;
        i++
    ) {

        particles.push(
            new Particle()
        );
    }
}

createParticles();


/* =========================
   CONNECTIONS
========================= */

function connectParticles() {

    for (
        let i = 0;
        i < particles.length;
        i++
    ) {

        for (
            let j = i + 1;
            j < particles.length;
            j++
        ) {

            const dx =
                particles[i].x -
                particles[j].x;

            const dy =
                particles[i].y -
                particles[j].y;

            const distance =
                Math.sqrt(
                    dx * dx +
                    dy * dy
                );


            if (distance < 150) {

                const opacity =
                    (1 - distance / 150)
                    * 0.18;


                ctx.beginPath();

                ctx.moveTo(
                    particles[i].x,
                    particles[i].y
                );

                ctx.lineTo(
                    particles[j].x,
                    particles[j].y
                );

                ctx.strokeStyle =
                    `rgba(
                        255,
                        48,
                        45,
                        ${opacity}
                    )`;

                ctx.lineWidth = 0.8;

                ctx.stroke();
            }
        }
    }
}


/* =========================
   ANIMATION
========================= */

function animate() {

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    particles.forEach(
        particle => {

            particle.update();
            particle.draw();

        }
    );


    connectParticles();


    requestAnimationFrame(
        animate
    );
}

animate();


/* =========================
   RESIZE
========================= */

window.addEventListener(
    "resize",
    resizeCanvas
);
