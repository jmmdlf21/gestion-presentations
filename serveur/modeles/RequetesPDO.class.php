<?php

/**
 * Classe RequetesPDO, accès PDO aux tables MySQL
 *
 */

class RequetesPDO {

    /**
     * Récupération des lignes d'une table 
     *
	 * @return array
     */
    public function getTable($table) {
        $sPDO     = SingletonPDO::getInstance();
        $cleNom   = "id_" . substr($table, 0, -1);
        $req      = "SELECT * FROM $table ";
        $req     .= "GROUP BY thematique ";
        $req     .= "ORDER BY $cleNom ASC";
		$oPDOStatement = $sPDO->prepare($req);
        $oPDOStatement->execute();
        return $oPDOStatement->fetchAll(PDO::FETCH_ASSOC);
    }

	
    /**
     * Récupération d'une ligne dans une table avec sa clé primaire
     *
	 * @return array
     */
    public function getItem($table, $cle) {
        $sPDO = SingletonPDO::getInstance();
		$cleNom   = "id_" . substr($table, 0, -1);
        $req = "SELECT * FROM $table WHERE $cleNom=:$cleNom";
		$oPDOStatement = $sPDO->prepare($req);
        $oPDOStatement->bindValue(":$cleNom", $cle);
        $oPDOStatement->execute();
        return $oPDOStatement->fetch(PDO::FETCH_ASSOC);
    }

    /**
     * Récupération des ligne dans une table par thématique
     *
	 * @return array
     */
    public function getItemsByTheme($table, $cle) {
        $sPDO   = SingletonPDO::getInstance();
		$cleNom = "thematique";
        $req = "SELECT * FROM $table WHERE $cleNom=:$cleNom";
		$oPDOStatement = $sPDO->prepare($req);
        $oPDOStatement->bindValue(":$cleNom", $cle);
        $oPDOStatement->execute();
        return $oPDOStatement->fetchAll(PDO::FETCH_ASSOC);
    }    
    
    /**
     * Ajout d'un item dans une table
     *
	 * @return boolean false if no row added in the main table, true otherwise
     */
    public function postItem($table, $champs) {
        $sPDO = SingletonPDO::getInstance();
        $req  = "INSERT INTO $table SET ";
        foreach ($champs as $nom => $valeur) {
			$req .= $nom."=:".$nom.", "; 
        }
        $req = substr($req, 0, -2);
        $oPDOStatement = $sPDO->prepare($req);
        foreach ($champs as $nom => $valeur) {
			$oPDOStatement->bindValue(":".$nom, $valeur);
        }
        $oPDOStatement->execute();
        if ($oPDOStatement->rowCount() == 0) {
			return false;
        } else {
			return true;
        }
    }
 
    /**
     * Modification d'un item dans une table
     *
	 * @return boolean false if no row modified in the main table, true otherwise
     */
    public function putItem($table, $champs, $id_presentation) {
        $sPDO = SingletonPDO::getInstance();
        $cleNom = "id_" . substr($table, 0, -1);       
        $req  = "UPDATE $table SET ";
        foreach ($champs as $nom => $valeur) {
			$req .= $nom."=:".$nom.", "; 
        }
        $req = substr($req, 0, -2);
        $req .= " WHERE id_presentation= :id";
        $oPDOStatement = $sPDO->prepare($req);
        foreach ($champs as $nom => $valeur) {
			$oPDOStatement->bindValue(":".$nom, $valeur);
        }
        $oPDOStatement->bindValue(":id", $id_presentation);
        $oPDOStatement->execute();
        if ($oPDOStatement->rowCount() == 0) {
			return false;
        } else {
			return true;
        }
    }
	
    /**
     * Suppression d'un item dans une table
     *
	 * @return boolean false if no row deleted in the main table, true otherwise
     */
    public function deleteItem($table, $cle) {
        $sPDO = SingletonPDO::getInstance();
		$cleNom = "id_" . substr($table, 0, -1);
		$oPDOStatement = $sPDO->prepare("DELETE FROM $table WHERE $cleNom=:$cleNom");
		$oPDOStatement->bindValue(":".$cleNom, $cle);
		$oPDOStatement->execute();
		if ($oPDOStatement->rowCount() == 0) {
			return false;
		} else {
			return true;
		}
    }
}