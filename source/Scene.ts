//==================================================================================================
// ANIMATION AVEC TYPESCRIPT                                                               Scene.ts
//==================================================================================================

// Classe  S c e n e //-----------------------------------------------------------------------------
class Scene extends Sprite {
 //----------------------------------------------------------------------------------------Attributs
 /* Attributs de la scene. */

 //Question 4a
 public balle_ : Balle;
 public palet_ : Palet;
 public briques_ : Array<Sprite>;
 public nbBriques_ : number;
 public score_ : Sprite;

 //-------------------------------------------------------------------------------------Constructeur
 public constructor(balise : HTMLElement) {
  super(balise);
  this.setDimension(640,480);
  this.setX((window.innerWidth - this.getLargeur()) / 2);
  this.setY((window.innerHeight - this.getHauteur()) / 2);
 }

 //-----------------------------------------------------------------------------------------demarrer
 public demarrer() {
  /*Question 1a
  let balle : Sprite = new Sprite(document.createElement("img"));

  balle.setImage("balle.png",32,32);
  this.ajouter(balle);
  balle.setXY(320-16,240-16);
  */

  this.nbBriques_ = 0;

  //Question 1b - Création de la zone
  let zone : Sprite = new Sprite(document.getElementById("zone"));

  zone.setXY(10,10);
  zone.setDimension(this.getLargeur()-20,this.getHauteur()-20);

  //Question 1c - Création de la balle
  this.balle_ = new Balle(document.createElement("img"), this);
   
  this.balle_.setImage("balle.png",32,32);
  this.ajouter(this.balle_);
  this.balle_.setXY(320-16,240-16);

  //Question 1d - Calcul des limites de la balle
  this.balle_.setLimites(zone);
  this.balle_.setXY(this.balle_.xmax_,this.balle_.ymax_);

  //Question 2b - Animation de la balle
  this.balle_.vx_ = Math.random()*4-2;
  this.balle_.vy_=-2;
  this.balle_.animer();

  //setTimeout( () => { balle.figer(); }, 2000);

  //Question 3a - Création du palet
  this.palet_ = new Palet(document.createElement("img"));
  
  this.palet_.setImage("palet.png",128,12);
  this.ajouter(this.palet_);

  this.palet_.setLimites(zone);
  
  this.palet_.setX(zone.getX() + zone.getLargeur()/2 - this.palet_.getLargeur()/2);
  this.palet_.setY(zone.getY() + zone.getHauteur() - 48);
  
  //Question 3b - Animation du palet
  
  this.palet_.animer();

  //setTimeout(() => { palet.figer(); }, 5000);

  //Question 5a - Création et positionnement des briques
  let nbLigne : number = 5;
  let nbColonne : number = 7;

  let sx : number = zone.getLargeur() / (nbColonne + 1);
  let sy : number = zone.getHauteur()/2 / (nbLigne + 1);

  this.briques_ = new Array<Sprite>();
  let n : number = 0;

  for (let i : number = 0; i<nbLigne; i++){
    for(let j : number = 0; j<nbColonne; j++){
      let b : Sprite = new Sprite(document.createElement("img"));

      b.setImage("brique.png",64,32);
      this.ajouter(b);
      b.setX(zone.getX() + (j+1)*sx - b.getLargeur()/2);
      b.setY(zone.getY() + (i+1)*sy - b.getHauteur()/2);
      this.briques_[n] = b;
      n++;
    }
  }

  //affichage du score
  this.score_ = new Sprite(document.createElement("div"));
  this.score_.getBalise().innerHTML = "Briques détruites = "+this.nbBriques_;
  this.score_.getBalise().id="score";
  this.ajouter(this.score_);
  this.score_.setXY(0,-40);

 }


 //------------------------------------------------------------------------------------------arreter
 public arreter() {
  /* Code qui termine la scene. */
  //on fige palet et balle
  this.palet_.figer();
  this.balle_.figer();
  //message de fin
  alert("Redémarrer ?");
  //suppression de la balle, des briques, du palet, du score
  this.retirer(this.balle_);
  for(let i : number =0; i<this.briques_.length; i++){
    this.retirer(this.briques_[i]);
  }
  this.retirer(this.palet_);
  this.retirer(this.score_);
  this.demarrer();
 }
}

// Fin //-------------------------------------------------------------------------------------------
