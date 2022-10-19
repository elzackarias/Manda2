<?php
session_start();
if(!isset($_SESSION['success'])){
	http_response_code(400);  
 	exit;
}else{
	unset($_SESSION['success']);
	session_destroy();
}
?>

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="">
    <meta name="author" content="">
    <link rel="icon" href="images/logotipo-borde.png">

    <title>Listoo - Manda2</title>

    <link rel="canonical" href="https://getbootstrap.com/docs/4.0/examples/sign-in/">

    <!-- Bootstrap core CSS -->
    <link href="css/bootstrap.min.css" rel="stylesheet">

    <!-- Custom styles for this template -->
    <link href="css/signin.css" rel="stylesheet">
  </head>

  <body class="text-center">
    <form class="form-signin" method="POST">
      <img class="mb-4" src="../images/palomita.png" alt="" width="105" height="105" style="margin-bottom:10px !important;">
      <h1 class="h3 mb-3 font-weight-normal" style="margin-bottom: 3px !important;">Contraseña restablecida</h1>
      <p>Ahora inicia sesión en la App :3</p>
    </form>
      </body>
</html>
