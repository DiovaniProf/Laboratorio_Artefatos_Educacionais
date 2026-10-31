# Observatório de Práticas IA — Recursos digitais

Página pronta em **HTML, CSS e JavaScript**. Visual Tecnologia Premium, responsiva, baseada no modelo escolhido. Os **28 ícones** foram recortados do PDF fornecido pelo usuário (duas páginas) e convertidos para WebP. Funciona sem CDN nem dependências.

## Arquivos
- `index.html` — página principal
- `styles.css` — identidade visual responsiva
- `app.js` — busca, filtros, páginas das ferramentas e editor
- `recursos.js` — relação de ferramentas, descrições e caminhos das imagens
- `praticas.js` — práticas públicas (inicialmente vazio; não foram fornecidos links)
- `assets/icons/` — 28 ícones extraídos do documento anexado

## Como acessar
1. Extraia o ZIP.
2. Abra `index.html` no navegador. Os ícones, pesquisa e filtros funcionam sem servidor.
3. Clique em **Ver práticas** em qualquer ferramenta: abre a área destinada às práticas daquela ferramenta.
4. Clique em **Gerenciar acervo** e cadastre título, área, resumo e URL de cada prática. Para ver o resultado, volte ao cartão correspondente.

## Como publicar no GitHub Pages
1. Envie **todos os arquivos e pastas**, preservando os nomes, para a raiz do repositório do site ou pasta correspondente.
2. Em *Settings → Pages*, escolha a branch e a pasta de publicação (normalmente `main` e `/root`).
3. Abra o endereço do GitHub Pages.
4. Para publicar práticas para todos os visitantes, cadastre-as no modo de edição, clique em **Exportar praticas.js**, envie o arquivo exportado ao mesmo diretório do `index.html` no GitHub e substitua o anterior.
5. Atualize a página quando o Pages publicar a nova versão.

## Atenção ao gerenciamento
O botão **Gerenciar acervo** é um editor local e não possui senha. Qualquer visitante pode modificar sua própria prévia **apenas no próprio navegador**. Isso **não modifica o site publicado**. Para gerência multiusuário com autenticação e publicação automática, é necessário um backend (por exemplo, Supabase).

`localStorage` guarda as práticas adicionadas naquele navegador para prévia. A publicação real depende da substituição do arquivo `praticas.js` no repositório. Práticas cadastradas em um navegador não aparecem automaticamente nos demais.

## Nomes de quatro ferramentas a confirmar
O PDF apresenta apenas ícones, sem legendas. Para não inventar marcas, quatro nomes foram inseridos como **provisórios** e podem ser alterados em `recursos.js`: `recurso-p`, `recurso-audio`, `recurso-video` e `recurso-c`. Os arquivos de imagem originais desses quatro recursos estão incluídos. Os nomes restantes correspondem aos símbolos reconhecíveis do material fornecido.

## Observações
- Não foram inventados links nem práticas reais; todas as páginas de ferramentas estão prontas para receber informações.
- Por motivos de acessibilidade, os nomes, descrições e controles são texto HTML, não texto embutido nas imagens.
- Créditos e direitos das marcas e dos logotipos permanecem com seus respectivos titulares. Os visuais das imagens foram fornecidos no PDF do projeto.
