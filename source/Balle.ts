class Balle extends Sprite{
    //Question 1c

    public xmin_ : number;
    public ymin_ : number;
    public xmax_ : number;
    public ymax_ : number;
    public vx_ : number;
    public vy_ : number;
    public bouge_ : boolean;

    public scene_ : Scene;

    public constructor(balise:HTMLElement, scene : Scene){
        super(balise);
        this.xmin_ = 0;
        this.ymin_ = 0;
        this.xmax_ = 0;
        this.ymax_ = 0;
        this.scene_ = scene;
        this.bouge_ = false;
    }

    //Question 1d - définit les limites de la zone 
    public setLimites(zone : Sprite){
        this.xmin_ = zone.getX();
        this.xmax_ = zone.getX() + zone.getLargeur() - this.getLargeur();
        this.ymin_ = zone.getY();
        this.ymax_ = zone.getY() + zone.getHauteur() - this.getHauteur();
    }

    //Question 2a - méthode de déplacement de la balle 

    public bouger(bouge : boolean){
        if(bouge){
            //déplacement sans entrave
            let x : number = this.getX() + this.vx_;
            let y : number = this.getY() + this.vy_;

            //Ajouts question 2c - rebond sur un bord de la zone 
                if(y <= this.ymin_){ //bord haut
                    y=this.ymin_;
                    this.vy_=-this.vy_;
                }
                if(y >= this.ymax_){ //bord bas > perdu
                    /*y=this.ymax_;
                    this.vy_=-this.vy_;*/
                    this.scene_.arreter();
                }
                if(x <= this.xmin_){ //bord gauche
                    x=this.xmin_;
                    this.vx_=-this.vx_;
                }
                if(x >= this.xmax_){ //bord droit
                    x=this.xmax_;
                    this.vx_=-this.vx_;
                }
            //Fin ajouts 2c

            //Ajouts question 4c - rebond sur le palet 
            if(Sprite.collision(this.getCercle(),this.scene_.palet_.getRectangle())){
                y = this.scene_.palet_.getY() - this.getHauteur();
                this.vy_ = -this.vy_;

                let v : number = Math.sqrt(this.vx_*this.vx_ + this.vy_*this.vy_);

                console.log("v ="+v);

                //changement de la direction du rebond en fonction de l'endroit où rebondit la balle
                let bx = this.scene_.balle_.getCentreX();
                let px = this.scene_.palet_.getCentreX();

                //accéleration de la vitesse dans la limite de 8 pixels / image
                if(v<8){
                    //this.vx_ = 1.1*this.vx_;
                    this.vx_ = 1.5*(bx - px)*2/this.scene_.palet_.getLargeur();
                    this.vy_ = 1.1*this.vy_;
                }
            }
            //Fin ajouts 4c

            //Ajouts question 5b - test si balle touche brique

            let briques : Array<Sprite> = this.scene_.briques_;
            let touche : boolean = false;

            for(let k : number = 0; k<briques.length && !touche; k++){
                if(briques[k]!=null && Sprite.collision(this.getCercle(),briques[k].getRectangle())){
                    //cas où collision > rebond et suppression de la briques
                    this.vy_ = -this.vy_;
                    this.scene_.retirer(briques[k]);
                    briques[k]=null;
                    touche=true;
                    //augmentation du score
                    this.scene_.nbBriques_++;
                    //vérification si joueur a gagné
                    if(this.scene_.nbBriques_==35){
                        this.scene_.arreter();
                    }
                    
                }
            }

            this.setXY(x,y);
        }
        else{
            let x = this.scene_.palet_.getCentreX() - this.scene_.balle_.getLargeur()/2;
            let y = this.scene_.palet_.getCentreY() - this.scene_.balle_.getHauteur() - 6;
            this.setXY(x,y);
        }
        this.scene_.score_.getBalise().innerHTML = "Briques détruites = "+this.scene_.nbBriques_;
    }

    //Question 2b - Animation de la balle 

    public timerAnimation_ : number;
    public actionClic_: any;

    public animer(){
        //
        this.timerAnimation_ = setInterval( 
            //syntaxe d'une action
            () => { this.bouger(this.bouge_); }
            //
            , 1000/120);
        //Détection du clic et action 
        this.actionClic_ = (e : MouseEvent) => { this.bouge_=true;};

        window.addEventListener("mousedown",this.actionClic_);
    }

    //méthode arrétant l'animation de la balle

    public figer(){
        clearInterval(this.timerAnimation_);
    }
}