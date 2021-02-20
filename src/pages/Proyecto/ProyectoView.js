class ProyectoView {
    constructor(parent){
        this.Parent = parent;
        this.Data = parent.Data;
        this.Logic = parent.Logic;
    }

    getHeader(){
        return  <div class='header'>
                    <button onClick={/*rout to home*/} id='homeButton'>HOME</button>
                    <p id='headerPSA'>PSA</p>
                </div>
    }
}