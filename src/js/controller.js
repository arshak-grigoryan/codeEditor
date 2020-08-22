import '../css/index.css';
import Model from './model/model';
import View from './view/view';

class Controller {
	constructor(model, view) {
		this.model = model;
		this.view = view;

		this.model.bindAddCreateProjectButton(this.view.addCreateProjectButton);

		this.view.bindOnCreateFolderInModel((value) =>
			this.createFolderInModel(value),
		);

		this.model.init();
	}

	createFolderInModel(value) {
		this.model.addProject(value);
	}
}

const app = new Controller(new Model(), new View());
