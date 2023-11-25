import stylesItem from "./Item.css"

export enum Attribute {
    "user" = "user",
    "color" = "color",
    "letter" = "letter",
}

class Item extends HTMLElement{
    
    user?: string
	color?: number
    letter?: number
   
    static get observedAttributes(){
        const attrs: Record<Attribute,null> = {
            user: null,
            color: null,
            letter: null,
        }
        return Object.keys(attrs);
    }
    
    attributeChangedCallback(propName:Attribute,oldValue: string | undefined,newValue: string | undefined){
        switch(propName){
            
        }
        this.render();
    }
    
    
    constructor(){
        super();
        this.attachShadow({mode: "open"});
    }
    
    connectedCallback(){
        this.render();
        
    }
    
    render(){
        if(this.shadowRoot){
            this.shadowRoot.innerHTML = `
            <style>${stylesItem}</style>
            <section>
            <h3> ${this.user}</h3>
            <p>${this.color}</p>
            <p>${this.letter}</p>
            </section>
            `
        }
    }
}

customElements.define("my-item", Item);
export default Item;