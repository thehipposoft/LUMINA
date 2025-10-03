import LuminaLogo from "@/components/LuminaLogo";

const Footer = () => {
    return (
        <footer className="bg-secondary-bg py-12">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid md:grid-cols-4 gap-8">
                    <div className="md:col-span-2">
                        <div className="flex items-center space-x-2 mb-4">
                            <LuminaLogo size={32} animated={false} />
                            <span className="text-xl font-bold text-black">LUMINA</span>
                            <span className="text-sm text-black/70">TECHNOLOGIES</span>
                        </div>
                        <p className="text-sm text-black/70 mb-4">© 2025 LUMINA TECHNOLOGIES. All Rights Reserved.</p>
                    </div>

                    <div>
                        <h4 className="font-semibold text-black mb-4">What we do</h4>
                        <ul className="space-y-2 text-sm text-black/70">
                            <li><a href="#" className="hover:text-[#35E3ED]">How</a></li>
                            <li><a href="#" className="hover:text-[#35E3ED]">Why</a></li>
                            <li><a href="#" className="hover:text-[#35E3ED]">Benefits</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold text-black mb-4">LuminaLab</h4>
                        <ul className="space-y-2 text-sm text-black/70">
                            <li><a href="#" className="hover:text-[#35E3ED]">Lumi 1</a></li>
                            <li><a href="#" className="hover:text-[#35E3ED]">Lumi 2</a></li>
                            <li><a href="#" className="hover:text-[#35E3ED]">Lumi 3</a></li>
                            <li><a href="#" className="hover:text-[#35E3ED]">Lumi 4</a></li>
                        </ul>
                    </div>
                </div>

                <div className="mt-8 pt-8 border-t border-gray-200 text-center">
                    <p className="text-sm text-gray-500">
                        Created by <span className="font-semibold">hipposoft</span> | All Right Reserved
                    </p>
                </div>
            </div>
        </footer>
    )
};

export default Footer;
