import TitlePage from "@/components/ui/title-page";

export default function Home() {
  return (
    <main className="flex flex-col items-center min-w-screen">
      <TitlePage
        title="Bienvenue sur mon portfolio"
        subtitle="Découvrez mes projets et compétences"
      />
    </main>
  );
}
