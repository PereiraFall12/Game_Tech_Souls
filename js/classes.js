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

        //desenha a barra de stamina
        ctx.fillStyle = "#dddddd";
        ctx.fillRect(7,30, 80, 10);
        ctx.fillStyle = "Green";
        ctx.fillRect(7, 30, this.stamin*20 , 10);
        ctx.strokeStyle = "#000000";
        ctx.strokeRect(7, 30, 80, 10);

        //desenha a barra de vida
        ctx.fillStyle = "#dddddd";
        ctx.fillRect(7,10, 5*this.vidaMax, 10);
        ctx.fillStyle = "Red";
        ctx.fillRect(7, 10, this.vida*5 , 10);
        ctx.strokeStyle = "#000000";
        ctx.strokeRect(7, 10, this.vidaMax*5 , 10);

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
        
        if(this.status == 0) {
            ctx.drawImage(this.sprite[0], this.x, this.y, this.w, 40);
        }else if(this.status == 1) {
            ctx.drawImage(this.sprite[1], this.x, this.y, this.w, 40);
        }else if(this.status == 2) {
            ctx.drawImage(this.sprite[2], this.x, this.y, this.w, 40);
        }else if(this.status == 3) {

            ctx.save();
            ctx.scale(-1, 1); 
            ctx.drawImage(this.sprite[0], -this.x - this.w, this.y, this.w, 40);
            ctx.restore();

        }else if(this.status == 4) {

            ctx.save();
            ctx.scale(-1, 1); 
            ctx.drawImage(this.sprite[1], -this.x - this.w, this.y, this.w, 40);
            ctx.restore();

        }else if(this.status == 5){
            ctx.save();
            ctx.scale(-1, 1); 
            ctx.drawImage(this.sprite[2], -this.x - this.w, this.y, this.w, this.h);
            ctx.restore();

        }else if (this.status == 6){
            ctx.drawImage(this.sprite[3], this.x, this.y, this.w, this.h);

        }else if (this.status == 7){
            ctx.drawImage(this.sprite[4], this.x-this.w, this.y, this.attack_range + this.w, this.h);
            
        }else if (this.status == 8){

            ctx.save();
            ctx.scale(-1, 1);
            ctx.drawImage(this.sprite[3], -this.x-this.w, this.y, this.w, this.h);
            ctx.restore();

        }else if (this.status == 9){

            ctx.save();
            ctx.scale(-1, 1);
            ctx.drawImage(this.sprite[4], -this.x-this.attack_range - this.w, this.y, this.attack_range + this.w, this.h);
            ctx.restore();
            
        }else if (this.status == 10){
            ctx.drawImage(this.sprite[5], this.x - 5, this.y, this.attack_range + this.w, this.h);
        }
        
    }
}
