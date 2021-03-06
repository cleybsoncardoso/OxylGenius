<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Cript;

class NoticiaController extends Controller
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
            if($usuario->Tipo == 'G' || $usuario->Tipo == 'F'){
                $dados['ID_Autor'] = $usuario->ID;

                DB::INSERT('INSERT INTO notificacao  (ID_Autor, Conteudo, Dta_de_criacao, ativo, ID_Objeto) VALUES (?,?,?, 1,?)',
                    [$dados['ID_Autor'], $dados['Conteudo'], $dados['Dta_de_criacao'], $dados['ID_Objeto']]);

                return response()->json(true); //caso cadastre
            } else {
            return response()->json(404); //caso nao encontre o usuario, retorna o erro 404
                
            }
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
                DB::UPDATE('UPDATE notificacao SET Conteudo =  ? WHERE ID_Notificacao = ?', [$dados['Conteudo'], $id]);
                return response()->json(true); //caso nao encontre o usuario, retorna o erro 404
            }        
        }
        else {
            return response()->json("Informe o token do usuario");
        }
    }

    public function all(){                                           
        $noticias = DB::SELECT('SELECT * FROM notificacao WHERE ativo = 1');
        return response()->json($noticias);
            
    }

    public function ler($id){
        $noticia = DB::SELECT('SELECT * FROM notificacao WHERE ativo = 1 and ID_Notificacao = ?', [$id]);
        if($noticia == null){
            return response()->json(404);  
        } else {
            return response()->json($noticia[0]);
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
                $notificacao = DB::SELECT('SELECT * FROM notificacao WHERE ID_Notificacao = ?', [$dados['ID_Notificacao']]);
                if ($notificacao == null){
                    return response()->json(404); 
                } else {
                    $notificacao = $notificacao[0]; 
                    DB::UPDATE('UPDATE notificacao SET ativo =  0 WHERE ID_Notificacao = ?', [$dados['ID_Notificacao']]);
                    return response()->json(true); 
                }

            } else {
                return response()->json(400); //caso usuario nao tenha permissao
            }
        }

    }

}
