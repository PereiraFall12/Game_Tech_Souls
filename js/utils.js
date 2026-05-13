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