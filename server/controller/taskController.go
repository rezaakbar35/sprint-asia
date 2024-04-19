package controller

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/rezaakbar35/sprint-asia/server/model"
)

func GetAllTask(c *gin.Context) {
	var tasks []model.Task
	err := model.DB.Find(&tasks).Error
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Failed get all to do", "error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Get task success", "task": tasks})
}

func GetUniqueTask(c *gin.Context) {
	taskID, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Invalid task ID"})
		return
	}
	var task model.Task
	err = model.DB.First(&task, taskID).Error
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Failed get unique task", "error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Get unique task success", "task": task})
}

func GetTodoTask(c *gin.Context) {
	todoID, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Invalid todo ID"})
		return
	}
	var tasks []model.Task
	err = model.DB.Where("todo_id = ?", todoID).Find(&tasks).Error
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Failed get todo task", "error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Get todo task success", "task": tasks})
}

func CreateTask(c *gin.Context) {
	var task model.Task

	if err := c.ShouldBindJSON(&task); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Invalid task data", "error": err.Error()})
		return
	}
	err := model.DB.Create(&task).Error
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Failed create task", "error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Create task success", "task": task})
}

func UpdateTask(c *gin.Context) {
	taskID, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Invalid task ID"})
		return
	}
	var task model.Task
	err = model.DB.First(&task, taskID).Error
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Failed find task", "error": err.Error()})
		return
	}
	if err := c.ShouldBindJSON(&task); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Invalid task data", "error": err.Error()})
		return
	}
	err = model.DB.Save(&task).Error
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Failed update task", "error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Update task success", "task": task})
}

func DeleteTask(c *gin.Context) {
	taskID, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Invalid task ID"})
		return
	}
	err = model.DB.Delete(&model.Task{}, taskID).Error
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Failed delete task", "error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Delete task success"})
}
