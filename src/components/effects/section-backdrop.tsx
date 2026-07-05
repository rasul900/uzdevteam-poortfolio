import Image from "next/image";
import { SECTION_BACKGROUNDS, type SectionBackgroundKey } from "@/lib/backgrounds";

type Variant = "hero" | "section" | "subtle";

interface SectionBackdropProps {
  imageKey: SectionBackgroundKey;
  alt?: string;
  variant?: Variant;
  priority?: boolean;
}

export function SectionBackdrop({
  imageKey,
  alt = "",
  variant = "section",
  priority = false,
}: SectionBackdropProps) {
  const src = SECTION_BACKGROUNDS[imageKey];

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className={`section-bg-image ${variant === "hero" ? "section-bg-kenburns" : ""}`}>
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          className="object-cover"
          sizes="100vw"
        />
      </div>

      <div className={`section-bg-overlay section-bg-overlay--${variant}`} />

      <div className="section-bg-grid" />
      <div className="section-bg-noise" />

      {variant === "hero" && (
        <>
          <div className="section-orb section-orb--1" />
          <div className="section-orb section-orb--2" />
          <div className="section-orb section-orb--3" />
          <div className="section-scanlines" />
        </>
      )}

      {(variant === "section" || variant === "subtle") && (
        <div className="section-orb section-orb--subtle" />
      )}
    </div>
  );
}
