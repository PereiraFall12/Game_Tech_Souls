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
    if(Math.abs(warrior.x < bonfire.x) <= 40) warrior.lastBonfire = bonfire;
}

var drawSun = function(x, y, status){
    if(status == 1) ctx.drawImage(sun_0, x, y, 100, 100);
    else ctx.drawImage(sun_1, x, y, 100, 100);
}

var drawTorch = function(x, y, status){
    if(status == 1) ctx.drawImage(torch_0, x, y, 30, 30);
    else ctx.drawImage(torch_1, x, y, 30, 30);
}

var drawEye = function(x, y, warrior){
    ctx.fillStyle = "White";
    circle(x, y, 50, true);
    let theta = Math.atan((x - warrior.x)/ (y - warrior.y));
    ctx.fillStyle = "Red";
    circle(x + 23*Math.sin(theta), y + 23*Math.cos(theta), 25, true);
    ctx.fillStyle = "black";
    circle(x + 23*Math.sin(theta), y + 23*Math.cos(theta), 15, true);
    ctx.fillStyle = "#dddddd";
    circle(x + 5 + 23*Math.sin(theta), y - 5 + 23*Math.cos(theta), 4, true);
}