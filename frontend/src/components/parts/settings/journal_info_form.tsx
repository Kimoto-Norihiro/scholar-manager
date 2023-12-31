import React, { useEffect, useState } from 'react'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { InputWithError } from '@/components/parts/form/InputWithError'
import { SelectWithError } from '@/components/parts/form/SelectWithError'
import { FormButton } from '../form/FormButton';
import { JournalInfo } from '@/types/journal_info'
import { createJournalInfo, listJournalInfos, updateJournalInfo } from '@/handlers/journal_info_handlers'
import { Publishers, publishersToOptions } from '@/types/publisher'
import { listPublishers } from '@/handlers/publisher_handlers'
import { FormProps } from '@/types/form'
import { useCommonModal } from '@/context/modal_context'

const JournalInfoUpsertSchema = yup.object().shape({
  name: yup.string().required('入力してください'),
	short_name: yup.string().required('入力してください'),
  iso4_name: yup.string().required('入力してください'),
  publisher: yup.object().required('選択してください'),
})

export const JournalInfoForm = ({ type, defaultValues, setList }: FormProps<JournalInfo>) => {
	const { register, handleSubmit, control, formState: { errors }} = useForm<JournalInfo>({
		resolver: yupResolver(JournalInfoUpsertSchema),
		defaultValues,
	})
	const { closeModal } = useCommonModal()
	const [publisherList, setPublisherList] = useState<Publishers>([])

	const submit = async () => {
		handleSubmit(async (data) => {
			console.log("data", data)
			if (type === 'create') {
				await createJournalInfo(data)
			} else {
				await updateJournalInfo(data)
			}
			listJournalInfos(setList)
			closeModal()
		}, (error) => {
			console.log('error', error)
		})()
	}

	useEffect(() => {
		listPublishers(setPublisherList)
	}, [])

	return (
		<div className='w-[80vw] flex flex-col items-center p-4'>
			<form 
				className='w-full flex flex-col bg-white p-4 pr-0 rounded-md' 
				onSubmit={(e) => {
					e.preventDefault()
					submit()
				}}
			>
				<InputWithError 
					label='雑誌名'
					name='name'
					register={register}
					errors={errors}
					required
				/>
				<InputWithError 
					label='省略名'
					name='short_name'
					register={register}
					errors={errors}
					required
				/>
				<InputWithError 
					label='ISO4名'
					name='iso4_name'
					register={register}
					errors={errors}
					required
				/>
				<SelectWithError
					label='出版社'
					name='publisher'
					control={control}
					errors={errors}
					required
					options={publishersToOptions(publisherList)}
				/>
				<FormButton type={type} />
			</form>
		</div>
	)
}