<?php
	/**
	* Objective Hermeneutic Interpretor Tool 
	* An Extension to Semantic Mediawiki which allows users to semantically annotate texts following the Objective Hermeneutic Methodology.
	* @author Lia Veja
	*/


	//Alert the user that this is not a valid entry point to MediaWiki
	if( !defined( 'MEDIAWIKI' ) ) {
		die( 'Not an entry point.' );
	}
	
	
	//Take credit for your work.
	//$wgExtensionCredits['others'][] = array(
	$wgExtensionCredits[defined( 'SEMANTIC_EXTENSION_TYPE' ) ? 'semantic' : 'specialpage'][] = array(
		'path' => __FILE__,
		//The name of the extension, which will appear on Special:Version.
		'name' => 'OHI Tool',
		//The version of the extension, which will appear on Special:Version.
		'version' => '0.1',
		//The name of the author, which will appear on Special:Version
		'author' => 'Lia Veja',
		//The URL to a wiki page/web page with information about the extension, which will appear on Special:Version
		'url' => 'http://www.mediawiki.org/',
		//The description, which will appear on Special:Version
		'descriptionmsg' => 'annot-description',
        'license-name' => 'GPL-2.0+'
	);
	
	
	//Define path of the Extension
	$dir = dirname(__FILE__);
	//Define path of Message File
	$wgExtensionMessagesFiles['OHI'] = "$dir/OHI.i18n.php";
	
	// Load the class that contains the Subclass of the class "SpecialPage"
	$wgAutoloadClasses['SpecialOHI'] = "$dir/specials/SpecialOHI.php";
	// Extend the $wgSpecialPages-Array by the Value OHI (Klasse wurde in Zeile davor geladen)
	$wgSpecialPages['OHI'] = 'SpecialOHI';
	
	// Your special page gets put under a heading in Special:SpecialPage
	// Extend the $wgSpeicalPageGroups-Array by the Value Lia's Extensions
	$wgSpecialPageGroups['OHI'] = 'smw_group';
	
		
	//Create new Namespace for the Extension
	define("NS_TEXTANNOTATION", 382);
	$wgExtraNamespaces[NS_TEXTANNOTATION] = "TextAnnotation";
	//Define Namespace:TextAnnotation as Namespace with Semantic Links
	$smwgNamespacesWithSemanticLinks += array(NS_TEXTANNOTATION => true);
	
	
	//Resources for the ResourceLoader
$moduleTemplate = array(
	'localBasePath' => dirname( __FILE__ ) ,
	'remoteExtPath' => 'OHI',
    'dependencies' => array('jquery.ui.dialog'),
);

$wgResourceModules['ext.OHI'] = $moduleTemplate + array(
		'scripts' => array(
            'resources/lib/jquery.ui.dialog.js',
			'resources/scripts/OHI_Selector.js',
			//'resources/scripts/helpFunctions.js',
			//'resources/scripts/spin.js'
		),
	);

$wgResourceModules['ext.OHI.NS_TEXTANNOTATION'] = $moduleTemplate + array (
		//Scripts to always include
		'scripts'		=>	array(
			//'resources/scripts/OHI_textannotationNS.js',
			//'resources/scripts/OHI_AJAXcall.js',
			//'resources/scripts/OHI_getAnnotatedText.js'
		),
		//'localBasePath'	=>	dirname(__FILE__),
		//'remoteExtPath'	=>	'SemanticTextAnnotator',
		//'messages'		=>	array('sta-buttonannotate'),
		//'dependencies' => array( 'ext.survey' ),
		'dependencies' => array('ext.OHI')
	);

$wgResourceModules['ext.OHI.add'] = $moduleTemplate + array (
			//Scripts to always include
			'scripts'		=>	array(
                                    // 'resources/scripts/STA_articleNS.js',
									//  'resources/scripts/annotation_mode.js',
								    //  'resources/scripts/OHI_AJAXcall.js',
									 // 'resources/scripts/helpFunctions.js',
									//  'resources/scripts/posLocator.js',
									//  'resources/scripts/highlightAnnotations.js',
									 // 'resources/scripts/getListOfAnnotationSerialNumbers.js',
									 // 'resources/scripts/functionsForVisualisation.js',
									 // 'resources/scripts/insertSpanNodeForEveryNode.js',
									  'resources/scripts/OHI_getAnnotatedText.js'

								),		
			//Styles to always include
			'styles'		=>	array('resources/styles/OHI.css'),
			//Modules which must be loaded before this module
			'dependencies'	=>	array('ext.OHI'),
		//	'localBasePath'	=>	dirname(__FILE__),
		//	'remoteExtPath'	=>	'SemanticTextAnnotator',
			//'messages'		=>	array('sta-buttonannotate'),	
	);
	
	//Integrate File "STA_AjaxFunctions.php"
	include_once('OHI_AjaxFunctions.php');
	global $wgAjaxExportList;
	//Registry for functions callable via AJAX; This is a way for extensions (and some functions)
	//to make functions callable from JavaScript (extensions acting as Ajax callbacks must register here).
	$wgAjaxExportList[] = 'ohi_writeAnnotationProperties';
	$wgAjaxExportList[] = 'getHTMLContent';
	$wgAjaxExportList[] = 'getEditContent';
	$wgAjaxExportList[] = 'parseText';
	$wgAjaxExportList[] = 'ohi_deleteAnnotationPage';
	$wgAjaxExportList[] = 'ohi_editWikiPage';
	$wgAjaxExportList[] = 'ohi_getCategory';
	$wgAjaxExportList[] = 'ohi_inCategory';
	$wgAjaxExportList[] = 'writeOHIWikiPage';
	$wgAjaxExportList[] = 'getOHITableSecondLevel';
	$wgAjaxExportList[] = 'ohi_writeAnnotationPage';
	
	


	//register MediaWiki hooks
	//see: 'http://www.mediawiki.org/wiki/Manual:Hooks#Available_hooks'
	//see: 'http://www.mediawiki.org/wiki/Manual:Hooks/OutputPageBeforeHTML'
	$wgHooks['OutputPageBeforeHTML'][] = 'ohi_hookOutputPageBeforeHTML';
	
	//see: 'http://svn.wikimedia.org/doc/classOutputPage.html'
	//see: 'http://www.mediawiki.org/wiki/Manual:Hooks/OutputPageBeforeHTML'
	function ohi_hookOutputPageBeforeHTML (&$out, &$text) {
		global $wgUser, $wgOut;
	//	echo "Test <br/>";
/*	if (!($wgUser->isLoggedIn() ) ) {
		$wgOut->addWikiText("User must be logged in.") ;
		return false;
	}*/
		if($out->getTitle()->getNamespace() == 0) {		//0 is the Aricle's Namespace
			//echo "Test <br/>";
			$out->addModules('ext.OHI');
		}
		return true;
	}
	
	
	
	
	//**********************

	//$wgHooks['OutputPageBeforeHTML'][] = 'sta_hookOutputPageBeforeHTML2';
    $wgHooks['ArticleSaveComplete'][] = 'OHI_CheckSave';
	$wgHooks['smwInitProperties'][] = 'ohi_initProperties';
	
	//see: 'http://svn.wikimedia.org/doc/classOutputPage.html'
	//see: 'http://www.mediawiki.org/wiki/Manual:Hooks/OutputPageBeforeHTML'
	function ohi_hookOutputPageBeforeHTML2 (&$out, &$text) {
		if($out->getTitle()->getNamespace() == 382) {		
			$out->addModules('ext.OHI.NS_TEXTANNOTATION');
		}
		return true;
	}

function OHI_CheckSave(  $article, $user) {
	global $wgOut, $wgScriptPath;

	$articleId = $article->getID();
	$articleTitle = $article -> getTitle();
	$userId = $user->getName();

	$dbw = wfGetDB( DB_MASTER );

	$wgOut->addHTML(
		'<div id="analysis-result" >'
		. '<p id="analysis-result-p">' . $articleTitle . '</p>'
		. '</div>'
	);
	//$wgOut->addScriptFile(  $wgScriptPath . '/extensions/OfflineImportLexicon/second.js'  ); window.location.reload();
	return true;
}
	
		
	function ohi_initProperties(){
		if ( class_exists( 'SMWDIProperty' ) ) {
			SMWDIProperty::registerProperty( "__STA_ARTICLE_NAME", '_str', "STAarticleName", true );
		//	SMWDIProperty::registerProperty( "__STA_ANNOTATION_TYPE", '_str', "STAannotationType", true );
		//	SMWDIProperty::registerProperty( "__STA_ANNOTATION_DATE", '_str', "STAannotationDate", true );
		//	SMWDIProperty::registerProperty( "__STA_CREATED_BY", '_str', "STAcreatedBy", true );
		//	SMWDIProperty::registerProperty( "__STA_COMMENT", '_str', "STAcomment", true );
		//	SMWDIProperty::registerProperty( "__STA_ANNOTATED_TEXT", '_str', "STAcomment", true );
		} else {
			SMWPropertyValue::registerProperty( "__STA_ARTICLE_NAME", '_str', "STAarticleName", true );
		//	SMWPropertyValue::registerProperty( "__STA_ANNOTATION_TYPE", '_str', "STAannotationType", true );
		//	SMWPropertyValue::registerProperty( "__STA_ANNOTATION_DATE", '_str', "STAannotationDate", true );
		//	SMWPropertyValue::registerProperty( "__STA_CREATED_BY", '_str', "STAcreatedBy", true );
		//	SMWPropertyValue::registerProperty( "__STA_COMMENT", '_str', "STAcomment", true );
		//	SMWPropertyValue::registerProperty( "__STA_ANNOTATED_TEXT", '_str', "STAannotatedText", true );
		}
		
		return true;
	}

unset( $moduleTemplate );
	
