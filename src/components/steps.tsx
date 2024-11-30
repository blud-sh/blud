import Image from "next/image";

export default function Steps() {
    return (
        <div className="container mx-auto px-28 py-12">
            <div className="space-y-24 flex flex-col gap-32">
                <div className="flex items-center justify-between">
                    <span className="text-7xl font-bold text-[#898989]">
                        01.
                    </span>
                    <div className="w-1/2 flex justify-end">
                        <Image
                            src="/placeholder.svg?height=200&width=400"
                            width={400}
                            height={200}
                            alt="Step 1"
                            className="bg-gray-200"
                        />
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <div className="w-1/2">
                        <Image
                            src="/placeholder.svg?height=200&width=400"
                            width={400}
                            height={200}
                            alt="Step 2"
                            className="bg-gray-200"
                        />
                    </div>
                    <span className="text-7xl font-bold text-[#898989]">
                        02.
                    </span>
                </div>

                <div className="flex items-center justify-between">
                    <span className="text-7xl font-bold text-[#898989]">
                        03.
                    </span>
                    <div className="w-1/2 flex justify-end">
                        <Image
                            src="/placeholder.svg?height=200&width=400"
                            width={400}
                            height={200}
                            alt="Step 3"
                            className="bg-gray-200"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
