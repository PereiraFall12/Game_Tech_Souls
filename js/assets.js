//imagens

let sun_0 = new Image();
sun_0.src = "images/suna_0.png";
let sun_1 = new Image();
sun_1.src = "images/suna_1.png";

let warrior_0 = new Image();
let warrior_1 = new Image();
let warrior_2 = new Image();
let warrior_3 = new Image();
warrior_0.src = "images/warrior_0.png";
warrior_1.src = "images/warrior_1.png";
warrior_2.src = "images/warrior_2.png";
warrior_3.src = "images/warrior_3.png";
warrior_sprites = [warrior_0, warrior_1, warrior_2, warrior_3];

let enemy_0 = new Image();
let enemy_1 = new Image();
let enemy_2 = new Image();
let enemy_3 = new Image();
enemy_0.src = "images/enemy_0.png";
enemy_1.src = "images/enemy_1.png";
enemy_2.src = "images/enemy_2.png";
enemy_3.src = "images/enemy_3.png";
enemy_sprites = [enemy_0, enemy_1, enemy_2, enemy_3];

let ogre_0 = new Image();
let ogre_1 = new Image();
let ogre_2 = new Image();
let ogre_3 = new Image();
let ogre_4 = new Image();
let ogre_5 = new Image();
ogre_0.src = "images/ogre_walking_0.png";
ogre_1.src = "images/ogre_walking_1.png";
ogre_2.src = "images/ogre_walking_2.png";
ogre_3.src = "images/ogre_attacking.png";
ogre_4.src = "images/attacking_2_ogre.png";
ogre_5.src = "images/dead_ogre.png";
ogre_sprites = [ogre_0, ogre_1, ogre_2, ogre_3, ogre_4, ogre_5];


let torch_0 = new Image();
let torch_1 = new Image();

torch_0.src = "images/torch_0.png";
torch_1.src = "images/torch_1.png";

let flag = new Image();
flag.src = "images/flag.png";

let tree = new Image();
tree.src = "images/tree.png";
let bush = new Image();
bush.src = "images/bush.png";

let grass = new Image();
grass.src = "images/grass.png";

let background = new Image();
background.src = "images/background.png";

let improved_tree0 = new Image();
improved_tree0.src = "images/tree_improved0.png"

let bonfire_image_0 =new Image();
let bonfire_image_1 =new Image();
bonfire_image_0.src = "images/bonfire_0.png";
bonfire_image_1.src = "images/bonfire_1.png";
bonfire_sprites = [bonfire_image_0, bonfire_image_1];

//Sons

let attack_sound = new Audio("sounds/attack_sound.wav");
let defended_attack_sound = new Audio("sounds/defended_attack_sound.wav");
let miss_attack_sound = new Audio("sounds/miss_attack_sound.wav");
let soft_ambient_sound = new Audio("sounds/soft_ambient_sound.mp3");
let combat_sound = new Audio("sounds/battle_sound.mp3");

soft_ambient_sound.loop = true;
combat_sound.loop = true;
soft_ambient_sound.volume = 0.0;
combat_sound.volume = 0.25;
attack_sound.volume = 0.2;
defended_attack_sound.volume = 0.2;
miss_attack_sound.volume = 0.2;
