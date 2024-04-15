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

export default function EntryForm() {
	const router = useRouter();
	const todaysDate = new Date();
	const initialValues: EntryContentData = {
		content: '',
	};
	const tagListRef = useRef<HTMLDivElement>(null);
	const [isTagsOpen, setIsTagsOpen] = useState<boolean>(false);
	const [selectedTags, setSelectedTags] = useState<TagType[]>([]);

	useClickOutside(tagListRef, () => setIsTagsOpen(false));

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

	const toggleTagMenu = (): void => {
		setIsTagsOpen((prevIsTagsOpen) => !prevIsTagsOpen);
	};

	const removeTag = (tag: TagType): void => {
		setSelectedTags((prevTags) => prevTags.filter((t) => t !== tag));
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
				<div className="relative w-full">
					<textarea
						id="content"
						name="content"
						maxLength={300}
						required
						aria-label="Entry content"
						placeholder="Today's entry..."
						className="w-full border-solid border-2 border-[#E8E8E8] rounded-md bg-[#F6F6F6] p-5 mb-4 focus:outline-none resize-none
						h-60 xs:h-40 md:h-36"
						onChange={handleChange}
						value={formData.content}
					></textarea>
					<div className="flex text-xs absolute right-0 bottom-8 right-3 text-[#838383]">
						<span>{formData.content.length}</span>
						<span>/300</span>
					</div>
				</div>

				<div className="relative -mt-2">
					<div className="entry-tags flex w-full">
						<div className="flex items-center flex-wrap">
							<button
								type="button"
								className="flex items-center mr-4 mb-2"
								onClick={toggleTagMenu}
							>
								<Image src={AddIcon} alt="Add tags icon" width={20} />
								<p className="pl-1 font-semibold">Tags</p>
							</button>

							<ul className="flex">
								{selectedTags.map((tag) => (
									<Tag key={tag._id} tag={tag} removeTag={removeTag} />
								))}
							</ul>
						</div>
					</div>

					{isTagsOpen && (
						<TagMenu
							ref={tagListRef}
							selectedTags={selectedTags}
							setSelectedTags={setSelectedTags}
							position="z-50"
						/>
					)}
				</div>

				<Button type="submit" variant="primary" disabled={hasErrors}>
					Add Entry
				</Button>
			</form>
		</section>
	);
}
