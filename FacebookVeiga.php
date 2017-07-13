<?php
session_start();
if($_SERVER['REQUEST_METHOD'] == 'GET' && isset($_GET['code'])){
 
  $appId = '817345081770182';
 
  $appSecret = 'deffd05b1c5a32bae59ef300e39b3f02';
 
  $redirectUri = urlencode('http://oxylgenius.freeiz.com/');
 
  $code = $_GET['code'];
 
  $token_url = "http://graph.facebook.com/oauth/access_token?"
  . "client_id=" . $appId . "&redirect_uri=" . $redirectUri
  . "&client_secret=" . $appSecret . "&code=" . $code;
 
  $response = @file_get_contents($token_url);
  if($response){
    $params = null;
    parse_str($response, $params);
    if(isset($params['access_token']) && $params['access_token']){
      $graph_url = "http://graph.facebook.com/me?access_token="
      . $params['access_token'];
      $user = json_decode(file_get_contents($graph_url));
 
      if(isset($user->email) && $user->email){
        $_SESSION['email'] = $user->email;
        $_SESSION['nome'] = $user->name;
        $_SESSION['localizacao'] = $user->location->name;
        $_SESSION['uid_facebook'] = $user->id;
        $_SESSION['user_facebook'] = $user->username;
        $_SESSION['link_facebook'] = $user->link;
      }
     
    }else{
      echo "Erro de conexão com Facebook";
      exit(0);
    }
  }else{
    echo "Erro de conexão com Facebook";
    exit(0);
  }
}else if($_SERVER['REQUEST_METHOD'] == 'GET' && isset($_GET['error'])){
  echo 'Permissão não concedida';
}
?>
 
<html>
 <head>
  <title>PHP Teste</title>
 </head>
 <body>
 <a href="http://www.facebook.com/dialog/oauth?client_id=817345081770182&redirect_uri=http://oxylgenius.freeiz.com/&scope=email,user_website,user_location">Entrar com Facebook</a>
 </body>
</html>