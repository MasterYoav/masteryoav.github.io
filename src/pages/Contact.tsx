import Section from "../components/Section";
import SectionTitle from "../components/SectionTitle";

export default function Contact() {
  return (
    <Section>
      <SectionTitle eyebrow="Contact" title="Get in touch" />
      <p className="text-gray-600 dark:text-gray-300">
        Drop me a line at <a className="link" href="mailto:you@example.com">you@example.com</a>.
        We’ll add a form later.
      </p>
    </Section>
  );
}