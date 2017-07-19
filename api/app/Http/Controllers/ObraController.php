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

        $usuario = DB::SELECT('SELECT * FROM usuario WHERE tokenAcesso = ?',
        [$dados['token']]); //retorna um array se tiver algum usuario ou null caso não encontre o token

        if ($usuario == null){
            return response()->json(404); //caso nao encontre o usuario, retorna o erro 404
        } else {
            $usuario = $usuario[0]; 
            if($usuario->Tipo == 'G' || $usuario->Tipo == 'F'){
            $dados['iduploader'] = $usuario->ID;

        $add = DB::INSERT('INSERT INTO aquisicao (Forma, dta, autor, observacoes) VALUES (?,?,?,?)',
            [$dados['Forma'], $dados['dta'], $dados['autor'], $dados['observacoes']]);

        $add = DB::INSERT('INSERT INTO caracteristicas (material, tecnica, autora) VALUES (?,?,?)',
            [$dados['material'], $dados['tecnica'], $dados['autora']]);

        $add = DB::INSERT('INSERT INTO dimensoes (Altura, Largura, Comprimento) VALUES (?,?,?)',
            [$dados['Altura'], $dados['Largura'], $dados['Comprimento']]);    

        $add = DB::INSERT('INSERT INTO documentacao_fotografica (fotografo, dta, arquivo) VALUES (?,?,?)',
            [$dados['fotografo'], $dados['dta'], $dados['arquivo']]);  

        $add = DB::INSERT('INSERT INTO identificacao (colecao, nome, titulo, procedencia, funcao) VALUES (?,?,?,?,?)',
            [$dados['colecao'], $dados['nome'], $dados['titulo'], $dados['procedencia'], $dados['funcao']]);  

        $documentacao_fotografica = DB::SELECT('SELECT * FROM documentacao_fotografica WHERE fotografo = ? AND dta = ? AND arquivo = ?',
        [$dados['fotografo'], $dados['dta'], $dados['arquivo']]);
        $dados['ID_Doc_fot'] = $documentacao_fotografica[0]->ID_Doc_fot;    

        $aquisicao = DB::SELECT('SELECT * FROM aquisicao WHERE Forma = ? AND dta = ? AND autor = ? AND observacoes = ?',
        [$dados['Forma'], $dados['dta'], $dados['autor'], $dados['observacoes']]);
        $dados['ID_Aqui'] = $aquisicao[0]->ID_Aqui;


        $caracteristicas = DB::SELECT('SELECT * FROM caracteristicas WHERE material = ? AND tecnica = ? AND autora = ?',
        [$dados['material'], $dados['tecnica'], $dados['autora']]);
        $dados['ID_caracteristica'] = $caracteristicas[0]->ID_caracteristica;


        $dimensoes = DB::SELECT('SELECT * FROM dimensoes WHERE Altura = ? AND Largura = ? AND Comprimento = ?',
        [$dados['Altura'], $dados['Largura'], $dados['Comprimento']]);
        $dados['ID_Dim'] = $dimensoes[0]->ID_Dim;

        $identificacao = DB::SELECT('SELECT * FROM identificacao WHERE colecao = ? AND nome = ? AND titulo = ? AND procedencia = ? AND funcao = ?',
        [$dados['colecao'], $dados['nome'], $dados['titulo'], $dados['procedencia'], $dados['funcao']]);
        $dados['n_no_inventario'] = $identificacao[0]->n_no_inventario ;

        $add = DB::INSERT('INSERT INTO obra (ID_Aqui,ID_Doc_fot,ID_Dim,ID_caracteristica,n_no_inventario,iduploader,n_de_visulizacoes,nome,local_data,referencias,estado,inconologia,ft_verso,ft_frente,descricao, historico, marcas) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
        [$dados['ID_Aqui'],$dados['ID_Doc_fot'],$dados['ID_Dim'],$dados['ID_caracteristica'],$dados['n_no_inventario'],$dados['iduploader'],$dados['n_de_visulizacoes'],$dados['nome'],$dados['local_data'],$dados['referencias'],$dados['estado'],$dados['inconologia'],$dados['ft_verso'],$dados['ft_frente'],$dados['descricao'], $dados['historico'], $dados['marcas']]);
    
        $obra = DB::SELECT('SELECT * FROM obra WHERE nome = ? AND referencias = ? AND ft_verso = ? AND ft_frente = ? AND ID_Aqui = ?',
        [$dados['nome'], $dados['referencias'], $dados['ft_verso'], $dados['ft_frente'], $dados['ID_Aqui']]); 

        if ($obra == null){
            return response()->json(404); 
        } else {
            $obra = $obra[0]; 
            $dados['ID_mudancaObra'] = $obra->ID_Obra;
            $add = DB::INSERT('INSERT INTO mudancaObra (ID_Autor, ID_Obra, conteudo, DataAlteracao) VALUES (?,?,?,?)',
            [$dados['iduploader'], $dados['ID_mudancaObra'], $dados['conteudo'], $dados['DataAlteracao']]);
        }

            } else {
            return response()->json(404); //caso nao encontre o usuario, retorna o erro 404
                
            }
        }
    }
}

