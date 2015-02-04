<?php

$url = "https://spreadsheets.google.com/feeds/list/0AmBQjX3DYsaHdC1oVjdtdVpLUk45azFSVVljamlod3c/od6/public/values?alt=json";

$json = json_decode(file_get_contents($url));

$data = array();

$currentQuestionId = 0;

foreach ($json->feed->entry as $entry) {        
    if (!empty($entry->{'gsx$round'}->{'$t'}) && !empty($entry->{'gsx$question'}->{'$t'})) {
        $currentQuestionId = $entry->{'gsx$question'}->{'$t'};
        
        $question = new stdClass();
        
        $question->roundId = $entry->{'gsx$round'}->{'$t'};
        $question->questionId = $entry->{'gsx$question'}->{'$t'};
        $question->questionText = $entry->{'gsx$questiontext'}->{'$t'};
        $question->answers = array();
        
        $data[$currentQuestionId] = $question;
    }
    
    if (!empty($entry->{'gsx$answertext'}->{'$t'}) && !empty($entry->{'gsx$answerid'}->{'$t'})) {
        $answer = new stdClass();
        
        $answer->answerId = $entry->{'gsx$answerid'}->{'$t'};
        $answer->answerText = $entry->{'gsx$answertext'}->{'$t'};
        $answer->answerPoints = $entry->{'gsx$points'}->{'$t'};
        
        $data[$currentQuestionId]->answers[$answer->answerId] = $answer;
    }
}

header('Content-Type: application/json');

echo json_encode($data);