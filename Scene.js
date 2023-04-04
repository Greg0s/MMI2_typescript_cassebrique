"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Scene = (function (_super) {
    __extends(Scene, _super);
    function Scene(balise) {
        var _this = _super.call(this, balise) || this;
        _this.setDimension(640, 480);
        _this.setX((window.innerWidth - _this.getLargeur()) / 2);
        _this.setY((window.innerHeight - _this.getHauteur()) / 2);
        return _this;
    }
    Scene.prototype.demarrer = function () {
        this.nbBriques_ = 0;
        var zone = new Sprite(document.getElementById("zone"));
        zone.setXY(10, 10);
        zone.setDimension(this.getLargeur() - 20, this.getHauteur() - 20);
        this.balle_ = new Balle(document.createElement("img"), this);
        this.balle_.setImage("balle.png", 32, 32);
        this.ajouter(this.balle_);
        this.balle_.setXY(320 - 16, 240 - 16);
        this.balle_.setLimites(zone);
        this.balle_.setXY(this.balle_.xmax_, this.balle_.ymax_);
        this.balle_.vx_ = Math.random() * 4 - 2;
        this.balle_.vy_ = -2;
        this.balle_.animer();
        this.palet_ = new Palet(document.createElement("img"));
        this.palet_.setImage("palet.png", 128, 12);
        this.ajouter(this.palet_);
        this.palet_.setLimites(zone);
        this.palet_.setX(zone.getX() + zone.getLargeur() / 2 - this.palet_.getLargeur() / 2);
        this.palet_.setY(zone.getY() + zone.getHauteur() - 48);
        this.palet_.animer();
        var nbLigne = 5;
        var nbColonne = 7;
        var sx = zone.getLargeur() / (nbColonne + 1);
        var sy = zone.getHauteur() / 2 / (nbLigne + 1);
        this.briques_ = new Array();
        var n = 0;
        for (var i = 0; i < nbLigne; i++) {
            for (var j = 0; j < nbColonne; j++) {
                var b = new Sprite(document.createElement("img"));
                b.setImage("brique.png", 64, 32);
                this.ajouter(b);
                b.setX(zone.getX() + (j + 1) * sx - b.getLargeur() / 2);
                b.setY(zone.getY() + (i + 1) * sy - b.getHauteur() / 2);
                this.briques_[n] = b;
                n++;
            }
        }
        this.score_ = new Sprite(document.createElement("div"));
        this.score_.getBalise().innerHTML = "Briques détruites = " + this.nbBriques_;
        this.score_.getBalise().id = "score";
        this.ajouter(this.score_);
        this.score_.setXY(0, -40);
    };
    Scene.prototype.arreter = function () {
        this.palet_.figer();
        this.balle_.figer();
        alert("Redémarrer ?");
        this.retirer(this.balle_);
        for (var i = 0; i < this.briques_.length; i++) {
            this.retirer(this.briques_[i]);
        }
        this.retirer(this.palet_);
        this.retirer(this.score_);
        this.demarrer();
    };
    return Scene;
}(Sprite));
