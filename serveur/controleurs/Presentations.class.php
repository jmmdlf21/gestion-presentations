<?php

/**
 * Classe Contrôleur des présentations
 *
 */

class Presentations {

	/**
	 * Liste des thematiques
	 *
	 */	
	public function getThemes() {
		$oRequetesPDO = new RequetesPDO;
		echo json_encode($oRequetesPDO->getTable("presentations"));
	}	


	/**
	 * Liste des presentations par thematique
	 *
	 */
	public function getPresentationsByTheme($theme) {
		$oRequetesPDO = new RequetesPDO;
		echo json_encode($oRequetesPDO->getItemsByTheme("presentations", $theme));
	}
	
	/**
	 * Ajout d'une presentation
	 *
	 */
	public function postPresentation() {
		$oRequetesPDO = new RequetesPDO;
		$reponse["ret"]           = $oRequetesPDO->postItem("presentations", $_POST);
		$reponse["presentations"] = $oRequetesPDO->getTable("presentations");
		echo json_encode($reponse);
	}

	/**
	 * Information sur une presentation
	 *
	 */
	public function getPresentation($id_presentation) {
		$oRequetesPDO = new RequetesPDO;
		echo json_encode($oRequetesPDO->getItem("presentations", $id_presentation));
	}

	/**
	 * Modification d'une presentation
	 *
	 */
	public function putPresentation($id_presentation) {
		$oRequetesPDO = new RequetesPDO;
		
		parse_str(file_get_contents("php://input"), $presentation);
		$reponse["ret"]           = $oRequetesPDO->putItem("presentations", $presentation, $id_presentation);
		$reponse["presentations"] = $oRequetesPDO->getTable("presentations");
		echo json_encode($reponse);
	}

	/**
	 * Suppression d'une presentation
	 *
	 */
	public function deletePresentation($id_presentation) {
		$oRequetesPDO = new RequetesPDO;
		$reponse["ret"]     	  = $oRequetesPDO->deleteItem("presentations", $id_presentation);
		$reponse["presentations"] = $oRequetesPDO->getTable("presentations");
		echo json_encode($reponse);
	}
}