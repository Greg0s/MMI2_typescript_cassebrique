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
var Palet = (function (_super) {
    __extends(Palet, _super);
    function Palet(balise) {
        var _this = _super.call(this, balise) || this;
        _this.xmin_ = 0;
        _this.xmax_ = 0;
        return _this;
    }
    Palet.prototype.setLimites = function (zone) {
        this.xmin_ = zone.getX();
        this.xmax_ = zone.getX() + zone.getLargeur() - this.getLargeur();
    };
    Palet.prototype.suivre = function (e) {
        var x = e.clientX - this.getParent().getX() - this.getLargeur() / 2;
        if (x < this.xmin_) {
            x = this.xmin_;
        }
        else if (x > this.xmax_) {
            x = this.xmax_;
        }
        this.setX(x);
    };
    Palet.prototype.animer = function () {
        var _this = this;
        this.actionSuivre_ = function (e) { _this.suivre(e); };
        window.addEventListener("mousemove", this.actionSuivre_);
    };
    Palet.prototype.figer = function () {
        window.removeEventListener("mousemove", this.actionSuivre_);
    };
    return Palet;
}(Sprite));
