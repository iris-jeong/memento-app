'use client';
import Image from 'next/image';
import Journal from '../../public/journaling.svg';
import Header from '@/components/organisms/Header';
import Button from '@/components/atoms/Buttons';

export default function Landing() {
	return (
		<div className="flex flex-col h-screen">
			<Header />

			<div id="content">
				<main className="flex flex-grow justify-center items-center">
					<div className="flex flex-col items-center h-fit px-6">
						<Image src={Journal} alt="Journal" width={400} />
						<div className="mb-8 text-center">
							<h1 className="font-sourceSerif font-bold text-4xl xs:text-5xl text-[#2A2A2A] mb-4">
								Homework for Life
							</h1>
							<h2>Notice the meaningful moments in everyday life.</h2>
						</div>
						<Button label="Get Started" href="/register" />
					</div>
				</main>
			</div>
		</div>
	);
}
