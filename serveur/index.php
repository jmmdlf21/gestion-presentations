<?php
require_once('includes/chargementClasses.inc.php');

// commandes de debug 
// echo "SERVER_PROTOCOL : ".$_SERVER["SERVER_PROTOCOL"]."<br>";
// echo "REQUEST_METHOD  : ".$_SERVER["REQUEST_METHOD"]."<br>";
// echo "REQUEST_URI     : ".$_SERVER["REQUEST_URI"]."<br>";
// echo "QUERY_STRING    : ".$_SERVER["QUERY_STRING"]."<br>";

// directives nécessaires pour le cross-domain avec l'environnement de développement
// ---------------------------------------------------------------------------------

header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");
header("Access-Control-Allow-Origin: *");


new Routeur;