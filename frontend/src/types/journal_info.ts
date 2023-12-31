import { Publisher } from "./publisher"

export type JournalInfo = {
  id: number
  name: string
  short_name: string
  iso4_name: string
  publisher: Publisher
}
export type JournalInfos = JournalInfo[]

// type for table display
export type JournalInfoTableDisplay = Omit<JournalInfo, 'publisher'> & { publisher_name: string }
export type JournalInfoTableDisplays = JournalInfoTableDisplay[]

export function journalInfosToTableDisplays(journalInfos: JournalInfos): JournalInfoTableDisplays {
	return journalInfos.map((journalInfo) => {
		return {
			id: journalInfo.id,
			name: journalInfo.name,
			short_name: journalInfo.short_name,
			iso4_name: journalInfo.iso4_name,
			publisher_name: journalInfo.publisher.name
		} 
	})
}

// type for form
export type JournalInfoUpsertValues = Omit<JournalInfo, 'id'>

export const journalInfosToOptions = (list: JournalInfos) => {
	return list.map((journalInfo) => {
		return {
			value: journalInfo,
			label: journalInfo.name
		} 
	}) 
}