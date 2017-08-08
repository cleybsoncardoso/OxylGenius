<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

    $app->get('/helloWorld', function () {
    return 'Hello World';
    });


$app->group(['prefix' => 'usuario'], function () use ($app){
    $app->get('/', 'UsuarioController@all'); //todos os usuarios { ?token}, 
    //retorno: {"usuarios": [ {"Nome": "cleybson","Tipo": "G", "ID": "1", "FotoUsuario": "A.jpg"}]}
    $app->get('/{id}', 'UsuarioController@read'); //usuario unico
    //retorno: "usuario": {"ID": "1","Nome": "cleybson","Tipo": "G","FotoUsuario": "A.jpg","Login": "cley","LoginFacebook": null,"LoginGoogle": null,"Telefone": null,"idsupervisao": null}
    $app->delete('/{id}/token/{token}', 'UsuarioController@deletar'); //deletar usuario
    $app->post('/', 'UsuarioController@create'); //criar usuario 
    //{email, nome, password}
    $app->post('/perfil', 'UsuarioController@perfil'); //perfil do usuario  //{token: 11111}, retorno: {nome:string,tipo('U','F','G'),foto:base64}
    $app->post('/update', 'UsuarioController@update'); //atualizar dados usuario 
    //nome:string, foto:base64, login:string, telefone:string, token:string
    $app->put('/facebook/{id}', 'UsuarioController@vincularFacebook'); //adicionar face do usuario 
    $app->put('/google/{id}', 'UsuarioController@vincularGoogle'); //adicionar google de usuario 
});


$app->group(['prefix' => 'obra'], function () use ($app){
    $app->get('/', 'ObraController@all'); //todas obras
    $app->get('/{id}', 'ObraController@ler'); //obra unica
    $app->delete('/{id}/token/{token}', 'ObraController@deletar'); //deletar obra
    $app->post('/', 'ObraController@criar'); //criar obra 
    $app->put('/{id}', 'ObraController@update'); //atualizar dados de obra 
});

$app->group(['prefix' => 'login'], function () use ($app){
    $app->post('/', 'LoginController@logar'); //fazer login
    $app->post('/facebook', 'LoginController@logarFacebook'); //fazer login
    $app->post('/google', 'LoginController@logarGoogle'); //fazer login
    $app->post('/senha', 'LoginController@recuperarSenha'); //recuperar senha
});

$app->group(['prefix' => 'adm'], function () use ($app){
    $app->post('/{id}', 'AdmController@adm'); //dar e tirar gerencia
    $app->get('/avaliacoes', 'AvaliacaoController@all');     //criar todas avaliacoes
    $app->get('/avaliacoes/{id}', 'AvaliacaoController@ler');     //ler avaliacao
    $app->delete('/avaliacoes/{id}', 'AvaliacaoController@deletar');     //deletar avaliacao
});

$app->group(['prefix' => 'noticia'], function () use ($app){
    $app->get('/', 'NoticiaController@all');        //Todas noticias
    $app->get('/{id}', 'NoticiaController@ler');    //ler noticia
    $app->post('/{id}', 'NoticiaController@update');  //atualizar dados
    $app->post('/', 'NoticiaController@criar');     //criar dados {token:string, Conteudo: string, Dta_de_criacao: string(yyyy-mm-dd),ID_Objeto: id } retorno true
});


$app->group(['prefix' => 'avaliar'], function () use ($app){
    $app->post('/', 'AvaliacaoController@criar');     //criar avaliacao
});

$app->group(['prefix' => 'log'], function () use ($app){
    $app->post('/', 'LogController@read');     //criar avaliacao
});
