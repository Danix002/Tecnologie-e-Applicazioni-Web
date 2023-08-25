<?php
  if(!isset($_SESSION)) { session_start(); }

  if(isset($_SESSION["username"])){
    $isAdmin = $_SESSION["isAdmin"];
  }else{
    $isAdmin = 0;
  }
?>

<nav>
    <ul class = "menu">
      <li id = "home">Home</li>
      <?php if(!$isAdmin){?>
        <li id = "myAccount">My Account</li>
      <?php } ?>
      <li id = "products">Piatti proposti</li>
      <li id = "hourly">Orario</li>
      <li id = "profile">Chi sono</li>
      <li id = "contacts">Contatti</li>
      <li id = "etics">La mia etica</li>
      <?php if($isAdmin){?>
        <li id = "liAdmin">Account Admin</li>
      <?php } ?>
    </ul>
</nav>
