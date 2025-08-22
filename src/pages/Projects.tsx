import Section from "../components/Section";
import SectionTitle from "../components/SectionTitle";

export default function Projects() {
  return (
    <Section>
      <SectionTitle eyebrow="Projects" title="Things I’ve built" />
      <p className="text-gray-600 dark:text-gray-300">
        Project cards coming soon. For now, this is a placeholder.
      </p>
    </Section>
  );
}