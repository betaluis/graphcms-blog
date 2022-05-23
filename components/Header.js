import { useContext } from "react";
import Link from "next/link";

const categories = [
    { name: "React", slug: "react" },
    { name: "Web Developer", slug: "web-developer" }
]

const Header = () => {
    return (
        <div className="container mx-auto px-10 mb-8">
            <div className="border-b w-full border-blue-400 py-8 flex items-center flex-col md:flex-row">
                <div className="mx-auto md:mr-auto md:ml-0">
                    <Link href="/">
                        <span className="cursor-pointer font-bold text-4xl text-white">False Teachers</span>
                    </Link>
                </div>
                <div className="mt-3 md:mt-2">
                    {
                        categories.map((cat, index) => (
                            <Link key={cat.slug} href={`/category/${cat.slug}`}>
                                <span className="align-middle text-white ml-4 font-semibold cursor-pointer">{cat.name}</span>
                            </Link>
                        ))
                    }
                </div>
            </div>
        </div>
    );
}

export default Header;