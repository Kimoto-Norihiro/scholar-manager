package usecase

import (
	"github.com/Kimoto-Norihiro/scholar-manager/model"
	"github.com/Kimoto-Norihiro/scholar-manager/repository"
	"github.com/go-playground/validator/v10"
)

type JournalEvaluationUsecase struct {
	repository repository.IJournalEvaluationRepository
	validate   *validator.Validate
}

func NewJournalEvaluationUsecase(r repository.IJournalEvaluationRepository) *JournalEvaluationUsecase {
	return &JournalEvaluationUsecase{
		repository: r,
		validate:   validator.New(),
	}
}

func (u *JournalEvaluationUsecase) CreateJournalEvaluation(m model.JournalEvaluation) error {
	err := u.validate.Struct(m)
	if err != nil {
		return err
	}
	return u.repository.CreateJournalEvaluation(m)
}

func (u *JournalEvaluationUsecase) ListJournalEvaluations() ([]model.JournalEvaluation, error) {
	return u.repository.ListJournalEvaluations()
}

func (u *JournalEvaluationUsecase) GetJournalEvaluationByJournalIDAndYear(journalID int, year int) (model.JournalEvaluation, error) {
	return u.repository.GetJournalEvaluationByJournalIDAndYear(journalID, year)
}

func (u *JournalEvaluationUsecase) UpdateJournalEvaluation(m model.JournalEvaluation) error {
	err := u.validate.Struct(m)
	if err != nil {
		return err
	}
	return u.repository.UpdateJournalEvaluation(m)
}

func (u *JournalEvaluationUsecase) DeleteJournalEvaluation(journalID int, year int) error {
	return u.repository.DeleteJournalEvaluation(journalID, year)
}