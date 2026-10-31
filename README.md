# Observatório de Práticas IA — Versão 2.2

## Correções atendidas

1. **GOO.jpg = 1728 × 2049 px**. O arquivo é carregado como plano de fundo da **primeira capa (Google Docs)**, preenchendo toda a largura e altura. Nenhuma segunda imagem do Google Docs é inserida sobre a capa.
2. O **anel holográfico**, as linhas azul/dourado, os pontos luminosos e as **bordas arredondadas** são gerados em CSS.
3. Título, descrição, número de práticas e botão **Ver práticas** são HTML/JavaScript, com margens laterais generosas (8% da largura de cada cartão).
4. Os 28 recursos, pesquisa, categorias, modal e editor local do acervo foram mantidos.
5. Nas outras 27 capas, foram mantidas as imagens identificadas do PDF, com o **reflexo espelhado inferior removido**. Ao obter novas capas verticais, coloque-as no repositório e acrescente a propriedade `"capa": "NOME.jpg"` ao registro correspondente em `recursos.js`.

## Publicação no GitHub Pages

Envie os **arquivos do pacote para a raiz do repositório**, preservando a estrutura da pasta `assets/icons`.

- `index.html`, `styles.css`, `recursos.js`, `praticas.js`, `app.js`, `GOO.jpg` e a pasta `assets` devem permanecer lado a lado.
- Se você **já colocou sua própria imagem `GOO.jpg` no GitHub**, **não substitua** sua imagem pela cópia de demonstração presente no ZIP. Mantenha seu GOO.jpg de 1728 × 2049 px na raiz.
- A cópia de demonstração tem as mesmas dimensões e apenas permite abrir o projeto localmente sem imagem faltando.
- O CSS usa `background-size: 100% 100%` no cartão que compartilha exatamente a proporção 1728/2049, não cria corte nem imagem duplicada.
- Outros recursos poderão adotar o mesmo padrão apenas alterando `recursos.js`.

## Atenção
Há quatro recursos visualmente ambíguos no PDF original cujos nomes ainda precisam ser confirmados em `recursos.js`. Para publicar práticas, use o editor do acervo e exporte `praticas.js` para incluir no GitHub.
