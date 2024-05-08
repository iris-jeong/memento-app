'use client';
import Image from 'next/image';
import { BeatLoader } from 'react-spinners';
import { useAuthRedirect } from '@/hooks/useAuthRedirect';
import Header from '@/components/organisms/Header';
import Button from '@/components/atoms/Button';
import Journal from '../../public/journaling.svg';

export default function Landing() {
	const { isLoading, isRedirecting } = useAuthRedirect('/home');

	if (isLoading || isRedirecting) {
		return (
			<div className="flex justify-center items-center h-screen">
				<BeatLoader
					loading={true}
					color="#1945E2"
					aria-label="Loading Spinner"
				/>
			</div>
		);
	}

	return (
		<div className="flex flex-col h-screen">
			<Header />

			<div id="content">
				<main className="flex flex-grow justify-center items-center">
					<div className="flex flex-col items-center h-fit px-6">
						<Image src={Journal} alt="Journal" width={400} />
						<div className="text-center">
							<h1 className="font-sourceSerif font-bold text-4xl xs:text-5xl text-[#2A2A2A] mb-4">
								Homework for Life
							</h1>
							<h2>Notice the meaningful moments in everyday life.</h2>
						</div>
						<Button variant="primary" href="/register">
							Get Started
						</Button>
					</div>
				</main>
			</div>
		</div>
	);
}
