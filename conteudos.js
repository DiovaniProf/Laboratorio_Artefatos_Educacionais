/* Observatório — área editável de comunicados, eventos e links.
Cada item aceita: titulo, descricao, imagem (JPG 16:9 na raiz), url (https://...), data, selo.
Deixe imagem e url vazios enquanto não houver publicação.
*/
window.CONTEUDOS_PORTAL = {
  recados: Array.from({length:8},(_,i)=>({titulo:`Informativo ${String(i+1).padStart(2,'0')}`,descricao:'Espaço reservado para comunicados, orientações e avisos.',imagem:'',url:'',selo:'RECADOS'})),
  semana: Array.from({length:8},(_,i)=>({titulo:`Evento da semana ${String(i+1).padStart(2,'0')}`,descricao:'Espaço reservado para atividades e encontros desta semana.',imagem:'',url:'',data:'',selo:'NESTA SEMANA'})),
  agendados: Array.from({length:8},(_,i)=>({titulo:`Evento agendado ${String(i+1).padStart(2,'0')}`,descricao:'Espaço reservado para eventos e formações futuras.',imagem:'',url:'',data:'',selo:'EM BREVE'})),
  links: [
    {titulo:'Ministério da Educação',descricao:'Notícias, programas e políticas educacionais.',url:'https://www.gov.br/mec/pt-br',selo:'PORTAL OFICIAL'},
    {titulo:'BNCC',descricao:'Consulta ao documento da Base Nacional Comum Curricular.',url:'https://basenacionalcomum.mec.gov.br/',selo:'CURRÍCULO'},
    {titulo:'eduCAPES',descricao:'Repositório de materiais e recursos educacionais.',url:'https://educapes.capes.gov.br/',selo:'REPOSITÓRIO'},
    ...Array.from({length:5},(_,i)=>({titulo:`Endereço educacional ${String(i+4).padStart(2,'0')}`,descricao:'Espaço reservado para um novo portal educacional.',url:'',selo:'EM PREPARAÇÃO'}))
  ]
};
