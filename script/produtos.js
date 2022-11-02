const cadastro = document.getElementById("cadastro");
const btncadastrar = document.getElementById('cadatrar')
const containerprodutos = document.querySelector('.containerprodutos')
const objeto = document.querySelector('#objeto')
const painell = document.querySelector('#painel')
const mfotos = document.querySelector('#mfotos')
const containerfotos = document.querySelector('#containerfotos')
const imgcadastro = document.querySelector('#uploadfoto')
const semfoto = document.getElementById('semfoto')
const fotoobj = document.querySelector('#fotocarroobj')
const infos = document.getElementById('carInfos')
const imagedetran = document.querySelector('#imagedetran')
const imagefipe = document.querySelector('#imagefipe')
const namecar = document.querySelector('#namecar')
const foto = document.querySelector('#fotocarro')
const image = document.createElement('img')
let dia, mes, ano
let dataatual
let carroaberto = -1
const clientid = '84def183cbe6352'
const secretid = 'd6f06b3529fff477f6479440d1f56e51fa2c0221'

let objid
let srcfoto = ""
let novafoto = ""
let carros = []
let fotoscarros = []
let carrosinicial = [
    {
        alt: 'argo branco',
        foto: 'https://i.imgur.com/np7paoE.png',
        id: 1
    },
    {
        alt: 'argo vermelho',
        foto: 'https://i.imgur.com/zeZcPNF.png',
        id: 2
    },
    {
        alt: 'jeep renegade',
        foto: 'https://i.imgur.com/l81gGRF.png',
        id: 3
    },
    {
        alt: 'jeep renegade',
        foto: 'https://i.imgur.com/cuT8Lbo.png',
        id: 4
    },
    {
        alt: 'strada branca',
        foto: 'https://i.imgur.com/EDWVj24.png',
        id: 5
    },
    {
        alt: 'strada vermelha',
        foto: 'https://i.imgur.com/qgy3BkY.png',
        id: 6
    },
    {
        alt: 'strada preta',
        foto: 'https://i.imgur.com/ze0C51I.png',
        id: 7
    },
    {
        alt: 'hyundai hb20',
        foto: 'https://i.imgur.com/4FKexdA.jpg',
        id: 8
    },
    {
        alt: 'hyundai hb20',
        foto: 'https://i.imgur.com/09W9Yuk.png',
        id: 9
    },
    {
        alt: 'jeep compass',
        foto: 'https://i.imgur.com/2354Hol.png',
        id: 10
    },
    {
        alt: 'jeep compass',
        foto: 'https://i.imgur.com/HUGAnqk.png',
        id: 11
    },
    {
        alt: 'gm onix',
        foto: 'https://i.imgur.com/owLUVPw.png',
        id: 12
    },
    {
        alt: 'gm onix',
        foto: 'https://i.imgur.com/f8FEXYM.png',
        id: 13
    },
    {
        alt: 'gm onix',
        foto: 'https://i.imgur.com/t4zBiSl.png',
        id: 14
    },
    {
        alt: 't-cross',
        foto: 'https://i.imgur.com/mlIjlf8.jpg',
        id: 15
    },
    {
        alt: 't-cross',
        foto: 'https://i.imgur.com/K5NroM7.png',
        id: 16
    },
    {
        alt: 'toro',
        foto: 'https://i.imgur.com/m93FcvJ.png',
        id: 17
    },
    {
        alt: 'toro',
        foto: 'https://i.imgur.com/9ytxQ5H.jpg',
        id: 18
    },
    {
        alt: 'toro',
        foto: 'https://i.imgur.com/UO8EjBQ.png',
        id: 19
    },
    ]


document.addEventListener('DOMContentLoaded', () => {
    fotoscarros = JSON.parse(localStorage.getItem('fotoscarros') || '[]')
    serviços = JSON.parse(localStorage.getItem('serviços') || '[]')
    carros = JSON.parse(localStorage.getItem('carros') || '[]')
    carros.forEach((obj, id) => {
        adicionarbox(id)
    });
    const data = new Date();
    dia = String(data.getDate()).padStart(2, '0');
    mes = String(data.getMonth() + 1).padStart(2, '0');
    ano = data.getFullYear();
    dataatual = `${ano}-${mes}-${dia}`;
})

// funcoes modal

function abrirCadastro() {
    document.querySelector("#uploadfoto").classList.add('boxshadow')
    cadastro.showModal()
    document.getElementById('nome').value=''
    document.getElementById('ano').value=''
    imgcadastro.innerHTML=""
}

function fecharCadastro() {
    cadastro.close()
}

function abrirobjeto() {
    fecharpainel()
    objeto.showModal()
}

function fecharobjeto() {
    objeto.close()
}

function abrirpainel() {
    painell.showModal()
}

function fecharpainel() {
    painell.close()
}

function abrirmfotos(boxid) {
    mfotos.showModal()
    modalfotos(boxid)
}

function fecharmfotos() {

    containerfotos.innerHTML=''
    mfotos.close()
}

function abrirCadastroGasto() {
   document.querySelector('#descriçãoserviço').value=""
   document.querySelector('#dataserviço').value=""
   document.querySelector('#valorserviço').value=""
   document.querySelector('#cadastrogasto').showModal()
   document.querySelector('#prestador').innerHTML='<option selected disabled value="">Seleione o Prestador</option>'
   serviços.forEach((obj, i) => {
   const option = document.createElement('option')
   option.setAttribute('value', `${obj.nome}`)
   option.innerHTML=`${obj.nome}`
   document.querySelector('#prestador').appendChild(option)
   })
}

function fecharCadastroGasto() {
    document.querySelector('#cadastrogasto').close()
}






//funcoes gerais

function cadastrar(){
    const novocarro = {        
        nome: (document.getElementById('nome')).value,
        ano: (document.getElementById('ano')).value,
        cor: (document.getElementById('cor')).value,
        placa: (document.getElementById('placa')).value,
        renavam: (document.getElementById('renavam')).value,
        fornecedor: "",
        dataCompra: (document.getElementById('dataCompra')).value,
        valorCompra: Number((document.getElementById('valorCompra')).value),
        linkfipe: "",
        linkdetran: (document.getElementById('linkDetran')).value,
        foto: srcfoto,
        gastos: []
    }
    const novogasto = {
        carro: (document.getElementById('nome')).value,
        prestador: "COMPRA",
        descrição: "Compra do Veículo",
        data: (document.getElementById('dataCompra')).value,
        valor: Number((document.getElementById('valorCompra')).value) 
    }

    novocarro.gastos.push(novogasto)
    carros.push(novocarro)
    localStorage.setItem('carros', JSON.stringify(carros))
    adicionarbox(carros.length-1)
    console.log(novocarro);
}
function adicionarbox (id) {
    const divNova = document.createElement("div");
    divNova.classList.add("productbox")
    divNova.setAttribute('id', id)
   
    const image = document.createElement("img");
    image.setAttribute('src', `${carros[id].foto}`)
    image.onclick=function() {
        painel(divNova.id)
    }

    divNova.appendChild(image);

    const p = document.createElement("p")
    const carname = document.createTextNode(`${carros[id].nome}`);
    p.appendChild(carname)

    divNova.appendChild(p);

    const divbotoes = document.createElement("div");
    divNova.classList.add("botoes");

    divNova.appendChild(divbotoes)

    const lapis = document.createElement("a")
    lapis.classList.add('lapis')
    lapis.setAttribute('id', id)
    lapis.onclick=function() {
        editarobjeto(lapis.id)
  }
    const imagelapis = document.createElement("img");
    imagelapis.src = "https://i.imgur.com/jCjLhCK.png";
    

    lapis.appendChild(imagelapis)
    divbotoes.appendChild(lapis)

    const lixo = document.createElement("a")
    lixo.classList.add('lixo')
    const imagelixo = document.createElement("img");
    imagelixo.src = "https://i.imgur.com/LNH8lpi.png";
    imagelixo.onclick=function() {
        remover(divNova.id)
    }

    lixo.appendChild(imagelixo)
    divbotoes.appendChild(lixo)

    containerprodutos.insertBefore(divNova, document.querySelector('.productbox'))

    
    
}
function editarobjeto(id){  
    abrirobjeto()
    fotoobj.innerHTML=""
    fotoobj.appendChild(image)
    image.setAttribute('src', `${carros[id].foto}`)   
    fotoobj.onclick=function(){
        abrirmfotos(fotoobj)
        
    }
    document.getElementById('nomeobj').value = carros[id].nome
    document.getElementById('valorCompraobj').value = carros[id].valorCompra
    document.getElementById('anoobj').value = carros[id].ano
    document.getElementById('corobj').value = carros[id].cor
    document.getElementById('placaobj').value = carros[id].placa
    document.getElementById('renavamobj').value = carros[id].renavam
    document.getElementById('dataCompraobj').value = carros[id].dataCompra
    document.getElementById('linkDetranobj').value = carros[id].linkdetran
    objid = id
    }

function atualizar(){
    if (srcfoto != ""){
        carros[objid] = {
        nome: (document.getElementById('nomeobj')).value,
        ano: (document.getElementById('anoobj')).value,
        cor: (document.getElementById('corobj')).value,
        placa: (document.getElementById('placaobj')).value,
        renavam: (document.getElementById('renavamobj')).value,
        fornecedor: "",
        dataCompra: (document.getElementById('dataCompraobj')).value,
        valorCompra: Number((document.getElementById('valorCompraobj')).value),
        linkfipe: "",
        linkdetran: (document.getElementById('linkDetranobj')).value,
        foto: srcfoto,
        gastos: carros[objid].gastos
        }
        const image = document.createElement("img");
        image.setAttribute('src', srcfoto)
        image.onclick=function() {
            painel(divNova.id)
            
        }
    }else 
    {carros[objid] = {
        nome: (document.getElementById('nomeobj')).value,
        ano: (document.getElementById('anoobj')).value,
        cor: (document.getElementById('corobj')).value,
        placa: (document.getElementById('placaobj')).value,
        renavam: (document.getElementById('renavamobj')).value,
        fornecedor: "",
        dataCompra: (document.getElementById('dataCompraobj')).value,
        valorCompra: Number((document.getElementById('valorCompraobj')).value),
        linkfipe: "",
        linkdetran: (document.getElementById('linkDetranobj')).value,
        foto: carros[objid].foto,
        gastos: carros[objid].gastos
    }}
    localStorage.setItem('carros', JSON.stringify(carros))
    fecharobjeto()
    const diveditada = document.getElementById(objid)
    const nomeantigo = diveditada.children[1]
    nomeantigo.textContent = `${carros[objid].nome}` 
    alert('produto alterado com sucesso.')
    location.reload()
    }

function remover(id){
    const retorno = confirm(`Deseja excluir ${carros[id].nome}?` )
    if (retorno){ containerprodutos.removeChild(document.getElementById(`${id}`))
    carros = carros.filter((carro, i) => i!=id)
    localStorage.setItem('carros', JSON.stringify(carros))}   
}

 function painel(id){
    carroaberto = id
    abrirpainel() 
    reloadgastos(id)
    infos.textContent=`Ano: ${carros[id].ano} | Cor: ${carros[id].cor} | Placa: ${carros[id].placa}`

    const pdias = document.createElement('p')
    const d1  = carros[id].dataCompra;
    const d2  = dataatual;
    const diffInMs   = new Date(d2) - new Date(d1)
    const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
    pdias.innerText=`No estoque a ${diffInDays} dias.`

    infos.appendChild(pdias)

    foto.innerHTML=""
    image.src = `${carros[id].foto}`
    foto.appendChild(image)
    imagefipe.href=`${carros[id].linkfipe}`
    imagedetran.href=`${carros[id].linkdetran}`
    namecar.textContent=`${carros[id].nome}`
    listagastos = []
   carros[id].gastos.forEach(obj => {
    listagastos.push(obj.valor)
   })
   let soma = listagastos.reduce(function(soma, i) {
    return soma + i;
});

    const resumo = document.querySelector('#containerresumo')
    resumo.innerHTML=""
    const vcompra = document.createElement('p')
    vcompra.innerText=`Valor Compra: R$${((carros[id].valorCompra).toFixed(2)).replace('.',',')}`
    resumo.appendChild(vcompra)
    const totalgastos = document.createElement('p')
    totalgastos.innerText=`Total Gasto: R$${((soma-carros[id].valorCompra).toFixed(2)).replace('.',',')}`
    resumo.appendChild(totalgastos)

    const calculomargem = document.createElement('p')
    calculomargem.innerHTML=`Margem de lucro de: <input id="m1" value="5" type="number" class="margem">% a  <input id="m2" value="10" type="number" class="margem">%`
    resumo.appendChild(calculomargem)

    const m1 = Number(((document.querySelector('#m1').value)/100)+1)
    const m2 = Number(((document.querySelector('#m2').value)/100)+1)

    console.log(m1, m2);

    const div = document.createElement('div')
    div.classList.add('divpreçosugerido')
    const pdiv = document.createElement('p')
    pdiv.innerText=`Valor sugerido de venda:`
    const valorsugerido = document.createElement('p')
    valorsugerido.classList.add('preçosugeridotext')
    pdiv.classList.add('preçosugeridotext')
    valorsugerido.innerText=`R$${((soma*m1).toFixed(2)).replace('.',',')} ~~ R$${((soma*m2).toFixed(2)).replace('.',',')}`

    document.querySelector('#m1').oninput=(() => {
        const m1nv = Number(((document.querySelector('#m1').value)/100)+1)
        const m2nv = Number(((document.querySelector('#m2').value)/100)+1)
        console.log("oi");
        valorsugerido.innerText=`R$${(((carros[id].valorCompra+soma)*m1nv).toFixed(2)).replace('.',',')} ~~ R$${(((carros[id].valorCompra+soma)*m2nv).toFixed(2)).replace('.',',')}`

    })

    document.querySelector('#m2').oninput=(() => {
        const m1nv = Number(((document.querySelector('#m1').value)/100)+1)
        const m2nv = Number(((document.querySelector('#m2').value)/100)+1)
        console.log("oi");
        valorsugerido.innerText=`R$${(((carros[id].valorCompra+soma)*m1nv).toFixed(2)).replace('.',',')} ~~ R$${(((carros[id].valorCompra+soma)*m2nv).toFixed(2)).replace('.',',')}`

    })

    div.appendChild(pdiv)
    div.appendChild(valorsugerido)
    resumo.appendChild(div)

}

function modalfotos(boxid){
    const imgadd = document.createElement('img')
    document.querySelector('#alt').value=""
    imgadd.src = 'https://t4.ftcdn.net/jpg/04/81/13/43/360_F_481134373_0W4kg2yKeBRHNEklk4F9UXtGHdub3tYk.jpg'

    for (let i = 0; i < fotoscarros.length; i++) {
        const novafoto = document.createElement('div')
        novafoto.classList.add('boxfoto')
        const image = document.createElement('img')
        image.setAttribute('src', `${fotoscarros[i].foto}`)
        novafoto.setAttribute('id', `${i}`)
        novafoto.onclick=function() {
            selecionarfoto(novafoto.id, boxid)
            fecharpainel()
        }
        novafoto.appendChild(image)
        containerfotos.appendChild(novafoto)
    }
    
    const barraPesquisa = document.querySelector('#barraPesquisa')
    barraPesquisa.oninput=(() => {
        containerfotos.innerHTML=""
        
        const result = fotoscarros.filter(
         obj => 
        obj.alt.includes(barraPesquisa.value)
        )

        result.forEach((obj, id) => {
            const novafoto = document.createElement('div')
            novafoto.classList.add('boxfoto')
            const image = document.createElement('img')
            image.src=`${obj.foto}`
            novafoto.setAttribute('id', `${id}`)
            novafoto.onclick=function() {
                selecionarfoto(obj.id-1, boxid)
                fecharpainel()
            }
            novafoto.appendChild(image)
            containerfotos.appendChild(novafoto)
        })
    })
}  

function selecionarfoto(fotoid, boxid){
    document.querySelector("#uploadfoto").classList.remove('boxshadow')
    novafoto = document.createElement('img')
    srcfoto = `${fotoscarros[fotoid].foto}`
    novafoto.src = srcfoto
    boxid.innerHTML=""
    boxid.appendChild(novafoto)
    fecharmfotos()
}

function adicionargasto(){
    const novogasto = {
        carro: carros[carroaberto].nome,
        prestador: document.querySelector('#prestador').value,
        descrição: document.querySelector('#descriçãoserviço').value,
        data: document.querySelector('#dataserviço').value,
        valor: Number(document.querySelector('#valorserviço').value,) 
    }
   const arraygastos = carros[carroaberto].gastos
   arraygastos.push(novogasto)
   localStorage.setItem('carros', JSON.stringify(carros))
   painell.close()
   painel(carroaberto)
}

function reloadgastos(id){
    document.querySelector('#containergastos').innerHTML=""
    const arraygastos = carros[id].gastos
    if (arraygastos != ""){arraygastos.forEach((obj, i) => {
        const divNova = document.createElement('div')
        divNova.classList.add('gasto')
        divNova.innerHTML=`${obj.prestador} | ${(obj.data).split('-').reverse().join('/')} | R$${(obj.valor).toFixed(2)}`
        const p = document.createElement('p')
        p.innerHTML=`${obj.descrição} | <i onclick='excluirgasto(${id},${i})'class="bi bi-trash-fill"></i>`
        divNova.appendChild(p)
        document.querySelector('#containergastos').appendChild(divNova)
    })}
    
   
}

function excluirgasto(carro, id){
    console.log(carros[carro].gastos);
    const retorno = confirm(`Deseja excluir gasto?` )
    if(retorno){carros[carro].gastos = carros[carro].gastos.filter((gasto, i) => i!=id)
        console.log(carros[carro].gastos);
        localStorage.setItem('carros', JSON.stringify(carros))
        reloadgastos(carro)
    
    }
}   
let arraymostrado
const ordenar = document.querySelector('#ordenargasto')
const mostrar = document.querySelector('#mostrargasto')
ordenar.oninput=(() => {

    console.log(arraymostrado);
    
    const select = ordenar.options[ordenar.selectedIndex].value;

   

    if(select == "prestador"){
        arraymostrado = arraymostrado.sort((a,b) => {
            if (a.prestador > b.prestador) {
                return -1;
              }
              if (a.prestador < b.prestador) {
                return 1;
              }
            
        })
       document.querySelector('#containergastos').innerHTML=""
        const arraygastos = arraymostrado
        if (arraygastos != ""){arraygastos.forEach((obj, i) => {
        const divNova = document.createElement('div')
        divNova.classList.add('gasto')
        divNova.innerHTML=`${obj.prestador} | ${(obj.data).split('-').reverse().join('/')} | R$${(obj.valor).toFixed(2)}`
        const p = document.createElement('p')
        p.innerHTML=`${obj.descrição} | <i onclick='excluirgasto(${carroaberto},${i})'class="bi bi-trash-fill"></i>`
        divNova.appendChild(p)
        document.querySelector('#containergastos').appendChild(divNova)
    })} 
    }
    if(select == "valor"){
       arraymostrado = arraymostrado.sort((a,b) => {
            if (a.valor > b.valor) {
                return -1;
              }
              if (a.valor < b.valor) {
                return 1;
              }
            
        })
       document.querySelector('#containergastos').innerHTML=""
        const arraygastos = arraymostrado
        if (arraygastos != ""){arraygastos.forEach((obj, i) => {
        const divNova = document.createElement('div')
        divNova.classList.add('gasto')
        divNova.innerHTML=`${obj.prestador} | ${(obj.data).split('-').reverse().join('/')} | R$${(obj.valor).toFixed(2)}`
        const p = document.createElement('p')
        p.innerHTML=`${obj.descrição} | <i onclick='excluirgasto(${carroaberto},${i})'class="bi bi-trash-fill"></i>`
        divNova.appendChild(p)
        document.querySelector('#containergastos').appendChild(divNova)
    })}     
    }
    if(select == "data"){
        arraymostrado = arraymostrado.sort((a,b) => {
            if (a.data > b.data) {
                return -1;
              }
              if (a.data < b.data) {
                return 1;
              }
            
        })
        document.querySelector('#containergastos').innerHTML=""
        const arraygastos = arraymostrado
        if (arraygastos != ""){arraygastos.forEach((obj, i) => {
        const divNova = document.createElement('div')
        divNova.classList.add('gasto')
        divNova.innerHTML=`${obj.prestador} | ${(obj.data).split('-').reverse().join('/')} | R$${(obj.valor).toFixed(2)}`
        const p = document.createElement('p')
        p.innerHTML=`${obj.descrição} | <i onclick='excluirgasto(${carroaberto},${i})'class="bi bi-trash-fill"></i>`
        divNova.appendChild(p)
        document.querySelector('#containergastos').appendChild(divNova)
    })}  
    }
})
mostrar.oninput=(() => {

    const date = new Date()
    dia = String(date.getDate()).padStart(2, '0');
    mes = String(date.getMonth() + 1).padStart(2, '0');
    ano = date.getFullYear();

    data30 = `${ano}-${mes}-${dia}`;
    data90 = `${ano}-${mes-3}-${dia}`;
    
    const mespassado = new Date(dataatual)
    const monthatual = date.toLocaleString('default', { month: 'long' });
    const monthpassado = mespassado.toLocaleString('default', { month: 'long' });

    const select = mostrar.options[mostrar.selectedIndex].value;
    if(select == "todos"){
        arraymostrado = carros[carroaberto].gastos
        reloadgastos(carroaberto)
    }
    if(select == "30d"){
        const ultimos30 = carros[carroaberto].gastos.filter(obj => 
            obj.data > data30
        )  
        document.querySelector('#containergastos').innerHTML=""
    const arraygastos = ultimos30
    if (arraygastos != ""){arraygastos.forEach((obj, i) => {
        const divNova = document.createElement('div')
        divNova.classList.add('gasto')
        divNova.innerHTML=`${obj.prestador} | ${(obj.data).split('-').reverse().join('/')} | R$${(obj.valor).toFixed(2)}`
        const p = document.createElement('p')
        p.innerHTML=`${obj.descrição} | <i onclick='excluirgasto(${carroaberto},${i})'class="bi bi-trash-fill"></i>`
        divNova.appendChild(p)
        document.querySelector('#containergastos').appendChild(divNova)
        arraymostrado = arraygastos
    })}
    }
    if(select == "mesAtual"){

        const mesatual = carros[carroaberto].gastos.filter(obj => { 
            const data = new Date(obj.data)
            const month = data.toLocaleString('default', { month: 'long' });
            return month == monthatual
        }
            
        )  

        document.querySelector('#containergastos').innerHTML=""
    const arraygastos = mesatual
    if (arraygastos != ""){arraygastos.forEach((obj, i) => {
        const divNova = document.createElement('div')
        divNova.classList.add('gasto')
        divNova.innerHTML=`${obj.prestador} | ${(obj.data).split('-').reverse().join('/')} | R$${(obj.valor).toFixed(2)}`
        const p = document.createElement('p')
        p.innerHTML=`${obj.descrição} | <i onclick='excluirgasto(${carroaberto},${i})'class="bi bi-trash-fill"></i>`
        divNova.appendChild(p)
        document.querySelector('#containergastos').appendChild(divNova)
        arraymostrado = arraygastos
    })}
        
    }
    if(select == "ultimoMes"){

        const ultimomes = carros[carroaberto].gastos.filter(obj => { 
            const data = new Date(obj.data)
            const month = data.toLocaleString('default', { month: 'long' });
            return month == monthpassado
        }
            
        )  

        document.querySelector('#containergastos').innerHTML=""
    const arraygastos = ultimomes
    if (arraygastos != ""){arraygastos.forEach((obj, i) => {
        const divNova = document.createElement('div')
        divNova.classList.add('gasto')
        divNova.innerHTML=`${obj.prestador} | ${(obj.data).split('-').reverse().join('/')} | R$${(obj.valor).toFixed(2)}`
        const p = document.createElement('p')
        p.innerHTML=`${obj.descrição} | <i onclick='excluirgasto(${carroaberto},${i})'class="bi bi-trash-fill"></i>`
        divNova.appendChild(p)
        document.querySelector('#containergastos').appendChild(divNova)
        arraymostrado = arraygastos
    })}
        
    }

})
   
     

    


//uploadimg imgur
const alt = ""
const doUpload = (url, options) => {
    const promiseCallback = (resolve, reject) => {
    fetch(url, options)
    .then(response => response.json())
    .then(resolve)
    .catch(reject);
}
return new Promise(promiseCallback
    )}

const onSucess = (result) => {
    const alt = document.querySelector('#alt').value
    const {data: {link}} = result
    console.log(link);
    const novafoto = {
        alt: alt,
        foto: link,
        id: fotoscarros.length
    }
    console.log(novafoto);
    fotoscarros.push(novafoto)
    localStorage.setItem('fotoscarros', JSON.stringify(fotoscarros))
    
}

const uploadImage = (e) => {
    e.preventDefault()
    
    console.log(alt);
    const file = document.getElementById('upload')
    const data = new FormData()
    data.append('image', file.files[0])

    doUpload('https://api.imgur.com/3/image', {
      method: 'POST',
      body: data,
      headers: {
        'Authorization': `Client-ID 3ef67356159e81e`
      }
    })
    .then(onSucess)
    .catch(console.error);
  }

const form = document.getElementById('upload-form')
form.addEventListener('submit', uploadImage)

document.querySelector('#resetfotos').addEventListener('click', () => {
 const ver = confirm('Deseja resetar para fotos padrão? Todos adicionados pelo usuário seerão apagadas.')
    if (ver){
        fotoscarros = carrosinicial
        localStorage.setItem('fotoscarros', JSON.stringify(fotoscarros))
        window.location.reload()
    }
})