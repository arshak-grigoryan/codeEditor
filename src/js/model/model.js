import Folder from './folder'

export default class Model {
    constructor () {
        this.project = null
    }

    init () {
        this.firstTimeCreateFolder()
    }

    bindOnModelFirstTimeCreateFolder (cb) {
        this.firstTimeCreateFolder = cb
    }
    
    addProject () {
        console.log(555555555)

        // const newProject = new Folder()
        // this.project = newProject
    }
} 