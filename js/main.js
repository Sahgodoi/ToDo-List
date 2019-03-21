/**/
function openEdit(){
	var click = document.getElementById("id01").style.display="block";
}

$ (document) .ready (function () {
  $ ('input'). iCheck ({
    checkboxClass: 'icheckbox_minimal',
    radioClass: 'iradio_minimal',
    increaseArea: '20% ' // opcional
  });
});

$(function(){

	var operacao = "A"; //"A"=Adição; "E"=Edição

	var indice_selecionado = -1;

	var listStorage = localStorage.getItem("listStorage");// Recupera os dados armazenados

	listStorage = JSON.parse(listStorage); // Converte string para objeto

	if(listStorage == null) // Caso não haja conteúdo, iniciamos um vetor vazio
		listStorage = [];


	var date = new Date();
	var month = date.toLocaleString("pt-br", { month: "short" });
	var day = date.getDate();
	var hour_now = date.getHours();
	var minutes = date.getMinutes();
	var dateNow = "Criado em " + day + " de " +month+ " as " +hour_now+ ":" +minutes;


	
	function Adicionar(){

		var taskList = JSON.stringify({
			Date_now : dateNow,
			Desc     : $("#descricao").val(),
			Date : $("#data").val(),
			Begin    : $("#time").val(),
			End    : $("#time2").val(),
			Tag    : $("#tag").val(),
		});

		listStorage.push(taskList);


		localStorage.setItem("listStorage", JSON.stringify(listStorage));
		return true;
	}

	function Editar(){
		listStorage[indice_selecionado] = JSON.stringify({
			Date_now : dateNow,
			Desc     : $("#descricao").val(),
			Date : $("#data").val(),
			Begin    : $("#time").val(),
			End    : $("#time2").val(),
			Tag    : $("#tag").val(),
		});
		localStorage.setItem("listStorage", JSON.stringify(listStorage));
		alert("Informações editadas.")
		operacao = "A";
		return true;
	}

	function Listar(){
		$("#tblListar").html("");
		$("#tblListar").html(
			"<hr>"
			);

		for(var i in listStorage){
			var taskItem = JSON.parse(listStorage[i]);

			$("#tblListar").prepend(
				"<div class='grid w3-quarter w3-row-padding'>"+
				"<li class='li w3-card-4 w3-margin-top w3-padding w3-round-large'>"+
				"<span id='create_hour' class='create_hour'>"+taskItem.Date_now+"</span>" + 
				"<p>"+taskItem.Desc+"</p>" + 
				"<p>"+taskItem.Date+"</p>" + 
				"<p>Início: "+taskItem.Begin+" Término: "+taskItem.End+"</p>" + 
				"<p class='w3-tag w3-white' id='tag'>"+taskItem.Tag+"</p>" + 
				"<p><span id='clock'></span></p>"+
				"<p class='w3-center'> <button alt='"+i+"' class='btnEditar w3-right w3-btn w3-round-large fas fa-pencil-alt' onclick='openEdit();'></button>  <button  alt='"+i+"' class='btnExcluir  w3-btn w3-round-large fa fa-trash'></button></p>" + 
				"</li>"+
				"</div>"
				);

			$('#clock').countdown(taskItem.Date, function(event) {
				$(this).html(event.strftime('Faltam %D dia(s)  %H:%M '));
			});

			
		}

		
	}

	function Excluir(){
		listStorage.splice(indice_selecionado, 1);
		localStorage.setItem("listStorage", JSON.stringify(listStorage));
		alert("Tarefa excluída.");
	}

	function GetTask(propriedade, valor){
		var taskItem = null;
		for (var item in listStorage) {
			var i = JSON.parse(listStorage[item]);
			if (i[propriedade] == valor)
				taskItem = i;
		}
		return taskItem;
	}

	Listar();

	$("#frmCadastro").on("submit",function(){
		if(operacao == "A")
			return Adicionar();
		else
			return Editar();		
	});

	$("#tblListar").on("click", ".btnEditar", function(){
		operacao = "E";
		indice_selecionado = parseInt($(this).attr("alt"));
		var taskItem = JSON.parse(listStorage[indice_selecionado]);
		
		$("#titulo").val(taskItem.Title);
		$("#descricao").val(taskItem.Desc);
		$("#data").val(taskItem.Date);
		$("#time").val(taskItem.Begin);
		$("#time2").val(taskItem.End);
		$("#tag").val(taskItem.Tag);
		$("#titulo").focus();
	});

	$("#tblListar").on("click", ".btnExcluir", function(){
		indice_selecionado = parseInt($(this).attr("alt"));
		Excluir();
		Listar();
	});
});

