var section = document.getElementById("sec");
var tabPerso = [];

section.height = window.innerHeight + "px";
section.width = window.innerWidth + "px";

function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function randsanszero(min, max) {
    var random = Math.floor(Math.random() * (max - min + 1) + min);
    while (random === 0) {
        random = Math.floor(Math.random() * (max - min + 1) + min);
    }
    return random;
}

function Perso() {
    this.posX = rand(10, window.innerWidth - 100);
    this.posY = rand(10, window.innerHeight - 100);
    this.speedX = randsanszero(-4, 4);
    this.speedY = randsanszero(-4, 4);
    this.duration = rand(4, 15);
    this.rotation = rand(0, 1);


    //Creation de l'image
    this.image = document.createElement("img");
    this.image.src = "../cards/img" + rand(1, 13) + ".png";
    this.image.id = "perso";
    section.appendChild(this.image);

    //Place initiale de l'image
    this.image.style.left = this.posX + "px";
    this.image.style.top = this.posY + "px";

    if (this.rotation === 0) {
        this.image.style.animation = "rotation1 " + this.duration + "s infinite linear";
    } else {
        this.image.style.animation = "rotation2 " + this.duration + "s infinite linear";
    }

    //Infos sur la position pour les méthodes
    this.width = this.image.width;
    this.height = this.image.height;
}

Perso.prototype.update = function () {
    if (this.posX + this.width >= window.innerWidth || this.posX <= 0) {
        this.speedX = -this.speedX;
    }
    if (this.posY + this.height >= window.innerHeight || this.posY <= 0) {
        this.speedY = -this.speedY;
    }
    this.image.style.left = this.posX + "px";
    this.image.style.top = this.posY + "px";
    this.posX += this.speedX;
    this.posY += this.speedY;
};


function f() {
    var i;
    for (i = 0; i < 20; i += 1) {
        tabPerso.push(new Perso());
    }

    setInterval(update, 1000 / 60);
}

function update() {
    var i;
    for (i = 0; i < tabPerso.length; i += 1) {
        tabPerso[i].update();
    }
}

document.addEventListener('DOMContentLoaded', f);