var mytoken = "";
var element = "";
var mId = 0;
var mPrizeId = 0;

// Get a winner
function getWinner(id, prizeId) {
	mId = id;
	mPrizeId = prizeId;

	if (mytoken !== "") {

		$(element).addClass('disabled');
		$(element).html('<i class="fa fa-cog fa-spin fa-3x fa-fw" style="margin-right:5px;"></i><span class="sr-only">Loading...</span>Obteniendo ganador...');

		$.ajax({
			url: "/get-winner/",
			type: "post",
			data: JSON.stringify({"token": mytoken, "sessionId": mId, "prizeId": mPrizeId}),
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		})
			.done(function (json) {
				$('#modalsec').modal('close');
				$('#modalWinner').modal('open');

				showWinner(json);
			})
			.fail(function (xhr, status, errorThrown) {
				$("#labelforpassword").attr("data-error", "Ocurrió un problema con la petición. Inténtalo de nuevo.");
				$("#password").addClass('invalid');

				$("#butonacces").removeClass('disabled');
				$("#butonacces").html('<i class="fa fa-lock" aria-hidden="true" style="margin-right: 5px;"></i>Continuar');
			});


	} else {
		$('#modalsec').modal('open');
	}

}

function repeatWinner() {

	$.ajax({
		url: "/get-winner/",
		type: "post",
		data: JSON.stringify({"token": mytoken, "sessionId": mId, "prizeId": mPrizeId}),
		headers: {'Content-Type': 'application/x-www-form-urlencoded'}
	})
		.done(function (json) {
			showWinner(json);
		})

}

function showWinner(json) {
	json = JSON.parse(json);

	$('#winnerLoad').removeClass('hide');
	$('#winnerContent').addClass('hide');
	setTimeout(function () {
		$('#winnerName').text(json.name);
		$('#winnerId').text('Entrada: ' + json.id);
		$('#winnerLoad').addClass('hide');
		$('#winnerContent').removeClass('hide');
	}, 3000);
}

$(document).ready(function () {

	$('select').material_select();
	$('#modalsec').modal({
		dismissible: true, // Modal can be dismissed by clicking outside of the modal
		opacity: .5, // Opacity of modal background
		inDuration: 450, // Transition in duration
		outDuration: 200, // Transition out duration
		startingTop: '10%', // Starting top style attribute
		endingTop: '20%', // Ending top style attribute
		ready: function (modal, trigger) {
			$('#password').focus();
		},
		complete: function () {

		} // Callback for Modal close
	});
	$('#modalWinner').modal({
		dismissible: false, // Modal can be dismissed by clicking outside of the modal
		opacity: .5, // Opacity of modal background
		inDuration: 450, // Transition in duration
		outDuration: 200, // Transition out duration
		startingTop: '10%', // Starting top style attribute
		endingTop: '20%', // Ending top style attribute
	});

	// Submit Process of Code.
	$("#inputform").submit(function (e) {
		e.preventDefault();
		var password = document.getElementById("password").value;
		if (password === "") {
			$('#password').focus();
			$("#labelforpassword").attr("data-error", "Este campo no puede estar vacío.");
			$("#password").addClass('invalid');

		} else {
			$('#password').focus();
			$("#butonacces").addClass('disabled');
			$("#butonacces").html('<i class="fa fa-cog fa-spin fa-3x fa-fw" style="margin-right:5px;"></i><span class="sr-only">Loading...</span>Verificando...');

			mytoken = document.getElementById("password").value;
			getWinner(mId, mPrizeId);
		}

	});


});
