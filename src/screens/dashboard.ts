import Forms from "../components/Forms/Forms";
import  Item, { Attribute } from "../components/Item/Item";
import firebase from "../utils/firebase";
import events from "../utils/events";
import { serverTimestamp } from "firebase/firestore";
import styles from "./dashboard.css"

export default class Dashboard extends HTMLElement {

	items: Item[] = []

	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	async connectedCallback() {
		const postData = await firebase.getPost()
        
        postData.forEach(async (post: any) => {
            const newpost = this.ownerDocument.createElement("my-item") as Item;
            newpost.setAttribute(Attribute.user, post.user);
            newpost.setAttribute(Attribute.color, post.color);
			newpost.setAttribute(Attribute.letter, post.letter)
            this.items.push(newpost);
        })

		this.render();

		events.addEventListener('uploadData', async () => {
		const postData = await firebase.getPost()

		this.items = [ ]
        
        postData.forEach(async (post: any) => {
            const newpost = this.ownerDocument.createElement("my-item") as Item;
            newpost.setAttribute(Attribute.user, post.user);
            newpost.setAttribute(Attribute.color, post.color);
			newpost.setAttribute(Attribute.letter, post.letter)
            this.items.push(newpost);
        })

		this.render();
	})
		
	}

	render() {
		if (this.shadowRoot) this.shadowRoot.innerHTML = `<style>${styles}</style>`;

		const all = this.ownerDocument.createElement('section');
		all.classList.add('all')
        this.shadowRoot?.appendChild(all)

		const forms = this.ownerDocument.createElement('my-forms');
        all.appendChild(forms)

		const section = this.ownerDocument.createElement('section');
		all.appendChild(section);

		this.items.forEach((item) => {
			section.appendChild(item)
		})

	}
}

customElements.define('app-dashboard', Dashboard);