const html2Escape = (sHtml: string) =>  {
    return sHtml.replace(/[<>&"]/g,function(c){
      return {'<':'&lt;','>':'&gt;','&':'&amp;','"':'&quot;'}[c];
    });
   }
   
const escape2Html = (str: string): string =>  {
    const arrEntities={'lt':'<','gt':'>','nbsp':' ','amp':'&','quot':'"'};
    return str.replace(/&(lt|gt|nbsp|amp|quot);/ig,function(all,t){
        return arrEntities[t];
    });
}

export default {
    html2Escape,
    escape2Html
}