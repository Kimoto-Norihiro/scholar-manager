import React, { useEffect, useState } from 'react'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { InputWithError } from '@/components/parts/form/InputWithError'
import { SelectWithError } from '@/components/parts/form/SelectWithError'
import { FormButton } from '../form/FormButton';
import { Publishers } from '@/types/publisher'
import { listPublishers } from '@/handlers/publisher_handlers'
import { DomesticConferenceInfoUpsertValues } from '@/types/domestic_conference_info'
import { createDomesticConferenceInfo } from '@/handlers/domestic_conference_info_handlers'

const DomesticConferenceInfoUpsertSchema = yup.object().shape({
  name: yup.string().required('入力してください'),
	short_name: yup.string().required('入力してください'),
  iso4_name: yup.string().required('入力してください'),
  publisher: yup.object().required('選択してください'),
})

export const DomesticConferenceInfoForm = () => {
	const { register, handleSubmit, control, formState: { errors }} = useForm<DomesticConferenceInfoUpsertValues>({
		resolver: yupResolver(DomesticConferenceInfoUpsertSchema)
	})
	const [publisherList, setPublisherList] = useState<Publishers>([])

	const submit = async () => {
		handleSubmit(async (data) => {
			await createDomesticConferenceInfo(data)
			console.log("create journal info")
		}, (error) => {
			console.log('error', error)
		})()
	}

	useEffect(() => {
		listPublishers(setPublisherList)
	}, [])

	return (
		<div className='w-full flex flex-col items-center'>
			<form 
				className='w-[60%] flex flex-col' 
				onSubmit={(e) => {
					e.preventDefault()
					submit()
			}}>
				<InputWithError 
					label='会議名'
					name='name'
					register={register}
					errors={errors}
					required
				/>
				<InputWithError 
					label='略称名'
					name='short_name'
					register={register}
					errors={errors}
					required
				/>
				<InputWithError 
					label='別名'
					name='other_name'
					register={register}
					errors={errors}
					required
				/>
				<InputWithError 
					label='論文集'
					name='collection_notation'
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
					options={publisherList.map((publisher) => {
						return {
							value: publisher.id,
							label: `${publisher.name}`
						}
					})}
					list={publisherList}
				/>
				<FormButton />
			</form>
		</div>
	)
}