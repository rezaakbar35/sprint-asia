package main

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/rezaakbar35/sprint-asia/server/controller"
	"github.com/rezaakbar35/sprint-asia/server/helper"
	"github.com/rezaakbar35/sprint-asia/server/model"
)

func init() {
	helper.LoadEnv()
	model.ConnectDB()
}

func main() {
	r := gin.Default()

	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:5173"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE"},
		AllowCredentials: true,
		AllowHeaders:     []string{"Authorization", "Content-Type"},
	}))

	r.POST("/user/register", controller.UserRegister)
	r.POST("/user/login", controller.UserLogin)
	r.GET("/user/:id", controller.GetUniqueUser)
	r.POST("/todo/create", helper.Auth, controller.CreateToDo)
	r.GET("/todo", helper.Auth, controller.GetAllToDo)
	r.GET("/todo/:id", helper.Auth, controller.GetUniqueToDo)
	r.GET("/todo/user/:id", helper.Auth, controller.GetUserToDo)
	r.PUT("/todo/update/:id", helper.Auth, controller.UpdateToDo)
	r.DELETE("/todo/delete/:id", helper.Auth, controller.DeleteToDo)
	r.POST("/task/create", helper.Auth, controller.CreateTask)
	r.GET("/task", helper.Auth, controller.GetAllTask)
	r.GET("/task/:id", helper.Auth, controller.GetUniqueTask)
	r.GET("/task/todo/:id", helper.Auth, controller.GetTodoTask)
	r.PUT("/task/update/:id", helper.Auth, controller.UpdateTask)
	r.DELETE("/task/delete/:id", helper.Auth, controller.DeleteTask)
	r.Run()
}
