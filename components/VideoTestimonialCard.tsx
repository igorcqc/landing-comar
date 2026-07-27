import Image from "next/image";

interface VideoTestimonialCardProps {
  poster: string;
  nome: string;
  ambiente: string;
  quote: string;
  video?: string;
}

export default function VideoTestimonialCard({
  poster,
  nome,
  ambiente,
  quote,
  video,
}: VideoTestimonialCardProps) {
  return (
    <div className="video-card">
      <div className="video-frame">
        {video ? (
          <video
            src={video}
            poster={poster}
            controls
            playsInline
            preload="metadata"
          />
        ) : (
          <>
            <Image
              src={poster}
              alt={`Prévia do depoimento em vídeo de cliente, ${ambiente}`}
              fill
              sizes="(max-width: 900px) 100vw, 50vw"
              style={{ objectFit: "cover" }}
            />
            <span className="video-play" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
            <span className="video-pending">vídeo em breve</span>
          </>
        )}
      </div>
      <div className="video-caption">
        <p className="quote">&quot;{quote}&quot;</p>
        <p className="who">
          {nome}, {ambiente}
        </p>
      </div>
    </div>
  );
}
