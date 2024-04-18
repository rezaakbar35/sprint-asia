package model

import (
	"time"

	"gorm.io/gorm"
)

type Task struct {
	gorm.Model
	TaskTitle   string    `json:"task_title" gorm:"not null"`
	TodoID      uint      `gorm:"not null"`
	Todo        Todo      `gorm:"foreignKey:TodoID;references:ID"`
	IsDone      bool      `json:"is_done" gorm:"not null"`
	IsUrgent    bool      `json:"is_urgent" gorm:"not null"`
	IsImportant bool      `json:"is_important" gorm:"not null"`
	DueDate     time.Time `json:"due_date" gorm:"not null"`
}
