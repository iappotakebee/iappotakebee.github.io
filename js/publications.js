$(function() {
  var template = $('#template').html();
  Mustache.parse(template);
  var rendered_journal = Mustache.render(template, {talks: data_journal, header: "Journal articles", tag: "JArt"});
  var rendered_proc = Mustache.render(template, {talks: data_proc, header: "Refereed conference proceedings", tag: "CnfProc"});
  var rendered_patent = Mustache.render(template, {talks: data_patent, header: "Patents", tag: "Ptn"});
  $('.article-headline-js').html(
    rendered_journal + "<br />" + 
    rendered_proc + "<br />" + 
    rendered_patent);

  var hash_temp = location.hash;
  if (hash_temp) {
    location.replace('#');
    location.replace(hash_temp);
  }
});
