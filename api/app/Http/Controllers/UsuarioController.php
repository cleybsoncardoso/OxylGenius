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

    public function create(){
        return false;
    }

    public function update(){
        $dados = $request->all();
        $dados = $this->againstSQL($dados);
        $usuario_update = DB::UPDATE('UPDATE usuario set Login = ?, Nome = ?, LoginFacebook = ?, LoginGoogle = ?, FotoUsuario = ?, Telefone = ?, Tipo = ? WHERE tokenAcesso = ?', [$dados['login']],[$dados['nome']],[$dados['loginfacebook']],[$dados['logingoogle']],[$dados['fotousuario']],[$dados['telefone']],[$dados['tipo']],[$dados['token']] );           
        if ($usuario_update == null){
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
