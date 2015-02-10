var categorias,videos,inicio,atual,dados;
var filter_cats = new Array();
var navegacao = new Array();
/**
	Faz uma varredura em todos os videos procurando 
	por categorias presentes em videos que possuem 
	todas as categorias passadas pro parâmetro
	**/
	function buscaCategoriasRelacionadas (filtro,navegacao) {
		var x=0,results = new Array();

		for(id in videos){
			x=0
			for(item in filtro){
				if (videos[id].indexOf((filtro[item]))>=0) {
					x++;
				};
			}
			if (x==filtro.length) {
				results = results.concat(videos[id]);
			}
		}
		results = results.filter(function(elem, pos, self) {
			return self.indexOf(elem) == pos;
		});
	// for(item in filtro){
	// 	while (results.indexOf((filtro[item])) !== -1) {
	// 		results.splice(results.indexOf((filtro[item])), 1);
	// 	}
	// }
	if (results.sort().toString() === atual.sort().toString() && !navegacao) {
		return 'Fim';
	} else{
		return results;
	};
}

/**
Busca os videos que se encaixam em todas as categorias
**/
function buscaVideos(categorias){
	var x=0,results = new Array();
	
	for(id in videos){
		x=0
		for(item in categorias){
			if (videos[id].indexOf((categorias[item]))>=0) {
				x++;
			};
		}
		if (x==categorias.length) {
			results = results.concat(id);
		}
	}
	return results;
}

function load(cat){
	var x=0;
	var str = '';
	str+='<div class="row">\n';
	for(i in cat){
		if (!(filter_cats.indexOf(cat[i])>=0)) {
			str += "<div class='waves-effect waves-light col s6 m4 l2 categorias' data-categoria-id='"+cat[i]+"'>\n<div class='card-panel blue darken-1'>\n <span class='white-text'>"+categorias[cat[i]]+"</span>\n</div>\n</div>";
		};
	}
	str+='</div>\n\n';
	
	$('.conteudo').html(str);
};


function loadVideos(videos){
	var str = '';
	var player = new Array();
	str+='<div class="row">\n';
	for(i in videos){
		
		str += "<div class='col s12 m6 l3' data-video-id='"+videos[i]+"'>"
		str += "<div class='card blue darken-1 center-align' >";
		str += "<div id='"+videos[i]+"' class='card-image'></div>";
		str += "<div class='card-content'>";
		str += "<p class='white-text' id='title-"+videos[i]+"'></p>";
		str += "</div>";
		str += "</div>";
		str += "</div>";
	}
	str +='</div>';
	$('.conteudo').html(str);
	for(i in videos){
		player[i] = new YT.Player(videos[i], {
			height: '270',
			width: "100%",
			videoId: videos[i],
			playerVars:{
				modestbranding:1,
				rel:0,
				showinfo:0
			},
			events: {
				'onReady': function(event){
					
					$('#title-'+event.target.getVideoData().video_id).text(event.target.getVideoData().title);
				},

			}
		});
	}
}
function loadCategorias (navegacao) {
	var a = buscaCategoriasRelacionadas(filter_cats,navegacao);
	if (a == 'Fim' && !navegacao) {
		loadVideos(buscaVideos(filter_cats));
	} else{
		atual = a;
		load(a);
	};
	navegacao = new Array();
	navegacao.push("<a href='index.html' id='navegacao-inicio'>Início</a>");
	for(x in filter_cats){
		navegacao.push("<a href='#' class='navegacao-item' data-categoria-id='"+filter_cats[x]+"'>"+categorias[filter_cats[x]]+"</a>");
	}
	$('#navegacao').html(navegacao.join(' > '));
	$('.navegacao').show();
}

$(function(){
	$.ajaxSetup({headers: {"Pragma": "no-cache","Cache-Control": "no-cache"}});
	$.ajax({
		url:'json.php',
		method:'get',
		dataType:'json',
		success:function(data){
        	dados = data;
			categorias = data.categorias;
			videos = data.videos;
			inicio = data.inicio;

			atual = inicio;

			$('.conteudo').on('click','.categorias',function(){
				filter_cats.push(($(this).attr('data-categoria-id')));
				loadCategorias();
			});
			$('.navegacao').on('click','.navegacao-item',function() {
				filter_cats.splice(filter_cats.indexOf(($(this).attr('data-categoria-id')))+1);
				loadCategorias(true);
			});
			// $('.navegacao').on('click','#navegacao-inicio',function() {
			// 	filter_cats = new Array();
			// 	atual = dados.inicio;
			// 	load(dados.inicio);
			// 	$('.navegacao').hide();
			// });
			load(inicio);

		},
		error:function(error,status,msg) {
			console.log(error.responseText);
		}
	});

});
