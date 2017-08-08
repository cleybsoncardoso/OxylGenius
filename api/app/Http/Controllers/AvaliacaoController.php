<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Cript;

class AvaliacaoController extends Controller
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

        $usuario = DB::SELECT('SELECT * FROM usuario WHERE tokenAcesso = ?',
        [$dados['token']]); //retorna um array se tiver algum usuario ou null caso não encontre o token

        if ($usuario == null){
            return response()->json(404); //caso nao encontre o usuario, retorna o erro 404
        } else {
            $usuario = $usuario[0]; 
            $dados['ID_Autor'] = $usuario->ID;

            DB::INSERT('INSERT INTO avaliacao (ID_Autor, Nota, Dta) VALUES (?,?,?)',
                [$dados['ID_Autor'], $dados['Nota'], $dados['Dta']]);

            return response()->json(true); //caso cadastre
        }
    }

    public function update($id, Request $request){
        $dados = $request->all();
        $dados = $this->againstSQL($dados);
        
        if(isset($dados['token'])){
            $usuario = DB::SELECT('SELECT ID, Nome, Tipo FROM usuario WHERE tokenAcesso = ?',
            [$dados['token']]); //retorna um array se tiver algum usuario ou null caso não encontre o token
        
            if ($usuario == null){
                return response()->json(404); //caso nao encontre o usuario, retorna o erro 404
            } else if($usuario[0]->Tipo != 'G' && $usuario[0]->Tipo != 'F'){
                return response()->json('Voce não é o usuario administrador'); //caso nao encontre o usuario, retorna o erro 404
            } else {
                DB::UPDATE('UPDATE avaliacao SET Conteudo =  ? WHERE ID_avaliacao = ?', [$dados['Conteudo'], $id]);
                return response()->json(true); //caso nao encontre o usuario, retorna o erro 404
            }        
        }
        else {
            return response()->json("Informe o token do usuario");
        }
    }

    public function all(){                                           
        $avaliacoes = DB::SELECT('SELECT * FROM avaliacao');
        return response()->json($avaliacoes);
            
    }

    public function ler($id){
        $avaliacao = DB::SELECT('SELECT * FROM avaliacao WHERE ID_avaliacao = ?', [$id]);
        if($avaliacao == null){
            return response()->json(404);  
        } else {
            return response()->json($avaliacao[0]);
        }
            
    }

     public function deletar(Request $request){
        $dados = $request->all();
        $dados = $this->againstSQL($dados);
        $usuario = DB::SELECT('SELECT * FROM usuario WHERE tokenAcesso = ?',
        [$dados['token']]); //retorna um array se tiver algum usuario ou null caso não encontre o token

        if ($usuario == null){
            return response()->json(404); //caso nao encontre o usuario, retorna o erro 404
        } else {
            $usuario = $usuario[0]; 
            if($usuario->Tipo == 'G' || $usuario->Tipo == 'F'){
                $avaliacao = DB::SELECT('SELECT * FROM avaliacao WHERE ID_avaliacao = ?', [$dados['ID_avaliacao']]);
                if ($avaliacao == null){
                    return response()->json(404); 
                } else {
                    $avaliacao = $avaliacao[0]; 
                    DB::DELETE('DELETE FROM avaliacao WHERE ID_avaliacao = ?', [$dados['ID_avaliacao']]);
                    return response()->json(true); 
                }

            } else {
                return response()->json(400); //caso usuario nao tenha permissao
            }
        }

    }

}
