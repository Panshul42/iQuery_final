import Image from 'next/image';

export default function Header() {
  return (
    <div className="flex flex-col justify-center items-center gap-3">
      <Image className = "editpt" src={'/site_logo.png'} alt="iQuery logo" width="120" height="120" />
      <h1 className="text-gray-300 text-6xl font-bold editpb">
        iQuery
      </h1>
    </div>
  );
}
