import LuminaLogo from "@/components/LuminaLogo";
import Link from "next/link";

const Footer = () => {
    return (
        <footer className="bg-secondary-bg pt-20">
            <div className="lg:max-w-7xl mx-auto px-6">
                <div className="flex flex-wrap lg:flex-nowrap gap-16">
                    <div className="md:col-span-2">
                        <div className="flex items-center space-x-1 mb-4">
                            <LuminaLogo size={60} animated={false} />
                            <span className="text-xl font-bold text-black pl-4">LUMINA</span>
                            <span className="text-xl font-semibold text-black">TECHNOLOGIES</span>
                        </div>
                        <p className="text-sm text-black/70 mb-4">© 2025 LUMINA TECHNOLOGIES. All Rights Reserved.</p>
                    </div>
                    <div>
                        <Link href={"/what-we-do"} className="font-semibold text-black mb-4 hover:underline">What we do</Link>
                        <ul className="space-y-4 text-black/70">
                            <li><Link href="/what-we-do#how" className="hover:text-[#35E3ED] duration-300">How</Link></li>
                            <li><Link href="/what-we-do#why" className="hover:text-[#35E3ED] duration-300">Why</Link></li>
                            <li><Link href="/benefits" className="hover:text-[#35E3ED] duration-300 font-semibold">Benefits</Link></li>
                        </ul>
                    </div>
                    <div>
                        <Link href={'/lab'} className="font-semibold text-black mb-4 hover:underline">LuminaLab</Link>
                    </div>
                    <div>
                        <Link href={'/faqs'} className="font-semibold text-black mb-4 hover:underline">FAQs</Link>
                    </div>
                    <div>
                        <Link href={'/#contact'} className="font-semibold text-black mb-4 hover:underline">Contact</Link>
                    </div>
                    <div>
                        <h4 className="font-semibold text-black mb-4">Social Media </h4>
                    </div>
                </div>
                <div className="mt-8 pt-8 pb-4 border-t border-gray-200 text-center">
                    <Link href={'www.thehipposoft.com'} rel="noreferrer" target="_blank" className="text-sm text-gray-500 hover:underline">
                        Created by <span className="font-semibold">Hipposoft</span> | All Right Reserved
                    </Link>
                </div>
            </div>
        </footer>
    )
};

export default Footer;
