<?php

namespace App\Http\Controllers;
require_once ('libraries/Google/autoload.php');
require_once ('libraries/Google/Client.php');

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use App\Http\Controllers\Cript;


class LogController extends Controller
{
    private function againstSQL($array){
        $array = array_map(function($value){
            $value = addslashes($value);
            return $value;
        }, $array);
        return $array;
    }

    public function read(Request $request){
        $dados = $request->all();
        $dados = $this->againstSQL($dados); //teste sql inject

        $usuario = DB::SELECT('SELECT * FROM usuario WHERE tokenAcesso = ?',
        [$dados['token']]); //retorna um array se tiver algum usuario ou null caso não encontre o token

        if ($usuario == null){
            return response()->json(404); //caso nao encontre o usuario, retorna o erro 404
        } else {
            $usuario = $usuario[0]; 
            if($usuario->Tipo == 'G' || $usuario->Tipo == 'F'){
                $dados['ID_Autor'] = $usuario->ID;

                $logObra = DB::SELECT('SELECT * FROM  mudancaobra');
                $logEmprego = DB::SELECT('SELECT * FROM  mudancaempregado');
                $aux = array();
                $aux['obra'] = $logObra;
                $aux['funcionario'] = $logEmprego;
                return response()->json($aux); //caso cadastre
            } else {
            return response()->json(404); //caso nao encontre o usuario, retorna o erro 404
                
            }
        }
    }

}
