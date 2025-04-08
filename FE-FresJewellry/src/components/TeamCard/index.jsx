import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';

function TeamCard({ image, name, role, description, instagramLink }) {
    return (
        <a
            href={instagramLink}
            target="_blank"
            rel="noopener noreferrer"
            className="block"
        >
            <Card
                className="relative overflow-hidden bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border-none cursor-pointer w-full h-[420px]"
            >
                <CardHeader className="p-0">
                    <div className="relative w-full h-56 overflow-hidden">
                        <img
                            src={image}
                            alt={name}
                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 via-transparent to-transparent" />
                        <CardTitle className="absolute bottom-3 left-3 text-white text-2xl font-semibold tracking-wide drop-shadow-md">
                            {name}
                        </CardTitle>
                    </div>
                </CardHeader>
                <CardContent className="p-5 text-center bg-gradient-to-b from-white to-gray-50 flex flex-col justify-between h-[160px]">
                    <CardDescription className="text-gray-800 text-base font-medium leading-relaxed">
                        <span className="block text-[#CB9531] font-bold text-lg mb-1">{role}</span>
                        {description}
                    </CardDescription>
                </CardContent>
            </Card>
        </a>
    );
}

export default TeamCard;
