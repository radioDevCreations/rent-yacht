import "./contact.scss";
import MainLayout from "../layouts/MainLayout/MainLayout";
import ContactForm from "@/components/ContactForm/ContactForm";

const ContactPage = () => {
	return (
		<MainLayout>
			<section className="contact-page">
				<ContactForm />
			</section>
		</MainLayout>
	);
};

export default ContactPage;
