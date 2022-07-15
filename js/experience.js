function construstBio(experienceData) {
  return experienceData.map(function (arr) {
    var tmp_period = "";
    if (arr.endperiod == "Present"){
      tmp_period = arr.month+" "+arr.year+" - Present";
    }
    else{
      if (arr.endperiod != ""){
        tmp_period = arr.month+" - "+arr.endperiod+", "+arr.year;
      }
      else
      {
        tmp_period = arr.month+", "+arr.year;
      }
    }
    if (arr.period != ""){
      tmp_period = tmp_period+", "+arr.period;
    }
    if (arr.comment != ""){
      tmp_period = tmp_period+", "+arr.comment;
    }
    return { 
      name: arr.name, affiliation: arr.affiliation, period: tmp_period, title: arr.title, summary: arr.summary, type: arr.type, url: arr.url
    };

  });
}

$(function() {
  var bio_research = construstBio(data_research);
  var bio_overseas = construstBio(data_overseas);
  var template = $('#template').html();
  Mustache.parse(template);
  var rendered_research = Mustache.render(template, {exp: bio_research, header: "Research experience", tag: "Research"});
  var rendered_overseas = Mustache.render(template, {exp: bio_overseas, header: "Overseas experience", tag: "Overseas"});
  var rendered_teaching = Mustache.render(template, {exp: data_teaching, header: "Teaching experience", tag: "Teaching"});
  var rendered_excrcact = Mustache.render(template, {exp: data_excrcact, header: "Extra-curricular activities", tag: "ExCrcAct"});
  $('.article-headline-js').html(
    rendered_research + "<br />" + 
    rendered_overseas + "<br />" + 
    rendered_teaching + "<br />" + 
    rendered_excrcact 
  );

  var hash_temp = location.hash;
  if (hash_temp) {
    location.replace('#');
    location.replace(hash_temp);
  }
});
