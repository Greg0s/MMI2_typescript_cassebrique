class Palet extends Sprite{
    //attrbuts de palet
    public xmin_ : number;
    public xmax_ : number;
    
    //constructeur
    public constructor(balise:HTMLElement){
        super(balise);
        this.xmin_ = 0;
        this.xmax_ = 0;
    }

    //attribution des limites
    public setLimites(zone : Sprite){
        this.xmin_ = zone.getX();
        this.xmax_ = zone.getX() + zone.getLargeur() - this.getLargeur();
    }

    //méthode permettant au palet de suivre la souris tout en restant dans ses limites

    public suivre(e : MouseEvent){
        let x : number = e.clientX - this.getParent().getX() - this.getLargeur()/2;
        if(x < this.xmin_){
            x=this.xmin_;
        }
        else if(x > this.xmax_){
            x=this.xmax_;
        }
        this.setX(x);
    }

    public actionSuivre_ : any;

    //détection du déplacement de la souris

    public animer(){
        this.actionSuivre_ = (e : MouseEvent) => { this.suivre(e);};

        window.addEventListener("mousemove",this.actionSuivre_);
    }

    //arrêt du déplacement du palet

    public figer(){
        window.removeEventListener("mousemove",this.actionSuivre_);
    }


}