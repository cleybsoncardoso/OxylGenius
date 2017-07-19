<?php

namespace App\Http\Controllers;
require_once ('libraries/Google/autoload.php');
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use App\Http\Controllers\Cript;

class LoginController extends Controller
{
    private function againstSQL($array){
        $array = array_map(function($value){
            $value = addslashes($value);
            return $value;
        }, $array);
        return $array;
    }

    /**
    Função que loga com o login e senha
    */
    public function logar(Request $request){
        $dados = $request->all();                   //pega os parametros que foram passados na requisição
        $dados = $this->againstSQL($dados);         //testa sql inject

        $dados['senha'] = base64_encode($dados['senha']); //criptografa senha

        $usuario = DB::SELECT('SELECT * FROM usuario WHERE Login = ? AND Senha = ?',
        [$dados['login'], $dados['senha']]); //procura o usuario no banco utilizando o Facades, procurando atra-
                                            //vés dos dados login e senha que foram passados pela requisição

        if ($usuario == null){
            return response()->json(404);   //retorna erro se nao encontrar o usuario
        } else {
            $usuario = $usuario[0];
            $max = getrandmax();        //gera o maior valor aleatório possivel
            $again = true;              //chave que verifica se esse token ja existe

            do{ //loop verifica se o token ja existe, caso exista, um novo numero aleatorio é sorteado
                $token = md5(rand(0,$max)) . '-' . sha1(rand(0,$max)); //criptografa o numero aleatorio, gerando mais segurança, por aumentar o tamanho do token e envolver caracteres
                $buscar = DB::SELECT('SELECT * FROM usuario WHERE tokenAcesso = ?', [$token]);
                if ($buscar == null)
                    $again = false;
            } while($again);
            $update = DB::UPDATE('UPDATE usuario SET tokenAcesso =  ? WHERE ID = ?', [$token, $usuario->ID]); //atualiza o token do usuario

            $aux = array();
            $aux['token'] = $token;
            $aux['tipo'] = $usuario->Tipo;
            return response()->json($aux);
        }
    }

    /**
        Função que loga com o facebook
    */
    public function logarFacebook(Request $request){
        $dados = $request->all();           
        $dados = $this->againstSQL($dados);

        //Veiga vai jogar a api dele aqui, e salvar os dados dentro das variaveis  $dados['facebook'], $dados['nome'] e da de fotos que ainda nao tem, e o resto euja implementei

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
        $dados['nome'] = $user->name;
        $dados['facebook'] = $user->id;

        $usuario = DB::SELECT('SELECT * FROM usuario WHERE LoginFacebook = ?',
        [$dados['facebook']]);

        if ($usuario == null){
        $add = DB::INSERT('INSERT INTO usuario (Nome, LoginFacebook, Tipo) VALUES (?,?,?)',
            [$dados['nome'], $dados['facebook'], 0]);
           
        $usuario = DB::SELECT('SELECT * FROM usuario WHERE LoginFacebook = ?',
        [$dados['facebook']]);
        } 
        $usuario = $usuario[0];
        $max = getrandmax();
        $again = true;
        do{
            $token = md5(rand(0,$max)) . '-' . sha1(rand(0,$max));
            $buscar = DB::SELECT('SELECT * FROM usuario WHERE token = ?', [$token]);
            if ($buscar == null)
                $again = false;
        } while($again);
        $update = DB::UPDATE('UPDATE usuario SET token =  ? WHERE ID = ?', [$token, $usuario->ID]);
        $aux = array();
        $aux['token'] = $token;
        return response()->json($aux);
        echo "Arrocha";
      }    
    }else{
      echo "Erro de conex�o com Facebook";
      exit(0);
    }
  }else{
    echo "Erro de conex�o com Facebook";
    exit(0);
  }
}else if($_SERVER['REQUEST_METHOD'] == 'GET' && isset($_GET['error'])){
  echo 'Permiss�o n�o concedida';
}

    }


    public function logarGoogle(Request $request){
        $dados = $request->all();
        $dados = $this->againstSQL($dados);
		
        $client_id = '1089341364114-6cbeh38r6dllkl2jo41je8a6q8fl2lnm.apps.googleusercontent.com';
        $client_secret = '1HiV8feRw0l8ODnx6xp-2oMl';
        $redirect_uri = 'http://mocs.freeiz.com/';
                
        $gClient = new Google_Client();
        $gClient->setClientId($client_id);
        $gClient->setClientSecret($client_secret);
        $gClient->setRedirectUri($redirect_uri);
        $gClient->addScope("email");
        $gClient->addScope("profile");
        $google_oauthV2 = new Google_Oauth2Service($gClient);
        
        if(isset($_GET['code'])){
        	$gClient->authenticate($_GET['code']);
        	$_SESSION['token'] = $gClient->getAccessToken();
        	header('Location: ' . filter_var($redirectURL, FILTER_SANITIZE_URL));
        }
        
        if (isset($_SESSION['token'])) {
        	$gClient->setAccessToken($_SESSION['token']);
        }
        
        if ($gClient->getAccessToken()) {
        	$gpUserProfile = $google_oauthV2->userinfo->get();
        	$dados = array(
        			'oauth_provider'=> 'google',
        			'google'     => $gpUserProfile['id'],
        			'nome'    => $gpUserProfile['given_name'].' '.$gpUserProfile['family_name'],
        			'email'         => $gpUserProfile['email'],
        			'sexo'        => $gpUserProfile['gender'],
        			'localizacao'        => $gpUserProfile['locale'],
        			'foto'       => $gpUserProfile['picture'],
        			'link'          => $gpUserProfile['link']
        	);
        }
        
        $usuario = DB::SELECT('SELECT * FROM usuario WHERE LoginGoogle = ?',
        [$dados['google']]);

        if ($usuario == null){
        $add = DB::INSERT('INSERT INTO usuario (Nome, LoginGoogle, Tipo) VALUES (?,?,?)',
            [$dados['nome'], $dados['google'], 0]);
           
        $usuario = DB::SELECT('SELECT * FROM usuario WHERE LoginGoogle = ?',
        [$dados['google']]);
        } 
        $usuario = $usuario[0];
        $max = getrandmax();
        $again = true;
        do{
            $token = md5(rand(0,$max)) . '-' . sha1(rand(0,$max));
            $buscar = DB::SELECT('SELECT * FROM usuario WHERE token = ?', [$token]);
            if ($buscar == null)
                $again = false;
        } while($again);
        $update = DB::UPDATE('UPDATE usuario SET token =  ? WHERE ID = ?', [$token, $usuario->ID]);
        $aux = array();
        $aux['token'] = $token;
        return response()->json($aux);
    }
   
}
