package repository

import (
	"github.com/Kimoto-Norihiro/scholar-manager/model"
	"gorm.io/gorm"
)

type InternationalConferenceInfoRepository struct {
	db *gorm.DB
}

func NewInternationalConferenceInfoRepository(db *gorm.DB) *InternationalConferenceInfoRepository {
	return &InternationalConferenceInfoRepository{db}
}

func (r *InternationalConferenceInfoRepository) CreateInternationalConferenceInfo(m model.InternationalConferenceInfo) error {
	return r.db.Create(&m).Error
}

func (r *InternationalConferenceInfoRepository) ListInternationalConferenceInfos() ([]model.InternationalConferenceInfo, error) {
	var internationalConferenceInfos []model.InternationalConferenceInfo
	err := r.db.Preload("Publisher").Find(&internationalConferenceInfos).Error
	return internationalConferenceInfos, err
}

func (r *InternationalConferenceInfoRepository) UpdateInternationalConferenceInfo(m model.InternationalConferenceInfo) error {
	return r.db.Save(&m).Error
}

func (r *InternationalConferenceInfoRepository) GetInternationalConferenceInfoByID(id int) (model.InternationalConferenceInfo, error) {
	var internationalConferenceInfo model.InternationalConferenceInfo
	err := r.db.Preload("Publisher").Where("id = ?", id).First(&internationalConferenceInfo).Error
	return internationalConferenceInfo, err
}

func (r *InternationalConferenceInfoRepository) DeleteInternationalConferenceInfo(id int) error {
	return r.db.Delete(&model.InternationalConferenceInfo{}, id).Error
}
