/* JavaScript for: Video Selector
created by: Corey Hadden - June 2013
requires: craydent 1.7+ | jQuery 1.9-,
currently only supports esri video
*/

function VideoSelector(specs){
/*-------------------------------------------------------------------->
	0 | SETUP
<--------------------------------------------------------------------*/
	this.defaults = {
		container:'body',
		responsize:true
	}

	this.specs = $.extend({},this.defaults,specs);
	this.current = {
		size:"XL"
	};
	this.sizes={
		XL:{width:960,height:540},
		L:{width:720,height:405},
		M:{width:480,height:270},
		S:{width:320,height:180}
	};
	
	
	this.prepareVideoList = function(videos){
		var vidArr = [],
		defaults = {
			title:'Untitled Video',
			time:""
			} 
		videos.map(function(vid){
			($.type(vid) != 'object') && (vid = {id:vid});
			vidArr.push($.extend({},defaults,vid));
		})
		return vidArr;
	}
	this.videos= this.prepareVideoList(this.specs.videos||[]);
/*-------------------------------------------------------------------->
	1 | RENDER
<--------------------------------------------------------------------*/
	this.initRender = function(){
		$(document).ready(function(){__VSref.render()});
		
	}
	
	this.render = function(){
		var 
		html =
		"<div id='"+this.ID+"' class='video-selector XL-size' >"+
			this.renderVideoPanel()+
			this.renderVideoMenu()+
		"</div>";
		
		$(this.specs.container).innerHTML = html;
		this.DOM = $('#'+this.ID); 
		window.onresize = function(){__VSref.respond()}
		this.respond();
		this.selectVideo(this.videos[0]);
	}
	
/*-------------------------------------------------------------------->
	2 | VIDEO PANEL
<--------------------------------------------------------------------*/
	this.renderVideoPanel = function(){
		var 
		html="<div class='vs-video-panel'>Loading Video</div>";
		
		return html;
	}
	
	this.renderVideo = function(vid){
		
		vid = $.extend({},
			/*{
				width:960,
				height:540
			},*/
			this.sizes[this.current.size],
			vid
		);
		
		var 
		template = '<iframe frameborder="0" scrolling="no" width="${width}" height="${height}" src="http://video.esri.com/iframe/${id}/000000/width/${width}/0/00:00:00"></iframe>';
		
		return fillTemplate(template,vid);
	}
	

/*-------------------------------------------------------------------->
	3 | VIDEO MENU
<--------------------------------------------------------------------*/
	this.renderVideoMenu = function(){
		var 
		action = ' onclick="__VSref.selectVideo(${id});" ';
		template = 
			"<div class='vs-video-menu-option' data-vidid='${id}' "+action+">"+
				"<div class='vs-video-title'>${title}</div>"+
				"<div class='vs-video-id'>${id}</div>"+
				"<div class='vs-video-time'>${time}</div>"+
				"<div class='clear'></div>"+			
			"</div>",
		html="<div class='vs-video-menu'>";
			html += fillTemplate(template,this.videos);
		html+="</div>";
		
		return html;
	}

/*-------------------------------------------------------------------->
	4 | INTERACTIONS
<--------------------------------------------------------------------*/
	this.selectVideo = function(vidobj){
		vidobj = this.getVideoObject(vidobj);
		this.current.video = vidobj;
		$('#'+this.ID).find('.vs-video-panel').html(this.renderVideo(vidobj));
		$('.vs-video-menu-option[data-vidid='+vidobj.id+']').addClass('current').siblings().removeClass('current');
	}
	
/*-------------------------------------------------------------------->
	5 | RESPONSIVE
<--------------------------------------------------------------------*/
	this.respond = function(){
		var 
		w = this.DOM.width(),//$(window).width(),
		h = this.DOM.height(),//$(window).height();
		size;
		
		
		if(w >= 960){size = 'XL';}
		else if(w >= 720){size = 'L';}
		else if(w >= 480){size = 'M';}
		else{size = 'S';}//320
		
		
		if(size != this.current.size){
			this.current.size = size;
		//resize container.
			this.DOM[0].className = this.DOM[0].className.replace(/[a-zA-Z]*-size/,size+'-size');
		//reload (resized) video
			this.selectVideo(this.current.video);
			

		
		}
	}
//960x540
//720x405
//480x270
//320x180	

/*-------------------------------------------------------------------->
	! | UTILITIES
<--------------------------------------------------------------------*/
	this.getVideoObject = function(vidid){
		if($.type(vidid) == 'object'){return vidid;}
		return this.videos.filter(function(vid){return vid.id == eval(vidid);})[0]||false;
	}
/*-------------------------------------------------------------------->
	* | RUNTIME
<--------------------------------------------------------------------*/

	window.__VSref = this;
	this.ID = "VS_"+cuid();
	this.initRender();
	return this;	
}

