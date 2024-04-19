package model

import (
	"gorm.io/gorm"
)

type Todo struct {
	gorm.Model
	TodoTitle string `json:"todo_title" gorm:"not null"`
	UserID    uint   `gorm:"foreignKey:UserID;references:ID"`
	IsDone    bool   `json:"is_done" gorm:"not null"`
	Tasks     []Task `json:"tasks" gorm:"constraint:OnUpdate:CASCADE,OnDelete:CASCADE;"`
}
