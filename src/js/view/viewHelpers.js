import { ICONS } from '../../img/icons/icons';

export function getIcon(fileName) {
  if (/\.html$/.test(fileName)) {
    return ICONS.html5Icon;
  }
  if (/\.css$/.test(fileName)) {
    return ICONS.css3Icon;
  }
  if (/\.js$/.test(fileName)) {
    return ICONS.jsIcon;
  }
  return ICONS.fileDefaultIcon;
}

export function createEl({
  tag, parentEl, classes, attributes, content,
}) {
  const el = document.createElement(tag);
  if (classes) {
    classes.forEach((name) => el.classList.add(name));
  }
  if (attributes) {
    Object.entries(attributes).forEach((name) => {
      el.setAttribute(name[0], name[1]);
    });
  }
  if (content) { el.textContent = content; }
  if (parentEl) { parentEl.appendChild(el); }
  return el;
}

export function createProjectButton() {
  const root = document.getElementById('root');
  const createFolderWrapper = createEl({ tag: 'div', classes: ['createFolderWrapper'], parentEl: root });
  const text = createEl({ tag: 'div', classes: ['createFolderText'], parentEl: createFolderWrapper });
  createEl({ tag: 'span', parentEl: text, content: 'You have not yet created folder.' });
  const createFolder = createEl({ tag: 'div', classes: ['createFolder'], parentEl: createFolderWrapper });
  createEl({ tag: 'span', parentEl: createFolder, content: 'Create Project' });
  return createFolder;
}

export function createIconsWrapper() {
  const self = document.querySelector('#root > ul > .self');
  const iconsWrapper = createEl({ tag: 'div', classes: ['iconsWrapper'], parentEl: self });
  const fileIcon = createEl({
    tag: 'img', classes: ['fileIcon'], parentEl: iconsWrapper, attributes: { src: ICONS.fileIconLightIcon },
  });
  const folderIcon = createEl({
    tag: 'img', classes: ['folderIcon'], parentEl: iconsWrapper, attributes: { src: ICONS.folderIconLightIcon },
  });
  const editIcon = createEl({
    tag: 'img', classes: ['editIcon'], parentEl: iconsWrapper, attributes: { src: ICONS.editIcon },
  });
  const deletion = createEl({
    tag: 'img', classes: ['deleteIcon'], parentEl: iconsWrapper, attributes: { src: ICONS.trashIcon },
  });
  return iconsWrapper;
}

export function creatFolder([name, parentElem]) {
  const root = document.getElementById('root');
  const ul = createEl({ tag: 'ul', classes: ['folder'], parentEl: parentElem || root });
  const self = createEl({
    tag: 'div', classes: ['self'], parentEl: ul, attributes: { tabindex: '0' },
  });
  const iconArrowWrapper = createEl({ tag: 'div', classes: ['iconArrowWrapper'], parentEl: self });
  const iconArrow = createEl({
    tag: 'img', classes: ['iconArrow'], parentEl: iconArrowWrapper, attributes: { src: ICONS.expandArrowIcon },
  });
  if (parentElem) {
    createEl({ tag: 'img', parentEl: iconArrowWrapper, attributes: { src: ICONS.folderOpenIcon } });
  }
  const span = createEl({ tag: 'span', parentEl: iconArrowWrapper, content: name });
  const content = createEl({ tag: 'div', classes: ['content'], parentEl: ul });
  return ul;
}

export function createFile([name, parentElem, id]) {
  const li = createEl({
    tag: 'li', classes: ['file'], parentEl: parentElem, attributes: { tabindex: '0', 'data-id': id },
  });
  const iconimg = createEl({ tag: 'img', parentEl: li, attributes: { src: getIcon(name) } });
  const span = createEl({ tag: 'span', parentEl: li, content: name });
  return li;
}

export function createInput(parentElement, divClassName, InputClassName) {
  const root = document.getElementById('root');
  const inputNameDiv = createEl({ tag: 'div', parentEl: parentElement || root, classes: ['inputNameDiv', divClassName] });
  const form = createEl({ tag: 'form', parentEl: inputNameDiv });
  const inputName = createEl({
    tag: 'input', parentEl: form, classes: ['inputNameInput', InputClassName], attributes: { type: 'text', required: 'true' },
  });
  return inputName;
}

export function findParent(el) {
  const attrClass = el.getAttribute('class');
  if (attrClass === 'folder') {
    if (el.parentElement.getAttribute('id') === 'root') {
      return {
        currentThis: el, className: attrClass, name: el.children[0].children[0].children[1].textContent, bindEl: el,
      };
    }
    return {
      currentThis: el.children[1], className: attrClass, name: el.children[0].children[0].children[2].textContent, bindEl: el,
    };
  }
  if (attrClass === 'file') {
    if (el.parentElement.getAttribute('class') === 'folder') {
      return {
        currentThis: el.parentElement.children[1], className: attrClass, name: el.children[1].textContent, bindEl: el,
      };
    }
    return {
      currentThis: el.parentElement, className: attrClass, name: el.children[1].textContent, bindEl: el,
    };
  }
  if (attrClass === 'fileIcon' || attrClass === 'folderIcon') {
    return { currentThis: el.parentElement.parentElement.parentElement.children[1], className: attrClass };
  }
  return findParent(el.parentElement);
}

export function findParentInTab(el) {
  const attrClass = el.classList.contains('listFile');
  if (attrClass) { return el; }
  return findParentInTab(el.parentElement);
}

export function createListItem(name, id) {
  const parentElem = document.querySelector('.filesList');
  const li = createEl({
    tag: 'li', classes: ['listFile'], parentEl: parentElem, attributes: { 'data-id': id },
  });
  const ext = createEl({ tag: 'img', parentEl: li, attributes: { src: getIcon(name) } });
  const span = createEl({ tag: 'span', parentEl: li, content: name });
  const close = createEl({
    tag: 'img', parentEl: li, classes: ['petqiVrov'], attributes: { src: ICONS.closeIcon },
  });
  return li;
}

export function createTextArea() {
  const fileCode = document.querySelector('.fileCode');
  const form = createEl({ tag: 'form', parentEl: fileCode });
  const textArea = createEl({ tag: 'textarea', classes: ['textArea'], parentEl: form });
  return textArea;
}
