const mcserviço = document.querySelector('#mcserviço')
let dataatual
let serviços = []
let gastosfiltro = []
let painelaberto
let arraymostrado
document.addEventListener('DOMContentLoaded', () => {
    serviços = JSON.parse(localStorage.getItem('serviços') || '[]')
    carros = JSON.parse(localStorage.getItem('carros') || '[]')
    reloadserviços(serviços)
})

function abrirmcserviço() {
    document.querySelector('#nomeserviço').value = ""
    mcserviço.showModal()
}

function fecharmcserviço() {
    mcserviço.close()
}


function reloadserviços(array){

    document.querySelector('#containerserviços').innerHTML=""
    array.forEach((obj, i) => {
    let carrogastos = []
    carros.forEach(obj => {
       obj.gastos.forEach(obj => 
        carrogastos.push(obj))
    })
 
    gastosfiltro = carrogastos.filter(filtrado => 
        filtrado.prestador==obj.nome
        )
        let soma = gastosfiltro.reduce(getTotal, 0);
        function getTotal(total, item) {
         return total + (item.valor);
        }
       const divNova = document.createElement('div')
       divNova.setAttribute('id', i)
       divNova.onclick=function() {
        const mostrar = document.querySelector('#mostrargasto')
        mostrar.options[mostrar.selectedIndex].value="todos"
        mostrar.selectedIndex=0
        painelaberto = divNova.id
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
    arraymostrado = filtrado
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


const mostrarserviço = document.querySelector('#mostrarserviços')

mostrarserviço.oninput=(() => {
    const date = new Date()
    dia = String(date.getDate()).padStart(2, '0');
    mes = String(date.getMonth() + 1).padStart(2, '0');
    ano = date.getFullYear();

    dataatual = `${ano}-${mes}-${dia}`;
    data30 = `${ano}-${mes-1}-${dia}`;
    data90 = `${ano}-${mes-3}-${dia}`;
    
    const mespassado = new Date(data30)
    const monthatual = date.toLocaleString('default', { month: 'long' });
    const monthpassado = mespassado.toLocaleString('default', { month: 'long' });
    const select = mostrarserviço.options[mostrarserviço.selectedIndex].value;

    if (select == "30d") {
        document.querySelector('#containerserviços').innerHTML=""
        serviços.forEach((obj, i) => {
        let carrogastos = []
        carros.forEach(obj => {
           obj.gastos.forEach(obj => 
            carrogastos.push(obj))
        })
        
        const filtro30d = carrogastos.filter(obj => 
            obj.data > data30
        )

     
        gastosfiltro = filtro30d.filter(filtrado => 
            filtrado.prestador==obj.nome
            )

            let soma = gastosfiltro.reduce(getTotal, 0);
            function getTotal(total, item) {
             return total + (item.valor);
            }
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
    if (select == "todos") {
        reloadserviços(serviços)
    }
    if (select == "mesAtual") {
        console.log(monthatual);
        document.querySelector('#containerserviços').innerHTML=""
        serviços.forEach((obj, i) => {
        let carrogastos = []
        carros.forEach(obj => {
           obj.gastos.forEach(obj => 
            carrogastos.push(obj))
        })
        
        const filtro30d = carrogastos.filter(obj => 
           {
            const data = new Date(obj.data)
            const month = data.toLocaleString('default', { month: 'long' });
            return month == monthatual
           }
        )

     
        gastosfiltro = filtro30d.filter(filtrado => 
            filtrado.prestador==obj.nome
            )

            let soma = gastosfiltro.reduce(getTotal, 0);
            function getTotal(total, item) {
             return total + (item.valor);
            }
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
    if (select == "ultimoMes") {
        console.log(monthpassado);
        document.querySelector('#containerserviços').innerHTML=""
        serviços.forEach((obj, i) => {
        let carrogastos = []
        carros.forEach(obj => {
           obj.gastos.forEach(obj => 
            carrogastos.push(obj))
        })
        
        const filtro30d = carrogastos.filter(obj => 
           {
            const data = new Date(obj.data)
            const month = data.toLocaleString('default', { month: 'long' });
            return month == monthpassado
           }
        )

     
        gastosfiltro = filtro30d.filter(filtrado => 
            filtrado.prestador==obj.nome
            )

            let soma = gastosfiltro.reduce(getTotal, 0);
            function getTotal(total, item) {
             return total + (item.valor);
            }
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

})


const ordenar = document.querySelector('#ordenargasto')
const mostrar = document.querySelector('#mostrargasto')
mostrar.oninput=(() => {
    
    const date = new Date()
    dia = String(date.getDate()).padStart(2, '0');
    mes = String(date.getMonth() + 1).padStart(2, '0');
    ano = date.getFullYear();

    dataatual = `${ano}-${mes}-${dia}`;
    data30 = `${ano}-${mes-1}-${dia}`;
    data90 = `${ano}-${mes-3}-${dia}`;
    
    const mespassado = new Date(data30)
    const monthatual = date.toLocaleString('default', { month: 'long' });
    const monthpassado = mespassado.toLocaleString('default', { month: "2-digit" });
  

    const select = mostrar.options[mostrar.selectedIndex].value;

    if(select == "todos"){
        painelserviço(painelaberto)
    }
    if(select == "30d"){
        painelserviço(painelaberto)
        const ultimos30 = arraymostrado.filter(obj => 
            obj.data > data30 && obj.data <= dataatual
        )
        arraymostrado = ultimos30
        
        document.querySelector('#painelserviço').innerHTML=""
    const p = document.createElement('p')
    p.innerHTML=`${serviços[painelaberto].nome}`
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
        obj.prestador==`${serviços[painelaberto].nome}`
    )
    arraymostrado.forEach(obj => {
        const divNova = document.createElement('div')
        divNova.classList.add('gasto')
        divNova.innerHTML=`${obj.carro} | ${(obj.data).split('-').reverse().join('/')} | R$${(obj.valor).toFixed(2)}`
        const p = document.createElement('p')
        p.innerText=`${obj.descrição}`
        divNova.appendChild(p)
        listagastos.appendChild(divNova)
    })



    }
    if(select == "mesAtual"){
        painelserviço(painelaberto)
        console.log(monthatual);
        const mesAtual = arraymostrado.filter(obj => {
            const data = new Date(obj.data)
            const month = data.toLocaleString('default', { month: 'long' });
            return month == monthatual
        }
        )
        arraymostrado = mesAtual
        
        document.querySelector('#painelserviço').innerHTML=""
    const p = document.createElement('p')
    p.innerHTML=`${serviços[painelaberto].nome}`
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
        obj.prestador==`${serviços[painelaberto].nome}`
    )
    arraymostrado.forEach(obj => {
        const divNova = document.createElement('div')
        divNova.classList.add('gasto')
        divNova.innerHTML=`${obj.carro} | ${(obj.data).split('-').reverse().join('/')} | R$${(obj.valor).toFixed(2)}`
        const p = document.createElement('p')
        p.innerText=`${obj.descrição}`
        divNova.appendChild(p)
        listagastos.appendChild(divNova)
    })



    }
    if(select == "ultimoMes"){
        painelserviço(painelaberto)
        const ultimoMes = arraymostrado.filter(obj => {
            const data =new Date(obj.data)
            console.log(data);
            const month = data.toLocaleString('default', {timeZone:'UTC', month: "2-digit" });
            return month === monthpassado
        }
        )
        arraymostrado = ultimoMes
        
        document.querySelector('#painelserviço').innerHTML=""
    const p = document.createElement('p')
    p.innerHTML=`${serviços[painelaberto].nome}`
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
        obj.prestador==`${serviços[painelaberto].nome}`
    )
    arraymostrado.forEach(obj => {
        const divNova = document.createElement('div')
        divNova.classList.add('gasto')
        divNova.innerHTML=`${obj.carro} | ${(obj.data).split('-').reverse().join('/')} | R$${(obj.valor).toFixed(2)}`
        const p = document.createElement('p')
        p.innerText=`${obj.descrição}`
        divNova.appendChild(p)
        listagastos.appendChild(divNova)
    })



    }

    console.log(arraymostrado);
})

