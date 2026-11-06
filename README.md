# Observatório de Práticas IA — versão 4.0

Nova navegação superior: **Página Principal**, **Artefatos Produzidos** e **Recados e Eventos**.

## Conteúdo das páginas
- **Página Principal:** abertura institucional, links para o acervo e para eventos, orientações de propósito.
- **Artefatos Produzidos:** mantém os **25 cartões originais**, busca, categorias, práticas e geração do relatório Word.
- **Recados e Eventos:** quatro abas internas: Recados (8 cartões 16:9), Eventos da Semana (8 cartões 16:9), Eventos Agendados (8 cartões 16:9) e Links Educacionais (8 espaços, 3 preenchidos).

## Personalizar os novos informativos
Edite `conteudos.js`. Cada item pode ter `titulo`, `descricao`, `imagem`, `url`, `data` e `selo`.

Exemplo para a primeira posição de `recados`:
```js
{titulo:'Comunicado da formação',descricao:'Encontro na próxima terça-feira',imagem:'REC01.jpg',url:'https://exemplo.org',selo:'IMPORTANTE'}
```
Suba a imagem 16:9 à raiz do repositório. Sem imagem, o espaço fica no padrão azul-marinho. Sem URL, não se exibe botão de acesso.

## Publicar no GitHub
Envie os arquivos da raiz deste ZIP à raiz do GitHub: `index.html`, `styles.css`, `portal.css`, `app.js`, `portal.js`, `recursos.js`, `praticas.js`, `conteudos.js` e o relatório DOCX opcional. Mantenha as capas originais JPG de **1728 × 2049 px** na raiz; não estão incluídas no pacote.

## Cuidados
O botão de exportação DOCX produz o relatório atualizado a partir de `recursos.js`. Alterar o arquivo Word não atualiza o site automaticamente. A agenda não é sincronizada com calendário externo; os espaços são editados no arquivo de conteúdo.
