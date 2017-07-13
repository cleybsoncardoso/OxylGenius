<?php

namespace App\Http\Controllers;

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
    }


    public function logarGoogle(Request $request){
        $dados = $request->all();
        $dados = $this->againstSQL($dados);
//crystal vai jogar a api dele aqui, e salvar os dados dentro das variaveis  $dados['facebook'], $dados['nome'] e da de fotos que ainda nao tem, e o resto euja implementei
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
