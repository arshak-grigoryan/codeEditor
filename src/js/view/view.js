import { 
    createEl, 
    createInput, 
    creatFolder, 
    createIconsWrapper, 
    createFile, 
    findParent, 
    getIcon } from './viewHelpers'

export default class View {
    constructor () {
        this.app = document.getElementById('app')
        this.root = document.getElementById('root')
        this.isProjectNow = false
        this.last2ClickedElements = []
        this.lastClickedFileOrFolder
    }   


    addCreateProjectButton () {
        const createFolderWrapper = createEl( { tag: 'div', classes: ['createFolderWrapper'], parentEl: this.root } )
        const createFolder = createEl( { tag: 'div', classes: ['createFolder'], parentEl: createFolderWrapper } )
        createEl( { tag: 'span', parentEl: createFolder, content: 'Create Project' } )
        createFolder.addEventListener('click', () => this.addItem())
    }

    addItem (parentElement, className) {
        
        if( !this.isProjectNow ) { document.querySelector('.createFolderWrapper').remove() }

        const inputName = createInput( parentElement )

        inputName.addEventListener('keydown', e => {

            if(e.keyCode === 13) { 
                event.preventDefault()

                if(className === 'folderIcon' || !this.isProjectNow) {

                    const ul = creatFolder( [ e.target.value, parentElement ] )

                    ul.addEventListener('click', e => this.folderClick(e))

                    if( !this.isProjectNow ) {

                        const iconsWrapper = createIconsWrapper()

                        const fileIcon = iconsWrapper.children[0].addEventListener('click', e => this.fileIconClick(e))

                        const folderIcon = iconsWrapper.children[1].addEventListener('click', e => this.folderIconClick(e))
                        
                        const editIcon = iconsWrapper.children[2].addEventListener('click', e => this.editIconClick(e))

                        this.isProjectNow = true
                    }
                }
                if(className === 'fileIcon') {
                    const li = createFile( [ e.target.value, parentElement ] )
                }
                inputName.parentElement.parentElement.remove()
            }
        })
    }
    
    editIconClick = e => {
        if (e.target.getAttribute('class') === 'inputNameInput') { return undefined }

        const { currentThis, className, name} = findParent(e.target)

        if( currentThis && (className === 'folder' || className === 'file' || className === 'fileIcon' || className === 'folderIcon') ) {
            this.last2ClickedElements.push(currentThis)
        }  

        if(this.last2ClickedElements.length > 2) {
            this.last2ClickedElements.shift()
        } 

        if(this.lastClickedFileOrFolder && this.lastClickedFileOrFolder.getAttribute('class') === 'folder') {
            const thisElemName = this.lastClickedFileOrFolder.children[0].children[0].children[2].textContent
            console.log(thisElemName)
            this.lastClickedFileOrFolder.children[0].children[0].children[2].remove()
            const inputName = createInput( this.lastClickedFileOrFolder.children[0].children[0], 'editDiv', 'editInput'  )
            inputName.value = thisElemName
            console.log(inputName)
            inputName.addEventListener('keydown', e => {
                if(e.keyCode === 13) { 
                    event.preventDefault()
                    let name = e.target.value
                    const span = createEl( { tag: 'span', parentEl:this.lastClickedFileOrFolder.children[0].children[0], content:name } )
                    inputName.parentElement.parentElement.remove()
                }
            })                                
        }
        if(this.lastClickedFileOrFolder.getAttribute('class') === 'file') {            
            const thisElemName = this.lastClickedFileOrFolder.children[1].textContent
            console.log(thisElemName)
            this.lastClickedFileOrFolder.children[1].remove()
            const inputName = createInput( this.lastClickedFileOrFolder, 'editDiv', 'editInput'  )
            inputName.value = thisElemName
            console.log(inputName)
            inputName.addEventListener('keydown', e => {
                if(e.keyCode === 13) { 
                    event.preventDefault()
                    let name = e.target.value
                    this.lastClickedFileOrFolder.children[0].remove()
                    const iconimg = createEl( { tag:'img', parentEl:this.lastClickedFileOrFolder, attributes: { src: getIcon(name)} } )
                    const span = createEl( { tag: 'span', parentEl:this.lastClickedFileOrFolder, content:name } )
                    inputName.parentElement.parentElement.remove()
                }
            })    
        }
    }

    folderClick = e => {
        if (e.target.getAttribute('class') === 'inputNameInput') { return }

        const { currentThis, className, name, bindEl} = findParent(e.target)

        if(className === 'folder' || className === 'file') { this.lastClickedFileOrFolder = bindEl }

        if( currentThis && (className === 'folder' || className === 'file' || className === 'fileIcon' || className === 'folderIcon') ) {
            this.last2ClickedElements.push(currentThis)
        }   

        if(this.last2ClickedElements.length > 2) {
            this.last2ClickedElements.shift()
        }
    }

    fileIconClick = e => {
        if (e.target.getAttribute('class') === 'inputNameInput') { return }

        const { currentThis, className, name, bindEl} = findParent(e.target)

        if( currentThis && (className === 'folder' || className === 'file' || className === 'fileIcon' || className === 'folderIcon') ) {
            this.last2ClickedElements.push(currentThis)
        } 

        if(this.last2ClickedElements.length > 2) {
            this.last2ClickedElements.shift()
        } 

        this.addItem(this.last2ClickedElements[0], className)
    }

    folderIconClick = e => {
        if (e.target.getAttribute('class') === 'inputNameInput') { return }

        const { currentThis, className } = findParent(e.target)

        if( currentThis && (className === 'folder' || className === 'file' || className === 'fileIcon' || className === 'folderIcon') ) {
            this.last2ClickedElements.push(currentThis)
        }  

        if(this.last2ClickedElements.length > 2) {
            this.last2ClickedElements.shift()
        } 

        this.addItem(this.last2ClickedElements[0], className)
    }

    bindOnCreateFolderInModel (cb) {
        this.createFolderInModel = cb
    }
}
