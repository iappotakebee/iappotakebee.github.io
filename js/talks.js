$(function() {
  var template = $('#template').html();
  Mustache.parse(template);
  var rendered_interconf = Mustache.render(template, {talks: data_interconf, header: "International conferences", tag: "IntConf"});
  var rendered_jpnconf = Mustache.render(template, {talks: data_jpnconf, header: "Japanese conferences", tag: "JpnConf"});
  var rendered_outreach = Mustache.render(template, {talks: data_outreach, header: "Research outreach activities for non-experts", tag: "ResOR"});
  var rendered_miscart = Mustache.render(template, {talks: data_miscart, header: "Miscellaneous articles", tag: "MiscArt"});
  $('.article-headline-js').html(rendered_interconf + "<br />" + rendered_jpnconf + "<br />" + rendered_outreach + "<br />" + rendered_miscart);

  var hash_temp = location.hash;
  if (hash_temp) {
    location.replace('#');
    location.replace(hash_temp);
  }
});
