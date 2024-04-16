'use client';
import Image from 'next/image';
import AddIcon from '../../public/add.svg';
import { useState, useRef } from 'react';
import TagMenu from './TagMenu';
import Tag, { TagType } from './Tag';
import useClickOutside from '@/hooks/useClickOutside';
import { useRouter } from 'next/navigation';
import { EntryContentData } from '@/types/forms';
import useForm from '@/hooks/useForm';
import { createEntry } from '@/api/entries';
import { formatDate } from '@/utils/formUtils';
import Button from './atoms/Button';
import TextAreaInput from './atoms/TextAreaInput';
import TagSelector from './molecules/TagSelector';

export default function EntryForm() {
	const router = useRouter();
	const todaysDate = new Date();
	const initialValues: EntryContentData = {
		content: '',
	};
	const [selectedTags, setSelectedTags] = useState<TagType[]>([]);

	const onSubmit = async (formData: EntryContentData) => {
		const token = localStorage.getItem('token');
		const storedUser = localStorage.getItem('user');

		// If there's no token or user, redirect user to login page.
		if (!token || !storedUser) {
			console.error('Authentication required');
			router.push('/login');
			return;
		}

		const user = JSON.parse(storedUser);
		const entryData = {
			userId: user.id,
			date: todaysDate,
			content: formData.content,
			tags: selectedTags,
		};

		try {
			const result = await createEntry(entryData, token);
			console.log('Entry submission successful', result);
		} catch (error) {
			console.error('Error with submission:', error);
		}
	};

	const { formData, handleChange, handleSubmit, hasErrors } =
		useForm<EntryContentData>({
			initialValues,
			onSubmit,
		});

	return (
		<section className="w-7/8 sm:4/5 md:3/4 lg:w-2/3 max-w-[640px] mx-auto my-12 px-4">
			<form
				onSubmit={handleSubmit}
				className="flex flex-col align-center justify-center"
			>
				<p className="text-center text-[#1945E2] font-semibold text-lg sm:text-xl md:2xl lg:3xl">
					{formatDate(todaysDate)}
				</p>
				<h1 className="text-center text-xl xs:text-2xl md:text-3xl mt-2 mb-6">
					Write 1-3 sentences about the most memorable event, conversation,
					feeling, realization, or observation that happened today.
				</h1>

				<TextAreaInput value={formData.content} onChange={handleChange} />

				<TagSelector
					selectedTags={selectedTags}
					setSelectedTags={setSelectedTags}
				/>

				<Button type="submit" variant="primary" disabled={hasErrors}>
					Add Entry
				</Button>
			</form>
		</section>
	);
}
