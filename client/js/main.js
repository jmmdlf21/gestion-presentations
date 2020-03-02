let gestionPresentations = function() {

	//const BASE_URI = "http://localhost/tp2/serveur/";
	const BASE_URI = "http://localhost:8080/tp2/serveur/";

	let oGestionPresentations = {

		/**
		 * Récupération de la liste des présentations
		 * avec une requête ajax
		 */
		listerPresentations() {
			$.get({url:BASE_URI+"themes", cache:false}).
			done((themesJson) => {
				let themes = JSON.parse(themesJson);
				this.afficherPresentations(themes);
			}).
			fail(this.afficherErreur);
		},		
		
		/**
		 * Formulaire d'ajout d'une présentation
		 * avec une requête ajax
		 */
		ajouterPresentation() {
			
			// réinitialisation de la zone commune d'affichage dynamique
			// ---
			$("#wrapper").html("");
			
			// insertion du formulaire à partir d'un clone du template
			// ---
			let t = $("#t-presentationAjout").prop("content");
			let tClone = t.cloneNode(true);
			$("#wrapper").append(tClone);
			
			// création du listener associé au bouton de validation
			// ---
			$("#bValider").click(() => {
				
				// excécution de la requête ajax de modificaiton
				// si les contrôles de saisie sont validés
				// ---
				if (this.controlerSaisie()) {
					
					// sérialisation des données saisies 
					// ---
					let donnees = $("form").serialize();
					
					// exécution de la requête ajax POST (création d'une presentation)
					// ---
					$.ajax({url:BASE_URI+"presentations", data: donnees, type:"POST"}).
					done((reponseJson) => {
						let reponse = JSON.parse(reponseJson);
						
						// préparation d'un message de compte-rendu
						// et affichage de la page de liste
						// ---
						let ret = "Presentation" + (!reponse['ret'] ? " non" : "") + " ajoutée.";  
						this.afficherPresentations(reponse["presentations"], ret);  	
					}).
					fail(this.afficherErreur);
				}
			});
		},

		/**
		 * Formulaire de modification d'une présentation
		 * avec une requête ajax
		 */
		modifierPresentation(event) {
			
			// requête ajax de récupération des données d'une présentation à modifier
			// pour les afficher dans le formulaire
			// ---

			let id = event.target.dataset.id;

			$.get({url:BASE_URI+"presentations/"+id, cache:false}).
			done((presentationJson) => {
				let p = JSON.parse(presentationJson);

				// réinitialisation de la zone commune d'affichage dynamique
				// ---
				$("#wrapper").html("");
				
				// insertion du formulaire avec intégration des données de la présentation
				// à partir d'un clone du template
				// ---
				let t = $("#t-presentationModification").prop("content");
				let tClone = t.cloneNode(true);
				let e = tClone.lastElementChild;
				$(e).html(eval("`"+$(e).html()+"`"));
				$("#wrapper").append(tClone);
				
				// création du listener associé au bouton de validation
				// ---
				$("#bValider").click(() => {
					// excécution de la requête ajax de modificaiton
					// si les contrôles de saisie sont validés
					// ---
					if (this.controlerSaisie()) {
						
						// sérialisation des données saisies 
						// ---
						let donnees = $("form").serialize();
						
						// exécution de la requête ajax PUT (création d'une presentation)
						// ---
						$.ajax({url:BASE_URI+"presentations/"+id, data: donnees, type:"PUT"}).
						done((reponseJson) => {
							let reponse = JSON.parse(reponseJson);
						
							// préparation d'un message de compte-rendu
							// et affichage des messages
							// ---
							let ret = "Presentation" + (!reponse['ret'] ? " non" : "") + " modifiée.";  
							this.afficherPresentations(reponse["presentations"], ret);  	
						}).
						fail(this.afficherErreur);
						}
				});
			}).
			fail(this.afficherErreur);
		},

		/**
		 * Suppression d'une présentation
		 * avec une requête ajax
		 */
		supprimerPresentation(event) {			
			// excécution de la requête ajax de suppression
			// ---
			let id = event.target.dataset.id;
			$.ajax({url:BASE_URI+"presentations/"+id, type:"DELETE"}).
			done((reponseJson) => {
				let reponse = JSON.parse(reponseJson);
				let ret = "Presentation numéro " + id + (!reponse['ret'] ? " non" : "") + " supprimée.";  
				this.afficherPresentations(reponse["presentations"], ret);  
			}).
			fail(this.afficherErreur);
		},


		/**
		 * Affichage d'un message d'erreur suite à un problème technique
		 * en retour d'une requête ajax
		 */
		afficherErreur(erreur) {
			$("#wrapper").html("");
			$("#erreur").html(
				erreur.status + " " + erreur.statusText + "<br>" + erreur.responseText);	
		},


		/**
		 * Affichage de la liste des présentations
		 * en retourd'une requête ajax
		 */
		afficherPresentations(themes, ret) {		
			// réinitialisation de la zone d'affichage dynamique
			// ---
			$("#wrapper").html("");
			
			// insertion de la liste de thématiques à partir d'un clone du template (t)
			// ---
			let t = $("#t-presentationsListe").prop("content");
			let tClone = document.importNode(t,true);
			$("#wrapper").append(tClone);
			if (ret) $("#ret").html(ret);
			
			// Insertion des presentations
			// ---

			function ajouteThemes(themes) {
				return new Promise((resolve, reject) => {
					$(themes).each((i, c) => {
						let theme = c.thematique;
						
						// Creation de l'element html qui contiens le contenu obtenu de la base de données
						// ---

						// Pour ne montrer le contenu qu'une fois que le tout a chargé	
						$("#wrapper").addClass("displayNone");

						let html  =	"<h3 class='thematique'>" + theme + "</h3>";
						html     += "<div class='presentation accordion2'>";
						html     += "<ul class='sortable'>";

						ajouteMessages(theme).then((htmlMess) => {
							html += htmlMess;
							html +=	"</ul></div>";
							$("#accordionThematiques").append(html);												
						});
						
						function ajouteMessages(theme) {
							let htmlMess = "";
							return new Promise((resolve, reject) => {
							
								// Boucle pour obtenir les presentations
								// ---

								$.get({url:BASE_URI+"themes/"+theme, cache:false}).
								done((presentationsJson) => {
									let presentations = JSON.parse(presentationsJson);
									let htmlMess = "";
									$(presentations).each((i, c) => {
										htmlMess += "<li>";
										htmlMess +=   "<h4>" + c.titre + "</h4>";
										htmlMess +=   "<div class='presentation'>";
										htmlMess +=     "<h5><span>Presenté le </span>"+c.date+"</h5>";										
										htmlMess +=     "<h6>"+c.resume+"</h6>";
										htmlMess +=     "<span data-action='modifier'";  
										htmlMess +=     "data-id='"+c.id_presentation+"'>Modifier</span>";
										htmlMess +=     "<span data-action='supprimer'"; 
										htmlMess +=     "data-id='"+c.id_presentation+"'>Supprimer</span>";
										htmlMess +=     "<h5><span>De </span>"+c.heure_debut;
										htmlMess +=     "<span> À </span>"+c.heure_fin+"</h5>";	
										htmlMess +=     "<h5><span>Presenté par </span>"+c.presentateur+"</h5>";										
										htmlMess +=     "<h5><span>Salle </span>"+ c.salle+"</h5>";
										htmlMess +=   "</div>";
										htmlMess += "</li>";
									});
									resolve(htmlMess);									
								}).
								fail(this.afficherErreur);					
							});
						}
					});

					// Ceci verifie si la page a terminé de charger
					// ---

					setInterval(function(){ 
						if($("#accordionThematiques").children().length == themes.length * 2)
							resolve();
					}, 500);
				}).catch(() => {
					$("#wrapper").html("");
					$("#erreur").html("Erreur lors du chargement du contenu");	
				});
			}

			// Rajout des effets accordion, sortable
			// ---

			ajouteThemes(themes).then(() => {

				// Affiche le contenu	
				$("#wrapper").removeClass("displayNone");

				$(".accordion").accordion({
					collapsible: true,
					active: false,
					animate: 500,
					header: "h3",
					heightStyle: "content"
				});
	
				$(".accordion2").accordion({
					collapsible: true,
					active: false,
					animate: 500,
					header: "h4",
					heightStyle: "content"
				});	
				
				$(".sortable").sortable();			
	
				// création des listeners associés aux spans des actions
				// ---
				$("#wrapper [data-action='ajouter']").click(this.ajouterPresentation.bind(this));
				$("#wrapper [data-action='modifier']").click(this.modifierPresentation.bind(this));
				$("#wrapper [data-action='supprimer']").click(this.supprimerPresentation.bind(this));
			});
		},

		/**
		 * Contrôle de la saisie
		 */
		controlerSaisie() {
			let controles = {titre:        {regexp: /^[\d\Déè ]{2,}$/i, mesErr: "caractères alphanumériques uniquement. Minimum de 2 characters"},
							 resume:       {regexp: /^[\d\Déè ]{2,}$/i, mesErr: "caractères alphanumériques uniquement. Minimum de 2 characters"},
							 thematique:   {regexp: /^[\d\D ]{2,}$/i, mesErr: "caractères alphanumériques uniquement. Minimum de 2 characters"},
							 date: 	       {regexp: /^\d{4}-\d{2}-\d{2}$/, mesErr: "Date invalide."},
							 heure_debut:  {regexp: /^(?:[01]\d|2[0-3]):(?:[0-5]\d):(?:[0-5]\d)$/, mesErr: "Heure invalide."},
							 heure_fin:    {regexp: /^(?:[01]\d|2[0-3]):(?:[0-5]\d):(?:[0-5]\d)$/, mesErr: "Heure invalide."},
							 salle:        {regexp: /^[\d\Déè ]+$/i, mesErr: "caractères alphanumériques uniquement."},
							 presentateur: {regexp: /^[\d\Déè ]+$/i, mesErr: "caractères alphanumériques uniquement."},
							 institution:  {regexp: /^[\d\Déè ]+$/i, mesErr: "caractères alphanumériques uniquement."}
			};
			let valide = true;
			for (controle in controles) {
				let mesErr = "";
				let c = controles[controle];
				if (!c.regexp.test(frm[controle].value)) {
					valide = false;
					mesErr = c.mesErr;
				}			
				$("#"+controle+"_err").html(mesErr);
			}
			return valide; 
		}
	}
	return oGestionPresentations;
}();