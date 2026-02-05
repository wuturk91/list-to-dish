import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-[calc(100vh-64px)] md:items-start font-sans bg-[linear-gradient(135deg,_#667eea_0%,_#764ba2_100%)]">
      <main className="flex w-full flex-col items-center p-4 md:p-16 bg-white text-black rounded-md shadow-md max-w-4xl m-8 md:mx-auto md:mt-20 h-fit md:max-h-[80vh]">
        <span className="text-[72px] block mb-2 md:mb-[20px] animate-bounce">🥘</span>
        <h1 className="text-4xl md:text-6xl font-bold text-center">Turn Your Ingredients Into Delicious Recipes</h1>
        <h2 className="m-4 text-2xl text-center">Just list your ingredients and get AI generated personalised recipes in seconds.</h2>

        <div className="flex w-full max-w-2xl flex-row gap-4 items-center justify-center mt-4">
          <a
            className="flex h-16 w-full text-xl font-bold items-center justify-center gap-2 rounded-2xl bg-[linear-gradient(135deg,_#667eea_0%,_#764ba2_100%)] px-5 text-white"
            href="/generate"
          >
              Try It Now
          </a>
        </div>
      </main>
    </div>
  );
}
