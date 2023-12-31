package middleware

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func Cors () gin.HandlerFunc {
  config := cors.DefaultConfig()
  config.AllowOrigins = []string{"http://localhost:3000"}
  config.AllowMethods = []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"}
  config.AllowHeaders = []string{"Origin", "Content-Length", "Content-Type", "Authorization"}
  config.AllowCredentials = true
  return cors.New(config)
}