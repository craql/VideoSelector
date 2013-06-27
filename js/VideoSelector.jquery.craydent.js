/* JavaScript for: Video Selector
created by: Corey Hadden - June 2013
requires: craydent 1.7+ | jQuery 1.9-,
*/

function VideoSelector(specs){
/*-------------------------------------------------------------------->
	0 | SETUP
<--------------------------------------------------------------------*/
	this.defaults = {
		container:'body'
	}

	this.specs = $.extend({},this.defaults,specs);
	this.videos=[];
/*-------------------------------------------------------------------->
	1 | RENDER
<--------------------------------------------------------------------*/
	this.initRender = function(){
		$(document).ready(function(){__VSref.render()});
		
	}
	
	this.render = function(){
		var 
		html =
		"<div id='"+this.ID+"'class=''>"+
			this.renderVideoPanel()+
			this.renderVideoMenu()+
		"</div>";
		
		$(this.specs.container).innerHTML = html;
	}
	
/*-------------------------------------------------------------------->
	2 | VIDEO PANEL
<--------------------------------------------------------------------*/
	this.renderVideoPanel = function(){
		var 
		html="<div class='VS-video-panel'>Video Panel</div>";
		
		return html;
	}

/*-------------------------------------------------------------------->
	3 | VIDEO MENU
<--------------------------------------------------------------------*/
	this.renderVideoMenu = function(){
		var 
		html="<div class='VS-video-menu'>Video Menu</div>";
		
		return html;
	}




/*-------------------------------------------------------------------->
	* | RUNTIME
<--------------------------------------------------------------------*/

	window.__VSref = this;
	this.ID = "VS_"+cuid();
	this.initRender();
	return this;	
}

