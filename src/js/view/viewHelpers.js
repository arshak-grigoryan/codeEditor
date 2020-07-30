import { ICONS } from '../../img/icons/icons'

export function createEl( { tag, parentEl, classes, attributes, content } ) {
  const el = document.createElement(tag)
  if(classes) {
    for (const val of classes) {
      el.classList.add(val)
    }
  }
  if(attributes) {
    for (const name in attributes) {
      el.setAttribute(name, attributes[name])
    }
  }
  if(content) { el.textContent = content }
  if(parentEl) { parentEl.appendChild(el) }
  return el
}

export function creatFolder (folderName) {
  const root = document.getElementById('root')
  const ul = createEl( { tag:'ul', classes:['folder'], parentEl:root } )
  const self = createEl( { tag:'div', classes:['self'], parentEl:ul } )
  const iconimg = createEl( { tag:'img', parentEl:self, attributes: { src: ICONS.folderIcon } } )
  // const i = createEl( { tag:'i', classes:['far', 'fa-folder'], parentEl:self } )
  const span = createEl( { tag:'span', parentEl:self, content: folderName } )
  const content = createEl( { tag:'div', classes:['content'], parentEl:ul } )
  return ul
}

export function createInput () {
  const root = document.getElementById('root')
  const createFolderWrapper = document.querySelector('.createFolderWrapper')
  createFolderWrapper.remove()
  const inputNameDiv = createEl( { tag:"div", parentEl:root, classes:['inputNameDiv'] } )
  const form = createEl( { tag:'form', parentEl:inputNameDiv } )
  const inputName = createEl( { tag:'input', parentEl:form, classes: ['inputNameInput'], attributes: { 'autofocus': true } } )
  return inputName
}