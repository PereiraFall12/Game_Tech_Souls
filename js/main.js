var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
let tempo = 0;
var mapa = 0;
let teclas = {};
let musicaAtual = null;
ctx.imageSmoothingEnabled = false;

function die(warrior) {
    alert("You died"); // Feedback visual clássico

    teclas = {};

    if (warrior.lastBonfire) {
        mapa = warrior.lastBonfire.map;
        warrior.x = warrior.lastBonfire.x;
    } else {
        // Caso não tenha tocado em nenhuma fogueira, volta ao início
        mapa = 0;
        warrior.x = 5;
        warrior.y = 370;
    }

    // Restaura a vida e stamina
    warrior.vida = warrior.vidaMax;
    warrior.stamin = warrior.staminMax;
    warrior.invencibilidade = 0;

    // Opcional: Resetar a vida de todos os inimigos do mapa ao morrer
    enemies_list.forEach(e => {
        e.vida = 2; 
    });
}

function trocarMusica(novaMusica) {
    if (musicaAtual === novaMusica) return;

    if (musicaAtual) {
        musicaAtual.pause();
        musicaAtual.currentTime = 0;
    }

    musicaAtual = novaMusica;
    musicaAtual.volume = 0.3;
    if(musicaAtual != soft_ambient_sound){
        musicaAtual.volume = 0.25;
    }
    musicaAtual.play();
}


warrior_jhon = new Warrior(5,370, warrior_sprites);
//enemy_albert = new Enemy(450, 360, enemy_sprites, 2);
ogre_2 = new Enemy(360, 360, ogre_sprites, 2);
ogre_3 = new Enemy(260, 360, ogre_sprites, 2);
ogre_4 = new Enemy(160, 360, ogre_sprites, 2);
ogre_jorge = new Enemy(360, 360, ogre_sprites, 1);
bonfire_zuli = new Bonfire(200, 380, bonfire_sprites, 3);

bonfires = [bonfire_zuli];
enemies_list = [ogre_jorge, ogre_2, ogre_3, ogre_4];

document.addEventListener("keydown", (event) => {
    teclas[event.key] = true;
});

document.addEventListener("keyup", (event) => {
    teclas[event.key] = false;
});

document.addEventListener("keydown", (event) => {
    trocarMusica(soft_ambient_sound);

    soft_ambient_sound.currentTime = 0;
    soft_ambient_sound.play();

}, { once: true });


function emCombate() {
    return false;
}

setInterval(function() {

    ctx.clearRect(0,0,600,600);

    tempo++;


    if (mapa == 0){

        ctx.fillStyle = "SkyBlue";
        ctx.fillRect(0,0,600,600);

        ctx.drawImage(background, 0, 0 , 1300, 600);


        ctx.drawImage(bush, 510, 356 , 50, 50);
        ctx.drawImage(bush, 350, 356 , 50, 50);
        ctx.drawImage(bush, 70, 356 , 50, 50);

        ctx.drawImage(grass, 0, 400, 600, 200);

        ctx.drawImage(bush, 320, 490, 50, 50);

        ctx.drawImage(improved_tree0, 420, 430, 130, 130);
        ctx.drawImage(bush, 40, 430, 50, 50);
        ctx.drawImage(bush, 140, 450, 50, 50);
        ctx.drawImage(improved_tree0, 200, 410 , 130, 130);
        ctx.drawImage(bush, 140, 450, 50, 50);
        ctx.drawImage(improved_tree0, 40, 490, 130, 130);
        ctx.drawImage(bush, 500, 410 , 50, 50);
        


    }else if(mapa == 1){
        ctx.drawImage(background, -600, 0 , 1300, 600);

        ctx.drawImage(grass, 0, 400, 600, 200);

        ctx.fillStyle = "Gray";
        ctx.fillRect(300,400,300,300);

        ctx.fillStyle = "#333333";
        ctx.fillRect(300, 250, 300, 150);

        ctx.fillStyle = "Gray";
        ctx.fillRect(300,220, 300,30);
        ctx.strokeStyle = "Black";
        ctx.strokeRect(300,220, 300,30);

        ctx.drawImage(bush, 180, 450, 50, 50);
        ctx.drawImage(improved_tree0, 50, 430   , 130, 130);
        

        for(var i = 0; i<11; i++){
            for(var j = 0; j<7; j++){
                ctx.strokeStyle = "Black";
                ctx.strokeRect(300 + i *30,400 + j*30 ,30, 30);
            }
        }

        for(var i= 0; i<4; i++){
            ctx.fillStyle = "Gray";
            ctx.fillRect(300 + 75*i,250, 40,150);
            ctx.strokeStyle = "Black";
            ctx.strokeRect(300 + 75*i,250, 40,150);
        }


    }else if(mapa == 2){

        ctx.fillStyle = "#333333";
        ctx.fillRect(0,0,600,600);

        ctx.fillStyle = "Gray";
        ctx.fillRect(0,400,600,300);

        for(var i = 0; i<21; i++){
            for(var j = 0; j<7; j++){
                ctx.strokeStyle = "Black";
                ctx.strokeRect(i *30,400 + j*30 ,30, 30);
            }
        }

        for(var i= 0; i<8; i++){
            ctx.fillStyle = "Gray";
            ctx.fillRect(80*i,0, 30,400);
            ctx.strokeStyle = "Black";
            ctx.strokeRect(80*i,0, 30,400);
            drawTorch(80*i, 350, Math.floor(tempo / 5) % 2);
            ctx.drawImage(flag, 80*i + 40, 200, 30, 30);
        }

    } else if (mapa == 3){

        ctx.fillStyle = "#333333";
        ctx.fillRect(0,0,600,600);

        ctx.fillStyle = "Gray";
        ctx.fillRect(0,400,600,300);

        for(var i = 0; i<21; i++){
            for(var j = 0; j<7; j++){
                ctx.strokeStyle = "Black";
                ctx.strokeRect(i *30,400 + j*30 ,30, 30);
            }
        }

        for(var i= 0; i<8; i++){
            ctx.fillStyle = "Gray";
            ctx.fillRect(80*i,0, 30,400);
            ctx.strokeStyle = "Black";
            ctx.strokeRect(80*i,0, 30,400);
            drawTorch(80*i, 350, Math.floor(tempo / 5) % 2);
        }

        drawEye(300, 100, warrior_jhon);

    }

    for(var i = 0; i<bonfires.length; i++){
        if(bonfires[i].map == mapa){
            bonfires[i].update(tempo);
            bonfires[i].draw();
            if(teclas["c"]){
                verify_proximity(warrior_jhon, bonfires[i]);
            }
        }
    }

    //Ataque do jogador
    if (warrior_jhon.status == 5 || warrior_jhon.status == 6) {
        let hit = warrior_jhon.getHitbox();

        for(var i = 0; i<enemies_list.length; i++){
            if(colide(hit, enemies_list[i].hitBox) && enemies_list[i].invecibilidade == 0 && enemies_list[i].map == mapa){
                enemies_list[i].vida--;
                enemies_list[i].invecibilidade = 40;
                if(enemies_list[i].x - warrior_jhon.x >= 0){
                    enemies_list[i].knockback = 4;
                }else{
                    enemies_list[i].knockback = -4;
                }
                defended_attack_sound.currentTime = 0.19;
                defended_attack_sound.play();
            }
        }
        warrior_jhon.status = 2; 
    }

    //atualização do bot
    for(var i = 0; i<enemies_list.length; i++){
        if(enemies_list[i].map == mapa){
            enemies_list[i].update(tempo, warrior_jhon);
            enemies_list[i].draw();
        }
    }

    //Ataque do inimigo
    for(var i = 0; i<enemies_list.length; i++){
        if (enemies_list[i].map == mapa && enemies_list[i].vida > 0) {
        
        // Inimigo ataca Warrior (Novo)
        let bodyInimigo = enemies_list[i].getHitboxAttack();
        let bodyWarrior = { x: warrior_jhon.x, y: warrior_jhon.y, w: warrior_jhon.w, h: warrior_jhon.h };


        if (enemies_list[i].status == 7 ||enemies_list[i].status == 9) {

            if (ver_hitbox){
                ctx.strokeStyle = "Red";
                ctx.strokeRect( bodyInimigo.x, bodyInimigo.y, bodyInimigo.w, bodyInimigo.h);
            }

            if(warrior_jhon.invencibilidade == 0 && colide(bodyInimigo, bodyWarrior)){
                warrior_jhon.vida -= 10; 
                warrior_jhon.invencibilidade = 30; // Tempo de segurança

                attack_sound.currentTime = 0;
                attack_sound.play();

            }
            
            }
        }
    }

    warrior_jhon.update(teclas, tempo);
    warrior_jhon.draw();

    if (warrior_jhon.vida <= 0) {
        die(warrior_jhon);
    }

    if (emCombate()) {
        trocarMusica(combat_sound);
    } else {
        trocarMusica(soft_ambient_sound);
    }

    if(warrior_jhon.x >570){


        let pass_edge = true;

        for(var i = 0; i<enemies_list.length; i++){
            if(enemies_list[i].vida>0 && enemies_list[i].map == mapa){
                pass_edge = false;
            }
        }

        if (pass_edge == false || mapa == num_cenarios -1){
            warrior_jhon.x =570;
        }else{
            warrior_jhon.x = 5;
            mapa++;
        }
        
    }

    if (warrior_jhon.x < 0){

        let pass_edge = true;

        for(var i = 0; i<enemies_list.length; i++){
            if(enemies_list[i].vida>0 && enemies_list[i].map == mapa){
                pass_edge = false;
            }
        }
        
        if (pass_edge == false || mapa == 0){
            warrior_jhon.x = 0;
        }else{
            warrior_jhon.x = 570;
            mapa--;
        }
    }

}, 16); 