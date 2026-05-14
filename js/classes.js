class Bonfire{
    constructor(x, y, sprites, map){
        this.x = x;
        this.y = y;
        this.sprites = sprites;
        this.map = map;
        this.status = 0;
        this.h = 20;
        this.w = 35;
    }

    update(tempo){
        this.status = Math.floor(tempo/15)%2;
    }

    draw(){
        ctx.drawImage(this.sprites[this.status], this.x, this.y, this.w, this.h);
    }
}

class Warrior{
    constructor(x, y, sprite){
        this.x = x;
        this.y = y;
        this.vel = 2;
        this.sprite = sprite;
        this.status = 2;
        this.w = 30;
        this.h = 30;
        this.cooldown = 0;
        this.atacando_dir = 0;
        this.atacando_esq = 0;
        this.stamin = 4;
        this.staminMax = 4; 
        this.vida = 30;
        this.vidaMax = 30;
        this.lastBonfire = null;
        this.invencibilidade = 0;
        this.attack_range = 20;
        this.levou_dano = 0;
        this.levou_dano_direção = 0;
        this.congelamento = 0;
    }

    update(teclas, tempo){

        if (this.cooldown > 0) {
            this.cooldown--;
        }

        if (this.atacando_dir >0){
            this.atacando_dir--;
        }

        if (this.atacando_esq >0){
            this.atacando_esq--;
        }

        if (this.invencibilidade>0){
            this.invencibilidade--;
        }

        if (this.levou_dano>0){
            this.levou_dano--;
        }

        if (this.congelamento>0){
            this.congelamento--;
            this.vel = 1;
        }else{
            this.vel = 2;
        }


        this.stamin = Math.min(this.staminMax, Math.max(this.stamin + 0.01, 0));

        
        if (this.atacando_dir>0) {
            this.status = 5;
        }else if(this.atacando_esq>0) {
            this.status = 6;
        }else if(teclas["w"] && teclas["d"] &&  this.cooldown == 0 && this.stamin>=1) {
            this.status = 5;
            this.cooldown = 30;
            this.atacando_dir = 10;
            this.stamin--;

            miss_attack_sound.currentTime = 0;
            miss_attack_sound.play();

        }else if(teclas["w"] && teclas["a"] && this.cooldown == 0 && this.stamin>=1) {
            this.status = 6;
            this.cooldown = 30;
            this.atacando_esq = 10;
            this.stamin--;

            miss_attack_sound.currentTime = 0;
            miss_attack_sound.play();

        }else if(teclas["d"]) {
            this.x += this.vel;
            this.status = Math.floor(tempo / 20) % 2;
        }else if(teclas["a"]) {
            this.x -= this.vel;
            this.status = 3 + Math.floor(tempo / 20) % 2;
        }else{
            this.status = 2;
        }
    }

    getBodyBox() {
        return {
            x: this.x,
            y: this.y,
            w: this.w,
            h: this.h
        };
    }

    getHitbox() {
        if (this.status == 5){
            return {
                x: this.x + 30, 
                y: this.y + 5,
                w: 20,
                h: 5
            };
        }else{
            return {
                x: this.x - 20, 
                y: this.y + 5,
                w: 20,
                h: 5
            };
        }
    }

    draw(){
        if(this.status == 0) {
            ctx.drawImage(this.sprite[0], this.x, this.y, this.w, this.h);
        }else if(this.status == 1) {
            ctx.drawImage(this.sprite[1], this.x, this.y, this.w, this.h);
        }else if(this.status == 2) {
            ctx.drawImage(this.sprite[2], this.x, this.y, this.w, this.h);
        }else if(this.status == 3) {

            ctx.save();
            ctx.scale(-1, 1); 
            ctx.drawImage(this.sprite[0], -this.x - this.w, this.y, this.w, this.h);
            ctx.restore();

        }else if(this.status == 4) {
            ctx.save();
            ctx.scale(-1, 1); 
            ctx.drawImage(this.sprite[1], -this.x - this.w, this.y, this.w, this.h);
            ctx.restore();
        }else if(this.status == 5){
            ctx.drawImage(this.sprite[3], this.x, this.y, this.w + this.attack_range, this.h);
        }else if(this.status == 6){
            ctx.save();
            ctx.scale(-1, 1); 
            ctx.drawImage(this.sprite[3], -this.x -this.w, this.y, this.w + this.attack_range, this.h);
            ctx.restore();
        }
    }
}

class Enemy{
    constructor(x, y, sprite, map){
        this.x = x;
        this.y = y;
        this.vel = 1;
        this.sprite = sprite;
        this.status = 2;
        this.vida = 2;
        this.w = 30;
        this.h = 40;
        this.hitBox = {x:this.x, y: this.y, w: this.w, h:this.h};
        this.invecibilidade = 0;
        this.knockback = 0;
        this.atacando = 0;
        this.atacando_2 = 0;
        this.map = map;
        this.attack_range = 30;

    }

    update(tempo, warrior){

        if(this.invecibilidade>0){
            this.invecibilidade--;
        }

        if(this.knockback >0){
            this.knockback = this.knockback - 0.25;
        }

        if(this.knockback <0){
            this.knockback = this.knockback + 0.25;
        }

        if(this.atacando > 0){
            this.atacando--;
        }

        if(this.atacando_2 >0){
            this.atacando_2--;
        }

        if(this.vida>0){

            if ((this.x - warrior.x>=0  && this.x - warrior.x < 30 && this.atacando == 0 && this.status!=6 && this.status!=8 && this.status!=7 && this.status!=9 )){ // começa a animação
                this.atacando = 30;
                this.status = 6; //carregando ataque para esquerda
            }else if (this.atacando>0 && this.status == 6){ //durante a animação
                this.status = 6; //carregando ataque para esquerda
            }else if((this.atacando == 0 && this.status == 6)){ //começa a animação 
                this.atacando_2 = 30;
                this.status = 7; //ataque para esquerda
            }else if(this.atacando_2>0 && this.status == 7){ // durante a animação
                this.status = 7; //ataque para esquerda
            }else if ((this.x - warrior.x<=0  && this.x - warrior.x > -30 && this.atacando == 0 && this.status!=6 && this.status!=8 && this.status!=7 && this.status!=9)){ // começa a animação
                this.atacando = 30;
                this.status = 8; //carregando ataque para direita
            }else if ( (this.atacando>0 && this.status == 8)){ // durante a animação
                this.status = 8; //carregando ataque para direita
            }else if((this.atacando == 0 && this.status == 8)){ // começa a animação
                this.atacando_2 = 30;
                this.status = 9; //ataque para direita
            }else if(this.atacando_2>0 && this.status == 9){ // durante a animação
                this.status = 9; //ataque para direita
            }else if (this.x - warrior.x>=0 && this.x -warrior.x <150){
                this.x = this.x - this.vel;
                this.status = this.status = Math.floor(tempo / 20) % 3;
            } else if (this.x - warrior.x<0 && this.x -warrior.x>-150){
                this.x = this.x + this.vel;
                this.status = 3 + Math.floor(tempo / 20) % 3;
            } else if (this.x - warrior.x <= -150){
                this.status = 5;
            } else {
                this.status = 2;
            }
            
            this.x = this.x + this.knockback;
            this.hitBox.x = this.x;
            this.hitBox.y = this.y;
        }else{
            this.status = 10; //morto
        }

    }

    getHitboxAttack(){
        if(this.status == 7){
            return {x: this.x - this.attack_range, y:this.y, w: this.attack_range, h: this.h}
        }else if(this.status == 9){
            return {x: this.x + this.attack_range, y:this.y, w: this.attack_range, h: this.h}
        }
    }

    draw(){
        
        ctx.save();

        if (this.congelamento >0 ){
            ctx.filter = "hue-rotate(180deg) saturate(1.2) brightness(0.8)";
        }

        if(this.status == 0) {
            ctx.drawImage(this.sprite[0], this.x, this.y, this.w, 40);
        }else if(this.status == 1) {
            ctx.drawImage(this.sprite[1], this.x, this.y, this.w, 40);
        }else if(this.status == 2) {
            ctx.drawImage(this.sprite[2], this.x, this.y, this.w, 40);
        }else if(this.status == 3) {

            ctx.scale(-1, 1); 
            ctx.drawImage(this.sprite[0], -this.x - this.w, this.y, this.w, 40);

        }else if(this.status == 4) {

            
            ctx.scale(-1, 1); 
            ctx.drawImage(this.sprite[1], -this.x - this.w, this.y, this.w, 40);

        }else if(this.status == 5){
            
            ctx.scale(-1, 1); 
            ctx.drawImage(this.sprite[2], -this.x - this.w, this.y, this.w, this.h);

        }else if (this.status == 6){
            ctx.drawImage(this.sprite[3], this.x, this.y, this.w, this.h);

        }else if (this.status == 7){
            ctx.drawImage(this.sprite[4], this.x-this.w, this.y, this.attack_range + this.w, this.h);
            
        }else if (this.status == 8){

            ctx.scale(-1, 1);
            ctx.drawImage(this.sprite[3], -this.x-this.w, this.y, this.w, this.h);

        }else if (this.status == 9){

            ctx.scale(-1, 1);
            ctx.drawImage(this.sprite[4], -this.x-this.attack_range - this.w, this.y, this.attack_range + this.w, this.h);
            
        }else if (this.status == 10){
            ctx.drawImage(this.sprite[5], this.x - 5, this.y, this.attack_range + this.w, this.h);
        }

        ctx.restore();
        
    }
}

class InteractableObject{
    constructor(image, x, y, w, h, map, r = 0, translucible = true, bright = 1){
        this.image = image;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.map = map;
        this.alpha = 1;
        this.box = {x:this.x, y:this.y,  w:this.w, h:this.h}
        this.r = r;
        this.translucible = translucible;
        this.bright = bright;
    }

    update(warrior){
        if(colide(this.box, warrior.getBodyBox()) && this.translucible){
            this.alpha = 0.3;
        }else{
            this.alpha = 1;
        }
    }

    draw(){
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.filter = `brightness(${this.bright})`;
        ctx.drawImage(this.image, this.x, this.y, this.w, this.h);
        ctx.restore();
    }
}

class Particle{
    constructor(x, y, radius, color, vx, vy, map, hostile = false, fill = false, reg = 0, damage = 0, congelamento = 0){
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.vx = vx;
        this.vy = vy;
        this.map = map;
        this.hostile = hostile;
        this.fill = fill;
        this.reg = reg;
        this.damage = damage;
        this.dead = false;
        this.congelamento = congelamento; 
    }

    getBodyBox(){
        return {x: this.x, y: this.y, radius: this.radius};
    }

    update(warrior, mapa){
        this.x = this.x + this.vx;
        this.y = this.y + this.vy;
        if (checkCollision(this.getBodyBox(), warrior.getBodyBox()) && mapa == this.map){
            warrior.vida = warrior.vida - this.damage;
            warrior.congelamento = this.congelamento;
            this.dead = true;
        }
        if (!checkCollision(this.getBodyBox(), {x: 0, y:0, w:600, h: 600})){
            this.dead = true;
        }
    }

    draw(){
        ctx.fillStyle = this.color;
        circle(this.x, this.y, this.radius, this.fill);
    }
}

class EyeUnity{
    constructor(x, y, color, r = 0){
        this.x = x;
        this.y = y;
        this.color = color;
        this.theta = 0;
        this.r = r;
    }

    update(warrior){
        this.theta = Math.atan((this.x - warrior.x)/ (this.y - warrior.y));
    }

    draw(){
        ctx.fillStyle = "White";
        circle(this.x, this.y, 50, true);
        ctx.fillStyle = this.color;
        circle(this.x + 23*Math.sin(this.theta), this.y + 23*Math.cos(this.theta), 25, true);
        ctx.fillStyle = "black";
        circle(this.x + 23*Math.sin(this.theta), this.y + 23*Math.cos(this.theta), 15, true);
        ctx.fillStyle = "#dddddd";
        circle(this.x + 5 + 23*Math.sin(this.theta), this.y - 5 + 23*Math.cos(this.theta), 4, true);
    }
}

class EyeBoss{
    constructor(first_x, first_y, sec_x, sec_y,trd_x, trd_y, color_1, color_2, color_3, sprites, r = 0, map = 4){
        this.firstEye = new EyeUnity(first_x, first_y, color_1, r = r);
        this.secEye = new EyeUnity(sec_x, first_y, color_2, r = r);
        this.trdEye = new EyeUnity(trd_x, trd_y, color_3, r = r);
        this.vidaMax = 1000;
        this.vida = 1000;
        this.r = r;
        this.map = map;
        this.secState = false;
        this.currentParticles = [];
        this.state = 0;
        this.heart_sprites = sprites;
        this.heart_position = {x:0, y:0};
        this.heart_state = 0;
        this.invecibilidade = 0;
        this.original_first_x = first_x;
        this.original_first_y = first_y;
        this.original_sec_x = sec_x;
        this.original_sec_y = sec_y;
        this.original_trd_x = trd_x;
        this.original_trd_y = trd_y;
        this.tempoMorto = 0;
        this.alpha = 1;
    }

    getHeartBox(){
        return {x: this.heart_position.x - 20, y: this.heart_position.y, w: 40, h:40}
    }

    reset(){
        this.firstEye.x = this.original_first_x;
        this.firstEye.y = this.original_first_y;
        this.secEye.x = this.original_sec_x;
        this.secEye.y = this.original_sec_y;
        this.trdEye.x = this.original_trd_x;
        this.trdEye.y = this.original_trd_y;
        this.secState = false;
        this.vida = this.vidaMax;
    }

    update(warrior, time) {

        if(this.vida > 0){
            this.firstEye.update(warrior);
            this.secEye.update(warrior);
            this.trdEye.update(warrior);

            if(this.invecibilidade>0){
                this.invecibilidade--;
            }


            this.heart_position = getLowestPoint(this.firstEye, this.secEye, 650);
            
            this.heart_state = Math.trunc(time * this.vidaMax*0.05/(this.vida + 100))%2;

            if (this.vida < this.vidaMax / 2) {
                this.secState = true;
            }

            if (this.secState && this.trdEye.x > 300) {
                this.trdEye.x -= 1;
            }

            if (time%300 == 1){
                this.state = (this.state + 1)%4;
            }

            if(this.state == 1){
                if(this.firstEye.x > 50){
                    this.firstEye.x -= 1;
                }
                if(this.secEye.x < 550){
                    this.secEye.x += 1;
                }
            }

            if(this.state == 3){
                if(this.firstEye.x < 275){
                    this.firstEye.x += 1;
                }
                if(this.secEye.x > 325){
                    this.secEye.x -= 1;
                }
            }

            //ataque do primeiro olho
            if (time % Math.trunc(this.vida*(180/this.vidaMax) + 60) == 1) {
                let v = 4;
                let dx = warrior.x - this.firstEye.x;
                let dy = warrior.y - this.firstEye.y;
                let angle = Math.atan2(dy, dx); 

                let vx = Math.cos(angle) * v;
                let vy = Math.sin(angle) * v;

                this.currentParticles.push(new Particle(
                    this.firstEye.x, 
                    this.firstEye.y, 
                    5,               
                    this.firstEye.color,           
                    vx, 
                    vy, 
                    this.map, 
                    true,            
                    true,           
                    900,             
                    5,
                    0             
                ));
            }

            //ataque do segundo olho
            if (time % Math.trunc(this.vida*(180/this.vidaMax) + 60) == 1) {
                let v = 1;
                let dx = warrior.x - this.secEye.x;
                let dy = warrior.y - this.secEye.y;
                let angle = Math.atan2(dy, dx); 

                for(var i = 0; i< 3; i++){

                    let vx = Math.cos(angle + 0.5 - 0.5*i) * v;
                    let vy = Math.sin(angle + 0.5 - 0.5*i) * v;

                    this.currentParticles.push(new Particle(
                        this.secEye.x, 
                        this.secEye.y, 
                        5,               
                        this.secEye.color,           
                        vx, 
                        vy, 
                        this.map, 
                        true,            
                        true,           
                        900,             
                        5,
                        0            
                    ));
                }

            }

            // atque do terceiro olho

            if(this.secState && time % Math.trunc(this.vida*(180/this.vidaMax) + 60) == 1){
                let v = 2;
                let dx = warrior.x - this.trdEye.x;
                let dy = warrior.y - this.trdEye.y;
                let angle = Math.atan2(dy, dx); 

                let vx = Math.cos(angle) * v;
                let vy = Math.sin(angle) * v;

                this.currentParticles.push(new Particle(
                    this.trdEye.x, 
                    this.trdEye.y, 
                    5,               
                    this.trdEye.color,           
                    vx, 
                    vy, 
                    this.map, 
                    true,            
                    true,           
                    900,             
                    0,
                    30               
                ));
            }
        }else{
            if(this.alpha > 0){
                this.alpha = this.alpha - 1/180;
                if(this.alpha <= 0){
                    this.alpha = 0;
                }
            }else{
                this.alpha = 0;
            }
        }
    }

    draw(){
        ctx.save();
        ctx.globalAlpha = this.alpha;
        drawRope(this.firstEye, this.secEye, "red", 650);
        drawRope(this.secEye, this.trdEye, "red", 700);
        this.firstEye.draw();
        this.secEye.draw();   
        this.trdEye.draw();
        ctx.drawImage(this.heart_sprites[this.heart_state], this.heart_position.x - 20, this.heart_position.y, 40, 40);

        // desenhar vida

        ctx.fillStyle = "#dddddd";
        ctx.fillRect( 50 , 500, this.vidaMax/2, 25);
        ctx.fillStyle = "red";
        ctx.fillRect(50, 500, Math.trunc(this.vida/2), 25);
        ctx.strokeStyle = "#000000";
        ctx.strokeRect(50, 500, this.vidaMax/2, 25);
        ctx.restore();
    }
}