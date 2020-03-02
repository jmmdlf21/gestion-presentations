<?php 

function chargerClasse($classe) {
    $dossiers = array('outils/', 'modeles/', 'controleurs/');
	foreach ($dossiers as $dossier) {
        if (file_exists('./'.$dossier.$classe.'.class.php')) {
            require_once('./'.$dossier.$classe.'.class.php');
		}
	}
}

spl_autoload_register('chargerClasse');
