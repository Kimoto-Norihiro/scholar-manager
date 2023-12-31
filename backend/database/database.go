package database

import (
	"github.com/Kimoto-Norihiro/scholar-manager/model"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

func NewMySql(dns string) (db *gorm.DB, err error) {
	db, err = gorm.Open(mysql.Open(dns), &gorm.Config{})
	if err != nil {
		return nil, err
	}

	db.Migrator().DropTable(
		&model.Author{},
		&model.Publisher{},
		&model.Journal{},
		&model.JournalInfo{},
		&model.JournalEvaluation{},
		&model.InternationalConference{},
		&model.InternationalConferenceInfo{},
		&model.InternationalConferenceEvaluation{},
		&model.DomesticConference{},
		&model.DomesticConferenceInfo{},
		&model.Award{},
		&model.Organization{},
		&model.Tag{},
		&model.Country{},
		&model.AwardAuthor{},
		&model.AwardTag{},
		&model.InternationalConferenceAuthor{},
		&model.InternationalConferenceTag{},
		&model.DomesticConferenceAuthor{},
		&model.DomesticConferenceTag{},
		&model.JournalAuthor{},
		&model.JournalTag{},
	)

	db.AutoMigrate(
		&model.Author{},
		&model.Publisher{},
		&model.Journal{},
		&model.JournalInfo{},
		&model.JournalEvaluation{},
		&model.InternationalConference{},
		&model.InternationalConferenceInfo{},
		&model.InternationalConferenceEvaluation{},
		&model.DomesticConference{},
		&model.DomesticConferenceInfo{},
		&model.Award{},
		&model.Organization{},
		&model.Tag{},
		&model.Country{},
		&model.AwardAuthor{},
		&model.AwardTag{},
		&model.InternationalConferenceAuthor{},
		&model.InternationalConferenceTag{},
		&model.DomesticConferenceAuthor{},
		&model.DomesticConferenceTag{},
		&model.JournalAuthor{},
		&model.JournalTag{},
	)

	seed(db)

	return db, nil
}
