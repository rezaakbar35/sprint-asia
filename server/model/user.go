package model

import (
	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	Username string `json:"username" gorm:"not null"`
	Password string `json:"password" gorm:"not null"`
	Todos    []Todo `json:"todos" gorm:"constraint:OnUpdate:CASCADE,OnDelete:CASCADE;"`
}
