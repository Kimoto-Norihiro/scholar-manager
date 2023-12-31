import React, { useEffect, useState } from 'react'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, set } from 'react-hook-form';
import { InputWithError } from '../form/InputWithError';
import { SelectWithError } from '../form/SelectWithError';
import { listInternationalConferences } from '@/handlers/international_conference_handlers'
import { Authors, authorsToOptions } from '@/types/author'
import { Tags, tagsToOptions } from '@/types/tag'
import { listAuthors } from '@/handlers/author_handlers'
import { listTags } from '@/handlers/tag_handlers'
import { InternationalConferenceInfos, internationalConferenceInfosToOptions } from '../../../types/international_conference_info';
import { listInternationalConferenceInfos } from '@/handlers/international_conference_info_handlers';
import { MultiSelectWithError } from '../form/MultiSelectWithError';
import { InternationalConference, InternationalConferenceFilter } from '@/types/international_conference';
import { SearchButton } from '../form/SearchButton';
import { useCommonModal } from '@/context/modal_context';

type Props = {
	setInternationalConferenceList: React.Dispatch<React.SetStateAction<InternationalConference[]>>
}

const InternationalConferenceSearchSchema = yup.object().shape({})

export const InternationalConferenceSearch = ({ setInternationalConferenceList }: Props) => {
	const { control, register, handleSubmit, formState: { errors }, watch} = useForm<InternationalConferenceFilter>({
		resolver: yupResolver(InternationalConferenceSearchSchema),
	})
	const { closeModal } = useCommonModal()
	const [authorList, setAuthorList] = useState<Authors>([])
	const [internationalConferenceInfoList, setInternationalConferenceInfoList] = useState<InternationalConferenceInfos>([])
	const [tagList, setTagList] = useState<Tags>([])

	const submit = async () => {
		handleSubmit(async (data) => {
			listInternationalConferences(setInternationalConferenceList, data)
			closeModal()
		}, (error) => {
			console.log(error)
			console.log('error')
		})()
	}

	useEffect(() => {
		listAuthors(setAuthorList)
		listInternationalConferenceInfos(setInternationalConferenceInfoList)
		listTags(setTagList)
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
				<div className='flex justify-between'>
					<div className='w-[50%] pr-4'>
						<MultiSelectWithError
							label='著者'
							name='authors'
							control={control}
							errors={errors}
							required
							options={authorsToOptions(authorList)}
						/>
					</div>
					<div className='w-[50%] pr-4'>
						<InputWithError
							label='題目' 
							name='title'
							register={register}
							errors={errors}
							required
						/>
					</div>
				</div>
				<div className='flex justify-between'>
					<div className='w-[50%] pr-4'>
						<SelectWithError
							label='会議名'
							name='international_conference_info'
							control={control}
							errors={errors}
							required
							options={internationalConferenceInfosToOptions(internationalConferenceInfoList)}
						/>
					</div>
					<div className='w-[50%] pr-4'>
						<MultiSelectWithError 
							label='分野タグ'
							name='tags'
							control={control}
							errors={errors}
							required
							options={tagsToOptions(tagList)}
						/>
					</div>
				</div>
				<SearchButton/>
			</form>
		</div>
	)
}