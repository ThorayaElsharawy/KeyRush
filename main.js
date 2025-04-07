const typingBtn = document.querySelector('.typing-btn');
const container = document.querySelector('.container')
const inputField = document.querySelector('input')
const p = 'Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet'
const letters = p.split('')
const text = document.createElement('p')

const charElements = []

letters.forEach(item => {
    const charachter = document.createElement('span');
    charachter.innerText = item
   charElements.push(charachter)
})

text.className = 'typing'
const target = container.children[2]
text.append(...charElements)
const userInputs = []

typingBtn.onclick = () => {
    document.querySelector('input').focus()
    typingBtn.style.display = 'none'
    container.insertBefore(text, target)

    inputField.addEventListener('input', (e) => {       
        if(e.inputType === 'deleteContentBackward') {
            userInputs.pop()
            charElements[userInputs.length].className = ''
            return
        }
        userInputs.push(e.data)

        let currIdx = 0
         while (currIdx < userInputs.length && currIdx < letters.length ) {   
            const state =  letters[currIdx] === userInputs[currIdx] ? 'correct' : 'wrong'
            charElements[currIdx].className = state
            currIdx++
        }
    })
}