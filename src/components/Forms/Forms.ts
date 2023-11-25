import firebase from "../../utils/firebase";
import events from "../../utils/events";
import styles from "./Forms.css"

const forms = {
    user: " ",
	color: " ",
    letter: " ",
}



export default class Forms extends HTMLElement {

	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	connectedCallback() {
		this.render();

		const button = this.shadowRoot?.querySelector('button');
		button?.addEventListener('click', this.continue)

		const user = this.shadowRoot?.querySelector('.user');
		user?.addEventListener('change', this.changeUser)

		const color = this.shadowRoot?.querySelector('.color');
		color?.addEventListener('change', this.changeColor)

		const letter = this.shadowRoot?.querySelector('.letter');
		letter?.addEventListener('change', this.changeLetter);

	}

	changeUser(e: any){
        forms.user = e.target.value;
    }

	changeColor(e: any){
        forms.color = e.target.value;
    }

	changeLetter(e: any){
        forms.letter = e.target.value;
    }


	continue(){
		firebase.addPost(forms)
		console.log(forms)
		events.dispatchEvent(new Event('uploadData'));
	}

	render() {
		if (this.shadowRoot)
			this.shadowRoot.innerHTML = `<style>${styles}</style>
		    <section>
			<input type="text" class="user" placeholder="user">
			<input type="text" class="color" placeholder="color">
            <input type="text" class="letter" placeholder="letter">
			<button>Continue</button>
			</section>
        `;

		
	}
}

customElements.define('my-forms', Forms);