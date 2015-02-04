<?php

$url = "https://spreadsheets.google.com/feeds/list/0AmBQjX3DYsaHdC1oVjdtdVpLUk45azFSVVljamlod3c/od6/public/values?alt=json";

$json = json_decode(file_get_contents($url));

$data = array();

$currentQuestionId = 0;
$currentRound = 0;

foreach ($json->feed->entry as $entry) {        
    if (!empty($entry->{'gsx$round'}->{'$t'}) && !empty($entry->{'gsx$question'}->{'$t'})) {
        $currentQuestionId = (int)$entry->{'gsx$question'}->{'$t'};
        $currentRound = (int)$entry->{'gsx$round'}->{'$t'};
        
        $question = new stdClass();
        
        $question->question = $entry->{'gsx$questiontext'}->{'$t'};
        $question->answers = array();
        
        $data[$currentRound][$currentQuestionId] = $question;
    }
    
    if (!empty($entry->{'gsx$answertext'}->{'$t'}) && !empty($entry->{'gsx$answerid'}->{'$t'})) {
        $answerId = $entry->{'gsx$answerid'}->{'$t'};
        $answer = new stdClass();
        
        $answer->answer = $entry->{'gsx$answertext'}->{'$t'};
        $answer->points = (int)$entry->{'gsx$points'}->{'$t'};
        
        $data[$currentRound][$currentQuestionId]->answers[$answerId] = $answer;
    }
}

header("Access-Control-Allow-Origin: *");
header('Content-Type: application/json');

foreach ($data as $roundId => $questions) {
    foreach ($questions as $questionId => $question) {
        $data[$roundId][$questionId]->answers = array_values($data[$roundId][$questionId]->answers);
    }
    
    $data[$roundId] = array_values($questions);
}

echo json_encode(array_values($data));