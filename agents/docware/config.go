package main

import (
	"os"

	"github.com/joho/godotenv"
)

type Env struct {
	ApiKey string
}

func GetEnv(key, fallback string) string {
	if value, exists := os.LookupEnv(key); exists {
		return value
	}
	return fallback
}

func LoadEnv() *Env {
	_ = godotenv.Load()

	return &Env{
		ApiKey: GetEnv("GOOGLE_API_KEY", ""),
	}
}
