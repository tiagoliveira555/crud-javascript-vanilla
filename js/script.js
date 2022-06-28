const btnAdicionar = document.querySelector("#btn-adicionar");
const btnCancelar = document.querySelector("#btn-cancelar");
const btnSalvar = document.querySelector("#btn-salvar");

const modal = document.querySelector(".modal");
const tbody = document.querySelector("#preencherTable");

const nomeForm = document.querySelector("#nome");
const emailForm = document.querySelector("#email");
const enderecoForm = document.querySelector("#endereco");
const cpfForm = document.querySelector("#cpf");

const getBanco = () => JSON.parse(localStorage.getItem("bd_cliente")) ?? [];
const setBanco = (bd) => localStorage.setItem("bd_cliente", JSON.stringify(bd));

const salvarNoBanco = (cliente, index = "new") => {
  const bd = getBanco();

  if (index === "new") {
    bd.push(cliente);
  } else {
    bd[index] = cliente;
  }

  setBanco(bd);
  atualizarTabela();
};

const excluirCliente = (index) => {
  const bd = getBanco();

  const { nome } = bd[index];

  const res = confirm(`Deseja realmente excluir ${nome}?`);

  if (res) {
    bd.splice(index, 1);

    setBanco(bd);
    atualizarTabela();
  }
};

const atualizarTabela = () => {
  tbody.innerHTML = "";

  getBanco().map((cliente, index) => {
    tbody.innerHTML += `
        <tr>
          <td>${cliente.nome}</td>
          <td>${cliente.email}</td>
          <td>${cliente.endereco}</td>
          <td>${cliente.cpf}</td>
          <td>
            <button class="botoes green" onClick=modalEditar(${index})>Editar</button>
            <button class="botoes red" onClick=excluirCliente(${index})>Excluir</button>
          </td>
        </tr>
      `;
  });
};

const handleSubmit = () => {
  const cliente = {
    nome: nomeForm.value,
    email: emailForm.value,
    endereco: enderecoForm.value,
    cpf: cpfForm.value,
  };

  const index = nomeForm.data_js;

  salvarNoBanco(cliente, index);

  closeModal();
};

const modalEditar = (index) => {
  openModal();
  
  const cliente = getBanco()[index];
  preencherCampos(cliente);

  nomeForm.data_js = index;
};

const preencherCampos = (cliente) => {
  nomeForm.value = cliente.nome;
  emailForm.value = cliente.email;
  enderecoForm.value = cliente.endereco;
  cpfForm.value = cliente.cpf;
};

const limparCampos = () => {
  nomeForm.value = "";
  emailForm.value = "";
  enderecoForm.value = "";
  cpfForm.value = "";

  nomeForm.data_js = "new";
};

const openModal = () => modal.classList.add("modal_open");

const closeModal = () => {
  modal.classList.remove("modal_open");
  limparCampos();
};

atualizarTabela();

btnSalvar.addEventListener("click", handleSubmit);

btnAdicionar.addEventListener("click", openModal);

btnCancelar.addEventListener("click", closeModal);
