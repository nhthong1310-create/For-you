const screen3 = document.getElementById("screen-3");
const screen4 = document.getElementById("screen-4");
const screen5 = document.getElementById("screen-5");


const canvas = document.getElementById('heart-canvas');
// const stars = [];

// for (let i = 0; i < 200; i++) {
//     stars.push({
//         x: Math.random() * window.innerWidth,
//         y: Math.random() * window.innerHeight,
//         radius: Math.random() * 1.5,
//         alpha: Math.random()
//     });
// }
// ===== Sao nền =====
const stars = [];

for (let i = 0; i < 150; i++) {
    stars.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        radius: Math.random() * 1.5,
        alpha: 0.5 + Math.random() * 0.5,
        speed: 0.1 + Math.random() * 0.3 // tốc độ rất chậm
    });
}


const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Heart shape formula
function pointOnHeart(t) {
    const x = 160 * Math.pow(Math.sin(t), 3);
    const y = -(130 * Math.cos(t) - 50 * Math.cos(2 * t)
        - 20 * Math.cos(3 * t)
        - 10 * Math.cos(4 * t) + 25);
    return { x, y };
}

class Particle {
    constructor(x, y, vx, vy, ctx) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.life = 1;
        this.size = 6 + Math.random() * 6;
        this.ctx = ctx;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.life -= 0.01;
    }

    draw() {
        this.ctx.globalAlpha = this.life;
        this.ctx.font = `${this.size * 2}px Arial`;
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';

        this.ctx.fillStyle = "white";
        this.ctx.shadowColor = "white";
        this.ctx.shadowBlur = 15;

        this.ctx.fillText('❤', this.x, this.y);

        this.ctx.shadowBlur = 0;
        this.ctx.globalAlpha = 1;
    }
}


const particles = [];

function spawnParticle() {
    const t = Math.random() * Math.PI * 2;
    const point = pointOnHeart(t);

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const scale = 3;

    const x = centerX + point.x * scale;
    const y = centerY + point.y * scale;

    const vx = (Math.random() - 0.5) * 2;
    const vy = (Math.random() - 0.5) * 2;

particles.push(new Particle(x, y, vx, vy, ctx));
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Vẽ sao nền
    // for (let star of stars) {
    //     ctx.beginPath();
    //     ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
    //     ctx.fillStyle = "white";
    //     ctx.globalAlpha = star.alpha;
    //     ctx.fill();
    // }
    for (let star of stars) {

    // Di chuyển sao chậm ngang màn hình
    star.x += star.speed;

    // Nếu sao bay ra khỏi màn hình thì quay lại bên trái
    if (star.x > canvas.width) {
        star.x = 0;
        star.y = Math.random() * canvas.height;
    }

    ctx.beginPath();
    ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
    ctx.fillStyle = "white";
    ctx.globalAlpha = star.alpha;
    ctx.fill();
}


    ctx.globalAlpha = 1;

    if (particles.length < 600) {
        for (let i = 0; i < 10; i++) spawnParticle();
    }

    for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].update();
        particles[i].draw();
        if (particles[i].life <= 0) particles.splice(i, 1);
    }

    requestAnimationFrame(animate);
}

animate();
const splashScreen = document.getElementById("splash-screen");
const screen2 = document.getElementById("screen-2");

splashScreen.addEventListener("click", () => {
    splashScreen.style.opacity = "0";
    splashScreen.style.transition = "opacity 1s";

    setTimeout(() => {
        splashScreen.classList.add("hidden");
        screen2.classList.remove("hidden");
        startScreen2();
    }, 1000);
});
function startScreen2() {
    let textAlpha = 1;
let phase = 1; 
// phase 1 = text thời gian
// phase 2 = fade text thời gian
// phase 3 = text cảm xúc

let formed = false;
let scattered = false;
let showText = false;
let textFinished = false;

    const canvas2 = document.getElementById("star-canvas");
    const ctx2 = canvas2.getContext("2d");

    canvas2.width = window.innerWidth;
    canvas2.height = window.innerHeight;

    const backgroundStars = [];
    const textStars = [];

    const BG_STAR_COUNT = 900; // nhiều sao nền hơn

    // ⭐ Sao nền (không bao giờ mất)
    for (let i = 0; i < BG_STAR_COUNT; i++) {
        backgroundStars.push({
            x: Math.random() * canvas2.width,
            y: Math.random() * canvas2.height,
            size: Math.random() * 1.5,
            speed: 0.1 + Math.random() * 0.3,
            alpha: 0.3 + Math.random() * 0.7
        });
    }

    // Tạo điểm cho số 94
    function createTextPoints() {
        const tempCanvas = document.createElement("canvas");
        const tempCtx = tempCanvas.getContext("2d");

        tempCanvas.width = canvas2.width;
        tempCanvas.height = canvas2.height;

        tempCtx.fillStyle = "white";
        tempCtx.font = "bold 300px Arial";
        tempCtx.textAlign = "center";
        tempCtx.fillText("94", canvas2.width / 2, canvas2.height / 2 + 100);

        const imageData = tempCtx.getImageData(0, 0, canvas2.width, canvas2.height);
        const points = [];

        for (let y = 0; y < canvas2.height; y += 5) {
            for (let x = 0; x < canvas2.width; x += 5) {
                const index = (y * canvas2.width + x) * 4;
                if (imageData.data[index + 3] > 150) {
                    points.push({ x, y });
                }
            }
        }

        return points;
    }

    const textPoints = createTextPoints();

    // Sau 3 giây mới tạo sao ghép chữ
    setTimeout(() => {
        for (let i = 0; i < textPoints.length; i++) {
textStars.push({
    x: Math.random() * canvas2.width,
    y: Math.random() * canvas2.height,
    targetX: textPoints[i].x,
    targetY: textPoints[i].y,
    size: 2 + Math.random() * 2,
    alpha: 1,
    sparkleOffset: Math.random() * Math.PI * 2,
    fading: false
});

        }
    }, 3000);
    // Sau khi tạo chữ 94 -> giữ 5s rồi tản ra
setTimeout(() => {
    formed = true;

    setTimeout(() => {
        // Tản sao
        for (let star of textStars) {
            star.targetX = Math.random() * canvas2.width;
            star.targetY = Math.random() * canvas2.height;
            star.fading = true;

        }
        scattered = true;

        // Sau khi tản xong 1 chút thì hiện text
        setTimeout(() => {
            showText = true;
            startTypingEffect();
        }, 2000);

    }, 5000);

}, 3000);
const messages = [
    "Đã 94 ngày kể từ ngày 12/11/2025",
    "Đó là 3 tháng ",
    "2.256 giờ",
    "8.121.600 giây",
    "Quãng thời gian tớ được nói chuyện với cậu."
];

let displayedLines = [];
let currentLine = 0;
let currentChar = 0;

function startTypingEffect() {
    const typingInterval = setInterval(() => {

        if (currentLine < messages.length) {

            if (!displayedLines[currentLine])
                displayedLines[currentLine] = "";

            if (currentChar < messages[currentLine].length) {
                displayedLines[currentLine] += messages[currentLine][currentChar];
                currentChar++;
            } else {
                currentLine++;
                currentChar = 0;
            }

        } else {
            clearInterval(typingInterval);
            textFinished = true;
            setTimeout(() => {
    phase = 2; // bắt đầu fade
}, 5000);
        }

    }, 40); // tốc độ gõ
}

function startEmotionText() {

    phase = 3;
textAlpha = 1;
    const emotionMessages = [
        "94 ngày không phải là quá dài.",
        "Nhưng đủ để tớ biết",
        "chờ mỗi tin nhắn từ cậu",
        "làm tớ vui đến mức nào,",
        "được lắng nghe cậu mỗi tối hạnh phúc ra sao."
    ];

    displayedLines = [];
    currentLine = 0;
    currentChar = 0;

    const typingInterval = setInterval(() => {

        if (currentLine < emotionMessages.length) {

            if (!displayedLines[currentLine])
                displayedLines[currentLine] = "";

            if (currentChar < emotionMessages[currentLine].length) {
                displayedLines[currentLine] += emotionMessages[currentLine][currentChar];
                currentChar++;
            } else {
                currentLine++;
                currentChar = 0;
            }

        } else {
            clearInterval(typingInterval);
            setTimeout(() => {
    goToScreen3();
}, 4000);

        }

    }, 50);
}



    function animate2() {
        ctx2.clearRect(0, 0, canvas2.width, canvas2.height);

        // ⭐ VẼ SAO NỀN
        for (let star of backgroundStars) {

            star.x += star.speed;

            if (star.x > canvas2.width) {
                star.x = 0;
                star.y = Math.random() * canvas2.height;
            }

            ctx2.beginPath();
            ctx2.arc(star.x, star.y, star.size, 0, Math.PI * 2);
            ctx2.fillStyle = "white";
            ctx2.globalAlpha = star.alpha;
            ctx2.fill();
            
        }
        

        ctx2.globalAlpha = 1;

        // ✨ VẼ SAO GHÉP SỐ 94 (lấp lánh + glow)
for (let i = textStars.length - 1; i >= 0; i--) {

    const star = textStars[i];

    // Di chuyển
    star.x += (star.targetX - star.x) * 0.04;
    star.y += (star.targetY - star.y) * 0.04;

    // Nếu đang fading thì giảm alpha
    if (star.fading) {
        star.alpha -= 0.01;
    }

    // Nếu mờ hết thì xoá khỏi mảng
    if (star.alpha <= 0) {
        textStars.splice(i, 1);
        continue;
    }

    const sparkle = 0.5 + Math.sin(Date.now() * 0.005 + star.sparkleOffset) * 0.5;

    ctx2.globalAlpha = star.alpha;

    ctx2.beginPath();
    ctx2.arc(star.x, star.y, star.size + sparkle, 0, Math.PI * 2);

    ctx2.fillStyle = "white";
    ctx2.shadowColor = "white";
    ctx2.shadowBlur = 20;
    ctx2.fill();
    ctx2.shadowBlur = 0;
}

ctx2.globalAlpha = 1;

if (showText) {

    // Nếu đang ở phase fade text thời gian
    if (phase === 2) {
        textAlpha -= 0.01;

        if (textAlpha <= 0) {
            textAlpha = 0;
            startEmotionText();
        }
    }

    ctx2.globalAlpha = textAlpha;

    ctx2.font = "28px Playfair Display";
    ctx2.fillStyle = "white";
    ctx2.textAlign = "center";
    ctx2.shadowColor = "white";
    ctx2.shadowBlur = 15;

    for (let i = 0; i < displayedLines.length; i++) {
        ctx2.fillText(
            displayedLines[i],
            canvas2.width / 2,
            canvas2.height / 2 - 60 + i * 50
        );
    }

    ctx2.shadowBlur = 0;
    ctx2.globalAlpha = 1;
}


        requestAnimationFrame(animate2);
    }

    animate2();
}
function goToScreen3() {

    screen2.style.opacity = "0";
    screen2.style.transition = "opacity 1s";

    setTimeout(() => {
        screen2.classList.add("hidden");
        screen3.classList.remove("hidden");

        startScreen3(); // chạy nền sao cho màn 3

    }, 1000);
}
function startScreen3() {

    const canvas3 = document.getElementById("star-canvas-3");
    const ctx3 = canvas3.getContext("2d");

    canvas3.width = window.innerWidth;
    canvas3.height = window.innerHeight;

    const stars = [];

    for (let i = 0; i < 300; i++) {
        stars.push({
            x: Math.random() * canvas3.width,
            y: Math.random() * canvas3.height,
            size: Math.random() * 2,
            speed: 0.2 + Math.random() * 0.5
        });
    }

    function animate3() {

        ctx3.clearRect(0, 0, canvas3.width, canvas3.height);

        for (let star of stars) {

            star.x += star.speed;

            if (star.x > canvas3.width) {
                star.x = 0;
                star.y = Math.random() * canvas3.height;
            }

            ctx3.beginPath();
            ctx3.arc(star.x, star.y, star.size, 0, Math.PI * 2);
            ctx3.fillStyle = "white";
            ctx3.fill();
        }

        requestAnimationFrame(animate3);
    }
const bubble = document.querySelector(".thought-bubble");

const messages = [
    "Cậu đang nghĩ gì đó...?",
    "Còn tớ nghĩ...",
    "Rằng tớ đã quen với việc chờ tin nhắn từ cậu.",
    "Chỉ cần một câu thôi cũng đủ làm tớ vui cả buổi.",
    "Tớ hay mong trời tối thật nhanh,",
    "để được nghe cậu nói chuyện thêm một chút.",
    "Chờ câu 'Okila' từ cậu,",
    "rồi gọi ngay cho cậu — chỉ vì nhớ giọng cậu thôi."
];

// Hàm gõ từng chữ
function typeText(element, text, speed = 40, callback) {
    let i = 0;
    element.innerHTML = "";

    const typing = setInterval(() => {
        if (i < text.length) {
            element.innerHTML += text[i];
            i++;
        } else {
            clearInterval(typing);
            if (callback) setTimeout(callback, 1500);
        }
    }, speed);
}

function showMessages(index = 0) {
    if (index >= messages.length) {
        setTimeout(() => {
            goToScreen4();
        }, 4000);
        return;
    }

    typeText(bubble, messages[index], 40, () => {
        setTimeout(() => {
            showMessages(index + 1);
        }, 1000);
    });
}


// 3s sau khi vào màn 3 mới bắt đầu
setTimeout(() => {
    bubble.style.opacity = "1";
    showMessages();
}, 3000);


    animate3();
}
function goToScreen4() {

    screen3.style.opacity = "0";
    screen3.style.transition = "opacity 1s";

    setTimeout(() => {
        screen3.classList.add("hidden");
        screen4.classList.remove("hidden");

        startScreen4();
    }, 1000);
}
function startScreen4() {

    const canvas4 = document.getElementById("star-canvas-4");
    const ctx4 = canvas4.getContext("2d");

    canvas4.width = window.innerWidth;
    canvas4.height = window.innerHeight;

    const stars = [];
    
    const shootingStars = [];
const scenes = [
    [
        "Tớ không biết tương lai sẽ thế nào.",
        "Tớ cũng không muốn vội vàng điều gì."
    ],
    [
        "Tớ chỉ biết rằng",
        "Những ngày được nói chuyện với cậu",
        "Là những ngày tớ thấy mình vui hơn."
    ],
    ["..."],
    ["Và tớ muốn giữ cảm xúc đó thật lâu."]
];

let sceneIndex = 0;
let lineIndex = 0;
let charIndex = 0;
let displayedLines = [];

function typeScene() {

    const currentScene = scenes[sceneIndex];

    if (lineIndex >= currentScene.length) {

        // Khi gõ xong 1 scene
        setTimeout(() => {

            displayedLines = [];
            lineIndex = 0;
            charIndex = 0;
            sceneIndex++;

            if (sceneIndex < scenes.length) {

                // Nếu là scene dấu ...
                if (sceneIndex === 2) {
                    displayedLines[0] = "...";

                    setTimeout(() => {
                        displayedLines = [];
                        sceneIndex++;
                        typeScene();
                    }, 3000);

                    return;
                }

                typeScene();
} else {

    // Đây là scene cuối
    setTimeout(() => {

        // 🚀 Bắn sao băng cao trào
        for (let i = 0; i < 15; i++) {
            setTimeout(() => {
                createBigShootingStar();
            }, i * 300);
        }

        // 🛑 Ngừng sao băng thường
        clearInterval(shootingInterval);

        // ⏳ Đợi sao băng bay hết (~3s)
        setTimeout(() => {

            // ⏳ DỪNG LẠI 3 GIÂY
            setTimeout(() => {
                goToScreen5();
            }, 3000);

        }, 3000);

    }, 4000);

}


        }, sceneIndex === 0 || sceneIndex === 1 ? 2000 : 0);

        return;
    }

    if (!displayedLines[lineIndex])
        displayedLines[lineIndex] = "";

    if (charIndex < currentScene[lineIndex].length) {

        displayedLines[lineIndex] += currentScene[lineIndex][charIndex];
        charIndex++;
        setTimeout(typeScene, 40);

    } else {

        lineIndex++;
        charIndex = 0;
        setTimeout(typeScene, 40);
    }
}




function createShootingStar() {

    const startX = Math.random() * canvas4.width;
    const startY = Math.random() * canvas4.height * 0.4;

    shootingStars.push({
        x: startX,
        y: startY,
        length: 300 + Math.random() * 200, // dài hơn
        speed: 10 + Math.random() * 5,
        angle: Math.PI / 4 + (Math.random() * 0.4 - 0.2),
        life: 1,
        thickness: 3 + Math.random() * 3, // to hơn
        sparkle: Math.random() * Math.PI * 2
    });
}
function createBigShootingStar() {

    shootingStars.push({
        x: Math.random() * canvas4.width * 0.3,
        y: Math.random() * canvas4.height * 0.3,
        length: 600,
        speed: 18,
        angle: Math.PI / 4,
        life: 1,
        thickness: 7,
        sparkle: 0
    });
}


const shootingInterval = setInterval(() => {
    for (let i = 0; i < 10; i++) {
        createShootingStar();
    }
}, 3000);



    for (let i = 0; i < 300; i++) {
        stars.push({
            x: Math.random() * canvas4.width,
            y: Math.random() * canvas4.height,
            size: Math.random() * 2,
            speed: 0.2 + Math.random() * 0.5
        });
    }

    function animate4() {

        ctx4.clearRect(0, 0, canvas4.width, canvas4.height);

        for (let star of stars) {

            star.x += star.speed;

            if (star.x > canvas4.width) {
                star.x = 0;
                star.y = Math.random() * canvas4.height;
            }

            ctx4.beginPath();
            ctx4.arc(star.x, star.y, star.size, 0, Math.PI * 2);
            ctx4.fillStyle = "white";
            ctx4.fill();
        }
// ===== VẼ SAO BĂNG CINEMATIC =====
for (let i = shootingStars.length - 1; i >= 0; i--) {

    const star = shootingStars[i];

    star.x += Math.cos(star.angle) * star.speed;
    star.y += Math.sin(star.angle) * star.speed;
    star.life -= 0.015;

    if (star.life <= 0) {
        shootingStars.splice(i, 1);
        continue;
    }

    const tailX = star.x - Math.cos(star.angle) * star.length;
    const tailY = star.y - Math.sin(star.angle) * star.length;

    // Gradient từ đầu sáng → đuôi mờ
    const gradient = ctx4.createLinearGradient(
        star.x, star.y,
        tailX, tailY
    );

    gradient.addColorStop(0, "rgba(255,255,255,1)");
    gradient.addColorStop(0.2, "rgba(255,255,255,0.8)");
    gradient.addColorStop(0.6, "rgba(255,255,255,0.3)");
    gradient.addColorStop(1, "rgba(255,255,255,0)");

    ctx4.strokeStyle = gradient;
    ctx4.lineWidth = star.thickness;
    ctx4.shadowColor = "white";
    ctx4.shadowBlur = 25;

    ctx4.beginPath();
    ctx4.moveTo(star.x, star.y);
    ctx4.lineTo(tailX, tailY);
    ctx4.stroke();

    ctx4.shadowBlur = 0;

    // ✨ ĐẦU SAO LẤP LÁNH
    const sparkleSize = 6 + Math.sin(Date.now() * 0.02 + star.sparkle) * 2;

    ctx4.beginPath();
    ctx4.arc(star.x, star.y, sparkleSize, 0, Math.PI * 2);
    ctx4.fillStyle = "white";
    ctx4.shadowColor = "white";
    ctx4.shadowBlur = 30;
    ctx4.fill();
    ctx4.shadowBlur = 0;
}
// ===== VẼ CHỮ =====
ctx4.font = "32px Playfair Display";
ctx4.fillStyle = "white";
ctx4.textAlign = "center";
ctx4.shadowColor = "white";
ctx4.shadowBlur = 20;

const lineHeight = 45;
const totalHeight = displayedLines.length * lineHeight;
const startY = canvas4.height / 2 - totalHeight / 2 + lineHeight / 2;

for (let i = 0; i < displayedLines.length; i++) {
    ctx4.fillText(
        displayedLines[i],
        canvas4.width / 2,
        startY + i * lineHeight
    );
}

ctx4.shadowBlur = 0;




        requestAnimationFrame(animate4);
    }
setTimeout(() => {
    typeScene();
}, 2000);

    animate4();
}
function goToScreen5() {

    screen4.style.opacity = "0";
    screen4.style.transition = "opacity 1s";

    setTimeout(() => {
        screen4.classList.add("hidden");
        screen5.classList.remove("hidden");

        startScreen5();
    }, 1000);
}
function startScreen5() {

    const btn = document.getElementById("thankyou-btn");
const content = document.querySelector(".screen5-text");
const heart = document.getElementById("final-heart");

btn.addEventListener("click", () => {

    content.style.display = "none";
    btn.style.display = "none";

    startFinalHeart();   // tim giống màn 1
    startFireworks();    // pháo hoa
});



    const canvas5 = document.getElementById("star-canvas-5");
    const ctx5 = canvas5.getContext("2d");

    canvas5.width = window.innerWidth;
    canvas5.height = window.innerHeight;

    const stars = [];

    for (let i = 0; i < 300; i++) {
        stars.push({
            x: Math.random() * canvas5.width,
            y: Math.random() * canvas5.height,
            size: Math.random() * 2,
            speed: 0.2 + Math.random() * 0.5
        });
    }

    function animate5() {

        ctx5.clearRect(0, 0, canvas5.width, canvas5.height);

        for (let star of stars) {

            star.x += star.speed;

            if (star.x > canvas5.width) {
                star.x = 0;
                star.y = Math.random() * canvas5.height;
            }

            ctx5.beginPath();
            ctx5.arc(star.x, star.y, star.size, 0, Math.PI * 2);
            ctx5.fillStyle = "white";
            ctx5.fill();
        }

        requestAnimationFrame(animate5);
    }

    animate5();
}
function startFireworks() {

    const canvas = document.getElementById("firework-canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];

function createExplosion() {

    // Random vị trí trên màn hình
    const centerX = Math.random() * canvas.width;
    const centerY = Math.random() * canvas.height * 0.7; 
    // *0.7 để tránh nổ sát đáy màn hình quá

    const particleCount = 80 + Math.random() * 60;

    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: centerX,
            y: centerY,
            angle: Math.random() * Math.PI * 2,
            speed: Math.random() * 6 + 2,
            radius: Math.random() * 3 + 1,
            alpha: 1
        });
    }
}


    function animate() {

        ctx.fillStyle = "rgba(0,0,0,0.2)";
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach((p, index) => {

            p.x += Math.cos(p.angle) * p.speed;
            p.y += Math.sin(p.angle) * p.speed;
            p.alpha -= 0.01;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
const colors = [
    "255, 80, 150",   // hồng
    "255, 200, 80",   // vàng
    "80, 200, 255",   // xanh dương
    "200, 120, 255",  // tím
    "255, 100, 100"   // đỏ
];

const color = colors[Math.floor(Math.random() * colors.length)];
ctx.fillStyle = `rgba(${color}, ${p.alpha})`;
            ctx.fill();

            if (p.alpha <= 0) {
                particles.splice(index, 1);
            }
        });

        requestAnimationFrame(animate);
    }

    // Bắn liên tục mỗi 1.5s
    setInterval(createExplosion, 900);

    animate();
}
function startFinalHeart() {

    const canvas = document.getElementById("heart-canvas-5");
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

canvas.style.display = "block";

    const particles = [];

    function spawnParticle() {

        const t = Math.random() * Math.PI * 2;
        const point = pointOnHeart(t);

        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const scale = 3;

        const x = centerX + point.x * scale;
        const y = centerY + point.y * scale;

        const vx = (Math.random() - 0.5) * 2;
        const vy = (Math.random() - 0.5) * 2;

particles.push(new Particle(x, y, vx, vy, ctx));
    }

    function animate() {

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (particles.length < 600) {
            for (let i = 0; i < 10; i++) spawnParticle();
        }

        for (let i = particles.length - 1; i >= 0; i--) {
            particles[i].update();
            particles[i].draw();
            if (particles[i].life <= 0) particles.splice(i, 1);
        }

        requestAnimationFrame(animate);
    }

    animate();
}







