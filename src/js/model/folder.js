export default class Folder {
  constructor({ name, content = {} }) {
    this.self = {
      name,
      type: 'folder',
    };
    this.content = content;
  }
}
