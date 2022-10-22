const mcserviço = document.querySelector('#mcserviço')
let serviços = []

document.addEventListener('DOMContentLoaded', () => {
    serviços = JSON.parse(localStorage.getItem('serviços') || '[]')
    carros = JSON.parse(localStorage.getItem('carros') || '[]')
    reloadserviços()
})

function abrirmcserviço() {
    document.querySelector('#nomeserviço').value = ""
    mcserviço.classList.remove('dn')
    mcserviço.classList.add('df')
}

function fecharmcserviço() {
    mcserviço.classList.add('dn')
    mcserviço.classList.remove('df')
}


function reloadserviços(){

    document.querySelector('#containerserviços').innerHTML=""
    serviços.forEach((obj, i) => {
    let carrogastos = []
    carros.forEach(obj => {
       obj.gastos.forEach(obj => 
        carrogastos.push(obj))
    })
 
    let gastosfiltro = carrogastos.filter(filtrado => 
        filtrado.prestador==obj.nome
        )
        console.log(gastosfiltro);
        let soma = gastosfiltro.reduce(getTotal, 0);
        function getTotal(total, item) {
         return total + (item.valor);
        }
        console.log(soma);
       const divNova = document.createElement('div')
       divNova.setAttribute('id', i)
       divNova.onclick=function() {
        painelserviço(divNova.id)
    }
       divNova.setAttribute('class', 'serviço')
       const divname = document.createElement('div')
       divname.innerHTML=`${obj.nome}`
       const divdireita = document.createElement('div')
       const divp = document.createElement('div')
       const divvalor = document.createElement('div')
       divvalor.innerHTML=`R$${(soma).toFixed(2)}`
       const p = document.createElement('p')
       p.innerHTML = 'Gasto total:'
       divp.appendChild(p)
       divdireita.appendChild(divp)
       divdireita.appendChild(divvalor)
       divNova.appendChild(divname)
       divNova.appendChild(divdireita)
       document.querySelector('#containerserviços').appendChild(divNova)
    })
}


function cadastrarserviço(){
    const novoserviço = {
        nome: document.querySelector('#nomeserviço').value,
        gastos: []
    }
    serviços.push(novoserviço)
    localStorage.setItem('serviços', JSON.stringify(serviços))
    reloadserviços()
    
}

function painelserviço(id){
    document.querySelector('#painelserviço').innerHTML=""
    const p = document.createElement('p')
    p.innerHTML=`${serviços[id].nome}`
    document.querySelector('#painelserviço').appendChild(p)
    const listagastos = document.querySelector('#listagastos')
    listagastos.innerHTML=""
    let carrogastos = []
    carros.forEach(obj => {
       obj.gastos.forEach(obj => 
        carrogastos.push(obj))
    })
    const arraygastos = carrogastos.filter(obj => 
       obj.gastos != ""
    )
    const filtrado = arraygastos.filter(obj => 
        obj.prestador==`${serviços[id].nome}`
    )
    
    filtrado.forEach(obj => {
        const divNova = document.createElement('div')
        divNova.classList.add('gasto')
        divNova.innerHTML=`${obj.carro} | ${(obj.data).split('-').reverse().join('/')} | R$${(obj.valor).toFixed(2)}`
        const p = document.createElement('p')
        p.innerText=`${obj.descrição}`
        divNova.appendChild(p)
        listagastos.appendChild(divNova)
    })
}