import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import OurTeam from "@/components/OurTeam";
import TestimonialSlider from "@/components/Testimonials";




export default function Home({ params }: { params: { locale: string } }) {
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
