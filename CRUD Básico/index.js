document.addEventListener("DOMContentLoaded", function() {
  let registros = []
  let editingIndex = -1

  // Referência ao formulário e à tabela HTML
  const form = document.forms["formulario-registro"]
  const tblDados = document.getElementById("tblDados").getElementsByTagName("tbody")[0]

  // Função para carregar registros do localStorage ao carregar a página
  function carregarRegistros() {
    const registrosLocalStorage = localStorage.getItem('registros');
    if (registrosLocalStorage) {
      registros = JSON.parse(registrosLocalStorage)
      atualizarTabela()
    }
  }
  carregarRegistros()


  // Evento de submissão do formulário de registro
  form.addEventListener("submit", function(event) {
    event.preventDefault()
    event.stopPropagation()

    if (form.checkValidity()) { 
      // Cria um objeto com os dados do registro a partir dos campos do formulário
      const registro = {
        nome: form["txtNome"].value,
        sobrenome: form["txtSobrenome"].value,
        dtNascimento: form["txtDtNascimento"].value,
        formacao: form["txtFormacao"].value
      };

      if (editingIndex >= 0) { 
        registros[editingIndex] = registro
        editingIndex = -1
      } else {
        registros.push(registro)
      }

      atualizarTabela()
      salvarRegistros()
      form.reset()
      
      const registroModal = bootstrap.Modal.getInstance(document.getElementById('registroModal'))
      registroModal.hide()
      
    }
  });

  // Função para atualizar a tabela com os registros armazenados
  function atualizarTabela() {
    tblDados.innerHTML = ""

    registros.forEach((registro, index) => {
      const row = tblDados.insertRow()

      // Insere as células com os dados do registro
      row.insertCell(0).innerText = index + 1
      row.insertCell(1).innerText = registro.nome
      row.insertCell(2).innerText = registro.sobrenome
      row.insertCell(3).innerText = registro.dtNascimento
      row.insertCell(4).innerText = registro.formacao

      // Cria botões de edição e exclusão para cada registro
      const btnEdit = document.createElement("button");
      btnEdit.className = "btn btn-warning";
      btnEdit.innerHTML = '<i class="bi bi-pencil"></i>';
      btnEdit.addEventListener("click", function() {
        editarRegistro(index); // Chama a função para editar o registro
      });

      const btnDelete = document.createElement("button");
      btnDelete.className = "btn btn-danger";
      btnDelete.innerHTML = '<i class="bi bi-trash"></i>';
      btnDelete.addEventListener("click", function() {
        deletarRegistro(index); // Chama a função para deletar o registro
      });

      // Adiciona os botões à célula de ação da linha atual
      const cellEdit = row.insertCell(5);
      const cellDelete = row.insertCell(6);
      cellEdit.appendChild(btnEdit);
      cellDelete.appendChild(btnDelete);
    });
  }


  // Função para editar um registro
  function editarRegistro(index) {
    const registro = registros[index]; // Obtém o registro pelo índice

    // Preenche os campos do formulário com os dados do registro
    form["txtNome"].value = registro.nome
    form["txtSobrenome"].value = registro.sobrenome
    form["txtDtNascimento"].value = registro.dtNascimento
    form["txtFormacao"].value = registro.formacao
    editingIndex = index; // Define o índice de edição como o índice atual
    const registroModal = new bootstrap.Modal(document.getElementById('registroModal'));
    registroModal.show(); // Abre o modal de registro para edição
    
  }

  // Função para deletar um registro
  function deletarRegistro(index) {
    registros.splice(index, 1) // Remove o registro do array pelo índice
    atualizarTabela()// Atualiza a tabela após a exclusão
    salvarRegistros() // Salva os registros atualizados no localStorage
  }

  // Função para salvar os registros no localStorage
  function salvarRegistros() {
    localStorage.setItem('registros', JSON.stringify(registros))// Converte e salva os registros como JSON
  }
});




(() => {
  'use strict'

// Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')

     // Loop over them and prevent submission
     Array.from(forms).forEach(form => {
       form.addEventListener('submit', event => {
         if (!form.checkValidity()) {
           event.preventDefault()
           event.stopPropagation()
         }

         form.classList.add('was-validated')
       }, false)
     })
   })()

