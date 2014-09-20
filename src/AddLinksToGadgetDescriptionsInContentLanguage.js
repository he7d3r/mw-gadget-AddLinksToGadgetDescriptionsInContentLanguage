/**
 * Adds links to edit the gadget descriptions in content language to [[Special:Gadgets]]
 * @author: Helder (https://github.com/he7d3r)
 * @license: CC BY-SA 3.0 <https://creativecommons.org/licenses/by-sa/3.0/>
 */
/*jshint browser: true, camelcase: true, curly: true, eqeqeq: true, immed: true, latedef: true, newcap: true, noarg: true, noempty: true, nonew: true, quotmark: true, undef: true, unused: true, strict: true, trailing: true, maxlen: 120, evil: true, onevar: true */
/*global jQuery, mediaWiki */
( function ( mw, $ ) {
'use strict';

function addLinks (){
	var uLang = mw.config.get( 'wgUserLanguage' ),
		reUrl = new RegExp( '(MediaWiki:Gadget-.+?)/' + uLang );
	$( '#mw-content-text' ).find( 'a' ).filter( function(){
		return reUrl.test( $( this ).attr( 'href' ) );
	} ).each( function(){
		var $this = $( this ),
			$newLink = $this.clone().removeClass( 'new' ),
			newTitle = $this.attr( 'title' ).match( reUrl );
		if ( newTitle && newTitle[1] ){
			$newLink.attr( {
				title: newTitle[1],
				href: $newLink.attr( 'href' ).replace( reUrl, newTitle[1] )
			} ).append( ' [', mw.config.get( 'wgContentLanguage' ) ,']' );
		}
		$this.append( ' [', uLang , ']' )
			.before( $newLink, ' | ' );
	} );
}

if( mw.config.get( 'wgCanonicalSpecialPageName' ) === 'Gadgets' ){
	$( addLinks );
}

}( mediaWiki, jQuery ) );