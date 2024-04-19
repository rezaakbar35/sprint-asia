package main

import (
	"fmt"
)

func checkGrade(input []int) {
	for i := 0; i < len(input); i++ {
		if 5-(input[i]%5) < 3 && input[i] > 37 {
			input[i] = input[i] + 5 - (input[i] % 5)
		}
	}

	fmt.Println(input)
}

func main() {
	input := []int{73, 67, 38, 33}
	checkGrade(input)
}
