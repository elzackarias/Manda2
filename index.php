<?php
session_start();
require_once 'lib/config.php';
if(!isset($_GET['tk']) OR !isset($_GET['auth']) OR $_GET['auth'] != 'aARcstApqQeeaDmv'){
  http_response_code(400);

 //header('location: ../donexist.php');
} 
$token = $_GET['tk'];
//Consultamos si el token existe en la db
$comp = mysqli_query($connect,"SELECT token FROM usuarios WHERE token = '$token' AND recover = '0'");
if(mysqli_num_rows($comp) == 0){
  http_response_code(400);  
  exit;
  //header('location: ../donexist.php');
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

    <title>Restablecer contraseña - Manda2</title>

    <link rel="canonical" href="https://getbootstrap.com/docs/4.0/examples/sign-in/">

    <!-- Bootstrap core CSS -->
    <link href="css/bootstrap.min.css" rel="stylesheet">

    <!-- Custom styles for this template -->
    <link href="css/signin.css" rel="stylesheet">
  </head>

  <body class="text-center">
    <form class="form-signin" method="POST">
      <img class="mb-4" src="images/logotipo-borde.png" alt="" width="110" height="110" style="margin-bottom:10px !important;">
      <h1 class="h3 mb-3 font-weight-normal" style="margin-bottom: 3px !important;">Restablecer contraseña</h1>
      <label for="inputPassword" style="margin-bottom: 10px;">6 caracteres como mínimo</label>
      <input type="password" id="pass1" name="pass1" class="form-control" placeholder="Nueva contraseña" required autofocus>
      <input type="password" id="pass1" name="pass2" class="form-control" placeholder="Vuelva a escribir la contraseña" required>
      <button class="btn btn-lg btn-primary btn-block" name="restablecer" type="submit">Restablecer</button>
      <p class="mt-5 mb-3 text-muted">&copy; Manda2 - 2021</p>
    </form>
    <?php
    if(isset($_POST['restablecer'])){
        $pass1 = mysqli_real_escape_string($connect,$_POST['pass1']);
        $pass1 = strip_tags($_POST['pass1']);
        $pass1 = trim($_POST['pass1']);

        $pass2 = mysqli_real_escape_string($connect,$_POST['pass2']);
        $pass2 = strip_tags($_POST['pass2']);
        $pass2 = trim($_POST['pass2']);

        if($pass1 == '' || $pass2 == ''){
          echo "<script>alert('Rellene el formulario plocs :/');</script>";
          exit;
        }

        if($pass1 == $pass2){
          if(strlen($pass1) < 6){
            echo "<script>alert('La contraseña tiene menos de 6 caracteres :/');</script>";
          }else{
            $password = password_hash($pass1, PASSWORD_ARGON2I);
            $update = mysqli_query($connect,"UPDATE usuarios SET password = '$password', recover = '1' WHERE token = '$token'");
            if($update){
              $_SESSION['success'] = true;
              echo '<script language="javascript">window.location="success.php"</script>';
            }
          }
        }else{
            echo "<script>alert('Las contraseñas no coinciden, escribalas de nuevo plocs :3');</script>";
        }
    }
    ?>
  </body>
</html>
