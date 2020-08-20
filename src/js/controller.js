import '../css/index.css';
import Model from './model/model';
import View from './view/view';

class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.model.bindOnCreateFolderButton(() => this.createFolderButton());

    this.view.bindOnCreateFolderInModel((value) => this.createFolderInModel(value));

    this.model.init();
  }

  createFolderButton() {
    this.view.addCreateProjectButton();
  }

  createFolderInModel(value) {
    this.model.addProject(value);
  }
}

const app = new Controller(new Model(), new View());
