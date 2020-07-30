import { createEl, createInput, creatFolder } from './viewHelpers'

export default class View {
    constructor () {
        this.app = document.getElementById('app')
        this.root = document.getElementById('root')
    }   


    addCreateProjectButton () {
        const createFolderWrapper = createEl( { tag: 'div', classes: ['createFolderWrapper'], parentEl: this.root } )
        const createFolder = createEl( { tag: 'div', classes: ['createFolder'], parentEl: createFolderWrapper } )
        createEl( { tag: 'span', parentEl: createFolder, content: 'Create Project' } )
        createFolder.addEventListener('click', () => this.addProjectFolder())
    }

    addProjectFolder () {
        const inputName = createInput()
        inputName.addEventListener("keydown", e => {
            if(e.keyCode === 13) { 
                event.preventDefault()
                const name = e.target.value
                creatFolder(name)
                this.createFolderInModel(name)
                inputName.parentElement.parentElement.remove()
            }
          })
        
    }

    addFolder () {

    }

    bindOnCreateFolderInModel (cb) {
        this.createFolderInModel = cb
    }
}
