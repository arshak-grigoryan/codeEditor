export default class Folder {
    constructor ( {name, content = {} } ) {
        this.self = {
            name: name,
            type: 'folder'
        }
        this.content = content
    }
    
}

const newFolder = new Folder( { name:"projectEditor" } )

// console.log(newFolder)


const projectEditor = { // ul
    self: { // div
        icon: 'icon', // i
        name: 'projectEdiotr' // span
    },
    content: { // div
        public: { // ul
            self: { // div
                icon: 'icon', // i
                name: 'public' // span
            },
            content: {
                index: {
                    icon: 'icon', // i
                    name: 'public' // span
                }
            }
        },
        src: { // ul

        }

    }
}


// class Folder {
//     constructor ( { name, type } ) {
//         this.self: {
//             name = name
//             type = type            
//         }
//         this.content = {}
//     }

//     addFolder ( newFolder) {
//         Object.defineProperty(this.content, newFolder.name, { value: newFolder})
//         // this.content.push(newFolder)
//     }

//     addFile ( newFile ) {
//         this.content.push(newFile)
//     }

//     get propName () {
//         return this.name
//     }

//     set propName (newName) {
//         this.name = newName
//     }
// }





// class File {
//     constructor ( { type, name, format } ) {
//         this.type = type
//         this.name = name
//         this.format = format
//         this.code = ''
//     }

//     get propName () {
//         return this.name + '.' + this.format
//     }

//     set propName (newName) {
//         this.name = newName
//     }
// }
// const ROOT = new Folder( { name:'ROOT', type:'folder' } )


// ROOT.addFolder(new Folder( { name:'firstProject', type:'folder' } ))


// const proj1 = new Folder( { name:'proj1', type:'folder' } )
// const index = new File( { type:'file', name:'index', format:'html' } )

// Object.defineProperty(ROOT.content, 'index', { value: index })



// const ROOT = {
//     name: 'ROOT',
//     type:'folder',

//     firstProject: {
//         name: 'firstProject',
//         type:'folder',

//         index:{type:'file', name:'index', format:'html'},
//         src:{
//             name: 'src',
//             type:'folder',

//             js:{
//                 name: 'js',
//                 type:'folder',
    
//                 controller: {type:'file', name:'controller', format:'js'},
//                 model: {type:'file', name:'model', format:'js'},
//                 view: {type:'file', name:'view', format:'js'}                
//             },   
//             css: {
//                 style: {type:'file', name:'style', format:'css'}
//             }               
//         }
//     }
// }
