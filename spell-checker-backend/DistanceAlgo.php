<?php

class DistanceAlgo
{
    private $words_dictionary;
    private string $words_string;
    private $word_list = [];
    private string $input_word;
    private $suggestion = [];
    public function __construct(string $input_word)
    {
        $this->words_dictionary = fopen("./data/wordlist.txt", "r");
        $this->words_string = fread($this->words_dictionary, filesize("./data/wordlist.txt"));

        $this->word_list = explode("\n", trim($this->words_string));
        $this->input_word = $input_word;
    }

    public function calculate_distance(string $compare): int
    {
        if ($this->input_word === $compare) return -1;

        $input = "_" . $this->input_word;
        $compare = "_" . $compare;
        $target_characters = str_split($compare);
        $input_charaters = str_split($input);
        $cols  =  count($target_characters);
        $rows = count($input_charaters);

        $matrix = array_fill(0, $rows, array_fill(0, $cols, INF));

        $matrix[0][0] = 0;

        for ($col = 1; $col < $cols; $col++) {
            $matrix[0][$col] = $col;
        }

        for ($row = 1; $row < $rows; $row++) {
            $matrix[$row][0] = $row;
        }

        for ($col = 1; $col < $cols; $col++) {
            for ($row = 1; $row < $rows; $row++) {
                $previous_col = $matrix[$row][$col - 1];
                $previous_row = $matrix[$row - 1][$col];
                $previous_corner  = $matrix[$row - 1][$col - 1];

                $minimum_val = min($previous_col, $previous_row, $previous_corner);

                $matrix[$row][$col] = $target_characters[$col] === $input_charaters[$row] ?
                    $previous_corner : $minimum_val + 1;
            }
        }


        return $matrix[$rows - 1][$cols - 1];
    }

    function get_word_suggestions(int $suggestion_length): string
    {
        foreach ($this->word_list as $key => $word) {
            if ($this->calculate_distance($word) === -1) return json_encode(["status" => true]);
            array_push($this->suggestion, ["word" => $word, "length" => $this->calculate_distance($word)]);
        }

        usort($this->suggestion, fn ($first_array, $second_array) => $first_array["length"]
            - $second_array["length"]);

        $final_suggestions = array_slice($this->suggestion, 0, $suggestion_length);

        return json_encode(["status" => false, "suggestions" => $final_suggestions]);
    }
}
