import { createEl, createInput, creatFolder, createIconsWrapper, createFile, findParent } from './viewHelpers'

export default class View {
    constructor () {
        this.app = document.getElementById('app')
        this.root = document.getElementById('root')
        this.isProjectNow = false
        this.last2ClickedElements = []
        this.lastClickedFile = []
        this.lastClickedFolder = []
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
                        
                        // const editIcon = iconsWrapper.children[2].addEventListener('click', e => this.editIconClick(e))

                        this.isProjectNow = true
                    }
                }
                if(className === 'fileIcon') {
                    const li = createFile( [ name, parentElement ] )
                }
                inputName.parentElement.parentElement.remove()
            }
        })
    }
    
    editIconClick = e => {
        if (e.target.getAttribute('class') === 'inputNameInput') {
            return undefined
        }
        const { currentThis, className, name} = findParent(e.target)
        // console.log(name)
        if( currentThis && (className === 'folder' || className === 'file' || className === 'fileIcon' || className === 'folderIcon') ) {
            this.last2ClickedElements.push(currentThis)
        }  
        if(this.last2ClickedElements.length > 2) {
            this.last2ClickedElements.shift()
        } 
        if(this.last2ClickedElements[0].parentElement.getAttribute('class') === 'folder') {
            const thisElemName = this.last2ClickedElements[0].parentElement.children[0].children[2].textContent
            console.log(thisElemName)
            this.last2ClickedElements[0].parentElement.children[0].children[2].remove()
            const inputName = createInput( this.last2ClickedElements[0].parentElement.children[0], 'editDiv', 'editInput'  )
            inputName.value = thisElemName
            console.log(inputName)
            inputName.addEventListener('keydown', e => {
                if(e.keyCode === 13) { 
                    event.preventDefault()
                    let name = e.target.value
                    const span = createEl( { tag: 'span', parentEl:this.last2ClickedElements[0].parentElement.children[0], content:name } )
                    inputName.parentElement.parentElement.remove()
                }
            })                                
        }
        // console.log('folder', this.lastClickedFolder[0])
        // if(this.lastClickedFolder[0].getAttribute('class') === 'folder') {
        //     const thisElemName = this.lastClickedFolder[0].children[0].children[2].textContent
        //     console.log(thisElemName)
        //     this.lastClickedFolder[0].children[0].children[2].remove()
        //     const inputName = createInput( this.lastClickedFolder[0].children[0], 'editDiv', 'editInput'  )
        //     inputName.value = thisElemName
        //     console.log(inputName)
        //     inputName.addEventListener('keydown', e => {
        //         if(e.keyCode === 13) { 
        //             event.preventDefault()
        //             let name = e.target.value
        //             const span = createEl( { tag: 'span', parentEl:this.lastClickedFolder[0].children[0], content:name } )
        //             inputName.parentElement.parentElement.remove()
        //         }
        //     })                                
        // }
        //  else if(this.lastClickedFile[0].getAttribute('class') === 'file') {
        //     console.log('wow')
            
        //     const thisElemName = this.lastClickedFile[0].children[1].textContent
        //     console.log(thisElemName)
        //     this.lastClickedFile[0].children[1].remove()
        //     const inputName = createInput( this.lastClickedFile[0], 'editDiv', 'editInput'  )
        //     inputName.value = thisElemName
        //     console.log(inputName)
        //     inputName.addEventListener('keydown', e => {
        //         if(e.keyCode === 13) { 
        //             event.preventDefault()
        //             let name = e.target.value
        //             const span = createEl( { tag: 'span', parentEl:this.lastClickedFile[0], content:name } )
        //             inputName.parentElement.parentElement.remove()
        //         }
        //     })    
        // }
    }

    folderClick = e => {
        if (e.target.getAttribute('class') === 'inputNameInput') { return }

        const { currentThis, className, name, bindEl} = findParent(e.target)

        if(className === 'folder') { this.lastClickedFolder.push(bindEl) }

        if(this.lastClickedFolder.length > 1) { this.lastClickedFolder.shift() }

        if(className === 'file') { this.lastClickedFile.push(bindEl) }

        if(this.lastClickedFile.length > 1) { this.lastClickedFile.shift() }

        if( currentThis && (className === 'folder' || className === 'file' || className === 'fileIcon' || className === 'folderIcon') ) {
            this.last2ClickedElements.push(currentThis)
        }   

        if(this.last2ClickedElements.length > 2) {
            this.last2ClickedElements.shift()
        }
    }

    fileIconClick= e => {
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
