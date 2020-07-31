import { createEl, createInput, creatFolder, createIconsWrapper, createFile, addId, nameChecker, findParent } from './viewHelpers'

export default class View {
    constructor () {
        this.app = document.getElementById('app')
        this.root = document.getElementById('root')
        this.isProjectNow = false
        this.last2ClickedElements = []
    }   


    addCreateProjectButton () {
        const createFolderWrapper = createEl( { tag: 'div', classes: ['createFolderWrapper'], parentEl: this.root } )
        const createFolder = createEl( { tag: 'div', classes: ['createFolder'], parentEl: createFolderWrapper } )
        createEl( { tag: 'span', parentEl: createFolder, content: 'Create Project Folder' } )
        // createFolder.addEventListener('click', () => this.addProjectFolder())
        createFolder.addEventListener('click', () => this.addItem())
    }

    addProjectFolder () {
        const inputName = createInput(!this.isprojectNowHelper)
        inputName.addEventListener("keydown", e => {
            if(e.keyCode === 13) { 
                event.preventDefault()
                let name = e.target.value

                const ul = creatFolder( [ name ])
                ul.addEventListener('click', e => {
                    const { currentThis, type} = findParent(e.target)
                    if(currentThis && type !== 'inputNameInput') {
                        this.last2ClickedElements.push(currentThis)
                    }
                    if(this.last2ClickedElements.length > 2) {
                        this.last2ClickedElements.shift()
                    }
                })

                const iconsWrapper = createIconsWrapper()
                const fileIcon = iconsWrapper.children[0].addEventListener('click', e => {
                    const { currentThis, type} = findParent(e.target)
                    this.addItem(currentThis, type)
                })
                const folderIcon = iconsWrapper.children[1].addEventListener('click', e => {
                    const { currentThis, type} = findParent(e.target)
                    this.addItem(currentThis, type)
                })

                // this.createFolderInModel(name)
                inputName.parentElement.parentElement.remove()
            }
          })
    }

    addItem (parentElement, className) {
        if( !this.isProjectNow ) {
            document.querySelector('.createFolderWrapper').remove()
        }
        const inputName = createInput( parentElement )
        inputName.addEventListener('keydown', e => {
            if(e.keyCode === 13) { 
                event.preventDefault()
                let name = e.target.value
                if(className === 'folderIcon' || !this.isProjectNow) {
                    const ul = creatFolder( [ name, parentElement ] )
                    ul.addEventListener('click', e => {
                        if (e.target.getAttribute('class') === 'inputNameInput') {
                            return undefined
                        }
                        // console.log(e.target)
                        const { currentThis, className, name} = findParent(e.target)
                        // console.log(name)
                        if( currentThis && (className === 'folder' || className === 'file' || className === 'fileIcon' || className === 'folderIcon') ) {
                            this.last2ClickedElements.push(currentThis)
                        }    
                        if(this.last2ClickedElements.length > 2) {
                            this.last2ClickedElements.shift()
                        }
                        console.log(this.last2ClickedElements)
                    })
                    if( !this.isProjectNow) {
                        const iconsWrapper = createIconsWrapper()
                        const fileIcon = iconsWrapper.children[0].addEventListener('click', e => {
                            if (e.target.getAttribute('class') === 'inputNameInput') {
                                return undefined
                            }
                            // console.log(e.target)
                            const { currentThis, className, name} = findParent(e.target)
                            // console.log(name)
                            if( currentThis && (className === 'folder' || className === 'file' || className === 'fileIcon' || className === 'folderIcon') ) {
                                this.last2ClickedElements.push(currentThis)
                            }  
                            if(this.last2ClickedElements.length > 2) {
                                this.last2ClickedElements.shift()
                            } 
                            this.addItem(this.last2ClickedElements[0], className)
                        })
                        const folderIcon = iconsWrapper.children[1].addEventListener('click', e => {
                            if (e.target.getAttribute('class') === 'inputNameInput') {
                                return undefined
                            }
                            // console.log(e.target)
                            const { currentThis, className, name} = findParent(e.target)
                            // console.log(name)
                            if( currentThis && (className === 'folder' || className === 'file' || className === 'fileIcon' || className === 'folderIcon') ) {
                                this.last2ClickedElements.push(currentThis)
                            }  
                            if(this.last2ClickedElements.length > 2) {
                                this.last2ClickedElements.shift()
                            } 
                            this.addItem(this.last2ClickedElements[0], className)
                        })
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

    // xyz () {
    //     console.log(111)
    //     // const parentIds = Object.values(document.querySelectorAll('[parentId]'))
    //     const parentIds = Object.values(document.querySelectorAll("[parentId]"))
    //     console.log(parentIds)
    //     parentIds.forEach(el => {
    //         el.addEventListener('click', () => {
    //             const id = el.getAttribute('parentId')
    //             this.last2ClickedElements.push(id)
    //             this.last2ClickedElements.unshift()
    //             console.log(this.last2ClickedElements)
    //         })
    //     })
    // }

    bindOnCreateFolderInModel (cb) {
        this.createFolderInModel = cb
    }
}
