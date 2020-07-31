import { ICONS } from '../../img/icons/icons'

function getIcon (fileName) {
  console.log('fileName', fileName)
  console.log(fileName === /\.js$/)
  if(/\.html$/.test(fileName)) {
    const ext = fileName.slice(fileName.length-5, fileName.length)
    if(ext) {
      return ICONS.html5Icon
    }
  }
  if(/\.css$/.test(fileName)) {
    const ext = fileName.slice(fileName.length-4, fileName.length)
    if(ext) {
      return ICONS.css3Icon
    }
  }
  if(/\.js$/.test(fileName)) {
    const ext = fileName.slice(fileName.length-3, fileName.length)
    if(ext) {
      return ICONS.jsIcon
    }
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
  return iconsWrapper
}

export function creatFolder ( [ name, parentElem ] ) {
  const root = document.getElementById('root')
  const ul = createEl( { tag:'ul', classes:['folder'], parentEl:parentElem || root, attributes: { parentId: addId() } } )
  const self = createEl( { tag:'div', classes:['self'], parentEl:ul, attributes: { tabindex:'0' } } )
  const iconArrowWrapper = createEl( { tag:'div', classes:['iconArrowWrapper'], parentEl:self } )
  const iconArrow = createEl( { tag:'img', classes:['iconArrow'], parentEl:iconArrowWrapper, attributes:{ 'src': ICONS.arrowRightIcon} } )
  const iconimg = createEl( { tag:'img', parentEl:self, attributes: { src: ICONS.folderIcon } } )
  const span = createEl( { tag:'span', parentEl:self, content: name } )
  const content = createEl( { tag:'div', classes:['content'], parentEl:ul } )
  return ul
}

export function createFile ( [ name, parentElem ] ) {
  const li = createEl( { tag:'li', classes:['file'], parentEl:parentElem, attributes: { tabindex:'0' } } )
  const iconimg = createEl( { tag:'img', parentEl:li, attributes: { src: getIcon(name)} } )
  const span = createEl( { tag:'span', parentEl:li, content: name } )
  return li
}

export function createInput ( parentElement ) {
  const root = document.getElementById('root')
  const inputNameDiv = createEl( { tag:"div", parentEl: parentElement || root, classes:['inputNameDiv'] } )
  const form = createEl( { tag:'form', parentEl:inputNameDiv } )
  const inputName = createEl( { tag:'input', parentEl:form, classes: ['inputNameInput'], attributes: { 'autofocus': true } } )
  return inputName
}


const IDs = [0];
let maxId = Math.max.apply(null, IDs)
export function addId () {
  maxId += 1;
  IDs.push(maxId)
  return maxId;
}

// export function nameChecker (name) {

// }

export function findParent (el) {
  const attrClass = el.getAttribute('class')
  if (attrClass === 'folder' || attrClass === 'file') {
    console.log('000', el, el.children[0].children[2])
    return { currentThis:el, className:attrClass, name:el.children[0].children[2].textContent }
  }
  if(attrClass === 'fileIcon' ||  attrClass === 'folderIcon') {
    return { currentThis:el.parentElement.parentElement.parentElement.children[1], className:attrClass }
  } else {
    return findParent (el.parentElement)
  }
}

