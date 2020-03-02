<?php

/**
 * Classe d'enregistrement de traces dans un fichier log
 *
 */
class TraceDebug
{

    const  LOG_PATH = 'trace-debug.log';
    
    public static function log($message) {

        // Ouverture du fichier en mode "a=append", crée le fichier s'il n'existe pas
        $nfile = fopen(self::LOG_PATH, "a");

        // Horodatage du message et ajout de 2 caractères de passage à la ligne
        $value =date("Y-m-d H:i:s")." ".$message."\n\n";

        // Ecriture du message à la fin du fichier (car ouvert en mode "append")
        fwrite($nfile, $value);

        // Fermeture du fichier
        fclose($nfile); 
    }
}
