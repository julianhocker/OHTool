<?php
	/**
	* Part of OHITool
	* Provides Functions that are called from Javascript.
	*
	* 
	* 
	* @author Lia Veja
	*/


//ueberschreibt einen Artikel "$pagename" mit dem Inhalt "$content"
function ohi_editWikiPage($newPageName,$content,$editSummary) {
    global $wgUser;
    $newTitle = Title::newFromText($newPageName);
    $article= WikiPage::factory( $newTitle );
    $summary = 'Created by OHI Tool';
    $flags =  EDIT_UPDATE;
    //	$article = new Article($titleObj);
    $flags = $flags|EDIT_DEFER_UPDATES | EDIT_AUTOSUMMARY;
    $content = ContentHandler::makeContent( $content, $newTitle );
    $status = $article->doEditContent( $content, $summary, $flags,false,$wgUser);
    return ('success');
}


//liefert den Text, der in der "Edit-Ansicht" steht
function getEditContent($pagename) {
	$titleObj = Title::newFromText($pagename);
	$wikipage = WikiPage::factory($titleObj);
	$return = $wikipage->getText();
	return $return;
}

//liefert den HTML-Code, der den Seiteninhalt darstellt
function getHTMLContent($pagename) {
	$titleObj = Title::newFromText($pagename);
	$wikipage = WikiPage::factory($titleObj);
	global $wgParser;
	$text = $wikipage->getText();
	$parserOutput = $wgParser->parse($text,$titleObj,new ParserOptions());
	$return = $parserOutput->getText();
	return $return;
}

//liefert den HTML-Code, der den Seiteninhalt darstellt
function getWikiPageContent($pagename) {
	$titleObj = Title::newFromText($pagename);
	$wikipage = WikiPage::factory($titleObj);
    $revision = $wikipage->getRevision();
    $content = $revision->getContent( Revision::RAW );
    $text = ContentHandler::getContentText( $content );
	return $text;
}

function ohi_writeAnnotationPage($newPageName, $content){
    global $wgUser;
	$newTitle = Title::newFromText($newPageName);
	$content = ''.rawurldecode($content);
	/*$newArticle = new Article($newTitle);
	$oldContent = getWikiPageContent($newPageName);
	$contentNew = $oldContent."\n".$content;
	$newArticle->doEdit($contentNew, 'Created by OHI Tool');
	return $oldContent;*/
    $article= WikiPage::factory( $newTitle );
    $summary = 'Created by OHI Tool';
    $flags =  EDIT_UPDATE;
    //	$article = new Article($titleObj);
    $flags = $flags|EDIT_DEFER_UPDATES | EDIT_AUTOSUMMARY;
    $oldContent = getWikiPageContent($newPageName);
    $contentNew = $oldContent."\n".$content;
    $contentX = ContentHandler::makeContent( $contentNew, $newTitle );
    $status = $article->doEditContent( $contentX, $summary, $flags,false,$wgUser);
    return ('success');
}


function parseText($string) {
	global $wgParser;
	$parserOutput = $wgParser->parse($string,new Title(), new ParserOptions());
	$return = $parserOutput->getText();
	return $return;
}


function ohi_writeAnnotationProperties($annotationSerialNumber, $newPageName, $articleName, $annotationDate ,$createdBy){
    global $wgUser;
	$newTitle = Title::newFromText($newPageName);
	//$newArticle = new Article($newTitle);
	$content = '';
	$content .= '{{TextAnnotation}}';
	$content .= '[[STAannotationSerialNumber::'.$annotationSerialNumber.'| ]]'."\n";
	$content .= '[[STAarticleName::'.$articleName.'| ]]'."\n";
	$content .= '[[STAannotationDate::'.$annotationDate.'| ]]'."\n";
	$content .= '[[STAcreatedBy::'.$createdBy.'| ]]'."\n";
	$content .= '[[Category:TextAnnotation]]'."\n";
	$content .= '<!--STARTANNOTATIONTEXT-->'."\n";
//	$newArticle->doEdit($content, 'Created by OHI Tool');
    $article= WikiPage::factory( $newTitle );
    $summary = 'Created by OHI Tool';
    $flags =  EDIT_UPDATE;
    //	$article = new Article($titleObj);
    $flags = $flags|EDIT_DEFER_UPDATES | EDIT_AUTOSUMMARY;
    $content = ContentHandler::makeContent( $content, $newTitle );
    $status = $article->doEditContent( $content, $summary, $flags,false,$wgUser);
	return ('success');
}

function ohi_deleteAnnotationPage($pageName, $userName) {
	$user = $userName;
	$title = Title::newFromText($pageName);
	$article = new Article($title);
	$article->doDelete("User: ".$user." hat diese Annotation entfernt.");
	return;
}

function writeOHIWikiPage($newPageName, $contentAsk, $type){
    global $wgUser;
	$newTitle = Title::newFromText($newPageName);
	$content = ''.rawurldecode($contentAsk);
    $summary = 'Created by OHI Tool';
    $flags =  EDIT_UPDATE;
    //	$article = new Article($titleObj);
    $flags = $flags|EDIT_DEFER_UPDATES | EDIT_AUTOSUMMARY;
	$content_fin = str_replace('+', ' ', (string)$content);
    $article= WikiPage::factory( $newPageName );
    $content = ContentHandler::makeContent( $content_fin, $newTitle );
    $status = $article->doEditContent( $content, $summary, $flags,false,$wgUser);
	return ('success');
	//  return ($content_fin);
}

function uutf8Urldecode($value)
{
	if (is_array($value)) {
		foreach ($value as $key => $val) {
			$value[$key] = utf8Urldecode($val);
		}
	} else {
		$value = preg_replace('/%([0-9a-f]{2})/ie', 'chr(hexdec($1))', (string) $value);
	}

	return $value;
}

/**
 * @param Title $fromTitle
 * @param Title $toTitle
 * @param string $reason
 * @param bool $noredirect
 * @return array
 */
function getOHIProp($lemma, $prop){
	//  echo $prop."<br/>";
	//  echo $lemma."<br/>";
	$params = array ("[[".$lemma."]]", $prop, "format=list" , "mainlabel=-", "link=none", "headers=hide", "sep=;" );
	$result = SMWQueryProcessor::getResultFromFunctionParams( $params, SMW_OUTPUT_WIKI );
	//printOILResult($result->getResults());
	// return comma separated values
	// print_r("resultX= ".$result."<br />");
	return $result;
}

function getOHIAnnotation( $annotation,$linkProp=false) {
	// get annotated file
	//  $annotation = ''.rawurldecode($annotation);
	global  $wgServer;
	if($linkProp!==FALSE)
		$prop = "?".$linkProp;
	else $prop = "?SIAannotatedImage";
	$file = getLemmaProp($annotation, $prop);
	// echo "result File= ".$file."<br />";
	// get Lemma
	$prop = "?Part of Article";
	// $params = array ("[[".$annotation."]]", "?".$prop,  "format=list" ,"mainlabel=-", "link=none", "headers=hide", "sep=~" );
	$params = array ("[[File:".$file."]]", $prop, "mainlabel=-", "format=list" , "link=none", "headers=hide", "sep=~" );
	$lemma = SMWQueryProcessor::getResultFromFunctionParams( $params, SMW_OUTPUT_WIKI );
	// return comma separated values
	// print_r("result Lemma= ".$lemma."<br />");
	$result = array();
	if(count($lemma)>0){
		$result = explode("~", $lemma);
	}
	return $result;
}

function getOHITableSecondLevel($annotation, $printouts, $namespace=false, $type=false, $linkProp=false){
	global $wgServer, $wgParser, $wgUser, $wgTitle;
	//$annotation = ''.rawurldecode($annotation);
//	$type = ''.urldecode($type);
	if(ohi_startsWith($type,"Ansc"))$type="Anschl&#252;sse";
    $out = array();
	if(strpos($printouts, "=")!=false) {
		$datax = explode("~", $printouts);
		foreach($datax as $arr){
			if($arr !== null && $arr !==""){

				list($label, $property) = explode("=", $arr);
				//$label = trim(substr($arr,1,strpos($arr,'=')-1));
				//$property = trim(substr($arr,strpos($arr,'=')+1));
				$out[] = "?".$property;
			}

		}
		//$out = implode(";", $params);
	}
	else $out = $printouts;
	if($linkProp!==FALSE)
		$prop = "?".$linkProp;
	else $prop = "?Ist neue Version von Annotation";
	if($namespace!==FALSE)
		$namespace = "?".$namespace;
	else $namespace = "TextAnnotation:";
	//$file = getSTAProp($annotation, $prop);
	// echo "result File= ".$file."<br />";
	// get Lemma
	$prop = "?Part of Article";
	//$type = htmlspecialchars($type, ENT_QUOTES, 'UTF-8');
	$params = array ("[[Category:".$type."]][[".$linkProp."::".$annotation."]]", "format=table", "sort=Erstellungszeitpunkt", "order=ascending"  );
	$params = array_merge($params, $out);
//	print_r($params);
//	$lemma = SMWQueryProcessor::getResultFromFunctionParams( $params, SMW_OUTPUT_HTML);
	$result = SMWQueryProcessor::getResultFromFunctionParams( $params, SMW_OUTPUT_WIKI, SMWQueryProcessor::INLINE_QUERY, false );
	$parserOptions = ParserOptions::newFromUser($wgUser);
	$parserOptions->setEditSection(false);
	$parserOptions->setTidy(true);
	$parserOutput = $wgParser->parse($result, $wgTitle, $parserOptions);
	$html = $parserOutput->getText();
	// return comma separated values
	return $html;
}

function getOHIProps( $annotation, $output, $namespace=false, $linkProp=false) {
	// get annotated file
	global $wgServer;
	$annotation = ''.rawurldecode($annotation);
	$out = explode("~", $output);
	foreach ( $out  as $k ) {
		//   if(strpos($k, '?') == false) $k = "?".$k ;
		//  echo $k."<br/>";
	}
	if($linkProp!==FALSE)
		$prop = "?".$linkProp;
	else $prop = "?SIAannotatedImage";
	if($namespace!==FALSE)
		$namespace = "?".$namespace;
	else $namespace = "File:";
	$file = getSTAProp($annotation, $prop);
	// echo "result File= ".$file."<br />";
	// get Lemma
	$prop = "?Part of Article";
	// $params = array ("[[".$annotation."]]", "?".$prop,  "format=list" ,"mainlabel=-", "link=none", "headers=hide", "sep=~" );
	$params = array ("[[".$namespace.$file."]]", $prop, "mainlabel=-", "format=list" , "link=none", "headers=hide", "sep=~" );
	$lemma = SMWQueryProcessor::getResultFromFunctionParams( $params, SMW_OUTPUT_WIKI );
	// return comma separated values
	// print_r("result Lemma= ".$lemma."<br />");
	if(count($lemma)>0){
		$arr = explode("~", $lemma);
		$jsonMap = array();
		foreach ( $arr  as $k ) {
			// if(strpos($k, 'Bib:') !== false) return (string) $k;
			$param = array();
			$param[] = "[[".trim($k)."]]";
			foreach($out as $x)
				if(trim($x)!=="")
					$param[] = $x;
			$param[] = "format=table" ;
			$param[] = "link=none";
			//  $param[] = "mainlabel=-";
			$param[] = "headers=hide";
			$param[] = "mainlabel=-";
			$param[] = "sep=~";
			//  print_r($param);
			//    echo $k.'= ';
			// TODO: re-write the inner query
			// Apply the previous result for lemma and annotation
			// put isAnnotation = 1;
			$result = SMWQueryProcessor::getResultFromFunctionParams( $param, SMW_OUTPUT_WIKI );
			//  $result =  preg_replace('/<td (.*?)>(.*?)<\/td>/', "\\2", $result);
			//  $result = preg_replace("/<td>(.+)<\/td>/", "\\2", $result);
			//  $title =  preg_replace('/<a href=\"(.*?)\">(.*?)<\/a>/', "\\2", $format);
			$str = getSTADataFromTable($result);
			//   echo $str."<br/>";
			$resFin = array(array());
			$res = explode('~~', $str );
			//  echo (count($out)-1)."<br/>";
			//  var_dump($res);
			for($i=0; $i<(count($out)-1); $i++){
				// $d = substr($res[$i], 0, -2);
				$d = trim($res[$i]);
				//  echo $d." x<br/>";
				$prop = str_replace("?","",$out[$i]);
				//  echo $prop." y<br/>";
				if(trim($d)!=="") {
					if(strpos($d,"??")!== false){
						$rest = explode('??', $d );
						foreach($rest as $a){
							if(trim($a)!=="") {
								$resFin[$prop][]=trim($a);
								//   echo trim($a).'xx <br/>';
							}
						}
					}
					else {
						$resFin[$prop]= trim($d);
						//   echo trim($d).'yy <br/>';
					}
				}
			}
			$resFin["0"] = $k;
			$json = json_encode($resFin);
			// echo $x;
			array_push($jsonMap, $json);

		}
		$finalJson = "{\"result\":[";
		foreach (array_keys($jsonMap) as $key){
			$finalJson = $finalJson.substr($jsonMap[$key],0,strlen($jsonMap[$key])-1)."},";
		}

		$finalJson = substr($finalJson,0,strlen($finalJson)-1)."]}";
		//  echo "<br />**********************".$finalJson ."**********************";

	}
	// get lemma properties

	// return ( string )$data["query"]["search"][0]["title"];
	return $finalJson;
}
function getOHIDataFromTable($contents)
{
	// $contents = "<table><tr><td>Row 1 Column 1</td><td>Row 1 Column 2</td></tr><tr><td>Row 2 Column 1</td><td>Row 2 Column 2</td></tr></table>";
	$DOM = new DOMDocument;
	$DOM->loadHTML($contents);
	$str = "";
	$items = $DOM->getElementsByTagName('tr');
	foreach ($items as $node)
	{

		$str .= STAtdrows($node->childNodes) ;
	}
	return $str;
}

function OHItdrows($elements)
{
	$str = "";
	foreach ($elements as $element)
	{
		if(!$element->hasChildNodes() )
			$str .= $element->nodeValue . "~~ ";
		else
		{
			foreach($element->childNodes as $node){
				$str .= "??" .$node->nodeValue;
			}
		}
	}
	$str = str_replace("????","??",$str);
	return $str;
}

function ohi_startsWith($haystack, $needle) {
	// search backwards starting from haystack length characters from the end
	return $needle === "" || strrpos($haystack, $needle, -strlen($haystack)) !== FALSE;
}
function ohi_endsWith($haystack, $needle) {
	// search forward starting from end minus needle length characters
	return $needle === "" || (($temp = strlen($haystack) - strlen($needle)) >= 0 && strpos($haystack, $needle, $temp) !== FALSE);
}

