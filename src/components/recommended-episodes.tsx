import { Episode } from '../models/episode';

type RecommendedEpisodesProps = {
  episodes?: Array<Episode>;
};

export default function RecommendedEpisodes({
  episodes,
}: RecommendedEpisodesProps) {
  return (
    <div>
      {episodes?.map((episode) => (
        <div>
          {episode.episode} - {episode.name}
        </div>
      ))}
    </div>
  );
}
