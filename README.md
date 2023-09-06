# sigaa-login - V&V

### 📝 Definição do Projeto
A Superintendência de Tecnologia da Informação e Comunicação (SUTIC) não disponibiliza uma API de autenticação de login para aplicações de terceiros. Isso acaba sendo limitante para os discentes da instituição que desejam fazer aplicações voltadas para o público da universidade, pois é difícil limitar, de forma automática, o acesso apenas para os membros da instituição. O SIGAA oferece essa funcionalidade, pois apenas pessoas que possuem um vínculo com a universidade conseguem acessar, além disso ele disponibiliza informações como nome e email.

O desenvolvimento de uma API de autenticação tornaria desnecessário o cadastro dos usuários, já que fariam login com o usuário e senha do SIGAA onde as informações do usuário já estão disponíveis. Isso facilitaria o desenvolvimento de aplicações voltadas exclusivamente para os membros da instituição.

A aplicação consiste em uma API de web scraping que irá realizar o login e retornar os dados do usuário. Será desenvolvida com Node.js.


### ✏️ Requisitos
- Realizar login no SIGAA;
- Manter sessão do usuário;
- Retornar os dados básicos do usuário;
- Retornar foto do usuário;
- permitir que o usuário encerre a sessão.

### Artigo e Apresentação 
[V_V.pdf](https://github.com/DaviEmmanuel04/sigaa-login/files/12541755/V_V.pdf)

[Slide](https://docs.google.com/presentation/d/1w1CMEk_qdQHYXqnE4Q1wcl-waRklw4EC7h52dDfxY9M/edit?usp=sharing)
