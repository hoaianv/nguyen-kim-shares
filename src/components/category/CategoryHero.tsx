type CategoryHeroProps = {
  categoryTitle: string;
};

export default function CategoryHero({ categoryTitle }: CategoryHeroProps) {
  return (
    <header>
      <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
        {categoryTitle}
      </h1>
    </header>
  );
}
