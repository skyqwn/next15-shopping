import Image from "next/image";

export default function Home() {
  return (
    <div className="relative h-full w-full">
      <h2 className="cursor-pointer bg-black p-6 text-yellow-500">test</h2>
      <Image
        className="absolute sm:size-32 lg:aspect-video"
        fill
        src={"/test.jpg"}
        sizes="100%"
        alt="svg"
      />
    </div>
  );
}
