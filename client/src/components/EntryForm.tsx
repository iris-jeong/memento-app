'use client';
import Image from 'next/image';
import AddIcon from '../../public/add.svg';
import { useState, useRef, ChangeEvent, FormEvent, useEffect } from 'react';
import TagMenu from './TagMenu';
import Tag, { TagType } from './Tag';
import useClickOutside from '@/hooks/useClickOutside';
import { useRouter } from 'next/navigation';

type FormData = {
	date: Date;
	content: string;
	tags: TagType[];
};

export default function EntryForm() {
	const [formData, setFormData] = useState<FormData>({
		date: new Date(),
		content: '',
		tags: [],
	});
	const [isTagsOpen, setIsTagsOpen] = useState<boolean>(false);
	const [selectedTags, setSelectedTags] = useState<TagType[]>([]);
	const tagListRef = useRef<HTMLDivElement>(null);
	const todaysDate = new Date();
	const router = useRouter();

	useClickOutside(tagListRef, () => {
		setIsTagsOpen(false);
	});

	useEffect(() => {
		// Update the formData tags when selectedTags changes.
		setFormData((currentFormData) => ({
			...currentFormData,
			tags: selectedTags,
		}));
	}, [selectedTags]);

	const handleTextChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
		setFormData({ ...formData, content: event.target.value });
	};

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		// Retrieve token and user from storage.
		const token = localStorage.getItem('token');
		const storedUser = localStorage.getItem('user');

		// If there's no token, redirect user to login page.
		if (!token || !storedUser) {
			console.error('Authentication required');
			router.push('/login');
			return;
		}

		const user = JSON.parse(storedUser);
		const dataToSend = {
			date: formData.date,
			content: formData.content,
			userId: user.id,
			tagIds: selectedTags.map((tag) => tag._id),
		};

		try {
			const response = await fetch('http://localhost:3001/api/entries/new', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify(dataToSend),
			});

			const result = await response.json();

			if (!response.ok) {
				console.error('Entry submission failed:', result);
				return;
			}

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

	const formatDate = (date: Date): string => {
		const day = date.getDate();
		const month = date.getMonth() + 1;
		const year = date.getFullYear().toString().slice(-2);

		return `${month}.${day}.${year}`;
	};

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
						onChange={handleTextChange}
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

				<button
					type="submit"
					className="rounded-full bg-[#1945E2] w-36 h-14 text-white font-semibold mx-auto mt-8 font-sans"
				>
					Add Entry
				</button>
			</form>
		</section>
	);
}
