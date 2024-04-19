package controller

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/rezaakbar35/sprint-asia/server/model"
)

func GetAllToDo(c *gin.Context) {
	var todos []model.Todo
	err := model.DB.Preload("Tasks").Find(&todos).Error
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Failed get all to do", "error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Get product success", "todo": todos})
}

func GetUniqueToDo(c *gin.Context) {
	todoID, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Invalid todo ID"})
		return
	}
	var todo model.Todo
	err = model.DB.Preload("Tasks").First(&todo, todoID).Error
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Failed get unique product", "error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Get unique product success", "todo": todo})
}

func GetUserToDo(c *gin.Context) {
	userID, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Invalid user ID"})
		return
	}
	var todos []model.Todo
	err = model.DB.Preload("Tasks").Where("user_id = ?", userID).Find(&todos).Error
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Failed get user todo", "error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Get unique product success", "todo": todos})
}

func CreateToDo(c *gin.Context) {
	var todo model.Todo
	user_id, _ := c.Get("user_id")

	userID, ok := user_id.(uint)
	if !ok {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": "Invalid user ID"})
		return
	}

	todo.UserID = userID
	if err := c.ShouldBindJSON(&todo); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Invalid todo data", "error": err.Error()})
		return
	}
	err := model.DB.Create(&todo).Error
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Failed create todo", "error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Create todo success", "todo": todo})
}

func UpdateToDo(c *gin.Context) {
	todoID, err := strconv.Atoi(c.Param("id"))

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Invalid todo ID"})
		return
	}
	var todo model.Todo
	user_id, _ := c.Get("user_id")

	userID, ok := user_id.(uint)
	if !ok {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": "Invalid user ID"})
		return
	}

	todo.UserID = userID
	err = model.DB.First(&todo, todoID).Error
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Failed find todo", "error": err.Error()})
		return
	}
	if err := c.ShouldBindJSON(&todo); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Invalid todo data", "error": err.Error()})
		return
	}
	err = model.DB.Save(&todo).Error
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Failed update todo", "error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Update todo success", "todo": todo})
}

func DeleteToDo(c *gin.Context) {
	todoID, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Invalid todo ID"})
		return
	}
	err = model.DB.Delete(&model.Todo{}, todoID).Error
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Failed delete todo", "error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Delete todo success"})
}
