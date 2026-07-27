import { SocialIcon } from "@/interfaces/models/IFooter.interface";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface SocialIconsProps {
  socialMedia: SocialIcon[];
}

const SocialIcons: React.FC<SocialIconsProps> = ({ socialMedia }) => {
  return (
    socialMedia?.length > 0 && (
      <div className="flex flex-wrap gap-2">
        {socialMedia.map((social, index) => (
          <Link
            key={index}
            href={social.url}
            target={social?.target}
            rel="noopener noreferrer"
            aria-label={`Theo dõi chúng tôi trên ${social.title}`}
            className="group inline-flex items-center justify-center"
          >
            <div className="relative h-10 w-10 overflow-hidden rounded-sm border border-slate-200 bg-white transition duration-200 group-hover:border-[#ffb716] group-hover:bg-[#fff7da]">
              <Image
                quality={100}
                alt={social.title}
                src={social.picture}
                fill
                className="object-contain p-2"
                sizes="44px"
              />
            </div>
          </Link>
        ))}
      </div>
    )
  );
};

export default SocialIcons;
