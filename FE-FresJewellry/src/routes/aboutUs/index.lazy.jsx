import { createLazyFileRoute, useNavigate } from '@tanstack/react-router';
import {
  Card,
  CardContent,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import TeamCard from '@/components/TeamCard';
import imageArswendo from '@/assets/Arswendo.jpeg';
import imageGhebi from '@/assets/Ghebi.png';
import imageAmando from '@/assets/Amando.jpg';
import imageMelda from '@/assets/Melda.png';

export const Route = createLazyFileRoute('/aboutUs/')({
  component: AboutUsComponent,
});

function AboutUsComponent() {
  const navigate = useNavigate();

  const handleExploreClick = () => {
    navigate({ to: '/product' });
  };

  return (
    <div className="min-h-screen flex flex-col items-center py-16 px-6">
      <h1 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#CB9531] to-[#8B6F47] mb-8 animate-bounce-in">
        FreshJewellry: Our Story
      </h1>
      <p className="text-xl text-gray-800 max-w-3xl text-center mb-16 leading-relaxed tracking-wide animate-fade-in">
        Fres Jewelry is a jewelry company that offers a wide range of jewelry, from necklaces, rings, bracelets, to earrings.
        Fres Jewelry is dedicated to creating pieces for today's young generation. Unique accessories are crafted from beads.
      </p>

      {/* Team Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl">
        <TeamCard
          image={imageArswendo}
          name="Arswendo"
          role="The Developer"
          description="Building the foundation of FreshJewellry with innovative code."
          instagramLink="https://www.instagram.com/arswendo.erz/"
        />
        <TeamCard
          image={imageAmando}
          name="Amando"
          role="The Design Specialist"
          description="Crafting stunning visuals that define our unique style."
          instagramLink="https://www.instagram.com/amdyvx/"
        />
        <TeamCard
          image={imageGhebi}
          name="Ghebi"
          role="The Developer"
          description="Engineering seamless experiences with technical expertise."
          instagramLink="https://www.instagram.com/ghebi_03/"
        />
        <TeamCard
          image={imageMelda}
          name="Melda"
          role="The CEO"
          description="Leading FreshJewellry with vision and ambition."
          instagramLink="https://www.instagram.com/frestiiiiiiii/"
        />
      </div>

      <Card className="mt-16 max-w-6xl w-full">
        <CardContent className="pt-8 text-center">
          <p className="text-lg text-gray-800 leading-relaxed">
            At FreshJewellry, we believe accessories are more than just adornments—they’re expressions of self. From subtle bracelets to bold statement necklaces, every piece is designed to be part of your journey. Let’s create your story together!
          </p>
          <Button
            onClick={handleExploreClick}
            className="mt-6 bg-[#CB9531] text-white hover:bg-[#6C4C35]"
          >
            Start Exploring
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}