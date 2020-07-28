function createEl({tag, parentEl, className, attributes, content}) {
  const el = document.createElement(tag)

  if(className) {el.classList.add(className)}
  if(attributes) {
    for (const name in attributes) {  
      el.setAttribute(name, attributes[name])
    }
  }
  if(content) {el.textContent = content}
  if(parentEl) {parentEl.appendChild(el)}
  return el
}

function createInput () {

}

export { createEl, createInput }