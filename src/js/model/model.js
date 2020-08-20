import Folder from './folder';

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

  addProject(folderName) {
    const folder = new Folder({ name: folderName });
    this.project = folder;
    // console.log(this.project)
  }
}
