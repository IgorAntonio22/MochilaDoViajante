const form = document.getElementById("novoItem")
const lista = document.getElementById('lista')
const itens = JSON.parse(localStorage.getItem("itens")) || []

itens.forEach((elemento) => {
    criaElemento(elemento)
})

form.addEventListener('submit', (evento) => {
    evento.preventDefault() //interrompe o comportamento padrão de algum evento, no caso de enviar de uma vez
    //sem que possamos manipular o evento de envio
    
    const nome = evento.target.elements['nome']
    const quantidade = evento.target.elements['quantidade']

    const itemAtual = {
        "nome": nome.value,
        "quantidade": quantidade.value
    }

    const existe = itens.find( elemento => elemento.nome === nome.value)
    
    if (existe) {
        itemAtual.id = existe.id

        atualizaElemento(itemAtual)

        itens[itens.findIndex(elemento => elemento.id === existe.id)] = itemAtual
    } else {
        itemAtual.id = itens[itens.length -1] ? (itens[itens.length-1]).id + 1 : 0;

        criaElemento(itemAtual)
    
        itens.push(itemAtual)
    }
    
    localStorage.setItem("itens", JSON.stringify(itens))
    
    nome.value = ""
    quantidade.value = ""

})

function criaElemento(item) {
 const novoItem = document.createElement('li')
 novoItem.classList.add('item')

 const numeroItem = document.createElement('strong')
 numeroItem.innerHTML = item.quantidade

 numeroItem.dataset.id = item.id

 novoItem.appendChild(numeroItem)
 novoItem.innerHTML += item.nome

 novoItem.appendChild(botaoDeleta(item.id))
 lista.appendChild(novoItem) //inserindo o objeto novoItem dentro do objeto lista

/*  localStorage.setItem("nome", nome) */ // cria um item dentro do objeto localStorage do navegador com a informação, sendo "nome" a chave (atributo) e nome o valor definido para essa chave (atributo) só dá pra salvar dados tipo string no localStorage
}

function atualizaElemento(item) {
    document.querySelector("[data-id='"+item.id+"']").innerHTML = item.quantidade
}

function botaoDeleta(id) {
    const elementoBotao = document.createElement("button")
    elementoBotao.innerText = "X"

    elementoBotao.addEventListener('click', function() {
        deletaElemento(this.parentNode,id) //remove o elemento pai da tag button com o X
    })

    return elementoBotao //vai me retornar o botão para usar dentro do novoItem com appendChild
}

function deletaElemento(tag, id) {
    tag.remove()

    itens.splice(itens.findIndex(elemento => elemento.id === id), 1) //remove um item do array, método splice(" posição do elemento que queremos remover", quantos remover), 

    localStorage.setItem("itens", JSON.stringify(itens))
}