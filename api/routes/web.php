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
    $app->get('/', 'UsuarioController@all'); //todos os usuarios { ?token}, retorno: {}
    $app->get('/{id}', 'UsuarioController@read'); //usuario unico
    $app->delete('/{id}', 'UsuarioController@deletar'); //deletar usuario
    $app->post('/', 'UsuarioController@create'); //criar usuario 
    $app->post('/perfil', 'UsuarioController@perfil'); //perfil do usuario  //{token: 11111}, retorno: {nome:string,tipo('U','F','G'),foto:base64}
    $app->put('/{id}', 'UsuarioController@update'); //atualizar dados usuario 
    $app->put('/facebook/{id}', 'UsuarioController@vincularFacebook'); //adicionar face do usuario 
    $app->put('/google/{id}', 'UsuarioController@vincularGoole'); //adicionar google de usuario 
});


$app->group(['prefix' => 'obra'], function () use ($app){
    $app->get('/', 'ObraController@all'); //todas obras
    $app->get('/{id}', 'ObraController@ler'); //obra unica
    $app->delete('/{id}', 'ObraController@deletar'); //deletar obra
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
    $app->put('/', 'NoticiaController@update');  //atualizar dados
    $app->post('/', 'NoticiaController@criar');     //criar dados
});

$app->group(['prefix' => 'Evento'], function () use ($app){
    $app->get('/', 'EventoController@all');        //Todas Eventos
    $app->get('/{id}', 'EventoController@ver');    //ver Evento
    $app->put('/', 'EventoController@update');  //atualizar dados
    $app->post('/', 'EventoController@criar');     //criar dados
});

$app->group(['prefix' => 'avaliar'], function () use ($app){
    $app->post('/', 'AvaliacaoController@criar');     //criar avaliacao
});
