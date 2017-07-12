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

    public function logar(Request $request){
        $dados = $request->all();
        $dados = $this->againstSQL($dados);

        $dados['senha'] = base64_encode($dados['senha']);

        $usuario = DB::SELECT('SELECT * FROM usuario WHERE Login = ? AND Senha = ?',
        [$dados['login'], $dados['senha']]);

        if ($usuario == null){
            return response()->json(404);
        } else {
            $usuario = $usuario[0];
            $max = getrandmax();
            $again = true;

            do{
                $token = md5(rand(0,$max)) . '-' . sha1(rand(0,$max));
                $buscar = DB::SELECT('SELECT * FROM usuario WHERE tokenAcesso = ?', [$token]);
                if ($buscar == null)
                    $again = false;
            } while($again);
            $update = DB::UPDATE('UPDATE usuario SET tokenAcesso =  ? WHERE ID = ?', [$token, $usuario->ID]);

            $aux = array();
            $aux['token'] = $token;
            return response()->json($aux);
        }
    }

    public function logarFacebook(Request $request){
        $dados = $request->all();
        $dados = $this->againstSQL($dados);

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
