function entrar(){
    window.location.href = "produtos.html";
}


// CADASTRO NOVO USUARIO
//na tela de cadastro o botão de confirmação tem que chamar essa função aqui:

function cadastraUsuario() { 
//const codigo = document.getElementById("enviar").value            //mudar id de 'enviar' para 'codigo' no HTML  e aqui
//const senha = document.getElementById("senha").value              //criar campo input para senha com id='senha' de onde ele vai
                                                                    //capturar a senha digitada pelo usuario 

const usuario = {         
    username: document.getElementById("enviar").value,
    password: document.getElementById("senha").value,
}

const json = JSON.stringify(usuario);
localStorage.setItem(username, json);

alert("Usuario cadastrado com sucesso!")
}

//LOGIN com verificação LOCALSTORAGE
//Usuário vai preencher o formulario de login e clicar no botão que executa onclick essa função aqui:

function userLogin(e) {
    event.preventDefault();

    const username = document.getElementById('codigo'); // aqui ele recebe do usuario usuario e senha
    const password = document.getElementById('senha');

    const user = localStorage.getItem(username); // aqui ele puxa do localstorage usuario e senha armazenados lá
    const data = JSON.parse(user);

    if (username == data.username && password == data.password) { // aqui ele compara o input do usuario com os dados do localstorage
        entrar()                                                  // se der TRUE, ele roda a função entrar que leva o usuario pra aplicação
    }else {
        alert('Código ou senha inválidos. Tente novamente.')      // se der FALSE ele mostra um alert e não deixa entrar.
    }
}

function cadastraCarro () {  // criar campo de input na tela de cadastro com os id indicanado bem qual info vai em cada campo.
    const carro = {         
        foto: document.getElementById('fotoCarro'),
        marca: document.getElementById('marca'),
        modelo: document.getElementById('modelo'),
        ano: document.getElementById('ano'),
        valorCompra: document.getElementById('valorCompra'),
        gastoOficina: document.getElementById('gastoOficina'),
        valorVenda: document.getElementById('valorVenda')
    }
 
    const carrosJson = JSON.stringify(carro);
    localStorage.setItem(carrosJson, json);
    
    alert("Carro cadastrado com sucesso!")
    }




  /*  
  agora é dar um jeito de criar uma div que puxe a foto de algum lugar, esses dados da função cadastroCarro
   a gente chama dando um localStorage.getItem(carrosJson)
   aí fica
    
    const carro = localStorage.getItem(carrosJson);
    const carroDisplay = JSON.parse(carro);

   foto: não sei direito como fazer
   marca = carroDisplay.marca;
   modelo: carroDisplay.modelo;
   ano: carroDisplay.ano;
   valorCompra: carroDisplay.valorCompra;
   gastoOficina: carroDisplay.gastoOficina;
   valorVenda: carroDisplay.valorVenda;
 */