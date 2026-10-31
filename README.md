# OBSERVATÓRIO DE PRÁTICAS IA — Versão 3.3

## Atualização
O catálogo possui 25 ferramentas. Foram mantidas as 22 ferramentas da versão 3.1 e acrescentados GitHub (`GIT.jpg`), oCam (`OCA.jpg`) e CodePen (`CPE.jpg`). Os textos e as categorias correspondem ao relatório DOCX 3.2.

## Publicação no GitHub Pages
Envie para a **raiz** do repositório:
- `index.html`
- `styles.css`
- `recursos.js`
- `praticas.js`
- `app.js`
- As 25 imagens JPG nomeadas exatamente conforme a coluna `Sigla JPG` do relatório: letras maiúsculas, extensão `.jpg`.

As imagens JPG não estão incluídas no pacote; coloque os seus próprios arquivos 1728 × 2049 px na raiz.
Se não houver uma imagem com o nome esperado, o cartão apresenta o fundo preto; o nome da ferramenta e o botão continuam funcionando.

## Relatório Word
O botão DOWNLOAD DOCX na parte inferior do site gera um Word editável com os mesmos 25 recursos definidos em `recursos.js`. O arquivo `Relatorio_Textos_Observatorio.docx` também está incluído neste ZIP como referência. 
Alterar o Word não modifica o site: após revisar os textos, atualize `recursos.js`.

## Práticas
O arquivo `praticas.js` concentra os registros de práticas. Na ausência de registros, o botão 'Ver práticas' informa que o acervo ainda não contém práticas para a ferramenta.

## Notas de design
As imagens são utilizadas como fundo integral do cartão na proporção 1728:2049.
Nenhum anel/suporte aparece abaixo dos ícones. As bordas, os textos, a iluminação sutil e os botões são criados por HTML e CSS.

## Melhorias da versão 3.3
- Tratamento de JPGs ausentes: o cartão permanece utilizável e indica a sigla.
- Melhor legibilidade em telas pequenas: cartões em coluna única até 650px.
- Mantidas as 25 ferramentas, os nomes JPG em caixa alta, o modal de práticas e o botão DOWNLOAD DOCX.
