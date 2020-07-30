import { createEl, creatFolder } from './viewHelpers'

export default class View {
    constructor () {
        this.app = document.getElementById('app')
        this.root = document.getElementById('root')
    }   


    addCreateProjectButton () {
        const createFolderWrapper = createEl( { tag: 'div', classes: ['createFolderWrapper'], parentEl: this.root } )
        const createFolder = createEl( { tag: 'div', classes: ['createFolder'], parentEl: createFolderWrapper } )
        createEl( { tag: 'span', parentEl: createFolder, content: 'Create Folder' } )
        createFolder.addEventListener('click', () => this.addProjectFolder())
    }

    addProjectFolder () {
        const createFolderWrapper = document.querySelector('.createFolderWrapper')
        createFolderWrapper.remove()
        const firstFolderDiv = createEl( { tag:"div", parentEl:this.root, classes:['firstFolderDiv'] } )
        const form = createEl( { tag:'form', parentEl:firstFolderDiv } )
        const inputName = createEl( { tag:'input', parentEl:form, classes: ['firstFolderInput'], attributes: { 'autofocus': true } } )
        inputName.addEventListener("keydown", e => {
            if(e.keyCode === 13) { 
                event.preventDefault()
                const name = e.target.value
                creatFolder(name)
                this.createFolderInModel(name)
            }
          })
    }

    addFolder () {

    }

    bindOnCreateFolderInModel (cb) {
        this.createFolderInModel = cb
    }
}
