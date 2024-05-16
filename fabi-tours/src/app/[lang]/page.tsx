import Mapbox from "@/components/mapbox";

export default function LangHomePage({ params }: { params: { lang: string } }) {
  return (
      <>
        <div>Hello {params.lang}</div>
        <Mapbox lang={params.lang} />
      </>
  );
}
