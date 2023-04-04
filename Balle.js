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
var Balle = (function (_super) {
    __extends(Balle, _super);
    function Balle(balise, scene) {
        var _this = _super.call(this, balise) || this;
        _this.xmin_ = 0;
        _this.ymin_ = 0;
        _this.xmax_ = 0;
        _this.ymax_ = 0;
        _this.scene_ = scene;
        _this.bouge_ = false;
        return _this;
    }
    Balle.prototype.setLimites = function (zone) {
        this.xmin_ = zone.getX();
        this.xmax_ = zone.getX() + zone.getLargeur() - this.getLargeur();
        this.ymin_ = zone.getY();
        this.ymax_ = zone.getY() + zone.getHauteur() - this.getHauteur();
    };
    Balle.prototype.bouger = function (bouge) {
        if (bouge) {
            var x = this.getX() + this.vx_;
            var y = this.getY() + this.vy_;
            if (y <= this.ymin_) {
                y = this.ymin_;
                this.vy_ = -this.vy_;
            }
            if (y >= this.ymax_) {
                this.scene_.arreter();
            }
            if (x <= this.xmin_) {
                x = this.xmin_;
                this.vx_ = -this.vx_;
            }
            if (x >= this.xmax_) {
                x = this.xmax_;
                this.vx_ = -this.vx_;
            }
            if (Sprite.collision(this.getCercle(), this.scene_.palet_.getRectangle())) {
                y = this.scene_.palet_.getY() - this.getHauteur();
                this.vy_ = -this.vy_;
                var v = Math.sqrt(this.vx_ * this.vx_ + this.vy_ * this.vy_);
                console.log("v =" + v);
                var bx = this.scene_.balle_.getCentreX();
                var px = this.scene_.palet_.getCentreX();
                if (v < 8) {
                    this.vx_ = 1.5 * (bx - px) * 2 / this.scene_.palet_.getLargeur();
                    this.vy_ = 1.1 * this.vy_;
                }
            }
            var briques = this.scene_.briques_;
            var touche = false;
            for (var k = 0; k < briques.length && !touche; k++) {
                if (briques[k] != null && Sprite.collision(this.getCercle(), briques[k].getRectangle())) {
                    this.vy_ = -this.vy_;
                    this.scene_.retirer(briques[k]);
                    briques[k] = null;
                    touche = true;
                    this.scene_.nbBriques_++;
                    if (this.scene_.nbBriques_ == 35) {
                        this.scene_.arreter();
                    }
                }
            }
            this.setXY(x, y);
        }
        else {
            var x = this.scene_.palet_.getCentreX() - this.scene_.balle_.getLargeur() / 2;
            var y = this.scene_.palet_.getCentreY() - this.scene_.balle_.getHauteur() - 6;
            this.setXY(x, y);
        }
        this.scene_.score_.getBalise().innerHTML = "Briques détruites = " + this.scene_.nbBriques_;
    };
    Balle.prototype.animer = function () {
        var _this = this;
        this.timerAnimation_ = setInterval(function () { _this.bouger(_this.bouge_); }, 1000 / 120);
        this.actionClic_ = function (e) { _this.bouge_ = true; };
        window.addEventListener("mousedown", this.actionClic_);
    };
    Balle.prototype.figer = function () {
        clearInterval(this.timerAnimation_);
    };
    return Balle;
}(Sprite));
