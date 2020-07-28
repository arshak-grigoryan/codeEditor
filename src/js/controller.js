import '../css/index.css'
import Model from './model/model'
import View  from './view/view'


class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.model.bindOnModelFirstTimeCreateFolder( () => this.firstTimeCreateFolder())

    // this.model.bindOnFirstFolder( () => this.firstFolder())

    this.model.init();
  }
  
  firstTimeCreateFolder () {
    this.view.addCreateButton()
  }
}

const app = new Controller(new Model(), new View());