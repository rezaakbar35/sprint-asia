package model

import (
	"gorm.io/gorm"
)

type Todo struct {
	gorm.Model
	TodoTitle string `json:"todo_title" gorm:"not null"`
	UserID    uint   `gorm:"not null"`
	User      User   `gorm:"foreignKey:UserID;references:ID"`
	IsDone    bool   `json:"is_done" gorm:"not null"`
}
