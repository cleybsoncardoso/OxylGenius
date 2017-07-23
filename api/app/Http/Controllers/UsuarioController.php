<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Cript;

class UsuarioController extends Controller
{
    private function againstSQL($array){
        $array = array_map(function($value){
            $value = addslashes($value);
            return $value;
        }, $array);
        return $array;
    }

    /**
    Função que retorna os dados do perfil do usuario
    */
    public function perfil(Request $request){
        $dados = $request->all();
        $dados = $this->againstSQL($dados); //teste sql inject

        $usuario = DB::SELECT('SELECT Nome, Tipo FROM usuario WHERE tokenAcesso = ?',
        [$dados['token']]); //retorna um array se tiver algum usuario ou null caso não encontre o token

        if ($usuario == null){
            return response()->json(404); //caso nao encontre o usuario, retorna o erro 404
        } else {
            $usuario = $usuario[0]; 
            $aux = array();
            $aux['nome'] = $usuario->Nome;
            $aux['tipo'] = $usuario->Tipo;
            return response()->json($aux);
        }
    }

    public function all(){
        $usuario = DB::SELECT('SELECT * FROM usuario');
        return response()->json($usuario);
    }

    public function read(){
        return false;
    }

    public function deletar(){
        return false;
    }


    /* 
    *  ==== Possiveis valores de Retorno ====
    * 100 - Cadastro finalizado com sucesso
    * 101 - E-mail com formato invalido ou incorreto
    * 102 - E-mail já cadastrado no Banco de Dados
    * 103 - Senha e RepetirSenha nao coincidem
    * 104 - Comprimento da senha ultrapassa o valor limite
    */
    public function create(Request $request){
        $dados = $request->all();               //pega parametros passados na requisição
        $dados = $this->againstSQL($dados);     //testa sql inject

        $busca = DB::SELECT('SELECT * FROM usuario WHERE Login = ?',
            [$dados['email']]);                 //Busca no banco de dados se já existe uma conta
                                                //cadastrada com o mesmo e-mail

        if (filter_var($dados['email'], FILTER_VALIDATE_EMAIL) == false){   //verifica integridade do email inserido
            return response()->json(101);
        } else if ($busca != null) {                                //verifica disponibilidde do email inserido
            return response()->json(102);
        } else if ($dados['password'] != $dados['passwordRepeat']){  //verifica igualdade entre senha e repetir senha
            return response()->json(103);
        } else if (strlen($dados['password']) > 10) {               //verifica comprimento da senha
            return response()->json(104);
        } else {
            $dados['password'] = base64_encode($dados['password']);                 //codifica a senha
            $sql = DB::INSERT('INSERT INTO usuario(Login, Senha) VALUES (?,?)',      //registra o usuario no BD
                [$dados['email'], $dados['password']]);
        }
        return response()->json(100);
    }

    public function update(Request $request){
        $dados = $request->all();
        $dados = $this->againstSQL($dados);
        $usuario_update = DB::UPDATE('UPDATE usuario set Login = ?, Nome = ?, LoginFacebook = ?, LoginGoogle = ?, FotoUsuario = ?, Telefone = ?, Tipo = ? WHERE tokenAcesso = ?', [$dados['login']],[$dados['nome']],[$dados['loginfacebook']],[$dados['logingoogle']],[$dados['fotousuario']],[$dados['telefone']],[$dados['tipo']],[$dados['token']] );           
        if ($usuario_update){
            return response()->json(404); //caso nao encontre o usuario, retorna o erro 404
         }
        else{
            return 1;
        }
    }

    public function vincularFacebook(){
        return false;
    }

    public function vincularGoole(){
        return false;
    }

}
