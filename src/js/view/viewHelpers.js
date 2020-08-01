import { ICONS } from '../../img/icons/icons'

export function getIcon (fileName) {
  if(/\.html$/.test(fileName)) {
    return ICONS.html5Icon
  }
  if(/\.css$/.test(fileName)) {
    return ICONS.css3Icon
  }
  if(/\.js$/.test(fileName)) {
    return ICONS.jsIcon
  } else {
    return ICONS.fileDefaultIcon
  }
}

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

export function createIconsWrapper () {
  const self = document.querySelector('#root > ul > .self')
  const iconsWrapper = createEl( { tag:'div', classes:['iconsWrapper'], parentEl:self } )
  const fileIcon = createEl( { tag:'img', classes:['fileIcon'], parentEl:iconsWrapper, attributes:{ 'src':ICONS.fileIconLightIcon } } )
  const folderIcon = createEl( { tag:'img', classes:['folderIcon'], parentEl:iconsWrapper, attributes:{ 'src':ICONS.folderIconLight } } )
  const editIcon = createEl( { tag:'img', classes: ['editIcon'], parentEl:iconsWrapper, attributes:{ 'src':ICONS.editIcon }} )
  return iconsWrapper
}

export function creatFolder ( [ name, parentElem ] ) {
  const root = document.getElementById('root')
  const ul = createEl( { tag:'ul', classes:['folder'], parentEl:parentElem || root } )
  const self = createEl( { tag:'div', classes:['self'], parentEl:ul, attributes: { tabindex:'0' } } )
  const iconArrowWrapper = createEl( { tag:'div', classes:['iconArrowWrapper'], parentEl:self } )
  const iconArrow = createEl( { tag:'img', classes:['iconArrow'], parentEl:iconArrowWrapper, attributes:{ 'src': ICONS.arrowRightIcon} } )
  const iconimg = createEl( { tag:'img', parentEl:iconArrowWrapper, attributes: { src: ICONS.folderIcon } } )
  const span = createEl( { tag:'span', parentEl:iconArrowWrapper, content: name } )
  const content = createEl( { tag:'div', classes:['content'], parentEl:ul } )
  return ul
}

export function createFile ( [ name, parentElem ] ) {
  const li = createEl( { tag:'li', classes:['file'], parentEl:parentElem, attributes: { tabindex:'0' } } )
  const iconimg = createEl( { tag:'img', parentEl:li, attributes: { src: getIcon(name)} } )
  const span = createEl( { tag:'span', parentEl:li, content: name } )
  return li
}

export function createInput ( parentElement, divClassName, InputClassName ) {
  const root = document.getElementById('root')
  const inputNameDiv = createEl( { tag:"div", parentEl: parentElement || root, classes:['inputNameDiv', divClassName] } )
  const form = createEl( { tag:'form', parentEl:inputNameDiv } )
  const inputName = createEl( { tag:'input', parentEl:form, classes: ['inputNameInput', InputClassName], attributes: { 'autofocus': true } } )
  return inputName
}

export function findParent (el) {
  const attrClass = el.getAttribute('class')
  if (attrClass === 'folder') {
    if(el.parentElement.getAttribute('id') === 'root') {
      return { currentThis:el, className:attrClass, name:el.children[0].children[0].children[2].textContent, bindEl:el }
    } else {
      return { currentThis:el.children[1], className:attrClass, name:el.children[0].children[0].children[2].textContent, bindEl:el }
    }
  }
  if(attrClass === 'file') {
    if(el.parentElement.getAttribute('class') === 'folder') {
      return { currentThis:el.parentElement.children[1], className:attrClass, name:el.children[1].textContent, bindEl:el }
    } else {
      return { currentThis:el.parentElement, className:attrClass, name:el.children[1].textContent, bindEl:el }
    }
  }
  if(attrClass === 'fileIcon' ||  attrClass === 'folderIcon') {
    return { currentThis:el.parentElement.parentElement.parentElement.children[1], className:attrClass }
  } else {
    return findParent (el.parentElement)
  }
}