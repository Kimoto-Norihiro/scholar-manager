package handler

import (
	"strconv"

	"github.com/gin-gonic/gin"

	"github.com/Kimoto-Norihiro/scholar-manager/model"
	"github.com/Kimoto-Norihiro/scholar-manager/usecase"
)

type JournalInfoHandler struct {
	usecase *usecase.JournalInfoUsecase
}

func NewJournalInfoHandler(u *usecase.JournalInfoUsecase) *JournalInfoHandler {
	return &JournalInfoHandler{
		usecase: u,
	}
}

func (h *JournalInfoHandler) CreateJournalInfo(c *gin.Context) {
	var m model.JournalInfo
	err := c.BindJSON(&m)
	if err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	err = h.usecase.CreateJournalInfo(m)
	if err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	c.JSON(200, gin.H{"message": "success", "model": m})
}

func (h *JournalInfoHandler) ListJournalInfos(c *gin.Context) {
	journalInfos, err := h.usecase.ListJournalInfos()
	if err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	c.JSON(200, journalInfos)
}

func (h *JournalInfoHandler) UpdateJournalInfo(c *gin.Context) {
	var m model.JournalInfo
	err := c.BindJSON(&m)
	if err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}

	err = h.usecase.UpdateJournalInfo(m)
	if err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	c.JSON(200, gin.H{"message": "success"})
}

func (h *JournalInfoHandler) GetJournalInfoByID(c *gin.Context) {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	journalInfo, err := h.usecase.GetJournalInfoByID(id)
	if err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	c.JSON(200, journalInfo)
}

func (h *JournalInfoHandler) DeleteJournalInfo(c *gin.Context) {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}

	err = h.usecase.DeleteJournalInfo(id)
	if err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	c.JSON(200, gin.H{"message": "success"})
}