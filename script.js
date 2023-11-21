var dados = [
    {id: 1, nome: 'Felipe Carro'},
    {id: 2, nome: 'João Victor'},
    {id: 3, nome: 'Gustavo Tacaki'},
    {id: 4, nome: 'Any Velasco'},
    {id: 5, nome: 'Ana Carolina'},
]

function montarTabela(){
    let tbody = document.querySelector('#tb-body');
    let html ='';
    /* DATA ATTRIBUTES (ou atributos de dados) - a sintaxe é simples.
    O data-*atributo é usado para armazenar dados personalizados privados da página ou aplicativo.

    O data-*atributo nos dá a capacidade de incorporar atributos de dados personalizados em todos os elementos HTML.

    Os dados armazenados (personalizados) podem então ser usados ​​no JavaScript da página para criar uma experiência de usuário mais envolvente (sem quaisquer chamadas Ajax ou consultas de banco de dados do lado do servidor).

    O data-*atributo consiste em duas partes:

    O nome do atributo não deve conter letras maiúsculas e deve ter pelo menos um caractere após o prefixo "data-"
    O valor do atributo pode ser qualquer string
    Nota: Atributos personalizados prefixados com "data-" serão completamente ignorados pelo agente do usuário.

 */
    for(let item of dados){
        html +=`
            <tr>
                <td><input type="checkbox" data-id="${item.id}"></td>
                <td>${item.nome}</td>
                <td><a class="btnExcluir" onclick="excluirItem(${item.id})">&#9746;</a></td>
            </tr>
        
        `;
    }  
    //Associar a string html com as linhas da tabela no objeto tbody da tabela
    tbody.innerHTML = html;
}

function adicionarItem(){
    let nomeInput = document.querySelector('#txt-texto');
    let novoObj = {id: new Date().getTime() //Vai pegar a hora em milesegundos e representar odi
     ,nome:nomeInput.value}

     dados.push(novoObj);
     montarTabela();
     nomeInput.value='';
     nomeInput.focus(); //Coloca o foco no elemento
}

function excluirItem(idDel){
    let vetAux = [];//Vamos usar esta lista para colocar os objetos que permanecerão no vetor
    for (let i=0; i<dados.length; i++){
        if(dados[i].id != idDel)
            vetAux.push(dados[i]);
    }


    //atualizar o vetor de objetos sem o elemento que foi selecionado para a exclusão e montar a tabela novamente para atualizar a tela
    dados = vetAux;
    montarTabela();
}

function excluirSelecionados(){
    //pegar todos os checkboz da tela e colocar eles num vetor 
    let vetCheckbox = document.querySelectorAll('[data-id]'); // usou a data attrubutes que foi definido no momento da criação de cada checkbox

    //verificar se o elementos esta selecionados
    if(vetCheckbox.length>0){
        // percorrer o vetor e apagar os que tem o checkbox selecionados
        for(let ck of vetCheckbox){
            if(ck.checked == true)
                excluirItem(ck.dataset.id);
        }

    }else alert('Não tem itens selecionados para setem excluídos!!')
}


function selecionarTodos(){
    //pegar todos o checkbox da tela e colar eles num vetor
    let vetCheckbox = document.querySelectorAll('[data-id]');  // usou o data attrubutes
    let ckPai = document.querySelector('#ckTodos');
    for(let ck of vetCheckbox){
        ck.checked = ckPai.checked; // vai colocar todos os checkbox da tabela do mesmo jeito
    }
    

}
//Aqui será a parte que funcionará como o programa principal
document.addEventListener('DOMContentLoaded', 
    function(){
        montarTabela();

        let btnAdd = document.querySelector('#btn-add');
        btnAdd.addEventListener('click', adicionarItem);

        var btnExcluirSelec = document.querySelector('#btnExcluirSelecionados');
        btnExcluirSelec.addEventListener('click', excluirSelecionados);

        let ckPai = document.querySelector('#ckTodos');
        ckPai.addEventListener('click', selecionarTodos);
    },false);