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

                $logObra = DB::SELECT('SELECT m.ID_mudancaObra, m.conteudo, DATE_FORMAT(m.DataAlteracao, "%d/%m/%Y") as DataAlteracao, u.Nome, o.nome FROM  mudancaobra m inner join usuario u on (u.ID = m.ID_Autor) inner join obra o on (o.ID_Obra = m.ID_Obra) order by m.DataAlteracao desc');
                $logEmprego = DB::SELECT('SELECT m.ID_mudancaEmpregado, m.conteudo, m.DataAlteracao, u.Nome as funcionario, m.ID_Empregado FROM  mudancaempregado m inner join usuario u on (u.ID = m.ID_Autor) order by m.DataAlteracao desc');

                foreach($logEmprego as $user){
                    $usuarioAux = DB::SELECT('SELECT * FROM usuario WHERE ID = ?',
                        [$user->ID_Empregado]);
                    $user->usuario = $usuarioAux[0]->Nome;
                }
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
