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
        this.lastClickedElement = []
        this.lastClickedFileOrFolder
        
    }   

    addCreateProjectButton () {
        const createFolderWrapper = createEl( { tag: 'div', classes: ['createFolderWrapper'], parentEl: this.root } )
        const createFolder = createEl( { tag: 'div', classes: ['createFolder'], parentEl: createFolderWrapper } )
        createEl( { tag: 'span', parentEl: createFolder, content: 'Create Project' } )
        createFolder.addEventListener('click', () => this.addItem())
    }

    addItem (parentEl, className) {
        // if parentEl is projectFolder reassign to it content
        const projectFolder = document.querySelector('#root > ul')
        if(parentEl && parentEl === projectFolder) {
            parentEl = projectFolder.children[1]
        }

        if( !this.isProjectNow ) { document.querySelector('.createFolderWrapper').remove() }

        const inputName = createInput( parentEl )

        inputName.addEventListener('keydown', e => {

            if(e.keyCode === 13) { 
                event.preventDefault()

                if(className === 'folderIcon' || !this.isProjectNow) {

                    const ul = creatFolder( [ e.target.value, parentEl ] )

                    ul.addEventListener('click', e => this.folderClick(e))
                        ul.addEventListener('click', e => {
                        this.lastClickedElement.push(ul)
                        if(this.lastClickedElement.length > 1) {
                            this.lastClickedElement.shift()
                        }
                        
                    })

                    const expandArrow = ul.children[0].children[0].children[0]
                    
                    expandArrow.addEventListener('click', e => this.expandContent(e.target, ul))

                    if( !this.isProjectNow ) {

                        const iconsWrapper = createIconsWrapper()

                        const fileIcon = iconsWrapper.children[0].addEventListener('click', e => this.fileIconClick(e))

                        const folderIcon = iconsWrapper.children[1].addEventListener('click', e => this.folderIconClick(e))
                        
                        const editIcon = iconsWrapper.children[2].addEventListener('click', e => this.editIconClick(e))

                        const deleteIcon = iconsWrapper.children[3].addEventListener('click', e => this.deleteIconClick(e))

                        this.isProjectNow = true
                    }
                }
                if(className === 'fileIcon') {
                    const li = createFile( [ e.target.value, parentEl ] )
                    li.addEventListener('click', e => this.fileClick(e))
                        // const numberId =  li.getAttribute('elId');
                        li.addEventListener("click", e => {
                        this.lastClickedElement.push(li)
                        if(this.lastClickedElement.length > 1) {
                            this.lastClickedElement.shift()
                        }
                    })
                }
                
                inputName.parentElement.parentElement.remove()
            }
        })
    }
    
    editIconClick = e => {
        if (e.target.getAttribute('class') === 'inputNameInput') { return undefined }

        const { currentThis, className, name} = findParent(e.target)

        if(/* currentThis && (*/ className === 'folder' || className === 'file' /* || className === 'fileIcon' || className === 'folderIcon')*/ ) {
            this.last2ClickedElements.push(currentThis)
            console.log("im uzstsy", currentThis)
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

    fileClick = e => {
        console.log(e.target)
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

    deleteIconClick = e => {
        const {className} = findParent(e.target)
        if((className === 'folder') || (className === 'file')) { 
             this.lastClickedFileOrFolder.remove()
        } 
    // else if(className === 'file') { 
    //         this.lastClickedElement[0].remove();
    //   }

        // const thisElemName = this.lastClickedFileOrFolder.children[0].children[0].children[2].textContent
        // console.log('thisElemName: ', thisElemName);
        // console.log("this.lastClickedElement :",this.lastClickedElement);
    }

    expandContent = (arrowIcon, thisFolder) => {

        const content = thisFolder.children[1]

        if(content.style.display !== 'none') {
            arrowIcon.style.transform = 'rotate(-90deg)'
            content.style.display = 'none'
        } else {
            arrowIcon.style.transform = 'rotate(0deg)'
            content.style.display = 'block'
        }
    }

    autoExpandContent = () => {
        const projectFolder = document.querySelector('#root > ul')
        const thisFolder = this.last2ClickedElements[0]
        if(projectFolder === thisFolder) {
            projectFolder.children[0].children[0].children[0].style.transform = 'rotate(0deg)'
            projectFolder.children[1].style.display = 'block' 
        } else {
            thisFolder.parentElement.children[0].children[0].children[0].style.transform = 'rotate(0deg)'
            thisFolder.parentElement.children[1].style.display = 'block'            
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

        // at first expand this folder content and after it add input area
        this.autoExpandContent()

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

        // at first expand this folder content and after it add input area
        this.autoExpandContent()

        this.addItem(this.last2ClickedElements[0], className)
    }

    bindOnCreateFolderInModel (cb) {
        this.createFolderInModel = cb
    }
}