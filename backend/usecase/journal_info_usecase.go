package usecase

import (
	"github.com/Kimoto-Norihiro/scholar-manager/model"
	"github.com/Kimoto-Norihiro/scholar-manager/repository"
	"github.com/go-playground/validator/v10"
)

type JournalInfoUsecase struct {
	repository repository.IJournalInfoRepository
	validate   *validator.Validate
}

func NewJournalInfoUsecase(r repository.IJournalInfoRepository) *JournalInfoUsecase {
	return &JournalInfoUsecase{
		repository: r,
		validate:   validator.New(),
	}
}

func (u *JournalInfoUsecase) CreateJournalInfo(m model.JournalInfo) error {
	err := u.validate.Struct(m)
	if err != nil {
		return err
	}
	return u.repository.CreateJournalInfo(m)
}

func (u *JournalInfoUsecase) ListJournalInfos() ([]model.JournalInfo, error) {
	return u.repository.ListJournalInfos()
}

func (u *JournalInfoUsecase) UpdateJournalInfo(m model.JournalInfo) error {
	err := u.validate.Struct(m)
	if err != nil {
		return err
	}
	return u.repository.UpdateJournalInfo(m)
}

func (u *JournalInfoUsecase) GetJournalInfoByID(id int) (model.JournalInfo, error) {
	return u.repository.GetJournalInfoByID(id)
}

func (u *JournalInfoUsecase) DeleteJournalInfo(id int) error {
	return u.repository.DeleteJournalInfo(id)
}