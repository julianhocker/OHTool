<?php

class SpecialOHI extends SpecialPage {
	function __construct() {
		parent::__construct( 'OHI' );
	}

	/**
	* @param $parameter If the special page is being visited as
	* Special:MyExtension/X, $parameter is set to X
	*/

	//execute() is the main function that is called when a special page is accessed. 
	//The function overloads the function SpecialPage::execute(). 
	//It passes a single parameter $parameter, the subpage component of the current title. 
	//For example, if someone follows a link to Special:MyExtension/blah, $parameter will contain "blah".
	function execute( $parameter ) {
		//if ( !$this->userCanExecute() ) {
		//	$this->showRestrictionError();
		//	return;	
		//}
		////Do your stuff
		$request = $this->getRequest();
		$output = $this->getOutput();
		$this->setHeaders();
		
		// Get request data from
		$param = $request->getText('param');
		
		//Do stuff
		
		//create page "Template:aTag"
		ohi_editWikiPage("Template:aTag","<includeonly></includeonly>","");
		
		//create page "Template:eTag"
		ohi_editWikiPage("Template:eTag","<includeonly></includeonly>","");
		
		//create page "Template:STAformat"
		$content = '';
		$content .= '{|class="wikitable"'."\n";
		$content .= '|-'."\n";
		$content .= '|Annotation'."\n";
		$content .= '|{{{2}}}'."\n";
		$content .= '|-'."\n";
		$content .= '|Kommentar'."\n";
		$content .= '|{{{3}}}'."\n";
		$content .= '|-'."\n";
		$content .= '|annotiert am'."\n";
		$content .= '|{{{4}}}'."\n";
		$content .= '|-'."\n";
		$content .= '|annotiert von'."\n";
		$content .= '|{{{5}}}'."\n";
		$content .= '|-'."\n";
		$content .= '|Seriennummer'."\n";
		$content .= '|{{{6}}}'."\n";
		$content .= '|-'."\n";
		$content .= '|}'."\n";
		ohi_editWikiPage("Template:STAformat",$content,"");
		
		//create page "Template:STAformat"
		$content = '';
		$content .= '{{#ask: [[STAannotationSerialNumber::{{{annotationSerialNumber}}}]]'."\n";
		$content .= '| ?STAannotationType'."\n";
		$content .= '| ?STAcomment'."\n";
		$content .= '| ?STAannotationDate'."\n";
		$content .= '| ?STAcreatedBy'."\n";
		$content .= '| ?STAannotationSerialNumber'."\n";
		$content .= '| format=template |template=STAformat}}'."\n";
		ohi_editWikiPage("Template:STAinfoBox",$content,"");
		
		//create page "Template:TextAnnotation"
		$content = '';
		$content .= '<noinclude>'."\n";
		$content .= 'This is the "TextAnnotation" template.'."\n";
		$content .= 'It should be called in the following format:'."\n";
		$content .= '<pre>'."\n";
		$content .= '{{TextAnnotation'."\n";
		$content .= '|STAannotationType='."\n";
		$content .= '|STAcomment='."\n";
		$content .= '}}'."\n";
		$content .= '</pre>'."\n";
		$content .= 'Edit the page to see the template text.'."\n";
		$content .= '</noinclude>'."\n";
		$content .= '<includeonly>'."\n";
		$content .= '{{#ifeq: {{{STAannotationType|}}}|||[[STAannotationType::{{{STAannotationType}}}|]]}}'."\n";
		$content .= '{{#ifeq: {{{STAcomment|}}}|||[[STAcomment::{{{STAcomment}}}|]]}}'."\n";
		$content .= '</includeonly>'."\n";
		ohi_editWikiPage("Template:TextAnnotation",$content,"");

		//create page "Form:TextAnnotation"
		$content = '';
		$content .= '<noinclude>'."\n";
		$content .= 'Dies ist das "TextAnnotation"-Formular.'."\n";
		$content .= 'Um eine Seite mit diesem Formular zu erstellen, gib den Seitennamen unten ein;'."\n";
		$content .= 'wenn eine Seite mit diesem Namen bereits existiert, wirst du zu einem Formular zum Bearbeiten der Seite weitergeleitet.'."\n";
		$content .= '{{#forminput:form=TextAnnotation}}'."\n";
		$content .= '</noinclude><includeonly>'."\n";
		$content .= 'You can annotate the selected text with a type (subject) and a comment.'."\n";
		$content .= '<div id="wikiPreview" style="display: none; padding-bottom: 25px; margin-bottom: 25px; border-bottom: 1px solid #AAAAAA;"></div>'."\n";
		$content .= '{{{for template|TextAnnotation}}}'."\n";
		$content .= '{| class="formtable"'."\n";
		$content .= '! Type:'."\n";
		$content .= '| {{{field|STAannotationType}}}'."\n";
		$content .= '|-'."\n";
		$content .= '! Comment:'."\n";
		$content .= '| {{{field|STAcomment}}}'."\n";
		$content .= '|}'."\n";
		$content .= '{{{end template}}}'."\n";
		$content .= '{{{standard input|save}}}'."\n";
		$content .= '</includeonly>'."\n";
		ohi_editWikiPage("Form:TextAnnotation",$content,"");
      //  $this->ohi_initEProperties();
		
		$wikitext = 'OHITool has been set up successfully!';
		$output->addWikiText ( $wikitext );
		
	}

    function ohi_initEProperties(){
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
}

?>