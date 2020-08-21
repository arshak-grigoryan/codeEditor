import {
  createEl,
  createProjectButton,
  createInput,
  creatFolder,
  createIconsWrapper,
  createFile,
  findParent,
  findParentInTab,
  getIcon,
  createListItem,
  createTextArea,
} from './viewHelpers';
import { ICONS } from '../../img/icons/icons';

export default class View {
  constructor() {
    this.app = document.getElementById('app');
    this.isProjectNow = false;
    this.last2ClickedElements = [];
    this.lastClickedFileOrFolder = null;
    this.uniqueId = 0;
    this.lastClickedListInTab = null;
    this.isTabActive = false;
    this.filesList = [];
    this.last2ClickedTabElements = [];
    this.codeAreaData = {};
  }

  addCreateProjectButton = () => {
    const createFolder = createProjectButton();
    createFolder.addEventListener('click', () => this.addItem());
  }

  addItem(parentEl, className) {
    // if parentEl is projectFolder, reassign to it content
    const projectFolder = document.querySelector('#root > ul');
    if (parentEl && parentEl === projectFolder) {
      parentEl = projectFolder.children[1];
    }

    if (!this.isProjectNow) { document.querySelector('.createFolderWrapper').remove(); }

    const inputName = createInput(parentEl);
    inputName.focus();
    inputName.addEventListener('keydown', (e) => {
      e.target.style.border = '2px solid var(--buttonHoverColor)';
      if (e.keyCode === 13) {
        if (e.target.value === '') {
          e.target.style.border = '2px solid red';
          return;
        }
        event.preventDefault();
        if (className === 'folderIcon' || !this.isProjectNow) {
          const ul = creatFolder([e.target.value, parentEl]);

          ul.addEventListener('click', (e) => this.folderClick(e));

          const expandArrow = ul.children[0].children[0].children[0];

          expandArrow.addEventListener('click', (e) => this.expandContent(e.target, ul));

          if (!this.isProjectNow) {
            const iconsWrapper = createIconsWrapper();

            const fileIcon = iconsWrapper.children[0].addEventListener('click', (e) => this.fileIconClick(e));

            const folderIcon = iconsWrapper.children[1].addEventListener('click', (e) => this.folderIconClick(e));

            const editIcon = iconsWrapper.children[2].addEventListener('click', (e) => this.editIconClick(e));

            const deleteIcon = iconsWrapper.children[3].addEventListener('click', (e) => this.deleteIconClick(e));

            this.isProjectNow = true;
          }
        }
        if (className === 'fileIcon') {
          const id = ++this.uniqueId;

          const li = createFile([e.target.value, parentEl, id]);

          li.addEventListener('click', (e) => this.fileClick(e));

          this.fileClick(li);
        }
        inputName.parentElement.parentElement.remove();
      }
    });
  }

    editIconClick = (e) => {
      if (this.isInputNow()) { return; }

      if (e.target.getAttribute('class') === 'inputNameInput') { return undefined; }

      const { currentThis, className, name } = findParent(e.target);

      if (currentThis && (className === 'folder' || className === 'file' || className === 'fileIcon' || className === 'folderIcon')) {
        this.last2ClickedElements.push(currentThis);
      }

      if (this.last2ClickedElements.length > 2) {
        this.last2ClickedElements.shift();
      }
      if (this.lastClickedFileOrFolder && this.lastClickedFileOrFolder.getAttribute('class') === 'folder') {
        const thisElemName = this.lastClickedFileOrFolder.children[0].children[0].children[2].textContent;
        this.lastClickedFileOrFolder.children[0].children[0].children[2].remove();
        const inputName = createInput(this.lastClickedFileOrFolder.children[0].children[0], 'editDiv', 'editInput');
        inputName.value = thisElemName;
        // inputName.focus()   bug error

        inputName.addEventListener('keydown', (e) => {
          if (e.keyCode === 13) {
            event.preventDefault();
            const name = e.target.value;
            const span = createEl({ tag: 'span', parentEl: this.lastClickedFileOrFolder.children[0].children[0], content: name });
            inputName.parentElement.parentElement.remove();
          }
        });
      }
      if (this.lastClickedFileOrFolder && this.lastClickedFileOrFolder.getAttribute('class') === 'file') {
        const thisElemName = this.lastClickedFileOrFolder.children[1].textContent;
        this.lastClickedFileOrFolder.children[1].remove();
        const inputName = createInput(this.lastClickedFileOrFolder, 'editDiv', 'editInput');
        inputName.value = thisElemName;
        // inputName.focus() bug error
        inputName.addEventListener('keydown', (e) => {
          if (e.keyCode === 13) {
            event.preventDefault();
            const name = e.target.value;
            this.lastClickedFileOrFolder.children[0].remove();
            const iconimg = createEl({ tag: 'img', parentEl: this.lastClickedFileOrFolder, attributes: { src: getIcon(name) } });
            const span = createEl({ tag: 'span', parentEl: this.lastClickedFileOrFolder, content: name });

            const { id } = this.lastClickedFileOrFolder.dataset;
            const filesList = document.querySelectorAll('.listFile');
            filesList.forEach((el) => {
              if (id === el.dataset.id) {
                el.children[0].src = getIcon(name);
                el.children[1].textContent = name;
              }
            });

            inputName.parentElement.parentElement.remove();
          }
        });
      }
    }

    isFileExcist = (id) => {
      const filesList = [...document.querySelector('.filesList').children];
      const ids = [];
      filesList.forEach((val) => {
        ids.push(val.dataset.id);
      });
      return ids.some((val) => val === id);
    }

    fileClick = (e) => { // e can be event or this li(file in explorer) element
      let name; let
        id;
      if (e instanceof MouseEvent) {
        const { bindEl } = findParent(e.target);
        name = bindEl.children[1].textContent;
        id = bindEl.dataset.id;
        if (!this.isFileExcist(id)) {
          const file = createListItem(name, id);
          file.addEventListener('click', (e) => this.autoOpen(e));
          file.children[2].addEventListener('click', (e) => this.closeItem(e.target));
          this.autoOpen(file);
        } else {
          const filesList = document.querySelectorAll('.listFile');
          filesList.forEach((el) => {
            if (id === el.dataset.id) {
              this.autoOpen(el);
            }
          });
        }
      } else {
        name = e.children[1].textContent;
        id = e.dataset.id;
        if (!this.isFileExcist(id)) {
          const file = createListItem(name, id);
          file.addEventListener('click', (e) => this.autoOpen(e));
          file.children[2].addEventListener('click', (e) => this.closeItem(e.target));
          this.autoOpen(file);
        }
      }
    }

    autoOpen = (e) => { // e can be event or this li(file in tabs menu) element
      if (e instanceof MouseEvent) {
        if (e.target.classList.contains('petqiVrov')) { return; }
        const li = findParentInTab(e.target);
        this.lastClickedListInTab.classList.remove('activeTab');
        this.lastClickedListInTab = li;
        li.classList.add('activeTab');

        const { id } = li.dataset;
        const textArea = document.querySelector('.fileCode .textArea');
        textArea.value = this.codeAreaData[`${id}`];
        textArea.focus();
      } else {
        // here e is a li
        if (this.isTabActive) {
          this.lastClickedListInTab.classList.remove('activeTab');
          this.lastClickedListInTab = e;
          e.classList.add('activeTab');

          const textArea = document.querySelector('.fileCode .textArea');
          // textArea.focus() cause bug error inputname can't be focuses
          const { id } = e.dataset;
          if (typeof this.codeAreaData[`${id}`] === 'string') {
            textArea.value = this.codeAreaData[`${id}`];
          } else {
            this.codeAreaData[`${id}`] = '';
            textArea.value = this.codeAreaData[`${id}`];
          }
        } else {
          this.last2ClickedTabElements.push(e);
          this.lastClickedListInTab = e;
          this.lastClickedListInTab.classList.add('activeTab');
          this.isTabActive = true;

          const { id } = e.dataset;
          this.codeAreaData[`${id}`] = '';

          const textArea = createTextArea();
          textArea.focus();
          textArea.addEventListener('change', (e) => this.codeAutoSave(e));
        }
      }
    }

    codeAutoSave = (e) => {
      const activeTab = document.querySelector('.activeTab');
      this.codeAreaData[`${activeTab.dataset.id}`] = e.target.value;
      // console.log(this.codeAreaData)
    }

    closeItem = (target) => {
      const next = target.parentElement.nextElementSibling;
      const previous = target.parentElement.previousElementSibling;
      target.parentElement.remove();
      const tabsCollection = document.querySelectorAll('.listFile');
      if (tabsCollection.length === 0) {
        this.isTabActive = false;
        this.lastClickedListInTab = null;
        document.querySelector('.fileCode form').remove();
      } else if (next) {
        this.autoOpen(next);
      } else if (previous) {
        this.autoOpen(previous);
      }
    }

    folderClick = (e) => {
      const projectFolder = document.querySelector('#root > ul');
      if (document.querySelector('#root > ul').classList.contains('petqiVrov2')) {
        this.folderNestedFilesDelete(projectFolder); // this is focus this deletion works after closeItem function on project folder click this does not be here but it is that for historical reasons
        this.isProjectNow = false;
        this.last2ClickedElements = [];
        this.lastClickedFileOrFolder = null;
        this.uniqueId = 0;
        this.lastClickedListInTab = null;
        this.isTabActive = false;
        this.filesList = [];
        this.last2ClickedTabElements = [];
        this.codeAreaData = {};
        this.addCreateProjectButton();
        return;
      }

      if (e.target.getAttribute('class') === 'inputNameInput') { return; }

      const {
        currentThis, className, name, bindEl,
      } = findParent(e.target);

      if (className === 'folder' || className === 'file') { this.lastClickedFileOrFolder = bindEl; }

      if (currentThis && (className === 'folder' || className === 'file' || className === 'fileIcon' || className === 'folderIcon')) {
        this.last2ClickedElements.push(currentThis);
      }

      if (this.last2ClickedElements.length > 2) {
        this.last2ClickedElements.shift();
      }
    }

    deleteIconClick = (e) => {
      const projectFolder = document.querySelector('#root > .folder');
      if (this.lastClickedFileOrFolder === projectFolder || this.lastClickedFileOrFolder === undefined) {
        projectFolder.classList.add('petqiVrov2');
        // this.folderNestedFilesDelete(projectFolder)
        return;
      }
      const { currentThis, className } = findParent(e.target);
      if (currentThis !== this.lastClickedFileOrFolder && className === 'folder' && !this.lastClickedFileOrFolder.classList.contains('file')) {
        this.folderNestedFilesDelete(this.lastClickedFileOrFolder);
      } else if (this.lastClickedFileOrFolder.classList.contains('file')) {
        const { id } = this.lastClickedFileOrFolder.dataset;
        this.lastClickedFileOrFolder.remove(); // bug error for projectfolder
        const filesList = document.querySelectorAll('.listFile');
        filesList.forEach((el) => {
          if (id === el.dataset.id) {
            this.closeItem(el.children[2]);
            // this.codeAreaData[`${id}`] also can be deleted
          }
        });
      }
    }

    folderNestedFilesDelete = (folder) => {
      // console.log(folder)
      folder.classList.add('thisFolder');
      const allNestedFiles = document.querySelectorAll('.thisFolder li');
      const allNestedFilesIds = [];
      allNestedFiles.forEach((el) => {
        allNestedFilesIds.push(el.dataset.id);
      });
      const filesListInTab = document.querySelectorAll('.filesList > li');
      allNestedFilesIds.forEach((val) => {
        filesListInTab.forEach((el) => {
          if (val === el.dataset.id) {
            this.closeItem(el.children[2]);
          }
        });
      });
      folder.remove();
    }

    expandContent = (arrowIcon, thisFolder) => {
      const content = thisFolder.children[1];
      const folderIcon = thisFolder.children[0].children[0].children[1];

      if (content.style.display !== 'none') {
        arrowIcon.style.transform = 'rotate(-90deg)';
        content.style.display = 'none';
        folderIcon.src = ICONS.folderIcon;
      } else {
        arrowIcon.style.transform = 'rotate(0deg)';
        content.style.display = 'block';
        folderIcon.src = ICONS.folderOpenIcon;
      }
    }

    autoExpandContent = () => {
      const projectFolder = document.querySelector('#root > ul');
      const thisFolder = this.last2ClickedElements[0];

      if (projectFolder === thisFolder) {
        projectFolder.children[0].children[0].children[0].style.transform = 'rotate(0deg)';
        projectFolder.children[1].style.display = 'block';
        projectFolder.children[0].children[0].children[1].src = ICONS.folderOpenIcon;
      } else {
        thisFolder.parentElement.children[0].children[0].children[0].style.transform = 'rotate(0deg)';
        thisFolder.parentElement.children[1].style.display = 'block';
        thisFolder.parentElement.children[0].children[0].children[1].src = ICONS.folderOpenIcon;
      }
    }

    fileIconClick = (e) => {
      if (this.isInputNow()) { return; }

      if (e.target.getAttribute('class') === 'inputNameInput') { return; }

      const {
        currentThis, className, name, bindEl,
      } = findParent(e.target);

      if (currentThis && (className === 'folder' || className === 'file' || className === 'fileIcon' || className === 'folderIcon')) {
        this.last2ClickedElements.push(currentThis);
      }

      if (this.last2ClickedElements.length > 2) {
        this.last2ClickedElements.shift();
      }

      // at first expand this folder content and after it add input area
      this.autoExpandContent();

      this.addItem(this.last2ClickedElements[0], className);
    }

    folderIconClick = (e) => {
      if (this.isInputNow()) { return; }

      if (e.target.getAttribute('class') === 'inputNameInput') { return; }

      const { currentThis, className } = findParent(e.target);

      if (currentThis && (className === 'folder' || className === 'file' || className === 'fileIcon' || className === 'folderIcon')) {
        this.last2ClickedElements.push(currentThis);
      }

      if (this.last2ClickedElements.length > 2) {
        this.last2ClickedElements.shift();
      }

      // at first expand this folder content and after it add input area
      this.autoExpandContent();

      this.addItem(this.last2ClickedElements[0], className);
    }

    isInputNow = () => {
      const input = document.querySelectorAll('#root input');
      if (input.length !== 0) {
        return true;
      }
    }

    bindOnCreateFolderInModel(cb) {
      this.createFolderInModel = cb;
    }
}
