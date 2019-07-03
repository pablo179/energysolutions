<?php
    $destino = "mendozagarciaruben51@gmail.com";
    $asunto = $_POST['asunto'];
    $mensaje = $_POST['mensaje'];
    mail($destino,$asunto,$mensaje);
?>