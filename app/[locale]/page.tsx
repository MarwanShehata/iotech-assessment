import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import OurTeam from "@/components/OurTeam";
import TestimonialSlider from "@/components/Testimonials";




export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
	const { locale } = await params
	
	return (
		<>
			<Header />
			<Hero />
			<OurTeam />
			<TestimonialSlider />
			<Footer />
		</>
	)
}