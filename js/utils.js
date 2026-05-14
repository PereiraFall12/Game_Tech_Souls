function colide(a, b) {
    return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
}

function sigmoid(x) {
    return 1 / (1 + Math.exp(-x));
}

var circle = function(x, y, radius, fillCircle) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI*2, false);
    if (fillCircle) ctx.fill(); else ctx.stroke();
}

function verify_proximity(warrior, bonfire){
    if(Math.abs(warrior.x < bonfire.x) <= 40){
        warrior.lastBonfire = bonfire;
        warrior.vida = warrior.vidaMax;
    }
}

var drawSun = function(x, y, status){
    if(status == 1) ctx.drawImage(sun_0, x, y, 100, 100);
    else ctx.drawImage(sun_1, x, y, 100, 100);
}

var drawTorch = function(x, y, status){
    if(status == 1) ctx.drawImage(torch_0, x, y, 30, 30);
    else ctx.drawImage(torch_1, x, y, 30, 30);
}

function applyFilter(img, a,r = 1, g = 1, b = 1) {

    let canvasOff = document.createElement("canvas");
    let ctxOff = canvasOff.getContext("2d");
    canvasOff.width = img.width;
    canvasOff.height = img.height;

    ctxOff.drawImage(img, 0, 0);
    let imgData = ctxOff.getImageData(0, 0, img.width, img.height);
    let data = imgData.data;

    for (let i = 0; i < data.length; i += 4) {
        data[i]     = data[i]     * r; // Red
        data[i + 1] = data[i + 1] * g; // Green
        data[i + 2] = data[i + 2] * b; // Blue
        data[i + 3] = data[i + 3] * a; // Alpha
    }

    ctxOff.putImageData(imgData, 0, 0);
    
    return canvasOff;
}

function drawRope(A, B, color, L = 400) {

    // 1. Calcular a distância atual entre os pontos
    const dx = B.x - A.x;
    const dy = B.y - A.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    // 2. Encontrar o ponto médio
    const midX = (A.x + B.x) / 2;
    const midY = (A.y + B.y) / 2;

    let Cx, Cy;

    if (dist < L) {
        const h = Math.sqrt(Math.pow(L / 2, 2) - Math.pow(dist / 2, 2)) * 1.33;
        Cx = midX;
        Cy = midY + h; // A gravidade puxa para baixo no eixo Y
    } else {
        // 4. Se a corda estiver esticada ao máximo, o ponto de controle é o meio (reta)
        Cx = midX;
        Cy = midY;
    }

    // 5. Desenhar a curva de Bézier Quadrática
    ctx.beginPath();
    ctx.moveTo(A.x, A.y);
    ctx.quadraticCurveTo(Cx, Cy, B.x, B.y);
    
    ctx.save();
    // Estilização básica (você pode alterar para o estilo do Tech Souls)
    ctx.strokeStyle = color; // Um tom marrom de corda
    ctx.lineWidth = 5;
    ctx.lineJoin = "round";
    ctx.stroke();
    ctx.restore();
}

function checkCollision(circle, rect) {
    // 1. Encontrar o ponto mais próximo do círculo dentro do retângulo
    
    let closestX = Math.max(rect.x, Math.min(circle.x, rect.x + rect.w));
    let closestY = Math.max(rect.y, Math.min(circle.y, rect.y + rect.h));

    // 2. Calcular a distância entre o centro do círculo e esse ponto próximo
    let distanceX = circle.x - closestX;
    let distanceY = circle.y - closestY;

    // 3. Usar o teorema de Pitágoras para a distância real (ao quadrado para performance)
    let distanceSquared = (distanceX * distanceX) + (distanceY * distanceY);

    // 4. Se a distância for menor que o raio ao quadrado, colidiu!
    return distanceSquared < (circle.radius * circle.radius);
}