import ThemeSwitcher from "./theme-switcher";

function MainNav() {
  return (
    <div className="sticky top-0 flex flex-row items-center justify-between p-4 border-b bg-background">
      <div className="flex flex-row items-center">
        <h1 className="text-3xl font-bold">Teddy Blanco</h1>
      </div>
      <div className="flex flex-row items-center">
        <ThemeSwitcher />
      </div>
    </div>
  );
}

export default MainNav;
