<h1>Fivem Resource Scripts</h1>
<section id="repo-objective-pt">
  <p>
    <strong>OBS: Esse repositório é recomendado para quem já utiliza/utilizou o fivem para desenvolver scripts, pois não possui documentação de como começar, apenas de adição dos recursos a um servidor existente</strong><br>
    Esse repositório contém scripts que foram criados em live na <a href="https://www.twitch.tv/snkky_" target="_blank">Twitch</a> para o jogo GTA V, utilizando
    os recursos providos pelo <a href="https://docs.fivem.net/docs/" target="_blank">FIVEM</a> com o próposito de estudo da linguagem Javascript e um pouco
    de diversão.
  </p> 
</section>

<h3>Sobre mim</h3>
<section id="about-me-pt">
  <p> 
    Oi, me chamo Emerson e sou desenvolvedor desde 2019. Cursei ciência da computação na Universidade Salvador (UNIFACS) - Bahia, mas desde o ensino médio
    já brincava de criar códigos com algumas linguagens. Cria do PASCAL!!!
  </p> 
  <p>Quer saber mais sobre mim? Dá uma olhadinha nos links abaixo: </p>
  <ul>
    <li><a href="https://www.linkedin.com/in/emerson-santana-dev/" target="_blank">Linkedin</a></li>
    <li><a href="https://github.com/ESSantana" target="_blank">Github</a></li>
    <li><a href="https://www.twitch.tv/snkky_" target="_blank">Twitch</a></li>
  </ul>
</section>

<h3>Como Usar</h3>
<section id="how-use-it-pt">
  <p>
    Para utilizar os scripts desse repositório, basta criar uma pasta seguindo o 
      <a href="https://docs.fivem.net/docs/scripting-manual/introduction/introduction-to-resources/">
        padrão de nomenclatura de pastas do tipo <strong>CATEGORIA</strong> 
      </a>
    que o FIVEM define e adicionar as pastas desse repositório dentro do diretório criado.
  </p>
  <p>
    Exemplo: <br>
    &emsp; resources <br>
    &emsp; &emsp;└── [minha-categoria] &emsp;<strong> ## Pasta que deve ser criada</strong> <br>
    &emsp; &emsp; &emsp; └── carmanager &emsp; &emsp;<strong> ## Um dos recursos desse repositório</strong> <br>
  </p>
  <p>
    Após isso, basta adicionar ao seu <code>server.cfg</code> uma linha de código para que o recurso seja iniciado junto ao servidor
    <pre>
      <code>
        ...
        ensure carmanager <strong> ## Recurso que foi adicionado </strong>
        ensure resource-x
        ensure resource-y
        ensure resource-z
        ...
      </code>
    </pre>
  </p>
</section>
<section id="final-pt">
  <p>Espero que aproveite o meu trabalho e nos vemos por ai!</p>
</section>

<h2>English version</h2>
<section id="repo-objective-en">
  <p>
    This repository contains some scripts that was made on live in <a href="https://www.twitch.tv/snkky_" target="_blank">Twitch</a> for the game GTA V,
    using the resources provided by <a href="https://docs.fivem.net/docs/" target="_blank">FIVEM</a> with the purpouse of study javascript and have a 
    fun time.
  </p> 
</section>

<h3>About me</h3>
<section id="about-me-en">
  <p> 
    Hello there, my name is Emerson and I'm developer since 2019. I studied computer science in Universidade Salvador (UNIFACS) - State of Bahia - Brasil,
    but since high school I already played with some code using a few programming languages. Born from PASCAL!!!
  </p> 
  <p>Want to know more about me? Take a look in the links down below: </p>
  <ul>
    <li><a href="https://www.linkedin.com/in/emerson-santana-dev/" target="_blank">Linkedin</a></li>
    <li><a href="https://github.com/ESSantana" target="_blank">Github</a></li>
    <li><a href="https://www.twitch.tv/snkky_" target="_blank">Twitch</a></li>
  </ul>
</section>

<h3>How to use</h3>
<section id="how-use-it-pt">
  <p>
    To use the scripts from this repository, just create a folder following the
      <a href="https://docs.fivem.net/docs/scripting-manual/introduction/introduction-to-resources/">
        naming pattern of <strong>CATEGORY</strong> folders
      </a>
    that was defined by FIVEM and add the folders from this repository inside the category created.
  </p>
  <p>
    Example: <br>
    &emsp; resources <br>
    &emsp; &emsp;└── [my-category] &emsp;<strong> ## Folder that need to be created</strong> <br>
    &emsp; &emsp; &emsp; └── carmanager &emsp; &emsp;<strong> ## A resource from this repository</strong> <br>
  </p>
  <p>
    After this, just add into your <code>server.cfg</code> a code line to ensure that the resource will be initialized with the server
    <pre>
      <code>
        ...
        ensure carmanager <strong> ## Resource that was added </strong>
        ensure resource-x
        ensure resource-y
        ensure resource-z
        ...
      </code>
    </pre>
  </p>
</section>

<section id="final-en">  
  <p>I hope you enjoy my work and see you!</p>
</section>
