type Props = { eyebrow?: string; title: string; subtitle?: string };
export default function SectionTitle({ eyebrow, title, subtitle }: Props) {
  return (
    <header className="mb-8 md:mb-12">
      {eyebrow && (
        <p className="text-sm uppercase tracking-widest text-gray-500 dark:text-gray-400">
          {eyebrow}
        </p>
      )}
      <h2 className="text-3xl md:text-4xl font-extrabold">{title}</h2>
      {subtitle && (
        <p className="mt-2 text-gray-600 dark:text-gray-300 max-w-prose">
          {subtitle}
        </p>
      )}
    </header>
  );
}