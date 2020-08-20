export default class Model {
  constructor() {
    this.project = null;
  }

  init() {
    this.createFolderButton();
  }

  bindOnCreateFolderButton(cb) {
    this.createFolderButton = cb;
  }
}
