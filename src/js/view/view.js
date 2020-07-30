import { createEl, createInput, creatFolder, createIconsWrapper, addId } from './viewHelpers'

export default class View {
    constructor () {
        this.app = document.getElementById('app')
        this.root = document.getElementById('root')
        this.isProjectNow = false
        this.projectNowHelper = false
        this.last2ClickedElements = []
    }   


    addCreateProjectButton () {
        const createFolderWrapper = createEl( { tag: 'div', classes: ['createFolderWrapper'], parentEl: this.root } )
        const createFolder = createEl( { tag: 'div', classes: ['createFolder'], parentEl: createFolderWrapper } )
        createEl( { tag: 'span', parentEl: createFolder, content: 'Create Project Folder' } )
        createFolder.addEventListener('click', () => this.addProjectFolder())
    }

    addProjectFolder () {
        const inputName = createInput()
        inputName.addEventListener("keydown", e => {
            if(e.keyCode === 13) { 
                event.preventDefault()
                let name = e.target.value
                if( !this.isProjectNow ) {
                    name = name.toUpperCase() // uppercase only project folder name
                    this.isProjectNow = true
                }

                creatFolder( [name ], this.projectNowHelper )
                const iconsWrapper = createIconsWrapper(this.projectNowHelper)
                const fileIcon = iconsWrapper.children[0].addEventListener('click', e => {
                    
                })
                const folderIcon = iconsWrapper.children[1].addEventListener('click', e => {
                    console.log(e)
                })

                this.projectNowHelper = true // true is this.projectNow, after first time if statement execution this.project always will be true
                this.createFolderInModel(name, )
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
