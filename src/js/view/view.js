import { createEl } from './viewHelpers'

export default class View {
    constructor () {
        this.app = document.getElementById('app')
        this.root = document.getElementById('root')
    }   


    addCreateButton () {
        const createFolderWrapper = createEl( { tag: 'div', className: 'createFolderWrapper', parentEl: this.root } )
        const createFolder = createEl( { tag: 'div', className: 'createFolder', parentEl: createFolderWrapper } )
        createEl( { tag: 'span', parentEl: createFolder, content: 'Create Folder' } )
        createFolder.addEventListener('click', () => this.firstFolder())
    }

    firstFolder () {
        const createFolderWrapper = document.querySelector('.createFolderWrapper')
        createFolderWrapper.remove()
        const firstFolderDiv = createEl( { tag:"div", parentEl:this.root, className:'firstFolderDiv' } )
        const form = createEl( { tag:'form', parentEl:firstFolderDiv } )
        const inputName = createEl( { tag:'input', parentEl:form, className: 'firstFolderInput' } )
        inputName.addEventListener("keydown", e => {
            if(e.keyCode === 13) { 
              this.getInputValue(e.target.value)
              event.preventDefault()
            }
          })
    }

    getInputValue (value) {
        
    }
    // bindOnFirstFolder (cb) {
    //     this.fisrtFolder = cb
    // }
}
