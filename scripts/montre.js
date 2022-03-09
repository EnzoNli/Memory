var id_img = {};
var board = new Board();
var tuile1 = undefined;
var tuile2 = undefined;
var clickable = true;
var compteur = 0;
var perte = 0;
var win = 0;
var temps = 0;
var coups = 0;
var classement_coups = [];
var classement_temps = [];



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


function testCouple(t1, t2) {
    var elm1;
    var elm2;
    coups += 1;
    if (t1.id_paire !== t2.id_paire) {
        clickable = false;
        setTimeout(function () {
            if (perte === 0) {
                t1.flipTile();
                t2.flipTile();
                ajouter_event(t1.getElement());
                ajouter_event(t2.getElement());
                t1.getElement().style.border = "4px solid rgb(255, 193, 21)";
                t2.getElement().style.border = "4px solid rgb(255, 193, 21)";
            }
            clickable = true;
        }, 1000);

    } else {
        elm1 = t1.getElement();
        elm2 = t2.getElement();

        elm1.style.border = "black";
        elm2.style.border = "black";

        supprimer_event(elm1);
        supprimer_event(elm2);

        compteur += 1;
        if (compteur === 12) {
            gagne();
        }
    }
}

function affiche_classement() {
    var tableau_coups = document.getElementById("tbod_coups");
    var tableau_tps = document.getElementById("tbod_tps");
    var ligne;
    var coup;
    var name;
    var badge;
    var tps;
    var minutes;
    var seconds;
    var i;
    document.getElementsByClassName("memory-card")[0].style.visibility = "hidden";
    document.getElementById("classement_coups").style.visibility = "visible";
    document.getElementById("classement_tps").style.visibility = "visible";
    document.getElementById("rejouer_classement").style.visibility = "visible";
    document.getElementById("rejouer_classement").addEventListener('click', function () {
        board.reset();
    }, false);
    for (i = 0; i < classement_coups.length; i += 1) {
        ligne = document.createElement("tr");
        name = document.createElement("td");
        name.innerHTML = classement_coups[i][1];
        if (i === 0) {
            badge = document.createElement("img");
            badge.setAttribute("class", "places");
            badge.setAttribute("src", "../first.png");
            badge.setAttribute("alt", "Premier");
            name.appendChild(badge, name.firstChild);
            ligne.appendChild(name);
        } else {
            if (i === 1) {
                badge = document.createElement("img");
                badge.setAttribute("class", "places");
                badge.setAttribute("src", "../second.png");
                name.appendChild(badge, name.firstChild);
                ligne.appendChild(name);
            } else {
                if (i === 2) {
                    badge = document.createElement("img");
                    badge.setAttribute("class", "places");
                    badge.setAttribute("src", "../third.png");
                    name.appendChild(badge, name.firstChild);
                    ligne.appendChild(name);
                } else {
                    ligne.appendChild(name);
                }
            }
        }
        coup = document.createElement("td");
        coup.textContent = classement_coups[i][0];
        ligne.appendChild(coup);
        tableau_coups.appendChild(ligne);
    }


    for (i = 0; i < classement_temps.length; i += 1) {
        ligne = document.createElement("tr");
        name = document.createElement("td");
        name.innerHTML = classement_temps[i][1];
        if (i === 0) {
            badge = document.createElement("img");
            badge.setAttribute("class", "places");
            badge.setAttribute("src", "../first.png");
            badge.setAttribute("alt", "Premier");
            name.appendChild(badge, name.firstChild);
            ligne.appendChild(name);
        } else {
            if (i === 1) {
                badge = document.createElement("img");
                badge.setAttribute("class", "places");
                badge.setAttribute("src", "../second.png");
                name.appendChild(badge, name.firstChild);
                ligne.appendChild(name);
            } else {
                if (i === 2) {
                    badge = document.createElement("img");
                    badge.setAttribute("class", "places");
                    badge.setAttribute("src", "../third.png");
                    name.appendChild(badge, name.firstChild);
                    ligne.appendChild(name);
                } else {
                    ligne.appendChild(name);
                }
            }
        }

        tps = document.createElement("td");

        minutes = parseInt(classement_temps[i][0] / 60, 10);
        seconds = parseInt(classement_temps[i][0] % 60, 10);

        if (minutes < 10) {
            minutes = "0" + minutes;
        }

        if (seconds < 10) {
            seconds = "0" + seconds;
        }

        tps.textContent = minutes + ":" + seconds;
        ligne.appendChild(tps);
        tableau_tps.appendChild(ligne);
    }
}

function gere_classement(event) {
    var nom;
    var element = event.currentTarget;
    if (event.code === "Enter") {
        nom = element.value;
        element.style.visibility = "hidden";
        document.getElementById("gagne").style.visibility = "hidden";


        if (document.cookie === "") {
            document.cookie = [];
        } else {
            classement_coups = JSON.parse(document.cookie);
            classement_temps = classement_coups[1];
            classement_coups = classement_coups[0];
        }



        classement_coups.push([coups, nom]);
        classement_coups.sort(function (a, b) {
            return a[0] - b[0];
        });

        if (classement_coups.length > 5) {
            classement_coups.pop();
        }



        classement_temps.push([120 - temps, nom]);
        classement_temps.sort(function (a, b) {
            return a[0] - b[0];
        });

        if (classement_temps.length > 5) {
            classement_temps.pop();
        }


        document.cookie = JSON.stringify([classement_coups, classement_temps]);
        affiche_classement();

    }
}

function gagne() {
    var i;
    win = 1;
    document.querySelectorAll("img").forEach(function (element) {
        if (element.className === "cartes") {
            supprimer_event(element);
            element.style.border = "4px solid rgb(255, 193, 21)";
        }
    });
    for (i = 0; i < board.tiles.length; i += 1) {
        if (board.tiles[i].isRevealed === false) {
            board.tiles[i].flipTile();
        }
        if (board.tiles[i].id_paire === 13) {
            board.tiles[i].getElement().style.border = "4px solid rgb(21, 255, 138)";
        }
    }

    document.getElementById("gagne").style.visibility = "visible";
    document.getElementById("name").style.visibility = "visible";
    document.getElementById("name").addEventListener("keyup", gere_classement, false);

}




function perdu() {
    board.tiles.forEach(function (element) {
        supprimer_event(element.getElement());
        element.getElement().style.border = "4px solid rgb(131, 131, 131)";
        element.getElement().style.opacity = 0.7;
        if (element.isRevealed === false) {
            element.flipTile();
        }
        if (element.id_paire === 13) {
            element.getElement().style.border = "4px solid rgb(21, 255, 138)";
        }
    });
    document.getElementById("perdu").style.visibility = "visible";
    document.getElementById("rejouer").style.visibility = "visible";
    document.getElementById("rejouer").addEventListener('click', function () {
        board.reset();
    }, false);
    perte = 1;
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
    perte = 0;
    win = 0;
    temps = 0;
    coups = 0;
    board.display();
    document.querySelectorAll("img").forEach(function (element) {
        if (element.className === "cartes") {
            ajouter_event(element);
        }
    });
    startTimer(60 * 2, document.getElementById("timer"));
    compteur = 0;
    tuile1 = undefined;
    tuile2 = undefined;
    document.getElementById("perdu").style.visibility = "hidden";
    document.getElementById("rejouer").style.visibility = "hidden";
    document.getElementById("rejouer_classement").style.visibility = "hidden";
    document.getElementById("classement_tps").style.visibility = "hidden";
    document.getElementById("classement_coups").style.visibility = "hidden";
    document.getElementsByClassName("memory-card")[0].style.visibility = "visible";
    document.getElementById("name").setAttribute("placeholder", "Entrez votre nom");
    document.getElementById('tbod_coups').innerHTML = '';
    document.getElementById('tbod_tps').innerHTML = '';
};


//JEU

function startTimer(duration, display) {
    var timer = duration;
    var minutes;
    var seconds;
    var x;
    display.style.animation = "color-change 120s";
    x = setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        if (minutes < 10) {
            minutes = "0" + minutes;
        }

        if (seconds < 10) {
            seconds = "0" + seconds;
        }

        display.textContent = minutes + ":" + seconds;
        if (win === 1) {
            clearInterval(x);
            temps = timer;
        }
        if (timer === 30) {
            display.style.animation += ", cligno 1s step-start infinite";
        }
        timer -= 1;
        if (timer + 1 < 0) {
            document.getElementById("timer").style.animation = '';
            perdu();
            clearInterval(x);
        }
    }, 1000);
}




function main() {
    board.reset();
    console.log(board.tiles);
    console.log(id_img);

}

window.onload = main;