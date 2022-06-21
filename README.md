# 🤖 quedia-hein

## Bot do twitter que todo dia (útil) retweeta memes sobre o dia da semana
> [Perfil do twiter](https://twitter.com/quediahein)

![Arquitetura](https://github.com/g-barbosa/quedia-hein/blob/assets/sample.jpg)

## Ambiente
#### Dependências
Rode o comando abaixo para instalar todas as dependências necessárias deste projeto.
~~~
npm i
~~~

#### Variáveis de ambiente
Crie um arquivo .env e use o .env_sample como base para criar as variaveis de ambiente.
Para conseguir as credenciais você precisa entrar no [Developer Portal](https://developer.twitter.com/en) e pedir para liberar suas credenciais (lá tem toda uma documentação explicando direitinho).

Para conseguir pegar a variavel `USERID`, você pode fazer uma requisição para: `GET: https://api.twitter.com/2/users/by/username/<seu@>` e pegar o id que virá na response (não esqueça de se autenticar).


## Deploy
Para fazer o deploy para a AWS, basta rodar o seguinte comando:
~~~
npm run deploy
~~~
ou
~~~
serverless deploy
~~~


## Para contribuir
* Dê um Fork neste repositório
* Clone este repositório
* Crie uma nova branch a partir da main (feature/suaBranch ou fix/suaBranch)
* Faça suas alterações e seu commit (seja descritivo)
* Dê um  git push
* Abra uma pull request


## Referências
* [OauthHelper](https://stackoverflow.com/questions/56398985/oauth1-0-header-in-node-js)

[Mande a sua sugestão de meme](https://github.com/g-barbosa/quedia-hein/issues/new/choose)
