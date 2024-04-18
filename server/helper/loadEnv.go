package helper

import "github.com/joho/godotenv"

func LoadEnv() {
	err := godotenv.Load()
	if err != nil {
		panic(err)
	}
}
