export default class Model {
	constructor() {
		this.project = null;
	}

	init() {
		this.addCreateProjectButton();
	}

	bindAddCreateProjectButton = (cb) => {
		this.addCreateProjectButton = cb;
	};
}
