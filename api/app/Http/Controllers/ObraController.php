<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Cript;

class ObraController extends Controller
{
    private function againstSQL($array){
        $array = array_map(function($value){
            $value = addslashes($value);
            return $value;
        }, $array);
        return $array;
    }

    public function criar(Request $request){
        $dados = $request->all();
        $dados = $this->againstSQL($dados); //teste sql inject

        $add = DB::INSERT('INSERT INTO obra (descricao, historico, marcas) VALUES (?,?,?)',
            [$dados['descricao'], $dados['historico'], $dados['marcas']]);
    }
}
