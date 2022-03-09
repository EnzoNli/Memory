var id_img = {};
var board = new Board();
var tuile1 = undefined;
var tuile2 = undefined;
var clickable = true;
var compteurj1 = 0;
var compteurj2 = 0;
var joueur1_img = "";
var tour = 1;
var section;
var tmp_j1_img;


function Perso(ima, sens) {
    this.sens = sens;
    if (sens === 1) {
        this.posX = -100;
        this.speedX = 5;
    } else {
        this.posX = window.innerWidth + 400;
        this.speedX = -5;
    }
    this.posY = (window.innerHeight / 2) - 80;
    this.duration = 5;
    this.rotation = 0.2;

    this.image = document.createElement("img");
    this.image.src = "../cards/" + ima;
    this.image.id = "perso";
    section.appendChild(this.image);

    this.image.style.left = this.posX + "px";
    this.image.style.top = this.posY + "px";
    if (sens === 1) {
        this.image.style.animation = "rotation2 " + this.duration + "s infinite linear";
    } else {
        this.image.style.animation = "rotation1 " + this.duration + "s infinite linear";
    }
}

Perso.prototype.update = function () {
    this.image.style.left = this.posX + "px";
    this.posX += this.speedX;
};




function randoms(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}


function generate_id_img() {
    var rand;
    var i;
    var src_img = ["../cards/cartes/img1.png", "../cards/cartes/img2.png", "../cards/cartes/img3.png", "../cards/cartes/img4.png", "../cards/cartes/img5.png", "../cards/cartes/img6.png", "../cards/cartes/img7.png", "../cards/cartes/img8.png", "../cards/cartes/img9.png", "../cards/cartes/img10.png", "../cards/cartes/img11.png", "../cards/cartes/img12.png", "../cards/cartes/img13.png"];

    var assos_id_img = {
        '1': 0,
        '10': 0,
        '11': 0,
        '12': 0,
        '13': 0,
        '2': 0,
        '3': 0,
        '4': 0,
        '5': 0,
        '6': 0,
        '7': 0,
        '8': 0,
        '9': 0
    };
    for (i = 1; i < Object.keys(assos_id_img).length + 1; i += 1) {
        rand = Math.floor(Math.random() * src_img.length);
        assos_id_img[i] = src_img[rand];
        src_img.splice(rand, 1);
    }
    return assos_id_img;
}

function melanger_tableau(tab) {
    var i;
    var indice;
    var tmp;
    for (i = tab.length - 1; i > 0; i -= 1) {
        indice = Math.floor(Math.random() * (i + 1));
        tmp = tab[i];
        tab[i] = tab[indice];
        tab[indice] = tmp;
    }
    return tab;
}

function ecoute(event) {
    var targ = event.currentTarget;
    var x = parseInt(targ.id.split('')[0]);
    var y = parseInt(targ.id.split('')[1]);
    if (board.tiles[x * 5 + y].isRevealed === false) {
        if (clickable === true) {
            board.tiles[x * 5 + y].flipTile();
            if (tuile1 === undefined) {
                tuile1 = board.tiles[x * 5 + y];
                supprimer_event(tuile1.getElement());
                tuile1.getElement().style.border = "4px solid rgb(26, 223, 36)";
            } else {
                tuile2 = board.tiles[x * 5 + y];
                supprimer_event(tuile2.getElement());
                tuile2.getElement().style.border = "4px solid rgb(26, 223, 36)";
                testCouple(tuile1, tuile2);
                tuile1 = undefined;
                tuile2 = undefined;
            }
        }
    }
}




function supprimer_event(elm) {
    elm.removeEventListener("mouseout", bordure_out, false);
    elm.removeEventListener("mouseover", bordure_in, false);
    elm.removeEventListener("click", ecoute, false);
}

function ajouter_event(elm) {
    elm.addEventListener('click', ecoute, false);
    elm.addEventListener('mouseover', bordure_in, false);
    elm.addEventListener('mouseout', bordure_out, false);
}



function gere_ordi() {
    var t1_x = randoms(0, 4);
    var t1_y = randoms(0, 4);
    var t2_x = randoms(0, 4);
    var t2_y = randoms(0, 4);
    setTimeout(function () {
        while (board.tiles[t1_x * 5 + t1_y].isRevealed) {
            t1_x = randoms(0, 4);
            t1_y = randoms(0, 4);
        }

        while (board.tiles[t2_x * 5 + t2_y].isRevealed) {
            t2_x = randoms(0, 4);
            t2_y = randoms(0, 4);
        }

        while (t1_x === t2_x && t1_y === t2_y) {
            t2_x = randoms(0, 4);
            t2_y = randoms(0, 4);
            while(board.tiles[t2_x * 5 + t2_y].isRevealed){
                t2_x = randoms(0, 4);
                t2_y = randoms(0, 4);
            }
        }

        board.tiles[t1_x * 5 + t1_y].getElement().click();
        board.tiles[t2_x * 5 + t2_y].getElement().click();
    }, 500);
}



function testCouple(t1, t2) {
    var elm1;
    var elm2;
    if (t1.id_paire !== t2.id_paire) {
        clickable = false;
        setTimeout(function () {
            t1.flipTile();
            t2.flipTile();
            ajouter_event(t1.getElement());
            ajouter_event(t2.getElement());
            t1.getElement().style.border = "4px solid rgb(255, 193, 21)";
            t2.getElement().style.border = "4px solid rgb(255, 193, 21)";
            clickable = true;
            if (tour === 1) {
                tour = 2;
                changer_joueur();
                gere_ordi();
            } else {
                tour = 1;
                changer_joueur();
            }
        }, 1000);
    } else {
        elm1 = t1.getElement();
        elm2 = t2.getElement();

        elm1.style.border = "black";
        elm2.style.border = "black";

        supprimer_event(elm1);
        supprimer_event(elm2);
        if (tour === 1) {
            compteurj1 += 1;
        } else {
            compteurj2 += 1;
            gere_ordi();
        }
        changer_joueur();
    }
}


function changer_joueur() {
    var j1img = document.getElementById("j1_avatar");
    var j1compt = document.getElementById("compteurj1");
    var j2img = document.getElementById("j2_avatar");
    var j2compt = document.getElementById("compteurj2");

    if (tour === 1) {
        j1img.style.opacity = 1;
        j1compt.style.animation = "zoom 1s ease infinite";
        j2img.style.opacity = 0.4;
        j1compt.style.opacity = 1;
        j2compt.style.opacity = 0.4;
        j2compt.style.animation = "none";
        j1compt.innerHTML = "Joueur 1 : " + compteurj1;
        j2compt.innerHTML = "Ordinateur : " + compteurj2;
    } else {
        j2img.style.opacity = 1;
        j2compt.style.animation = "zoom 1s ease infinite";
        j2compt.style.opacity = 1;
        j1img.style.opacity = 0.4;
        j1compt.style.animation = "none";
        j1compt.style.opacity = 0.4;
        j1compt.innerHTML = "Joueur 1 : " + compteurj1;
        j2compt.innerHTML = "Ordinateur : " + compteurj2;
    }

    if (compteurj1 + compteurj2 === 12) {
        fin_de_jeu();
    }
}

function fin_de_jeu() {
    var joueur1 = "Joueur 1 a été ejecté.";
    var joueur2 = "Le boss a été ejecté.";
    var egalite = "Les deux joueurs ont été éjectés.";
    var indice = 0;
    var perso = null;
    var perso1 = null;
    var perso2 = null;
    var x = null;

    var fin = document.getElementById("fin_de_jeu");


    document.querySelectorAll("div").forEach(function (element) {
        element.style.display = "none";
    });
    document.querySelectorAll("p").forEach(function (element) {
        element.style.display = "none";
    });
    document.querySelectorAll("img").forEach(function (element) {
        element.style.display = "none";
    });

    fin.style.display = "flex";



    if (compteurj1 > compteurj2) {
        perso = new Perso("../bigboss.png", 1);
        x = setInterval(function () {
            perso.update();
            if (perso.posX > 3000) {
                clearInterval(x);
            }
        }, 1000 / 60);

        setTimeout(function () {
            var inter = setInterval(function () {
                fin.innerHTML += joueur2[indice];
                indice += 1;
                if (indice === 21) {
                    clearInterval(inter);
                    indice = 0;
                    setTimeout(function () {
                        fin.style.opacity = 0;
                        setTimeout(function () {
                            document.getElementById("rejouer").style.display = "flex";
                            document.getElementById("rejouer").style.visibility = "visible";
                            document.getElementById("rejouer").addEventListener('click', function () {
                                board.reset();
                            }, false);
                        }, 1000);
                    }, 2000);
                }
            }, 100);
        }, 4000);

    } else {
        if (compteurj1 < compteurj2) {
            perso = new Perso(joueur1_img, 1);
            x = setInterval(function () {
                perso.update();
                if (perso.posX > 3000) {
                    clearInterval(x);
                }
            }, 1000 / 60);

            setTimeout(function () {
                var inter = setInterval(function () {
                    fin.innerHTML += joueur1[indice];
                    indice += 1;
                    if (indice === 22) {
                        clearInterval(inter);
                        indice = 0;
                        setTimeout(function () {
                            fin.style.opacity = 0;
                            setTimeout(function () {
                                document.getElementById("rejouer").style.display = "flex";
                                document.getElementById("rejouer").style.visibility = "visible";
                                document.getElementById("rejouer").addEventListener('click', function () {
                                    board.reset();
                                }, false);
                            }, 1000);
                        }, 2000);
                    }
                }, 100);
            }, 3000);
        } else {
            perso1 = new Perso(joueur1_img, 1);
            perso2 = new Perso("../bigboss.png", 2);
            x = setInterval(function () {
                perso1.update();
                perso2.update();
                if (perso1.posX > 3000) {
                    clearInterval(x);
                }
            }, 1000 / 60);

            setTimeout(function () {
                var inter = setInterval(function () {
                    fin.innerHTML += egalite[indice];
                    indice += 1;
                    if (indice === 33) {
                        clearInterval(inter);
                        indice = 0;
                        setTimeout(function () {
                            fin.style.opacity = 0;
                            setTimeout(function () {
                                document.getElementById("rejouer").style.display = "flex";
                                document.getElementById("rejouer").style.visibility = "visible";
                                document.getElementById("rejouer").addEventListener('click', function () {
                                    board.reset();
                                }, false);
                            }, 1000);
                        }, 2000);
                    }
                }, 100);
            }, 4000);
        }
    }
}




function bordure_in(event) {
    var targ = event.currentTarget;
    targ.style.border = "4px solid rgb(255, 76, 21)";
    targ.style.borderRadius = "20px";
}

function bordure_out(event) {
    var targ = event.currentTarget;
    targ.style.border = "4px solid rgb(255, 193, 21)";
    targ.style.borderRadius = "20px";
}




function bordure_in_choix(event) {
    var targ = event.currentTarget;
    var id_j = event.currentTarget.id.slice(1);
    targ.style.border = "4px solid rgb(21, 76, 255)";
    tmp_j1_img = document.createElement("img");
    tmp_j1_img.setAttribute('id', 'joueur1_img');
    tmp_j1_img.setAttribute('src', "../cards/img" + id_j + ".png");
    tmp_j1_img.setAttribute('alt', "j1_img");
    document.body.appendChild(tmp_j1_img);
}

function bordure_out_choix(event) {
    var targ = event.currentTarget;
    targ.style.border = "4px solid white";
    document.body.removeChild(tmp_j1_img);
}



function afficher_selection() {
    var cjoueur;
    var i;
    document.getElementsByClassName("memory-card")[0].style.visibility = "hidden";
    document.getElementById("selection").style.visibility = "visible";
    document.getElementById("selection").style.display = "";
    document.getElementById("choix").style.visibility = "visible";
    document.getElementById("choix").style.display = "";
    cjoueur = document.getElementsByClassName("cjoueur");
    for (i = 0; i < cjoueur.length; i += 1) {
        cjoueur[i].style.display = "";
        cjoueur[i].style.border = "4px solid white";
        cjoueur[i].style.opacity = "1";
        cjoueur[i].addEventListener('mouseover', bordure_in_choix, false);
        cjoueur[i].addEventListener('mouseout', bordure_out_choix, false);
        cjoueur[i].addEventListener('click', selection_avatar, false);
    }
}

function selection_avatar(event) {
    try {
        document.body.removeChild(document.getElementById("j1_avatar"));
        document.body.removeChild(document.getElementById("j2_avatar"));
        document.body.removeChild(document.getElementById("compteurj1"));
        document.body.removeChild(document.getElementById("compteurj2"));
        document.getElementById("fin_de_jeu").style = "";
    } catch {
        console.log("test");
    }
    joueur1_img = event.currentTarget.src;
    joueur1_img = joueur1_img.substring(joueur1_img.indexOf("img"));
    document.body.appendChild(tmp_j1_img);
    tout_supprimer();
    afficher_plateau();
}


function tout_supprimer() {
    document.getElementById("choix").style.visibility = "hidden";
    document.getElementById("selection").style.visibility = "hidden";
}

function afficher_plateau() {
    var cartes = document.getElementsByClassName("ligne");
    var img_cartes = document.getElementsByClassName("cartes");
    var i;

    for (i = 0; i < cartes.length; i += 1) {
        cartes[i].style.display = "";
    }

    for (i = 0; i < img_cartes.length; i += 1) {
        img_cartes[i].style.display = "";
    }


    document.getElementsByClassName("memory-card")[0].style.visibility = "visible";
    document.getElementsByClassName("memory-card")[0].style.display = "";
    afficher_avatar();
    afficher_compteurs();
}

function afficher_avatar() {
    var joueur1 = document.createElement("img");
    var joueur2 = document.createElement("img");

    joueur1.setAttribute('id', 'j1_avatar');
    joueur1.setAttribute('src', "../cards/" + joueur1_img);
    joueur1.setAttribute('alt', "j1");
    document.body.appendChild(joueur1);

    joueur2.setAttribute('id', 'j2_avatar');
    joueur2.setAttribute('src', "../bigboss.png");
    joueur2.setAttribute('alt', "j2");
    document.body.appendChild(joueur2);
    joueur2.style.opacity = 0.4;
}

function afficher_compteurs() {
    var compteurjoueur1 = document.createElement("p");
    var text = document.createTextNode("Joueur 1 : " + compteurj1);
    var compteurjoueur2 = document.createElement("p");
    compteurjoueur1.appendChild(text);
    compteurjoueur1.setAttribute('id', 'compteurj1');
    document.body.appendChild(compteurjoueur1);

    text = document.createTextNode("Ordinateur : " + compteurj2);
    compteurjoueur2.appendChild(text);
    compteurjoueur2.setAttribute('id', 'compteurj2');
    document.body.appendChild(compteurjoueur2);

    compteurjoueur1.style.animation = "zoom 1s ease infinite";
    compteurjoueur2.style.opacity = 0.4;
}




function Tile(id_paire) {
    this.x = 0;
    this.y = 0;
    this.id_paire = id_paire;
    this.isRevealed = false;
}

Tile.prototype.setCoord = function (x, y) {
    this.x = x;
    this.y = y;
};

Tile.prototype.display = function () {
    var div;
    if (this.isRevealed === false) {
        div = document.getElementById("l" + this.y);
        div.children[this.x].src = "../cards/dos.png";

    } else {
        div = document.getElementById("l" + this.y);
        div.children[this.x].src = id_img[this.id_paire];

    }
};

Tile.prototype.flipTile = function () {
    if (this.isRevealed) {
        this.isRevealed = false;
    } else {
        this.isRevealed = true;
    }
    this.display();
};

Tile.prototype.getElement = function () {
    var divi = document.getElementById("l" + this.y).childNodes;
    var imga = [];
    Object.keys(divi).forEach(function (key) {
        if (key % 2 === 1) {
            imga.push(divi[key]);
        }
    });
    return imga[this.x];
};




function Board() {
    var i;
    this.tiles = [];
    for (i = 1; i < 14; i += 1) {
        if (i === 13) {
            this.tiles.push(new Tile(i));
        } else {
            this.tiles.push(new Tile(i));
            this.tiles.push(new Tile(i));
        }
    }
}

Board.prototype.display = function () {
    this.tiles.forEach(function (element) {
        element.display();
    });
};

Board.prototype.reset = function () {
    var i;
    var j;
    tour = 1;
    compteurj1 = 0;
    compteurj2 = 0;
    joueur1_img = "";

    afficher_selection();
    document.getElementById("fin_de_jeu").innerHTML = "";

    id_img = generate_id_img();
    this.tiles = melanger_tableau(this.tiles);
    for (i = 0; i < 5; i += 1) {
        for (j = 0; j < 5; j += 1) {
            this.tiles[i * 5 + j].setCoord(j, i);
            if (this.tiles[i * 5 + j].isRevealed) {
                this.tiles[i * 5 + j].flipTile();
                this.tiles[i * 5 + j].getElement().style.border = "4px solid rgb(255, 193, 21)";
                this.tiles[i * 5 + j].getElement().style.opacity = 1;
            }
        }
    }
    board.display();
    document.querySelectorAll("img").forEach(function (element) {
        if (element.className === "cartes") {
            ajouter_event(element);
        }
    });
    tuile1 = undefined;
    tuile2 = undefined;
    document.getElementById("rejouer").style.visibility = "hidden";
};


//JEU



function main() {
    section = document.getElementById("perso_sec");
    section.height = window.innerHeight + "px";
    section.width = window.innerWidth + "px";

    board.reset();
    console.log(board.tiles);
    console.log(id_img);
}

window.onload = main;