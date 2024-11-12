import Header from "@/src/components/backdrop/header";

const data = {
  title: "Playground",
  links: [{ title: "Home", url: "/" }],
};

export default function Home() {
  return (
    <>
      <Header page={data} />
      <div className="flex flex-1 flex-col gap-4 p-2 pt-1">
        <div>home</div>
      </div>
    </>
  );
}
